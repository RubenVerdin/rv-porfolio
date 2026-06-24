<script setup lang="ts">
const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = 'Have a project in mind?'
ctaText.value  = 'I take on a small number of freelance and contract projects each year. If the fit is right, let\'s talk.'
</script>

<template>
  <PageTitle
    title="Work"
    subtitle="Selected projects — the problems, the decisions, and what shipped. Click any card to read the full story."
  />

  <section class="container work-page__body">
    <WorkShowcase :limit="6" />
  </section>
</template>
