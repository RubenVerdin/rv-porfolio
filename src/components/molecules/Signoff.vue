<script setup lang="ts">
import { signature } from '~/data/site'

// "Yours in code & ink, / R. Verdin" with an optional action (button, seal)
// on the right.
withDefaults(defineProps<{
  variant?: 'page' | 'letter'
  ruled?: boolean
}>(), {
  variant: 'page',
  ruled: false,
})
</script>

<template>
  <div
    class="signoff"
    :class="[`signoff--${variant}`, { 'signoff--ruled': ruled }]"
  >
    <div>
      <div class="signoff__closing">
        Yours in code &amp; ink,
      </div>
      <div class="signoff__name">
        {{ signature }}
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.signoff {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--rv-space-20);

  &__closing,
  &__name {
    font-family: var(--rv-font-display);
    font-style: italic;
  }

  &--page &__closing {
    font-size: var(--rv-text-18);
    color: var(--rv-color-ink-muted);
  }

  &--page &__name {
    font-size: var(--rv-text-32);
  }

  &--letter {
    gap: var(--rv-space-16);
    padding-top: var(--rv-space-6);
  }

  &--letter &__closing {
    font-family: var(--rv-font-body);
    font-size: var(--rv-text-17);
    line-height: var(--rv-leading-150);
    color: var(--rv-object-letter-ink-muted);
  }

  &--letter &__name {
    font-size: var(--rv-text-28);
  }

  &--ruled {
    max-width: var(--rv-measure-prose);
    margin: var(--rv-space-56) auto 0;
    padding-top: var(--rv-space-24);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}
</style>
