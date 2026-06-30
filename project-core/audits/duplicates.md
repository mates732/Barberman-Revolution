# Duplicates Report

## Duplicate Components

| What | Files | Detail |
|------|-------|--------|
| Service list | `Services.tsx`, `OffersPage.tsx` (inline) | Two implementations (Pricing.tsx deleted) |
| Contact display | `Contact.tsx`, `ContactPage.tsx` | Section component reused on page — this is correct reuse |
| Booking display | `Booking.tsx` (reused on 4 pages) | Correct reuse — single component |

## Duplicate Styles

| Style | Files | Detail |
|-------|-------|--------|
| Gold gradient button shadows | 5 files (Hero, Booking, MenuOverlay, Pricing, FinalScene) | Each defines its own shadow values with minor variations |
| Text shadow on nav | `Header.tsx` (5x inline) | Same `0 2px 8px rgba(0,0,0,0.35)` repeated |
| Section header pattern | 12 section components | Same eyebrow + title pattern repeated in every section. Could be extracted to a shared component. |
| Button active/focus styles | 5 files | Same `focus:outline-none focus:ring-2 focus:ring-gold-400/50 active:scale-[0.98]` repeated |

## Duplicate Animations

| Animation | Files | Detail |
|-----------|-------|--------|
| Scroll-driven opacity/y/blur | SectionTransition + Reveal | Wrapper and child animate the same properties — intentional layering but worth noting |
| Image hover scale | WhyMenReturn, Experience, Gallery | Same `hover:scale-105 hover:grayscale-0` pattern |

## Duplicate Logic

| Logic | Files | Detail | Status |
|-------|-------|--------|--------|
| `window.scrollTo(0,0)` on pathname | `ScrollToTop.tsx`, `Header.tsx` | Duplicate effect | ✅ Fixed — only ScrollToTop.tsx remains |
| `'cinematic-intro'` event listener | `CinematicIntro.tsx`, `HomePage.tsx` | Both listen for the same custom event — intentional (one triggers, one acts) | Intentional |
| Gold color references | 5 files | `rgba(201,162,39, ...)` hardcoded instead of using CSS variable | Remaining |
