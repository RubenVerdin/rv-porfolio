<script setup lang="ts">
// Markdown callout (MDC) for notices and disclaimers:
//   ::callout{label="Nota bene"}
//   Text the reader shouldn’t miss.
//   ::
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Nota bene',
})
</script>

<template>
  <aside class="callout">
    <MonoLabel
      tag="span"
      tone="accent"
      class="callout__label"
    >
      {{ label }}
    </MonoLabel>
    <slot />
  </aside>
</template>

<style scoped lang="scss">
.callout {
  padding: var(--rv-space-20) var(--rv-space-24);
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  font-size: var(--rv-text-18);

  @include theme-transition(background-color);

  &__label {
    display: block;
    margin-bottom: var(--rv-space-6);
  }

  :slotted(p) {
    margin: 0;
  }
}
</style>
