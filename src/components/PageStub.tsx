type PageStubProps = {
  title: string
  specSection: string
  pending: string[]
}

export default function PageStub({ title, specSection, pending }: PageStubProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-display text-xs font-bold uppercase tracking-widest text-gold">
        {specSection}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-purple-top/70">
        Scaffolded route — content is pending per the build spec.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-purple-top/70">
        {pending.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
