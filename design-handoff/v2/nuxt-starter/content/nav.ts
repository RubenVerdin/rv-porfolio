// v2 — single source for every navigation surface.
// Used by: HomeTopBar, SiteHeader (top nav), MenuLetter (compass letter), SitemapPage.

export type NavKey = 'home' | 'work' | 'writing' | 'about' | 'contact'

/** Top nav + menu letter. Order is the design order. */
export const primaryNav = [
  { key: 'home',    to: '/',        label: 'Home',    point: 'N',  sub: 'the chart' },
  { key: 'work',    to: '/work',    label: 'Work',    point: 'NE', sub: 'atlas of works' },
  { key: 'writing', to: '/writing', label: 'Writing', point: 'E',  sub: 'correspondence' },
  { key: 'about',   to: '/about',   label: 'About',   point: 'SE', sub: 'the correspondent' },
  { key: 'contact', to: '/contact', label: 'Contact', point: 'S',  sub: 'the back page' },
] as const satisfies ReadonlyArray<{ key: NavKey; to: string; label: string; point: string; sub: string }>

/** /sitemap — one flat list, numbered 01–08. Detail pages are NOT listed (they live in sitemap.xml). */
export const sitemapPages = [
  { to: '/',        title: 'Home',    note: 'The chart · what I do' },
  { to: '/work',    title: 'Work',    note: 'The Atlas of Works' },
  { to: '/writing', title: 'Writing', note: 'Correspondence' },
  { to: '/about',   title: 'About',   note: 'The correspondent' },
  { to: '/contact', title: 'Contact', note: 'Let’s work together' },
  { to: '/privacy', title: 'Privacy', note: 'The fine print' },
  { to: '/sitemap', title: 'Sitemap', note: 'You are here' },
  { to: '/rss.xml', title: 'RSS',     note: '[Feed URL]', external: true },
] as const

/** Colophon links (SiteFooter + BackPage). v1 had these pointing to '#'. */
export const footerLinks = [
  { to: '/rss.xml', label: 'RSS', external: true },
  { to: '/privacy', label: 'Privacy' },
  { to: '/sitemap', label: 'Sitemap' },
] as const
