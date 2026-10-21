import Picture from '../../components/Picture'
import RisingArc from '../../components/RisingArc'
import { photos } from '../../photos'
import { revealDelay } from './reveal'

const dimensions = [
  { name: 'Identity', text: 'Know who you are, what you value and what you stand for.' },
  { name: 'Competence', text: 'Build the skills and habits that make you capable and credible.' },
  { name: 'Influence', text: 'Use your voice to lift the people and places around you.' },
  { name: 'Vision', text: 'See further, and shape the life and work you want to build.' },
]

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className="border-t border-lilac-line py-20 sm:py-28 lg:py-32">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5" data-reveal="">
          <p className="eyebrow text-gold-ink">Our belief</p>
          <h2 id="story-heading" className="mt-4 font-display text-headline font-semibold">
            Becoming should start early.
          </h2>
        </div>
        <div className="space-y-5 text-lede text-purple-top/80 lg:col-span-6 lg:col-start-7" data-reveal="">
          <p>
            FemmeFluence Africa began in December 2023 with a simple conviction: young women should
            not have to wait until they are older, more experienced or already successful before they
            begin becoming the women capable of creating meaningful change.
          </p>
          <p>
            So we built the space young women often need but rarely find &mdash; somewhere to ask
            better questions, have honest conversations, learn from women ahead of them, and take
            their growth seriously.
          </p>
        </div>
      </div>

      <div className="shell mt-14 grid items-end gap-10 sm:mt-20 lg:grid-cols-12">
        <figure className="lg:col-span-7" data-reveal="">
          <Picture
            photo={photos.focus}
            sizes="(min-width: 80rem) 44rem, (min-width: 64rem) 56vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
        <blockquote className="lg:col-span-5 lg:pb-4" data-reveal="" style={revealDelay(1)}>
          <RisingArc rings={2} stroke={4} className="w-20 text-gold" />
          <p className="mt-5 font-display text-title font-medium">
            &ldquo;I started FemmeFluence Africa because I wanted young women to start earlier.&rdquo;
          </p>
          <footer className="mt-5 text-sm text-purple-top/75">
            <span className="font-bold text-purple-top">Amarachi Obed</span>, Founder
          </footer>
        </blockquote>
      </div>

      <div className="shell mt-20 sm:mt-28">
        <h3 className="max-w-2xl font-display text-title font-semibold" data-reveal="">
          We help young women grow in four directions.
        </h3>
        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {dimensions.map((dimension, index) => (
            <li
              key={dimension.name}
              className="border-t-2 border-purple-top py-6"
              data-reveal=""
              style={revealDelay(index)}
            >
              <span className="font-display text-sm font-semibold text-gold-ink tabular-nums">
                0{index + 1}
              </span>
              <h4 className="mt-3 font-display text-2xl font-semibold">{dimension.name}</h4>
              <p className="mt-2 text-purple-top/75">{dimension.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
