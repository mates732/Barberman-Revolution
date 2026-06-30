import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <SectionTransition id="o-nas" className="relative overflow-hidden py-[160px] sm:py-[200px]" snap>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading label="O nás" align="center" />
          </Reveal>

          <div className="mt-6 flex justify-center">
            <span className="h-px w-16 bg-gold-500/40" />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 space-y-10 text-ink-100 font-[500] leading-[1.85] text-base sm:text-lg">
              <p>
                Barberman Revolution je místo, kde se potkává poctivé řemeslo
                s moderním přístupem.
              </p>
              <p>
                Každému střihu věnujeme čas, který si zaslouží. Záleží nám na
                výsledku, ale i na tom, aby ses během návštěvy cítil příjemně.
              </p>
              <p>
                Ať přicházíš na pravidelnou úpravu nebo úplnou změnu stylu,
                cílem je vždy stejný &ndash; kvalitní práce, kterou poznáš
                na první pohled.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  )
}
