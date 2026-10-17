import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  srcDir: 'src/',
  modules: ['@nuxt/eslint', '@nuxt/content'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  devServer: {
    port: 3000,
  },

  content: {
    // Code blocks use the design's two-tone telegram palette (ProsePre), and
    // headings are plain type, not anchor links.
    build: { markdown: { highlight: false } },
    renderer: { anchorLinks: false },
  },

  typescript: {
    strict: true,
    // The handoff's starter .ts files are reference material, not app code.
    tsConfig: { exclude: ['../design-handoff'] },
  },

  // Atomic folders (atoms/molecules/organisms/templates) are organisational
  // only — components register by file name, so names must be unique.
  // `content/` holds the Prose* overrides and MDC components Nuxt Content
  // renders from markdown; those have to be global.
  components: [
    { path: '~/components/content', global: true, pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  // `dir.public` alone doesn't reliably wire Nitro's public-asset serving
  // through to either `nuxt dev` or `nuxt generate` when combined with a
  // custom srcDir on this Nuxt/Nitro/Vite version — confirmed by testing in
  // v1: /favicon.svg 404s in dev AND is missing from .output/public with only
  // `dir.public` set. Registering it directly on Nitro is the version that
  // actually works in both.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
    publicAssets: [
      { dir: fileURLToPath(new URL('./src/public', import.meta.url)) },
    ],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/mixins" as *;',
        },
      },
    },
  },

  css: ['~/assets/styles/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ruben Verdin — Developer & Designer',
      meta: [
        { name: 'description', content: 'Mexican-born developer and designer in Toronto. Front-ends, design systems, and writing about the craft between.' },
        // Both editions are supported; the browser picks form controls to match.
        { name: 'color-scheme', content: 'light dark' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Antonio:wght@500;700&family=IBM+Plex+Mono:wght@400;500&family=IM+Fell+English:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap',
        },
      ],
      script: [
        {
          // First-paint edition. No attribute = follow the device setting
          // (CSS prefers-color-scheme). Same key as useEdition().
          innerHTML: `(() => {
            try {
              const saved = localStorage.getItem('rv-edition');
              if (saved === 'day' || saved === 'night') document.documentElement.setAttribute('data-theme', saved);
            } catch {}
          })();`,
        },
      ],
    },
  },
})
