<script setup lang="ts">
import type { PlateView } from '~/types/content'

// 24-column atlas, three plates per group: Plate II spans 10 columns × 2 rows
// on the left; Plates I & III span 14 and stack on the right. Rows are equal
// (1fr), so the two right plates share the tall plate's height. `dense`
// lets Plate II back-fill the left column. Repeats every three plates.
// One column ≤900, in plate order.
defineProps<{
  plates: PlateView[]
}>()

const sizes = ['small', 'tall', 'small'] as const

function slotOf(index: number) {
  return (index % 3) + 1
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
        :size="sizes[index % 3]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-grid {
  display: grid;
  grid-template-columns: repeat(24, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  align-items: stretch;
  gap: var(--rv-space-28);

  &__slot {
    display: flex;
    flex-direction: column;
    min-height: 0;

    &--2 { grid-column: 1 / span 10; grid-row: span 2; }
    &--1,
    &--3 { grid-column: 11 / span 14; }
  }
}

@include page-below(md) {
  .atlas-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: auto;
  }

  .atlas-grid__slot {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
