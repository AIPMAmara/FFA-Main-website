import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  EMAIL_PATTERN,
  acceptSubmission,
  escapeHtml,
  greeting,
  sendEmail,
  singleLine,
  text,
} from './_lib/shared.js'

// Contact form handler: emails the enquiry to the organisation's inbox via
// Resend (visitor as Reply-To), then sends the visitor a confirmation.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY    — Resend API key (full access; the newsletter needs it)
//   EMAIL_FROM        — sender on the domain verified in Resend
//   CONTACT_TO_EMAIL  — inbox that receives enquiries (comma-separate for several)
//
// Validation rules mirror src/lib/contactForm.ts — keep the two in sync.

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Partnership or Sponsorship',
  'Speaking Invitation',
  'Media and Press',
  'Volunteering',
  'Community or Membership Support',
  'Other',
]

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 }

const SEND_FAILED = 'Sorry, your message could not be sent. Please try again in a few minutes.'

type Fields = { name: string; email: string; enquiryType: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (!fields.name) errors.name = 'Please enter your full name.'
  else if (fields.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!fields.email) errors.email = 'Please enter your email address.'
  else if (fields.email.length > LIMITS.email || !EMAIL_PATTERN.test(fields.email))
    errors.email = 'Please enter a valid email address, like name@example.com.'

  if (!ENQUIRY_TYPES.includes(fields.enquiryType))
    errors.enquiryType = 'Please choose what your enquiry is about.'

  if (fields.subject.length > LIMITS.subject)
    errors.subject = `Please keep the subject under ${LIMITS.subject} characters.`

  if (!fields.message) errors.message = 'Please write your message.'
  else if (fields.message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`

  return errors
}

function notificationEmail(fields: Fields) {
  const subjectLine = fields.subject ? ` — ${singleLine(fields.subject)}` : ''
  const rows: [string, string][] = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Enquiry type', fields.enquiryType],
    ['Subject', fields.subject || '(none)'],
  ]
  return {
    subject: `New enquiry: ${fields.enquiryType}${subjectLine}`,
    text: [
      'New message from the FemmeFluence Africa website contact form.',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      '',
      'Message:',
      fields.message,
      '',
      'Reply to this email to respond directly to the sender.',
    ].join('\n'),
    html: `
      <p>New message from the FemmeFluence Africa website contact form.</p>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:bold;vertical-align:top">${label}</td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="font-weight:bold;margin-top:16px">Message</p>
      <p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>
      <p style="color:#666;font-size:13px">Reply to this email to respond directly to the sender.</p>
    `,
  }
}

// The confirmation goes to whatever address was typed in, so it deliberately
// repeats none of the visitor's free text — otherwise spammers could use the
// form to send their content to anyone.
function confirmationEmail(fields: Fields) {
  const hello = greeting(fields.name)
  const body = [
    'Thank you for contacting FemmeFluence Africa. We’ve received your message',
    `about "${fields.enquiryType}" and a member of our team will get back to you soon.`,
  ].join(' ')
  return {
    subject: 'We’ve received your message — FemmeFluence Africa',
    text: `${hello}\n\n${body}\n\nWarmly,\nThe FemmeFluence Africa Team`,
    html: `<p>${escapeHtml(hello)}</p><p>${escapeHtml(body)}</p><p>Warmly,<br />The FemmeFluence Africa Team</p>`,
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = acceptSubmission(req, res, ['RESEND_API_KEY', 'EMAIL_FROM', 'CONTACT_TO_EMAIL'])
  if (!body) return

  const fields: Fields = {
    name: singleLine(text(body.name)),
    email: text(body.email).trim(),
    enquiryType: text(body.enquiryType),
    subject: singleLine(text(body.subject)),
    message: text(body.message).trim(),
  }

  const errors = validate(fields)
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', errors })
    return
  }

  const inbox = String(process.env.CONTACT_TO_EMAIL)
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)

  try {
    const id = await sendEmail({ to: inbox, reply_to: fields.email, ...notificationEmail(fields) })
    console.log(`Contact enquiry delivered to Resend (id ${id}).`)
  } catch (error) {
    console.error('Contact enquiry failed to send:', error)
    res.status(502).json({ ok: false, error: SEND_FAILED })
    return
  }

  // The enquiry reached the team, so this counts as a success either way —
  // the response just tells the visitor whether to expect a confirmation.
  let confirmationSent = true
  try {
    const id = await sendEmail({ to: [fields.email], reply_to: inbox, ...confirmationEmail(fields) })
    console.log(`Contact confirmation delivered to Resend (id ${id}).`)
  } catch (error) {
    confirmationSent = false
    console.error('Contact confirmation failed to send:', error)
  }

  res.status(200).json({ ok: true, confirmationSent })
}
