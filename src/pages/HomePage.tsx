import Hero from '../components/Hero'
import About from '../components/About'
import CircularCarousel from '../components/CircularCarousel'
import carouselImages from '../lib/carousel-data'
import Services from '../components/Services'
import SocialProof from '../components/SocialProof'
import Contact from '../components/Contact'
import FinalScene from '../components/FinalScene'
import SectionTransition from '../components/SectionTransition'
import SectionHeading from '../components/SectionHeading'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'

export default function HomePage() {
 return (
 <div>
 <Hero />
 <About />

 <SectionTransition id="galerie" className={`relative ${SECTION_PADDING_Y}`} snap>
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <SectionHeading label="Galerie" className="mb-10" />
 <CircularCarousel
 images={carouselImages}
 showNav={true}
      showDots={false}
 className="w-full"
 />
 </div>
 </SectionTransition>

 <Services />
 <SocialProof />
 <Contact />
 <FinalScene />
 </div>
 )
}
