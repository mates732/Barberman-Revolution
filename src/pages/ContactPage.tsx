import PageHeader from '../components/PageHeader'
import Contact from '../components/Contact'
import Booking from '../components/Booking'

export default function ContactPage() {
 return (
 <>
 <PageHeader
 eyebrow="Kontakt"
 title="Najdi nás"
 subtitle="Sídlíme v centru Mostu. Přijď si sednout do křesla nebo nám zavolaj."
 />
 <Contact />
 <Booking />
 </>
 )
}
