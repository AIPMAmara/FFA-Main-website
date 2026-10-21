import { NavLink, Outlet } from 'react-router-dom'
import NewsletterForm from '../components/NewsletterForm'
import PageEffects from '../components/PageEffects'
import SiteHeader from '../components/SiteHeader'
import { JOIN_URL } from '../links'

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
      { to: JOIN_URL, label: 'Join the Community' },
      { to: '/get-involved#volunteer', label: 'Volunteer' },
      { to: '/get-involved#mentor', label: 'Mentor' },
      { to: '/get-involved#partner', label: 'Partner With Us' },
      { to: '/get-involved#sponsor', label: 'Sponsor' },
    ],
  },
  {
    heading: 'Connect',
    links: [{ to: '/contact', label: 'Contact' }],
  },
]

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-lilac text-purple-top">
      <PageEffects />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <footer className="surface-dark bg-purple-bottom text-lilac">
        <section
          id="newsletter"
          aria-labelledby="newsletter-heading"
          className="border-b border-lilac/10 py-12"
        >
          <div className="shell">
            <h2 id="newsletter-heading" className="font-display text-2xl font-bold">
              Join our newsletter
            </h2>
            <p className="mt-2 max-w-xl text-sm text-lilac/80">
              Get stories, opportunities and updates from the FemmeFluence Africa community, straight
              to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </section>
        <div className="shell grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow text-gold">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    {link.to.startsWith('http') ? (
                      <a href={link.to} className="text-lilac/80 hover:text-gold">
                        {link.label}
                      </a>
                    ) : (
                      <NavLink to={link.to} className="text-lilac/80 hover:text-gold">
                        {link.label}
                      </NavLink>
                    )}
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
