import { city, edition } from '~/data/site'

/**
 * "Edition v2.0.0 · Toronto · Saturday, October 17, 2026".
 *
 * Prerendered pages carry the build date; the client swaps in today's date
 * after hydration (plugins/edition.client.ts) so there is no mismatch.
 */
export function useEditionLine() {
  const today = useState<string>('rv:today', () => new Date().toISOString())

  const date = computed(() => editionDate(today.value))
  const line = computed(() => `Edition ${edition} · ${city} · ${date.value}`)

  return { date, line }
}

export function refreshEditionDate() {
  useState<string>('rv:today').value = new Date().toISOString()
}
