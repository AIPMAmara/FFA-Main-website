import { NavLink, Outlet } from 'react-router-dom'

const primaryNav = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/community', label: 'The Community' },
  { to: '/how-we-grow', label: 'How We Grow' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/stories-ideas', label: 'Stories & Ideas' },
  { to: '/get-involved', label: 'Get Involved' },
]

const footerColumns = [
  {
    heading: 'About',
    links: [
      { to: '/who-we-are#our-story', label: 'Our Story' },
      { to: '/who-we-are#our-vision', label: 'Our Vision' },
      { to: '/who-we-are#our-values', label: 'Our Values' },
      { to: '/who-we-are#our-team', label: 'Our Team' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { to: '/community', label: 'The Community' },
      { to: '/how-we-grow', label: 'How We Grow' },
      { to: '/our-work', label: 'Our Work' },
      { to: '/our-work#amazon-conference', label: 'The Amazon Conference' },
      { to: '/stories-ideas', label: 'Stories & Ideas' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { to: '/get-involved#join', label: 'Join the Community' },
      { to: '/get-involved#volunteer', label: 'Volunteer' },
      { to: '/get-involved#mentor', label: 'Mentor' },
      { to: '/get-involved#partner', label: 'Partner With Us' },
      { to: '/get-involved#sponsor', label: 'Sponsor' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { to: '/contact', label: 'Contact' },
      { to: '/get-involved#newsletter', label: 'Newsletter' },
    ],
  },
]

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-lilac text-purple-top">
      <header className="sticky top-0 z-50 bg-lilac/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="font-display text-lg font-bold tracking-tight">
            FemmeFluence Africa
          </NavLink>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'text-gold' : 'hover:text-gold transition-colors'
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <NavLink
            to="/get-involved#join"
            className="rounded-full bg-purple-top px-5 py-2 text-sm font-bold text-lilac hover:bg-purple-bottom"
          >
            Join the Community
          </NavLink>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-purple-bottom text-lilac">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-gold">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <NavLink to={link.to} className="text-lilac/80 hover:text-gold">
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-lilac/10 px-6 py-4 text-center text-xs text-lilac/60">
          © {new Date().getFullYear()} FemmeFluence Africa. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
