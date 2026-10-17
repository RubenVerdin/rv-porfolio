<script setup lang="ts">
import type { PlateView } from '~/types/content'

// 24-column atlas: Plate I span 14 · Plate II span 10 × 2 rows ·
// Plates III & IV span 7. Repeats every four plates. One column ≤900.
defineProps<{
  plates: PlateView[]
}>()

const sizes = ['feature', 'tall', 'small', 'small'] as const

function slotOf(index: number) {
  return (index % 4) + 1
}
</script>

<template>
  <div class="atlas-grid">
    <div
      v-for="(plate, index) in plates"
      :key="plate.slug"
      class="atlas-grid__slot u-reveal"
      :class="`atlas-grid__slot--${slotOf(index)}`"
    >
      <AtlasPlate
        :plate="plate"
        :size="sizes[index % 4]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-grid {
  display: grid;
  grid-template-columns: repeat(24, minmax(0, 1fr));
  align-items: stretch;
  gap: var(--rv-space-28);

  &__slot {
    display: flex;
    flex-direction: column;
    min-height: 0;

    &--1 { grid-column: span 14; }
    &--2 { grid-column: span 10; grid-row: span 2; }
    &--3,
    &--4 { grid-column: span 7; }
  }
}

@include page-below(md) {
  .atlas-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .atlas-grid__slot {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
