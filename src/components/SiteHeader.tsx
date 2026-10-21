import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { JOIN_URL } from '../links'
import ButtonLink from './ButtonLink'
import Logo from './Logo'
import RisingArc from './RisingArc'

// The logo links home, so the desktop bar leaves "Home" out to stay compact.
const primaryNav = [
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/community', label: 'The Community' },
  { to: '/how-we-grow', label: 'How We Grow' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/stories-ideas', label: 'Stories & Ideas' },
  { to: '/get-involved', label: 'Get Involved' },
]
const mobileNav = [{ to: '/', label: 'Home' }, ...primaryNav, { to: '/contact', label: 'Contact' }]

const MENU_ID = 'site-menu'

function MenuIcon({ open }: { open: boolean }) {
  const line = 'absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none'
  return (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <span className={`${line} top-0 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
      <span className={`${line} bottom-0 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
    </span>
  )
}

export default function SiteHeader() {
  const { pathname } = useLocation()
  // The menu remembers which page it was opened on, so it closes by itself
  // whenever the page changes (link tap, back button, …).
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // A hairline under the bar once the page has scrolled.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Close the menu if the screen grows to desktop width while it's open.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 80rem)')
    const update = () => {
      if (desktop.matches) setOpenOn(null)
    }
    desktop.addEventListener('change', update)
    return () => desktop.removeEventListener('change', update)
  }, [])

  // While open: Esc closes it, the page behind can't scroll, and the page
  // behind is made inert so keyboard and screen-reader focus stays in the menu.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenOn(null)
      toggleRef.current?.focus()
    }
    const behind = document.querySelectorAll('main, footer')
    const previousOverflow = document.body.style.overflow

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    behind.forEach((el) => el.setAttribute('inert', ''))
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      behind.forEach((el) => el.removeAttribute('inert'))
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-lilac transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_1px_0_var(--color-lilac-line)]' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-purple-top px-4 py-2 text-sm font-bold text-lilac focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center gap-3 sm:gap-4 lg:h-20">
        <Link to="/" className="mr-auto shrink-0 rounded-sm" aria-label="FemmeFluence Africa — home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative block py-2 transition-colors duration-200 hover:text-purple-mid after:absolute after:inset-x-0 after:bottom-0.5 after:h-0.5 after:origin-left after:bg-gold after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink to={JOIN_URL} size="sm" className="hidden min-[22rem]:inline-flex xl:ml-4">
          <span className="sm:hidden">Join</span>
          <span className="hidden sm:inline">Join the Community</span>
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen(!open)}
          className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-lilac-deep active:bg-lilac-line xl:hidden"
        >
          <span className="sr-only">Menu</span>
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        id={MENU_ID}
        hidden={!open}
        className="surface-dark fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-purple-bottom text-lilac animate-menu-in motion-reduce:animate-none lg:top-20 xl:hidden"
      >
        <RisingArc
          rings={3}
          stroke={0.9}
          className="pointer-events-none absolute -right-24 bottom-0 w-80 text-gold/40 sm:w-[28rem]"
        />
        <nav aria-label="Main" className="shell relative flex min-h-full flex-col pt-6 pb-10">
          <ul>
            {mobileNav.map((item, index) => (
              <li
                key={item.to}
                className="animate-item-in border-b border-lilac/10 motion-reduce:animate-none"
                style={{ animationDelay: `${80 + index * 35}ms` }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center gap-3 py-3 font-display text-[1.625rem] leading-tight transition-colors duration-200 hover:text-gold sm:text-3xl ${
                      isActive ? 'text-gold' : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <ButtonLink to={JOIN_URL} variant="gold" arrow className="w-full sm:w-auto">
              Join the Community
            </ButtonLink>
            <p className="mt-6 text-sm text-lilac/70">Leadership and Positive Influence</p>
          </div>
        </nav>
      </div>
    </header>
  )
}
