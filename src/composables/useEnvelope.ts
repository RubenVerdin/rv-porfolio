/**
 * The sealed envelope's state machine.
 *
 *   closed ──toggle──▶ open ──toggle──▶ closing ──(2.2s)──▶ closed
 *   static ──toggle──▶ closing            (static = open, no entrance animation)
 *
 * `closing` lasts as long as the tuck + flap + reseal animations in
 * SealedEnvelope.vue (1.6s delay + .45s reseal ≈ 2.2s).
 */
export type EnvelopeState = 'closed' | 'open' | 'closing' | 'static'

const CLOSING_MS = 2200

export function useEnvelope(options: { startOpen?: boolean } = {}) {
  const state = ref<EnvelopeState>(options.startOpen ? 'static' : 'closed')
  let timer: ReturnType<typeof setTimeout> | undefined

  const isOpen = computed(() => state.value === 'open' || state.value === 'static')

  function toggle() {
    clearTimeout(timer)
    if (isOpen.value) {
      state.value = 'closing'
      timer = setTimeout(() => {
        state.value = 'closed'
      }, CLOSING_MS)
    }
    else {
      state.value = 'open'
    }
  }

  onBeforeUnmount(() => clearTimeout(timer))

  // Bindings for the controls that drive it.
  const aria = computed(() => ({
    expanded: isOpen.value,
    hitLabel: isOpen.value ? 'Close the envelope' : 'Break the seal and open the envelope',
    buttonLabel: isOpen.value ? 'Seal it again' : 'Break the seal',
    hint: isOpen.value ? 'Click the letter to fold it back' : 'Click the seal to open',
    letterHidden: !isOpen.value,
    letterTabindex: isOpen.value ? 0 : -1,
  }))

  return { state, isOpen, toggle, aria }
}

export type Envelope = ReturnType<typeof useEnvelope>
