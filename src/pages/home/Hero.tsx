import ButtonLink from '../../components/ButtonLink'
import Picture from '../../components/Picture'
import RisingArc from '../../components/RisingArc'
import { JOIN_URL } from '../../links'
import { photos } from '../../photos'

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="shell grid gap-24 pt-10 pb-20 sm:gap-28 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="eyebrow text-gold-ink">A community for young African women</p>
          <p className="mt-6 max-w-xl font-display text-xl text-purple-top/75 sm:text-2xl">
            Africa doesn&rsquo;t need women who are merely ready.
          </p>
          {/* Fixed line breaks per screen size so the headline wraps identically in the
              fallback font and in Fraunces — no jump when the font loads.
              Phones: It needs / women who / are becoming.  Tablets & large screens:
              It needs women / who are becoming.  Small laptops: … / who are / becoming. */}
          <h1 id="hero-heading" className="mt-2 font-display text-display font-semibold">
            It needs <br className="md:hidden" />
            women <br className="hidden md:inline" />
            who <br className="md:hidden" />
            are <br className="hidden lg:inline xl:hidden" />
            <span className="relative inline-block text-purple-mid italic">
              becoming.
              {/* Gold underline in the rising-arc motif */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-[0.12em] h-[0.18em] w-full text-gold"
                data-underline-intro=""
              >
                <path
                  d="M3 17 Q 100 -3 197 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lede text-purple-top/80">
            FemmeFluence Africa is a leadership and personal development community helping young
            women build the self-awareness, competence, influence and vision to lead &mdash; starting
            where they are.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <ButtonLink to={JOIN_URL} arrow>
              Join the Community
            </ButtonLink>
            <a
              href="#story"
              className="inline-flex min-h-12 items-center justify-center font-bold underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-purple-mid sm:justify-start"
            >
              Discover our story
            </a>
          </div>
        </div>

        {/* Arch-topped portrait with gold arcs rising around it like a sunrise */}
        <figure className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:col-span-5 lg:mt-24 lg:max-w-md">
          <div className="pointer-events-none absolute inset-x-0 top-0 aspect-square" aria-hidden="true">
            <RisingArc
              rings={3}
              stroke={0.8}
              className="absolute top-1/2 left-1/2 w-[132%] max-w-none -translate-x-1/2 -translate-y-full text-gold lg:w-[140%]"
            />
          </div>
          <div className="relative overflow-hidden rounded-t-full bg-lilac-deep" data-arc-intro="">
            <Picture
              photo={photos.reflection}
              priority
              sizes="(min-width: 64rem) 28rem, (min-width: 40rem) 24rem, 19rem"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs text-purple-top/70">
            At The Amazon Conference, Calabar
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
