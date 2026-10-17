# Ruben Verdin — Portfolio handoff (Nuxt 3 + TypeScript)

> **For Claude Code.** This folder is the complete design for Ruben Verdin's portfolio:
> an editorial / newspaper site with an *age-of-exploration* theme (sea charts, postcards,
> wax seals, airmail). Build it as a **Nuxt 3 + TypeScript** app. Treat `design/` as the
> source of truth for markup, copy, styles and motion; treat `nuxt-starter/` as typed
> scaffolding you can drop into the project.

---

## 1. What's in this bundle

```
design/
  source/*.dc.html     ← every page and shared component, exactly as designed
  styles/site.css      ← the ONE stylesheet every page uses (tokens, layout, motion)
  canvas.json          ← design-canvas index (board sizes; ignore for the build)
nuxt-starter/
  types/content.ts     ← Project + Dispatch interfaces
  content/projects.ts  ← the 4 projects (plates)
  content/dispatches.ts← the 5 articles (1 featured + 4 postcards)
  content/site.ts      ← shared copy, contact placeholders, homepage territories
  composables/useEdition.ts ← Day/Night theme state
  assets/css/tokens.css← colour + font tokens extracted from site.css
```

### How to read a `.dc.html` file

They are HTML templates for a design tool. The translation to Vue is mechanical:

| `.dc.html` | Vue / Nuxt |
|---|---|
| `{{ value }}` | `{{ value }}` / `:attr="value"` |
| `<sc-for list="{{items}}" as="item">` | `v-for="item in items"` |
| `<sc-if value="{{cond}}">` | `v-if="cond"` |
| `<dc-import name="Plate" item="{{p}}">` | `<AtlasPlate :item="p" />` (kebab attrs → camelCase props) |
| `onClick="{{fn}}"` | `@click="fn"` |
| `class Component … renderVals()` | `<script setup lang="ts">` computed values |
| `this.state` / `setState` | `ref()` / `reactive()` |
| `href="WorkList.dc.html"` | `<NuxtLink to="/work">` (route map in §3) |
| `in-page`, `scope`, `cmp-alone` | **Design-tool only — drop them.** They let a component preview on its own. |
| `<helmet>` | fonts → `nuxt.config` / `app.head` |

Inline `style="…"` in the source is intentional design values — keep them or move into scoped CSS.

---

## 2. Stack & setup

- Nuxt 3, TypeScript strict, `<script setup lang="ts">`.
- **Recommended:** `@nuxt/content` (v3) for the Work and Writing detail pages — they are *user-generated content* (markdown) rendered inside a `.prose` container. Lists come from the same collections.
- Fonts (Google Fonts): **IM Fell English** (regular + italic) · **Newsreader** (opsz 6..72; 400, 600, italic 400) · **Antonio** (500, 700) · **IBM Plex Mono** (400, 500). Use `@nuxt/fonts` or the exact `<link>` from any source file's `<helmet>`.
- Global CSS: import `design/styles/site.css` as-is first to get pixel parity, then refactor into component styles (see §8 warning about rule order).

```ts
// nuxt.config.ts (sketch)
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/fonts'],
  css: ['~/assets/css/site.css'],
  app: { head: { htmlAttrs: { lang: 'en' } } },
})
```

---

## 3. Routes

| Route | Source file | Composition (top → bottom) |
|---|---|---|
| `/` | `Main.dc.html` | Home top bar · Nameplate + intro · NewsLine · **VoyageChart** · Atlas section (4 plates) · Correspondence (LeadDispatch + 4 postcards) · BackPage |
| `/work` | `WorkList.dc.html` | SiteHeader(work) · PageHead · Atlas grid (4 plates) · CrossBanner → `/writing` · BackPage |
| `/work/[slug]` | `WorkDetail.dc.html` | SiteHeader(work) · breadcrumb + plate meta + title + dek + facts · cover image · **`.prose` content** · prev/next pager · SiteFooter (CTA strip) |
| `/writing` | `WritingList.dc.html` | SiteHeader(writing) · PageHead · LeadDispatch · "More dispatches" + 4 postcards · CrossBanner → `/work` · BackPage |
| `/writing/[slug]` | `WritingDetail.dc.html` | SiteHeader(writing) · centred article head (byline, postmark, stamp) · **`.prose` content** · sign-off · 2 more postcards · BackPage |
| `/contact` | `Contact.dc.html` | SiteHeader(contact) · PageHead · Envelope (**starts open, still**) + contact Postcard · SiteFooter (no CTA strip) |

