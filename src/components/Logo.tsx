import type { CSSProperties } from 'react'

// The FF shield mark is drawn with a CSS mask over the current text colour, so
// it renders purple on lilac and lilac on dark purple from a single cached file.
const markStyle: CSSProperties = {
  maskImage: 'url(/logo-mark.svg)',
  WebkitMaskImage: 'url(/logo-mark.svg)',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  aspectRatio: '1200 / 821',
}

type LogoProps = {
  className?: string
  withTagline?: boolean
}

export default function Logo({ className = '', withTagline = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="block h-7 shrink-0 bg-current sm:h-8" style={markStyle} />
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-bold tracking-tight sm:text-base">FemmeFluence</span>
        <span className="mt-0.5 text-[0.625rem] font-bold uppercase tracking-[0.32em] opacity-80">
          Africa
        </span>
        {withTagline && (
          <span className="mt-2 text-xs font-normal tracking-normal opacity-70">
            Leadership and Positive Influence
          </span>
        )}
      </span>
    </span>
  )
}
