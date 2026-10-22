import RisingArc from '../../components/RisingArc'

export default function OriginStory() {
  return (
    <section id="our-story" aria-labelledby="story-heading" className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32" data-reveal="">
            <p className="eyebrow text-gold-ink">Our story</p>
            <p className="mt-6 text-sm text-purple-top/70">Founded in December</p>
            <p className="font-display text-[clamp(5rem,3.5rem+7vw,9.5rem)] leading-[0.9] font-semibold tracking-tight text-purple-top">
              2023
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="story-heading" className="font-display text-headline font-semibold" data-reveal="">
            It began with a space young women rarely find.
          </h2>
          <div className="mt-8 max-w-2xl space-y-6 text-lede text-purple-top/80" data-reveal="">
            <p>
              FemmeFluence Africa began in December 2023 with a desire to create the kind of space
              young women often need but rarely find.
            </p>
            <p>
              A space where they could ask better questions, have honest conversations, learn from
              women ahead of them, and take their growth seriously.
            </p>
          </div>

          <figure className="my-14 border-y border-lilac-line py-10 sm:my-16" data-reveal="">
            <RisingArc rings={2} stroke={4} className="w-16 text-gold" />
            <blockquote className="mt-5 font-display text-[clamp(1.625rem,1.3rem+1.6vw,2.5rem)] leading-tight font-medium">
              &ldquo;I started FemmeFluence Africa because I wanted young women to start earlier.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-purple-top/75">
              <span className="font-bold text-purple-top">Amarachi Obed</span>, Founder &amp; Convener
            </figcaption>
          </figure>

          <div className="max-w-2xl space-y-6 text-lede text-purple-top/80" data-reveal="">
            <p>
              That space has since grown into campus chapters at the University of Nigeria (UNN), the
              University of Calabar (UNICAL) and Ebonyi State University (EBSU), leadership
              programmes, and The Amazon Conference &mdash; reaching young women who speak English,
              Igbo and French.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
