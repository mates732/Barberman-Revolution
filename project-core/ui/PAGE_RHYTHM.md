# Page Rhythm System

## Philosophy

The website is not a list of sections — it is a directed experience.

Every section has a purpose, a pacing, and a visual density. The visitor should never feel that one section is too long or another too short. Scrolling should feel natural, intentional, and effortless.

Think like a film director, not a frontend developer.

### Film Analogy

| Film Element | Website Equivalent |
|---|---|
| Establishing shot | Hero |
| Intimate dialogue scene | Story sections (WhyMenReturn, About) |
| Montage sequence | Proof sections (Trust, Reviews) |
| Slow visual pan | Gallery |
| Action sequence | Experience (5 moments) |
| Information board | Services |
| The ask / climax | Booking |
| Closing credits / resolution | FinalScene |

A good film alternates pacing: slow → fast → slow → intense → quiet → climax → resolution. A good website does the same.

---

## Section Categories

### 1. Hero

Purpose: Brand establishment, first impression, world-building.

| Property | Value |
|---|---|
| Viewport height | 100vh (exactly one viewport) |
| Content density | Very low — one headline, one tagline, one CTA |
| Whitespace density | Very high — 60%+ empty space |
| Animation intensity | High — dramatic logo entrance, content fade-in/out |
| Typography scale | Display (largest on site: 5xl–8xl) |
| Expected reading time | 3–5 seconds |
| Expected scroll duration | 0.5–1 second (quick transition to next section) |
| Narrative role | "Once upon a time..." |

**Do not:** exceed 100vh, add secondary content, crowd with multiple CTAs, animate layout properties.

**Current sections:** Hero

---

### 2. Story

Purpose: Narrative immersion, emotional connection, sensory detail.

| Property | Value |
|---|---|
| Viewport height | 0.85–1.0 vh (765–900px) |
| Content density | Low–Moderate — one main idea, supporting text, one visual |
| Whitespace density | Moderate — 40% whitespace |
| Animation intensity | Moderate — scroll-driven reveals, staggered |
| Typography scale | Display heading + Body text + optional Caption |
| Expected reading time | 8–12 seconds |
| Expected scroll duration | 2–3 seconds (visitor reads, then scrolls) |
| Narrative role | "Here's what it feels like..." |

**Do not:** pack multiple ideas, exceed 1 viewport, use dense card grids.

**Current sections:** WhyMenReturn, Experience, VideoPresentation, About

---

### 3. Proof

Purpose: Social proof, credibility, trust-building. Fast and punchy.

| Property | Value |
|---|---|
| Viewport height | 0.6–0.8 vh (540–720px) |
| Content density | High — multiple data points, fast to scan |
| Whitespace density | Low — tight layout, compact cards |
| Animation intensity | Low–Moderate — counter animations, simple reveals |
| Typography scale | Stat (largest), Heading-card, Decorative |
| Expected reading time | 4–6 seconds |
| Expected scroll duration | 1–2 seconds (fast scan, quick transition) |
| Narrative role | "Don't just take our word for it..." |

**Do not:** exceed 0.8 vh, add lengthy text, use large images.

**Current sections:** Trust, Reviews

---

### 4. Information

Purpose: Practical details, features, menu. Structured and scannable.

| Property | Value |
|---|---|
| Viewport height | 0.7–0.9 vh (630–810px) |
| Content density | Moderate–High — structured data, lists, cards |
| Whitespace density | Low–Moderate |
| Animation intensity | Low — simple reveals, no dramatic transforms |
| Typography scale | Heading-card + Body + Decorative |
| Expected reading time | 10–15 seconds |
| Expected scroll duration | 2–4 seconds |
| Narrative role | "Here's what you need to know..." |

**Do not:** use immersive full-height images, add narrative prose.

**Current sections:** Benefits, Services, Contact

---

### 5. Conversion

Purpose: Action. The reason the page exists.

| Property | Value |
|---|---|
| Viewport height | 0.7–0.8 vh (630–720px) |
| Content density | Moderate — form fields + supporting text |
| Whitespace density | Moderate — breathing room for form |
| Animation intensity | Low — focus on usability, not spectacle |
| Typography scale | Body + Label-form + CTA |
| Expected reading time | 15–20 seconds (including form interaction) |
| Expected scroll duration | N/A (visitor stops to interact) |
| Narrative role | The climax. "Now is the time." |

**Do not:** add distractions, heavy animations, multiple CTAs.

**Current sections:** Booking

