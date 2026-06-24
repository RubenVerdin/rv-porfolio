export type Theme = 'light' | 'dark' | 'paper'

const THEMES: Theme[] = ['light', 'dark', 'paper']

const FONTS = [
  { name: 'Sans',  stack: 'var(--rv-font-sans)' },
  { name: 'Serif', stack: "'Lora', Georgia, 'Times New Roman', serif" },
  { name: 'Mono',  stack: 'var(--rv-font-mono)' },
] as const

const LANGS = ['en', 'es'] as const

export const useSettings = () => {
  const theme   = useState<Theme>('pf:theme',   () => 'dark')
  const fontIdx = useState<number>('pf:fontIdx', () => 0)
  const langIdx = useState<number>('pf:langIdx', () => 0)

  const effectiveTheme = computed<Theme>(() => {
    if (THEMES.includes(theme.value)) return theme.value
    if (import.meta.client && window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })

  function applyToDOM() {
    if (!import.meta.client) return
    const root = document.querySelector<HTMLElement>('.rv-app')
    if (!root) return
    root.setAttribute('data-theme', effectiveTheme.value)
    const font = FONTS[fontIdx.value % FONTS.length]
    if (fontIdx.value !== 0) {
      root.style.fontFamily = font.stack
      root.style.setProperty('--pf-serif', font.stack)
    } else {
      root.style.fontFamily = ''
      root.style.setProperty('--pf-serif', "'Lora', Georgia, 'Times New Roman', serif")
    }
  }

  function loadFromStorage() {
    if (!import.meta.client) return
    try {
      const t = localStorage.getItem('rvpf-theme') as Theme | null
      if (t && THEMES.includes(t)) theme.value = t
      const f = parseInt(localStorage.getItem('rvpf-font') ?? '0', 10)
      if (!isNaN(f)) fontIdx.value = Math.abs(f % FONTS.length)
      const l = localStorage.getItem('rvpf-lang') ?? 'en'
      const li = LANGS.indexOf(l as 'en' | 'es')
      if (li !== -1) langIdx.value = li
    } catch {}
  }

  function cycleTheme() {
    const idx  = THEMES.indexOf(effectiveTheme.value)
    const next = THEMES[(idx + 1) % THEMES.length]
    theme.value = next
    try { localStorage.setItem('rvpf-theme', next) } catch {}
    applyToDOM()
  }

  function cycleFont() {
    fontIdx.value = (fontIdx.value + 1) % FONTS.length
    try { localStorage.setItem('rvpf-font', String(fontIdx.value)) } catch {}
    applyToDOM()
  }

  function cycleLang() {
    langIdx.value = (langIdx.value + 1) % LANGS.length
    try { localStorage.setItem('rvpf-lang', LANGS[langIdx.value]) } catch {}
  }

  const themeLabel = computed(() =>
    ({ light: 'Light', dark: 'Dark', paper: 'Paper' }[effectiveTheme.value])
  )
  const fontName = computed(() => FONTS[fontIdx.value % FONTS.length].name)
  const langLabel = computed(() => (LANGS[langIdx.value] === 'en' ? 'English' : 'Español'))
  const langFlag  = computed(() => (LANGS[langIdx.value] === 'en' ? '🇺🇸' : '🇲🇽'))

  return {
    theme, fontIdx, langIdx, effectiveTheme,
    themeLabel, fontName, langLabel, langFlag,
    cycleTheme, cycleFont, cycleLang,
    applyToDOM, loadFromStorage,
  }
}
