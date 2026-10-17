<script setup lang="ts">
import type { NavItem } from '~/types/content'

defineProps<{
  item: NavItem
}>()
</script>

<template>
  <NuxtLink
    :to="item.to"
    class="menu-link"
  >
    <span class="menu-link__point">{{ item.point }}</span>
    <span class="menu-link__label">{{ item.label }}</span>
    <Leader class="menu-link__leader" />
    <span class="menu-link__aside">{{ item.sub }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.menu-link {
  display: flex;
  align-items: baseline;
  gap: var(--rv-space-14);
  min-height: var(--rv-size-button-lg);
  padding: var(--rv-space-8) 0;
  text-decoration: none;
  color: var(--rv-object-letter-ink);

  &__point {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--rv-space-22);
    height: var(--rv-space-22);
    border: var(--rv-border-hairline) solid var(--rv-object-letter-accent);
    border-radius: var(--rv-radius-round);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-10);
    letter-spacing: var(--rv-tracking-4);
    color: var(--rv-object-letter-accent);
    transform: translateY(calc(var(--rv-space-3) * -1));
  }

  &__label {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-32);
    line-height: var(--rv-leading-100);
  }

  &__leader {
    --leader-offset: -6px;
  }

  &__aside {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-16);
    color: var(--rv-object-letter-ink-muted);
  }

  &:hover {
    color: var(--rv-object-letter-ink);
  }

  &:hover &__label {
    color: var(--rv-object-letter-accent);
  }

  &:hover &__point {
    background: var(--rv-object-letter-accent);
    color: var(--rv-object-letter-paper);
  }
}

// The menu letter is teleported out of the page container → viewport query.
@include viewport-below(xs) {
  .menu-link__label {
    font-size: var(--rv-text-28);
  }

  .menu-link__aside {
    display: none;
  }
}
</style>
