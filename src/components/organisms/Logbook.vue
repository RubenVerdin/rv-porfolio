<script setup lang="ts">
import type { LogEntry } from '~/types/content'

// "The Logbook — Ports of experience.": career entries strung along a
// dashed route, the current port glowing.
defineProps<{
  entries: LogEntry[]
  cv: { label: string, to: string | null, arrow?: '→' | '↓' }
}>()
</script>

<template>
  <div class="logbook">
    <SectionHead
      kicker="The Logbook"
      :link="cv"
      title="Ports of"
      accent="experience."
      size="sub"
    />
    <div class="logbook__entries">
      <LogbookEntry
        v-for="(entry, index) in entries"
        :key="index"
        v-bind="entry"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.logbook {
  &__entries {
    display: flex;
    flex-direction: column;
    margin-top: var(--rv-space-40);
  }
}
</style>
