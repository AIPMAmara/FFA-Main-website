import { EMAIL_PATTERN } from './contactForm'

// Rules for the newsletter form. api/newsletter.ts repeats these on the
// server — keep the two in sync.

export const NEWSLETTER_LIMITS = {
  firstName: 50,
  email: 254,
} as const

export type NewsletterFields = {
  firstName: string
  email: string
}

export type NewsletterErrors = Partial<Record<keyof NewsletterFields, string>>

export function validateNewsletter(fields: NewsletterFields): NewsletterErrors {
  const errors: NewsletterErrors = {}
  const firstName = fields.firstName.trim()
  const email = fields.email.trim()

  if (firstName.length > NEWSLETTER_LIMITS.firstName)
    errors.firstName = `Please keep your first name under ${NEWSLETTER_LIMITS.firstName} characters.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > NEWSLETTER_LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = 'Please enter a valid email address, like name@example.com.'

  return errors
}
