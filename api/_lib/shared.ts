import type { VercelRequest, VercelResponse } from '@vercel/node'

// Helpers shared by the /api form handlers. Files in api/_lib are not
// deployed as endpoints themselves (Vercel skips paths starting with "_").

export const GENERIC_ERROR = 'Sorry, something went wrong on our side. Please try again in a few minutes.'
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Spam protection: a real person takes more than a few seconds to fill a form.
const MIN_FILL_MS = 3000

// Rate limit per IP address. Kept in memory, so it is best-effort: it resets
// when Vercel starts a fresh instance. Add a Vercel Firewall rate-limit rule
// on /api/* for a hard limit.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const recentRequests = new Map<string, number[]>()

export function text(value: unknown) {
  return typeof value === 'string' ? value : ''
}

// Strip line breaks from anything that ends up in an email header.
export function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Greet by first name only when it looks like a name — emails sent to a typed-in
// address must not carry a stranger's free text (links, adverts) to them.
export function greeting(name: string) {
  const firstName = name.trim().split(/\s+/)[0] ?? ''
  return /^[\p{L}'-]{1,40}$/u.test(firstName) ? `Hi ${firstName},` : 'Hi there,'
}

function clientIp(req: VercelRequest) {
  const forwarded = req.headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return first?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, recent)
    return true
  }
  recent.push(now)
  recentRequests.set(ip, recent)
  return false
}

// Runs the checks every form submission goes through before anything is sent.
// Returns the parsed body, or null after it has already responded with an error.
export function acceptSubmission(
  req: VercelRequest,
  res: VercelResponse,
  requiredEnv: string[],
): Record<string, unknown> | null {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return null
  }

  // Only accept JSON so other websites can't post to these forms from the browser.
  if (!String(req.headers['content-type'] ?? '').includes('application/json')) {
    res.status(415).json({ ok: false, error: GENERIC_ERROR })
    return null
  }

  const missing = requiredEnv.filter((name) => !process.env[name])
  if (missing.length > 0) {
    console.error(`Form handler is not configured: set ${missing.join(', ')}.`)
    res.status(500).json({ ok: false, error: GENERIC_ERROR })
    return null
  }

  if (isRateLimited(clientIp(req))) {
    res.status(429).json({
      ok: false,
      error: 'You’ve sent several requests in a short time. Please wait a few minutes and try again.',
    })
    return null
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>

  // Honeypot field filled in, or form submitted too fast to be a person. The
  // elapsed time is measured in the browser, so clock differences don't matter.
  const elapsed = Number(body.elapsedMs)
  if (text(body.website) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    res.status(400).json({
      ok: false,
      error: 'Sorry, we couldn’t accept that submission. Please wait a moment and try again.',
    })
    return null
  }

  return body
}

// Calls the Resend API. Returns the status and parsed body; never throws on
// an error status, so callers can react to e.g. 404 (contact not found).
export async function resend(method: string, path: string, payload?: unknown) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  })
  const raw = await response.text().catch(() => '')
  let data: Record<string, unknown> = {}
  try {
    data = raw ? JSON.parse(raw) : {}
  } catch {
    data = { message: raw }
  }
  return { status: response.status, ok: response.ok, data }
}

export type EmailPayload = {
  to: string[]
  reply_to?: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail(payload: EmailPayload) {
  const result = await resend('POST', '/emails', { from: process.env.EMAIL_FROM, ...payload })
  if (!result.ok) throw new Error(`Resend responded ${result.status}: ${JSON.stringify(result.data)}`)
  return result.data.id as string
}
