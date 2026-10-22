import RisingArc from '../../components/RisingArc'
import { revealDelay } from '../../lib/reveal'

// The vision statement, split into its four promises so each can land on its own.
const promises = [
  'lead meaningful lives,',
  'build thriving careers and businesses,',
  'influence their communities,',
  'and shape the future of Africa.',
]

export default function Vision() {
  return (
    <section
      id="our-vision"
      aria-labelledby="vision-heading"
      className="surface-dark relative overflow-hidden bg-purple-top text-lilac"
    >
      {/* Sunrise: arcs rise from the bottom edge as the section comes into view */}
      {/* On desktop the sun rises in the empty left column, clear of the vision text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:justify-start"
        data-reveal=""
      >
        <RisingArc
          rings={5}
          stroke={0.6}
          className="w-[40rem] max-w-none shrink-0 text-gold/35 sm:w-[56rem] lg:-ml-[18rem] lg:w-[48rem] lg:text-gold/55"
        />
      </div>

      <div className="shell relative py-24 sm:py-32 lg:py-40">
        <div className="grid gap-6 lg:grid-cols-12" data-reveal="">
          <p className="eyebrow text-gold lg:col-span-4 lg:pt-4">Our vision</p>
          <h2 id="vision-heading" className="font-display text-headline font-semibold lg:col-span-8">
            A generation of African women equipped to&hellip;
          </h2>
        </div>

        <ol className="mt-12 sm:mt-16 lg:ml-[calc(100%/3)]">
          {promises.map((promise, index) => (
            <li
              key={promise}
              className="flex items-baseline gap-5 border-t border-lilac/15 py-5 sm:gap-8 sm:py-7"
              data-reveal=""
              style={revealDelay(index, 140)}
            >
              <span className="w-6 shrink-0 font-display text-sm font-semibold text-gold tabular-nums">0{index + 1}</span>
              <span className="font-display text-[clamp(1.625rem,1.2rem+2.2vw,3.25rem)] leading-tight">
                {promise}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
