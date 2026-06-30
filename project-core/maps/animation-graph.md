# Animation Dependency Graph

## Scroll Hierarchy

```
Document Scroll
│
├─ scrollY (global, raw pixels)
│   └─ useTransform (custom function with quartic ease)
│       ├─ logoX    ← center → header slot x
│       ├─ logoY    ← center → header slot y
│       └─ logoScale ← 1 → 0.55
│
├─ scrollYProgress (global, 0→1)
│   └─ useSpring
│       └─ ScrollProgress.scaleX    ← bar width 0→1
│
├─ heroScroll (target: #hero, offset: ['start start', 'end start'])
│   └─ useTransform
│       ├─ contentOpacity    ← [0, .25, .40] → [1, 1, 0]
│       ├─ contentY          ← [0, .25, .40] → [0, 0, -16]
│       ├─ contentFilter     ← [0, .25, .40] → [blur(0)...blur(1.5)]
│       ├─ bodyOpacity       ← [0, .25] → [1, 0]
│       └─ ctaOpacity        ← [0, .25] → [1, 0]
│
├─ Section A scrollYProgress (target: section A, offset: ['start end', 'end start'])
│   ├─ SectionTransition.opacity  ← [0, .3, .7, 1] → [0, 1, 1, 0]
│   ├─ SectionTransition.y        ← [0, .3, .7, 1] → [30, 0, 0, -30]
│   ├─ SectionTransition.filter   ← [0, .3, .7, 1] → [blur(4)...blur(4)]
│   └─ SectionScrollContext (provides scrollYProgress to children)
│       └─ Reveal.opacity         ← [delay, delay+.12] → [0, 1]
│       └─ Reveal.y               ← [delay, delay+.12] → [y, 0]
│       └─ Reveal.filter          ← [delay, delay+.12] → [blur(8), blur(0)]
│
├─ Section B scrollYProgress (target: section B)
│   └─ (same pattern as above)
│
├─ (...repeat for each section)
│
└─ GalleryImage N scrollYProgress (target: img ref, offset: ['start end', 'end start'])
    └─ useTransform
        └─ img.scale  ← [0, .3, .7, 1] → [1, 1.06, 1.06, 1]
```

## Animation Type Distribution

```
Scroll-driven (useScroll + useTransform):
  ├─ 1 global scrollY (Hero logo)
  ├─ 1 global scrollYProgress (ScrollProgress)
  ├─ 7 section scrollYProgress (SectionTransition)
  └─ 4 gallery scrollYProgress (GalleryImage)
  Total: 13 useScroll instances

AnimatePresence:
  ├─ CinematicIntro (curtain)
  ├─ MenuOverlay (fullscreen menu)
  ├─ Booking (form ↔ success)
  └─ VideoPresentation (cover ↔ iframe)
  Total: 4 AnimatePresence instances

UseInView:
  ├─ Reveal (fallback mode — subpages)
  └─ Trust/AnimatedCounter ×4 (counter trigger)
  Total: ~10 useInView instances (worst case)

Spring:
  └─ ScrollProgress (1 useSpring)
```

## Transform Outputs by Component

| Component | Animated Properties | Method |
|-----------|-------------------|--------|
| Hero logo | x, y, scale | useTransform (custom fn) |
| Hero content | opacity, y, filter | useTransform (range map) |
| Hero body | opacity | useTransform (range map) |
| Hero CTA | opacity | useTransform (range map) |
| ScrollProgress | scaleX | useSpring |
| SectionTransition | opacity, y, filter | useTransform (range map) |
| Reveal (scroll mode) | opacity, y, filter | useTransform (range map) |
| Reveal (inview mode) | opacity, y, filter | initial → animate |
| GalleryImage | scale | useTransform (range map) |
| CinematicIntro | opacity, x, scale | initial → animate → exit |
| MenuOverlay | opacity, y | initial → animate → exit |
| Booking form | opacity, scale | initial → animate → exit |
| VideoPresentation | opacity | initial → animate → exit |
| Header nav | color, drop-shadow | CSS transition (hover) |
| All buttons | shadow, translateY, border, scale | CSS transition |
| All cards | border, background, shadow | CSS transition |
| Images (sections) | scale, grayscale | CSS transition (hover) |
