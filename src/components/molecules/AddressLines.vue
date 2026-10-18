<script setup lang="ts">
// Handwritten address lines on the back of a postcard.
defineProps<{
  lines: string[]
}>()
</script>

<template>
  <div class="address-lines">
    <div
      v-for="line in lines"
      :key="line"
      class="address-lines__line"
    >
      {{ line }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-lines {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-16);

  &__line {
    padding-bottom: var(--rv-space-6);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink-muted);
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-18);
  }
}
</style>
