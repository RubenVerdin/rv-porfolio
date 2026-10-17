// v2 — About page content. Bracketed values and lorem are placeholders; Ruben will replace them.
import type { AboutContent } from '../types/about'

const globe = 'M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16'
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore — [one or two lines on what you did and shipped].'

export const about: AboutContent = {
  portrait: { src: undefined, alt: 'Portrait of Ruben Verdin', caption: 'Fig. — R. Verdin', credit: '[Place, Year]' },
  story: '', // lorem in About.dc.html until real copy exists
  log: [
    { when: '[2024] — Now',      role: '[Role title]', company: '[Company or studio]', description: lorem, where: 'Toronto, CA', current: true },
    { when: '[2021] — [2024]',   role: '[Role title]', company: '[Company or studio]', description: lorem, where: '[City, Country]' },
    { when: '[2018] — [2021]',   role: '[Role title]', company: '[Company or studio]', description: lorem, where: '[City, Country]' },
    { when: '[2015] — [2018]',   role: '[Role title]', company: '[School or first job]', description: lorem, where: 'México' },
  ],
  instruments: [
    { numeral: 'I.',   territory: 'Costa del Código',    role: 'Developer', items: ['Vue', 'TypeScript', '[Tool]', '[Tool]', '[Tool]'] },
    { numeral: 'II.',  territory: 'Islas del Diseño',    role: 'Designer',  items: ['Design tokens', 'Component systems', 'Documentation', '[Tool]', '[Tool]'] },
    { numeral: 'III.', territory: 'Bahía de las Letras', role: 'Writer',    items: ['Essays on craft', 'Cities & urbanism', '[Topic]', '[Topic]'] },
  ],
  ports: [
    { place: 'México',    label: 'ORIGEN',    color: 'st-red',   icon: 'M3 20h18M5 20l3-6h8l3 6M9 14l3-8 3 8' },
    { place: 'Toronto',   label: 'HOME PORT', color: 'st-navy',  icon: 'M12 2v20M8 22h8M10 8h4M9 12h6' },
    { place: '[Place]',   label: '[YEAR]',    color: 'st-brown', icon: globe },
    { place: '[Place]',   label: '[YEAR]',    color: 'st-steel', icon: globe },
    { place: 'Next port', label: '[?]',       color: 'st-steel', icon: 'M12 5v14M5 12h14', placeholder: true },
  ],
}
