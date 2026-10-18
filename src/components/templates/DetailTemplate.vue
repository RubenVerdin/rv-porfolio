<script setup lang="ts">
// /work/[slug], /writing/[slug] and content pages: head, optional media,
// the prose body, then whatever follows the article (pager, more dispatches).
withDefaults(defineProps<{
  /**
   * `airy` under a cover image (work); `snug` straight after the head
   * (writing); `flush` right under a PageHead (content pages).
   */
  spacing?: 'airy' | 'snug' | 'flush'
}>(), {
  spacing: 'airy',
})
</script>

<template>
  <article class="detail-template">
    <slot name="head" />
    <slot name="media" />
    <Container
      class="detail-template__body"
      :class="`detail-template__body--${spacing}`"
    >
      <slot />
    </Container>
  </article>
  <slot name="after" />
</template>

<style scoped lang="scss">
.detail-template {
  &__body {
    &--airy {
      padding-top: var(--rv-space-80);
      padding-bottom: var(--rv-space-96);
    }

    &--snug {
      padding-top: var(--rv-space-40);
      padding-bottom: var(--rv-space-80);
    }

    &--flush {
      padding-top: var(--rv-space-8);
      padding-bottom: var(--rv-space-120);
    }
  }
}
</style>
