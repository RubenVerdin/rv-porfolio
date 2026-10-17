<script setup lang="ts">
import type { SitemapEntry } from '~/types/content'

// A flat, numbered catalogue of pages (01, 02…) under a double rule.
const props = defineProps<{
  entries: SitemapEntry[]
}>()

const rows = computed(() => props.entries.map((entry, index) => ({
  ...entry,
  number: String(index + 1).padStart(2, '0'),
})))
</script>

<template>
  <div class="page-index">
    <IndexRow
      v-for="row in rows"
      :key="row.number"
      :number="row.number"
      :title="row.title"
      :note="row.note"
      :to="row.to"
    />
  </div>
</template>

<style scoped lang="scss">
.page-index {
  border-top: var(--rv-border-double) double var(--rv-color-ink);
}
</style>
