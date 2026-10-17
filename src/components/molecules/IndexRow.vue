<script setup lang="ts">
// One row of a catalogue index: "01  Home  The chart · what I do  →".
// The note and aside columns hide below 900px. A row without `to` is a
// placeholder (not live yet) and renders unlinked.
const NuxtLink = resolveComponent('NuxtLink')

withDefaults(defineProps<{
  number: string
  title: string
  note?: string
  aside?: string
  to?: string | null
}>(), {
  note: undefined,
  aside: undefined,
  to: null,
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to ?? undefined"
    class="index-row"
    :class="{ 'index-row--inert': !to }"
  >
    <span class="index-row__number">{{ number }}</span>
    <span class="index-row__title">{{ title }}</span>
    <span class="index-row__note index-row__extra">{{ note }}</span>
    <span class="index-row__aside index-row__extra">{{ aside }}</span>
    <span
      class="index-row__arrow"
      aria-hidden="true"
    >→</span>
  </component>
</template>

<style scoped lang="scss">
.index-row {
  --index-row-columns: 110px minmax(0, 1fr) 300px 90px 32px;

  display: grid;
  grid-template-columns: var(--index-row-columns);
  align-items: baseline;
  gap: var(--rv-space-20);
  padding: var(--rv-space-20) 0;
  border-bottom: var(--rv-border-hairline) solid var(--rv-color-faint);
  text-decoration: none;
  transition:
    background-color var(--rv-duration-300),
    padding var(--rv-duration-300);

  &__number {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-18);
    letter-spacing: var(--rv-tracking-16);
    text-transform: uppercase;
    color: var(--rv-color-accent);
  }

  &__title {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-30);
    line-height: var(--rv-leading-110);
  }

  &__note,
  &__aside {
    @include label;
  }

  &__note {
    color: var(--rv-color-ink-muted);
  }

  &__arrow {
    justify-self: end;
    transition: transform var(--rv-duration-300);
  }

  &:not(.index-row--inert):hover {
    padding-inline: var(--rv-space-14);
    background: var(--rv-color-paper);
  }

  &:not(.index-row--inert):hover &__arrow {
    transform: translateX(var(--rv-space-6));
    color: var(--rv-color-accent);
  }

  &--inert &__arrow {
    color: var(--rv-color-ink-muted);
  }
}

@include page-below(md) {
  .index-row {
    --index-row-columns: 70px minmax(0, 1fr) 24px;
  }

  .index-row__extra {
    display: none;
  }

  .index-row__title {
    font-size: var(--rv-text-26);
  }
}

@include page-below(xs) {
  .index-row {
    --index-row-columns: 40px minmax(0, 1fr) 20px;

    gap: var(--rv-space-12);
    padding: var(--rv-space-16) 0;
  }

  .index-row__title {
    font-size: var(--rv-text-22);
  }

  .index-row__number {
    font-size: var(--rv-text-14);
  }
}
</style>
