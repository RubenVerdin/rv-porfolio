# rv-portfolio v2 — Implementation plan

**Goal:** Build the new "age-of-exploration" editorial portfolio from `design-handoff/` on top of
the Nuxt 3 + Nuxt Content boilerplate from `rv-porfolio_v1`. No `rv-design` dependency.

**Standards (apply to every phase):**

| Standard | What it means here |
| --- | --- |
| Atomic design | `components/{atoms,molecules,organisms,templates}`; pages compose organisms only. |
| BEM | One block per component, block name = kebab-case component name. `block__element`, `block--modifier`. No design-tool class names (`.pc`, `.ed-btn`, `.tbtn`) survive. |
| Tokens | Every colour, font, size, space, radius, shadow, duration and easing comes from a `--rv-*` custom property. Raw values are only allowed for SVG geometry and the territory-button `%` positions. |
| TypeScript | Strict. `<script setup lang="ts">`, typed props/emits, typed content schemas, no `any`. |
| Composables | Anything stateful, timed, DOM-touching or data-shaping lives in `composables/use*.ts`. Vue components stay markup + props + a composable call. |

---

## 0. Before starting: fix the handoff bundle

The files in `design-handoff/` are **misnamed**: every file holds a different file's content.
Rename them first so the README's references make sense.

| File on disk | Actually contains | Rename to |
| --- | --- | --- |
| `site.ts` | the handoff README | `README.md` |
| `tokens.css` | the full stylesheet (577 lines) | `site.css` |
| `useEdition.ts` | design-canvas index | `canvas.json` |
| `LeadDispatch.dc.html` | Homepage, desktop | `Main.dc.html` |
| `Contact.dc.html` | Homepage, tablet | `Tablet.dc.html` |
| `README (2).md` | Homepage, mobile | `Mobile.dc.html` |
| `PageHead.dc.html` | Work listing | `WorkList.dc.html` |
| `Envelope.dc.html` | Work detail | `WorkDetail.dc.html` |
| `site.css` | Writing listing | `WritingList.dc.html` |
| `Footer.dc.html` | Writing detail | `WritingDetail.dc.html` |
| `BackPage.dc.html` | Contact page | `Contact.dc.html` |
| `Postcard.dc.html` | Site header | `Header.dc.html` |
| `Mobile.dc.html` | Page heading | `PageHead.dc.html` |
| `canvas.json` | Site footer | `Footer.dc.html` |
| `Tablet.dc.html` | Atlas plate | `Plate.dc.html` |
| `WorkList.dc.html` | Dispatch postcard | `Postcard.dc.html` |
| `WorkDetail.dc.html` | Lead dispatch | `LeadDispatch.dc.html` |
| `Header.dc.html` | Cross-link banner | `CrossBanner.dc.html` |
| `WritingList.dc.html` | Sealed envelope | `Envelope.dc.html` |
| `WritingDetail.dc.html` | Back page and footer | `BackPage.dc.html` |

The mapping above is **confirmed** against the Claude Design canvas (§9).

