<script setup lang="ts">
// The page root: the `page` container every component's container queries
// resolve against, the halftone ground, the voyage band (reading progress),
// header, and the page's closing.
const route = useRoute()
const footer = computed(() => route.meta.footer ?? 'back-page')
</script>

<template>
  <div class="page">
    <VoyageProgress />
    <SiteHeader :current="route.meta.section" />
    <main class="page__main">
      <slot />
    </main>
    <BackPage v-if="footer === 'back-page'" />
    <SiteFooter
      v-else
      :show-cta="footer === 'cta'"
    />
  </div>
</template>

<style scoped lang="scss">
.page {
  container: page / inline-size;
  min-height: 100vh;
  overflow-x: clip;
  background-color: var(--rv-color-ground);
  background-image: radial-gradient(var(--rv-color-faint) 0.6px, transparent 0.7px);
  background-size: var(--rv-texture-halftone) var(--rv-texture-halftone);
  color: var(--rv-color-ink);
  font-family: var(--rv-font-body);

  @include theme-transition(background-color, color);
}
</style>
