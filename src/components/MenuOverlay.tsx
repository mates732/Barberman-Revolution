import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { navLinks, contact, BOOKING_URL } from '../lib/data'
import { useCallback } from 'react'

interface MenuOverlayProps {
 open: boolean
 onClose: () => void
}

const ease = [0.43, 0.13, 0.23, 0.96] as const

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.25, ease } },
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = useLocation().pathname
  const navigate = useNavigate()

  const handleNavClick = useCallback((href: string) => {
    const sectionId = href.replace('/#', '')
    onClose()
    setTimeout(() => {
      if (pathname !== '/' && sectionId) {
        navigate('/')
      }
      requestAnimationFrame(() => scrollToSection(sectionId))
    }, 500)
  }, [onClose, navigate, pathname])

  const handleBookingClick = useCallback(() => {
    onClose()
    setTimeout(() => {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
    }, 500)
  }, [onClose])

  return (
   <AnimatePresence>
   {open && (
   <motion.div
   key="menu-overlay"
   className="fixed inset-0 z-[70] flex flex-col"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   transition={{ duration: 0.5, ease }}
   >
   <div
   className="absolute inset-0"
   style={{
   backgroundImage: "url('/images/pozadi.jpg')",
   backgroundSize: 'cover',
   backgroundPosition: 'center 25%',
   backgroundRepeat: 'no-repeat',
   }}
   />
   <motion.div
   className="absolute inset-0 backdrop-blur-[2px] bg-ink-950/30"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   transition={{ duration: 0.5, ease }}
   />
   <div
   className="absolute inset-0"
   style={{
   background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
   }}
   />
   <div
   className="absolute inset-0 pointer-events-none"
   style={{
   background: 'radial-gradient(ellipse at 25% 15%, rgba(212,180,106,0.08) 0%, transparent 60%)',
   }}
   />

   <div className="relative z-10 flex flex-col flex-1">
   <div className="flex items-center justify-between px-4 sm:px-6 py-9">
   <span className="text-navigation text-gold-100">
   Barberman
   </span>
   <button
   onClick={onClose}
   className="group flex items-center gap-2 text-navigation text-gold-200/70 hover:text-gold-300 transition-colors duration-250"
   aria-label="Zavřít menu"
   >
   Zavřít
   <X className="h-4 w-4" />
   </button>
   </div>

   <motion.nav
   className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8"
   variants={{
   hidden: {},
   visible: {
   transition: { staggerChildren: 0.05, delayChildren: 0.15 },
   },
   exit: {
   transition: { staggerChildren: 0.03, staggerDirection: -1 },
   },
   }}
   initial="hidden"
   animate="visible"
   exit="exit"
   >
   {navLinks.map((l) => (
   <motion.div key={l.href} variants={itemVariants} className="group relative">
   <span className="absolute -left-12 top-1/2 -translate-y-1/2 w-0 h-px bg-gold-500/70 group-hover:w-9 transition-all duration-300 pointer-events-none" />
   <button
   onClick={() => handleNavClick(l.href)}
   className="relative block font-display text-4xl font-600 uppercase tracking-[0.12em] text-white/55 hover:text-gold-400 transition-colors duration-300 hover:translate-x-2 sm:text-6xl lg:text-7xl cursor-pointer"
   >
   {l.label}
   </button>
   </motion.div>
   ))}
   </motion.nav>

   <motion.div
   className="-mt-15 mb-6 flex justify-center"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4, ease } }}
   exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
   >
   <button
   onClick={handleBookingClick}
   className="inline-flex items-center justify-center bg-gold-500 px-9 py-3.5 sm:px-10 sm:py-4 text-cta hover:bg-gold-400 transition-colors duration-250 cursor-pointer"
   >
   Rezervovat termín
   </button>
   </motion.div>

   <motion.div
   className="px-4 sm:px-6 py-6"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1, transition: { delay: 0.55, duration: 0.4, ease } }}
   exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
   >
   <div className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:justify-between">
   <a
   href={`tel:${contact.phone.replace(/\s/g, '')}`}
   className="text-supporting hover:text-gold-300 transition-colors duration-250"
   >
   {contact.phone}
   </a>
   <span className="text-supporting">
   {contact.address}, {contact.city}
   </span>
   <span className="text-decorative uppercase tracking-[0.3em]">
   Most · CZ
   </span>
   </div>
   </motion.div>
   </div>
   </motion.div>
   )}
   </AnimatePresence>
  )
}
