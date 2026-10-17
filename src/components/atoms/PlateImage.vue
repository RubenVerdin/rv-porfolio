<script setup lang="ts">
// Hatched "plate" image frame. Shows the image when there is one, otherwise
// the design's labelled placeholder. Parents can drive:
//   --plate-image-min-height  minimum height when filling a flex column
//   --plate-image-zoom        scale applied to the content (plate hover)
withDefaults(defineProps<{
  src?: string
  alt?: string
  placeholder?: string
  /** CSS aspect-ratio, e.g. "16 / 9". Omit to fill the parent. */
  aspect?: string
}>(), {
  src: undefined,
  alt: '',
  placeholder: '[ Image ]',
  aspect: undefined,
})
</script>

<template>
  <div
    class="plate-image"
    :class="{ 'plate-image--fixed': aspect }"
    :style="aspect ? { aspectRatio: aspect } : undefined"
  >
    <img
      v-if="src"
      class="plate-image__img"
      :src="src"
      :alt="alt"
      loading="lazy"
    >
    <div
      v-else
      class="plate-image__placeholder"
    >
      <span class="plate-image__label">{{ placeholder }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plate-image {
  position: relative;
  flex: 1;
  min-height: var(--plate-image-min-height, 220px);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  overflow: hidden;
  background-color: var(--rv-color-chart);
  background-image:
    repeating-linear-gradient(45deg, var(--rv-color-hatch) 0 1px, transparent 1px 7px),
    repeating-linear-gradient(-45deg, var(--rv-color-faint) 0 1px, transparent 1px 7px);

  @include theme-transition(background-color);

  &::after {
    content: '';
    position: absolute;
    inset: var(--rv-space-10);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
    opacity: 0.5;
    pointer-events: none;
  }

  &--fixed {
    flex: none;
    min-height: 0;
  }

  &__img,
  &__placeholder {
    position: absolute;
    inset: 0;
    transform: scale(var(--plate-image-zoom, 1));
    transition: transform var(--rv-duration-900) var(--rv-ease-soft);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    @include label;

    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
    padding: var(--rv-space-8) var(--rv-space-12);
  }
}
</style>
