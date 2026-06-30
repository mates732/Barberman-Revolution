# Animation Presets

## Scroll Timing Defaults

| Property | Default | Custom Overrides |
|----------|---------|-----------------|
| SectionTransition enterEnd | 0.3 | WhyMenReturn: 0.4, Experience: 0.35 |
| SectionTransition exitStart | 0.7 | — |
| SectionTransition y range | 30px | — |
| SectionTransition blur range | 4px | — |
| Reveal range | [delay, delay + 0.12] | — |
| Reveal y default | 40px | — |
| Reveal blur default | 8px | — |
| Hero content exit range | [0, 0.25, 0.40] | — |
| Hero body opacity range | [0.02, 0.08] | — |
| Hero CTA opacity range | [0.04, 0.14] | — |
| GalleryImage zoom range | [0, 0.3, 0.7, 1] | — |

## Spring Preset

ScrollProgress bar:
```
stiffness: 120
damping: 30
restDelta: 0.001
```

## Easing Presets

| Name | Easing | Used for |
|------|--------|----------|
| Logo ease | `1 - (1-p)^5` (quintic out) | Hero logo position/scale |
| Card reveal | `[0.16, 1, 0.3, 1]` | Reveal fallback (useInView) |
| CinematicIntro panels | `[0.83, 0, 0.17, 1]` | Curtain slide |
| MenuOverlay fade | `easeOut` (duration 0.35) | Overlay |

## Duration Presets

| Duration | Used for |
|----------|----------|
| 0.3s | Nav hover, link hover |
| 0.35s | MenuOverlay overlay fade |
| 0.4s | MenuOverlay staggered items |
| 0.5s | Button transitions, gold card border transitions |
| 0.7s | VideoPresentation cover scale |
| 0.8s | CinematicIntro panel slide |
| 0.9s | Reveal fallback animation |
| 1.8s | Image hover scale |
| 1800ms | Trust counter animation |
