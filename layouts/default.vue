<script setup lang="ts">
import { name, email, mailtoHref, socials, year } from '~/data/portfolio'

const route    = useRoute()
const settings = useSettings()
const { ctaTitle, ctaText } = usePageMeta()

const settingsOpen = ref(false)
const navOpen      = ref(false)

const navLinks = [
  { key: 'index',   label: 'Home',    to: '/' },
  { key: 'work',    label: 'Work',    to: '/work' },
  { key: 'writing', label: 'Writing', to: '/writing' },
  { key: 'about',   label: 'About',   to: '/about' },
  { key: 'contact', label: 'Contact', to: '/contact' },
]

const isHome = computed(() => route.name === 'index')

const dateStr = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).toUpperCase()
)

const isActive = (key: string) => {
  const n = route.name?.toString() ?? ''
  return n === key || n.startsWith(key + '-')
}

onMounted(() => {
  settings.loadFromStorage()
  settings.applyToDOM()

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { settingsOpen.value = false; navOpen.value = false }
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})

watch([settings.theme, settings.fontIdx], () => settings.applyToDOM())

// ─── Icons ────────────────────────────────────────────────────
const themeIcons: Record<string, string> = {
  light: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  dark:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>`,
  paper: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>`,
}
</script>

<template>
  <div class="rv-app">
    <!-- ===== MASTHEAD ===== -->
    <header class="masthead">
      <!-- Utility bar -->
      <div class="masthead__bar">
        <div class="masthead__bar-inner container">
          <span class="masthead__date">{{ dateStr }}</span>
          <div class="masthead__controls">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.url"
              :target="s.url.startsWith('http') ? '_blank' : undefined"
              :rel="s.url.startsWith('http') ? 'noopener noreferrer' : undefined"
              :aria-label="s.label"
              class="masthead__icon-btn"
              v-html="s.icon"
            />
            <span class="masthead__divider" aria-hidden="true"></span>
            <button
              class="masthead__icon-btn"
              aria-label="Reader settings"
              :aria-expanded="settingsOpen"
              @click="settingsOpen = !settingsOpen; navOpen = false"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
              </svg>
            </button>
            <button
              class="masthead__icon-btn masthead__hamburger"
              aria-label="Open menu"
              :aria-expanded="navOpen"
              @click="navOpen = !navOpen; settingsOpen = false"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Home nameplate -->
      <template v-if="isHome">
        <div class="masthead__home container">
          <NuxtLink to="/" class="masthead__nameplate-link">
            <h1 class="masthead__nameplate">{{ name }}</h1>
          </NuxtLink>
          <p class="masthead__tagline">Frontend Developer · Designer</p>
        </div>
        <nav class="masthead-nav masthead-nav--home masthead-nav--desktop container" aria-label="Primary navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="masthead-nav__link"
            :class="{ 'masthead-nav__link--active': isActive(link.key) }"
          >{{ link.label }}</NuxtLink>
        </nav>
      </template>

      <!-- Compact inner-page header -->
      <template v-else>
        <div class="masthead__compact container">
          <NuxtLink to="/" class="masthead__brand">
            <span class="masthead__brand-name">{{ name }}</span>
            <span class="masthead__brand-tagline">Frontend Developer</span>
          </NuxtLink>
          <nav class="masthead-nav masthead-nav--compact masthead-nav--desktop" aria-label="Primary navigation">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.key"
              :to="link.to"
              class="masthead-nav__link"
              :class="{ 'masthead-nav__link--active': isActive(link.key) }"
            >{{ link.label }}</NuxtLink>
          </nav>
        </div>
      </template>

      <div class="masthead__rule container" aria-hidden="true"></div>
    </header>

    <!-- ===== MOBILE NAV DRAWER ===== -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="navOpen" class="nav-drawer">
          <div class="nav-drawer__overlay" @click="navOpen = false"></div>
          <div class="nav-drawer__panel">
            <div class="nav-drawer__head">
              <span class="nav-drawer__name">{{ name }}</span>
              <button class="nav-drawer__close" aria-label="Close menu" @click="navOpen = false">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <nav class="nav-drawer__list" aria-label="Mobile navigation">
              <NuxtLink
                v-for="(link, i) in navLinks"
                :key="link.key"
                :to="link.to"
                class="nav-drawer__item"
                @click="navOpen = false"
              >
                <span class="nav-drawer__num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="nav-drawer__label">{{ link.label }}</span>
              </NuxtLink>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ===== SETTINGS DROPDOWN ===== -->
    <Teleport to="body">
      <Transition name="settings">
        <div v-if="settingsOpen" class="settings-wrap">
          <div class="settings-wrap__overlay" @click="settingsOpen = false"></div>
          <div class="settings-panel" role="dialog" aria-label="Reader settings">
            <div class="settings-panel__head">
              <span class="settings-panel__title">Settings</span>
              <span class="settings-panel__sub">Reader</span>
            </div>

            <button class="settings-panel__row" @click="settings.cycleTheme()">
              <span class="settings-panel__label">Appearance</span>
              <span class="settings-panel__value">
                <span class="settings-panel__icon" v-html="themeIcons[settings.effectiveTheme.value]"></span>
                {{ settings.themeLabel.value }}
              </span>
            </button>

            <button class="settings-panel__row" @click="settings.cycleFont()">
              <span class="settings-panel__label">Body type</span>
              <span class="settings-panel__value">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 7V5h16v2"/><path d="M9 19h6"/><path d="M12 5v14"/>
                </svg>
                {{ settings.fontName.value }}
              </span>
            </button>

            <button class="settings-panel__row" @click="settings.cycleLang()">
              <span class="settings-panel__label">Language</span>
              <span class="settings-panel__value">
                {{ settings.langFlag.value }} {{ settings.langLabel.value }}
              </span>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ===== PAGE CONTENT ===== -->
    <main class="site-main">
      <slot />
    </main>

    <!-- ===== CONTACT CTA BAND ===== -->
    <section class="cta-band" aria-label="Contact call to action">
      <div class="cta-band__rule container" aria-hidden="true"></div>
      <div class="cta-band__inner container">
        <div class="cta-band__group">
          <span class="cta-band__icon" aria-hidden="true">
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
            </svg>
          </span>
          <div class="cta-band__text">
            <h2 class="cta-band__title">{{ ctaTitle }}</h2>
            <p class="cta-band__body">{{ ctaText }}</p>
          </div>
        </div>
        <InkButton to="/contact" variant="solid" class="cta-band__btn">
          Get in touch
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </InkButton>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="site-footer">
      <div class="site-footer__rule container" aria-hidden="true"></div>
      <div class="site-footer__inner container">
        <span class="site-footer__copy">© {{ year }} {{ name }}. All rights reserved.</span>
        <nav class="site-footer__links" aria-label="Footer navigation">
          <NuxtLink to="/sitemap" class="site-footer__link">Sitemap</NuxtLink>
          <a href="#" class="site-footer__link">Privacy</a>
          <a href="#" class="site-footer__link">RSS</a>
        </nav>
      </div>
    </footer>
  </div>
</template>
