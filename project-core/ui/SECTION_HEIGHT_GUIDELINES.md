# Section Height Guidelines

## Philosophy

Every primary section should fit naturally within **one viewport** (900px at 1440×900 target). Each section is an *editorial slide* — the complete narrative is visible without scrolling. The user absorbs a single idea per slide, then scrolls to the next.

Exceptions (with documented justification):
- **Hero** — may use 100vh (full viewport) but not more
- **Gallery** — intentionally multi-slide (each image is its own narrative beat)

## The Vertical Budget

Available height per section on a 900px viewport:

| Component | Target height |
|---|---|
| Section padding (top + bottom) | ≤ 160px total (80px each) |
| Section label + heading + spacing | ≤ 280px |
| Content body | ≤ 460px |
| **Total usable** | **~900px** |

## Spacing Tokens (set in `foundation/tokens/spacing.ts`)

| Token | Current | Recommended | Why |
|---|---|---|---|
| `SECTION_PADDING_Y` | `py-[120px]` (240px) | `py-[80px]` (160px) | Padding consumes 27% of viewport; 160px leaves 740px for content |
| `STICKY_IMAGE_HEIGHTS` | `min-h-[800px]` at lg | `min-h-[450px]` at lg | At 800px the image alone is 89% of viewport — leaves no room for text |

## Typography Limits

| Role | Max size at lg | Max lines visible | Notes |
|---|---|---|---|
| `text-display` | `text-6xl` (~60px) | 2 | Section headings — never 3+ lines |
| `text-display-accent` | `text-6xl` (~60px) | 1 | Accent word in heading |
| `text-body` | `text-base` (~16px) | 4 sentences | Cut after 4 lines |
| `text-caption` | `text-sm` | 2 lines | Supporting text |

## Spacing Rules

These replace the current arbitrary `mb-20`/`mt-20` scattered across sections:

| Usage | Class | px |
|---|---|---|
| Below section heading block | `mb-10` | 40px |
| Between major content groups | `mt-10` | 40px |
| Between items in a list | `space-y-6` | 24px |
| Gallery image gaps | `space-y-20` | 80px |
| Below section label + before heading | `mb-6` | 24px |
| Before CTA/footer content | `mt-10` | 40px |

**Maximum spacing anywhere:** `mb-10` or `mt-10` (40px). Never use `mb-20`/`mt-20` (80px) or `sm:mb-28`/`sm:mt-24` (112px/96px).

## Grid Layout Heights

| Pattern | Max height |
|---|---|
| 1-column (text only) | 460px content |
| 2-column (text + sticky image) | 450px image + 40px gap |
| 3-column card grid | 300px per card row |
| 2×3 card grid (Benefits) | 2 rows × 250px = 500px content |
| 1×4 card grid (Trust) | 1 row × 220px = 220px content |

## Section-by-Section Constraints

### Hero
- **Height:** 100vh (not 110vh)
- **Logo:** `h-52` is correct placeholder for logo-fixed-at-top behavior
- **CTAs:** exit-only transforms `[0, 0.25]→[1,0]` — body and CTA visible at scroll=0
- **No sticky image** — all content is foreground over background

### WhyMenReturn (2-column, sticky image)
- **Left column content:** ≤ 400px (label + heading + paragraph + divider + quote)
- **Right column image:** `min-h-[450px]` at lg
- **Grid:** `grid-cols-[1.1fr_1.4fr]` with `gap-16`
- **Total after padding (160px):** ≤ 820px

### Experience (2-column, sticky image)
- **Left:** 5 moments. Each moment: word (44px) + description (~40px) + divider (~32px) = ~116px
- **Gap between moments:** `space-y-6` (24px) — not `space-y-10`
- **Total moments:** 5 × 116px + 4 gaps × 24px = 676px → too tall. **Reduce to 4 moments or use smaller word sizes.**
- **Right:** `min-h-[450px]` at lg
- **Separator dividers between moments:** `mt-6` (24px) — not `mt-8`

### Trust (1×4 stat grid)
- **Content:** ~220px heading block + ~220px 4-card row = ~440px
- **Fits comfortably at default spacing.** No adjustments needed.

### Benefits (2×3 card grid)
- **Content:** ~230px heading + ~250px card rows = ~480px
- **Fits comfortably.** No adjustments needed.

### Services (single-column list)
- **6 service items** × ~80px each (compact) + 5 gaps × 6px = ~510px
- **Heading block:** ~160px (reduced)
- **Footer note:** ~80px
- **Total content:** 750px → needs tight padding (`py-[60px]` = 120px total)
- **Consider:** abbreviating descriptions on desktop, or showing 4most popular + expand link

### Booking (2-column form)
- **Fits comfortably.** Left: ~310px text, Right: ~500px form.
- **No adjustments needed.**

### Gallery (editorial scroll)
- **Intentionally multi-viewport** — each image is a slide
- **Gap between images:** `space-y-20` (80px) — not 112px
- **Image aspect:** keep `aspect-[16/9] sm:aspect-[21/9]` — editorial feel
- **Total for 4 images:** ~2400px (3 viewports) is correct
- **Heading block:** reduced to `mb-10` to tighten

### VideoPresentation
- **Video container:** `max-w-4xl` (896px → 504px tall at 16:9) — not `max-w-6xl`
- **Heading block:** reduced to `mb-10`
- **Padding:** `py-[80px]`
- **Total:** 160px padding + 160px heading + 504px video = **824px** ✅

### Reviews
- **Heading block:** reduced to `mb-10`
- **Featured quote:** keep as-is (~180px)
- **Divider + gap to secondary:** `mt-10` each (not `mt-20 sm:mt-24`)
- **Secondary grid:** 3 columns × ~160px = 160px
- **Padding:** `py-[80px]`
- **Total:** 160px + 260px heading + 180px featured + 80px divider gap + 160px secondary = **840px** ✅

### About (2-column, sticky image)
- **Left column:** blockquote (~140px) + 2 paragraphs (~200px) + signature (~80px) = ~420px
- **Right column:** `min-h-[450px]` at lg
- **Grid:** `grid-cols-[1.1fr_1.4fr]` — image column wider, text on left
- **Padding:** `py-[80px]`
- **Total:** 160px + 450px = **810px** ✅

### Contact (3-column)
- **Fits comfortably.** 3 cards in a row.
- **No adjustments needed.**

### FinalScene (centered)
- **100vh.** Exactly one viewport.
- **No adjustments needed.**

## Image Size Guidelines

| Context | Max height at lg | Notes |
|---|---|---|
| Sticky editorial image (About, WhyMenReturn, Experience) | 450px | `min-h-[450px]` |
| Gallery image | ~550px (21:9 at 1280px wide) | Editorial — leave as-is |
| Video cover | 504px (16:9 at 896px wide) | Constrain to `max-w-4xl` |
| Stat card icon | 48px | `h-12 w-12` |
| Benefit card icon | 40px | `h-10 w-10` |

## When to Break the Rules

These are legitimate reasons to exceed one viewport:

1. **Gallery** — each image is a narrative slide; multi-viewport is the design
2. **Services** — if all 6 services must be visible with full descriptions (acceptable overflow, design choice)
3. **Experience** — if the founder insists on 5 moments with large typography (acceptable overflow, but not ideal)

In every case, first try: reduce padding → reduce gaps → reduce image height → reduce typography → reduce content. Never reverse the order.

## Validation

Run `npm run arch-check` after any spacing or sizing changes. The validation script checks for hardcoded Tailwind spacing classes. Add violations to the `Z_INDEX_HARDCODED`-style lists in `scripts/arch-check.mjs` as needed.