---

### 6. Gallery

Purpose: Visual immersion. Let the imagery speak.

| Property | Value |
|---|---|
| Viewport height | Multi-viewport (intentional — each image is a slide) |
| Content density | Very low — one image + one caption per slide |
| Whitespace density | Very high — 70%+ whitespace around each image |
| Animation intensity | High — scroll-driven zoom, parallax |
| Typography scale | Caption only |
| Expected reading time | 5–8 seconds per image |
| Expected scroll duration | 2–3 seconds per image |
| Narrative role | Visual interlude. "Look at this." |

**Exception:** This is the only category intentionally allowed to exceed one viewport. Reduce excessive gaps, preserve the immersive experience.

**Current sections:** Gallery

---

### 7. Closure

Purpose: Emotional send-off, final CTA, lasting impression.

| Property | Value |
|---|---|
| Viewport height | 100vh (exactly one viewport) |
| Content density | Very low — headline + divider + short line + CTA |
| Whitespace density | Very high — 70%+ |
| Animation intensity | Moderate — soft reveals, no drama |
| Typography scale | Display (large, matching Hero) |
| Expected reading time | 3–4 seconds |
| Expected scroll duration | 0.5–1 second |
| Narrative role | "And they lived barbered ever after..." |

**Do not:** add new information, secondary CTAs, contact details, navigation.

**Current sections:** FinalScene

---

## Category Comparison Matrix

| Category | Height | Density | Animation | Reading | Purpose |
|---|---|---|---|---|---|
| Hero | 100vh | ★☆☆☆☆ | ★★★★☆ | 3–5s | Establish |
| Story | 0.85–1.0 vh | ★★☆☆☆ | ★★★☆☆ | 8–12s | Immerse |
| Proof | 0.6–0.8 vh | ★★★★☆ | ★★☆☆☆ | 4–6s | Convince |
| Information | 0.7–0.9 vh | ★★★☆☆ | ★☆☆☆☆ | 10–15s | Inform |
| Conversion | 0.7–0.8 vh | ★★★☆☆ | ★☆☆☆☆ | 15–20s | Convert |
| Gallery | Multi-vh | ★☆☆☆☆ | ★★★★☆ | 5–8s/img | Show |
| Closure | 100vh | ★☆☆☆☆ | ★★★☆☆ | 3–4s | Close |

---

## Rhythm Rules

### Rule 1: Alternate Density

No two sections of the same density category should appear consecutively.

**Pattern:**
```
Hero (low density)
    ↓
Story (moderate)          ← density change ✓
    ↓
Proof (high density)      ← density change ✓
    ↓
Gallery (very low)        ← density change ✓
    ↓
Story (moderate)          ← density change ✓
    ↓
Proof/Information (high)  ← density change ✓
    ↓
Story (moderate)          ← density change ✓
    ↓
Information (high)        ← density change ✓
    ↓
Conversion (moderate)     ← density change ✓
    ↓
Information (high)        ← density change ✓
    ↓
Closure (very low)        ← density change ✓
```

### Rule 2: Alternate Category Type

Avoid placing two sections of the same category type back-to-back:
- Story + Story = narrative fatigue
- Information + Information = mental overload
- Proof + Proof = redundant

### Rule 3: The Arc

The page should follow a narrative arc:

```
ACT I — INVITATION (sections 1–3)
  Hero          → Establish
  Story         → Immerse
  Proof/Compact → Hook

ACT II — THE EXPERIENCE (sections 4–7)
  Gallery/Visual → Show
  Story          → Guide through journey
  Proof          → Validate
  Story/Visual   → Deepen

ACT III — THE OFFER (sections 8–10)
  Information/Proof → Rational reasons
  Information       → Menu, details
  Story             → Trust (founder)

ACT IV — THE ACTION (sections 11–13)
  Conversion → Book
  Information → Practical details
  Closure    → Send-off
```

### Rule 4: Three-Section Ceiling

No more than three sections of the same primary density within any five-section window. If sections 3, 4, and 5 are all moderate density, section 6 must be high or low density.

### Rule 5: Visual Breather

After any Information or Proof section (high density, fast scanning), the next section must be Story or Gallery or Closure (low density, immersive).

---

## Emotional Progression Framework

The page is not a list of sections. It is a conversation with the visitor. Every section must answer exactly one unspoken question. The visitor should never ask "Why am I seeing this now?"

### The 10 Emotional Steps

