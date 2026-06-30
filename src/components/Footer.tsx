import { BOOKING_URL, contact } from '../lib/data'

export default function Footer() {
 return (
 <footer className="py-16 sm:py-20">
 <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
  {/* Info */}
 <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-supporting">
 <span>{contact.address}, {contact.city}</span>
 <span className="hidden sm:inline text-decorative">·</span>
 <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-300 ">
 {contact.phone}
 </a>
 <span className="hidden sm:inline text-decorative">·</span>
 <span>{contact.instagram}</span>
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
