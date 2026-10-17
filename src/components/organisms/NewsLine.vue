<script setup lang="ts">
import type { NewsItem } from '~/types/content'

// Desktop: items sit still between rules. ≤1024: an infinite marquee —
// the list is rendered twice and the copy is hidden from assistive tech.
defineProps<{
  items: NewsItem[]
}>()
</script>

<template>
  <div class="news-line">
    <div class="news-line__track">
      <div
        v-for="item in items"
        :key="item.label"
        class="news-line__item"
      >
        <b class="news-line__label">{{ item.label }}</b> {{ item.text }}
      </div>
      <div
        v-for="item in items"
        :key="`${item.label}-copy`"
        class="news-line__item news-line__item--copy"
        aria-hidden="true"
      >
        <b class="news-line__label">{{ item.label }}</b> {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-line {
  margin-bottom: var(--rv-space-24);
  overflow: hidden;
  border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  border-bottom: var(--rv-border-double) double var(--rv-color-ink);

  &__track {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    flex: 1 1 var(--rv-basis-news-item);
    padding: var(--rv-space-12) var(--rv-space-18);
    border-left: var(--rv-border-hairline) solid var(--rv-color-faint);
    font-size: var(--rv-text-15);

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }

    &--copy {
      display: none;
    }
  }

  &__label {
    @include label(var(--rv-text-11), var(--rv-tracking-12));

    margin-right: var(--rv-space-10);
    font-weight: var(--rv-weight-medium);
    color: var(--rv-color-accent);
  }
}

@include page-below(lg) {
  .news-line__track {
    flex-wrap: nowrap;
    width: max-content;
    animation: marquee var(--rv-duration-marquee-news) linear infinite;
  }

  .news-line:hover .news-line__track {
    animation-play-state: paused;
  }

  .news-line__item,
  .news-line__item:first-child {
    flex: 0 0 auto;
    padding: var(--rv-space-12) var(--rv-space-28);
    border-left: var(--rv-border-hairline) solid var(--rv-color-faint);
    white-space: nowrap;
  }

  .news-line__item--copy {
    display: block;
  }
}
</style>
