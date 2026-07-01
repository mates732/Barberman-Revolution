import { BOOKING_URL, contact } from '../lib/data'

export default function Footer() {
  const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent)
  const addressHref = isApple
    ? 'https://maps.apple.com/?ll=50.511176,13.6474141&q=Barberman%20Revolution'
    : 'https://www.google.com/maps/place/Barberman+Revolution/@50.5111803,13.6475693,20.41z/data=!4m6!3m5!1s0x470a21189498e821:0x1a96e58c5b7ecd8a!8m2!3d50.511176!4d13.6474141!16s%2Fg%2F11rqxtj2tf'

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
