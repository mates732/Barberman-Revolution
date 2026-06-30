# Architecture Validation

## Purpose

Automated enforcement of Foundation Governance rules. Every change to the codebase should pass validation before being considered complete.

---

## Running Validation

```bash
npm run arch-check
```

Output:
- **Summary** printed to terminal (score, violations, pass/fail)
- **Full report** written to `project-core/validation/report.md`

### CI Integration

Add to your CI pipeline:

```yaml
- run: npm run arch-check
- run: node -e "const r=require('fs').readFileSync('project-core/validation/report.md','utf-8'); if(/Score:\\s*\\d+/.test(r)&&parseInt(/Score:\\s*(\\d+)/.exec(r)[1])<90) process.exit(1)"
```

---

## What It Checks

### 1. Import Boundaries (Critical)

Scans every file in `src/foundation/` for imports that reach into application code.

**Rule**: Foundation must never import from `components/`, `pages/`, `features/`, or `lib/`.

| Violation | Penalty | Fail threshold |
|-----------|---------|----------------|
| Foundation → `components/` import | -30 pts | Any = FAIL |

**Current**: 0 violations ✅

---

### 2. Hardcoded Token Values (Error)

Scans every non-Foundation source file for values that have existing Foundation token equivalents.

**Rule**: If a Foundation token already exists for a value, use the token. Do not duplicate the value inline.

| Pattern | Token | Source |
|---------|-------|--------|
| `py-[120px]` | `SECTION_PADDING_Y` | `tokens/spacing.ts` |
| `min-h-[550px] sm:min-h-[650px] lg:min-h-[800px]` | `STICKY_IMAGE_HEIGHTS` | `tokens/spacing.ts` |
| `min-h-[110vh]` | `HERO_MIN_HEIGHT` | `tokens/spacing.ts` |
| `grayscale-[20%]` | `IMAGE_GRAYSCALE` | `tokens/spacing.ts` |
| `0 2px 8px rgba(0,0,0,0.35)` | `TEXT_SHADOW_HEADER` | `tokens/shadows.ts` |
| `hover:drop-shadow-[0_0_6px_rgba(224,192,80,0.3)]` | `HEADER_DROP_GLOW` | `tokens/shadows.ts` |
| `shadow-[0_0_20px_rgba(201,162,39,0.10),...]` | `CTA_GLOW_DEFAULT` | `tokens/shadows.ts` |
| `hover:shadow-[0_0_30px_rgba(201,162,39,0.18),...]` | `CTA_GLOW_HOVER` | `tokens/shadows.ts` |
| `[0.83, 0, 0.17, 1]` | `EASE_CINEMATIC_DOOR` | `tokens/timing.ts` |

**Note**: The check allows false negatives for values intentionally component-specific. When such a value is flagged, either extract it or document the exception in `GOVERNANCE.md`.

---

### 3. Hardcoded Z-index (Warning)

Scans for Tailwind `z-*` classes that should reference `tokens/z-index.ts`.

Z-index is a **system** — individual values only make sense relative to each other. Using a single file ensures the entire ladder can be audited and adjusted.

**Known z-index values**:

| Class | Token | Element |
|-------|-------|---------|
| `z-0` | `Z_BACKGROUND` | Background texture |
| `z-10` | `Z_APP_SHELL` | App shell |
| `z-20` | `Z_VIGNETTE` | Film grain overlay |
| `z-60` | `Z_HEADER` | Header nav |
| `z-70` | `Z_FLOATING_LOGO` / `Z_MENU_OVERLAY` | Logo + Menu |
| `z-80` | `Z_SCROLL_PROGRESS` | Scroll bar |
| `z-100` | `Z_INTRO_OVERLAY` | Intro curtain |

---

### 4. Duplicated Motion Definitions (Warning)

Scans the entire `src/` for:
- Custom easing bezier arrays (`[float, float, float, float]`) appearing in multiple files
- Animation duration values appearing 3+ times

If the same easing or duration is found in multiple locations, the report suggests extracting it to `tokens/timing.ts` or `motion/presets.ts`.