```
 1. CURIOSITY       "Who is Barberman Revolution?"          → Hero
 2. ATMOSPHERE      "What does this place feel like?"        → WhyMenReturn
 3. EXPERIENCE      "What actually happens here?"            → Experience
 4. VISUAL PROOF    "Show me."                               → Gallery
 5. TRUST (people)  "Can I believe this?"                    → Reviews
 6. HUMAN CONNECTION "Who is behind all of this?"            → About
 7. TRUST (facts)   "The numbers back it up."                → Trust (stats)
 8. OFFER           "What can I book?"                       → Services
 9. CONVERSION      "How do I book?"                         → Booking
10. LOGISTICS       "Where are you?"                         → Contact
11. CLOSURE         "One final impression."                  → FinalScene
```

Each step answers the visitor's next natural question. No step is skipped. No step arrives before its question has been asked.

### Human Before Numbers

Trust statistics must never appear before the visitor has emotionally connected with the brand.

**Why:** People trust people first. Numbers reinforce that trust afterwards. If statistics appear before emotional investment, they become meaningless decoration.

**Application:**
- Emotional proof (Reviews — "real people loved it") → Human connection (About — "meet the founder") → Rational proof (Trust — "the numbers confirm it")
- This creates a proof crescendo: emotional → personal → factual

### Narrative Pacing Rules

Alternate between these visitor modes:

```
Reading
  ↓
Watching
  ↓
Feeling
  ↓
Learning
  ↓
Acting
```

Never place:
- Story → Story → Story (narrative fatigue)
- Information → Information → Information (mental overload)
- Cards → Cards → Cards (visual monotony)

### Benefits Redundancy Analysis

The `Benefits` section (6 cards: precision, quality, personal approach, atmosphere, modern techniques, experienced barber) has **full content overlap** with other sections:

| Benefits card | Already covered by |
|---|---|
| Precizní řemeslo | Experience (entire section about precision) |
| Špičková kvalita | Reviews (4.8 rating implies quality) |
| Osobní přístup | WhyMenReturn (sensory) + About (founder philosophy) |
| Prémiová atmosféra | WhyMenReturn (literally describes atmosphere) |
| Moderní techniky | Not covered elsewhere — **unique point** |
| Zkušený barber | Trust (5 years) + About (founder story) |

**Recommendation:** Remove Benefits section. Its single unique point ("modern techniques") can be absorbed into Experience or Services as a sentence. The remaining cards duplicate content already expressed better in narrative form. Removing Benefits:
- Eliminates the redundant card-grid visual pattern (Trust → Benefits → Services would be 3 card/list sections)
- Solves the H→H→H density block
- Tightens the page to 11 sections without losing any information

---

## Current Order Audit

### Current Sequence

| # | Section | Category | Density | Height | Verdict |
|---|---|---|---|---|---|
| 1 | Hero | Hero | Very low | 990px (110vh) | ❌ 10px overflow; reduce to 100vh |
| 2 | WhyMenReturn | Story | Moderate | 1040px | ❌ 140px overflow; image too tall |
| 3 | Experience | Story | Moderate | 1160px | ❌ 260px overflow; 5 moments + large typography |
| 4 | Trust | Proof | High | 700px | ❌ Arrives before emotional connection — "Human Before Numbers" violation |
| 5 | Benefits | Information | High | 730px | ❌ Redundant content; overlaps with 4 other sections |
| 6 | Services | Information | High | 1300px | ❌ 400px overflow; 6 items too many for one viewport |
| 7 | Booking | Conversion | Moderate | 740px | ❌ Premature — visitor asked to book before seeing gallery, reviews, or meeting founder |
| 8 | Gallery | Gallery | Very low | 3342px | ⚠️ Intentionally multi-slide. Gaps too large (space-y-36). |
| 9 | VideoPresentation | Story | Moderate | 1118px | ❌ Placeholder Rick Astley video; no brand value |
| 10 | Reviews | Proof | High | 998px | ❌ Too late — visitor has already passed Trust + Booking before seeing proof |
| 11 | About | Story | Moderate | 1040px | ❌ Buried at position 11 — best emotional content, least seen |
| 12 | Contact | Information | High | 820px | ✅ Fits |
| 13 | FinalScene | Closure | Very low | 900px | ✅ Perfect |

### Density Flow (Current)

```
Hero (VL) → Story (M) → Story (M) → Proof (H) → Info (H) → Info (H)
→ Conv (M) → Gallery (VL) → Story (M) → Proof (H) → Story (M) → Info (H) → Closure (VL)
```

