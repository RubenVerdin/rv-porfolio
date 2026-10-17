<script setup lang="ts">
definePageMeta({ section: 'contact', footer: 'plain' })

useSeoMeta({
  title: 'Contact — Ruben Verdin',
  description: 'Available for new projects and collaborations.',
})
</script>

<template>
  <div class="contact">
    <PageHead
      kicker="Section D — The Back Page"
      aside="Sealed & sent from Toronto"
      title="Let’s work"
      accent="together."
      dek="Available for new projects and collaborations. The letter’s already open — pick whichever route suits you."
    />
    <Container
      tag="section"
      class="contact__section"
      aria-label="Ways to reach me"
    >
      <div class="contact__grid">
        <SealedEnvelope
          start-open
          standalone
        />
        <ContactPostcard />
      </div>
    </Container>
  </div>
</template>

<style scoped lang="scss">
.contact {
  &__section {
    padding-top: var(--rv-space-24);
    padding-bottom: var(--rv-space-120);
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    align-items: center;
    gap: var(--rv-space-56);
  }
}

@include page-below(md) {
  .contact__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--rv-space-72);
  }
}

@include page-below(xs) {
  .contact__grid {
    gap: var(--rv-space-40);
  }
}
</style>
