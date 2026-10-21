import ButtonLink from '../../components/ButtonLink'
import Picture from '../../components/Picture'
import { photos } from '../../photos'
import { revealDelay } from './reveal'

// Programme highlights. Community stories (testimonials) will be added to this
// section once supplied — never placeholder or invented quotes.
const programmes = [
  {
    figure: '45',
    figureLabel: 'women in the founding cohort',
    name: 'World-Class Woman Academy',
    text: 'A four-week leadership school for young women ready to grow with intention and lead with substance.',
  },
  {
    figure: '40+',
    figureLabel: 'women in the programme so far',
    name: 'Phoenix Circle',
    text: 'Personal mentorship that offers close guidance as women grow in confidence, direction and leadership.',
  },
]

export default function Programmes() {
  return (
    <section aria-labelledby="programmes-heading" className="bg-lilac-deep py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <div className="max-w-2xl" data-reveal="">
          <p className="eyebrow text-gold-ink">Programme highlights</p>
          <h2 id="programmes-heading" className="mt-4 font-display text-headline font-semibold">
            Where women grow.
          </h2>
        </div>

        <article className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="grid grid-cols-[1.35fr_1fr] gap-3 sm:gap-5 lg:col-span-7" data-reveal="">
            <div className="overflow-hidden rounded-t-full">
              <Picture
                photo={photos.tacStage}
                sizes="(min-width: 64rem) 26rem, 56vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="mt-16 self-end sm:mt-24">
              <Picture
                photo={photos.tacShirt}
                sizes="(min-width: 64rem) 19rem, 40vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal="" style={revealDelay(1)}>
            <p className="eyebrow text-gold-ink">Our flagship gathering</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight font-semibold">
              The Amazon Conference
            </h3>
            <p className="mt-4 text-lede text-purple-top/80">
              A gathering that brings young women together to find their voice, become who they&rsquo;re
              capable of being, and evolve as leaders.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-lilac-line pt-6">
              <div>
                <dt className="text-sm text-purple-top/70">Editions</dt>
                <dd className="font-display text-3xl font-semibold">3</dd>
              </div>
              <div>
                <dt className="text-sm text-purple-top/70">Attendees so far</dt>
                <dd className="font-display text-3xl font-semibold">870+</dd>
              </div>
              <div>
                <dt className="text-sm text-purple-top/70">At the largest</dt>
                <dd className="font-display text-3xl font-semibold">372</dd>
              </div>
            </dl>
            <ButtonLink to="/our-work#amazon-conference" variant="outline" arrow className="mt-8">
              About the conference
            </ButtonLink>
          </div>
        </article>

        <div className="mt-20 grid gap-12 border-t-2 border-purple-top pt-12 md:grid-cols-2 md:gap-16 lg:mt-28">
          {programmes.map((programme, index) => (
            <article key={programme.name} data-reveal="" style={revealDelay(index)}>
              <p className="flex items-baseline gap-3">
                <span className="font-display text-[clamp(3.5rem,2.8rem+3vw,5.5rem)] leading-none font-semibold text-purple-mid">
                  {programme.figure}
                </span>
                <span className="max-w-[10rem] text-sm text-purple-top/70">{programme.figureLabel}</span>
              </p>
              <h3 className="mt-6 font-display text-title font-semibold">{programme.name}</h3>
              <p className="mt-3 max-w-md text-purple-top/80">{programme.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-14" data-reveal="">
          <ButtonLink to="/how-we-grow" arrow>
            Explore all programmes
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
