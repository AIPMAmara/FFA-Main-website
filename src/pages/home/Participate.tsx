import Picture from '../../components/Picture'
import SmartLink from '../../components/SmartLink'
import { JOIN_URL } from '../../links'
import { photos } from '../../photos'
import { revealDelay } from '../../lib/reveal'

const ways = [
  {
    title: 'Join the community',
    text: 'Become a member and grow alongside ambitious young women through our campus chapters and online community.',
    to: JOIN_URL,
  },
  {
    title: 'Grow through a programme',
    text: 'From the four-week World-Class Woman Academy to personal mentorship in Phoenix Circle.',
    to: '/how-we-grow',
  },
  {
    title: 'Attend The Amazon Conference',
    text: 'Our flagship gathering: three editions and more than 870 young women so far.',
    to: '/our-work#amazon-conference',
  },
  {
    title: 'Volunteer, mentor or partner',
    text: 'Lend your time, experience or organisation to the next generation of women leaders.',
    to: '/get-involved',
  },
  {
    title: 'Stay in the loop',
    text: 'Get stories, opportunities and updates from the community in your inbox.',
    to: '#newsletter',
  },
]

export default function Participate() {
  return (
    <section aria-labelledby="participate-heading" className="py-20 sm:py-28 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal="">
            <p className="eyebrow text-gold-ink">Get involved</p>
            <h2 id="participate-heading" className="mt-4 font-display text-headline font-semibold">
              Find your way in.
            </h2>
            <p className="mt-5 max-w-md text-lede text-purple-top/80">
              Whether you&rsquo;re just starting out or ready to give back, there&rsquo;s a place for
              you in FemmeFluence Africa.
            </p>
            <div className="mt-10 hidden max-w-xs overflow-hidden rounded-t-full lg:block">
              <Picture photo={photos.speakerRoom} sizes="20rem" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>

        <ul className="border-t border-lilac-line lg:col-span-7">
          {ways.map((way, index) => (
            <li key={way.title} className="border-b border-lilac-line" data-reveal="" style={revealDelay(index, 70)}>
              <SmartLink
                to={way.to}
                className="group flex items-start gap-4 py-7 transition-colors sm:gap-6 sm:py-8"
              >
                <span className="w-6 shrink-0 pt-1.5 font-display text-sm font-semibold text-gold-ink tabular-nums">
                  0{index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold transition-colors group-hover:text-purple-mid sm:text-[1.75rem]">
                    {way.title}
                  </span>
                  <span className="mt-2 block text-purple-top/75">{way.text}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-purple-top transition duration-200 group-hover:bg-purple-top group-hover:text-lilac group-active:scale-95 motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