`Tablet.dc.html`, `Mobile.dc.html` and the `*-Tablet` / `*-Mobile` boards are just the same pages shown at 834px and 390px — there is no separate markup. All responsiveness is in `site.css`.

---

## 4. Components

Suggested names → source → props. All colours come from CSS variables; never hard-code theme colours (exceptions noted).

| Vue component | Source | Props (TS) | Behaviour |
|---|---|---|---|
| `HomeTopBar` | `Main.dc.html` (top of page) | – | RV seal + edition line (`Edition v2.0.0 · Toronto · {long date}`), nav, Day/Night toggle, compass **Menu** button (≤1024px). |
| `SiteHeader` | `Header.dc.html` | `current: 'home'\|'work'\|'writing'\|'contact'` | Inner-page bar: RV seal + **"Ruben Verdin"** + edition line, nav (current link underlined in accent), Day/Night toggle. ≤1024px: nav + edition line hide, compass **Menu** button shows. |
| `MenuLetter` | inside `Header.dc.html` / `Main.dc.html` | `open: boolean` → emits `close` | Modal styled as a folded letter: letterhead (RV monogram + edition line), "Dear reader, where to?", links **N** The Chart · **E** Work · **S** Writing · **W** Contact, sign-off + wax seal. Unfold animation; closes on ✕, scrim or link. Add focus trap + Esc in the real build. |
| `EditionToggle` | `.ed` in headers | `modelValue: Edition` | Day / Night pill; `aria-pressed`. ≤600px shows icons only (`.ed-l` hidden). |
| `NewsLine` | `.newsline` in `Main` | `items: {label,text}[]` | Desktop: 3 static items between rules. ≤1024px: **infinite marquee** (items duplicated, `aria-hidden` on copies), pauses on hover. |
| `VoyageChart` | `Main.dc.html` hero SVG | `territories` (see `content/site.ts`) | Interactive sea chart — see §6. |
| `PageHead` | `PageHead.dc.html` | `kicker, aside, title, accent, dek` | Kicker row, big IM Fell title with italic accent word, dek. |
| `AtlasPlate` | `Plate.dc.html` | `item: Project` | Catalogue "plate": header (Plate no. + index/category), hatched image area, italic title + meta, "View plate →". Hover: lifts + hard shadow + red "Plate No." stamp lands. Fills its grid cell (flex column; image grows). |
| `AtlasGrid` | `.atlas` | `items: Project[]` (4) | Desktop **24-col** grid: Plate I `span 14` · Plate II `span 10 / row span 2` · Plates III & IV `span 7` each. Left stack bottom aligns with Plate II. ≤900px: single column. |
| `DispatchPostcard` | `Postcard.dc.html` | `item: Dispatch` | 3:2 postcard, slight tilt. Front: "Greetings from" + huge outlined word on a patterned ground (`bg-sun / bg-ruled / bg-tiles / bg-lanes`). **Flips 180° on hover/focus**; back shows title + read time, postmark **slams** in, stamp pops. ≤440px card width: back hides the address/stamp column. |
| `LeadDispatch` | `LeadDispatch.dc.html` | `item: Dispatch` | Featured article as a postcard back: headline, dek, byline + button; right panel with postmark, Vue stamp, address lines. Stacks ≤900px. |
| `CrossBanner` | `CrossBanner.dc.html` | `kicker, title, accent, dek, cta, to, words: string[]` | Full-bleed dark banner (≈680px). Animated chart: rhumb lines, slow-spinning compass rose, dotted route **draws in** while a ship sails it to a pulsing port; huge headline; marquee ribbon of `words` at the bottom. Used: `/work` → "Read the *dispatches.*", `/writing` → "See the *atlas.*". |
| `SealedEnvelope` | `Envelope.dc.html` | `startOpen?: boolean` | Airmail envelope with wax seal. Click → seal cracks in two, flap opens, letter rises out then comes forward. Click letter/envelope → reverses. `startOpen` = letter already out with **no** entrance animation (Contact page). |
| `BackPage` | `BackPage.dc.html` | – | "Section D — The Back Page": *Let's work together.* + Break-the-seal button that drives the envelope + colophon footer. Same as homepage footer. |
| `SiteFooter` | `Footer.dc.html` | `showCta?: boolean` | Optional "Let's work together → Break the seal" strip + colophon + © / RSS / Privacy / Sitemap. |
| `ContactPostcard` | `.pcard` in `Contact.dc.html` | `contact` (from `site.ts`) | Address-side postcard: Find me · Originally · Call me · Write me · Hours; MX·CA stamp, Toronto postmark, Par Avion label. |

