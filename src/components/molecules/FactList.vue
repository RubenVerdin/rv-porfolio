<script setup lang="ts">
defineProps<{
  items: { term: string, value: string, href?: string }[]
}>()
</script>

<template>
  <dl class="fact-list">
    <div
      v-for="item in items"
      :key="item.term"
      class="fact-list__item"
    >
      <dt class="fact-list__term">
        {{ item.term }}
      </dt>
      <dd class="fact-list__value">
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          external
          target="_blank"
          rel="noopener"
        >
          {{ item.value }} ↗
        </NuxtLink>
        <template v-else>
          {{ item.value }}
        </template>
      </dd>
    </div>
  </dl>
</template>

<style scoped lang="scss">
.fact-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--rv-size-fact-min), 1fr));
  margin-top: var(--rv-space-8);
  border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);

  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-4);
    padding: var(--rv-space-14) var(--rv-space-18);
    border-left: var(--rv-border-hairline) solid var(--rv-color-faint);

    &:first-child {
      border-left: 0;
      padding-left: 0;
    }
  }

  &__term {
    @include label(var(--rv-text-11), var(--rv-tracking-12));

    color: var(--rv-color-ink-muted);
  }

  &__value {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-19);
  }
}

@include page-below(xs) {
  .fact-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fact-list__item,
  .fact-list__item:first-child {
    border-left: 0;
    padding-left: 0;
    padding-right: var(--rv-space-10);
  }

  .fact-list__value {
    font-size: var(--rv-text-17);
  }
}
</style>
