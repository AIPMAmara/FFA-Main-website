import { revealDelay } from '../../lib/reveal'

const values = [
  { name: 'Intentionality', text: 'Becoming should be deliberate.' },
  { name: 'Substance', text: 'Depth over appearance.' },
  { name: 'Courage', text: 'The willingness to begin before everything feels certain.' },
  { name: 'Community', text: 'Meaningful growth doesn’t happen alone.' },
  { name: 'Excellence', text: 'Potential deserves development.' },
  { name: 'Responsibility', text: 'Influence is what you do with it.' },
  { name: 'Possibility', text: 'The present doesn’t limit the future.' },
]

// Figures from the September 2026 Impact Snapshot (owner-verified), as on the homepage.
const figures = [
  { value: '3,000+', label: 'young women reached since December 2023' },
  { value: '650+', label: 'active members across three university chapters' },
  { value: '3', label: 'languages: English, Igbo and French' },
]

export default function Beliefs() {
  return (
    <section id="our-values" aria-labelledby="values-heading" className="bg-lilac-deep py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12" data-reveal="">
          <p className="eyebrow text-gold-ink lg:col-span-4 lg:pt-4">What we believe</p>
          <h2 id="values-heading" className="max-w-3xl font-display text-headline font-semibold lg:col-span-8">
            Seven convictions shape everything we do.
          </h2>
        </div>

        <ol className="mt-12 border-t-2 border-purple-top sm:mt-16">
          {values.map((value, index) => (
            <li
              key={value.name}
              className="grid gap-x-8 gap-y-1 border-b border-lilac-line py-6 sm:py-7 md:grid-cols-12 md:items-baseline"
              data-reveal=""
              style={revealDelay(index, 60)}
            >
              <span className="font-display text-sm font-semibold text-gold-ink tabular-nums md:col-span-1">
                0{index + 1}
              </span>
              <h3 className="font-display text-[clamp(1.75rem,1.5rem+1.2vw,2.5rem)] leading-tight font-semibold md:col-span-4">
                {value.name}
              </h3>
              <p className="text-lede text-purple-top/80 md:col-span-7">{value.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-12" data-reveal="">
          <p className="eyebrow text-gold-ink lg:col-span-4">What it adds up to</p>
          <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-sm text-purple-top/75">{figure.label}</dt>
                <dd className="order-1 font-display text-5xl leading-none font-semibold text-purple-mid tabular-nums">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
