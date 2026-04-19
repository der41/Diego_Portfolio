# Diego Rodriguez Portfolio

This repository contains a personal portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The site presents Diego Rodriguez's work at the intersection of data science, economics, machine learning, causal inference, analytics, and communication through two main surfaces:

- a narrative homepage with scrollytelling and interactive visualization
- a file-based blog for essays, research explainers, and technical writing

The project is intentionally content-driven. Most of the homepage copy lives in typed data modules, while blog content is authored as Markdown and rendered at build time.

## What the Site Includes

### Homepage

The homepage at `/` is composed from the following sections:

- `HeroSection`: profile image, name, tagline, and a six-discipline color bar
- intro narrative header: "This is my Journey in Six Disciplines."
- `ScrollytellingLayout`: the main narrative section, split into:
  - About
  - Education
  - Experience
  - Projects
- `ContactSection`: email, LinkedIn, and GitHub links
- `Footer`

The homepage is not static marketing copy pasted directly into JSX. The core narrative content is stored in typed data files under `src/data/` and then rendered by the scrollytelling layout.

### Blog

The blog lives under:

- `/blog`: index page with featured posts, year grouping, and tag-based filtering
- `/blog/[slug]`: individual post pages

Posts are sourced from Markdown files in `public/posts`. The app parses frontmatter, derives the slug from the filename, computes reading time, converts Markdown to HTML, and renders the result on the blog pages.

## Key Interactive Behavior

This portfolio is not a basic static page. Several parts are driven by animation or runtime logic:

- GSAP + ScrollTrigger animate the transition from the hero discipline bars into the sticky chord visualization
- D3 renders a chord diagram that represents the relationship between six disciplines
- scrollytelling cards activate chord focus states as the user scrolls through About, Education, and Experience
- the chord visualization is pinned while the narrative column scrolls
- the Projects section uses a horizontal snap-based card scroller
- blog filters persist the active selection in `localStorage` under `blog-tag`

## Tech Stack

- Next.js `16.2.3` with the App Router
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4`
- GSAP + ScrollTrigger for motion
- D3 for the chord diagram
- `gray-matter` for Markdown frontmatter parsing
- `remark` / `rehype` plugins for Markdown, GFM, raw HTML, and KaTeX math rendering
- Vitest + Testing Library + jsdom for tests
- ESLint with `eslint-config-next`

## Notable Runtime Configuration

The repo has a few important configuration choices:

- `next.config.ts` enables the React Compiler via `reactCompiler: true`
- remote images are allowed from `https://lh3.googleusercontent.com`
- Google fonts are loaded with `next/font/google`
- Material Symbols are loaded via a stylesheet link in `src/app/layout.tsx`

## Project Structure

```text
src/
  app/
    page.tsx                # homepage route
    blog/page.tsx           # blog index
    blog/[slug]/page.tsx    # blog post route
    layout.tsx              # root layout and metadata
    globals.css             # global styling and blog prose styles
  components/
    HeroSection.tsx
    ScrollytellingLayout.tsx
    ContactSection.tsx
    Navigation.tsx
    Footer.tsx
    blog/                   # blog-specific UI components
  data/
    about.ts
    education.ts
    experience.ts
    projects.ts
    disciplines.ts
  lib/
    posts.ts                # blog ingestion and Markdown pipeline
    html.ts                 # blog description cleanup helpers
  test/
    setup.ts

public/
  images/                   # local image assets used by the homepage and blog
  jupyter/                  # notebook assets rendered into posts
  posts/                    # Markdown blog entries
```

## Routes

- `/`: main portfolio experience
- `/blog`: blog landing page
- `/blog/[slug]`: individual post pages generated from files in `public/posts`

Navigation on the homepage uses anchor links:

- `/#hero-section`
- `/#about-section`
- `/#education-section`
- `/#experience-section`
- `/#projects-section`
- `/#contact-section`

