<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
  subtitle?: string
}>()
</script>

<template>
  <section class="page-title container">
    <span v-if="eyebrow" class="page-title__eyebrow">{{ eyebrow }}</span>
    <h1 class="page-title__heading">{{ title }}</h1>
    <p v-if="subtitle" class="page-title__subtitle">{{ subtitle }}</p>
    <div class="page-title__rule" aria-hidden="true"></div>
  </section>
</template>
