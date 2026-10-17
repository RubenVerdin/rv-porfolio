<script setup lang="ts">
// "More dispatches ———————— Hover to turn over"
defineProps<{
  label: string
  aside?: string
}>()
</script>

<template>
  <div class="divider-heading">
    <MonoLabel>{{ label }}</MonoLabel>
    <span
      class="divider-heading__rule"
      aria-hidden="true"
    />
    <MonoLabel
      v-if="aside"
      tone="muted"
    >
      {{ aside }}
    </MonoLabel>
  </div>
</template>

<style scoped lang="scss">
.divider-heading {
  display: flex;
  align-items: center;
  gap: var(--rv-space-16);

  &__rule {
    flex: 1;
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}
</style>
