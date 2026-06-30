import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Scissors } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Booking from '../components/Booking'
import { mainServices, additionalServices } from '../lib/data'

function ServiceRow({ name, duration, price, index }: { name: string; duration: string; price: string; index: number }) {
  return (
  <div className="flex items-center justify-between gap-4 border-b border-gold-500/8 px-6 py-6 sm:px-8">
  <div className="flex items-center gap-4 sm:gap-6">
  <span className="font-serif text-2xl italic text-gold-500/50 sm:text-3xl">
  0{index + 1}
  </span>
  <h3 className="text-heading-card">{name}</h3>
  </div>
  <div className="flex flex-none flex-col items-end gap-1">
  {price && (
  <span className="font-display text-2xl font-700 text-gold-400 sm:text-3xl">{price}</span>
  )}
  <span className="flex items-center gap-1 text-decorative uppercase tracking-wider">
  <Clock className="h-3 w-3" />
  {duration}
  </span>
  </div>
  </div>
  )
}

export default function OffersPage() {
  return (
  <>
  <PageHeader
  eyebrow="Nabídka"
  title="Služby & ceník"
  subtitle="Každá služba začíná konzultací. Ceny jsou konečné, bez skrytých poplatků. Termín se potvrzuje do 24 hodin."
  />

  <section className="py-24 sm:py-36">
  <div className="mx-auto max-w-5xl px-5 sm:px-8">
  {/* Hlavní služby */}
  <div className="overflow-hidden border border-gold-500/12">
  {mainServices.map((s, i) => (
  <ServiceRow key={s.id} name={s.name} duration={s.duration} price={s.price} index={i} />
  ))}
  </div>

  {/* Přídavné služby */}
  <div className="mt-16">
  <h2 className="mb-8 text-center font-display text-2xl font-600 uppercase tracking-[0.08em] text-gold-300 sm:text-3xl">
  Přídavné služby
  </h2>
  <div className="overflow-hidden border border-gold-500/12">
  {additionalServices.map((s, i) => (
  <ServiceRow key={s.id} name={s.name} duration={s.duration} price={s.price} index={i} />
  ))}
  </div>
  </div>

  {/* Info note */}
  <div className="mt-10 flex flex-col items-start gap-4 border border-gold-500/12 bg-ink-900/40 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
  <div className="flex items-center gap-4">
  <Scissors className="h-8 w-8 flex-none text-gold-400" />
  <div>
  <h4 className="text-heading-card">
  Nevíš, co si vybrat?
  </h4>
  <p className="mt-1 text-body">
  Zavolaj nám a poradíme ti s výběrem podle tvého stylu.
  </p>
  </div>
  </div>
  <Link
  to="/kontakt"
  className="inline-flex flex-none items-center gap-2 border border-gold-500/30 px-6 py-3 font-display text-sm font-600 uppercase tracking-wider text-gold-200"
  >
  Kontakt
  <ArrowRight className="h-4 w-4" />
  </Link>
  </div>
  </div>
  </section>

  <Booking />
  </>
  )
}
