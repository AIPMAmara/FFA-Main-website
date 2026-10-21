import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Route-level behaviour the router doesn't do on its own:
//  - start each new page at the top, or at the #section a link points to;
//  - fade [data-reveal] elements in as they scroll into view.
export default function PageEffects() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    } else if (navigationType !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, navigationType])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'))
    // Anything already on screen shows straight away; only content further
    // down animates, so nothing visible ever flickers out.
    for (const el of pending) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute('data-revealed', '')
    }
    document.documentElement.setAttribute('data-reveal-ready', '')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    for (const el of pending) {
      if (!el.hasAttribute('data-revealed')) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [pathname])

  return null
}
