<script setup lang="ts">
defineProps<{
  heading: string
  viewAllHref?: string
  viewAllLabel?: string
}>()
</script>

<template>
  <div class="section-header">
    <h2 class="section-header__title">{{ heading }}</h2>
    <span class="section-header__rule" aria-hidden="true"></span>
    <a v-if="viewAllHref" :href="viewAllHref" class="section-header__all">
      {{ viewAllLabel ?? 'View all' }}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    </a>
  </div>
</template>
