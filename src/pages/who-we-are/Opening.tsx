import Picture from '../../components/Picture'
import RisingArc from '../../components/RisingArc'
import { revealDelay } from '../../lib/reveal'
import { photos } from '../../photos'

const chapters = [
  { href: '#our-story', label: 'Our story' },
  { href: '#our-values', label: 'What we believe' },
  { href: '#our-vision', label: 'Our vision' },
  { href: '#our-team', label: 'Our team' },
]

export default function Opening() {
  return (
    <section aria-labelledby="who-heading" className="overflow-hidden pb-20 sm:pb-28">
      <div className="shell pt-10 sm:pt-16 lg:pt-20">
        <p className="eyebrow text-gold-ink">Who we are</p>
        {/* Fixed line breaks (4 lines on phones, 2 from tablet up) so the headline wraps
            identically in the fallback font and in Fraunces — no jump when it loads. */}
        <h1 id="who-heading" className="mt-5 font-display text-display font-semibold">
          <span className="block md:inline">We believe </span>
          <span className="block text-purple-mid italic md:inline">becoming </span>
          <br className="hidden md:block" />
          <span className="block md:inline">should start </span>
          <span className="block md:inline">early.</span>
        </h1>

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-12">
          <p className="max-w-2xl text-lede text-purple-top/80 lg:col-span-7">
            FemmeFluence Africa began with a simple conviction: young women should not have to wait
            until they are older, more experienced, or already successful before they begin becoming
            the women capable of creating meaningful change.
          </p>
          <nav aria-label="On this page" className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow text-purple-top/70">On this page</p>
            <ol className="mt-3 grid grid-cols-2 gap-x-6 border-t border-lilac-line lg:grid-cols-1">
              {chapters.map((chapter, index) => (
                <li key={chapter.href} className="border-b border-lilac-line">
                  <a href={chapter.href} className="group flex min-h-12 items-center gap-3 py-2 font-medium">
                    <span className="w-5 shrink-0 font-display text-sm text-gold-ink tabular-nums">0{index + 1}</span>
                    <span className="link-underline">{chapter.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Two-photo composition: a wide room shot with an arch portrait overlapping it */}
      <div className="shell mt-14 sm:mt-20">
        <div className="relative grid grid-cols-12 items-end gap-x-4 sm:gap-x-6">
          <figure className="col-span-12 sm:col-span-9" data-reveal="">
            <Picture
              photo={photos.attendees}
              priority
              sizes="(min-width: 80rem) 54rem, (min-width: 40rem) 72vw, 100vw"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>
          <figure
            className="relative col-span-7 col-start-6 -mt-20 sm:col-span-3 sm:col-start-auto sm:-mb-16 sm:mt-0"
            data-reveal=""
            style={revealDelay(1, 150)}
          >
            <RisingArc
              rings={2}
              stroke={1.6}
              className="absolute -top-10 left-1/2 w-[135%] max-w-none -translate-x-1/2 text-gold sm:-top-14"
            />
            <div className="relative overflow-hidden rounded-t-full border-4 border-lilac">
              <Picture
                photo={photos.speakerJoy}
                sizes="(min-width: 80rem) 17rem, (min-width: 40rem) 24vw, 56vw"
                className="aspect-[4/5] w-full object-cover object-[55%_center]"
              />
            </div>
          </figure>
        </div>
        <p className="mt-4 text-xs text-purple-top/70 sm:max-w-[70%]">
          The Amazon Conference, FemmeFluence Africa&rsquo;s flagship gathering.
        </p>
      </div>
    </section>
  )
}
