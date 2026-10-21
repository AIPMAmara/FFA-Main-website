import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  NEWSLETTER_LIMITS,
  validateNewsletter,
  type NewsletterErrors,
  type NewsletterFields,
} from '../lib/newsletterForm'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string }

const emptyFields: NewsletterFields = { firstName: '', email: '' }

const GENERIC_ERROR = 'Sorry, we couldn’t sign you up just now. Please try again in a few minutes.'

// Styled for the dark purple footer it sits in.
function inputClass(invalid: boolean) {
  return `mt-2 block w-full rounded-full border bg-white px-5 py-3 text-sm text-purple-top placeholder:text-purple-top/40 focus:outline-none focus:ring-2 focus:ring-gold ${
    invalid ? 'border-red-300 ring-2 ring-red-300' : 'border-transparent'
  }`
}

export default function NewsletterForm() {
  const [fields, setFields] = useState<NewsletterFields>(emptyFields)
  const [errors, setErrors] = useState<NewsletterErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  // Spam checks: bots fill the hidden "website" field and submit instantly.
  const [website, setWebsite] = useState('')
  const startedAt = useRef(0)
  const successRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status.kind === 'success') successRef.current?.focus()
  }, [status.kind])

  function update(key: keyof NewsletterFields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function focusFirstError(found: NewsletterErrors) {
    const first = (['firstName', 'email'] as const).find((key) => found[key])
    if (first) document.getElementById(`newsletter-${first}`)?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status.kind === 'sending') return

    const found = validateNewsletter(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'idle' })
      focusFirstError(found)
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website, elapsedMs: Date.now() - startedAt.current }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok === true) {
        setStatus({ kind: 'success' })
        setFields(emptyFields)
        return
      }
      if (data.errors && typeof data.errors === 'object') {
        setErrors(data.errors)
        focusFirstError(data.errors)
      }
      setStatus({
        kind: 'error',
        message: typeof data.error === 'string' ? data.error : GENERIC_ERROR,
      })
    } catch {
      setStatus({
        kind: 'error',
        message: 'We couldn’t reach our server. Please check your internet connection and try again.',
      })
    }
  }

  if (status.kind === 'success') {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mt-6 rounded-2xl bg-lilac/10 px-6 py-4 text-lilac focus:outline-none"
      >
        <span className="font-bold text-gold">You&rsquo;re on the list.</span> Thank you for
        subscribing — look out for news from FemmeFluence Africa in your inbox.
      </p>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6" aria-busy={sending}>
      <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-start">
        <div>
          <label htmlFor="newsletter-firstName" className="block text-xs font-bold text-lilac/80">
            First name <span className="font-normal text-lilac/60">(optional)</span>
          </label>
          <input
            id="newsletter-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={NEWSLETTER_LIMITS.firstName}
            value={fields.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'newsletter-firstName-error' : undefined}
            className={inputClass(Boolean(errors.firstName))}
          />
          {errors.firstName && (
            <p id="newsletter-firstName-error" className="mt-2 text-xs text-red-300">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="newsletter-email" className="block text-xs font-bold text-lilac/80">
            Email address <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={NEWSLETTER_LIMITS.email}
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="newsletter-email-error" className="mt-2 text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-purple-top transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6"
        >
          {sending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>

      {/* Honeypot — hidden from people and screen readers; only bots fill it in. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Leave this field empty</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {status.message}
        </p>
      )}

      <p className="mt-4 text-xs text-lilac/60">
        Stories, opportunities and updates from our community. Unsubscribe anytime.
      </p>
    </form>
  )
}
