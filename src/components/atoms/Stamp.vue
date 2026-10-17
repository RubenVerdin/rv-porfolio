<script setup lang="ts">
import type { StampColor } from '~/types/content'

// Perforated postage stamp. `paper` is the colour the perforations are cut
// from: the page paper, or the fixed envelope paper.
withDefaults(defineProps<{
  color: StampColor
  icon: string
  label: string
  size?: 'md' | 'sm'
  paper?: 'page' | 'envelope'
}>(), {
  size: 'md',
  paper: 'page',
})
</script>

<template>
  <div
    class="stamp"
    :class="[`stamp--${size}`, `stamp--on-${paper}`]"
  >
    <div
      class="stamp__face"
      :class="`stamp__face--${color}`"
    >
      <svg
        class="stamp__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path :d="icon" />
      </svg>
      {{ label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.stamp {
  --stamp-perf: var(--rv-color-paper);
  --stamp-width: 64px;
  --stamp-height: 76px;

  flex: none;
  padding: var(--rv-space-5);
  background: radial-gradient(circle at 4px 4px, transparent 2.6px, var(--stamp-perf) 3px) -4px -4px / 8px 8px;
  filter: drop-shadow(var(--rv-shadow-stamp));

  &--on-envelope {
    --stamp-perf: var(--rv-object-stamp-perf);
  }

  &--sm {
    --stamp-width: 52px;
    --stamp-height: 62px;
  }

  &__face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--rv-space-4);
    width: var(--stamp-width);
    height: var(--stamp-height);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-9);
    letter-spacing: var(--rv-tracking-12);
    color: var(--rv-stamp-ink);

    &--navy { background: var(--rv-stamp-navy); }
    &--red { background: var(--rv-stamp-red); }
    &--brown { background: var(--rv-stamp-brown); }
    &--steel { background: var(--rv-stamp-steel); }
    &--seal { background: var(--rv-color-seal); }
  }

  &__icon {
    width: var(--rv-size-icon-md);
    height: var(--rv-size-icon-md);
    stroke: var(--rv-stamp-ink);
    fill: none;
    stroke-width: 1.5;
  }
}
</style>
