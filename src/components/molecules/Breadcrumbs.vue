<script setup lang="ts">
defineProps<{
  items: { label: string, to?: string }[]
}>()
</script>

<template>
  <nav
    class="breadcrumbs"
    aria-label="Breadcrumb"
  >
    <template
      v-for="(item, index) in items"
      :key="item.label"
    >
      <span
        v-if="index > 0"
        class="breadcrumbs__separator"
        aria-hidden="true"
      >/</span>
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="breadcrumbs__link"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        aria-current="page"
      >{{ item.label }}</span>
    </template>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  @include label;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--rv-space-8);
  color: var(--rv-color-ink-muted);

  &__link {
    padding: var(--rv-space-10) 0;
    text-decoration: none;
  }
}
</style>
