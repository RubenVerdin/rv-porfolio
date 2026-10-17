<script setup lang="ts">
// The design's `.btn`. Renders a NuxtLink when given `to`/`href`, otherwise
// a <button>.
withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'ink' | 'line' | 'inverse'
  size?: 'md' | 'lg'
  type?: 'button' | 'submit'
  arrow?: boolean
}>(), {
  to: undefined,
  href: undefined,
  variant: 'ink',
  size: 'md',
  type: 'button',
  arrow: true,
})
</script>

<template>
  <NuxtLink
    v-if="to || href"
    :to="to ?? href"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
  >
    <slot />
    <span
      v-if="arrow"
      class="base-button__arrow"
      aria-hidden="true"
    >→</span>
  </NuxtLink>
  <button
    v-else
    :type="type"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
  >
    <slot />
    <span
      v-if="arrow"
      class="base-button__arrow"
      aria-hidden="true"
    >→</span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  @include label(var(--rv-text-12), var(--rv-tracking-12));

  display: inline-flex;
  align-items: center;
  gap: var(--rv-space-10);
  min-height: var(--rv-size-button);
  padding: 0 var(--rv-space-22);
  text-decoration: none;
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  border-radius: var(--rv-radius-none);
  cursor: pointer;
  transition:
    background-color var(--rv-duration-300),
    color var(--rv-duration-300),
    border-color var(--rv-duration-300),
    transform var(--rv-duration-300);

  &__arrow {
    transition: transform var(--rv-duration-300);
  }

  &:hover &__arrow {
    transform: translateX(var(--rv-space-4));
  }

  &--lg {
    min-height: var(--rv-size-button-lg);
    padding: 0 var(--rv-space-26);
    font-size: var(--rv-text-13);
  }

  &--ink {
    background: var(--rv-color-ink);
    color: var(--rv-color-ground);

    &:hover {
      background: var(--rv-color-accent);
      border-color: var(--rv-color-accent);
      color: var(--rv-color-on-accent);
    }
  }

  &--line {
    background: transparent;
    color: var(--rv-color-ink);

    &:hover {
      background: var(--rv-color-ink);
      color: var(--rv-color-ground);
    }
  }

  // On the dark cross-link banner.
  &--inverse {
    background: transparent;
    border-color: var(--rv-color-inverse-fg);
    color: var(--rv-color-inverse-fg);

    &:hover {
      background: var(--rv-color-telegram);
      border-color: var(--rv-color-telegram);
      color: var(--rv-object-letter-ink);
    }
  }
}
</style>
