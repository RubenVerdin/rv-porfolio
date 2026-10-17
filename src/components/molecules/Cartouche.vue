<script setup lang="ts">
import type { Territory } from '~/types/content'
import { chartCaption } from '~/data/site'

// The chart's legend panel. Desktop: floats bottom-centre over the map and
// only appears once a territory is chosen. Narrow maps: a static panel under
// the map that always shows (default copy until a territory is chosen).
defineProps<{
  territory: Territory | null
}>()
</script>

<template>
  <div
    class="cartouche"
    :class="{ 'cartouche--empty': !territory }"
    aria-live="polite"
  >
    <div
      :key="territory?.id ?? 'none'"
      class="cartouche__inner"
    >
      <template v-if="territory">
        <MonoLabel tone="accent">
          {{ territory.kicker }}
        </MonoLabel>
        <div class="cartouche__title">
          {{ territory.title }}
        </div>
        <p class="cartouche__line">
          {{ territory.line }}
        </p>
        <NuxtLink
          :to="territory.link.to"
          class="cartouche__link"
        >
          {{ territory.link.label }} →
        </NuxtLink>
      </template>
      <template v-else>
        <MonoLabel tone="accent">
          {{ chartCaption.howTo }}
        </MonoLabel>
        <div class="cartouche__title">
          {{ chartCaption.emptyTitle }}
        </div>
        <p class="cartouche__line">
          {{ chartCaption.emptyLine }}
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cartouche {
  position: absolute;
  left: 36.5%;
  bottom: 3.5%;
  width: 27%;
  padding: var(--rv-space-20) var(--rv-space-22);
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  outline: var(--rv-border-hairline) solid var(--rv-color-ink);
  outline-offset: calc(var(--rv-space-6) * -1);

  @include theme-transition(background-color);

  &--empty {
    display: none;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-8);
    animation: cartouche-in var(--rv-duration-550) var(--rv-ease-soft) both;
  }

  &__title {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-cartouche-title);
    line-height: var(--rv-leading-100);
  }

  &__line {
    font-size: var(--rv-text-cartouche-body);
    line-height: var(--rv-leading-145);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }

  &__link {
    @include label(var(--rv-text-12), var(--rv-tracking-12));

    align-self: flex-start;
    padding: var(--rv-space-8) 0;
    text-decoration: none;
  }
}

@keyframes cartouche-in {
  from { opacity: 0; transform: translateY(10px); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}

@include container-below(voyage-chart, 760px) {
  .cartouche {
    position: relative;
    left: auto;
    bottom: auto;
    width: auto;
    min-height: var(--rv-size-cartouche-min);
    border-width: var(--rv-border-hairline) 0 0;
    outline: 0;
  }

  .cartouche--empty {
    display: block;
  }
}
</style>
