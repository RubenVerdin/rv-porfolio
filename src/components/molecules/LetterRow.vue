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
  font-size: var(--rv-text-letter-row);
  color: var(--rv-object-letter-ink);
  text-decoration: none;
  border-radius: var(--rv-radius-sm);

  &__key {
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-letter-key);
    letter-spacing: var(--rv-tracking-14);
    text-transform: uppercase;
    color: var(--rv-object-letter-ink-muted);
  }

  &__value {
    font-family: var(--rv-font-display);
    font-style: italic;
    overflow-wrap: anywhere;
  }

  &--link:hover {
    --leader-color: var(--rv-object-letter-accent);

    color: var(--rv-object-letter-accent);
  }
}
</style>
