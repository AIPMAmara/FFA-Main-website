import Picture from '../../components/Picture'
import { photos } from '../../photos'
import { revealDelay } from '../../lib/reveal'

// Figures from the September 2026 Impact Snapshot (owner-verified).
// Bar widths are proportional to the numbers (3,000 = 100%).
const tiers = [
  { value: '3,000+', label: 'young women reached', detail: 'across the continent, online and in person', width: 100 },
  { value: '2,000+', label: 'directly engaged', detail: 'through programmes, conferences and chapters', width: 67 },
  { value: '650+', label: 'active members', detail: 'across three university chapters: UNN, UNICAL and EBSU', width: 22 },
]

const programmeStats = [
  { value: '3', label: 'editions of The Amazon Conference, with 870+ attendees' },
  { value: '29', label: 'webinars on leadership and personal development' },
  { value: '3', label: 'intensive leadership bootcamps' },
  { value: '80+', label: 'volunteers and team leads mobilised' },
]

export default function Impact() {
  return (
    <section aria-labelledby="impact-heading" className="surface-dark bg-purple-bottom text-lilac">
      <figure className="relative">
        <Picture
          photo={photos.audience}
          sizes="100vw"
          className="h-[56vw] max-h-[34rem] min-h-60 w-full object-cover"
        />
        {/* Fades the photo into the section so the heading can sit across the join */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-purple-bottom/0 from-35% via-purple-bottom/85 via-85% to-purple-bottom"
        />
      </figure>

      <div className="shell relative -mt-6 pb-20 sm:-mt-16 sm:pb-28 lg:pb-32">
        <div className="max-w-2xl" data-reveal="">
          <p className="eyebrow text-gold">Our impact since December 2023</p>
          <h2 id="impact-heading" className="mt-4 font-display text-headline font-semibold">
            From reach to real leadership.
          </h2>
          <p className="mt-5 text-lede text-lilac/80">
            We measure impact as a progression &mdash; women who are not only reached, but formed, and
            who go on to lead.
          </p>
        </div>

        <dl className="mt-14 space-y-10 sm:mt-16" data-reveal="">
          {tiers.map((tier) => (
            <div key={tier.label} className="grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,15rem)_1fr] md:items-end">
              <dt className="order-2">
                <span className="block text-lg font-bold">{tier.label}</span>
                <span className="block text-sm text-lilac/70">{tier.detail}</span>
                <span aria-hidden="true" className="mt-3 block h-1.5 bg-lilac/10">
                  <span data-grow="" className="block h-full bg-gold" style={{ width: `${tier.width}%` }} />
                </span>
              </dt>
              <dd className="font-display text-[clamp(3rem,2.2rem+3.5vw,5rem)] leading-none font-semibold tabular-nums order-1">
                {tier.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-lilac/15 pt-10 lg:grid-cols-4">
          {programmeStats.map((stat, index) => (
            <li key={stat.label} data-reveal="" style={revealDelay(index)}>
              <span className="block font-display text-4xl font-semibold text-gold sm:text-5xl">{stat.value}</span>
              <span className="mt-2 block text-sm text-lilac/75">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-4 border-t border-lilac/15 pt-10 lg:grid-cols-12" data-reveal="">
          <p className="eyebrow text-gold lg:col-span-3">Where it leads</p>
          <p className="font-display text-title lg:col-span-9">
            Women mentored through FemmeFluence have contested and won elected student leadership
            office at the University of Nigeria and the University of Calabar. Others have grown into
            public speakers and published authors.
          </p>
        </div>
      </div>
    </section>
  )
}
