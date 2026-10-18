<script setup lang="ts">
import type { LinkRow } from '~/types/content'

// One "route to my desk" on the envelope letter: key · dotted leader · value.
defineProps<{
  row: LinkRow
  tabindex: number
}>()
</script>

<template>
  <NuxtLink
    v-if="row.href"
    :to="row.href"
    :external="true"
    :target="row.external ? '_blank' : undefined"
    :rel="row.external ? 'noopener' : undefined"
    :tabindex="tabindex"
    class="letter-row letter-row--link"
  >
    <span class="letter-row__key">{{ row.key }}</span>
    <Leader />
    <span class="letter-row__value">{{ row.value }}</span>
  </NuxtLink>
  <div
    v-else
    class="letter-row"
  >
    <span class="letter-row__key">{{ row.key }}</span>
    <Leader />
    <span class="letter-row__value">{{ row.value }}</span>
  </div>
</template>

<style scoped lang="scss">
.letter-row {
  display: flex;
  align-items: baseline;
  gap: var(--rv-space-10);
  min-height: var(--rv-size-letter-row);
  font-size: var(--rv-text-letter-body);
  color: var(--rv-object-ink);
  text-decoration: none;
  border-radius: var(--rv-radius-sm);

  &__key {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-letter-key);
    letter-spacing: var(--rv-tracking-8);
    text-transform: uppercase;
    color: var(--rv-object-ink-muted);
  }

  &__value {
    font-family: var(--rv-font-display);
    font-style: italic;
    overflow-wrap: anywhere;
  }

  &--link:hover {
    --leader-color: var(--rv-object-red);

    color: var(--rv-object-red);
  }
}
</style>
