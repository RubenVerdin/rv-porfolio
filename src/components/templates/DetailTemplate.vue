<script setup lang="ts">
// /work/[slug] and /writing/[slug]: head, optional media, the prose body,
// then whatever follows the article (pager, more dispatches).
withDefaults(defineProps<{
  /** `airy` under a cover image (work); `snug` straight after the head (writing). */
  spacing?: 'airy' | 'snug'
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
      padding-bottom: var(--rv-space-100);
    }

    &--snug {
      padding-top: var(--rv-space-40);
      padding-bottom: var(--rv-space-80);
    }
  }
}
</style>
