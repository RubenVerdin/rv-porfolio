<script setup lang="ts">
defineProps<{
  expanded: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="menu-button"
    :class="{ 'menu-button--expanded': expanded }"
    aria-label="Open menu"
    aria-haspopup="dialog"
    :aria-expanded="expanded"
  >
    <CompassIcon />
    <span class="menu-button__label">Menu</span>
  </button>
</template>

<style scoped lang="scss">
.menu-button {
  display: none;
  align-items: center;
  gap: var(--rv-space-10);
  min-height: var(--rv-size-touch);
  padding: 0 var(--rv-space-16) 0 var(--rv-space-10);
  background: transparent;
  color: var(--rv-color-ink);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  border-radius: var(--rv-radius-pill);
  cursor: pointer;
  transition:
    background-color var(--rv-duration-300),
    color var(--rv-duration-300);

  &:hover {
    --compass-needle-turn: 45deg;

    background: var(--rv-color-ink);
    color: var(--rv-color-ground);
  }

  &--expanded,
  &--expanded:hover {
    --compass-needle-turn: 405deg;
  }

  &__label {
    @include label;
  }
}

@include page-below(lg) {
  .menu-button {
    display: flex;
  }
}

@include page-below(xs) {
  .menu-button {
    padding: 0 var(--rv-space-9);
  }

  .menu-button__label {
    display: none;
  }
}
</style>