**Envelope letter content** (all three envelope instances): "Dear reader," + date, "The quickest routes to my desk…", rows Email / LinkedIn / GitHub / Instagram, "Yours in code & ink, R. Verdin", "REPLY PAID".

---

## 5. Design tokens

From `nuxt-starter/assets/css/tokens.css` (verbatim from `site.css`). Apply `.theme-day` / `.theme-night` to the page root (`.rv`), e.g. via `useEdition()`.

| Token | Day | Night | Use |
|---|---|---|---|
| `--ground` | `#EEE5D0` | `#14110D` | page background (with 3px halftone dot texture) |
| `--paper` | `#F6F0E1` | `#1D1914` | cards, plates |
| `--chart` | `#E9DCBE` | `#1A1611` | map sea / image placeholders |
| `--ink` / `--ink-2` | `#1D1913` / `#4F4536` | `#EBDFC6` / `#B9AB8F` | text / secondary text |
| `--accent` | `#9A2E1F` | `#E0785C` | oxblood red: stamps, route, links |
| `--seal` | `#2E5236` | `#6E9A72` | wax-seal green |
| `--line` | `#6B5A3E` | `#C9A45C` | map lines (brass at night) |
| `--back-bg` / `--back-fg` / `--telegram` | `#1D1913` / `#F1E8D4` / `#F1E2B8` | `#2A2219` / `#EBDFC6` / `#E8D6A6` | dark banner + code blocks |

Fixed colours that do **not** theme (on purpose — physical paper objects): envelope + letter + menu letter (`#F8F1DF`, `#FBF7EC`, ink `#1D1913`), airmail stripes `#9A2E1F` / `#23395B`, wax seal gradient, stamp colours (`.st-*`).

Type: `--display` IM Fell English (titles, italics) · `--body` Newsreader · `--cond` Antonio (postcard words, ribbon) · `--mono` IBM Plex Mono 12px uppercase tracked (labels).

Layout: `.wrap` = max-width 1320px, side padding `clamp(16px, 4cqw, 56px)`.

---

## 6. Homepage chart (`VoyageChart`) — the centrepiece

Inline SVG, `viewBox="0 0 1200 660"`. Read it from `Main.dc.html` (`<!-- hero: the interactive chart -->`).

- **Static layers:** graticule, 32 rhumb lines from the compass at (600,320), four hatched landmasses, sea labels ("OCEANVS DIGITALIS", "HIC SVNT BVGS" + sea serpent), compass rose with a sun-ray ring (slow spin), small line-art glyphs per territory.
- **Territories** (`content/site.ts`): Developer · Costa del Código (NW) — Designer · Islas del Diseño (NE islands) — Writer · Bahía de las Letras (SE) — Traveler · Tierra Natal / México (SW, origin port).
- **Intro voyage (on load):** dotted route México → Toronto → Designer → Writer draws over 9s (mask + `stroke-dashoffset`), a ship rides it via SMIL `<animateMotion>` with matching easing; ports pop in as the ship arrives.
- **Interaction:** territory buttons are real `<button>`s overlaid at % positions (`left/top`) inside `.map-stage` (must be `position:relative` and contain *only* the SVG + buttons, otherwise the % positions drift). Selecting one: land fills with accent hatch, others dim, a bearing line draws from the compass, the port pulses, and the **cartouche** shows that territory's line + link. Click again to deselect.
- **Cartouche:** desktop = floating panel bottom-centre, hidden until a territory is selected. ≤760px (map width) = static panel under the map that always shows (default "How to read this chart…"), with `min-height` so content below never shifts.
- **Sticky note** ("How to read this chart") top-centre on desktop only (hidden ≤760px).
- ≤620px: overlaid buttons hide; a 2×2 territory button grid appears under the map.

