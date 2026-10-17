<script setup lang="ts">
import type {
  AboutCollectionItem,
  PageFallbackCollectionItem,
  PagesCollectionItem,
  PostsCollectionItem,
  ProjectsCollectionItem,
} from '@nuxt/content'

// Markdown body inside the global `.prose` block (see assets/styles/_prose.scss).
defineProps<{
  value:
    | ProjectsCollectionItem
    | PostsCollectionItem
    | PagesCollectionItem
    | PageFallbackCollectionItem
    | AboutCollectionItem
}>()
</script>

<template>
  <ContentRenderer
    :value="value"
    class="article-body prose"
  />
</template>
