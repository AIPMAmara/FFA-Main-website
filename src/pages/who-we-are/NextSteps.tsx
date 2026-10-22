import { Link } from 'react-router-dom'
import ButtonLink from '../../components/ButtonLink'
import Picture from '../../components/Picture'
import { revealDelay } from '../../lib/reveal'
import { JOIN_URL } from '../../links'
import { photos, type Photo } from '../../photos'

const nextPages: { to: string; title: string; text: string; photo: Photo }[] = [
  {
    to: '/community',
    title: 'The Community',
    text: 'What it means to belong, who it’s for, and how membership works.',
    photo: photos.audience,
  },
  {
    to: '/how-we-grow',
    title: 'How We Grow',
    text: 'Our programmes, from the World-Class Woman Academy to Phoenix Circle.',
    photo: photos.focus,
  },
  {
    to: '/our-work',
    title: 'Our Work',
    text: 'Our impact, The Amazon Conference, and the work behind them.',
    photo: photos.tacStage,
  },
]

export default function NextSteps() {
  return (
    <section aria-labelledby="next-heading" className="border-t border-lilac-line py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal="">
          <div>
            <p className="eyebrow text-gold-ink">Keep exploring</p>
            <h2 id="next-heading" className="mt-4 font-display text-headline font-semibold">
              See where becoming leads.
            </h2>
          </div>
          <ButtonLink to={JOIN_URL} arrow className="self-start sm:self-auto">
            Join the Community
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-6 lg:gap-10">
          {nextPages.map((page, index) => (
            <li key={page.to} data-reveal="" style={revealDelay(index)}>
              <Link to={page.to} className="group block">
                <div className="overflow-hidden">
                  <Picture
                    photo={page.photo}
                    sizes="(min-width: 80rem) 24rem, (min-width: 48rem) 30vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <p className="mt-5 flex items-center justify-between gap-4 font-display text-title font-semibold">
                  <span className="link-underline">{page.title}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                </p>
                <p className="mt-2 text-purple-top/75">{page.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
