import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  EMAIL_PATTERN,
  acceptSubmission,
  escapeHtml,
  greeting,
  resend,
  sendEmail,
  singleLine,
  text,
} from './_lib/shared.js'

// Newsletter sign-up: saves the subscriber as a Resend contact in the
// newsletter segment, then sends a welcome email to new subscribers.
// Newsletters themselves are sent from Resend → Broadcasts to that segment.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY         — Resend API key with FULL access (sending-only keys can't add contacts)
//   EMAIL_FROM             — sender on the domain verified in Resend
//   NEWSLETTER_SEGMENT_ID  — ID of the "Newsletter" segment in Resend → Audience → Segments
//   CONTACT_TO_EMAIL       — optional here: where replies to the welcome email go
//
// Validation rules mirror src/lib/newsletterForm.ts — keep the two in sync.

const LIMITS = { firstName: 50, email: 254 }

const SIGNUP_FAILED = 'Sorry, we couldn’t sign you up just now. Please try again in a few minutes.'

type Fields = { firstName: string; email: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.firstName.length > LIMITS.firstName)
    errors.firstName = `Please keep your first name under ${LIMITS.firstName} characters.`
  if (!fields.email) errors.email = 'Please enter your email address.'
  else if (fields.email.length > LIMITS.email || !EMAIL_PATTERN.test(fields.email))
    errors.email = 'Please enter a valid email address, like name@example.com.'
  return errors
}

function failure(step: string, result: { status: number; data: unknown }) {
  return new Error(`${step} failed — Resend responded ${result.status}: ${JSON.stringify(result.data)}`)
}

// Adds or re-subscribes the contact. Returns true if they weren't already an
// active member of the newsletter segment (so they should get a welcome email).
async function subscribe(fields: Fields, segmentId: string) {
  const existing = await resend('GET', `/contacts/${encodeURIComponent(fields.email)}`)

  if (existing.status === 404) {
    const created = await resend('POST', '/contacts', {
      email: fields.email,
      ...(fields.firstName ? { first_name: fields.firstName } : {}),
      unsubscribed: false,
      segments: [{ id: segmentId }],
    })
    if (!created.ok) throw failure('Creating contact', created)
    return true
  }
  if (!existing.ok) throw failure('Looking up contact', existing)

  const contactId = String(existing.data.id)
  let isNew = false

  // They asked to subscribe again, so lift a previous unsubscribe.
  if (existing.data.unsubscribed === true) {
    const updated = await resend('PATCH', `/contacts/${contactId}`, { unsubscribed: false })
    if (!updated.ok) throw failure('Re-subscribing contact', updated)
    isNew = true
  }

  const memberships = await resend('GET', `/contacts/${contactId}/segments`)
  if (!memberships.ok) throw failure('Listing contact segments', memberships)
  const segments = Array.isArray(memberships.data.data) ? (memberships.data.data as { id?: string }[]) : []

  if (!segments.some((segment) => segment.id === segmentId)) {
    const added = await resend('POST', `/contacts/${contactId}/segments/${segmentId}`)
    if (!added.ok) throw failure('Adding contact to segment', added)
    isNew = true
  }

  return isNew
}

// Goes to a typed-in address, so it carries no free text from the form
// beyond a plain first name.
function welcomeEmail(fields: Fields) {
  const hello = greeting(fields.firstName)
  const paragraphs = [
    'Thank you for subscribing to the FemmeFluence Africa newsletter. You’ll hear from us with stories, opportunities and updates from our community.',
    'Every newsletter includes a link to unsubscribe at any time. If you didn’t sign up, you can ignore this email or reply to let us know.',
  ]
  return {
    subject: 'Welcome to the FemmeFluence Africa newsletter',
    text: `${hello}\n\n${paragraphs.join('\n\n')}\n\nWarmly,\nThe FemmeFluence Africa Team`,
    html: `<p>${escapeHtml(hello)}</p>${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}<p>Warmly,<br />The FemmeFluence Africa Team</p>`,
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = acceptSubmission(req, res, ['RESEND_API_KEY', 'EMAIL_FROM', 'NEWSLETTER_SEGMENT_ID'])
  if (!body) return

  const fields: Fields = {
    firstName: singleLine(text(body.firstName)),
    email: text(body.email).trim().toLowerCase(),
  }

  const errors = validate(fields)
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', errors })
    return
  }

  let isNew: boolean
  try {
    isNew = await subscribe(fields, String(process.env.NEWSLETTER_SEGMENT_ID))
  } catch (error) {
    console.error('Newsletter sign-up failed:', error)
    res.status(502).json({ ok: false, error: SIGNUP_FAILED })
    return
  }

  // Already-subscribed people get the same "you're in" response (so the form
  // doesn't reveal who is on the list) but no repeat welcome email.
  if (isNew) {
    const replyTo = String(process.env.CONTACT_TO_EMAIL ?? '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean)
    try {
      const id = await sendEmail({
        to: [fields.email],
        ...(replyTo.length > 0 ? { reply_to: replyTo } : {}),
        ...welcomeEmail(fields),
      })
      console.log(`Newsletter welcome email delivered to Resend (id ${id}).`)
    } catch (error) {
      // The sign-up itself succeeded; a missing welcome email isn't worth failing it.
      console.error('Newsletter welcome email failed to send:', error)
    }
  } else {
    console.log('Newsletter sign-up for an existing subscriber — no welcome email sent.')
  }

  res.status(200).json({ ok: true })
}
