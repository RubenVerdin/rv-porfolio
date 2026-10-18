<script setup lang="ts">
import type { LinkRow } from '~/types/content'

defineProps<{
  row: LinkRow
}>()
</script>

<template>
  <NuxtLink
    v-if="row.href"
    :to="row.href"
    :external="row.external || row.href.startsWith('mailto:')"
    class="contact-row contact-row--link"
  >
    <span class="contact-row__key">{{ row.key }}</span>
    <span class="contact-row__value">{{ row.value }}</span>
  </NuxtLink>
  <div
    v-else
    class="contact-row"
  >
    <span class="contact-row__key">{{ row.key }}</span>
    <span class="contact-row__value">{{ row.value }}</span>
  </div>
</template>

<style scoped lang="scss">
.contact-row {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-2);
  padding: var(--rv-space-10) 0;
  border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink-muted);
  text-decoration: none;

  &__key {
    @include label(var(--rv-text-12), var(--rv-tracking-8));

    color: var(--rv-color-ink-muted);
  }

  &__value {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-20);
    overflow-wrap: anywhere;
  }

  &--link:hover &__value {
    color: var(--rv-color-accent);
  }
}
</style>
