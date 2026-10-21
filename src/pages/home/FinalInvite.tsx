import ButtonLink from '../../components/ButtonLink'
import RisingArc from '../../components/RisingArc'
import { JOIN_URL } from '../../links'

export default function FinalInvite() {
  return (
    <section
      aria-labelledby="invite-heading"
      className="surface-dark relative overflow-hidden bg-purple-top text-lilac"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" data-reveal="">
        <RisingArc rings={4} stroke={0.7} className="w-[30rem] max-w-none shrink-0 text-gold/45 sm:w-[44rem]" />
      </div>
      <div className="shell relative py-24 text-center sm:py-32 lg:py-40" data-reveal="">
        <p className="eyebrow text-gold">Your invitation</p>
        <h2 id="invite-heading" className="mx-auto mt-5 max-w-3xl font-display text-display font-semibold">
          Your becoming starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lede text-lilac/80">
          Join a community of young African women who refuse to wait &mdash; and grow into who
          you&rsquo;re capable of being.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink to={JOIN_URL} variant="gold" arrow className="w-full sm:w-auto">
            Join the Community
          </ButtonLink>
          <ButtonLink to="/contact" variant="outline-light" className="w-full sm:w-auto">
            Talk to us
          </ButtonLink>
        </div>
        <p className="mt-12 font-display text-lg text-gold">
          Start early. Grow intentionally. Lead boldly.
        </p>
      </div>
    </section>
  )
}
