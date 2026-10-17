# Ruben Verdin portfolio: v2 design changes (a delta on v1)

> **For Claude Code.** This bundle only contains the **changes** since the v1 handoff, which you have already built. The v1 README conventions still apply: the `.dc.html` → Vue mapping, tokens, and the warning about the order of CSS layers. Don't rebuild existing pages. Make the edits below.

---

## 0. Summary

| # | Change | Type | Files |
|---|---|---|---|
| 1 | CSS v9–v14 appended | **Styles** | `design/styles/site.v2-additions.css` |
| 2 | Header nav gets **Home + About**; menu letter gets 5 compass points | **Edit** | `design/diffs/Header.diff`, `design/diffs/Main.diff`, `nuxt-starter/content/nav.ts` |
| 3 | Footer links go to real pages | **Edit** | `design/diffs/Footer.diff`, `design/diffs/BackPage.diff` |
| 4 | **`/about`** | **New page** | `design/source/About.dc.html`, `nuxt-starter/{types,content}/about.ts` |
| 5 | **`/sitemap`** | **New page** | `design/source/Sitemap.dc.html` |
| 6 | **Default content page** (`/privacy` and any CMS page) | **New page** | `design/source/Page.dc.html` |

Unchanged since v1: Contact, CrossBanner, Envelope, LeadDispatch, PageHead, Plate, Postcard, WorkList, WorkDetail, WritingList, WritingDetail.

Suggested order: 1 → 2 → 3 → 6 → 5 → 4. The default page has the biggest share of CSS; the About page relies on the `.prose` additions.

---

## 1. Styles: `site.v2-additions.css`

- **Append it to the end of the v1 `site.css`**, after the `v8` layer. These rules override earlier ones on purpose, so put them last.
- It contains the following layers:

  | Layer | What it adds |
  |---|---|
  | **v9** | `.prose` gains link, `strong`, `h4`, Roman-numeral `ol`, nested lists, inline `code`, dotted `hr`, `table`/`.table-wrap` and `.callout` styles, so the default page can render any markdown. |
  | **v10** | Tighter `.ix` index rows at ≤600px. |
  | **v13** | About page styles: `.about-intro`, `.portrait*` (the photo filter), `.logbook`/`.log-*`, `.instruments`/`.instr`, `.ports`, `.sec-sub`. |
  | **v14** | About at ≤900px (portrait max 440px, centred) and ≤600px (portrait 300px, smaller stamps and type). It also sets `.ml-n{font-size:10px}`, so two-letter compass points like "NE" fit in the menu. |

- Dead sitemap-category rules (`.sm-*`, `.doc-meta`, layers v11 and v12) were **removed** from this file. The sitemap became one flat list, so they aren't needed.

---

## 2. Navigation: Home + About everywhere

Use `nuxt-starter/content/nav.ts` (`primaryNav`) as the **single source** for every nav surface.

| Surface | v1 | v2 |
|---|---|---|
| `SiteHeader` top nav | Work · Writing · Contact | **Home** · Work · Writing · **About** · Contact |
| `HomeTopBar` (homepage) | Work · Writing · Contact | **Home** (current, underlined in accent) · Work · Writing · **About** · Contact |
| `MenuLetter` (≤1024px) | N The Chart · E Work · S Writing · W Contact | **N** Home · **NE** Work · **E** Writing · **SE** About · **S** Contact |

- In `SiteHeader`, the `current` prop gains `'about'`. Widen it to `NavKey | undefined`, because `/sitemap` and `/privacy` pass a value that highlights nothing.
- On `/`, the menu's "Home" link points to `#about`, which is the chart section (`<section id="about">`). Keep that, or use `/`.
- The diffs show the exact markup. Only the link list and the `current` enum changed; the rest of the header is identical.

## 3. Footer links

In `SiteFooter` and `BackPage`, the colophon links now go to real pages: **Privacy → `/privacy`** and **Sitemap → `/sitemap`**. In v1 they pointed to `#contact` or `/`. Use `footerLinks` from `nav.ts`.

---

## 4. New page: `/about`, from `About.dc.html`

Composition, top to bottom:

1. `SiteHeader(current="about")`
2. `PageHead`, with these props:

   | Prop | Value |
   |---|---|
   | kicker | "Section E — The Correspondent" |
   | aside | "México · Toronto" |
   | title | "About" |
   | accent | "the correspondent." |
   | dek | "Developer, designer, writer and traveler — a short story and a long logbook." |

3. **Intro** (`.about-intro`, a 5/7 grid that stacks at ≤900px):
   - **`AboutPortrait`**: a paper frame tilted −1.2°, with an MX·CA stamp at the top left, a TORONTO ON postmark at the bottom right, and a figcaption.
   - Story column: a "A short story" kicker, `.prose` (lede, paragraphs, blockquote + cite), then a sign-off with "R. Verdin" and a **Write to me →** button to `/contact`.