**Violations:**
1. **Sections 2–3**: Story + Story back-to-back (narrative fatigue)
2. **Sections 4–5**: Proof + Information. Benefits (cards) mimics Trust (cards)
3. **Sections 5–6**: Information + Information (mental overload)
4. **Sections 9–11**: Story → Proof → Story with no clear density distinction

### Psychology Violations

| Violation | Severity |
|---|---|
| Trust (stats) appears at position 4 — before any emotional connection | Critical |
| Booking appears at position 7 — before Gallery, Reviews, About | Critical |
| About (best content) buried at position 11 — least seen | Critical |
| Benefits duplicates content from 4 other sections | High |
| VideoPresentation is a placeholder — wastes visitor trust | High |
| Reviews separated from Trust by 6 sections — proof is scattered | Medium |

---

## Final Order: Psychology-Driven

### The Sequence

```
ACT I — INVITATION (curiosity → atmosphere → experience)

 1. Hero              Hero        100vh       Very low     "Who are you?"
 2. WhyMenReturn      Story       820px       Moderate     "What does it feel like?"
 3. Experience        Story       810px       Moderate     "What happens here?"

    ⤷ H: VL → M → M  — M→M pair accepted (sensory vs procedural modes)

ACT II — CONFIRMATION (visual → emotional → personal → rational)

 4. Gallery           Gallery    ~2400px      Very low     "Show me."
 5. Reviews           Proof       840px       High         "People loved it."
 6. About             Story       810px       Moderate     "Who's behind it?"

    ⤷ H: VL → H → M  ✅ alternates each step

 7. Trust             Proof       700px       High         "The numbers confirm."

    ⤷ H: M → H  ✅ density change

ACT III — OFFER (menu → convert → logistics → close)

 8. Services          Info        850px       High         "What can I book?"
 9. Booking           Conversion  740px       Moderate     "How do I book?"
10. Contact           Info        820px       High         "Where are you?"
11. FinalScene        Closure     900px       Very low     "Goodbye."

    ⤷ H: H → M → H → VL  ✅ alternates each step
```

### Density Flow (Final)

```
VL → M → M → VL → H → M → H → H → M → H → VL
            ↑           ↑   ↑
         Gallery    About   Services
         (breather) (breather) (practical)
```

**Notes on density pairs:**
- **Sections 2–3 (M→M):** WhyMenReturn (sensory, feeling) and Experience (procedural, action) engage different mental modes despite identical density
- **Sections 7–8 (H→H):** Trust (stats scanning, 4–6s) and Services (menu evaluating, 10–15s) are different content types with different cognitive loads
- Both pairs are separated by a density change on the other side, preventing any three-block plateau

### Emotional Journey Timelines

```
Section          Visitor asks              Feels entering → Feels leaving
──────────────────────────────────────────────────────────────────────
Hero             "Who are you?"            Curious → Intrigued
WhyMenReturn     "What's it like?"         Intrigued → Transported
Experience       "What happens?"           Transported → Imagining
Gallery          "Show me."                Imagining → Convinced visually
Reviews          "Can I trust this?"       Convinced → Reassured
About            "Who's behind it?"        Reassured → Connected
Trust            "Prove it."               Connected → Confident
Services         "What can I book?"        Confident → Desiring
Booking          "How do I book?"          Desiring → Committed
Contact          "Where are you?"          Committed → Informed
FinalScene       "Is this right?"          Informed → Inspired
```

### What Changed (Current → Final)

| Section | Current | Final | Psychology rationale |
|---|---|---|---|
| WhyMenReturn | 2 | 2 | Unchanged — correct emotional slot |
| Experience | 3 | 3 | Unchanged — correct emotional slot |
| **Trust** | **4** | **7** | **Critical: moved after About/Reviews. Stats must follow emotional connection, not precede it.** |
| Benefits | 5 | **removed** | Content fully covered by other sections (see Redundancy Analysis) |
| Services | 6 | 8 | Offer step — now after all proof and trust |
| **Booking** | **7** | **9** | **Critical: moved after Services. Visitor must know what to book before booking.** |
| **Gallery** | **8** | **4** | Visual breather after experience description; visitor wants to see |
| VideoPresentation | 9 | **removed** | Placeholder content; no brand value |
| **Reviews** | **10** | **5** | Emotional proof arrives before human connection and rational stats |
| **About** | **11** | **6** | **Critical: moved to the emotional peak position. Best content, seen at the right moment.** |
| Contact | 12 | 10 | Logistics step — after booking, before close |
| FinalScene | 13 | 11 | Unchanged — correct emotional slot |
| Hero | 1 | 1 | Unchanged |

