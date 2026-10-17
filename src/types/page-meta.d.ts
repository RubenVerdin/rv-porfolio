import type { FooterVariant, Section } from './content'

declare module '#app' {
  interface PageMeta {
    /** Highlights the matching nav link in SiteHeader. */
    section?: Section
    /** Which closing the default layout renders. Defaults to 'back-page'. */
    footer?: FooterVariant
  }
}

export {}
