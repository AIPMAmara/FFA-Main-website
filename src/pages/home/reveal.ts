import type { CSSProperties } from 'react'

// Staggers [data-reveal] items: revealDelay(i) → 0ms, 90ms, 180ms…
export function revealDelay(index: number, step = 90): CSSProperties {
  return { '--reveal-delay': `${index * step}ms` } as CSSProperties
}
