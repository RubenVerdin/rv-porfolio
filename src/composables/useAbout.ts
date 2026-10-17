import type { InstrumentView } from '~/types/content'
import { instruments, ports } from '~/data/about'
import { territories } from '~/data/site'

/**
 * About page view models. Instruments and the ports kicker are named after
 * the homepage chart's territories, so the two pages never drift apart.
 */
export function useAbout() {
  const territoryOf = (id: string) => territories.find(territory => territory.id === id)

  const instrumentViews: InstrumentView[] = instruments.flatMap((instrument) => {
    const territory = territoryOf(instrument.territory)
    if (!territory) return []
    return [{
      kicker: `${territory.numeral} · ${territory.region}`,
      role: territory.title,
      items: instrument.items,
    }]
  })

  // "IV. · Tierra Natal — Ports of call"
  const traveler = territoryOf('tra')
  const portsKicker = traveler
    ? `${traveler.numeral} · ${traveler.region} — Ports of call`
    : 'Ports of call'

  return { instruments: instrumentViews, ports, portsKicker }
}
