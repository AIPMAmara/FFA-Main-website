import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ENQUIRY_TYPES,
  LIMITS,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from '../lib/contactForm'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success'; confirmationSent: boolean }
  | { kind: 'error'; message: string }

const emptyFields: ContactFields = { name: '', email: '', enquiryType: '', subject: '', message: '' }
const fieldOrder: (keyof ContactFields)[] = ['name', 'email', 'enquiryType', 'subject', 'message']

const GENERIC_ERROR =
  'Sorry, your message could not be sent. Please try again in a few minutes.'

function inputClass(invalid: boolean) {
  return `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-purple-top placeholder:text-purple-top/40 focus:border-purple-top focus:outline-none focus:ring-2 focus:ring-gold ${
    invalid ? 'border-red-700' : 'border-purple-top/20'
  }`
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-bold">
      {children}
      {optional ? (
        <span className="ml-1 font-normal text-purple-top/70">(optional)</span>
      ) : (
        <span className="ml-1 text-red-700" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm text-red-700">
      {message}
    </p>
  )
}

export default function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(emptyFields)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  // Spam checks: bots fill the hidden "website" field and submit instantly.
  const [website, setWebsite] = useState('')
  const startedAt = useRef(0)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status.kind === 'success') successRef.current?.focus()
  }, [status.kind])

  function update(key: keyof ContactFields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function focusFirstError(found: ContactErrors) {
    const first = fieldOrder.find((key) => found[key])
    if (first) document.getElementById(`contact-${first}`)?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status.kind === 'sending') return

    const found = validateContact(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'idle' })
      focusFirstError(found)
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website, elapsedMs: Date.now() - startedAt.current }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok === true) {
        setStatus({ kind: 'success', confirmationSent: data.confirmationSent !== false })
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
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mt-10 rounded-2xl bg-purple-top p-8 text-lilac focus:outline-none"
      >
        <h2 className="font-display text-2xl font-bold">Thank you — your message has been sent.</h2>
        <p className="mt-3 text-lilac/80">
          {status.confirmationSent
            ? 'We’ve emailed you a confirmation. Our team will be in touch soon.'
            : 'Our team has your message and will be in touch soon. (We couldn’t send you a confirmation email, so there’s no need to look out for one.)'}
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now()
            setStatus({ kind: 'idle' })
          }}
          className="mt-6 rounded-full border border-lilac/60 px-6 py-3 text-sm font-bold text-lilac hover:bg-lilac hover:text-purple-top"
        >
          Send another message
        </button>
      </div>
    )
  }

  const sending = status.kind === 'sending'
  const describedBy = (key: keyof ContactFields, extra?: string) =>
    [errors[key] ? `contact-${key}-error` : '', extra ?? ''].filter(Boolean).join(' ') || undefined

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6" aria-busy={sending}>
      <p className="text-sm text-purple-top/70">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Full name</Label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={fields.name}
            onChange={(e) => update('name', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass(Boolean(errors.name))}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="contact-email">Email address</Label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass(Boolean(errors.email))}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-enquiryType">Enquiry type</Label>
        <select
          id="contact-enquiryType"
          name="enquiryType"
          value={fields.enquiryType}
          onChange={(e) => update('enquiryType', e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.enquiryType)}
          aria-describedby={describedBy('enquiryType')}
          className={inputClass(Boolean(errors.enquiryType))}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id="contact-enquiryType-error" message={errors.enquiryType} />
      </div>

      <div>
        <Label htmlFor="contact-subject" optional>
          Subject
        </Label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={LIMITS.subject}
          value={fields.subject}
          onChange={(e) => update('subject', e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy('subject')}
          className={inputClass(Boolean(errors.subject))}
        />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          value={fields.message}
          onChange={(e) => update('message', e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message', 'contact-message-count')}
          className={inputClass(Boolean(errors.message))}
        />
        <p id="contact-message-count" className="mt-2 text-right text-xs text-purple-top/70">
          {fields.message.length} / {LIMITS.message} characters
        </p>
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      {/* Honeypot — hidden from people and screen readers; only bots fill it in. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status.kind === 'error' && (
        <div role="alert" className="rounded-xl border border-red-700 bg-white px-4 py-3 text-sm text-red-700">
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-purple-top px-6 py-3 text-sm font-bold text-lilac transition-colors hover:bg-purple-bottom disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
