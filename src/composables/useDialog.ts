import type { Ref } from 'vue'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal dialog behaviour: Esc to close, focus trap, body scroll lock,
 * focus returned to the trigger, and close on navigation.
 */
export function useDialog(dialogRef: Ref<HTMLElement | null>) {
  const isOpen = ref(false)
  const route = useRoute()
  let returnFocusTo: HTMLElement | null = null

  function focusables() {
    return Array.from(dialogRef.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
  }

  /** Pass the trigger: not every browser focuses a button on click (Safari). */
  function open(trigger?: EventTarget | null) {
    const fallback = document.activeElement
    returnFocusTo = trigger instanceof HTMLElement
      ? trigger
      : fallback instanceof HTMLElement ? fallback : null
    isOpen.value = true
    nextTick(() => focusables()[0]?.focus())
  }

  function close({ restoreFocus = true } = {}) {
    if (!isOpen.value) return
    isOpen.value = false
    if (restoreFocus) returnFocusTo?.focus()
    returnFocusTo = null
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab') return

    const items = focusables()
    if (!items.length) return
    const first = items[0]!
    const last = items[items.length - 1]!
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }
    else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function lockScroll(locked: boolean) {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
  }

  watch(isOpen, (value) => {
    if (!import.meta.client) return
    lockScroll(value)
    if (value) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
  })

  // Following a menu link navigates; focus belongs to the new page then.
  watch(() => route.fullPath, () => close({ restoreFocus: false }))

  onBeforeUnmount(() => {
    if (!import.meta.client) return
    document.removeEventListener('keydown', onKeydown)
    lockScroll(false)
  })

  return { isOpen, open, close }
}
