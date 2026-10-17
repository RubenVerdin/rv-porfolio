<script setup lang="ts">
import type { CrossBannerPreset } from '~/types/content'

// /work and /writing: page heading, the listing, then the cross-link
// banner to the other section.
defineProps<{
  head: {
    kicker: string
    aside?: string
    title: string
    accent?: string
    dek?: string
  }
  banner: CrossBannerPreset
  label: string
}>()
</script>

<template>
  <div class="listing-template">
    <PageHead v-bind="head" />
    <Container
      tag="section"
      class="listing-template__body"
      :aria-label="label"
    >
      <slot />
    </Container>
    <CrossBanner :banner="banner" />
  </div>
</template>

<style scoped lang="scss">
.listing-template {
  &__body {
    padding-bottom: var(--rv-space-120);
  }
}
</style>
