import { Award, HeartHandshake, Scissors, Star, Quote } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Booking from '../components/Booking'
import Reveal from '../components/Reveal'
import { reviews } from '../lib/data'

const pillars = [
 {
 icon: Scissors,
 title: 'Prémiové řemeslo',
 text: 'Střih i úprava vousů s precizností, na kterou se spolehneš. Moderní techniky, prémiové pomůcky a čistá práce od začátku do konce.',
 },
 {
 icon: HeartHandshake,
 title: 'Osobní přístup',
 text: 'Žádná šablona. Každý střih začíná konzultací – tvář, typ vlasů, životní styl. Výsledek je přesně takový, jaký chceš ty.',
 },
 {
 icon: Award,
 title: 'Zkušený barber',
 text: 'Pět let praxe, stovky spokojených klientů a neustálé vzdělávání v oboru. Důvod, proč se k nám vracíš pravidelně.',
 },
]

export default function AboutPage() {
 return (
 <>
 <PageHeader
 eyebrow="O nás"
 title="Příběh & řemeslo"
 subtitle="Místo, kde se spojuje řemeslo s luxusním přístupem. Poznej, co za holičstvím Barberman Revolution stojí."
 />

 {/* Story */}
 <section className="py-24 sm:py-36">
 <div className="mx-auto max-w-3xl px-5 sm:px-8">
 <Reveal>
 <div className="mb-5 flex items-center gap-3">
 <span className="h-px w-10 bg-gold-500/50" />
 <span className="font-serif text-sm italic tracking-wide text-gold-300">
 Náš příběh
 </span>
 </div>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-3xl font-600 uppercase leading-tight text-white sm:text-4xl">
 Holičství, které   <span className="text-gold-400">myslí na detail</span>
 </h2>
 </Reveal>
 <Reveal delay={0.2}>
 <div className="mt-6 space-y-4 text-body">
 <p>
 Barberman Revolution vzniklo z jednoduché myšlenky – muž si zaslouží prostor,
 kde se cítí jako gentleman a odchází s přesně tím střihem, který chtěl. V Mostě
 jsme vybudovali místo, kde se potkává řemeslná preciznost s luxusním designem.
 </p>
 <p>
 Žádný dav, žádný spěch. Jen ty, zrcadlo a barber, který ví, co dělá. Každý
 střih začíná konzultací a končí stylem, který sedí tvému životu.
 </p>
 <p>
 Pět let praxe, stovky spokojených klientů a neustálé vzdělávání v oboru.
 To je důvod, proč se k nám vracíš pravidelně.
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 {/* Pillars */}
 <section className="py-24 sm:py-36">
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <div className="grid gap-5 sm:grid-cols-3">
 {pillars.map((p, i) => (
 <Reveal key={p.title} delay={i * 0.1} className="h-full">
  <div className="h-full border border-gold-500/12 bg-ink-900/40 p-8">
  <div className="flex h-14 w-14 items-center justify-center border border-gold-500/20 bg-ink-900 text-gold-400">
 <p.icon className="h-6 w-6" />
 </div>
 <h3 className="mt-6 text-heading-card">
 {p.title}
 </h3>
 <p className="mt-3 text-body">
 {p.text}
 </p>
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 {/* Reviews */}
 <section className="py-24 sm:py-36">
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
 <Reveal>
 <div>
 <div className="mb-5 flex items-center gap-3">
 <span className="h-px w-10 bg-gold-500/50" />
 <span className="text-label-section text-sm">
 Reference
 </span>
 </div>
 <h2 className="font-display text-4xl font-600 uppercase leading-tight text-white sm:text-5xl">
  Co říkají <span className="text-gold-400">klienti</span>
 </h2>
 </div>
 </Reveal>
 <Reveal delay={0.15}>
 <div className="flex items-center gap-6 border border-gold-500/15 bg-ink-900/50 p-6">
 <div>
  <div className="font-display text-6xl font-700 leading-none text-gold-400">4.8</div>
 <div className="mt-2 flex gap-0.5">
 {[1, 2, 3, 4, 5].map((i) => (
 <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
 ))}
 </div>
 </div>
 <div className="h-14 w-px bg-gold-500/15" />
 <div>
 <div className="text-heading-card">Google</div>
 <div className="mt-1 text-supporting">200+ hodnocení</div>
 </div>
 </div>
 </Reveal>
 </div>

 <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 {reviews.map((r, i) => (
 <Reveal key={i} delay={i * 0.08} className="h-full">
  <article className="relative flex h-full flex-col border border-ink-700 bg-ink-850/40 p-7">
 <Quote className="h-8 w-8 flex-none text-gold-500/25" />
 <div className="mt-4 flex gap-0.5">
 {Array.from({ length: 5 }).map((_, s) => (
 <Star
 key={s}
 className={`h-3.5 w-3.5 ${
 s < r.rating ? 'fill-gold-400 text-gold-400' : 'text-ink-500'
 }`}
 />
 ))}
 </div>
 <p className="mt-4 flex-1 text-body">
 "{r.text}"
 </p>
 <div className="mt-6 flex items-center gap-3 border-t border-gold-500/10 pt-5">
 <div className="flex h-11 w-11 items-center justify-center border border-gold-500/20 bg-ink-900 font-display text-sm font-600 text-gold-300">
 {r.initials}
 </div>
 <div>
 <div className="text-heading-card text-sm">{r.name}</div>
 <div className="text-decorative">{r.date}</div>
 </div>
 </div>
 </article>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 <Booking />
 </>
 )
}
