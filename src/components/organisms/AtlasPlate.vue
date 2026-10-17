<script setup lang="ts">
import type { PlateView } from '~/types/content'

// A catalogue "plate". `size` follows the atlas grid slot it sits in.
withDefaults(defineProps<{
  plate: PlateView
  size?: 'feature' | 'tall' | 'small'
}>(), {
  size: 'feature',
})
</script>

<template>
  <NuxtLink
    :to="plate.to"
    class="atlas-plate"
    :class="`atlas-plate--${size}`"
  >
    <div class="atlas-plate__top">
      <PlateNumber>{{ plate.label }}</PlateNumber>
      <MonoLabel tone="muted">
        {{ plate.index }} — {{ plate.category }}
      </MonoLabel>
    </div>
    <PlateImage
      :src="plate.coverImage"
      :alt="plate.title"
      placeholder="[ Project image · 4:3 ]"
    />
    <div class="atlas-plate__caption">
      <div>
        <h3 class="atlas-plate__title">
          {{ plate.title }}
        </h3>
        <MonoLabel
          tag="div"
          tone="muted"
          class="atlas-plate__meta"
        >
          {{ plate.meta }}
        </MonoLabel>
      </div>
      <MonoLabel class="atlas-plate__go">
        View plate <span
          class="atlas-plate__arrow"
          aria-hidden="true"
        >→</span>
      </MonoLabel>
    </div>
    <div
      class="atlas-plate__stamp"
      aria-hidden="true"
    >
      Plate<br>No. {{ plate.index }}
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.atlas-plate {
  --plate-image-min-height: 340px;
  --atlas-plate-stamp-size: 84px;

  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--rv-space-14);
  padding: var(--rv-space-14);
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  color: var(--rv-color-ink);
  text-decoration: none;
  transition:
    transform var(--rv-duration-500) var(--rv-ease-soft),
    box-shadow var(--rv-duration-500),
    background-color var(--rv-duration-theme);

  &--tall {
    --plate-image-min-height: 560px;
  }

  &--small {
    --plate-image-min-height: 240px;
  }

  &:hover {
    --plate-image-zoom: 1.06;

    color: var(--rv-color-ink);
    transform: translateY(calc(var(--rv-space-6) * -1)) rotate(-0.4deg);
    box-shadow: var(--rv-shadow-hard-lg);
  }

  &__top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-bottom: var(--rv-space-10);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__caption {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--rv-space-16);
  }

  &__title {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-plate-title);
    line-height: var(--rv-leading-105);
  }

  &__meta {
    margin-top: var(--rv-space-6);
  }

  &__go {
    display: flex;
    align-items: center;
    gap: var(--rv-space-8);
    white-space: nowrap;
  }

  &__arrow {
    transition: transform var(--rv-duration-400);
  }

  &:hover &__go {
    color: var(--rv-color-accent);
  }

  &:hover &__arrow {
    transform: translateX(var(--rv-space-6));
  }

  // The red "Plate No." stamp lands on hover.
  &__stamp {
    @include label(var(--rv-text-10), var(--rv-tracking-12));

    position: absolute;
    top: var(--rv-offset-plate-stamp);
    right: var(--rv-space-26);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--atlas-plate-stamp-size);
    height: var(--atlas-plate-stamp-size);
    border: var(--rv-border-thick) solid var(--rv-color-accent);
    border-radius: var(--rv-radius-round);
    background: var(--rv-color-paper);
    color: var(--rv-color-accent);
    line-height: var(--rv-leading-130);
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transform: scale(1.8) rotate(-30deg);
    transition:
      opacity var(--rv-duration-250),
      transform var(--rv-duration-450) var(--rv-ease-spring-soft);
  }

  &:hover &__stamp {
    opacity: 0.95;
    transform: scale(1) rotate(-12deg);
  }
}

@include page-below(md) {
  .atlas-plate,
  .atlas-plate--small {
    --plate-image-min-height: 260px;
  }

  .atlas-plate--tall {
    --plate-image-min-height: 400px;
  }
}

@include page-below(xs) {
  .atlas-plate,
  .atlas-plate--small {
    --plate-image-min-height: 200px;
    --atlas-plate-stamp-size: 68px;
  }

  .atlas-plate--tall {
    --plate-image-min-height: 300px;
  }

  .atlas-plate__stamp {
    right: var(--rv-space-20);
    font-size: var(--rv-text-9);
  }
}
</style>
