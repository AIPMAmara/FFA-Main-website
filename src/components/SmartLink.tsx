import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type SmartLinkProps = {
  /** Site route ("/contact"), full URL ("https://…") or same-page anchor ("#newsletter"). */
  to: string
  className?: string
  children: ReactNode
}

// Router link for site pages; a plain <a> for other sites and #anchors.
export default function SmartLink({ to, className, children }: SmartLinkProps) {
  if (to.startsWith('http') || to.startsWith('#')) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
