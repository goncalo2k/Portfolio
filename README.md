# Portfolio (React + Three.js)

A personal storytelling site that opens with a cinematic camera animation built in three.js, then transitions into a set of curated sections (experience, education, projects, extracurriculars, contacts). Everything is driven by typed data sources so you only edit one place to update content.

## Tech Stack

- React 19 with TypeScript and Vite 7 for the app shell
- Three.js + @react-three/fiber/drei for the landing animation
- SCSS modules plus a small design system (`@goncalo2k/g2k-styles`)
- Cloudflare Workers via Wrangler for deployment

## Highlights

- Cinematic intro featuring a 3D camera that drops in, snaps a photo, rotates, and zooms toward the viewer before revealing the main content
- Sticky header with quick navigation between resume-style sections
- Rich cards for projects, experience, and education populated from `/src/data/*`
- Contact grid that surfaces social links, email, and other touchpoints
- Fully responsive layout tuned for desktop and mobile breakpoints

## Getting Started

```bash
pnpm install       # install dependencies
pnpm run dev       # start Vite dev server on http://localhost:5173
```

The project uses pnpm by default. If you prefer npm or yarn, delete the existing lockfile and regenerate it, but pnpm is recommended to stay consistent with the deployment tooling.

## Scripts

- `pnpm run dev` local development
- `pnpm run build` type-check plus production build
- `pnpm run preview` build then preview static output
- `pnpm run lint` lint the repo via eslint
- `pnpm run deploy` production build followed by `wrangler deploy`
- `pnpm run cf-typegen` regenerate worker type definitions

## Project Layout

```
src/
  components/       reusable UI atoms (cards, chips, buttons)
  pages/            top-level route sections, including landing animation
  data/             typed data sources for resume sections
  assets/           static media (pfp, textures)
worker/             Cloudflare Worker entry point for deployment
public/             static assets served as-is
```

Update the data files under `src/data/` to refresh resume content. The landing animation lives in `src/pages/landing/landing.tsx`; you can drop in another GLB/GLTF model or adjust keyframes there.

## Deployment Notes

1. Run `pnpm run build` and ensure the bundle succeeds.
2. Configure Wrangler (`wrangler.jsonc`) with your Cloudflare account ID.
3. Execute `pnpm run deploy` to push the worker and assets.

## Credits

In this project, several assets were used. Here are the credits of such assets!

1. Standing Desk by dook [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/uxIo5ge0pw)

2. Camera by Dario Demi (D911C) [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/f5xOh6J0EuB)

3. Window by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/98ZJrd80Q1V)

4. Window Blinds by Alex Safayan [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/0cXeRYAnxCi)

5. Shelf by Jonathan Granskog [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/3aAw-c_7gkO)

5. Scented candles by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/3t55kWZHM87)
