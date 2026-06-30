interface PageHeaderProps {
 eyebrow: string
 title: string
 subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
 return (
 <section className="relative pt-56 sm:pt-60">
 <div className="mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8 sm:pb-12">
 <div className="mb-5 flex items-center gap-3">
 <span className="h-px w-10 bg-gold-500/50" />
 <span className="font-serif text-sm italic tracking-wide text-gold-300">
 {eyebrow}
 </span>
 </div>
 <h1 className="text-display-page">
 {title}
 </h1>
 {subtitle && (
 <p className="mt-4 max-w-xl text-body">
 {subtitle}
 </p>
 )}
 </div>
 </section>
 )
}
