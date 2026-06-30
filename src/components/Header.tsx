import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../foundation/providers/AppProvider'

import { BOOKING_URL } from '../lib/data'
import MenuOverlay from './MenuOverlay'

interface HeaderProps {
 menuOpen: boolean
 setMenuOpen: (open: boolean) => void
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
 const { pathname } = useLocation()
 const navigate = useNavigate()
 const { requestIntro } = useApp()

 useEffect(() => {
 setMenuOpen(false)
 }, [pathname, setMenuOpen])

 useEffect(() => {
 document.body.style.overflow = menuOpen ? 'hidden' : ''
 return () => { document.body.style.overflow = '' }
 }, [menuOpen])

 const handleLogoClick = () => {
 if (pathname === '/') {
 requestIntro()
 window.scrollTo({ top: 0, behavior: 'smooth' })
 } else {
 navigate('/')
 }
 }

 return (
 <>
  {pathname === '/' ? (
  <nav id="header-nav" className="fixed inset-x-0 top-0 z-60">
  <div className="relative flex items-center justify-between px-4 sm:px-6 py-9">
  <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="text-navigation"
  >
  Rezervovat
  </a>
  <div id="header-center-slot" className="absolute left-1/2 top-1/2" />
  <button
  onClick={() => setMenuOpen(true)}
  className="text-navigation"
  >
  Menu
  </button>
  </div>
  </nav>
  ) : (
  <nav id="header-nav" className="fixed inset-x-0 top-0 z-60">
  <div className="flex items-center justify-between px-4 sm:px-6 py-9">
  <button onClick={handleLogoClick} className="text-navigation">
  Barberman
  <span className="ml-2 text-gold-100/55">Revolution</span>
  </button>
  <div className="flex items-center gap-6">
  <a
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="text-navigation"
  >
  Rezervovat
  </a>
  <button
  onClick={() => setMenuOpen(true)}
  className="text-navigation"
  >
  Menu
  </button>
  </div>
  </div>
  </nav>
  )}
 <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
 </>
 )
}
