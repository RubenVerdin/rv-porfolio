<script setup lang="ts">
import type { InstrumentView } from '~/types/content'

// "Instruments aboard": one ruled column per chart territory, stacking
// below 900px.
defineProps<{
  instruments: InstrumentView[]
}>()
</script>

<template>
  <div class="instruments-aboard">
    <SectionHead
      kicker="Instruments aboard"
      aside="What I work with"
    />
    <div class="instruments-aboard__grid">
      <div
        v-for="instrument in instruments"
        :key="instrument.role"
        class="instruments-aboard__column"
      >
        <MonoLabel tone="accent">
          {{ instrument.kicker }}
        </MonoLabel>
        <h3 class="instruments-aboard__role">
          {{ instrument.role }}
        </h3>
        <ul class="instruments-aboard__list">
          <li
            v-for="(item, index) in instrument.items"
            :key="index"
            class="instruments-aboard__item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.instruments-aboard {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: var(--rv-space-40);
    border-top: var(--rv-border-double) double var(--rv-color-ink);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__column {
    padding: var(--rv-space-28) var(--rv-space-28) var(--rv-space-30);
    border-left: var(--rv-border-hairline) solid var(--rv-color-ink);

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }
  }

  &__role {
    margin: var(--rv-space-6) 0 var(--rv-space-16);
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-32);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-10);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  // Diamond bullet.
  &__item {
    display: flex;
    align-items: baseline;
    gap: var(--rv-space-10);
    font-size: var(--rv-text-17);

    &::before {
      content: '';
      flex: none;
      width: var(--rv-space-6);
      height: var(--rv-space-6);
      border: var(--rv-border-hairline) solid var(--rv-color-accent);
      transform: rotate(45deg) translateY(calc(var(--rv-space-2) * -1));
    }
  }
}

@include page-below(md) {
  .instruments-aboard__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .instruments-aboard__column {
    padding-left: 0;
    border-left: 0;
    border-top: var(--rv-border-hairline) solid var(--rv-color-faint);

    &:first-child {
      border-top: 0;
    }
  }
}

@include page-below(xs) {
  .instruments-aboard__role {
    font-size: var(--rv-text-28);
  }
}
</style>
