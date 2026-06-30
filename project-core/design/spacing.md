# Spacing System

## Section Padding

Every content section uses a consistent vertical rhythm:

```
py-[120px]       ← Standard section vertical padding
```

Custom overrides:
- `FinalScene`: `py-[120px]` with `min-h-screen` + flex centering
- `Trust`, `Benefits`, `Booking`: `py-[120px]`

## Section Header Margin

```
mb-20 sm:mb-28   ← Space between section header and content
```

## Grid Gaps

```
gap-5             ← Card grids (Experience, Contact 3-col)
gap-4             ← Stat counter grid (Trust 4-col)
gap-6             ← Benefits 3-col grid
gap-10 sm:gap-12  ← Review secondary cards
gap-16 lg:gap-24  ← Two-column magazine spreads
```

## Content Padding

```
px-5 sm:px-8      ← Standard horizontal content padding
                    max-w-7xl for full-width sections
                    max-w-6xl for narrower sections
                    max-w-5xl for pricing list
                    max-w-3xl for centered text
```

## Card Padding

```
p-7 sm:p-8        ← Contact info cards, Booking form, stat cards
p-8               ← Benefit cards, About pillars
p-6               ← Review header badge
p-2               ← Map container
```

## Decorative Lines

```
h-px               ← All decorative dividers
w-8                ← Horizontal decorator lines (eyebrow sides)
w-12 / w-16        ← Section divider lines
max-w-xs           ← Review section divider
```

## Element Spacing

```
mt-6               ← Title below eyebrow
mt-8               ← Body below title / decorative line below content
mt-10 / mt-12      ← Hero body below title / large gaps
mt-14              ← Experience moment list below title
mt-16              ← Hero CTA below body
mt-20 sm:mt-24     ← Service footer note below list
gap-3              ← Eyebrow decorator gaps
gap-5              ← Horizontal decorator gaps
gap-6              ← Section header column gap
gap-10 sm:gap-12   ← Two-column layout gap
```

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| `sm:` | 640px | Tablet layout switches (grid cols, block→inline, spacing increase) |
| `md:` | 768px | Hero heading size bump |
| `lg:` | 1024px | Two-column magazine layouts, wider heading sizes |
| `2xl:` | — | Not used |

No arbitrary spacing values outside of `py-[120px]` which is the sole exception from the Tailwind spacing scale.
