import { existsSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

type DevResponse = ServerResponse & {
  status(code: number): DevResponse
  json(data: unknown): void
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

// Runs the api/*.ts functions during `npm run dev` with the same
// request/response shape Vercel provides, so the forms can be tested locally
// without the Vercel CLI or any link to a live Vercel project. Dev server only.
function localApi(): Plugin {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      // Server-side only: .env.local values are never sent to the browser.
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

      server.middlewares.use('/api', async (req, res, next) => {
        // "/contact" → api/contact.ts; anything else (incl. api/_lib) falls through.
        const name = /^\/([a-z0-9-]+)\/?(?:\?.*)?$/.exec(req.url ?? '')?.[1]
        if (!name || !existsSync(path.join(server.config.root, 'api', `${name}.ts`))) {
          next()
          return
        }

        try {
          const raw = await readBody(req)
          let body: unknown = raw
          try {
            body = JSON.parse(raw)
          } catch {
            // Not JSON — pass the raw text through, as Vercel does.
          }

          const response = res as DevResponse
          response.status = (code) => {
            res.statusCode = code
            return response
          }
          response.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }

          const { default: handler } = await server.ssrLoadModule(`/api/${name}.ts`)
          await handler(Object.assign(req, { body }), response)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
})
