// Only verified facts until team photos and bios are supplied (see PROGRESS.md).
export default function Team() {
  return (
    <section id="our-team" aria-labelledby="team-heading" className="py-20 sm:py-28 lg:py-32">
      <div className="shell grid gap-10 lg:grid-cols-12" data-reveal="">
        <div className="lg:col-span-4">
          <p className="eyebrow text-gold-ink">Our team</p>
          <h2 id="team-heading" className="mt-4 font-display text-headline font-semibold">
            The people behind it.
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:pt-3">
          <div className="border-t-2 border-purple-top pt-6">
            <p className="font-display text-title font-semibold">Amarachi Obed</p>
            <p className="mt-1 text-sm font-bold text-gold-ink">Founder &amp; Convener</p>
            <p className="mt-4 text-purple-top/80">
              Started FemmeFluence Africa in December 2023 so young women could start becoming
              earlier.
            </p>
          </div>
          <div className="border-t-2 border-purple-top pt-6">
            <p className="font-display text-title font-semibold">80+ volunteers and team leads</p>
            <p className="mt-1 text-sm font-bold text-gold-ink">Mobilised since 2023</p>
            <p className="mt-4 text-purple-top/80">
              The chapters, programmes and conferences run on volunteers who give their time to the
              next generation of women leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
