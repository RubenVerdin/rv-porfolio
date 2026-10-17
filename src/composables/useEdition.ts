import type { Edition } from '~/types/content'

const STORAGE_KEY = 'rv-edition'
const DARK_QUERY = '(prefers-color-scheme: dark)'

/**
 * Day / Night edition.
 *
 * Follows the device setting until the reader picks one; a pick is saved and
 * wins from then on (decision 2026-10-17). The <html data-theme> attribute is
 * only set for a saved pick — without it, CSS follows prefers-color-scheme,
 * so prerendered pages paint correctly before any JS runs.
 */
export function useEdition() {
  const saved = useState<Edition | null>('rv:edition-saved', () => null)
  const device = useState<Edition>('rv:edition-device', () => 'day')

  const edition = computed<Edition>(() => saved.value ?? device.value)
  const isNight = computed(() => edition.value === 'night')

  function setEdition(value: Edition) {
    saved.value = value
    if (!import.meta.client) return
    document.documentElement.setAttribute('data-theme', value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    }
    catch {
      // Storage blocked (private mode) — the choice still applies this visit.
    }
  }

  function toggle() {
    setEdition(isNight.value ? 'day' : 'night')
  }

  return { edition, isNight, setEdition, toggle }
}

/**
 * Reads the saved choice and the device setting, and keeps following the
 * device. Called once from plugins/edition.client.ts after hydration so the
 * server-rendered toggle state never mismatches.
 */
export function initEdition() {
  const saved = useState<Edition | null>('rv:edition-saved', () => null)
  const device = useState<Edition>('rv:edition-device', () => 'day')

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'day' || stored === 'night') saved.value = stored
  }
  catch {
    // Storage blocked — fall back to the device setting.
  }

  const query = window.matchMedia(DARK_QUERY)
  device.value = query.matches ? 'night' : 'day'
  query.addEventListener('change', (event) => {
    device.value = event.matches ? 'night' : 'day'
  })
}
