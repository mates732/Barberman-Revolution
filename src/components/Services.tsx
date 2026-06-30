import { useState, useRef, useLayoutEffect } from 'react'
import { mainServices, additionalServices, BOOKING_URL } from '../lib/data'
import type { Service } from '../lib/data'
import SectionHeading from './SectionHeading'

const tabs = [
  { key: 'main', label: 'Základní služby' },
  { key: 'additional', label: 'Přídavné služby' },
] as const

type TabKey = (typeof tabs)[number]['key']

function ServiceRow({ service }: { service: Service }) {
  const bookingUrl = service.bookingUrl || BOOKING_URL

  return (
  <a
  href={bookingUrl}
  target="_blank"
  rel="noopener noreferrer"
   className="group flex items-center justify-between gap-4 border-b border-gold-500/9 px-6 py-4 last:border-b-0 hover:bg-ink-800/10 sm:px-8 sm:py-5"
  >
  <h3 className="text-heading-card min-w-0">{service.name}</h3>
  <div className="flex flex-none items-center gap-3 sm:gap-5">
  {service.duration && (
  <span className="hidden whitespace-nowrap font-sans text-xs font-400 uppercase tracking-[0.2em] text-white/60 sm:inline">{service.duration}</span>
  )}
  {service.price && (
  <span className="font-display font-500 text-lg sm:text-xl text-gold-400 whitespace-nowrap transition-all duration-200 group-hover:brightness-125">{service.price}</span>
  )}
  </div>
  </a>
  )
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabKey>('main')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 })
  const services = activeTab === 'main' ? mainServices : additionalServices

  useLayoutEffect(() => {
    const idx = activeTab === 'main' ? 0 : 1
    const el = tabRefs.current[idx]
    if (el?.parentElement) {
      const parentRect = el.parentElement.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const w = elRect.width * 0.9
      const offset = (elRect.width - w) / 2
      setUnderlineStyle({
        width: w,
        left: elRect.left - parentRect.left + offset,
      })
    }
  }, [activeTab])

  return (
  <section id="sluzby" className="relative py-[60px]">
  {/* Heading */}
  <div className="mx-auto max-w-6xl px-5 sm:px-8">
  <div className="mx-auto max-w-2xl text-center">
  <SectionHeading label="Menu" align="center" />
  <h2 className="text-display">
  Služby & <span className="text-display-accent">ceny</span>
  </h2>
  <p className="mx-auto mt-6 max-w-md">
  <span className="relative inline-block">
  <span className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-b from-black/18 to-transparent pointer-events-none" />
  <span className="text-caption" style={{ color: '#ece8e0', textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>
  Každá služba začíná konzultací. Každý detail má svůj čas.
  </span>
  </span>
  </p>
  </div>
  </div>

  {/* Editorial tabs */}
  <div className="mx-auto mt-16 mb-14 max-w-4xl px-5 sm:px-8">
  <div className="relative flex justify-center gap-16">
  {tabs.map((tab, i) => (
  <button
  key={tab.key}
  ref={(el) => { tabRefs.current[i] = el }}
  onClick={() => setActiveTab(tab.key)}
  className={`relative pb-1 font-display text-sm uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${
  activeTab === tab.key
  ? 'text-gold-400 font-600'
  : 'text-white/80 font-500 hover:text-white'
  }`}
  >
  {tab.label}
  </button>
  ))}
  <div
  className="absolute bottom-0 h-0.5 bg-gold-400 transition-all duration-200 ease-in-out pointer-events-none"
  style={{ width: underlineStyle.width, left: underlineStyle.left }}
  />
  </div>
  </div>

  {/* Service list */}
  <div className="mx-auto mt-8 max-w-4xl px-5 sm:px-8">
  <div key={activeTab} className="overflow-hidden border border-gold-500/12 si-fade">
  {services.map((s) => (
  <ServiceRow key={s.id} service={s} />
  ))}
  </div>
  </div>

  {/* Footer note */}
  <div className="mx-auto mt-8 max-w-md text-center">
  <div className="mx-auto h-px w-8 bg-gold-500/30" />
  <p className="mt-4 text-decorative uppercase tracking-[0.2em]">
  Všechny ceny jsou konečné.
  </p>
  </div>
  </section>
  )
}
