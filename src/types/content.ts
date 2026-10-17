// View models — what components render. Content collection items are mapped
// into these by usePlates / useDispatches; components never see raw
// collection items.

export type Edition = 'day' | 'night'

/** Primary navigation keys; a page's `section` meta highlights one. */
export type NavKey = 'home' | 'work' | 'writing' | 'about' | 'contact'

export type CompassPoint = 'N' | 'NE' | 'E' | 'SE' | 'S'

export type FooterVariant = 'back-page' | 'cta' | 'plain'

export type StampTopic = 'vue' | 'css' | 'writing' | 'systems' | 'cities'

export type StampColor = 'navy' | 'red' | 'brown' | 'steel' | 'seal'

export type PostcardGround = 'sun' | 'ruled' | 'tiles' | 'lanes'

export interface StampView {
  color: StampColor
  /** SVG path data on a 24×24 grid. */
  icon: string
  label: string
}

export interface PlateView {
  slug: string
  to: string
  /** 1-based plate number; also the atlas grid slot. */
  plate: number
  /** "Plate I." */
  label: string
  /** "01" */
  index: string
  category: string
  title: string
  description: string
  /** "Editorial design · Development · 2025" */
  meta: string
  disciplines: string[]
  year: number
  role?: string
  liveUrl?: string
  repoUrl?: string
  coverImage?: string
  coverCredit?: string
}

export interface DispatchView {
  slug: string
  to: string
  /** "No. 02" */
  number: string
  /** "0430" — month + day */
  dispatchNo: string
  title: string
  description: string
  kind: string
  /** Topic label, e.g. "CSS" */
  category: string
  featured: boolean
  /** "6 min read" */
  readTime: string
  postmark: { date: string, year: string }
  stamp: StampView
  word: string
  ground: PostcardGround
  /** Rotation in degrees, cycled by position. */
  tilt: number
  address: string[]
}

export interface Territory {
  id: 'dev' | 'des' | 'wri' | 'tra'
  numeral: string
  title: string
  region: string
  /** Cartouche kicker, e.g. "I. · Costa del Código" */
  kicker: string
  line: string
  link: { label: string, to: string }
  /** Overlay button position on the chart, in % of the map stage. */
  position: { left: number, top: number }
}

/** One destination, shown in the top nav and as a menu-letter heading. */
export interface NavItem {
  key: NavKey
  to: string
  label: string
  /** Compass point in the menu letter. */
  point: CompassPoint
  /** Menu-letter subline, e.g. "atlas of works". */
  sub: string
}

/** A row on /sitemap. */
export interface SitemapEntry {
  title: string
  note: string
  /** null = not live yet (placeholder); renders unlinked. */
  to: string | null
}

export interface NewsItem {
  label: string
  text: string
}

export interface LinkRow {
  key: string
  value: string
  /** null = not linked yet (placeholder). */
  href: string | null
  external?: boolean
}

export interface FooterLink {
  label: string
  /** null = not live yet (RSS); renders as an inert link. */
  to: string | null
}

export interface CrossBannerPreset {
  kicker: string
  title: string
  accent: string
  dek: string
  cta: string
  to: string
  words: string[]
}

/** PageHead props — shared by listing pages and content pages. */
export interface PageHeadView {
  kicker: string
  aside?: string
  title: string
  accent?: string
  dek?: string
}

// ── About ────────────────────────────────────────────────────────────

export interface AboutPortrait {
  /** Omit until the photo exists: the hatched placeholder shows instead. */
  src?: string
  alt: string
  caption: string
  credit: string
}

/** One port on the logbook route. */
export interface LogEntry {
  /** "[2024] — Now" */
  when: string
  role: string
  company: string
  description: string
  /** "Toronto, CA" */
  where: string
  /** The present port: glowing ring on the dot. */
  current?: boolean
}

/** A column of "Instruments aboard", named after a chart territory. */
export interface Instrument {
  territory: Territory['id']
  items: string[]
}

export interface InstrumentView {
  /** "I. · Costa del Código" — from the territory, so it matches the chart. */
  kicker: string
  /** "Developer" */
  role: string
  items: string[]
}

/** A "ports of call" stamp. */
export interface PortStamp extends StampView {
  place: string
  /** The dashed "Next port" stamp. */
  placeholder?: boolean
}
