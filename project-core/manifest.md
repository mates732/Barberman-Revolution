# Barberman Revolution — Project Manifest

## Entry Point

This directory (`/project-core`) is the single source of truth for the architectural foundation of this project.

**Every future modification must start by consulting this file.**

---

## Project Overview

- **Name**: Barberman Revolution
- **Type**: Luxury barbershop marketing website
- **Stack**: Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion v12
- **Router**: React Router DOM v7 (BrowserRouter, 4 routes)
- **State**: Local React state only (no external stores)
- **Build**: `tsc -b && vite build`
- **Dev**: `npm run dev`

---

## Project Structure

```
/project-core
  manifest.md              ← THIS FILE — entry point
  foundation/              ← Foundation Layer — tokens, motion, providers, config
  validation/              ← Architecture validation — automated checks, reports
  architecture/            ← Structure, hierarchy, rendering, data flow
  design/                  ← Colors, typography, spacing, buttons, surfaces
  motion/                  ← All animations, framer-motion usage, timing
  ui/                      ← UI registry — every reusable component
  performance/             ← Render order, hydration, dead code, optimizations
  coding/                  ← Coding standards (React, TS, Tailwind, imports)
  maps/                    ← Visual trees (components, deps, rendering, animations)
  audits/                  ← Technical debt, duplicates, hardcoded values
  rules/                   ← Permanent global ruleset
```

---

## Quick Reference

| Area | Documentation |
|------|--------------|
| **Foundation Layer** | `foundation/README.md` — **start here for architecture decisions** |
| **Foundation Governance** | `foundation/GOVERNANCE.md` — rules for extraction, deps, imports, growth |
| **Architecture Validation** | `validation/README.md` — automated checks, contributor workflow |
| Architecture | `architecture/README.md` |
| Component Tree | `maps/component-tree.md` |
| Design Tokens | `design/colors.md`, `design/typography.md` |
| Animations | `motion/README.md` |
| UI Components | `ui/registry.md` |
| Performance | `performance/README.md` |
| Coding Standards | `coding/standards.md` |
| Audit Reports | `audits/` |
| Global Rules | `rules/GLOBAL_RULES.md` |

---

## Future Workflow

1. Read this manifest (`manifest.md`)
2. Load the relevant documentation from `/project-core`
3. Check whether the requested change fits the existing architecture
4. Reuse existing systems before creating new ones
5. Only create new structures when absolutely necessary
6. Run `npm run arch-check` before committing
7. Update `/project-core` whenever the architecture evolves

**The Project Core must remain synchronized with source code at all times.**
