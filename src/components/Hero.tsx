import { useCallback } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { BOOKING_URL } from '../lib/data'

export default function Hero() {
  const handleServicesClick = useCallback(() => {
    const el = document.getElementById('sluzby')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen snap-start overflow-hidden">
      <h1
        id="hero-heading"
        className="absolute left-1/2 font-display uppercase leading-[0.9] text-center"
        style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <span className="block text-white font-400 tracking-[0.12em] text-[2.531rem] sm:text-[3.375rem] md:text-[4.219rem] lg:text-[5.063rem] xl:text-[6.75rem]">
          BARBERMAN
        </span>
        <span className="block text-gold-400 font-400 tracking-[0.12em] text-[2.531rem] sm:text-[3.375rem] md:text-[4.219rem] lg:text-[5.063rem] xl:text-[6.75rem]">
          REVOLUTION
        </span>
      </h1>

      <div
        className="mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl"
        style={{ paddingTop: 'calc(50vh + 100px)', paddingBottom: '6rem' }}
      >
        <p className="mt-4 sm:mt-5 max-w-xl text-center text-quote px-4">
          Střih, který odpovídá tvému stylu.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gold-500 px-9 py-3.5 sm:px-10 sm:py-4 text-cta"
          >
            Rezervovat termín
          </a>

          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3 w-3 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="font-display text-ink-300 font-500">4.8</span>
            <span className="text-ink-300">Google</span>
            <span className="text-ink-300">· 200+ hodnocení</span>
          </div>

          <button
            onClick={handleServicesClick}
            className="group relative inline-flex items-center justify-center gap-1.5 text-white/45 uppercase tracking-[0.15em] hover:text-gold-400 transition-colors duration-250 ease-out cursor-pointer"
          >
            Zobrazit služby
            <ArrowRight className="h-2.5 w-2.5 transition-all duration-250 ease-out group-hover:translate-x-1.5" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left" />
          </button>
        </div>
      </div>
    </section>
  )
}
