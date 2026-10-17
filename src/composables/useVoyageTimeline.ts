import type { Ref } from 'vue'

/**
 * SMIL voyages (the ship riding the route on the chart and the banner).
 *
 * - SMIL timelines start at document load, so after a client-side
 *   navigation the ship would already be "arrived" while the CSS route is
 *   still drawing. Rewinding the SVG on mount keeps the two in step.
 * - CSS can't stop SMIL, so `reducedMotion` lets the template park the ship
 *   at its destination instead of animating it.
 */
export function useVoyageTimeline(svgRef: Ref<SVGSVGElement | null>) {
  const reducedMotion = ref(false)

  onMounted(() => {
    reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    svgRef.value?.setCurrentTime?.(0)
  })

  return { reducedMotion }
}
