import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CIRCLE = 48
const PILL_EXTRA = 48
const EXPANDED = CIRCLE + PILL_EXTRA

interface MorphingArrowButtonProps {
  direction: 'prev' | 'next'
  onClick: (e: React.MouseEvent) => void
  label: string
  className?: string
  style?: React.CSSProperties
}

export default function MorphingArrowButton({
  direction,
  onClick,
  label,
  className = '',
  style,
}: MorphingArrowButtonProps) {
  const [hovered, setHovered] = useState(false)
  const isPrev = direction === 'prev'
  const Icon = isPrev ? ChevronLeft : ChevronRight

  return (
    <motion.button
      className={`absolute top-1/2 z-20 flex items-center rounded-full bg-[rgba(15,15,15,0.55)] backdrop-blur-md border border-white/[0.08] text-[#F5F5F5] shadow-lg overflow-hidden cursor-pointer ${className}`}
      style={{ ...style, height: CIRCLE, translateY: '-50%' }}
      animate={{
        width: hovered ? EXPANDED : CIRCLE,
        backgroundColor: hovered
          ? 'rgba(212,180,106,0.15)'
          : 'rgba(15,15,15,0.55)',
        borderColor: hovered
          ? 'rgba(212,180,106,0.3)'
          : 'rgba(255,255,255,0.08)',
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      aria-label={label}
    >
      {isPrev ? (
        <>
          <motion.div
            className="flex-shrink-0"
            animate={{ width: hovered ? PILL_EXTRA : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: CIRCLE, height: CIRCLE }}
          >
            <Icon strokeWidth={1.5} className="h-7 w-7 sm:h-9 sm:w-9" />
          </div>
        </>
      ) : (
        <>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: CIRCLE, height: CIRCLE }}
          >
            <Icon strokeWidth={1.5} className="h-7 w-7 sm:h-9 sm:w-9" />
          </div>
          <motion.div
            className="flex-shrink-0"
            animate={{ width: hovered ? PILL_EXTRA : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </>
      )}
    </motion.button>
  )
}
