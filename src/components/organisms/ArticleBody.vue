<script setup lang="ts">
import type { ProjectsCollectionItem, PostsCollectionItem } from '@nuxt/content'

// Markdown body inside the global `.prose` block (see assets/styles/_prose.scss).
defineProps<{
  value: ProjectsCollectionItem | PostsCollectionItem
}>()
</script>

<template>
  <ContentRenderer
    :value="value"
    class="article-body prose"
  />
</template>
