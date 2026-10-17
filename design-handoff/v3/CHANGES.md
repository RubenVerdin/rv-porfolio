# v3: inked scrollbar + voyage band (2026-10-17)

> **Status: implemented in code** (2026-10-17, by Claude in the design session, straight into the repo). This file is the record, so design and code can be compared later. **The code is the source of truth.** If the two disagree, the code wins and the canvas gets updated.

## Summary

| # | Change | Design source | Landed in code |
|---|---|---|---|
| 1 | **Inked scrollbar**: thin, square, ink on paper by day, brass on dark paper by night | `design/styles/site.v3-additions.css` (v15) | `_base.scss` (global, on `html`) · tokens `--rv-color-scrollbar-thumb/-track` (`_semantic.scss`), `--rv-size-scrollbar` (`_layout.scss`) · overrides in `ProsePre` (inverse colours) and `MenuLetter` (letter-paper thumb over the scrim) |
| 2 | **Voyage band**: reading progress as a dotted route with a ship. It's pinned to the top of the window, hidden until the header scrolls away, and the port pulses at the bottom | `design/source/VoyageProgress.dc.html`, `design/diffs/Main.diff`, CSS v15–v17 | `organisms/VoyageProgress.vue` + `composables/useScrollProgress.ts`, mounted first in `layouts/default.vue` · tokens `--rv-height-voyage-band`, `--rv-layer-sticky`, `--rv-shadow-band`, `--rv-duration-120`, `--rv-duration-band-*`, `--rv-ease-band-in/-out` |

## Behaviour (final, after review)

- **Scrollbar**
  - `scrollbar-width: thin` plus `scrollbar-color` on `html`, read by Chromium and Firefox. These inherit to inner scrollers.
  - Safari gets `html::-webkit-scrollbar*`: 10px wide, a 3px track-coloured border around the thumb, a hairline rule on the track's left edge, and no radius.
  - `color-scheme` already flips per edition (in `_semantic.scss`), so form controls match.
- **Band**
  - **Height:** 48px.
  - **Placement:** a zero-height `position: sticky; top: 0` anchor at the very top of `.page`. The band hangs from it, so it takes no space and never travels with the content.
  - **Reveal:** shown once `scrollTop > 88px`, just past the ~70px header, and hidden again below that. It hides about 10% sooner than an exact header-height threshold, so it's gone before the header returns.
  - **Motion in:** 10px travel. Transform `.36s` with `cubic-bezier(.2,.7,.2,1)`, opacity `.26s`.
  - **Motion out:** about 10% faster. Transform `.29s` with `cubic-bezier(.3,0,.2,1)`, opacity `.2s`. (An earlier full-height slide was rejected as too jerky.)
  - **Layout:**
    - Left: `Log · NN%` (mono 10px, accent percent).
    - Middle: a dotted route on a 9px pitch, accent where sailed and hatch ahead, with 10% chart ticks underneath.
    - The ship (from the CrossBanner glyph) rides **above** the line and bobs.
    - Right: a port dot that pulses once the reader reaches 99.5%.
  - **Sizes:** desktop only. Hidden at `page-below(lg)` (≤1024px).
  - **Accessibility:** decorative (`aria-hidden`); the browser's scrollbar stays the real control. Reduced motion is handled by the global kill switch.

## Rejected (don't build)

- **Band over the scrollbar.** This needed the page to scroll in an inner container, which breaks keyboard scrolling, mobile browser chrome and scroll restoration. It was reverted for accessibility (decision 2026-10-17).
- **A "D · The Back Page" label at the port.** Removed in review.

## Deviations from the canvas

- **Scope:** the canvas scopes everything to the homepage (`.rv-home`). The code applies it **site-wide**, because the header and layout are shared (decision 2026-10-17).
- **Colours:** the route's "ahead" dots and the ticks use `--rv-color-hatch` instead of `ink-2` at 45% / 35% opacity, so there's no opacity literal. It looks the same.
- **Easing:** the design's `ease` opacity transitions stay as the `ease` keyword, as `MenuLetter` does.
