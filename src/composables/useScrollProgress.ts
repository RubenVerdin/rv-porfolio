/**
 * Reading progress for the voyage band (VoyageProgress).
 *
 * - `progress`: 0 → 1 down the window's scroll.
 * - `shown`: true once the reader has scrolled past `revealAfter` px, so
 *   the band never appears while the header is still on screen, and leaves
 *   again on the way back up before the header returns.
 * - `docked`: the reader has reached the bottom (the port pulses).
 *
 * The scroll position is read at most once per frame from passive
 * listeners. The server renders the hidden state (progress 0), so there is
 * nothing to mismatch on hydration.
 */
const DOCKED_AT = 0.995

export function useScrollProgress(options: { revealAfter?: number } = {}) {
  // The design reveals the band 88px down: just past the header (~70px).
  const revealAfter = options.revealAfter ?? 88

  const progress = ref(0)
  const shown = ref(false)
  const docked = computed(() => progress.value >= DOCKED_AT)

  let frame = 0

  function measure() {
    frame = 0
    const root = document.scrollingElement ?? document.documentElement
    const max = root.scrollHeight - root.clientHeight
    const top = root.scrollTop
    progress.value = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0
    shown.value = max > 0 && top > revealAfter
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  // A client-side navigation swaps the page (and its height) without
  // necessarily firing a scroll event.
  const route = useRoute()
  watch(() => route.fullPath, () => nextTick(schedule))

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    measure()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    cancelAnimationFrame(frame)
  })

  return { progress, shown, docked }
}
