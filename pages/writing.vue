<script setup lang="ts">
const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = 'Want to talk shop?'
ctaText.value  = 'I write about frontend, design systems, and urbanism. If something here resonates, I\'d love to hear from you.'
</script>

<template>
  <PageTitle
    title="Writing"
    subtitle="Essays on frontend engineering, design systems, and the intersection of design and the cities we live in."
  />

  <section class="container writing-page__body">
    <WritingList :limit="6" />
  </section>
</template>
