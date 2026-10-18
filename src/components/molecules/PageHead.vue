<script setup lang="ts">
defineProps<{
  kicker: string
  aside?: string
  title: string
  accent?: string
  dek?: string
}>()
</script>

<template>
  <Container class="page-head">
    <SectionHead
      :kicker="kicker"
      :aside="aside"
      :title="title"
      :accent="accent"
      tag="h1"
      variant="page"
    />
    <p
      v-if="dek"
      class="page-head__dek"
    >
      {{ dek }}
    </p>
  </Container>
</template>

<style scoped lang="scss">
.page-head {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-24);
  padding-top: var(--rv-space-56);
  padding-bottom: var(--rv-space-48);

  &__dek {
    max-width: var(--rv-measure-dek);
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }
}

@include page-below(md) {
  .page-head {
    padding-top: var(--rv-space-40);
    padding-bottom: var(--rv-space-40);
  }
}

@include page-below(xs) {
  .page-head {
    gap: var(--rv-space-16);
    padding-top: var(--rv-space-28);
    padding-bottom: var(--rv-space-28);
  }

  .page-head__dek {
    font-size: var(--rv-text-17);
  }
}
</style>
