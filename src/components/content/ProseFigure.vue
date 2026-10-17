<script setup lang="ts">
// Markdown figure (MDC):
//   ::prose-figure{caption="Fig. 1 — The grid" credit="Photo: R. Verdin" src="/images/x.jpg"}
//   ::
// Without `src` it renders the design's hatched placeholder.
withDefaults(defineProps<{
  caption: string
  credit?: string
  src?: string
  alt?: string
  placeholder?: string
}>(), {
  credit: undefined,
  src: undefined,
  alt: '',
  placeholder: '[ Image · 3:2 ]',
})
</script>

<template>
  <figure class="prose-figure">
    <PlateImage
      :src="src"
      :alt="alt"
      :placeholder="placeholder"
      aspect="3 / 2"
    />
    <figcaption class="prose-figure__caption">
      <span>{{ caption }}</span>
      <span v-if="credit">{{ credit }}</span>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.prose-figure {
  margin-block: var(--rv-space-52);

  &__caption {
    display: flex;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-top: var(--rv-space-10);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-12);
    line-height: var(--rv-leading-150);
    letter-spacing: var(--rv-tracking-8);
    color: var(--rv-color-ink-muted);
  }
}

@include page-below(xs) {
  .prose-figure {
    margin-block: var(--rv-space-40);
  }
}
</style>
