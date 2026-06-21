# rv-portfolio · Claude Code Handoff

## Project overview

Personal portfolio site for Ruben Verdin. Frontend is **Nuxt 3 (SSG)** deployed to **Cloudflare Pages** via GitHub Actions. Content is managed in **WordPress** running as a headless CMS at `cms.rubenverdin.com`. Nuxt fetches all content from the WP REST API at build time — no runtime server, pure static output.

## Current task

Wire the existing projects section to pull data from WordPress instead of hardcoded content. Then add a dynamic route for individual project pages.

---

## Architecture

```
cms.rubenverdin.com        ← WordPress on Namecheap cPanel (headless, admin only)
        ↓ REST API at build time
Nuxt SSG (nuxt generate)   ← composables fetch WP data, pages are pre-rendered
        ↓ GitHub Actions
Cloudflare Pages           ← rubenverdin.com (static HTML + CDN)
```

---

## WordPress REST API

**Base URL:** `https://cms.rubenverdin.com`

**Projects endpoint:**
```
GET /wp-json/wp/v2/project?_embed
```

**Key fields from the response:**

| Field | Description |
|---|---|
| `id` | WP post ID |
| `slug` | URL-safe identifier e.g. `my-first-project` |
| `title.rendered` | Project name (HTML string) |
| `content.rendered` | Full project description (HTML string) |
| `acf.summary` | Short teaser for cards (plain text) |
| `acf.client_name` | Client name |
| `acf.year` | Year as string e.g. `"2024"` |
| `acf.tech_stack` | Comma-separated string e.g. `"Vue 3, Nuxt, Tailwind"` |
| `acf.project_url` | Live site URL |
| `_embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url` | Cover image URL |
| `_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url` | Thumbnail URL |

**Single project:**
```
GET /wp-json/wp/v2/project?slug=my-project-slug&_embed
```

**CORS:** The WP plugin allows requests from `https://rubenverdin.com`, `https://staging.rubenverdin.com`, and `http://localhost:3000`.

---

## Environment variables

Add to `.env` (local) and Cloudflare Pages dashboard (production):

```env
NUXT_PUBLIC_WP_BASE_URL=https://cms.rubenverdin.com
```

In `nuxt.config.ts` expose it:
```ts
runtimeConfig: {
  public: {
    wpBaseUrl: process.env.NUXT_PUBLIC_WP_BASE_URL
  }
}
```

---

## Tasks to implement

### 1. TypeScript interface

Create `types/project.ts`:

```ts
export interface WPImage {
  source_url: string
  width: number
  height: number
}

export interface Project {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  acf: {
    summary: string
    client_name: string
    year: string
    tech_stack: string       // comma-separated, split into array for display
    project_url: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      media_details: {
        sizes: {
          large?: WPImage
          medium?: WPImage
          full?: WPImage
        }
      }
      source_url: string
    }>
  }
}
```

### 2. Composable

Create `composables/useProjects.ts`:

```ts
import type { Project } from '~/types/project'

export const useProjects = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.wpBaseUrl

  return useFetch<Project[]>(
    `${baseUrl}/wp-json/wp/v2/project?_embed&per_page=100&orderby=date&order=desc`,
    {
      key: 'projects',
      transform: (data: Project[]) => data // add any transforms here if needed
    }
  )
}

export const useProject = (slug: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.wpBaseUrl

  return useFetch<Project[]>(
    `${baseUrl}/wp-json/wp/v2/project?slug=${slug}&_embed`,
    { key: `project-${slug}` }
  )
}
```

### 3. Helper utilities

Create `utils/project.ts`:

```ts
import type { Project } from '~/types/project'

// Get cover image URL, fallback to empty string
export const getProjectImage = (project: Project, size: 'medium' | 'large' | 'full' = 'large'): string => {
  return project._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[size]?.source_url
    ?? project._embedded?.['wp:featuredmedia']?.[0]?.source_url
    ?? ''
}

// Split tech stack string into array
export const getTechStack = (project: Project): string[] => {
  return project.acf.tech_stack
    ? project.acf.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    : []
}

// Strip HTML from rendered content
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim()
}
```

### 4. Wire up projects section

Find the existing projects section component (likely in `components/` or `sections/`). Replace hardcoded project data with:

```vue
<script setup>
const { data: projects, pending, error } = await useProjects()
</script>
```

Map each project to your existing card component using the fields above. The `acf.summary` field maps to whatever short description your card currently shows.

### 5. Dynamic project route (optional — do after cards work)

Create `pages/projects/[slug].vue`:

```vue
<script setup>
const route = useRoute()
const { data } = await useProject(route.params.slug as string)
const project = computed(() => data.value?.[0])
</script>
```

For SSG pre-rendering to work, also add to `nuxt.config.ts`:
```ts
nitro: {
  prerender: {
    crawlLinks: true
  }
}
```

This tells Nuxt to crawl all links and pre-render every project page at build time.

---

## Repo structure (expected)

```
rv-portfolio/
├── composables/
│   └── useProjects.ts       ← create this
├── types/
│   └── project.ts           ← create this
├── utils/
│   └── project.ts           ← create this
├── pages/
│   └── projects/
│       └── [slug].vue       ← create this (optional, phase 2)
├── components/ or sections/
│   └── ProjectsSection.vue  ← edit this to use composable
├── .env                     ← add NUXT_PUBLIC_WP_BASE_URL
└── nuxt.config.ts           ← add runtimeConfig + crawlLinks
```

---

## Notes

- This is **SSG** (`nuxt generate`), not SSR. All WP fetches happen at build time — not on the user's browser.
- The site rebuilds on every `git push` via GitHub Actions. To rebuild when WP content changes, a Cloudflare deploy hook webhook can be added to WordPress later.
- `acf.tech_stack` comes as a comma-separated string — split it before rendering badges.
- `content.rendered` contains raw HTML from the WP block editor — use `v-html` to render it, or strip tags with `stripHtml()` for plain text contexts.
- Don't use `<form>` tags in Vue components — use event handlers.
- Keep components typed with TypeScript throughout.
