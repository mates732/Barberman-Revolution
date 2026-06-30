import { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './foundation/providers/AppProvider'
import Header from './components/Header'
import AnimatedLogo from './components/AnimatedLogo'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function AppShell() {
  const { requestIntro } = useApp()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentTopRef = useRef(0)
  const { scrollY } = useScroll()
  const INITIAL_SCALE = 2.6
  const FINAL_SCALE = 1.85
  const FADE_GRADIENT = 40
  const iconX = useMotionValue(0)
  const iconY = useMotionValue(0)
  const logoScale = useMotionValue(INITIAL_SCALE)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const finalYRef = useRef(0)
  const detachScrollRef = useRef(0)
  const fadeClearRef = useRef(100)

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentTopRef.current = contentRef.current.getBoundingClientRect().top + window.scrollY
    }
    init()
  }, [])

  useEffect(() => {
    const handleResize = () => { init() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function init() {
    const hatBaseSize = window.matchMedia('(min-width: 640px)').matches ? 64 : 56
    const headerNav = document.getElementById('header-nav')
    const headerHeight = headerNav ? headerNav.getBoundingClientRect().height : 60

    const navCenter = headerHeight / 2
    finalYRef.current = Math.round(navCenter - hatBaseSize / 2 + 19)
    fadeClearRef.current = Math.round(headerHeight - 5)

    startXRef.current = Math.round(window.innerWidth / 2 - hatBaseSize / 2)
    iconX.set(startXRef.current)

    const heading = document.getElementById('hero-heading')
    if (!heading) return
    const headingTop = heading.getBoundingClientRect().top + window.scrollY

    startYRef.current = Math.round(headingTop - hatBaseSize / 2 - (hatBaseSize * INITIAL_SCALE) / 2 - 24)
    detachScrollRef.current = Math.max(startYRef.current - finalYRef.current, 1)
    updateLogoPosition(window.scrollY)
  }

  function updateLogoPosition(y: number) {
    const detachScroll = detachScrollRef.current
    const raw = Math.max(0, Math.min(y / detachScroll, 1))
    const t = 1 - Math.pow(1 - raw, 3)

    iconX.set(startXRef.current)
    iconY.set(startYRef.current - detachScroll * t)

    logoScale.set(INITIAL_SCALE + (FINAL_SCALE - INITIAL_SCALE) * t)
  }

  useMotionValueEvent(scrollY, 'change', updateLogoPosition)

  const maskStyle = useTransform(scrollY, (y) => {
    const top = contentTopRef.current
    const viewportTop = y - top
    const clear = fadeClearRef.current
    return `linear-gradient(to bottom, transparent ${viewportTop + clear}px, black ${viewportTop + clear + FADE_GRADIENT}px)`
  })

  const handleLogoClick = useCallback(() => {
    requestIntro()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [requestIntro])

  return (
  <>
  <ScrollToTop />
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: "url('/images/pozadi.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        backgroundRepeat: 'no-repeat',
      }}
    />
    {pathname === '/' && !menuOpen && (
      <AnimatedLogo
        style={{
          position: 'fixed' as const,
          left: 0,
          top: 0,
          zIndex: 80,
          x: iconX,
          y: iconY,
          scale: logoScale,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.35))',
          transformOrigin: 'center center',
        }}
        onClick={handleLogoClick}
      />
    )}
    {pathname === '/' && menuOpen && (
      <AnimatedLogo
        style={{
          position: 'fixed' as const,
          left: 0,
          top: 0,
          zIndex: 80,
          x: startXRef.current,
          y: finalYRef.current,
          scale: FINAL_SCALE,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.35))',
          transformOrigin: 'center center',
        }}
        onClick={handleLogoClick}
      />
    )}
      <div className="relative z-10 min-h-screen text-ink-100">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
       <motion.div
       ref={contentRef}
       style={{ maskImage: maskStyle, WebkitMaskImage: maskStyle }}
      >
      <main>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/nabidka" element={<OffersPage />} />
         <Route path="/o-nas" element={<AboutPage />} />
         <Route path="/kontakt" element={<ContactPage />} />
         <Route path="*" element={<HomePage />} />
       </Routes>
     </main>
     <Footer />
     </motion.div>
   </div>
  </>
  )
}

export default function App() {
  return (
  <BrowserRouter>
  <AppProvider>
  <AppShell />
  </AppProvider>
  </BrowserRouter>
  )
}
