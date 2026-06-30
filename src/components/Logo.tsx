interface LogoProps {
 className?: string
}

export default function Logo({ className = '' }: LogoProps) {
 return (
 <img
 src="/fotky/logo.png"
 alt=""
 aria-hidden="true"
 className={className}
 />
 )
}
