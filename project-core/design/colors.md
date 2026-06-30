# Color System

## Source

All colors are defined in `src/index.css` via Tailwind v4 `@theme` directive. Colors are used via Tailwind utility classes (e.g. `text-ink-300`, `bg-gold-500`).

## Token Definitions

### Ink (Neutrals) — Semantic: text, backgrounds, surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `ink-950` | `#08080a` | Near-black. Button text (historic), html background |
| `ink-900` | `#0d0d10` | Section background borders, card backgrounds |
| `ink-850` | `#131318` | Form input backgrounds |
| `ink-800` | `#1a1a20` | Hover card backgrounds |
| `ink-700` | `#24242c` | Card borders (default state) |
| `ink-600` | `#33333d` | Input borders, muted decorative elements |
| `ink-500` | `#4a4a55` | Muted labels, secondary info |
| `ink-400` | `#6b6b78` | Secondary body text, service descriptions |
| `ink-300` | `#9a9aa6` | Primary body text on dark |
| `ink-200` | `#c4c4cc` | Light text, Hero eyebrow |
| `ink-100` | `#e8e8ec` | Body default text color |

### Gold (Accent) — Semantic: luxury accents, CTAs, decorative

| Token | Hex | Usage |
|-------|-----|-------|
| `gold-600` | `#a8841c` | Darkest gold, gradient end |
| `gold-500` | `#c9a227` | Primary gold. Borders, dividers, decorative lines |
| `gold-400` | `#d4af37` | Classic gold. Buttons, stars, icons |
| `gold-300` | `#e0c050` | Light gold. Eyebrow labels, hover states |
| `gold-200` | `#ecd27a` | Pale gold. Gradient text stops |
| `gold-100` | `#f5e3a8` | Lightest gold. Gradient text stops |

### Cream (Accent)

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#f0eee6` | Not currently used in components |

## Semantic Color Map

| Role | Token(s) |
|------|----------|
| Page background | `ink-950` on `html` |
| Body text | `ink-100` |
| Heading text | `text-white` |
| Body paragraph | `ink-300` or `ink-400` |
| Eyebrow / section label | `text-gold-300/70` |
| Navigation text | `text-gold-100` (was `#F5E7B5`) |
| Hero heading | Gradient via `bg-clip-text text-transparent` |
| Hero subheading | `text-cream` (was `#F0ECE4`) |
| Button text | `text-white` (on gold gradient) |
| Button background | `bg-gradient-to-b from-gold-400 to-gold-500` |
| Section backgrounds | `transparent` (body background shows through) |
| Card background | `bg-ink-900/40` or `bg-ink-850/40` |
| Card border | `border-gold-500/12` or `border-ink-700` |
| Decorative line | `bg-gold-500/N` or `bg-gradient-to-r from-gold-500/N to-transparent` |
| Gold gradient text | `.text-gold-gradient` CSS class |
| Vignette | `rgba(0,0,0,0.45)` radial gradient |
| Selected text | `background: gold-500; color: ink-950` |

## Previously Broken / Fixed

| Token/Location | Issue | Status |
|----------------|-------|--------|
| `concrete-950` in `CinematicIntro.tsx` | Undefined token | ✅ Replaced with `ink-950` |
| `#F5E7B5` in `Header.tsx` | Hardcoded color | ✅ Replaced with `gold-100` |
| `#F0ECE4` in `Hero.tsx` | Hardcoded color | ✅ Replaced with `cream` |
| `#08080a` / `#e8e8ec` in `index.css` | Hardcoded colors | ✅ Replaced with CSS variables |
| `::selection` hardcoded | Raw hex values | ✅ Replaced with CSS variables |
| `.border-gold-gradient` | Unused CSS utility | ✅ Removed |
| `.gold-line` | Unused CSS utility | ✅ Removed |
| `.text-stroke-gold` | Unused CSS utility | ✅ Removed |

## Remaining Hardcoded Values

| Value | Location | Occurrences | Note |
|-------|----------|-------------|------|
| `#F7F5EF` | Hero.tsx heading gradient | 1 | Custom gradient stop — acceptable |

## CSS Utilities

```css
.text-gold-gradient {
  background: linear-gradient(135deg, #ecd27a 0%, #c9a227 40%, #a8841c 70%, #d4af37 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
