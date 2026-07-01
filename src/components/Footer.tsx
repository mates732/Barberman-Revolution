import { BOOKING_URL, contact } from '../lib/data'

export default function Footer() {
  const ua = navigator.userAgent
  const isApple = /iPhone|iPad|iPod/.test(ua) || (/Mac/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua))
  const addressHref = isApple
    ? 'https://maps.apple.com/?q=Svatopluka%20%C4%8Cecha%20275%2F1%2C%20434%2001%20Most%201%2C%20Czechia'
    : 'https://www.google.com/maps/search/?api=1&query=Svatopluka%20%C4%8Cecha%20275%2F1%2C%20434%2001%20Most%201%2C%20Czechia'

  return (
 <footer className="py-16 sm:py-20">
 <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
  {/* Info */}
 <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-supporting">
   <a href={addressHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300" aria-label="Otevřít adresu v mapách">{contact.address}, {contact.city}</a>
 <span className="hidden sm:inline text-decorative">·</span>
  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-300" aria-label={`Zavolat na ${contact.phone}`}>
  {contact.phone}
  </a>
 <span className="hidden sm:inline text-decorative">·</span>
  <a href={`https://www.instagram.com/${contact.instagram.replace('@', '')}/`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300" aria-label={`Instagram ${contact.instagram}`}>{contact.instagram}</a>
 </div>

 {/* Booking */}
 <div className="mt-8">
 <a
 href={BOOKING_URL}
 target="_blank"
 rel="noopener noreferrer"
  className="inline-flex items-center gap-2 font-display text-xs font-600 uppercase tracking-[0.25em] text-gold-300"
 >
 Rezervovat termín
  <span className="block h-px w-6 bg-gold-500/40" />
 </a>
 </div>
 </div>
 </footer>
 )
}
