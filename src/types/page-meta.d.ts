import type { FooterVariant, NavKey } from './content'

declare module '#app' {
  interface PageMeta {
    /** Highlights the matching nav link in SiteHeader; omit to highlight none. */
    section?: NavKey
    /** Which closing the default layout renders. Defaults to 'back-page'. */
    footer?: FooterVariant
  }
}

export {}
