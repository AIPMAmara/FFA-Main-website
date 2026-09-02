import type { VercelRequest, VercelResponse } from '@vercel/node'

type JoinPayload = {
  name?: string
  email?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email } = req.body as JoinPayload

  if (!name || !email) {
    res.status(400).json({ error: 'name and email are required' })
    return
  }

  // TODO (Section 6, decided architecture):
  //  1. Append { name, email, joinedAt: new Date().toISOString() } to the
  //     community-signups Google Sheet via the Sheets API (needs a service
  //     account — GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY /
  //     GOOGLE_SHEETS_SPREADSHEET_ID env vars, none of which exist yet).
  //  2. Trigger the Brevo confirmation email via their transactional API
  //     (BREVO_API_KEY env var, template id TBD).
  // Both are external calls this stub does not make — see open questions.

  res.status(501).json({ error: 'Not implemented — Sheets + Brevo wiring pending' })
}
