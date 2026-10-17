import type { FooterLink, NavItem, SitemapEntry } from '~/types/content'

// Single source for every navigation surface (v2 handoff, nav.ts):
// SiteHeader's top nav, the MenuLetter, the footer colophon and /sitemap.

/** Top nav + menu letter, in design order. */
export const primaryNav: NavItem[] = [
  { key: 'home', to: '/', label: 'Home', point: 'N', sub: 'the chart' },
  { key: 'work', to: '/work', label: 'Work', point: 'NE', sub: 'atlas of works' },
  { key: 'writing', to: '/writing', label: 'Writing', point: 'E', sub: 'correspondence' },
  { key: 'about', to: '/about', label: 'About', point: 'SE', sub: 'the correspondent' },
  { key: 'contact', to: '/contact', label: 'Contact', point: 'S', sub: 'the back page' },
]

/**
 * /sitemap — one flat list, numbered 01–08. Detail pages are deliberately
 * not listed. RSS stays unlinked until a feed exists (`[Feed URL]`).
 */
export const sitemapPages: SitemapEntry[] = [
  { to: '/', title: 'Home', note: 'The chart · what I do' },
  { to: '/work', title: 'Work', note: 'The Atlas of Works' },
  { to: '/writing', title: 'Writing', note: 'Correspondence' },
  { to: '/about', title: 'About', note: 'The correspondent' },
  { to: '/contact', title: 'Contact', note: 'Let’s work together' },
  { to: '/privacy', title: 'Privacy', note: 'The fine print' },
  { to: '/sitemap', title: 'Sitemap', note: 'You are here' },
  { to: null, title: 'RSS', note: '[Feed URL]' },
]

/** Colophon links (SiteFooter, also inside BackPage). */
export const footerLinks: FooterLink[] = [
  // TODO: point at /rss.xml once a feed exists.
  { label: 'RSS', to: null },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Sitemap', to: '/sitemap' },
]
