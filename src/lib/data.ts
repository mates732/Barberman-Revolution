export interface Service {
  id: string
  name: string
  duration: string
  price: string
  bookingUrl?: string
}

export interface Review {
  name: string
  initials: string
  rating: number
  text: string
  date: string
  service: string
}

export const mainServices: Service[] = [
  { id: 'komplet', name: 'Komplet', duration: '60 min', price: '790 Kč' },
  { id: 'barber-jr-komplet', name: 'Barber JR komplet', duration: '60 min', price: '570 Kč' },
  { id: 'barber-jr-strih', name: 'Barber JR střih', duration: '30 min', price: '320 Kč' },
  { id: 'strih-kratkych-vlasu', name: 'Střih krátkých vlasů', duration: '30 min', price: '490 Kč' },
  { id: 'detsky-strih', name: 'Dětský střih', duration: '30 min', price: '350 Kč' },
  { id: 'holeni-uprava-vousu', name: 'Holení + úprava vousů', duration: '30 min', price: '449 Kč' },
  { id: 'strih-dlouhych-vlasu', name: 'Střih dlouhých vlasů', duration: '40 min', price: '550 Kč' },
]

export const additionalServices: Service[] = [
  { id: 'uprava-oboci', name: 'Úprava obočí', duration: '10 min', price: '50 Kč' },
  { id: 'uprava-nosu', name: 'Úprava nosu', duration: '10 min', price: '50 Kč' },
  { id: 'myti-hlavy', name: 'Mytí hlavy / Oplach', duration: '10 min', price: '' },
  { id: 'barveni-vousu', name: 'Barvení vousů', duration: '30 min', price: '400 Kč' },
]

export const services: Service[] = [...mainServices, ...additionalServices]

export const reviews: Review[] = [
 {
 name: 'Tomáš Novák',
 initials: 'TN',
 rating: 5,
 text: 'Nejlepší barbershop v Mostě. Luxusní prostředí, profesionální přístup a střih, který přesně sedí. Cítím se tu jako VIP klient.',
 date: 'před 2 týdny',
 service: 'Střih + vousy',
 },
 {
 name: 'Pavel Dvořák',
 initials: 'PD',
 rating: 5,
 text: 'Chodím sem pravidelně přes rok. Vždycky odcházím s pocitem, že jsem dostal víc než jsem čekal. Atmosféra je bezkonkurenční.',
 date: 'před 1 měsícem',
 service: 'Premium zážitek',
 },
 {
 name: 'Martin Horák',
 initials: 'MH',
 rating: 5,
 text: 'Tradiční holení břitvou je zážitek, který musí zažít každý muž. Horký ručník, klid, preciznost. Čas se tu zastaví.',
 date: 'před 3 týdny',
 service: 'Tradiční holení',
 },
 {
 name: 'Jakub Veselý',
 initials: 'JV',
 rating: 5,
 text: 'Konečně holič, který naslouchá. Střih sedí na první dobrou. Interiér, hudba, vůně – všechno ladí v dokonalé harmonii.',
 date: 'před 1 měsícem',
 service: 'Pánský střih',
 },
 {
 name: 'Ondřej Marek',
 initials: 'OM',
 rating: 5,
 text: 'Doporučuji všem kámošům. Místo, kam se prostě chceš vracet. Zlatý standard v Mostě, žádný jiný barbershop se mu nevyrovná.',
 date: 'před 2 měsíci',
 service: 'Střih + vousy',
 },
 {
 name: 'Filip Černý',
 initials: 'FČ',
 rating: 5,
 text: 'Premium zážitek byl dar pro mě sama. Od masáže hlavy po finální styling – každá minuta stojí za to. Absolutní top.',
 date: 'před 5 týdny',
 service: 'Premium zážitek',
 },
]

export const openingHours = [
 { day: 'Pondělí', hours: 'Zavřeno' },
 { day: 'Úterý', hours: '9:00 – 19:00' },
 { day: 'Středa', hours: '9:00 – 19:00' },
 { day: 'Čtvrtek', hours: '9:00 – 20:00' },
 { day: 'Pátek', hours: '9:00 – 20:00' },
 { day: 'Sobota', hours: '8:00 – 16:00' },
 { day: 'Neděle', hours: 'Zavřeno' },
]

export const BOOKING_URL =
 'https://barberman.snippet.myfox.cz/form/show/date_2023-05-12/shopId_clafq42pjxhas07837jorotvq/lng_cs'

export const contact = {
  address: 'Svatopluka Čecha 275/1',
  city: '434 01 Most 1',
 phone: '+420 777 123 456',
 email: 'rezervace@barberman.cz',
 instagram: '@barbermanrevolution',
  mapQuery: 'Svatopluka Čecha 275/1, Most, Czech Republic',
}

export const navLinks = [
  { label: 'Domů', href: '/#hero' },
  { label: 'O nás', href: '/#o-nas' },
  { label: 'Galerie', href: '/#galerie' },
  { label: 'Služby', href: '/#sluzby' },
  { label: 'Kontakt', href: '/#kontakt' },
]
