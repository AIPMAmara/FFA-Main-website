// The site's visual motif: arcs rising from a horizon, like the sun coming up —
// "becoming". Drawn in currentColor (usually gold). Inside a [data-reveal]
// element the arcs draw themselves in; otherwise they simply appear.

type RisingArcProps = {
  /** Number of concentric arcs, outermost first. */
  rings?: number
  /**
   * Line thickness in viewBox units (the arc is 200 units wide), so pick it
   * for the size the arc renders at: roughly 2px ÷ (rendered width ÷ 200).
   * (vector-effect="non-scaling-stroke" would do this automatically, but
   * Chrome then draws pathLength-based dashes only partway along the arc.)
   */
  stroke?: number
  className?: string
}

export default function RisingArc({ rings = 1, stroke = 1.5, className = '' }: RisingArcProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      {Array.from({ length: rings }, (_, i) => {
        const r = 99 - i * 15
        return (
          <path
            key={r}
            d={`M ${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`}
            stroke="currentColor"
            strokeWidth={i === 0 ? stroke : stroke * 0.6}
            strokeOpacity={1 - i * 0.25}
            pathLength={1}
            data-arc-draw=""
            style={{ transitionDelay: `${150 + i * 120}ms`, animationDelay: `${200 + i * 150}ms` }}
          />
        )
      })}
    </svg>
  )
}