The navigation treats `/blog` and `/blog/[slug]` as the active blog route.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Available scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
npm run type-check
npm run test
npm run test:watch
npm run test:coverage
```

## How Homepage Content Is Managed

The homepage content is mostly driven by data modules:

- `src/data/about.ts`
- `src/data/education.ts`
- `src/data/experience.ts`
- `src/data/projects.ts`

These files define typed arrays that are rendered into cards inside `ScrollytellingLayout`.

### Content model by section

- `about.ts`: label, title, and narrative body for the About cards
- `education.ts`: institution, dates, coursework, bullets, and optional image
- `experience.ts`: organization, role, dates, summary, and bullet achievements
- `projects.ts`: project title, description, bullets, icon or image, and optional link

If you want to update portfolio copy, add a new experience entry, or change featured projects, start in these files before touching the layout components.

## How the Scrollytelling Layout Works

`src/components/ScrollytellingLayout.tsx` is the main interactive centerpiece of the homepage.

It does four things:

1. Renders the narrative timeline for About, Education, Experience, and Projects.
2. Builds a D3 chord diagram representing Economics, Statistics, Engineering, Computer Science, Communication, and Arts.
3. Uses GSAP ScrollTrigger to animate the hero discipline bars into the chord diagram.
4. Highlights relevant disciplines in the chord diagram as specific cards enter the viewport.

Important implementation details:

- the chord diagram is built from hardcoded card-to-discipline mappings
- scroll state is used to maintain active cards and fade unrelated ribbons/groups
- the right column is pinned while the left narrative column scrolls
- projects render as horizontally scrollable cards with snap behavior

If you change the meaning of the narrative sections or add new scrollytelling cards, you may also need to update the card-to-discipline mapping in this component so the chord diagram continues to behave coherently.

## How the Blog System Works

The blog ingestion logic lives in `src/lib/posts.ts`.

### Source of truth

Every post is a `.md` file inside `public/posts`.

The loader:

- reads filenames from `public/posts`
- parses frontmatter with `gray-matter`
- derives a slug from the filename
- normalizes tags into display tags and internal categories
- computes reading time from the Markdown body
- renders Markdown to HTML with Remark/Rehype

### Frontmatter fields that actually matter

The current parser only consumes these fields:

- `title`
- `description`
- `tags`
- `date`
- `featured`

Example:

```md
---
title: My New Post
description: Short summary used on the blog index and post page.
tags: Economy AI Analytics
date: 2026-04-18
featured: false
---

## Intro

Write the post body in Markdown.
```

### Slugs

Slugs come from the filename, not the title.

Example:

- `2026-04-18-My New Post.md` becomes `/blog/my-new-post`

The slug generator:

- removes the `.md` extension
- strips a leading `YYYY-MM-DD-` prefix
- lowercases the rest
- replaces spaces and underscores with hyphens
- removes non-alphanumeric characters other than hyphens

### Sorting and featured posts

- posts are sorted by frontmatter `date` descending
- the blog index surfaces up to three `featured: true` posts in the featured row

### Tag and category behavior

Tags display exactly as written in frontmatter.

Some tags also map into internal categories for filtering:

- `Economy`, `Economics`, `Inflation` -> `economy`
- `ML` -> `ml`
- `Analytics`, `Data`, `Global` -> `analytics`
- `AI`, `RAG`, `LLMs` -> `ai`
- `Code` -> `code`
- `Explainability` -> `explainability`

Unknown tags still render on posts, but they will not create a category filter.

### Markdown features supported

The Markdown pipeline supports:

- standard Markdown
- GitHub Flavored Markdown
- raw HTML in content
- KaTeX math rendering
- old Jekyll-style image include rewrites
- notebook embeds from `.ipynb` files inside `public/jupyter`

### Legacy frontmatter fields

Some older posts still contain fields like:

- `layout`
- `authors`
- `bibliography`
- `giscus_comments`
- `toc`

Those fields are currently ignored by the parser. Keep them only if you want them for archival context; they are not required for new posts.

## Adding or Updating Blog Posts

1. Create a new Markdown file in `public/posts/`.
2. Use a filename that starts with the date for clean ordering, for example `2026-04-18-new-essay.md`.
3. Add the required frontmatter fields.
4. Write the body in Markdown.
5. If the post uses images, place them in `public/images/` and reference them with `/images/...`.
6. Run `npm run dev` and review the post at `/blog` and `/blog/[slug]`.

## Styling Notes

Global styling lives in `src/app/globals.css`.

This file covers:

- page-level look and spacing
- typography tokens
- blog prose styling
- notebook output styling
- KaTeX-compatible presentation

If you need to change how blog content renders, start in the `.prose-blog` styles in `globals.css`.

## Testing

The project includes component and library tests for:

- navigation links
- blog hero
- blog post list item behavior
- theme filter behavior
- contact section rendering
- post parsing and blog utility functions

Run:

```bash
npm run test
```

For coverage:

```bash
npm run test:coverage
```

## Maintenance Checklist

Common update paths:

- change portfolio narrative: edit `src/data/about.ts`
- update education: edit `src/data/education.ts`
- update experience: edit `src/data/experience.ts`
- update projects: edit `src/data/projects.ts`
- adjust navigation or layout sections: edit `src/components/Navigation.tsx` and `src/components/ScrollytellingLayout.tsx`
- add blog posts: create files in `public/posts`
- update blog rendering logic: edit `src/lib/posts.ts`
- update local imagery: add or replace files in `public/images`

Before shipping changes, the basic checks are:

```bash
npm run lint
npm run type-check
npm run test
```

## Deployment

This is a standard Next.js application and can be deployed on Vercel or any environment that supports Next.js production builds.

Typical production flow:

```bash
npm run build
npm run start
```

## Current Focus of the Repository

This repo is doing more than hosting a landing page. It acts as:

- a professional portfolio for interdisciplinary data science and economics work
- a narrative homepage with a custom interaction model
- a lightweight publishing system for essays and research writing
- a maintainable content base where structured portfolio data and unstructured blog content live side by side

That split is the core design decision of the project: homepage storytelling is structured and component-driven, while the blog is flexible and file-based.
