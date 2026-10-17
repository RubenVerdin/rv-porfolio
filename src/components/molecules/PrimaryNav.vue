<script setup lang="ts">
import type { NavItem, NavKey } from '~/types/content'

defineProps<{
  items: NavItem[]
  current?: NavKey
}>()
</script>

<template>
  <nav
    class="primary-nav"
    aria-label="Primary"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="primary-nav__link"
      :class="{ 'primary-nav__link--current': item.key === current }"
      :aria-current="item.key === current ? 'page' : undefined"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.primary-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--rv-space-4) var(--rv-space-26);

  &__link {
    @include label;

    padding: var(--rv-space-12) 0;
    text-decoration: none;
    border-bottom: var(--rv-border-thick) solid transparent;

    &--current {
      border-bottom-color: var(--rv-color-accent);
      color: var(--rv-color-accent);
    }
  }
}
</style>
