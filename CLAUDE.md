# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the dist/ build locally
```

No linter or test runner is configured.

## Architecture

Single-page Vue 3 resume website using Vite. No router — all sections live in `src/App.vue` as a linear vertical scroll.

### Key layers

| Layer | Location | Role |
|-------|----------|------|
| Design tokens | `src/styles/global.css` | Single source of all CSS variables — colors, type scale, radius, spacing |
| i18n | `src/composables/useI18n.js` | Module-level singleton `ref`; holds ZH/EN translations and exposes `t(key)`, `toggleLanguage()`, `initLanguage()` |
| Content data | `src/data/*.js` | Pure JS objects — projects, skills, journey milestones, contact info. Components import these directly. |
| Sections | `src/components/sections/` | One component per resume section (About, Skills, Journey, Projects, Contact, ProjectShowcase) |
| Directives | `src/directives/scrollFadeIn.js` | `v-scroll-fade-in` — GSAP ScrollTrigger directive applied per section in App.vue |

### Data flow pattern

Components consume content from two places:
1. `src/data/<topic>.js` for static content (projects list, skill categories, etc.)
2. `t('key.path')` from `useI18n.js` for all user-visible strings (labels, titles, copy)

When adding or editing content, update the data file **and** both `zh`/`en` blocks in `useI18n.js`.

### Design system

The design follows an Apple-inspired dark palette defined entirely in `src/styles/global.css`. Key tokens:
- Backgrounds: `--color-pitch-black` (#000), `--color-space-gray` (#1d1d1f), `--color-deep-graphite` (#161617)
- Text on dark: `--text-on-dark-strong` / `--text-on-dark` / `--text-on-dark-muted` / `--text-on-dark-subtle`
- Accent: `--color-highlight-blue` (#0066cc), `--color-vivid-blue` (#2997ff)
- Radii: `--radius-cards` 28px, `--radius-buttons` 999px, `--radius-standard` 10px

Never hardcode hex colors in components — use the CSS variables.

### Scroll animations

`v-scroll-fade-in` wraps GSAP's ScrollTrigger. Each `<section>` in App.vue passes `{ distance, start, end, scrub }` — distance decreases as sections go lower, creating a staggered parallax feel. Do not change these values without testing the full scroll on mobile.

### Dependencies

- **GSAP** — scroll animations only (no other animation library)
- **@arco-design/web-vue** — registered globally, used for select/form UI elements
- **@vueuse/core** — utility composables
- **lucide-vue-next** — icons

## Deployment

`dist/` is the production output. The `public/` directory contains `robots.txt`, `sitemap.xml`, and Google Search Console verification files.
