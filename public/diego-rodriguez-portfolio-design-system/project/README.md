# Diego Rodriguez — Portfolio Design System

A design system built from the source code of Diego Rodriguez's personal portfolio website. The portfolio is a Next.js/TypeScript app with a signature scrollytelling layout: a vertical timeline on the left and a sticky D3 chord diagram on the right, connecting six academic and professional disciplines.

**Source Repository:** `der41/Diego_Portfolio` (branch: `codex/portfolio-refresh`)
GitHub URL: https://github.com/der41/Diego_Portfolio/tree/codex/portfolio-refresh

---

## Product Context

Diego is a Data Scientist and Economist with a background spanning six disciplines. The portfolio's central thesis is *"Data Science is Interdisciplinary"* — the entire UI is designed to communicate this through visual metaphor (chord diagrams, network graph clusters, discipline color bars). 

**The one product:** A single-page personal portfolio website. Sections: Hero → About → Education → Experience → Projects → Contact.

---

## Content Fundamentals

**Voice & Tone**
- First-person, confident, direct: *"I've spent six years building…"*, *"I work where data meets decisions."*
- Quantified, evidence-based: every claim pairs with a metric — "85% cost reduction", "1M+ daily transactions", "100M+ student records."
- Intellectually ambitious but not pompous. Technical language used precisely, not to impress.
- Interdisciplinary framing — never just "data scientist," always connecting across fields.

**Casing Conventions**
- Section labels: `ALL CAPS`, wide letter-spacing (e.g. `BACKGROUND`, `WHAT I DO`)
- Section headings: Title Case, Noto Serif, bold
- Tag chips: ALL CAPS (e.g. `AI, NLP, CS`)
- Body copy: sentence case
- Nav links: Title Case (Me, About, Education…)

**Emphasis Pattern**
Inline `**bold**` markers are parsed and rendered as `<strong>` in body copy, used to call out key numbers and turning-point phrases. Not decorative — functional.

**No Emoji.** No emoji are used anywhere in the UI.

**Copy Personality Checklist**
- ✓ Specific numbers over vague claims
- ✓ Active verbs: built, deployed, designed, ran, forecasted
- ✓ Impact framing: "…so the things I build stay useful long after launch"
- ✗ Buzzword soup without backing
- ✗ Passive voice
- ✗ Generic adjectives ("passionate," "dynamic")

---

## Visual Foundations

### Color System
Material You token palette. Three role groups plus discipline colors.

| Role | Hex | Usage |
|---|---|---|
| Primary | `#003c73` | Navy blue — main CTAs, active nav, About section |
| Secondary | `#006971` | Dark teal — Education section, CS discipline |
| Tertiary | `#6f2100` | Rust — Statistics & Experience section |
| Background | `#faf8ff` | Warm off-white with faint blue cast — entire page bg |
| On-Surface | `#191b21` | Near-black — all primary text |
| On-Surface-Variant | `#424751` | Medium slate — secondary text, bullets |
| Outline | `#727782` | Muted slate — decorative borders |
| Outline-Variant | `#c2c6d3` | Light border — card borders, dividers |

**Card tinting:** Each section's cards use a 30%-opacity wash of that section's discipline color:
- About cards: `#d5e3ff` / 30% (blue wash)
- Education cards: `#98f1fa` / 30% (teal wash)
- Experience cards: `#ffdbcf` / 30% (rust wash)
- Project cards: `#98f1fa` / 20% (teal, lighter)

### Typography
- **Display / Headlines:** Noto Serif (Google Fonts) — bold (700), tracking-tight (-0.03em), italic used selectively for accent phrases in headings
- **Body / Labels / Nav:** Inter (Google Fonts) — light (300) to bold (700) depending on context
- **Icon font:** Material Symbols Outlined (Google Fonts variable icon font)

**Key typographic patterns:**
- Hero name: Noto Serif, 5xl–7xl, bold, tracking-tight
- Hero h2: Noto Serif, 6xl–8xl, bold, tracking-tighter, with italic primary-colored accent
- Section headings: Noto Serif, 5xl, bold
- Card titles: Noto Serif, xl, regular weight (contrast with bold headings)
- Labels: Inter, 10px, bold, ALL CAPS, letter-spacing 0.4em
- Body: Inter, sm (0.875rem), relaxed line-height (1.6)
- Hero tagline: Inter, sm, letter-spacing 0.4em, uppercase, 80% opacity

### Spacing & Layout
- Max content width: `1920px` with `px-12` (48px) horizontal padding
- Primary grid: 12-column, 7/5 split (timeline left, chord diagram right)
- Consistent vertical rhythm: sections separated by `mb-48` (12rem)
- Timeline: vertical line at `left: 2.5rem`, branch lines extending right to cards, `ml-20` card indent

### Backgrounds & Surfaces
- **No gradients** for backgrounds — flat `#faf8ff` throughout
- **No images** used as page backgrounds
- **Network graph clusters**: abstract SVG node-and-edge decorations appear between timeline sections as ambient illustration; nodes use discipline colors at 13% fill opacity, 28% stroke opacity — purely decorative
- White/50 (semi-transparent white) used for contact section: `bg-white/50`

