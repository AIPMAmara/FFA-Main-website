import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = path.join(root, 'dist')

const routes = [
  '/',
  '/who-we-are',
  '/community',
  '/how-we-grow',
  '/our-work',
  '/stories-ideas',
  '/get-involved',
  '/contact',
]

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render } = await import(
  pathToFileURL(path.join(dist, 'server', 'entry-server.js')).href
)

for (const url of routes) {
  const { html, head } = render(url)
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)

  const outDir = url === '/' ? dist : path.join(dist, url)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), page)
  console.log(`prerendered ${url === '/' ? '/' : url + '/'}`)
}

fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true })
