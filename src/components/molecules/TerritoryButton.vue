<script setup lang="ts">
import type { Territory } from '~/types/content'

// A territory control on the sea chart. `overlay` sits on the map at the
// territory's % position; `legend` is the 2×2 grid shown on narrow maps.
withDefaults(defineProps<{
  territory: Territory
  pressed: boolean
  variant?: 'overlay' | 'legend'
}>(), {
  variant: 'overlay',
})
</script>

<template>
  <button
    type="button"
    class="territory-button"
    :class="[`territory-button--${variant}`, { 'territory-button--pressed': pressed }]"
    :style="variant === 'overlay'
      ? { left: `${territory.position.left}%`, top: `${territory.position.top}%` }
      : undefined"
    :aria-pressed="pressed"
  >
    <template v-if="variant === 'overlay'">
      <span class="territory-button__numeral">{{ territory.numeral }}</span>
      <span class="territory-button__title">{{ territory.title }}</span>
    </template>
    <span
      v-else
      class="territory-button__title"
    >{{ territory.numeral }} {{ territory.title }}</span>
    <span class="territory-button__region">{{ territory.region }}</span>
  </button>
</template>

<style scoped lang="scss">
.territory-button {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-2);
  min-width: var(--rv-size-touch);
  min-height: var(--rv-size-touch);
  background: var(--rv-color-paper);
  color: var(--rv-color-ink);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  cursor: pointer;

  &__numeral {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
  }

  &__title {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-bold);
    font-size: var(--rv-text-territory);
    letter-spacing: var(--rv-tracking-8);
    text-transform: uppercase;
    line-height: var(--rv-leading-100);
  }

  &__region {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-territory-sub);
  }

  &--pressed {
    background: var(--rv-color-accent);
    color: var(--rv-color-on-accent);
    border-color: var(--rv-color-accent);
  }

  &--overlay {
    position: absolute;
    align-items: center;
    padding: var(--rv-space-8) var(--rv-space-16) var(--rv-space-10);
    box-shadow: var(--rv-shadow-hard-sm);
    transform: translate(-50%, -50%);
    transition:
      background-color var(--rv-duration-300),
      color var(--rv-duration-300),
      box-shadow var(--rv-duration-300),
      transform var(--rv-duration-300) var(--rv-ease-spring-gentle);

    &:hover {
      transform: translate(-50%, -50%) translateY(calc(var(--rv-space-4) * -1));
      box-shadow: var(--rv-shadow-hard-md);
    }
  }

  &--legend {
    align-items: flex-start;
    min-height: var(--rv-size-button-lg);
    padding: var(--rv-space-8) var(--rv-space-12);
    text-align: left;
    transition:
      background-color var(--rv-duration-300),
      color var(--rv-duration-300);
  }

  &--legend &__title {
    font-size: var(--rv-text-18);
  }

  &--legend &__region {
    font-size: var(--rv-text-13);
  }
}

// Map width ≤760: compact overlay buttons.
@include container-below(voyage-chart, 760px) {
  .territory-button--overlay {
    padding: var(--rv-space-6) var(--rv-space-8);
    box-shadow: var(--rv-shadow-hard-sm);
  }

  .territory-button--overlay .territory-button__numeral,
  .territory-button--overlay .territory-button__region {
    display: none;
  }
}

// Map width ≤620: the overlay buttons give way to the legend grid.
@include container-below(voyage-chart, 620px) {
  .territory-button--overlay {
    display: none;
  }
}
</style>