### Borders
- Cards: `border border-[discipline-color]/10` — very subtle, 10% opacity
- Nav: hairline shadow only (`0px 20px 40px rgba(25,27,33,0.04)`), no visible border
- Icon circles (contact): `border border-[#c2c6d3]/30`
- **Corner radii are very conservative**: cards use `rounded-xl` (0.5rem / 8px); profile photo uses `rounded-[50%]`; buttons use `rounded-lg` (0.25–0.5rem)

### Animation & Motion
- **Library:** GSAP + ScrollTrigger for all scroll animations; D3 `.transition()` for chord diagram
- **Hero entrance:** Discipline color bars animate inward toward the chord diagram position, then dissolve as chord diagram scales in (`back.out(1.7)` easing)
- **Chord diagram transitions:** 450ms ease; ribbon opacity changes driven by scroll position
- **Nav links:** `transition-colors duration-300 ease-in-out`
- **Card hover:** `transition-shadow` — shadow-sm → shadow-md
- **Easing vocabulary:** `power2.out`, `power2.inOut`, `back.out(1.7)` (spring-like)
- No bounce or playful animations; motion is purposeful and editorial

### Hover & Press States
- Nav links: color transitions from `#191b21/60` → `#003c73`, opacity 80%
- Active nav link: `border-b-2 border-[#003c73]` underline treatment
- Primary CTA button: `#003c73` → `#00539c` on hover
- Cards: shadow-sm → shadow-md on hover
- Contact icon circles: border and bg-tint on hover (`border-[#003c73]/30`, `bg-[#d5e3ff]/20`)
- Chord ribbons: opacity 1 on hover (individual ribbon highlight), 0.1 for others

### Imagery
- Portrait photo: circular crop, `object-[50%_10%]` — positioned to show face
- Project thumbnails: 16:9 ratio, `object-cover`, `rounded-lg` (8px)
- Education images: full-width within card, `rounded-lg`, `object-cover`
- **Color vibe of imagery:** Not specified by code; no filter applied
- **No illustration assets** beyond the procedural SVG network clusters

### Iconography
See [ICONOGRAPHY section below]

---

## Iconography

**System used:** Google Fonts Material Symbols Outlined (variable icon font)

Loaded via `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block">`

Usage: `<span class="material-symbols-outlined">icon_name</span>` with default variation settings `FILL=0, wght=400, GRAD=0, opsz=24`.

**Icons used in the portfolio:**
| Icon name | Context |
|---|---|
| `person` | About section node dot |
| `school` | Education section node dot |
| `work` | Experience section node dot |
| `grid_view` | Projects section node dot |
| `menu` | Mobile hamburger |
| `close` | Mobile menu close |

Section icons appear inside 80×80px navy/teal/rust circular badges on the timeline, with a 12px ring in page bg color (`ring-[12px] ring-[#faf8ff]`).

**No SVG icon sprites or PNG icons.** The only non-Material SVG icons are the social contact icons (Gmail, LinkedIn, GitHub) inlined directly in ContactSection.tsx.

**No emoji** are used anywhere.

---

## Files

```
/
├── README.md                  ← This file
├── SKILL.md                   ← Agent skill manifest
├── colors_and_type.css        ← All CSS variables: colors, type, spacing, animation, shadows
├── assets/                    ← Logo and visual assets (placeholder — images not in repo text files)
├── preview/
│   ├── colors-primary.html    ← Primary navy blue swatch scale
│   ├── colors-secondary.html  ← Secondary teal + tertiary rust swatches
│   ├── colors-surface.html    ← Surface scale
│   ├── colors-disciplines.html ← Six discipline color swatches
│   ├── type-display.html      ← Display type specimens
│   ├── type-body.html         ← Body / label / tagline specimens
│   ├── type-nav.html          ← Navigation bar specimen
│   ├── spacing-tokens.html    ← Spacing scale + border radii
│   ├── spacing-shadows.html   ← Shadow system
│   ├── components-buttons.html ← Button states + chip variants
│   ├── components-cards.html  ← Card variants by section
│   ├── components-timeline.html ← Timeline system
│   └── components-contact.html ← Contact links + discipline bar
└── ui_kits/
    └── portfolio/
        ├── README.md
        └── index.html         ← Full portfolio UI kit (interactive click-thru)
```

---

## Caveats

- **Images not available:** The repo's `/public/images/` directory (Profile.jpg, project screenshots, education logos) contains binary assets not importable from GitHub as text. The UI kit uses placeholder elements where images appear.
- **Fonts are Google Fonts substitutes:** Inter and Noto Serif are loaded from Google Fonts CDN — these match the production app exactly.
- **GSAP/D3 animations:** The full scrollytelling animation (chord diagram, GSAP ScrollTrigger) is not replicated in static HTML previews. The UI kit shows the static layout only.
