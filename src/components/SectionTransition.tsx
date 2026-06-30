import { type ReactNode } from 'react'

interface SectionTransitionProps {
 children: ReactNode
 className?: string
 id?: string
 snap?: boolean
}

export default function SectionTransition({
 children,
 className = '',
 id,
 snap,
}: SectionTransitionProps) {
 return (
  <section
  id={id}
  className={`${className}${snap ? ' snap-start' : ''}`}
  >
  {children}
  </section>
 )
}
