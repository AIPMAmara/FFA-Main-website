import type { ReactNode } from 'react'
import SmartLink from './SmartLink'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-200 ease-out active:translate-y-px active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:transform-none'

const sizes = {
  md: 'min-h-12 px-6 py-3 text-[0.9375rem]',
  sm: 'min-h-10 px-4 py-2 text-sm sm:px-5',
} as const

const variants = {
  primary: 'bg-purple-top text-lilac hover:bg-purple-mid',
  gold: 'bg-gold text-purple-bottom hover:bg-[#d3ab62]',
  outline: 'border-2 border-purple-top text-purple-top hover:bg-purple-top hover:text-lilac',
  'outline-light': 'border-2 border-lilac/70 text-lilac hover:border-lilac hover:bg-lilac hover:text-purple-top',
} as const

type ButtonLinkProps = {
  /** Site route ("/contact"), full URL ("https://…") or same-page anchor ("#story"). */
  to: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  arrow?: boolean
  className?: string
  children: ReactNode
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export default function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
}: ButtonLinkProps) {
  return (
    <SmartLink to={to} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </SmartLink>
  )
}
