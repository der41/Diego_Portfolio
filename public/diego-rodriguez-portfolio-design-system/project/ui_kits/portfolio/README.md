# Portfolio UI Kit

A high-fidelity recreation of Diego Rodriguez's personal portfolio website.

## What's here

- `index.html` — Full single-page portfolio prototype. Scrollable, with working navigation, section anchors, and interactive hover states. The D3 chord diagram is rendered as a static SVG representation (no GSAP scroll animation).

## Design Notes

- Fonts: Noto Serif (display) + Inter (body) via Google Fonts CDN
- Icons: Material Symbols Outlined via Google Fonts CDN  
- Social icons: Inline SVGs matching the production source
- Images: Placeholders (source repo's `/public/images/` binary assets not available via API)
- Colors: Exact hex values from `globals.css` source
- All copy: Exact text from `src/data/*.ts` source files

## Sections
1. Navigation (fixed, scroll-spy active state)
2. Hero (profile photo placeholder, discipline bar, intro copy)
3. About (3 cards with bold parsing)
4. Education (3 cards: Duke, MIT, U.Chile)
5. Experience (3 cards: Yodlee, Central Bank, OECD)
6. Projects (4 cards, horizontal scroll)
7. Contact (email, LinkedIn, GitHub)
8. Footer