---

### 5. Foundation Internal Dependencies (Critical)

Scans for circular or reverse dependencies within Foundation modules.

**Rule**: Foundation modules may depend on third-party libraries and other Foundation modules. They must never depend on each other in a way that creates cycles.

---

### 6. Public API Surface (Info)

Ensures that application code imports Foundation through clean module paths rather than reaching into internal implementation details.

---

## Compliance Score

| Severity | Penalty | Example |
|----------|---------|---------|
| Critical | -30 pts each | Foundation imports from components/ |
| Error | -10 pts each | Hardcoded value with token available |
| Warning | -5 pts each | Raw z-index class, duplicated motion |
| Info | -1 pt each | Deep import pattern |

**Thresholds**: ≥ 90 = PASS, ≥ 70 = WARN, < 70 = FAIL

---

## Contributor Workflow

Every change must follow this sequence:

```
1. READ  Foundation Governance (project-core/foundation/GOVERNANCE.md)
2. CHECK whether an existing Foundation module can be reused
3. IMPLEMENT the feature
4. RUN   npm run arch-check
5. REVIEW the report for new violations
6. FIX   any violations (or document exceptions)
7. UPDATE project-core documentation if architecture changed
```

### When adding a new component

1. Before writing CSS values, check `tokens/spacing.ts`, `tokens/shadows.ts`, `tokens/z-index.ts`
2. Before writing animation values, check `tokens/timing.ts`, `motion/presets.ts`
3. Keep values local to the component — only extract to Foundation when duplicated
4. Run `npm run arch-check` before committing

### When extracting to Foundation

1. Follow the extraction rules in `GOVERNANCE.md §2`
2. Register the new token in `scripts/arch-check.mjs` token database so validation flags its hardcoded equivalent
3. Update `foundation/README.md` with the new token
4. Run `npm run arch-check` — score should not decrease

---

## Future Readiness

### What could become a shared internal framework

The following parts of Foundation are generic enough to be extracted into a reusable package shared across projects:

| Module | Generic? | Why |
|--------|----------|-----|
| `tokens/z-index.ts` | ✅ Yes | Z-index ladder is universal — only the values differ per project |
| `tokens/timing.ts` | ✅ Yes | Easing curves are framework-agnostic design primitives |
| `tokens/shadows.ts` | ⚠️ Partial | Shadow definitions use project-specific colors (rgba values); the pattern is reusable |
| `motion/presets.ts` | ✅ Yes | `easeLogo` quintic power-out is a generic easing function |
| `utils/` | ✅ Yes (when populated) | Pure functions are inherently reusable |
| `tokens/spacing.ts` | ⚠️ Partial | Tailwind class names are framework-specific; spacing values are generic |
| `providers/AppProvider.tsx` | ❌ No | Application-specific lifecycle (intro screen, booking flow) |
| `motion/useHeroMotion.ts` | ❌ No | Component-specific — except as a pattern reference |

### To make Foundation reusable across projects

1. **Split branding from structure**: Move project-specific values (`gold-*` colors, font stacks) into a `theme/` or `branding/` module outside Foundation
2. **Extract the validation script**: `scripts/arch-check.mjs` uses no project-specific logic beyond the token database — parameterize the token DB into a config file
3. **Package as npm workspace**: Create a `@barberman/foundation` package with the generic tokens, easing functions, and validation script
4. **Document the migration path**: Each new project imports the shared package, overrides branding tokens, and adds project-specific Foundation modules

### Design principles for reuse

- Foundation depends on third-party libraries, never on application code
- Tokens are immutable `as const` values — easy to override per-project
- Motion hooks are pure animation logic — swap the library (framer-motion → GSAP) without changing components
- Validation is self-contained — run `arch-check` in any project that uses the Foundation pattern

---

## See Also

- `GOVERNANCE.md` — Full rule set for extraction, dependencies, imports, and growth
- `report.md` — Latest validation results
- `scripts/arch-check.mjs` — The validation implementation
