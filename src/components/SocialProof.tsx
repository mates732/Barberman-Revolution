import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'
import { Star } from 'lucide-react'

const stats = [
 { value: '4.8', label: 'Google hodnocení', meta: '200+ recenzí' },
 { value: '5+', label: 'Let praxe' },
 { value: '200+', label: 'Spokojených klientů' },
 { value: '1 000+', label: 'Provedených služeb' },
]

const quotes = [
 {
 text: 'Nejlepší barbershop v Mostě. Luxusní prostředí, profesionální přístup a střih, který přesně sedí.',
 name: 'Tomáš N.',
 },
 {
 text: 'Chodím sem pravidelně přes rok. Vždycky odcházím s pocitem, že jsem dostal víc než jsem čekal.',
 name: 'Pavel D.',
 },
 {
 text: 'Tradiční holení břitvou je zážitek, který musí zažít každý muž. Čas se tu zastaví.',
 name: 'Martin H.',
 },
]

export default function SocialProof() {
 return (
 <SectionTransition id="duvera" className={`relative overflow-hidden ${SECTION_PADDING_Y}`}>
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <div className="mx-auto mb-10 max-w-2xl text-center">
  <Reveal>
  <SectionHeading label="Důvěryhodnost" align="center" />
  </Reveal>
 <Reveal delay={0.1}>
 <h2 className="text-display">
 Čísla & <span className="text-display-accent">reference</span>
 </h2>
 </Reveal>
 </div>

 {/* Stats row */}
 <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {stats.map((s, i) => (
 <Reveal key={s.label} delay={i * 0.08}>
 <div className="flex flex-col items-center border border-gold-500/10 bg-ink-900/40 p-8 text-center">
 <span className="text-display-accent text-5xl sm:text-6xl">
 {s.value}
 </span>
 <p className="mt-2 font-display text-sm font-500 uppercase tracking-wider text-ink-300">
 {s.label}
 </p>
 {s.meta && (
 <p className="mt-1 text-decorative">{s.meta}</p>
 )}
 </div>
 </Reveal>
 ))}
 </div>

 {/* Reviews */}
 <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
 {quotes.map((q, i) => (
 <Reveal key={i} delay={0.3 + i * 0.08}>
 <div className="flex flex-col border border-gold-500/10 bg-ink-900/40 p-7">
 <div className="mb-4 flex gap-0.5">
 {[1, 2, 3, 4, 5].map((s) => (
 <Star key={s} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
 ))}
 </div>
 <p className="flex-1 text-body">
 &bdquo;{q.text}&rdquo;
 </p>
 <p className="mt-4 text-heading-card text-sm">
 {q.name}
 </p>
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </SectionTransition>
 )
}
