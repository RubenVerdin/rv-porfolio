import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  alias: {
    'rv-design': fileURLToPath(new URL('./node_modules/rv-design/src/index.ts', import.meta.url)),
  },

  css: ['~/assets/styles/portfolio.scss'],

  app: {
    head: {
      title: 'Ruben Verdin — Frontend Engineer',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      style: [
        { children: 'html { scroll-behavior: smooth; } body { margin: 0; } *::selection { background: var(--rv-accent-subtle); }' },
      ],
    },
  },
})
