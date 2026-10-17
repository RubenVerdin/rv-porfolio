<script setup lang="ts">
// The wavy cancellation lines that trail a postmark.
withDefaults(defineProps<{
  tone?: 'page' | 'envelope'
}>(), {
  tone: 'page',
})
</script>

<template>
  <svg
    class="postmark-waves"
    :class="`postmark-waves--${tone}`"
    viewBox="0 0 90 40"
    aria-hidden="true"
  >
    <path d="M0,8 q11,-7 22,0 t22,0 t22,0 t22,0" />
    <path d="M0,20 q11,-7 22,0 t22,0 t22,0 t22,0" />
    <path d="M0,32 q11,-7 22,0 t22,0 t22,0 t22,0" />
  </svg>
</template>

<style scoped lang="scss">
.postmark-waves {
  width: var(--postmark-waves-width, 90px);
  height: auto;
  aspect-ratio: 9 / 4;
  stroke: var(--rv-color-ink);
  fill: none;
  stroke-width: 1.6;

  &--envelope {
    stroke: var(--rv-object-letter-ink);
    opacity: 0.7;
  }
}
</style>
