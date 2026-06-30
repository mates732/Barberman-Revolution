# Project Core

This directory is the **single source of truth** for the Barberman Revolution frontend architecture.

## Structure

```
project-core/
├── manifest.md              ← Entry point — start here
├── README.md                ← This file
│
├── architecture/
│   └── README.md            ← Folder structure, component hierarchy, routing,
│                                rendering lifecycle, data flow, state flow
│
├── design/
│   ├── colors.md            ← Color palette, semantic colors, missing tokens
│   ├── typography.md        ← Font hierarchy, all text styles, hardcoded values
│   ├── spacing.md           ← Section padding, gaps, responsive breakpoints
│   ├── buttons.md           ← Button hierarchy, variants, inconsistencies
│   └── surfaces.md          ← Section layout patterns, card patterns, z-index layers
│
├── motion/
│   ├── README.md            ← All animation types, scroll-driven graph, hover effects
│   └── presets.md           ← Timing defaults, spring params, easing curves, durations
│
├── ui/
│   └── registry.md          ← Every reusable component, single-use components,
│                                dead components, potential duplicates
│
├── performance/
│   └── README.md            ← Render order, hydration, large renders,
│                                expensive operations, dead code, optimizations
│
├── coding/
│   └── standards.md         ← React, TypeScript, Tailwind, imports,
│                                file naming, component structure
│
├── maps/
│   ├── component-tree.md    ← Full component tree from App to leaf nodes
│   ├── animation-graph.md   ← Scroll hierarchy, animation type distribution,
│                                transform outputs by component
│   ├── routing.md           ← Route table, navigation flow, scroll behavior
│   └── state-graph.md       ← State locations, effects, flow diagram
│
├── audits/
│   ├── technical-debt.md    ← Priority-categorized debt (high/medium/low)
│   ├── duplicates.md        ← Duplicate components, styles, animations, logic
│   └── hardcoded-values.md  ← Colors, sizes, shadows, gradients, opacities
│
└── rules/
    └── GLOBAL_RULES.md      ← Permanent ruleset for color, typography, spacing,
                                 animation, components, state, coding, performance
```

## How to Use

1. **Before making any change**, read `manifest.md` to understand what exists
2. **Check the relevant documentation** in the subdirectories
3. **Follow GLOBAL_RULES.md** — these are permanent constraints
4. **Reuse** existing components and patterns from the UI registry and motion docs
5. **Update this directory** when architecture changes

## Synchronization

This directory must remain synchronized with the source code. Any architectural change should be reflected here.
