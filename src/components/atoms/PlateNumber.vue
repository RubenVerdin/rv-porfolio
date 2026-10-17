<script setup lang="ts">
// "Plate I." — wide-tracked display caps.
withDefaults(defineProps<{
  tone?: 'ink' | 'accent'
}>(), {
  tone: 'ink',
})
</script>

<template>
  <span
    class="plate-number"
    :class="`plate-number--${tone}`"
  ><slot /></span>
</template>

<style scoped lang="scss">
.plate-number {
  font-family: var(--rv-font-display);
  font-size: var(--rv-text-20);
  letter-spacing: var(--rv-tracking-20);
  text-transform: uppercase;
  white-space: nowrap;

  &--accent {
    color: var(--rv-color-accent);
  }
}
</style>
