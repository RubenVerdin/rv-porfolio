<script setup lang="ts">
// Dotted leader that fills the space between a label and its value
// (menu letter, envelope letter). Colour via --leader-color.
</script>

<template>
  <span
    class="leader"
    aria-hidden="true"
  />
</template>

<style scoped lang="scss">
.leader {
  flex: 1;
  border-bottom: var(--rv-border-hairline) dotted var(--leader-color, var(--rv-object-ink-muted));
  transform: translateY(var(--leader-offset, -4px));
}
</style>
