import { CalendarCheck, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'
import { BOOKING_URL } from '../lib/data'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'

export default function Booking() {
 return (
 <SectionTransition id="rezervace" className={`relative overflow-hidden ${SECTION_PADDING_Y}`}>
 <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
 <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
 {/* Left: info */}
 <div>
  <Reveal>
  <SectionHeading label="Rezervace" />
  </Reveal>
 <Reveal delay={0.1}>
 <h2 className="text-display">
 Rezervuj si
 <br />
 <span className="text-display-accent">svůj termín</span>
 </h2>
 </Reveal>
  <Reveal delay={0.2}>
  <p className="mt-6 max-w-md text-body">
  Rezervace probíhá jednoduše prostřednictvím systému MyFox.
  Vyber si termín, který ti vyhovuje, a objednej se během
  několika okamžiků.
  </p>
  </Reveal>
 </div>

 {/* Right: premium booking card */}
 <Reveal delay={0.25} className="h-full">
  <div className="flex h-full flex-col border border-gold-500/12 bg-ink-900/50 p-8 sm:p-10">
 <div className="flex h-12 w-12 items-center justify-center border border-gold-500/20 bg-gold-500/5">
 <CalendarCheck className="h-6 w-6 text-gold-400" />
 </div>

 <h3 className="mt-6 font-display text-2xl font-600 uppercase leading-tight tracking-wide text-white">
 Rezervace přes<br />
  <span className="text-gold-400">MyFox</span>
 </h3>

 <p className="mt-4 flex-1 text-body">
 Vyber si službu, termín i svého barbera během několika vteřin.
 Celý rezervační proces probíhá bezpečně v systému MyFox.
 </p>

 <a
 href={BOOKING_URL}
 target="_blank"
 rel="noopener noreferrer"
  className="flex w-full items-center justify-center gap-3 border border-gold-500/50 bg-gold-500 px-8 py-5 text-cta"
 >
 Otevřít rezervační systém
 <ArrowRight className="h-4 w-4 " />
 </a>
 </div>
 </Reveal>
 </div>
 </div>
 </SectionTransition>
 )
}
