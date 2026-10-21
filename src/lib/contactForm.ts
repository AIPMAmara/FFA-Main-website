// Rules for the contact form. api/contact.ts repeats these on the server —
// keep the two in sync when changing a field, limit or enquiry type.

export const ENQUIRY_TYPES = [
  'General Enquiry',
  'Partnership or Sponsorship',
  'Speaking Invitation',
  'Media and Press',
  'Volunteering',
  'Community or Membership Support',
  'Other',
] as const

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const

export type ContactFields = {
  name: string
  email: string
  enquiryType: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>

export const EMAIL_PATTERN =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const subject = fields.subject.trim()
  const message = fields.message.trim()

  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = 'Please enter a valid email address, like name@example.com.'

  if (!(ENQUIRY_TYPES as readonly string[]).includes(fields.enquiryType))
    errors.enquiryType = 'Please choose what your enquiry is about.'

  if (subject.length > LIMITS.subject)
    errors.subject = `Please keep the subject under ${LIMITS.subject} characters.`

  if (!message) errors.message = 'Please write your message.'
  else if (message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`

  return errors
}
