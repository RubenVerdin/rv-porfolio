import { territories } from '~/data/site'
import type { Territory } from '~/types/content'

export type TerritoryId = Territory['id']
export type TerritoryState = 'active' | 'dim' | 'idle'

/**
 * Homepage sea chart: which territory is selected and what that means for
 * every layer (land, bearing line, port pulse, buttons, cartouche).
 */
export function useVoyageChart() {
  const selectedId = ref<TerritoryId | null>(null)

  const selected = computed(() =>
    territories.find(territory => territory.id === selectedId.value) ?? null)

  /** Selecting the chosen territory again clears it. */
  function select(id: TerritoryId) {
    selectedId.value = selectedId.value === id ? null : id
  }

  function clear() {
    selectedId.value = null
  }

  function stateOf(id: TerritoryId): TerritoryState {
    if (!selectedId.value) return 'idle'
    return selectedId.value === id ? 'active' : 'dim'
  }

  function isActive(id: TerritoryId) {
    return selectedId.value === id
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && selectedId.value) clear()
  }

  return { territories, selectedId, selected, select, clear, stateOf, isActive, onKeydown }
}
