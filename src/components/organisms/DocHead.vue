<script setup lang="ts">
// Head of a detail page: breadcrumb, meta line, big title, dek, then
// page-specific details (facts for a plate, byline for a dispatch).
withDefaults(defineProps<{
  crumbs: { label: string, to?: string }[]
  title: string
  dek?: string
  align?: 'start' | 'center'
}>(), {
  dek: undefined,
  align: 'start',
})
</script>

<template>
  <Container
    tag="header"
    class="doc-head"
    :class="`doc-head--${align}`"
  >
    <Breadcrumbs :items="crumbs" />
    <slot name="meta" />
    <h1 class="doc-head__title">
      {{ title }}
    </h1>
    <p
      v-if="dek"
      class="doc-head__dek"
    >
      {{ dek }}
    </p>
    <slot />
  </Container>
</template>

<style scoped lang="scss">
.doc-head {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-20);
  padding-top: var(--rv-space-40);
  padding-bottom: var(--rv-space-40);

  &__title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-doc-title);
    line-height: var(--rv-leading-98);
    letter-spacing: var(--rv-tracking-neg-1-5);
    text-wrap: balance;
    animation: head-in var(--rv-duration-900) var(--rv-ease-soft) both;
  }

  &__dek {
    max-width: var(--rv-measure-dek);
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-155);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }

  &--center {
    align-items: center;
    text-align: center;
  }

  &--center &__title {
    max-width: 18ch;
  }

  &--center &__dek {
    max-width: 46ch;
  }
}

@include page-below(xs) {
  .doc-head {
    padding-top: var(--rv-space-24);
    padding-bottom: var(--rv-space-28);
  }

  .doc-head__title {
    font-size: var(--rv-text-40);
  }

  .doc-head__dek {
    font-size: var(--rv-text-17);
  }
}
</style>
