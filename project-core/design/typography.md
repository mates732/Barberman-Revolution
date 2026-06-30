# Typography System

## Font Families

Defined in `src/index.css` via Tailwind v4 `@theme`:

| Token | Font Stack | Usage |
|-------|-----------|-------|
| `--font-display` | `"Oswald", "Arial Narrow", sans-serif` | All headings, navigation, buttons, prices |
| `--font-serif` | `"Playfair Display", Georgia, serif` | Italic body quotes, pull quotes, elegant accents |
| `--font-sans` | `"Inter", system-ui, sans-serif` | Body text, paragraphs, labels |

Fonts are loaded via `<link>` in `index.html <head>` with preconnect hints. No JS-based font loading.

## Typography Hierarchy

### Level 1 — Hero Headings
```
Size:  text-5xl → sm:text-6xl → md:text-7xl → lg:text-8xl
Font:  font-display font-400
Case:  uppercase
Tracking: 0.12em
Color: Gradient (white or gold) via bg-clip-text text-transparent
Shadow: 0 2px 8px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)
Usage: "BARBERMAN" / "REVOLUTION" in Hero.tsx
```

### Level 2 — Section Titles
```
Size:  text-4xl → sm:text-5xl → lg:text-7xl
Font:  font-display font-600
Case:  uppercase
Leading: 0.95
Color: text-white
Usage: Every section heading (Services, About, Gallery, etc.)
```

### Level 3 — Section Subtitles / Pull Quotes
```
Size:  text-2xl → sm:text-3xl → lg:text-4xl
Font:  font-display font-600
Case:  uppercase
Leading: 1.2–1.3
Color: text-white/90
Usage: Featured review quote, About pull quote
```

### Level 4 — Eyebrow / Section Label
```
Size:  text-xs
Font:  font-serif italic
Tracking: 0.2em
Case:  uppercase
Color: text-gold-300/70
Decorator: h-px w-8 bg-gold-500/50 on each side
Usage: "Menu", "Recenze", "Kontakt", "Video", etc.
```

### Level 5 — Body Primary
```
Size:  text-base → sm:text-lg
Font:  font-sans (default)
Weight: font-400
Leading: 1.7–1.8
Color: text-ink-300
Usage: Section descriptions, story paragraphs
```

### Level 6 — Body Secondary
```
Size:  text-sm
Font:  font-sans
Leading: 1.8
Color: text-ink-400
Usage: Service descriptions, card text, secondary info
```

### Level 7 — Italic Accent
```
Size:  text-sm → text-base
Font:  font-serif italic
Color: text-ink-400
Usage: Decorative quotes, sensory descriptions
```

### Level 8 — Navigation
```
Size:  text-[13px]
Font:  font-display font-700
Case:  uppercase
Tracking: 0.35em
Color: text-[#F5E7B5] (hardcoded)
Shadow: 0 2px 8px rgba(0,0,0,0.35)
Usage: Header nav links, Rezervovat, Menu
```

### Level 9 — Labels / Meta
```
Size:  text-[10px] → text-[11px]
Font:  font-display or font-sans
Case:  uppercase
Tracking: 0.15em–0.2em
Color: text-ink-400 to text-ink-500
Usage: Duration, price labels, footer info, rating meta
```

### Gold Gradient Text
```
Class: .text-gold-gradient
Gradient: 135deg, #ecd27a → #c9a227 → #a8841c → #d4af37
Usage: Section title highlights, prices, "REVOLUTION" hero word, rating
```

## Hardcoded Typography Values (Issues)

| Value | Location | Recommendation |
|-------|----------|---------------|
| `text-[13px]` | Header nav (5x) | Use consistent scale token |
| `text-[10px]` | Multiple components | Could be standardized |
| `text-[11px]` | Multiple components | Could be standardized |
| `#F5E7B5` | Header nav | Replace with `gold-100` token |
| `#F0ECE4` | Hero body | Replace with `ink-100` or `cream` token |