---

## Visitor Psychology Map

### The Emotional Arc

```
High ┤  ★ (About — "This is real, this is a person")
     |   \
     |    \        ★ (Booking — "I want this")
     |     \      / \
     |      \    /   \     ★ (FinalScene — "I feel good about this")
     |       \  /     \   /
     |        \/       \ /
Low  └────────────────────────────────────────
      Hero   WMR   Exp   Gal   Rev   Ab   Tr   Srv   Bk   Ct   Final
      
      Act I ──┤ Act II ──────────┤ Act III ─────┤
         Entry    Immersion/Trust    Conversion/Close
```

**Reading the arc:**
- Entry is flat → curiosity builds
- Atmosphere and experience create gradual elevation (imagining)
- Gallery drops intensity (visual rest) but maintains engagement
- Reviews + About create the emotional peak (proof + human connection)
- Trust stats sustain confidence
- Services maintains desire
- Booking is the climax (commitment)
- Contact is practical (lower intensity)
- FinalScene is the resolution (warm, peaceful)

### What the Visitor Feels at Each Stage

```
ACT I — INVITATION (sections 1-3)
  Visitor mode: Passive observer → active imaginer
  Energy: Low → rising
  Mental state: Curious, open, absorbing

ACT II — CONFIRMATION (sections 4-7)
  Visitor mode: Skeptical evaluator → emotional participant
  Energy: Building → peak at About
  Mental state: Seeking proof, evaluating authenticity, forming trust

ACT III — OFFER & CLOSE (sections 8-11)
  Visitor mode: Informed buyer → committed visitor
  Energy: High → gently falling
  Mental state: Deciding, acting, satisfied
```

### Attention Span by Section

| Section | Reading time | Mental effort | Attention type |
|---|---|---|---|
| Hero | 3–5s | Very low | Passive intake |
| WhyMenReturn | 8–12s | Low | Sensory immersion |
| Experience | 8–12s | Moderate | Procedural tracking |
| Gallery | 5–8s per image | Very low | Visual appreciation |
| Reviews | 6–10s | Moderate | Social evaluation |
| About | 10–15s | Moderate-High | Emotional engagement |
| Trust | 4–6s | Low | Numeric scanning |
| Services | 10–15s | High | Decision-making |
| Booking | 15–20s | High | Form completion |
| Contact | 4–6s | Low | Reference scanning |
| FinalScene | 3–4s | Very low | Emotional resolution |

**Pattern:** Effort oscillates between Low and High. No two High-effort sections are adjacent. Each High-effort section is followed by a Low-effort breather.

### Sections That Still Interrupt the Flow

| Section | Issue |
|---|---|
| **None** — in the final order, every section arrives at the correct emotional moment. |

The previous flow interrupters have been resolved:

| Former interrupter | Resolution |
|---|---|
| Trust at position 4 (stats before emotion) | Moved to 7, now after Reviews and About |
| Booking at position 7 (premature ask) | Moved to 9, now after Services |
| About at position 11 (buried) | Moved to 6, now at emotional peak |
| Benefits (redundant) | Removed |
| VideoPresentation (placeholder) | Removed |

---

## Storytelling Flow

### Final Flow

```
ACT I — INVITATION

 1. Hero             "Who is Barberman Revolution?"        ← Establishing shot
    ⤷ Visitor: "Let's see what this is."

 2. WhyMenReturn     "What does this place feel like?"     ← Sensory immersion
    ⤷ Visitor: "I can imagine being there."

 3. Experience       "What actually happens here?"         ← Guided journey
    ⤷ Visitor: "I can picture myself in each moment."

ACT II — CONFIRMATION

 4. Gallery          "Show me."                            ← Visual proof
    ⤷ Visitor: "It really looks that good."

 5. Reviews          "Can I believe this?"                 ← Emotional proof
    ⤷ Visitor: "Real people love this place."

 6. About            "Who is behind all of this?"          ← Human connection
    ⤷ Visitor: "The founder is genuine. I trust him."

 7. Trust            "The numbers back it up."             ← Rational proof
    ⤷ Visitor: "5 years, 200+ clients, 4.8 stars. Confirmed."

ACT III — OFFER & CLOSE

 8. Services         "What can I book?"                    ← Menu & pricing
    ⤷ Visitor: "I want that. And that."

 9. Booking          "How do I book?"                      ← Conversion
    ⤷ Visitor: "Let me fill this out."

10. Contact          "Where are you?"                      ← Logistics
    ⤷ Visitor: "I know how to find you."

11. FinalScene       "One final impression."               ← Emotional closure
    ⤷ Visitor: "This is the right choice. I feel good."
```

