# rv-portfolio

Personal portfolio site for [Ruben Verdin](https://rubenverdin.com) — Frontend Engineer.

## Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) (SSG) |
| UI | [rv-design](https://github.com/RubenVerdin/rv-design) — personal component library |
| Styles | SCSS |
| CMS | WordPress (headless) at `cms.rubenverdin.com` |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions → Cloudflare Pages |

## Architecture

Content is managed in WordPress and fetched from the WP REST API at **build time** via `nuxt generate`. The output is a fully static site — no server, no runtime API calls.

```
cms.rubenverdin.com  (WordPress, headless)
        ↓ REST API at build time
Nuxt SSG (nuxt generate)
        ↓ git push → GitHub Actions
Cloudflare Pages  →  rubenverdin.com
```

## Local development

```bash
# Install dependencies
npm install

# Copy env and fill in values
cp .env.example .env

# Start dev server (port 3000)
npm run dev
```

> Port 3000 is required — the WordPress CMS only allows CORS from `http://localhost:3000`.

## Environment variables

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_WP_BASE_URL` | Base URL of the WordPress CMS (e.g. `https://cms.rubenverdin.com`) |

Set these in `.env` locally and in **Cloudflare Pages → Settings → Environment Variables** for production.

## Project structure

```
components/          Vue section components
composables/         useProjects(), useProject(slug) — WP data fetching
types/               TypeScript interfaces (Project, WPImage)
utils/               project.ts — image/tech-stack/HTML helpers
pages/               index.vue — single-page layout
assets/styles/       portfolio.scss — all global styles
```

## Deployment

Every push to `main` triggers a build on Cloudflare Pages (`npx nuxt generate`). The build output directory is `dist`.

To rebuild when WordPress content changes, configure a [Cloudflare Deploy Hook](https://developers.cloudflare.com/pages/configuration/deploy-hooks/) and add it as a webhook in WordPress.
