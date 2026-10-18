<script setup lang="ts">
defineProps<{
  direction: 'prev' | 'next'
  label: string
  title: string
  to: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="pager-link"
    :class="`pager-link--${direction}`"
    :rel="direction"
  >
    <MonoLabel tone="muted">
      <template v-if="direction === 'prev'">← Previous · {{ label }}</template>
      <template v-else>Next · {{ label }} →</template>
    </MonoLabel>
    <span class="pager-link__title">{{ title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.pager-link {
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-6);
  padding: var(--rv-space-28) 0;
  text-decoration: none;

  &--next {
    align-items: flex-end;
    padding-left: var(--rv-space-28);
    text-align: right;
    border-left: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__title {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-32);
    line-height: var(--rv-leading-110);
  }
}

@include page-below(xs) {
  .pager-link--next {
    align-items: flex-start;
    padding-left: 0;
    text-align: left;
    border-left: 0;
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  .pager-link__title {
    font-size: var(--rv-text-24);
  }
}
</style>