### Emotional arc visualization

```
Emotion
  ↑
  │        ★ About
  │       / \
  │      /   \    ★ Booking
  │     /     \  / \
  │    /  ★ Rev  ★ Srv  ★ FinalScene
  │   /   / \   /     \
  │  / ★ Gal  /       \
  │ / ★ Exp /           \
  │★ WMR /               \
  │★ H  /                 \
  └─────────────────────────────────────→ Scroll depth
    Act I ──┤ Act II ─────────┤ Act III ────┤
```

### The Visitor's Internal Monologue

```
"Who is this?"           → Hero: "Barberman Revolution... sounds premium."
"What's it like?"       → WhyMenReturn: "Warm, quiet, intentional. I'd like that."
"What happens?"         → Experience: "I walk through 5 moments. I can feel it."
"Show me the space."    → Gallery: "Stunning. It really looks like that."
"Can I trust this?"     → Reviews: "Others loved it. 4.8 stars. People are real."
"Who's behind it?"      → About: "David started from one chair. He cares."
"Prove it."             → Trust: "5 years, 200+ clients. The numbers check out."
"What can I book?"      → Services: "Střih za 590. Výhodný balíček. I want that."
"Book it."              → Booking: "Name, phone, date, time. Done."
"Where are they?"       → Contact: "Most. Map. Hours. Easy."
"Feels right."          → FinalScene: "Tvoje křeslo čeká. Yes. I'm ready."
```

---

## Implementation Priority

| Priority | Change | Sections affected | Effort |
|---|---|---|---|
| P0 | Reorder sections in App.tsx | All 11 sections (Hero→WMR→Exp→Gal→Rev→Ab→Tr→Srv→Bk→Ct→Final) | 30min |
| P0 | Remove Benefits.tsx from App.tsx and delete file | Benefits | 10min |
| P0 | Remove VideoPresentation.tsx from App.tsx and delete file | VideoPresentation | 10min |
| P1 | `STICKY_IMAGE_HEIGHTS` → 450px | WhyMenReturn, Experience, About | 15min |
| P1 | `SECTION_PADDING_Y` → 80px (60px for Services) | All overflow sections | 15min |
| P2 | `mb-20 sm:mb-28` → `mb-10` | All sections with headings | 30min |
| P2 | `mt-20 sm:mt-24` → `mt-10` | Reviews, Services | 15min |
| P2 | `space-y-10` → `space-y-6` | Experience | 5min |
| P2 | `space-y-28 sm:space-y-36` → `space-y-16 sm:space-y-20` | Gallery | 5min |
| P3 | Hero `110vh` → `100vh` | Hero | 5min |
| P3 | Experience word sizes (`text-4xl/sm:text-5xl` → `text-2xl/sm:text-3xl`) | Experience | 15min |
| P3 | Services compact descriptions | Services | 30min |

---

## Section-by-Section Rhythm Recommendations

### Hero

**Current issues:**
- 110vh spills 10px past viewport — unnecessary
- Content only needs ~760px of the 990px allocated

**Recommendations:**
- `HERO_MIN_HEIGHT` → `min-h-screen` (100vh)
- Keep all existing content — the breathing room is intentional and correct
- CTA exit range `[0, 0.25]→[1,0]` is well-calibrated — no change

**Pacing verdict:** Good narrative role. Reduce to 100vh. No other changes.

---

### WhyMenReturn

**Current issues:**
- Sticky image at 800px forces section to 1040px (140px over target)
- Left column content only needs ~430px — the image dominates

**Recommendations:**
- Reduce `STICKY_IMAGE_HEIGHTS` → `min-h-[450px]` at lg (saves 350px)
- Reduce `SECTION_PADDING_Y` → `py-[80px]` (saves 80px)
- Heading margin `mb-6` is correct — keep

**Pacing verdict:** Good content, stretched by oversized image. Targeting ~820px.

---

### Experience

**Current issues:**
- 5 moments at large typography (4xl→5xl) with 40px gaps = 710px for text alone
- Total section reaches 1160px (260px over target)
- At 5 moments, the visitor reads 5 nearly identical blocks — fatigue by #4

