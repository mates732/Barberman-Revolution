# Button System

## Gold Primary CTA

Used for all "Rezervovat termín" buttons across the site. This is the primary call-to-action.

```
Background: bg-gradient-to-b from-gold-400 to-gold-500
Text:       text-white font-700 uppercase
Size:       text-sm
Tracking:   0.15em
Padding:    px-10 py-4 (varies by context)
Border:     border border-gold-400/25 or border-gold-500/50
Shadow:     Shadow for depth + inset bevel for premium feel
Hover:      Brighter shadow, slight translateY(-0.5), brighter border
Active:     scale-[0.98]
Focus:      ring-2 ring-gold-400/50
```

### Variants by Location

| Location | Class differences |
|----------|-------------------|
| Hero.tsx | `px-10 py-4`, directional shadow `0_4px_16px_rgba(0,0,0,0.3)` + inset bevel |
| MenuOverlay.tsx | `px-8 py-3.5`, ambient glow shadow + hover glow |
| FinalScene.tsx | `px-12 py-5`, larger padding, ambient glow + ArrowRight icon |
| Booking.tsx | Full-width (`w-full`), `bg-gradient-to-r` (horizontal gradient variant) |
| Pricing.tsx | `px-8 py-4`, `bg-gradient-to-r` (horizontal gradient variant) |

### Gradient Direction Inconsistency

- **Vertical** (`bg-gradient-to-b`): Hero, MenuOverlay, FinalScene
- **Horizontal** (`bg-gradient-to-r`): Booking, Pricing

This is a visual inconsistency that should be unified.

## Gold Outline / Ghost

Used in OffersPage for secondary CTA:

```
Border: border border-gold-500/30
Text:   text-gold-200
Hover:  hover:border-gold-500/60 hover:bg-gold-500/5
Icon:   ArrowRight with translate on hover
```

## Navigation Links

Not buttons, but function as interaction targets:

```
Font:   font-display text-[13px] font-700
Case:   uppercase
Track:  0.35em
Color:  text-[#F5E7B5] (hardcoded)
Shadow: 0 2px 8px rgba(0,0,0,0.35)
Hover:  text-gold-200 + drop-shadow glow
```

## MenuOverlay Nav Links

Full-screen menu navigation items:

```
Font:   font-display text-4xl → sm:text-6xl → lg:text-7xl font-600
Case:   uppercase
Color:  text-ink-400 → hover:text-gold-300
Decorator: Underline line hover animation (h-px w-0 → w-full on hover)
```

## Footer Booking Link

```
Font:   font-display text-xs font-600
Track:  0.25em
Color:  text-gold-300 → hover:text-gold-200
Decorator: Animated gold line (h-px w-6 → w-8 on hover)
```

## Button Rules

1. All gold gradient buttons must use the same gradient direction (currently inconsistent).
2. All buttons must use `text-white` on gold (not `text-ink-950`).
3. All buttons should have `focus:outline-none focus:ring-2 focus:ring-gold-400/50`.
4. Hover shadow patterns should use consistent `rgba(201,162,39, ...)` values.
