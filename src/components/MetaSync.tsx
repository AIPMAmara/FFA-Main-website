import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../routes'

const fallback = { title: 'FemmeFluence Africa', description: '' }

export default function MetaSync() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = routes.find((route) => route.path === pathname) ?? fallback
    document.title = meta.title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', meta.description)
  }, [pathname])

  return null
}
