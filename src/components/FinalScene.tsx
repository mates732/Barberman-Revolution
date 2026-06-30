import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import { BOOKING_URL } from '../lib/data'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'


export default function FinalScene() {
 return (
  <SectionTransition className={`relative mt-16 flex min-h-screen items-center justify-center overflow-hidden ${SECTION_PADDING_Y}`} snap>
 <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
  <Reveal>
  <h2 className="font-display text-5xl font-600 uppercase leading-[0.95] text-white sm:text-7xl lg:text-8xl">
  Tvoje další
  <br />
  <span className="text-gold-400">návštěva začíná</span>
  <br />
  právě tady.
  </h2>
  </Reveal>

  <Reveal delay={0.15}>
  <div className="mx-auto mt-8 h-px w-12 bg-gold-500/40" />
  </Reveal>

  <Reveal delay={0.2}>
  <p className="mx-auto mt-8 max-w-sm text-caption">
  Rezervuj si svůj termín online.
  </p>
  </Reveal>

 <Reveal delay={0.3}>
 <a
 href={BOOKING_URL}
 target="_blank"
 rel="noopener noreferrer"
  className="mt-12 inline-flex items-center gap-3 border border-gold-500/50 bg-gold-500 px-12 py-5 text-cta"
 >
 Rezervovat termín
 <ArrowRight className="h-4 w-4 " />
 </a>
 </Reveal>
 </div>
 </SectionTransition>
 )
}