---

## 7. Motion inventory

| Where | What | CSS / mechanism |
|---|---|---|
| Name (home) | ink-roller sweep on load | `.roller`, `@keyframes roll` (`@keyframes press` exists if you want per-letter stamping — currently unused) |
| NewsLine (≤1024) | marquee | `.nl-track` + `@keyframes tick` |
| Chart | route draw, ship, ports, rose spin, bearing, pulse | `.route-mask`, SMIL `animateMotion`, `.port`, `.rose`, `.bearing`, `.pulse` |
| Section titles | blur/letter-spacing reveal on scroll | `.press-in` (scroll-driven `animation-timeline: view()`, Chromium only — static elsewhere) |
| Plates / lead | rise on scroll | `.reveal` (same) |
| Plate hover | lift, shadow, stamp | `.plate:hover …` |
| Postcards | 3D flip, postmark slam, stamp pop | `.pc-in`, `@keyframes slam`, `pop` |
| Envelope | seal splits, flap 3D open, letter emerge / tuck | `.env.is-open`, `.is-closing`, `@keyframes emerge`, `tuck`; `.is-static` = open with no animation |
| Menu letter | scrim fade, letter unfolds, compass needle spins | `@keyframes unfold`, `.burger[aria-expanded=true] .c-needle` |
| CrossBanner | route draw, ship, rose spin, ribbon marquee, headline reveal | `.xb-*` |
| Theme switch | 0.6s colour cross-fade | transitions on `.rv` and `.tx` |

`@media (prefers-reduced-motion: reduce)` disables all animation — keep it.

---

## 8. Responsive rules & a warning

- Breakpoints are **container queries** on the page root: `.rv { container-type: inline-size; container-name: page }` → `@container page (max-width: 1024 | 900 | 720 | 600px)`. Component-level containers: `.map-box` (760 / 620), `.bp-stage` (envelope, 520), `.pc` (postcard, 440). Keep them (they work in Nuxt) or convert to media queries at the same widths.
- 1024: hamburger/compass menu, edition line moves into the menu, nameplate side-by-side.
- 900: atlas → 1 column, lead dispatch stacks, contact grid stacks.
- 600: postcards → 1 column, smaller type, facts 2×2, pager stacks.
- ⚠️ **`site.css` was built in layers** (sections labelled `v2`…`v8` near the end). Later rules intentionally override earlier ones — e.g. the 24-column atlas grid in `v6` is followed by a 900px reset. If you split the file into component styles, **preserve the final computed result**, not the first definition you find.

---

## 9. Content & placeholders

- Real copy is already in the design and in `nuxt-starter/content/*.ts`. Don't invent new copy.
- Detail pages show one example of each prose block (h3 label, h2, drop-cap lede, pull quote, code block, figure + caption, list). Style these via `.prose` for markdown output.
- **Still placeholders** (`[bracketed]` in the source): all images (plates, covers, figures), project summary/role/live URL, article bodies, email, phone, hours, LinkedIn/GitHub/Instagram handles, Traveler line on the chart, "Currently charting" / banner lines.

---

## 10. Accessibility checklist

Real `<button>`/`<a>` everywhere (already in source) · `aria-pressed` on toggles · `aria-expanded` on Menu / Break-the-seal · `aria-hidden` on decorative SVG + marquee duplicates · letter links get `tabindex="-1"` while the envelope is closed · add focus trap + Esc for the menu dialog · keep 44px touch targets · keep reduced-motion handling.

---

### Suggested first prompt for Claude Code

> Read `README.md` in this folder, then scaffold a Nuxt 3 + TypeScript app that reproduces `design/` page by page. Start with global styles (`design/styles/site.css`), `useEdition`, `SiteHeader`, `PageHead`, `AtlasPlate`, `DispatchPostcard`, `SealedEnvelope`, `BackPage`, then build `/work` and `/writing`, then the homepage `VoyageChart`. Use `@nuxt/content` for detail pages. Match the design source exactly; ask me before inventing copy.