4. **The Logbook**:
   - `.sec-head` reads "The Logbook" with **[Download CV] ↓** on the right. That's a placeholder; link it to a PDF later.
   - `.sec-sub` heading: "Ports of *experience.*"
   - `LogbookEntry × n` from `about.log`. Desktop uses a 4-column grid (when │ port dot │ role/company/desc │ where) on a dashed red route line. At ≤900px it becomes a 2-column grid with the line on the left. `current: true` adds `.is-now`, which puts a glow ring on the port dot.
5. **Instruments aboard**: 3 columns from `about.instruments`, stacking at ≤900px. Each column's territory names match the homepage chart.
6. **Ports of call**: a wrap of stamps from `about.ports` that alternate −3° / +2.5° tilt. The last one is a dashed "Next port" placeholder (`.ph-next`).
7. `CrossBanner` to `/work`, with these props:

   | Prop | Value |
   |---|---|
   | kicker | "Next port · The Atlas of Works" |
   | title | "See the" |
   | accent | "atlas." |
   | words | The Atlas · plates · Projects · works |

8. `BackPage`

### ⚠️ Portrait photo filter (the important part)

Ruben will supply a photo. **Drop a plain `<img>` inside `.portrait-frame`.** The CSS tones it automatically, in this stack:

| Layer | Effect | Night mode |
|---|---|---|
| `img` | `grayscale(1) sepia(.45) contrast(1.12) brightness(.96)` | darker: `sepia(.5) brightness(.82)` |
| `::before` | accent-colour wash, `mix-blend-mode: color`, 16% | follows `--accent` |
| `::after` | 4px halftone dots, `multiply`, 22% | `screen`, 12% |
| `.portrait-vignette` | inset shadow | — |
| `.portrait-ph` | placeholder label | **remove when `src` exists** |

Use `<NuxtImg>` if you like, but keep it `position:absolute; inset:0; object-fit:cover` and keep the 4:5 aspect ratio.

---

## 5. New page: `/sitemap`, from `Sitemap.dc.html`

- Composition:
  - `SiteHeader` (nothing highlighted)
  - `PageHead`, with these props:

    | Prop | Value |
    |---|---|
    | kicker | "The Index" |
    | aside | "Every page, in one place" |
    | title | "The" |
    | accent | "Sitemap." |
    | dek | "Every page on this site, in one list." |

  - **One flat `.ix-wrap` list** of `sitemapPages`, numbered 01–08 with `String(i+1).padStart(2,'0')`.
  - `BackPage`
- The `.ix` row classes already exist in the v1 CSS (they were used for indexes). Only the ≤600px tightening is new (v10).
- **Detail pages are deliberately not listed**, because 50 articles would swamp the page. Add **`@nuxtjs/sitemap`** for the real `/sitemap.xml`, including every `/work/**` and `/writing/**` route from `@nuxt/content`.
- RSS points to `[Feed URL]`, a placeholder. If you add a feed, use `/rss.xml`.

## 6. New page: default content page, from `Page.dc.html`

- This is the **WYSIWYG/CMS template** for Privacy, Terms, and any one-off page.
- Implement it as `pages/[...slug].vue`, or a `default` layout, rendering a `@nuxt/content` document.
- Composition:
  1. `SiteHeader`
  2. `PageHead`, mapped from frontmatter:

     | Prop | Source |
     |---|---|
     | kicker | `kicker`, default "The Fine Print" |
     | aside | "Last updated · {date}" |
     | title | `title` |
     | accent | `accent` |
     | dek | `description` |

  3. `<article class="wrap"><div class="prose">` with the markdown body
  4. A sign-off: "Yours in code & ink, R. Verdin", plus a "Sitemap →" button
  5. `BackPage`
- **Fallback:** when a field or the body is missing, render the lorem ipsum from `Page.dc.html`. The page is designed to always look complete.
- `Page.dc.html` contains one of every element `.prose` must support: h2–h4, a lede, a link, strong/em, nested ul, Roman ol, blockquote + cite, inline code, a figure + caption, a table, a dotted hr, a code block with a filename header, and a callout. Use it as the visual test page.
- Map the `.callout` to an MDC component, e.g. `::callout{label="Nota bene"}`.

---

## 7. Check before calling it done

- [ ] `SiteHeader`, `HomeTopBar` and `MenuLetter` all read from `primaryNav`, with 5 links in each.
- [ ] `/about` with **no** `src`: the hatched placeholder shows. With a `src`: the photo is toned, and nothing changes layout.
- [ ] `/about` at 834px and 390px:
  - the portrait is centred and capped at 440 / 300px
  - the logbook line moves to the left
  - the instruments stack
- [ ] Night mode on `/about`: the photo darkens and the halftone switches to `screen`.
- [ ] `/sitemap` lists 8 rows; `/sitemap.xml` includes the detail pages.
- [ ] `/privacy` renders markdown with every `.prose` element, and falls back to lorem.
- [ ] The footer's Privacy and Sitemap links resolve.