**Missing from the bundle** (the README lists them; the canvas doesn't have them either): `nuxt-starter/types/content.ts`,
`content/projects.ts`, `content/dispatches.ts`, `content/site.ts`, `composables/useEdition.ts`,
`assets/css/tokens.css`, and `support.js` (so the `.dc.html` files can't be previewed locally).
Nothing is blocked by this: the copy and data are all in the `.dc.html` script blocks and markup,
and the tokens are at the top of `site.css`. Re-export the bundle only if it's quick.

Then run `git init` in `rv-porfolio/`, since it isn't a repo yet.

**Visual reference:** `design-handoff/reference/*.png` holds screenshots of the homepage at
desktop, tablet and mobile widths (chart with a territory selected, the atlas, correspondence and
the back page). Use these for parity checks until the design tool's boards can be opened.

---

## 1. Boilerplate: what to copy from v1, what to drop

### Copy as-is (or nearly)

| From `rv-porfolio_v1` | Notes |
| --- | --- |
| `srcDir: 'src/'` layout | Same split: configs, `content/`, `docs/` at the root; app code under `src/`. |
| `nitro.publicAssets` + `prerender.crawlLinks` | Keep the comment explaining the `srcDir` public-assets workaround. |
| `modules: ['@nuxt/eslint', '@nuxt/content']` | |
| `eslint.config.mjs` | Same Vue formatting rules. |
| `tsconfig.json`, `.gitignore`, `.env.example` | |
| `content.config.ts` pattern | One `type: 'page'` collection per content type, Zod schemas (new fields in §3). |
| Query pattern | `useAsyncData(() => queryCollection('projects').all())`, match the slug by the last `path` segment, render with `<ContentRenderer>`. |
| Hardcoded single-instance copy in `src/data/` | Same rule as v1's `CMS-ARCHITECTURE.md`: prose goes in markdown, layout copy goes in TS. |
| `src/utils/dispatch.ts` | `postmarkDate`, `dispatchNumber`, `readMinutes`, `longDate` map directly onto the design's postmarks, "Dispatch No." and "N min read". |
| First-paint theme script in `app.head.script` | Same idea, re-keyed to `rv-edition` and `data-theme="day|night"` (see §2). |
| SSG via `nuxt generate` → Cloudflare Pages | |
| `sass` + `additionalData: '@use "~/assets/styles/mixins" as *;'` | SCSS for BEM nesting (`&__el`, `&--mod`) and breakpoint mixins. |
| Project images in `src/public/images/projects/` | v1 already has the same four projects (`the-modern-index`, `common-ground`, `fieldwork`, `edition-no-04`). |

### Drop

- `rv-design` dependency, its `alias`, `vite.server.watch` override, CSS import, `plugins/rv-design.ts`, the `link-rv-design` skill, and the `NodePackageImporter` sass importer.
- `useSettings` (font and language cycling isn't in the design) and the v1 Google Fonts list.
- `experience` collection and its markdown, `about.vue`, and `sitemap.vue`: none are in the new design (decision 2026-10-17).
- All v1 components: nothing maps 1:1 to the new design.

### Add

- Fonts: IM Fell English (400, italic), Newsreader (opsz 6..72; 400, 600, italic 400), Antonio (500, 700), IBM Plex Mono (400, 500). Use the exact `<link>` from any `.dc.html` `<helmet>` in `app.head.link`, same as v1. `@nuxt/fonts` is an optional upgrade later.
- `components` config with `pathPrefix: false`, so `components/atoms/Stamp.vue` registers as `<Stamp>`, not `<AtomsStamp>`. Component names must be unique across levels.

---

## 2. Foundations: tokens, global styles, theme

### File layout

```
src/assets/styles/
  tokens/
    _primitives.css   raw palette, named by material (never used directly in components)
    _semantic.css     theme-aware roles; day on :root, night on [data-theme="night"]
    _objects.css      fixed "physical paper" colours that never theme
    _typography.css   families, sizes, line-heights, tracking
    _space.css        spacing scale
    _layout.css       container max width, gutter, radii, borders
    _motion.css       durations, easings
    _elevation.css    hard shadows, glows
  _mixins.scss        breakpoint mixins (auto-injected)
  _reset.scss
  _base.scss          html/body, page root, ground texture, links, ::selection
  _prose.scss         markdown output (see note)
  _motion.scss        shared @keyframes (pop, slam…) + reduced-motion kill switch
  main.scss           imports in this order
```

### Token mapping (from the top of `site.css`)

Primitives are named by what they are; semantic tokens are named by what they do. Components
only use semantic and object tokens.

| Design var | Semantic token | Day → Night primitive |
| --- | --- | --- |
| `--ground` | `--rv-color-ground` | `#EEE5D0` → `#14110D` |
| `--paper` | `--rv-color-paper` | `#F6F0E1` → `#1D1914` |
| `--chart` | `--rv-color-chart` | `#E9DCBE` → `#1A1611` |
| `--ink` / `--ink-2` | `--rv-color-ink` / `--rv-color-ink-muted` | |
| `--line` | `--rv-color-line` | brown → brass |
| `--faint` / `--hatch` | `--rv-color-faint` / `--rv-color-hatch` | |
| `--accent` / `--on-accent` | `--rv-color-accent` / `--rv-color-on-accent` | |
| `--seal` | `--rv-color-seal` | |
| `--back-bg` / `--back-fg` / `--back-2` | `--rv-color-inverse-bg` / `-fg` / `-muted` | |
| `--telegram` | `--rv-color-telegram` | |
| `--glow` | `--rv-glow` | `0` → `1` |
| `--display` / `--body` / `--cond` / `--mono` | `--rv-font-display` / `-body` / `-condensed` / `-mono` | |

Object tokens (`_objects.css`): `--rv-object-envelope`, `--rv-object-letter`,
`--rv-object-letter-ink`, `--rv-object-airmail-red`, `--rv-object-airmail-blue`, wax-seal gradient
stops, and stamp colours `--rv-stamp-{navy,red,brown,steel,seal}`.

**Spacing and type scale:** the design uses literal px inline (`gap: 14px`, `padding-top: 120px`,
`margin: 72px 0 56px`…). Step one is an audit: list every distinct value in `site.css` and the
inline styles, then snap to a scale (4px base, e.g. `--rv-space-1` = 4px … `--rv-space-30` =
120px) and a type scale (`--rv-text-label: 12px`, display sizes as `clamp()` tokens). Values that
appear once and would distort the scale stay as tokens scoped to the component
(`--atlas-plate-image-height`), but they're still variables, not literals.

### Breakpoints

Keep the design's **container queries**. Custom properties can't go in container conditions, so
breakpoints live in `_mixins.scss`:

```scss
$page-bp: (lg: 1024px, md: 900px, sm: 720px, xs: 600px);
@mixin page-below($key) { @container page (max-width: map-get($page-bp, $key)) { @content; } }
@mixin self-below($name, $w) { @container #{$name} (max-width: $w) { @content; } }
```

Component containers stay named: `voyage-chart` (760 / 620), `sealed-envelope` (520),
`dispatch-postcard` (440).

### Theme: `useEdition`

- `type Edition = 'day' | 'night'`. State in `useState('rv:edition')`.
- **Follows the device setting** (`prefers-color-scheme`) by default, and live-updates if the OS setting changes. Only an explicit Day/Night click is saved to `localStorage['rv-edition']`, and a saved choice wins over the OS. With no saved choice, no `data-theme` is set and the CSS falls back to the OS (`@media (prefers-color-scheme: dark)` maps to the night tokens), so SSG output is right on first paint.
- Writes `data-theme` on `<html>` (v1 pattern) in place of `.theme-day` / `.theme-night` on `.rv`, so the inline head script can set it before first paint and there's no flash on SSG pages.
- Exposes `edition`, `isNight`, `setEdition()`, `toggle()`.
- The 0.6s colour cross-fade stays a CSS transition on the page root, using `--rv-duration-theme`.

### Two global-CSS exceptions to BEM (on purpose)

1. **`.prose`**: `<ContentRenderer>` outputs bare `h2`, `p`, `blockquote`, `pre`, `figure`, `ul`, so `_prose.scss` styles elements under the `.prose` block. The design's drop-cap `.lede` becomes `.prose > p:first-of-type`, so markdown authors don't need classes.
2. **Shared keyframes** used by more than one block (`pop`, `slam`, `draw`, `spin`) go in `_motion.scss`. Keyframes used by one component stay in its scoped style.

### ⚠️ The layered stylesheet

`site.css` was written in layers (`v2` … `v8` at the end) that override earlier rules. When moving
a component's styles out, collect **every** rule that targets its selectors across the whole file,
in source order, and keep the final computed result. Track it per component with a checklist
(e.g. the atlas: 24-col grid in `v6`, then the 900px reset, then the "equal small plates" rule).

---

## 3. Content model

### `content.config.ts`

```ts
projects: defineCollection({
  type: 'page',
  source: 'projects/*.md',
  schema: z.object({
    // title + description come from the page type: description = the dek
    plate: z.number().int().min(1),      // 1 → "Plate I." (roman numeral derived)
    index: z.string(),                    // "01"
    category: z.string(),                 // "Digital publishing"
    disciplines: z.array(z.string()),     // joined with " · "
    year: z.number(),
    role: z.string().optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    coverImage: z.string().optional(),
    coverCredit: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
}),
posts: defineCollection({
  type: 'page',
  source: 'writing/*.md',
  schema: z.object({
    date: z.date(),
    kind: z.string(),                     // "Opinion" → "Featured · Opinion · 9 min read"
    featured: z.boolean().default(false), // → LeadDispatch
    topic: z.enum(['vue', 'css', 'writing', 'systems', 'cities']),
    postcard: z.object({
      word: z.string(),                   // "The\nNotebook"
      ground: z.enum(['sun', 'ruled', 'tiles', 'lanes']),
    }).optional(),
    rawbody: z.string(),                  // read time
  }),
}),
```

**Derived, not authored:** roman numeral, `"No. 02"`, postmark (`APR 30` / `2025`),
dispatch number, read time, postcard tilt (cycled from a fixed list by index), stamp
colour/icon/label (from `topic` in a typed `TOPIC_STAMPS` map in `src/data/stamps.ts`), plate
image height (from grid slot), and the prev/next pager.

### Files

There needs to be **enough demo content to exercise every element** (decision 2026-10-17).
Lorem ipsum is fine wherever the design has a `[placeholder]` or no copy.

- `content/projects/*.md`: the four v1 files (`the-modern-index`, `common-ground`, `fieldwork`, `edition-no-04`), frontmatter rewritten to the new schema using the design copy (`p1`–`p4` in the homepage script). Each body includes **every** prose block from `WorkDetail`: h3 label, h2, drop-cap lede, paragraphs, pull quote with cite, fenced code block, figure + caption, and list. Write it in lorem around the design's headings ("The brief", "The outcome"). Four projects is enough for the 24-col atlas and a wrapping prev/next pager.
- `content/writing/*.md`, **eight dispatches** in total, each with a different `date` so postmarks and ordering differ:
  - The five from the design: *Building Maintainable Vue Component Libraries* (the only `featured: true`), *Modern CSS I Reach For Every Day* (css/sun), *Writing Is Thinking* (writing/ruled), *Design Tokens Are a Contract, Not a Palette* (systems/tiles), *What Toronto's Laneways Taught Me About Navigation* (cities/lanes). Bodies are lorem covering every prose block, using the design's heading and code-block labels.
  - The three v1 posts, **kept** with their real bodies (*Building a Component Library That Lasts*, *Design Tokens 101*, *Why Frontend Devs Should Care About Design Systems*). Their frontmatter gets migrated: `topic`, `kind` and a `postcard` word + ground. Check their markdown renders every `.prose` style; add a figure or blockquote only if a block type is otherwise never shown.
  - **How they're used:** home and `/writing` show the lead + the 4 most recent other dispatches as postcards; `/writing` then lists the remaining 3 below under the same "More dispatches" grid, so the grid is seen with an odd count. `/writing/[slug]` shows 2 others (the next two by date, wrapping).
- Every stamp topic (`vue`, `css`, `writing`, `systems`, `cities`) and every postcard ground (`sun`, `ruled`, `tiles`, `lanes`) is used at least once.
- `src/data/site.ts`: typed, single-instance copy, including nav (+ menu-letter compass points N/E/S/W and sublines), edition line (`v2.0.0 · Toronto`), NewsLine items, the four territories (id, numeral, title, region, chart button position, cartouche line, link), contact rows, envelope letter rows, colophon, and CrossBanner presets for `/work` and `/writing`.
- `src/types/content.ts`: view-model interfaces (`PlateView`, `DispatchView`, `Territory`, `ContactRow`, `Edition`).

Placeholders in `[brackets]` stay as they are. Don't invent copy.

---

## 4. Component inventory (atomic)

Source is the **renamed** handoff file. "Composable" means its logic lives there.

### Atoms: `src/components/atoms/`

| Component | BEM block | Replaces | Notes |
| --- | --- | --- | --- |
| `Container` | `container` | `.wrap` | `tag` prop. |
| `Label` | `label` | `.mono` | Mono uppercase tracked text; `tag`, `tone` (`ink`/`muted`/`accent`). |
| `Button` | `button` | `.btn`, `.btn-ink`, `.btn-line` | `variant`, renders `NuxtLink` / `a` / `button`; arrow slot. |
| `Monogram` | `monogram` | RV seal circle, `.ml-mono`, `.ml-seal` | `variant: 'seal' \| 'letterhead' \| 'wax'`. |
| `Stamp` | `stamp` | `.stamp` / `.stamp-in.st-*` | `topic` or `{ color, icon, label }`. |
| `Postmark` | `postmark` | `.pm` | `lines: [string, string]`, optional waves. |
| `PlateNumber` | `plate-number` | `.plate-no` | The red "Plate No." stamp. |
| `Icon` | `icon` | inline 16/24px SVGs | Typed `name` union: sun, moon, close, arrow… |
| `CompassIcon` | `compass-icon` | `.compass` in burger | Needle spins when `active`. |
| `Rule` | `rule` | `.rule-2`, dotted leaders | `variant: 'single' \| 'double' \| 'dots'`. |

### Molecules: `src/components/molecules/`

| Component | BEM block | Source | Notes |
| --- | --- | --- | --- |
| `EditionToggle` | `edition-toggle` | `.ed` in `Header` / `Main` | `v-model: Edition`; `aria-pressed`; label hidden ≤600. |
| `PrimaryNav` | `primary-nav` | `.topnav` | `current` prop. |
| `MenuButton` | `menu-button` | `.burger` | `aria-expanded`; uses `CompassIcon`. |
| `SectionHead` | `section-head` | `.sec-head` + `.sec-title` | Kicker, link, title with `<em>` accent. |
| `PageHead` | `page-head` | `PageHead` | `kicker, aside, title, accent, dek`. |
| `Breadcrumbs` | `breadcrumbs` | `.crumbs` | `items: { label, to? }[]`. |
| `FactList` | `fact-list` | `.facts` | `dl`; 2×2 ≤600. |
| `PagerLink` | `pager-link` | `.pager a` | `direction`, `label`, `title`, `to`. |
| `TerritoryButton` | `territory-button` | `.tbtn`, `.lg` | `variant: 'overlay' \| 'legend'`, `pressed`. |
| `Cartouche` | `cartouche` | `.carto` | Shows the selected territory or the default copy; `aria-live`. |
| `ContactRow` | `contact-row` | `.pc-row` | Optional link. |
| `MenuLink` | `menu-link` | `.ml-link` | Compass point, title, dotted leader, subline. |
| `Signoff` | `signoff` | `.signoff`, `.ml-sign` | "Yours in code & ink". |

### Organisms: `src/components/organisms/`

| Component | BEM block | Source | Composable |
| --- | --- | --- | --- |
| `SiteHeader` | `site-header` | top bar of **`Main`** (not `Header.dc.html`) | `useEdition`, `useEditionLine`. One version on **every** page; `current` prop only. See note below. |
| `MenuLetter` | `menu-letter` | menu in `Header` / `Main` | `useDialog` (focus trap, Esc, scroll lock, return focus). |
| `Nameplate` | `nameplate` | `.nameplate`, `.mast`, `.roller` | Per-letter spans generated from a string. |
| `NewsLine` | `news-line` | `.newsline` | None (CSS marquee; duplicates rendered `aria-hidden`). |
| `VoyageChart` | `voyage-chart` | hero SVG in `Main` | `useVoyageChart`. SVG split into small template partials (`VoyageChartLand`, `VoyageChartRose`, `VoyageChartShip`) to keep each file readable. |
| `AtlasPlate` | `atlas-plate` | `Plate` | None; takes `PlateView`. |
| `AtlasGrid` | `atlas-grid` | `.atlas` | None; slot positions as modifiers `atlas-grid__slot--1..4`. |
| `DispatchPostcard` | `dispatch-postcard` | `Postcard` | None; flip is CSS `:hover`/`:focus-within`. |
| `LeadDispatch` | `lead-dispatch` | `LeadDispatch` | None. |
| `CrossBanner` | `cross-banner` | `CrossBanner` | None (preset from `site.ts`). |
| `SealedEnvelope` | `sealed-envelope` | `Envelope` | `useEnvelope`. `startOpen` → static state. |
| `BackPage` | `back-page` | `BackPage` | Owns one `useEnvelope()`; its "Break the seal" button and the envelope share it. |
| `SiteFooter` | `site-footer` | `Footer` | `showCta`. |
| `ContactPostcard` | `contact-postcard` | `.pcard` in `Contact` | None. |
| `DocHead` | `doc-head` | `.doc-head` in both detail pages | Slots for meta row and byline. |
| `Prose` | `prose` | `.prose` | Wraps `<ContentRenderer>`. |

**SiteHeader (decision 2026-10-17):** every page uses the homepage top bar, as in
`reference/header-desktop-tablet-mobile.png` and `reference/menu-letter-tablet.png`.
`Header.dc.html`'s inner-page bar (the "Ruben Verdin" wordmark and the Home link) is **not built**.

- **Desktop:** RV seal + edition line · Work / Writing / Contact · Day/Night pill.
- **≤1024:** the edition line hides and a compass **Menu** button appears next to the pill. The edition line moves into the menu letter's letterhead.
- **≤600:** the pill shows icons only and the Menu button shows the compass only.
- **Two additions so inner pages still work:**
  - The RV seal becomes a `NuxtLink` to `/`, labelled "Ruben Verdin, home", since there's no Home link.
  - The current section's nav link gets the accent underline and `aria-current="page"` (taken from `Header.dc.html`'s `is-here` style).
- The menu letter's **N · The Chart** links to `/#about` from any page.

### Templates: `src/layouts/` + `src/components/templates/`

- `layouts/default.vue`: the page root (`container-type: inline-size; container-name: page`), `SiteHeader` (`current` from `definePageMeta`), `<slot />`, and the footer chosen by page meta `footer: 'back-page' | 'cta' | 'plain'`.
- `templates/ListingTemplate.vue`: `PageHead` + body slot + `CrossBanner` (used by `/work` and `/writing`).
- `templates/DetailTemplate.vue`: `DocHead` + media slot + `Prose` + after slot (pager or sign-off and more postcards).

### Pages: `src/pages/`

| Route | Meta | Composition |
| --- | --- | --- |
| `/` | `current: home`, `footer: back-page` | Nameplate, NewsLine, VoyageChart, SectionHead + AtlasGrid, SectionHead + LeadDispatch + 4 postcards |
| `/work` | `current: work`, `footer: back-page` | ListingTemplate → AtlasGrid; banner → `/writing` |
| `/work/[slug]` | `current: work`, `footer: cta` | DetailTemplate → FactList, cover, Prose, pager |
| `/writing` | `current: writing`, `footer: back-page` | ListingTemplate → LeadDispatch + 4 postcards; banner → `/work` |
| `/writing/[slug]` | `current: writing`, `footer: back-page` | DetailTemplate → byline/postmark/stamp, Prose, Signoff, 2 postcards |
| `/contact` | `current: contact`, `footer: plain` | PageHead, SealedEnvelope (`startOpen`) + ContactPostcard |

**Footer links RSS / Privacy / Sitemap** render as designed but point nowhere for now (pages to
be designed later). They're kept in `site.ts` as `{ label, href: null }` and rendered as
`<a href="#" aria-disabled="true">` with a `// TODO: design page` note. `href="#"` also keeps
`crawlLinks` prerendering from 404-ing.

Detail pages keep v1's not-found branch, restyled with `PageHead` + `Button`.

---

## 5. Composables: `src/composables/`

| Composable | Responsibility | Returns |
| --- | --- | --- |
| `useEdition` | Theme state, persistence, OS preference, `data-theme` sync | `edition`, `isNight`, `setEdition`, `toggle` |
| `useEditionLine` | `"Edition v2.0.0 · Toronto · {weekday, month day, year}"`. Render the build date on the server, then refresh on the client in `onMounted` to avoid a hydration mismatch. | `editionLine` |
| `useDialog` | Open/close, Esc, focus trap, body scroll lock, return focus to trigger, close on route change | `isOpen`, `open`, `close`, `dialogRef`, `triggerRef` |
| `useEnvelope` | State machine `closed → open → closing → closed` and `static` for `startOpen`; 2200ms closing timer cleared on re-toggle and unmount | `state`, `isOpen`, `toggle`, and the ARIA bindings (`expanded`, `hitLabel`, `buttonLabel`, `letterTabindex`, `letterHidden`) |
| `useVoyageChart` | Territories from `site.ts`, selected id, toggle-to-deselect, per-territory state (`on` / `dim` / idle), active cartouche entry, Esc to clear, reduced-motion check (skips the intro voyage) | `territories`, `selected`, `select`, `stateOf(id)`, `active`, `prefersReducedMotion` |
| `usePlates` | Map `projects` items → `PlateView[]` (numeral, label, meta, href, slot) sorted by `plate` | `plates` |
| `useDispatches` | Map `posts` → `DispatchView[]` (number, postmark, read time, stamp, tilt) and split into `lead` + `postcards` | `lead`, `postcards` |
| `usePager` | Prev/next (wrapping) for a slug in an ordered list | `prev`, `next` |

The **queries stay in pages** via `useAsyncData` + `queryCollection` (v1 convention); the result is
passed to `usePlates` / `useDispatches` / `usePager`, which hold pure mapping logic built from
`utils/` functions (`toRoman`, `postmarkDate`, `readMinutes`…). That keeps mapping unit-testable
without Nuxt Content.

---

## 6. Build order

Each step ends with `npm run lint` and a visual check at 1440 / 834 / 390, in Day and Night.

1. **Prep**: rename handoff files (§0), `git init`, copy the v1 boilerplate minus rv-design (§1), `npm install`, empty `/` renders.
2. **Foundations**: token audit → token files, reset/base, fonts, `_mixins.scss`, `useEdition` + first-paint script, `default` layout with page container.
3. **Content**: `content.config.ts`, 4 project + 5 writing markdown files, `data/site.ts`, `data/stamps.ts`, types, utils, mapping composables.
4. **Atoms**: all of them, plus a scratch `/dev/kit` page (excluded from prerender) to see each in both themes.
5. **Shell**: `EditionToggle`, `PrimaryNav`, `MenuButton`, `MenuLetter` + `useDialog`, `SiteHeader` (one version, all pages), `SiteFooter`.
6. **Shared organisms** (README's suggested order): `PageHead`, `AtlasPlate` + `AtlasGrid`, `DispatchPostcard`, `LeadDispatch`, `SealedEnvelope` + `useEnvelope`, `BackPage`, `CrossBanner`.
7. **Listing pages**: `/work`, `/writing` via `ListingTemplate`.
8. **Detail pages**: `DocHead`, `FactList`, `Prose` styles, `PagerLink`, `Signoff`, then `/work/[slug]`, `/writing/[slug]`.
9. **Contact**: `ContactPostcard`, `/contact` with static envelope.
10. **Homepage**: `Nameplate`, `NewsLine`, then `VoyageChart` + `useVoyageChart` last (largest piece: SVG, SMIL ship, overlay buttons, legend grid ≤620, cartouche behaviour ≤760).
11. **Motion & a11y pass**: scroll-driven `.press-in` / `.reveal` (Chromium only, static elsewhere), reduced-motion kill switch, 44px targets, `aria-hidden` on decorative SVG and marquee copies, letter links `tabindex="-1"` while sealed, menu focus trap.
12. **Ship**: `nuxt generate`, check every route prerendered (including all slugs), Lighthouse a11y/perf, Cloudflare Pages deploy as in v1.

---

## 7. Guardrails

- **No literals in component styles.** Optional: add Stylelint with `declaration-strict-value` for `color`, `background*`, `font-*`, `gap`, `margin*`, `padding*`, `box-shadow`, `transition*`, and `stylelint-selector-bem-pattern` for block/element/modifier naming.
- **No inline `style=""`** except per-instance data (territory `%` positions, postcard tilt as `--dispatch-postcard-tilt`).
- **No state classes copied from the design** (`is-on`, `is-dim`, `is-open`): use BEM modifiers (`voyage-chart__land--active`, `sealed-envelope--open`) or style off the ARIA attribute that already expresses the state (`[aria-pressed='true']`).
- Don't use `<form>` (v1 rule carries over; the design has none).
- Update `CLAUDE.md` and `docs/CMS-ARCHITECTURE.md` for v2 once phase 3 lands.

---

## 8. Decisions (2026-10-17)

| Question | Decision |
| --- | --- |
| v1 blog posts | Keep them and add the design's five dispatches; lorem where needed so every element shows (§3). |
| About page / experience | Removed. |
| RSS / Privacy / Sitemap | Links stay in the footer, pointing nowhere until those pages are designed (§4). |
| Default edition | Follow the device setting (§2). |
| Visual reference | Screenshots in `design-handoff/reference/`. |
| Site header | The homepage top bar on every page; `Header.dc.html`'s inner bar is dropped (§4). |

## 9. Still open

1. **Two homepage header versions.** `reference/home-desktop-chart-selected.png` shows the name **centred** with the NewsLine as a **marquee on desktop**, plus a fourth item ("From the archive — Design Tokens Are a Contract…"). The other desktop screenshot and `Main.dc.html` show the name **beside the intro paragraph** with **3 static items**. Which one is current?
   *Checked against the Claude Design canvas: its `Main.dc.html` is the side-by-side version, so
   that's the default unless told otherwise.*

### Claude Design canvas (checked 2026-10-17)

`https://claude.ai/artifact/Wb4qnvRQ966H3DreWfc3Hn` is the source canvas. All 19 local files
are byte-identical to canvas files, which confirms the §0 rename table. The canvas stylesheet
(`/_blob/b8569f53…`) is byte-identical to the local `tokens.css`. The canvas does **not** contain
the `nuxt-starter/` files either, so they never existed as separate files: the plan derives them
(§3). Extra boards that aren't in the handoff are `Artboard-skay` (a moodboard of 8 pasted
reference images) and the `*-Tablet` / `*-Mobile` wrappers, which just embed the desktop pages
at 834 and 390px.

---

## 10. v2 delta (2026-10-17)

Source: `design-handoff/v2/CHANGES.md`. The v1 handoff moved to `design-handoff/v1/`. Applied in
the suggested order 1 → 2 → 3 → 6 → 5 → 4; unchanged pages were not rebuilt.

| # | Change | Where it landed |
| --- | --- | --- |
| 1 | CSS v9–v14 | v9 → `_prose.scss` (links, `strong`, `h4`, Roman `ol`, nested lists, inline code, dotted `hr`, tables) + `content/ProseTable.vue` + `content/Callout.vue`. v10 → `IndexRow`. v13/v14 → scoped in the About components. `.ml-n` → `MenuLink`. New tokens: `--rv-weight-semibold`, `--rv-text-section-sub`, `--rv-leading-120`, `--rv-tracking-4`, `--rv-shadow-paper-xl`, `--rv-shadow-vignette`, `--rv-shadow-port-ring`, `--rv-texture-photo-halftone`, `--rv-texture-rule-dots`, and the theme-aware `--rv-filter-photo` / `--rv-blend-halftone` / `--rv-opacity-halftone`. |
| 2 | Home + About nav; 5 compass points | `src/data/nav.ts` (`primaryNav`) feeds `SiteHeader`/`PrimaryNav` and `MenuLetter`/`MenuLink`. `Section` → `NavKey` (adds `about`); `section` meta is optional, so `/sitemap` and `/privacy` highlight nothing. |
| 3 | Footer links | `footerLinks` in `nav.ts`: Privacy → `/privacy`, Sitemap → `/sitemap`; RSS stays inert. |
| 6 | Default content page | `pages/[...slug].vue` + `pages` collection (`content/pages/*.md`, prefix `/`) + `useContentPage`; lorem fallback in `content/fallback/page.md` (`pageFallback` collection). |
| 5 | `/sitemap` | `pages/sitemap.vue` → `PageIndex` → `IndexRow`, rows from `sitemapPages`. |
| 4 | `/about` | `pages/about.vue`: `AboutIntro` (`AboutPortrait` + story) · `Logbook` (`LogbookEntry`) · `InstrumentsAboard` · `PortsOfCall` · `CrossBanner` (`toWork`). Data in `src/data/about.ts`, story in `content/about/story.md`, mapping in `useAbout`. `Stamp` gained `title`, `size="lg"`, `placeholder`; `Postmark` takes `--postmark-size` / `--postmark-font-size`; `SectionHead` gained `size="sub"` and placeholder links (`to: null`). |

**Decisions (2026-10-17):**

- **RSS:** stays inert until a feed exists (no `/rss.xml`).
- **`/sitemap.xml`:** `@nuxtjs/sitemap` is deferred. When it's added it needs the production site URL.
- **About content:** the short story is markdown; the logbook, instruments and ports are TS layout copy.
- **Home link:** goes to `/` from everywhere, including the menu letter. The old `/#about` chart jump is gone.
- **Supersedes §8:** "About page removed" no longer applies, because the v2 design adds `/about`.

**Deliberate deviations:**

- **Logbook route line:** it is centred on the port dots. The design CSS puts the desktop line at 150px, about 20px left of the dots.
- **Instrument columns:** each column takes its kicker and role from the matching chart territory in `site.ts`, so it can't drift from the homepage. The ports kicker comes from the Traveler territory the same way.
- **Privacy has no copy yet:** only its title is set, so the page shows the full lorem fallback, which doubles as the visual test page.
- **Placeholders:** the portrait `src`, `[Download CV]` and every bracketed value stay as they are.
