# Surfaces & Layouts

## Section Layout Pattern

Every content section follows this structure:

```tsx
<SectionTransition className="relative py-[120px]" snap>
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    {/* Header block */}
    <div className="mx-auto mb-20 max-w-2xl text-center sm:mb-28">
      <Reveal>
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold-500/50" />
          <span className="font-serif text-xs italic tracking-[0.2em] text-gold-300/70 uppercase">
            Label
          </span>
          <span className="h-px w-8 bg-gold-500/50" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl font-600 uppercase leading-[0.95] text-white sm:text-5xl lg:text-7xl">
          Title <span className="text-gold-gradient">Highlight</span>
        </h2>
      </Reveal>
    </div>
    {/* Content */}
  </div>
</SectionTransition>
```

## Two-Column Magazine Spread

Used by: WhyMenReturn, Experience, About

```
lg:grid-cols-[1.1fr_1.4fr]    ← Asymmetric split (narrower text, wider image)
lg:gap-24                       ← Wide gutter for editorial feel
Left column:  flex-col justify-center (text content)
Right column: sticky top-24 (image with overflow-hidden)
```

## Card Patterns

### Contact Info Cards
```
Border:  border-gold-500/12
Background: bg-ink-900/40
Padding: p-7 sm:p-8
Icon:    lucide-react icon in gold-400
Heading: font-display text-lg font-600 text-gold-300
```

### Benefit / Pillar Cards
```
Border:  border-ink-700 (default) → border-gold-500/25 (hover)
Background: bg-ink-850/40 → bg-ink-800/40 (hover)
Padding: p-8
Icon:    h-14 w-14 box with border-gold-500/20
Heading: font-display text-xl font-600 uppercase tracking-wide text-white
Body:    text-sm text-ink-400
Transition: duration-500 (all properties)
```

### Stat Counter Cards
```
Border:  border-gold-500/10 → hover:border-gold-500/30
Background: bg-ink-900/40 → hover:bg-ink-900/70
Padding: p-8
Icon box: h-16 w-16 with border-gold-500/20
Counter: font-display text-5xl → sm:text-6xl font-700 text-white
Label:   text-sm font-500 uppercase tracking-wider text-ink-300
```

### Review Cards
```
Border:  border-ink-700 → hover:border-gold-500/25
Background: bg-ink-850/40 → hover:bg-ink-800/40
Padding: p-7
Quote:   h-8 w-8 gold-500/25 decorative icon
Stars:   h-3.5 w-3.5 fill-gold-400
Avatar:  h-11 w-11 border-gold-500/20 bg-ink-900
```

## Background System

```
Layer 0 (z-0):  Fixed background image (/images/pozadi.png), cover, center 25%
                pointer-events-none
Layer 1 (z-10): Content layer, relative, min-h-screen
Layer 2 (z-20): FilmGrain vignette (radial gradient, transparent→rgba(0,0,0,0.45))
                pointer-events-none
Layer 3 (z-60): Header nav, fixed top
Layer 4 (z-70): Hero logo (fixed)
Layer 5 (z-80): ScrollProgress bar (fixed top)
Layer 6 (z-100): CinematicIntro curtain (fixed, fullscreen)
```

## Section Snap Behavior

| Section | snap-start | Notes |
|---------|-----------|-------|
| Hero | ✅ | |
| WhyMenReturn | ✅ | |
| Experience | ✅ | |
| Trust | ❌ | Free-scrolling |
| Benefits | ❌ | Free-scrolling |
| Services | ✅ | |
| Booking | ❌ | Free-scrolling |
| Gallery | ✅ | |
| VideoPresentation | ✅ | |
| Reviews | ✅ | |
| About | ✅ | |
| Contact | ❌ | Free-scrolling |
| FinalScene | ✅ | |
| Footer | ❌ | Free-scrolling |
