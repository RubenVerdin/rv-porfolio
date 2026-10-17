import type { MaybeRefOrGetter } from 'vue'

/** Previous / next around `slug` in an ordered list, wrapping at the ends. */
export function usePager<T extends { slug: string }>(
  list: MaybeRefOrGetter<T[]>,
  slug: MaybeRefOrGetter<string>,
) {
  const position = computed(() => toValue(list).findIndex(item => item.slug === toValue(slug)))

  function at(offset: number) {
    const items = toValue(list)
    if (position.value < 0 || items.length < 2) return null
    return items[(position.value + offset + items.length) % items.length] ?? null
  }

  const prev = computed(() => at(-1))
  const next = computed(() => at(1))

  /** The `count` items after the current one, wrapping (for "more dispatches"). */
  function following(count: number) {
    const items = toValue(list)
    if (position.value < 0) return items.slice(0, count)
    return Array.from({ length: Math.min(count, items.length - 1) }, (_, i) =>
      items[(position.value + i + 1) % items.length]!)
  }

  return { prev, next, following }
}
