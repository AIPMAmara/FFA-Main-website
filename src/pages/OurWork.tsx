export default function OurWork() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow text-gold-ink">
        Section 5.3 — Our Work
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">
        We&rsquo;ve been building, one woman at a time.
      </h1>
      <p className="mt-6 text-purple-top/80">
        Since 2023, FemmeFluence Africa has grown from a young community into a growing ecosystem
        of leadership and personal development experiences for young women.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {[
          ['1,000+', 'Women reached'],
          ['500+', 'TAC participants'],
          ['100+', 'Mentorship reach'],
          ['14+', 'Webinars'],
          ['10+', 'Institutions reached'],
        ].map(([num, label]) => (
          <div key={label}>
            <dt className="font-display text-3xl font-bold text-gold">{num}</dt>
            <dd className="text-sm text-purple-top/70">{label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs italic text-purple-top/50">
        Figures need verification before publication (Section 5.3).
      </p>

      <div id="amazon-conference" className="mt-16 rounded-2xl bg-purple-top p-8 text-lilac">
        <p className="eyebrow text-gold">
          Flagship Initiative
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold">The Amazon Conference</h2>
        <p className="mt-3 text-lilac/80">
          FFA&rsquo;s flagship gathering for young women — links out to the separate TAC website
          (Section 3: FFA and TAC are separate sites).
        </p>
        <a
          href="#"
          className="mt-4 inline-block rounded-full bg-gold px-5 py-2 text-sm font-bold text-purple-top"
        >
          Explore TAC → <span className="text-xs">(URL pending)</span>
        </a>
      </div>

      <p className="mt-12 text-sm italic text-purple-top/50">
        Community Initiatives, Partnerships &amp; Collaborations, Impact Stories, and
        Reports/Resources copy still pending (Section 5.3).
      </p>
    </div>
  )
}
