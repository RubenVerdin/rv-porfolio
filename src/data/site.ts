import type {
  CrossBannerPreset,
  LinkRow,
  NewsItem,
  Territory,
} from '~/types/content'

// Single-instance layout copy (same rule as v1's data/portfolio.ts: prose
// lives in markdown, layout copy lives here). Copy is from the design;
// `[bracketed]` values are the design's placeholders — don't invent them.

export const name = 'Ruben Verdin'
export const signature = 'R. Verdin'
export const city = 'Toronto'
export const edition = 'v2.0.0'
export const intro
  = 'Mexican-born developer and designer in Toronto. I build front-ends that feel considered, design the systems that keep them consistent, and write about the craft between.'

// Real details carried over from v1 (data/portfolio.ts).
export const email = 'contact@rubenverdin.com'
export const linkedin = { handle: 'ruben-verdin', url: 'https://www.linkedin.com/in/ruben-verdin' }
export const github = { handle: 'RubenVerdin', url: 'https://github.com/RubenVerdin' }

/** The third item ("Off the press") is filled from the lead dispatch. */
export const news: NewsItem[] = [
  { label: 'Now booking', text: 'Available for new projects & collaborations' },
  { label: 'Home port', text: 'Toronto, Ontario' },
]

export const territories: Territory[] = [
  {
    id: 'dev',
    numeral: 'I.',
    title: 'Developer',
    region: 'Costa del Código',
    kicker: 'I. · Costa del Código',
    line: 'I build front-ends that feel considered — Vue, TypeScript, the details.',
    link: { label: 'See the work', to: '/work' },
    position: { left: 20, top: 25 },
  },
  {
    id: 'des',
    numeral: 'II.',
    title: 'Designer',
    region: 'Islas del Diseño',
    kicker: 'II. · Islas del Diseño',
    line: 'I design the systems that keep them consistent — tokens, components, docs.',
    link: { label: 'Open the atlas', to: '/work' },
    position: { left: 87, top: 46 },
  },
  {
    id: 'wri',
    numeral: 'III.',
    title: 'Writer',
    region: 'Bahía de las Letras',
    kicker: 'III. · Bahía de las Letras',
    line: 'I write about the craft between the two — essays on code, design & cities.',
    link: { label: 'Read the dispatches', to: '/writing' },
    position: { left: 82, top: 82 },
  },
  {
    id: 'tra',
    numeral: 'IV.',
    title: 'Traveler',
    region: 'Tierra Natal',
    kicker: 'IV. · Tierra Natal · México',
    line: 'Born in Mexico, anchored in Toronto. [Places you’ve been, or where you’re headed next.]',
    link: { label: 'Notes from the road', to: '/writing' },
    position: { left: 18, top: 77 },
  },
]

export const chartCaption = {
  title: 'Carta Itineraria — de México a Toronto, Anno MMXXVI',
  scale: 'Scale: 1 commit ≈ 1 league',
  howTo: 'How to read this chart',
  hint: 'Click a territory to see what I do there.',
  tapHint: 'Tap a territory to see what I do there.',
  emptyTitle: 'Four territories, one voyage.',
  emptyLine: 'Choose a territory on the chart above to see what I do there.',
}

/** The letter inside every envelope. */
export const letterRows: LinkRow[] = [
  { key: 'Email', value: email, href: `mailto:${email}` },
  { key: 'LinkedIn', value: `/in/${linkedin.handle} ↗`, href: linkedin.url, external: true },
  { key: 'GitHub', value: `@${github.handle} ↗`, href: github.url, external: true },
  { key: 'Instagram', value: '@[handle] ↗', href: null },
]

/** The address side of the contact postcard. */
export const contactRows: LinkRow[] = [
  { key: 'Find me', value: 'Toronto, Ontario', href: null },
  { key: 'Originally', value: 'México', href: null },
  { key: 'Call me', value: '[+1 (000) 000-0000]', href: null },
  { key: 'Write me', value: email, href: `mailto:${email}` },
  { key: 'Hours', value: '[Mon–Fri] · Eastern Time', href: null },
]

export const colophon
  = 'Set in IM Fell English, Newsreader, Antonio & IBM Plex Mono. Independent views on software, design, and urbanism. Content is for general information, not professional advice.'

export const crossBanners: Record<'toWriting' | 'toWork', CrossBannerPreset> = {
  toWriting: {
    kicker: 'Next port · Correspondence',
    title: 'Read the',
    accent: 'dispatches.',
    dek: 'Essays on craft & cities — sent from Toronto.',
    cta: 'Open the correspondence',
    to: '/writing',
    words: ['Correspondence', 'essays', 'Dispatches', 'notes'],
  },
  toWork: {
    kicker: 'Next port · The Atlas of Works',
    title: 'See the',
    accent: 'atlas.',
    dek: 'Good ideas, carefully made — every project catalogued as a plate.',
    cta: 'Open the atlas',
    to: '/work',
    words: ['The Atlas', 'plates', 'Projects', 'works'],
  },
}
