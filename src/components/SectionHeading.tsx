interface SectionHeadingProps {
  label: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ label, align = 'left', className = '' }: SectionHeadingProps) {
  const line = <span className="h-px w-11 bg-white/80" />

  const text = (
    <span className="font-serif italic font-500 text-sm sm:text-base uppercase tracking-[0.25em] text-white">
      {label}
    </span>
  )

  return (
    <div
      className={`mb-8 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      {line}
      {text}
      {align === 'center' && line}
    </div>
  )
}
