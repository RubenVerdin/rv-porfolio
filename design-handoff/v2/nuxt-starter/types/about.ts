// v2 — About page shapes. Add alongside types/content.ts (or merge into it).
import type { StampColor } from './content'

export interface LogEntry {
  when: string        // "[2024] — Now"
  role: string
  company: string
  description: string
  where: string       // "Toronto, CA"
  current?: boolean   // adds the glowing port ring (.log-entry.is-now)
}

export interface Instrument {
  numeral: string     // "I."
  territory: string   // "Costa del Código" — matches the homepage chart
  role: string        // "Developer"
  items: string[]
}

export interface PortStamp {
  place: string       // "México"
  label: string       // "ORIGEN", "HOME PORT", "[YEAR]"
  color: StampColor   // 'st-red' | 'st-navy' | 'st-brown' | 'st-steel'
  icon: string        // 24×24 stroke-only SVG path data
  placeholder?: boolean // dashed "Next port" stamp (.ph-next)
}

export interface AboutContent {
  portrait: { src?: string; alt: string; caption: string; credit: string }
  story: string       // markdown — rendered in .prose (lede, blockquote+cite supported)
  log: LogEntry[]
  instruments: Instrument[]
  ports: PortStamp[]
}
