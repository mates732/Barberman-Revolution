import { motion } from 'framer-motion'
import Logo from './Logo'

interface AnimatedLogoProps {
  style?: Record<string, unknown>
  onClick?: () => void
}

export default function AnimatedLogo({ style, onClick }: AnimatedLogoProps) {
  return (
    <motion.button
      className="cursor-pointer"
      style={style}
      onClick={onClick}
      aria-label="Domů"
    >
      <Logo className="h-14 w-14 sm:h-16 sm:w-16 flex-none" />
    </motion.button>
  )
}
