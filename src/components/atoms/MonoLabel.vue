<script setup lang="ts">
// The house label: Antonio 500, uppercase, tracked (`label` mixin).
withDefaults(defineProps<{
  tag?: string
  tone?: 'inherit' | 'ink' | 'muted' | 'accent'
}>(), {
  tag: 'span',
  tone: 'inherit',
})
</script>

<template>
  <component
    :is="tag"
    class="mono-label"
    :class="`mono-label--${tone}`"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.mono-label {
  @include label;

  &--ink {
    color: var(--rv-color-ink);
  }

  &--muted {
    color: var(--rv-color-ink-muted);
  }

  &--accent {
    color: var(--rv-color-accent);
  }
}
</style>
