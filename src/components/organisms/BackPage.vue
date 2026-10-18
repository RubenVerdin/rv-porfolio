<script setup lang="ts">
// "Section D — The Back Page": the closing call to action. The button and
// the envelope share one envelope state, so either opens it.
const envelope = useEnvelope()
</script>

<template>
  <div class="back-page">
    <Container
      id="contact"
      tag="section"
      class="back-page__section"
      aria-label="Contact"
    >
      <SectionHead
        kicker="Section D — The Back Page"
        aside="Sealed & sent from Toronto"
      />
      <div class="back-page__layout">
        <div class="back-page__copy">
          <h2 class="back-page__title">
            Let’s work <em class="back-page__accent">together.</em>
          </h2>
          <p class="back-page__text">
            Available for new projects and collaborations. There’s a letter in the envelope with every way to reach me — break the seal.
          </p>
          <BaseButton
            class="back-page__button"
            :aria-expanded="envelope.aria.value.expanded"
            @click="envelope.toggle()"
          >
            {{ envelope.aria.value.buttonLabel }}
          </BaseButton>
        </div>
        <SealedEnvelope
          class="back-page__envelope"
          :envelope="envelope"
        />
      </div>
    </Container>
    <SiteFooter embedded />
  </div>
</template>

<style scoped lang="scss">
.back-page {
  &__section {
    padding-top: var(--rv-space-64);
    padding-bottom: var(--rv-space-96);
  }

  &__layout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rv-space-56);
    margin-top: var(--rv-space-40);
  }

  &__copy {
    display: flex;
    flex: 1 1 var(--rv-basis-copy);
    flex-direction: column;
    gap: var(--rv-space-24);
    min-width: 0;
  }

  &__title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-display-lg);
    line-height: var(--rv-leading-90);
    letter-spacing: var(--rv-tracking-neg-1-5);
  }

  &__accent {
    color: var(--rv-color-accent);
  }

  &__text {
    max-width: 42ch;
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }

  &__button {
    align-self: flex-start;
  }

  &__envelope {
    flex: 1.3 1 var(--rv-basis-envelope);
  }
}

@include page-below(md) {
  .back-page__layout {
    gap: var(--rv-space-32);
  }
}
</style>