**Recommendations:**
- Reduce word typography: `text-4xl/sm:text-5xl` → `text-2xl/sm:text-3xl` (saves ~100px)
- Reduce `space-y-10` → `space-y-6` (saves 60px)
- Reduce `mt-14` before moments list → `mt-8` (saves 24px)
- Reduce separator `mt-8` → `mt-4` (saves 16px)
- **Optional but recommended:** Merge moments 4–5 ("Preciznost" + "Sebevědomí") into one combined beat — or reduce to 4 strongest moments

**Pacing verdict:** 5 moments is one too many for the typography scale. Either shrink text or cut to 4. Targeting ~810px.

---

### Trust

**Current issues:**
- `mb-20 sm:mb-28` heading margin is excessive (80px→112px)

**Recommendations:**
- Reduce `mb-20 sm:mb-28` → `mb-10` (saves 40–72px)
- Section becomes ~640px — comfortable, fast to scan

**Pacing verdict:** Excellent. Quick punch of facts. No structural changes.

---

### Benefits

**Current issues:**
- 6 cards feel redundant with Trust's 4 cards (similar layout, similar purpose)
- Same `mb-20 sm:mb-28` heading margin issue
- Content overlaps with Trust: "Let praxe" (Trust) vs "Zkušený barber" (Benefits)

**Recommendations:**
- Reduce `mb-20 sm:mb-28` → `mb-10` (saves 40–72px)
- Section reduces to ~660px
- **If maintaining 6 cards:** keep as-is. This section is compact enough.
- **For stronger rhythm:** reduce to 3 strongest cards (Precizní řemeslo, Osobní přístup, Prémiová atmosféra) for a denser 1-row layout

**Pacing verdict:** Currently ~730px — fits fine but duplicates Trust's visual pattern. Consider whether 6 cards are needed or if 3–4 would suffice.

---

### Services

**Current issues:**
- 6 items × full descriptions = 720px of list alone
- `space-y-10 sm:space-y-12` = 40–48px per gap
- `mb-20 sm:mb-28` heading margin
- `mt-20 sm:mt-24` footer margin
- Total ~1300px — worst overflow on the page

**Recommendations:**
- Reduce `SECTION_PADDING_Y` → `py-[60px]` (120px total — saves 120px)
- Reduce `mb-20 sm:mb-28` → `mb-10` (saves 40–72px)
- Reduce `space-y-10 sm:space-y-12` → `space-y-6` (saves 16–24px per gap × 5 = 80–120px)
- Reduce `mt-20 sm:mt-24` → `mt-10` (saves 40–56px)
- Reduce `mt-8` on item dividers → `mt-4` (saves 16px per × 5 = 80px)
- **Total potential savings:** 360–448px → section fits at ~850px

**Pacing verdict:** Successful with tight spacing. If still over, abbreviate descriptions on desktop (show on hover) or show 4/6 items with "všechny služby" expand link.

---

### Benefits (removed)

**Status: Removed from the page rhythm.**

**Reasons:**
1. Every card's content is already expressed in narrative form by another section (see Redundancy Analysis)
2. Eliminates the redundant card-grid visual pattern (Trust → Benefits → Services would be 3 list/card sections)
3. Solves the H→H→H density block (Trust → Benefits → Services are all Information/Proof)
4. Single unique point ("modern techniques") can be absorbed into Experience or Services as one sentence

---

### Booking

**Current issues:**
- Fake form (submission resets locally, no backend)
- Left column info text is sparse — 3 short lines

**Recommendations:**
- No spacing changes needed (section fits at 740px)
- **If form becomes real:** keep current layout

**Pacing verdict:** Good. Quick, actionable. The fake form is the real issue (not pacing).

---

### Gallery

**Current issues:**
- `space-y-28 sm:space-y-36` = 112–144px between images — excessive
- Each image block needs ~610px (549px image + 60px caption + gap)
- Total ~3342px for 4 images (3.7 viewports)

**Recommendations:**
- Reduce `space-y-28 sm:space-y-36` → `space-y-16 sm:space-y-20` (saves 32–64px per gap × 3 = 96–192px)
- Target: ~3000px for 4 images (~3.3 viewports)
- Keep `aspect-[16/9] sm:aspect-[21/9]` — correct editorial ratio
- Keep scroll-zoom animation — correct for the category

**Pacing verdict:** Category allows multi-viewport. The gaps are the only issue. Tighter pacing between images makes each feel like the next chapter, not an isolated page.

---

