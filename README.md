# Black Pine Lab Landing Page

Immersive React + Vite landing page for Black Pine Lab, featuring:

- **Framer Motion** section animations
- **React Three Fiber** particle/grid canvas background
- **GSAP + ScrollTrigger + Lenis** scroll-linked visual timeline
- **Tailwind CSS** styling with custom typography

## Tech stack

- React 19
- Vite 8
- @react-three/fiber + three
- framer-motion
- gsap + ScrollTrigger
- lenis
- tailwindcss

## Local development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Quality checks

Run ESLint:

```bash
npm run lint
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Project notes

### Canvas + scroll timeline

- `src/canvas/*` contains particle/grid rendering and shader code.
- `src/scroll/useScrollTimeline.js` maps scroll progress to shader uniforms and audio triggers.

### Market data prototype pattern

`src/hooks/useMarketFeed.js` currently uses a randomized timer-based mock feed for UI prototyping.

- A production WebSocket mode is scaffolded in comments.
- The hook is intentionally structured so mock transport can be replaced by a real `wss://` source without changing section-level rendering logic.

## Scripts reference

- `npm run dev` — start local dev server
- `npm run lint` — run ESLint across the project
- `npm run build` — build optimized production bundle
- `npm run preview` — preview built `dist/` output
