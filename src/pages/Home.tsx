import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* 1. Hero — The FFA Proposition (Section 5.1) */}
      <section className="bg-gradient-to-b from-purple-top to-purple-bottom px-6 py-24 text-lilac">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">
            For African Women Who Refuse to Wait
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Africa doesn&rsquo;t need women who are merely ready. It needs women who are becoming.
          </h1>
          <p className="mt-6 text-lilac/80">
            FemmeFluence Africa is a community for young African women who believe becoming a
            woman of substance is not something to postpone until you have the title, the degree,
            the money or the perfect opportunity.
          </p>
          <p className="mt-4 text-lilac/80">
            We create the conversations, learning experiences, mentorship and community that help
            young women build the self-awareness, competence, influence and vision to lead —
            starting where they are, and becoming who they are capable of being.
          </p>
          <p className="mt-6 font-display italic text-gold">
            Start early. Grow intentionally. Lead boldly.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <NavLink
              to="/get-involved#join"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-purple-top hover:opacity-90"
            >
              Join the FemmeFluence Community
            </NavLink>
            <NavLink to="/who-we-are" className="text-sm font-medium text-lilac/80 hover:text-gold">
              Discover FemmeFluence Africa
            </NavLink>
          </div>
        </div>
      </section>

      {/* 2. "You're in the right place if…" — Audience Recognition (Section 5.1) */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold">You&rsquo;re in the right place if&hellip;</h2>
          <p className="mt-4 text-purple-top/80">
            You know there is more to you — but you&rsquo;re still figuring out what more looks
            like. Maybe you&rsquo;re in university wondering what kind of woman you want to become
            beyond your degree. Maybe you&rsquo;ve started your career and realized that being
            good at your work is only one part of becoming the woman you want to be. Maybe you
            have an idea you can&rsquo;t stop thinking about, but you&rsquo;re not sure you&rsquo;re
            ready to call yourself a founder, a leader, or even an expert.
          </p>
          <p className="mt-6 font-display text-xl font-bold text-gold">You belong here.</p>
          <div className="mt-6">
            <NavLink
              to="/community"
              className="rounded-full border border-purple-top px-6 py-3 text-sm font-bold hover:bg-purple-top hover:text-lilac"
            >
              Find Your Place in FFA
            </NavLink>
          </div>
        </div>
      </section>

      {/* 3. What FemmeFluence Africa Is — The Big Idea (Section 5.1) */}
      <section className="bg-purple-top/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold">
            More Than a Community. A Place to Become.
          </h2>
          <p className="mt-4 text-purple-top/80">
            FemmeFluence Africa brings together community, learning, mentorship, conversations and
            experiences that help young women grow across four dimensions: Identity, Competence,
            Influence and Vision.
          </p>
          <div className="mt-6">
            <NavLink
              to="/community"
              className="rounded-full bg-purple-top px-6 py-3 text-sm font-bold text-lilac hover:bg-purple-bottom"
            >
              Discover the FemmeFluence Community
            </NavLink>
          </div>
        </div>
      </section>

      {/* Remaining Home sections (Section 5.1, #4–#11) — pending assets & copy */}
      <section className="px-6 py-16 text-center text-sm text-purple-top/50">
        Remaining sections — Experience, Programmes, Community Stories, Impact Numbers, The Amazon
        Conference, Stories &amp; Ideas, Ways to Get Involved, Final Conversion — to be built out
        next (Section 5.1, items 4–11 of the spec).
      </section>
    </>
  )
}
