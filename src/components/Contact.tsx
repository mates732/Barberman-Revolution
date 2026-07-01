import { MapPin, Phone, Mail, Instagram, Clock, Car } from 'lucide-react'
import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'
import { contact, openingHours } from '../lib/data'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'

export default function Contact() {
  const todayIdx = (new Date().getDay() + 6) % 7
  const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent)
  const addressHref = isApple
    ? 'https://maps.apple.com/?q=Svatopluka%20%C4%8Cecha%20275/1,%20434%2001%20Most%201'
    : 'https://www.google.com/maps/place/Barberman+Revolution/@50.5111803,13.6475693,20.41z/data=!4m6!3m5!1s0x470a21189498e821:0x1a96e58c5b7ecd8a!8m2!3d50.511176!4d13.6474141!16s%2Fg%2F11rqxtj2tf'

  return (
 <SectionTransition id="kontakt" className={`relative ${SECTION_PADDING_Y}`} snap>
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <div className="mx-auto mb-12 max-w-2xl text-center">
  <Reveal>
  <SectionHeading label="Kontakt" align="center" />
  </Reveal>
 <Reveal delay={0.1}>
 <h2 className="text-display">
 Najdi nás <span className="text-display-accent">v Mostě</span>
 </h2>
 </Reveal>
 </div>

 <div className="grid gap-5 lg:grid-cols-3">
 <Reveal className="h-full">
 <div className="flex h-full flex-col border border-gold-500/12 bg-ink-900/40 p-7 sm:p-8">
 <h3 className="text-heading-card text-gold-300">
 Adresa
 </h3>
 <div className="mt-4 flex items-start gap-3 text-body">
 <MapPin className="mt-0.5 h-5 w-5 flex-none text-gold-400" />
        <div>
          <a
            href={addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-300"
            aria-label="Otevřít adresu v mapách"
          >
            <div>{contact.address}</div>
            <div>{contact.city}</div>
          </a>
        </div>
 </div>

 <div className="mt-4 flex items-start gap-3 text-body">
 <Car className="mt-0.5 h-5 w-5 flex-none text-gold-400" />
 <span>Parkování před prodejnou</span>
 </div>

 <h3 className="mt-8 text-heading-card text-gold-300">
 Kontakt
 </h3>
 <ul className="mt-4 space-y-3 text-body">
 <li>
  <a
  href={`tel:${contact.phone.replace(/\s/g, '')}`}
  className="flex items-center gap-3 text-body hover:text-gold-300"
  aria-label={`Zavolat na ${contact.phone}`}
  >
  <Phone className="h-5 w-5 flex-none text-gold-400" />
  {contact.phone}
  </a>
 </li>
 <li>
  <a
  href={`mailto:${contact.email}`}
  className="flex items-center gap-3 text-body hover:text-gold-300"
  aria-label={`Poslat e-mail na ${contact.email}`}
  >
  <Mail className="h-5 w-5 flex-none text-gold-400" />
  {contact.email}
  </a>
 </li>
 <li>
  <a
          href={`https://www.instagram.com/${contact.instagram.replace('@', '')}/`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 text-body hover:text-gold-300"
  aria-label={`Instagram ${contact.instagram}`}
  >
  <Instagram className="h-5 w-5 flex-none text-gold-400" />
  {contact.instagram}
  </a>
 </li>
 </ul>

  </div>
 </Reveal>

 <Reveal delay={0.1} className="h-full">
 <div className="flex h-full flex-col border border-gold-500/12 bg-ink-900/40 p-7 sm:p-8">
 <h3 className="flex items-center gap-2 text-heading-card text-gold-300">
 <Clock className="h-5 w-5" />
 Otevírací doba
 </h3>
 <ul className="mt-4 space-y-1">
 {openingHours.map((o, i) => {
 const closed = o.hours === 'Zavřeno'
 const isToday = i === todayIdx
 return (
 <li
 key={o.day}
 className={`flex items-center justify-between border-l-2 px-3 py-2.5 text-sm ${
 isToday
 ? 'border-gold-500 bg-gold-500/5 text-white'
 : 'border-transparent text-ink-300'
 }`}
 >
 <span className="flex items-center gap-2">
 {o.day}
 {isToday && (
 <span className="text-decorative uppercase tracking-wider text-gold-400">
 Dnes
 </span>
 )}
 </span>
 <span
 className={`font-500 ${
 closed ? 'text-ink-400' : isToday ? 'text-gold-300' : 'text-ink-200'
 }`}
 >
 {o.hours}
 </span>
 </li>
 )
 })}
 </ul>
 </div>
 </Reveal>

 <Reveal delay={0.2} className="h-full">
 <div className="h-full overflow-hidden border border-gold-500/12 bg-ink-900/40 p-2">
 <iframe
 title="Mapa – Barberman Revolution Most"
 src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
 className="h-full min-h-[300px] w-full"
  style={{}}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 />
 </div>
 </Reveal>
 </div>
 </div>
 </SectionTransition>
 )
}
