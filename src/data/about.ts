import type { AboutPortrait, Instrument, LogEntry, PortStamp, StampView } from '~/types/content'
import { contactStamp } from '~/data/stamps'

// About page layout copy (v2 handoff, about.ts). The short story is prose,
// so it lives in content/about/story.md. Bracketed values and lorem are the
// design's placeholders — Ruben will replace them.

export const portrait: AboutPortrait = {
  // Drop the photo in src/public/images/ and set `src` — it's toned by CSS.
  src: undefined,
  alt: 'Portrait of Ruben Verdin',
  caption: 'Fig. — R. Verdin',
  credit: '[Place, Year]',
}

export const portraitStamp: StampView = { ...contactStamp, color: 'seal' }
export const portraitPostmark: [string, string] = ['TORONTO', 'ON']

/** Placeholder — link it to a PDF later. */
export const cv = { label: '[Download CV]', to: null, arrow: '↓' } as const

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore — [one or two lines on what you did and shipped].'

export const logbook: LogEntry[] = [
  { when: '[2024] — Now', role: '[Role title]', company: '[Company or studio]', description: lorem, where: 'Toronto, CA', current: true },
  { when: '[2021] — [2024]', role: '[Role title]', company: '[Company or studio]', description: lorem, where: '[City, Country]' },
  { when: '[2018] — [2021]', role: '[Role title]', company: '[Company or studio]', description: lorem, where: '[City, Country]' },
  { when: '[2015] — [2018]', role: '[Role title]', company: '[School or first job]', description: lorem, where: 'México' },
]

/** Kicker and role come from the matching chart territory (data/site.ts). */
export const instruments: Instrument[] = [
  { territory: 'dev', items: ['Vue', 'TypeScript', '[Tool]', '[Tool]', '[Tool]'] },
  { territory: 'des', items: ['Design tokens', 'Component systems', 'Documentation', '[Tool]', '[Tool]'] },
  { territory: 'wri', items: ['Essays on craft', 'Cities & urbanism', '[Topic]', '[Topic]'] },
]

const globe = 'M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16'

export const ports: PortStamp[] = [
  { place: 'México', label: 'ORIGEN', color: 'red', icon: 'M3 20h18M5 20l3-6h8l3 6M9 14l3-8 3 8' },
  { place: 'Toronto', label: 'HOME PORT', color: 'navy', icon: 'M12 2v20M8 22h8M10 8h4M9 12h6' },
  { place: '[Place]', label: '[YEAR]', color: 'brown', icon: globe },
  { place: '[Place]', label: '[YEAR]', color: 'steel', icon: globe },
  { place: 'Next port', label: '[?]', color: 'steel', icon: 'M12 5v14M5 12h14', placeholder: true },
]
