# Global Rules

## Color Rules

1. **No hardcoded colors.** All colors must use Tailwind token classes (`text-ink-300`, `bg-gold-500`, `border-gold-500/20`). The only exception is `rgba()` for shadows and gradients.
2. **No new color tokens** without adding them to `@theme` in `index.css` first.
3. **Gold values** must use the gold token scale (100–600). Do not add new gold hues.
4. **Text on dark backgrounds** uses `ink-100`–`ink-400` range. Use `ink-300` for primary body, `ink-400` for secondary.

## Typography Rules

5. **No duplicated typography.** Every text style should map to the hierarchy in `design/typography.md`.
6. **No arbitrary font sizes** (`text-[13px]`, `text-[10px]`). Use the Tailwind type scale. If a size doesn't exist, consider whether it's needed.
7. **Headings** use `font-display`. **Body** uses default font (`font-sans`). **Italic accents** use `font-serif italic`.
8. **Gradient text** uses the existing `.text-gold-gradient` CSS class. Do not create new gradient text utilities.

## Spacing Rules

9. **No arbitrary spacing values.** Use the Tailwind spacing scale. The sole exception is `py-[120px]` which is the standard section padding.
10. **Section vertical padding** is `py-[120px]`. New sections must use this value unless there's a layout justification.
11. **Horizontal padding** is `px-5 sm:px-8` for content containers.

## Animation Rules

12. **No duplicated animations.** If an animation pattern exists in `motion/`, reuse it.
13. **All section animations** must be scroll-driven via `useScroll` + `useTransform`.
14. **No time-based entrance sequences.** All entrance effects must be scroll-connected.
15. **No CSS `opacity: 0` hacks** for initial state. Use framer-motion MotionValues.
16. **Animate only compositor properties** — `opacity`, `transform` (translate/scale), `filter`. Never animate `top`, `left`, `width`, `height`.
17. **Hover effects** use CSS `transition` (not framer-motion) for performance.

## Component Rules

18. **No duplicated components.** Before creating a new component, check `ui/registry.md`. Reuse existing components.
19. **No business logic inside UI components.** Data fetching, validation, and calculations should be separated.
20. **Section components** follow the standard pattern: `SectionTransition` → header with `Reveal` children → content with `Reveal` children.
21. **New pages** must use existing components (PageHeader, Booking, Contact, SectionTransition, Reveal) before creating new ones.

## State Rules

22. **No global state** unless proven necessary. Prefer local `useState`.
23. **Cross-component communication** uses React context (for animation values) or custom DOM events (for rare global triggers like `cinematic-intro`).

## Coding Rules

24. **No `any` types.** Use proper TypeScript types or `unknown`.
25. **No commented-out code.** Remove it entirely.
26. **Imports** follow the order in `coding/standards.md`.
27. **File names** follow the conventions in `coding/standards.md`.

## Performance Rules

28. **Images below the fold** should use `loading="lazy"`.
29. **Expensive scroll transforms** (custom functions) should be minimized. Combine where possible.
30. **Dead code** must be removed. Check `audits/technical-debt.md` for known dead code.

## Workflow Rules

31. **Consult `manifest.md` first** before implementing any change.
32. **Reuse existing systems** before creating new ones.
33. **Only create new structures** when the existing architecture cannot accommodate the requirement.
34. **Update `/project-core`** whenever the architecture evolves. The documentation must stay synchronized with source code.

## Enforcement

These rules apply to all future modifications. If a rule cannot be followed, the exception must be documented in `/project-core` and the reasoning explained in the commit message.
