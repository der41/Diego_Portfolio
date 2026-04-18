# Portfolio — Diego Rodriguez

An interactive, scrollytelling personal portfolio built with Next.js, TypeScript, Tailwind CSS v4, D3, and GSAP. The page uses a pinned D3 chord diagram tied to a scroll-driven timeline: as each About / Education / Experience card enters the viewport, the relevant disciplines in the chord diagram highlight, connecting the narrative to the visualization.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Visualization:** D3 (chord diagram) + GSAP / ScrollTrigger (scroll animation)
- **Tooling:** ESLint, Vitest + Testing Library, jsdom

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run the built app |
| `npm run lint` | ESLint over `src/` |
| `npm run type-check` | `tsc --noEmit` |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Coverage report |

## Repo structure

```
portfolio-app/
├── public/
│   ├── images/                  # Portrait + institution logos (Duke, MIT, …)
│   └── *.svg                    # Default Next.js iconography
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, Material Symbols
│   │   ├── page.tsx             # Page composition
│   │   └── globals.css          # Tailwind + global styles
│   ├── components/
│   │   ├── HeroSection.tsx      # Landing hero
│   │   ├── Navigation.tsx       # Top nav with section anchors
│   │   ├── ScrollytellingLayout.tsx  # Main timeline + chord diagram
│   │   ├── ContactSection.tsx   # Contact block
│   │   ├── Footer.tsx
│   │   ├── ui/                  # Shared presentational primitives
│   │   └── __tests__/           # Component unit tests
│   ├── data/
│   │   ├── about.ts             # About-section cards
│   │   ├── education.ts         # Education timeline entries
│   │   ├── experience.ts        # Work-experience timeline entries
│   │   ├── projects.ts          # Featured projects
│   │   └── disciplines.ts       # Discipline metadata used by the chord diagram
│   └── test/
│       └── setup.ts             # Vitest + Testing Library setup
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## How it works

- **`src/data/*.ts`** is the single source of truth for portfolio content. Editing these files updates the rendered timeline and chord diagram.
- **`ScrollytellingLayout.tsx`** renders the three-column timeline, builds the D3 chord diagram from a `cardChordMap` + recency-weighted matrix, and wires per-card `ScrollTrigger`s that fade non-active arcs/ribbons as you scroll.
- **`renderBold`** parses `**…**` inside data strings, so the card copy supports inline emphasis without extra markup.
