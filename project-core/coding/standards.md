# Coding Standards

## React

- **Components**: Default export functions (`export default function ComponentName()`)
- **No class components** — functional components only
- **Props**: TypeScript interfaces in the same file (not exported unless reused)
- **No React.memo()** — currently not used, but should be considered for heavy components
- **No useMemo / useCallback** — currently not used
- **Hooks**: Import from React directly (`import { useState } from 'react'`)
- **Event handlers**: Regular functions inside component, not `useCallback` (unless needed)

## TypeScript

- Strict mode enabled in tsconfig
- Use `interface` for props, not `type` (unless for unions)
- Props interfaces prefixed with component name: `SectionTransitionProps`, `RevealProps`
- Use `type ReactNode` for children prop typing
- Use `type MotionValue<number>` from framer-motion for motion value types
- Avoid `any` — use proper types or `unknown`

## Tailwind

- Use Tailwind utility classes exclusively (no custom CSS for layout)
- Custom CSS only in `index.css` for:
  - Theme tokens (`@theme`)
  - Base layer overrides
  - Utility classes that can't be expressed in Tailwind (gradient text, etc.)
- No `@apply` — use utility classes directly in JSX
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`
- Use opacity modifiers: `/50`, `/20`, etc. (e.g. `bg-gold-500/20`)
- No arbitrary values (`text-[13px]`) unless absolutely necessary — prefer the spacing/type scale
- Use Tailwind v4 syntax (no `@tailwind` directives, use `@import "tailwindcss"`)

## Imports

Order:
1. React / framework imports
2. Third-party libraries (framer-motion, react-router-dom, lucide-react)
3. Local components (`./Component`)
4. Local utilities/contexts (`../lib/data`, `./SectionScrollContext`)
5. Types (`type MotionValue`)

No blank line between groups (current convention). Relative imports (no path aliases).

## File Naming

- **Components**: `PascalCase.tsx` (e.g. `Hero.tsx`, `SectionTransition.tsx`)
- **Pages**: `PascalCasePage.tsx` (e.g. `HomePage.tsx`, `OffersPage.tsx`)
- **Utilities/Lib**: `camelCase.ts` (e.g. `data.ts`)
- **CSS**: `camelCase.css` (e.g. `index.css`)
- **Contexts**: `PascalCaseContext.tsx` (e.g. `SectionScrollContext.tsx`)

## Folder Naming

- `components/` — lowercase, plural
- `pages/` — lowercase, plural
- `lib/` — lowercase, singular (project utilities)

## Component Structure

```tsx
// 1. Imports
import { useState } from 'react'
import { motion } from 'framer-motion'

// 2. Props interface (if applicable)
interface ComponentProps {
  title: string
  subtitle?: string
}

// 3. Component function (default export)
export default function ComponentName({ title, subtitle }: ComponentProps) {
  // 4. Hooks (state, effects, refs)
  const [state, setState] = useState(false)

  // 5. Event handlers / local functions
  const handleClick = () => setState(true)

  // 6. Render
  return (
    <div>
      {children}
    </div>
  )
}
```

## Comments

- No comments inside JSX or component logic (current convention)
- Only add JSDoc comments for complex utility functions or non-obvious behavior
- No dead code left commented out — remove it

## Error Handling

- No error boundaries currently
- No explicit error handling in components
- Form validation is minimal (HTML5 `required` attributes only)
- Booking form has no error state for failed submission (success is simulated)

## Documentation

- This `/project-core` directory is the single source of truth
- Component-level documentation should go in the UI registry (`ui/registry.md`)
- No inline storybook or JSDoc (unless needed for complex logic)

## Hooks

- Custom hooks should be placed in `src/hooks/` if extracted (currently none exist)
- All state is local to components (no extracted hooks)
- `useScroll` + `useTransform` patterns should follow the conventions in `motion/`
