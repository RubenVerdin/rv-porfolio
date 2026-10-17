<script setup lang="ts">
import { sitemapPages } from '~/data/nav'

// Every top-level page in one flat list. Detail pages are deliberately not
// listed here (they'd swamp the page).
definePageMeta({ footer: 'back-page' })

useSeoMeta({
  title: 'Sitemap — Ruben Verdin',
  description: 'Every page on this site, in one list.',
})
</script>

<template>
  <div class="sitemap">
    <PageHead
      kicker="The Index"
      aside="Every page, in one place"
      title="The"
      accent="Sitemap."
      dek="Every page on this site, in one list."
    />
    <Container
      tag="section"
      class="sitemap__section"
      aria-label="All pages"
    >
      <PageIndex :entries="sitemapPages" />
    </Container>
  </div>
</template>

<style scoped lang="scss">
.sitemap {
  &__section {
    padding-bottom: var(--rv-space-120);
  }
}
</style>
