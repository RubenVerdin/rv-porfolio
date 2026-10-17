// View models — what components render. Content collection items are mapped
// into these by usePlates / useDispatches; components never see raw
// collection items.

export type Edition = 'day' | 'night'

export type Section = 'home' | 'work' | 'writing' | 'contact'

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

export interface NavItem {
  label: string
  to: string
  section: Section
}

export interface MenuItem {
  point: 'N' | 'E' | 'S' | 'W'
  label: string
  aside: string
  to: string
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
  /** null = page not designed yet; renders as an inert link. */
  href: string | null
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
