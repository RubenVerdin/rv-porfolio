<script setup lang="ts">
import type { StampColor } from '~/types/content'

// Perforated postage stamp. `paper` is the colour the perforations are cut
// from: the page paper, or the fixed envelope paper. `title` adds a big
// place name over the label ("México" / "ORIGEN"); `placeholder` is the
// dashed, uncoloured "next port" stamp.
withDefaults(defineProps<{
  color: StampColor
  icon: string
  label: string
  title?: string
  size?: 'md' | 'sm' | 'lg'
  paper?: 'page' | 'envelope'
  placeholder?: boolean
}>(), {
  title: undefined,
  size: 'md',
  paper: 'page',
  placeholder: false,
})
</script>

<template>
  <div
    class="stamp"
    :class="[`stamp--${size}`, `stamp--on-${paper}`, { 'stamp--placeholder': placeholder }]"
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
      <b
        v-if="title"
        class="stamp__title"
      >{{ title }}</b>
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
  padding: var(--rv-space-6);
  background: radial-gradient(circle at 4px 4px, transparent 2.6px, var(--stamp-perf) 3px) -4px -4px / 8px 8px;
  filter: drop-shadow(var(--rv-shadow-lift));

  &--on-envelope {
    --stamp-perf: var(--rv-object-stamp-perf);
  }

  &--sm {
    --stamp-width: 52px;
    --stamp-height: 62px;
  }

  &--lg {
    --stamp-width: 96px;
    --stamp-height: 112px;
  }

  &__face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--rv-space-4);
    width: var(--stamp-width);
    height: var(--stamp-height);
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
    color: var(--rv-object-ink-light);

    &--navy { background: var(--rv-object-navy); }
    &--red { background: var(--rv-object-red); }
    &--brown { background: var(--rv-stamp-brown); }
    &--steel { background: var(--rv-stamp-steel); }
    &--seal { background: var(--rv-color-seal); }
  }

  &__icon {
    width: var(--rv-size-icon-md);
    height: var(--rv-size-icon-md);
    stroke: var(--rv-object-ink-light);
    fill: none;
    stroke-width: 1.5;
  }

  &__title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-20);
    letter-spacing: var(--rv-tracking-0);
    text-transform: none;
  }

  &--lg &__face {
    font-size: var(--rv-text-12);
  }

  &--placeholder &__face {
    background: transparent;
    border: var(--rv-border-thick) dashed var(--rv-color-ink-muted);
    color: var(--rv-color-ink-muted);
  }

  &--placeholder &__icon {
    stroke: var(--rv-color-ink-muted);
  }
}

@include page-below(xs) {
  .stamp--lg {
    --stamp-width: 78px;
    --stamp-height: 92px;
  }

  .stamp--lg .stamp__face {
    font-size: var(--rv-text-12);
  }

  .stamp__title {
    font-size: var(--rv-text-16);
  }
}
</style>
