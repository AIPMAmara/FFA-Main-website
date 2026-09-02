import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const variants = {
  gold: 'bg-gold text-purple-top hover:opacity-90',
  purple: 'bg-purple-top text-lilac hover:bg-purple-bottom',
  outline: 'border border-purple-top text-purple-top hover:bg-purple-top hover:text-lilac',
  'outline-light': 'border border-lilac/60 text-lilac hover:bg-lilac hover:text-purple-top',
} as const

type CtaLinkProps = {
  to: string
  variant?: keyof typeof variants
  children: ReactNode
}

export default function CtaLink({ to, variant = 'gold', children }: CtaLinkProps) {
  return (
    <NavLink
      to={to}
      className={`inline-block rounded-full px-6 py-3 text-sm font-bold transition-colors ${variants[variant]}`}
    >
      {children}
    </NavLink>
  )
}
