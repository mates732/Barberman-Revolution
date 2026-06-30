# Hardcoded Values Report

## Colors (should use tokens)

| Value | Location | Occurrences | Should Use | Status |
|-------|----------|-------------|------------|--------|
| `#F5E7B5` | Header.tsx nav links | 5 | `gold-100` | ✅ Fixed |
| `#F0ECE4` | Hero.tsx body text | 1 | `cream` | ✅ Fixed |
| `#F7F5EF` | Hero.tsx heading gradient | 1 | Custom (gradient stop) | Remaining |
| `#08080a` | index.css html background | 1 | `ink-950` | ✅ Fixed |
| `#e8e8ec` | index.css body color | 1 | `ink-100` | ✅ Fixed |

## Sizes (should use Tailwind scale)

| Value | Location | Occurrences | Note |
|-------|----------|-------------|------|
| `text-[13px]` | Header.tsx | 5 | Use `text-sm` |
| `text-[10px]` | Various | ~8 | Use `text-xs` |
| `text-[11px]` | Various | ~4 | Use `text-xs` |
| `[120px]` | Section padding | ~12 | Intentional — could be `py-32` |
| `0.35em` | Header tracking | 5 | Intentional style choice |
| `0.12em` | Hero tracking | 2 | Intentional style choice |
| `0.15em` | Button tracking | 5 | Intentional style choice |

## Shadow Values (use consistent pattern)

| Shadow | Components | Variance |
|--------|-----------|----------|
| Button ambient glow | Hero, MenuOverlay, FinalScene, Booking, Pricing | Different rgba values and blur amounts |
| Text shadow on headings | Hero.tsx | `rgba(0,0,0,0.2)`, `rgba(0,0,0,0.25)`, `rgba(0,0,0,0.18)` — slightly different alphas |
| Card glow on hover | Benefits, Trust | Different glow values (20px vs 25px) |

## Gradient Values

| Gradient | Components | Variance |
|----------|-----------|----------|
| `from-gold-400 to-gold-500` | Hero, MenuOverlay, FinalScene | Vertical gradient |
| `from-gold-300 via-gold-400 to-gold-600` | Booking, Pricing | Horizontal gradient, 3-stop |

## Opacity Values

| Value | Components | Note |
|-------|-----------|------|
| `gold-*/70` | Eyebrow labels | Intentional |
| `gold-*/50` | Decorative lines | Intentional |
| `gold-*/20` | Decorative | Intentional |
| `gold-*/12` | Card borders | Intentional |
| `ink-*/40` | Card backgrounds | Common pattern |
| `ink-*/50` | Gradient overlays | Intentional |