### VideoPresentation (removed)

**Status: Removed from the page rhythm.**

**Reasons:**
1. Placeholder Rick Astley video has no brand value — actively harms credibility
2. No emotional slot in the progression — visual proof is already served by Gallery
3. Removing it eliminates one Story section, improving density alternation

**If real barbershop video content becomes available in the future**, it could be reintroduced as a modal triggered from the Gallery (click an image → watch a short clip) rather than a full section.

---

### Reviews

**Current issues:**
- Three `mt-20 sm:mt-24` gaps (80–96px each) — excessive
- Featured quote is strong but secondary reviews feel tacked on after all the whitespace
- Section totals 998px (98px over)

**Recommendations:**
- Reduce `mb-20 sm:mb-28` → `mb-10` (saves 40–72px)
- Reduce `mt-20 sm:mt-24` → `mt-10` (saves 40–56px each × 2 = 80–112px)
- Reduce `SECTION_PADDING_Y` → `py-[80px]` (saves 80px)
- Total savings: 200–264px → section fits at ~740px

**Pacing verdict:** The featured quote is the strongest element. When gaps are reduced, the secondary reviews feel like a natural continuation rather than a separate section.

---

### About

**Current issues:**
- Buried at position 11 — the strongest emotional content is the least seen
- Sticky image at 800px forces section to 1040px
- Content is excellent: blockquote + 2 paragraphs + signature

**Recommendations:**
- **Already at position 6 (after Reviews, before Trust)** — this is the emotional peak of the page
- Reduce `STICKY_IMAGE_HEIGHTS` → `min-h-[450px]` at lg (saves 350px)
- Reduce `SECTION_PADDING_Y` → `py-[80px]` (saves 80px)
- Target: ~810px

**Pacing verdict:** This is the heart of the website. The founder story builds trust and emotional connection. At position 6 (after Reviews, before Trust stats), it serves as the emotional peak of Act II.

---

### Contact

**Current issues:**
- `mb-20 sm:mb-28` heading margin
- Otherwise fits comfortably at 820px

**Recommendations:**
- Reduce `mb-20 sm:mb-28` → `mb-10` (saves 40–72px)
- Target: ~760px

**Pacing verdict:** Quick, practical, unobtrusive. No issues.

---

### FinalScene

**Current issues:** None.

**Recommendations:** None. This section is perfectly paced — 100vh, minimal content, one CTA.

**Pacing verdict:** Excellent. A model for how every section should feel.

---

## Whitespace Reduction Summary

| Source | Current | Target | Sections affected |
|---|---|---|---|
| `SECTION_PADDING_Y` | `py-[120px]` (240px) | `py-[80px]` (160px) | WhyMenReturn, Experience, Services, Reviews, About, Contact |
| `STICKY_IMAGE_HEIGHTS` | `min-h-[800px]` at lg | `min-h-[450px]` at lg | WhyMenReturn, Experience, About |
| Heading `mb-20 sm:mb-28` | 80–112px | `mb-10` (40px) | All sections with headings |
| `mt-20 sm:mt-24` gaps | 80–96px | `mt-10` (40px) | Reviews, Services |
| `space-y-10` | 40px | `space-y-6` (24px) | Experience |
| `space-y-28 sm:space-y-36` | 112–144px | `space-y-16 sm:space-y-20` | Gallery |

---

## Validation

After implementing rhythm changes, verify:

### Height compliance
1. Every section fits within its target height (±50px tolerance):
   - Hero: 100vh (900px)
   - WhyMenReturn, Experience, About: ~810px each
   - Gallery: multi-viewport, but gaps ≤ `space-y-20`
   - Reviews: ~840px
   - Trust: ~640px
   - Services: ~850px
   - Booking: ~740px
   - Contact: ~760px
   - FinalScene: 100vh (900px)

### Density alternation
2. No two adjacent sections share the same density category (exception: WhyMenReturn + Experience are both Story but different engagement modes)
3. Within any 5-section window, no more than 3 share the same density

### Emotional progression
4. About arrives before Trust stats (human connection before rational proof)
5. About arrives before Services (emotional trust before practical menu)
6. Booking is the last interactive section before logistics and Closure
7. Reviews arrives before About (emotional proof before human connection)
8. Gallery arrives after Experience (visual proof confirms the described experience)

### Content integrity
9. Gallery gaps are tight enough (`space-y-16 sm:space-y-20`) that each image feels connected to the next
10. No section exceeds its category's recommended viewport height range
