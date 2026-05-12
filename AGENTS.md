# Agent Notes

## Commands
- Use `npm` for this repo: `package-lock.json` is committed and GitHub Pages CI runs `npm ci`, even though `package.json` has a `packageManager` field for pnpm.
- Local dev: `npm run dev` starts Astro at `http://localhost:4321`.
- Production verification: `npm run build`. There are no configured lint, typecheck, or test scripts.
- `npm run preview` runs `astro build && astro preview`, so it rebuilds before serving.

## App Structure
- Static Astro 5 site with React islands, Tailwind, GSAP, and Three.js. `astro.config.mjs` sets `site: "https://baudelino.com"` and enables only React + Tailwind integrations.
- Main entrypoints are `src/pages/index.astro`, `src/pages/projects.astro`, `src/pages/blog.astro`, and Markdown posts under `src/pages/blog/`.
- Project cards are React islands: `src/pages/projects.astro` renders `ProjectCard` with `client:load`; project content lives in `src/data/project.ts` and is typed by `src/types/project.ts`.
- The home hero loads `src/components/Scene3D.tsx` with `client:load`; changes there affect the large Three.js client bundle.

## Content Gotchas
- Blog listing data in `src/pages/blog.astro` is hard-coded separately from Markdown frontmatter. When adding or renaming a post, update both the Markdown file under `src/pages/blog/` and the `blogPosts` array so the index links stay correct.
- The Spanish site shell is in `src/layouts/Layout.astro`; keep page copy and metadata in Spanish unless intentionally changing the site language.
- Public assets referenced by routes/components include `public/CV.pdf`, `public/magnific-artwork.jpg`, and `public/favicon.svg`.

## Contact Form
- The contact form in `src/components/ContactSection.astro` posts to `https://form.baudelino.com/send_email.php`, not to an Astro endpoint.
- A PHP handler is stored at `public/send_email.php` with CORS restricted to `https://baudelino.com`; changing the frontend endpoint or domain likely requires updating/deploying that PHP separately.

## Deployment
- GitHub Pages workflow is `.github/workflows/astro.yml`; it only triggers on pushes to `master` and manual dispatch.
- CI builds with `npx --no-install astro build --site "${{ steps.pages.outputs.origin }}" --base "${{ steps.pages.outputs.base_path }}"`, so local `astro.config.mjs` site may be overridden in Pages builds.
