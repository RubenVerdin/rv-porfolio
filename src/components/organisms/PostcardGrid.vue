<script setup lang="ts">
import type { DispatchView } from '~/types/content'

defineProps<{
  dispatches: DispatchView[]
}>()
</script>

<template>
  <div class="postcard-grid">
    <DispatchPostcard
      v-for="dispatch in dispatches"
      :key="dispatch.slug"
      :dispatch="dispatch"
    />
  </div>
</template>

<style scoped lang="scss">
.postcard-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--rv-space-40) var(--rv-space-40);
}

@include page-below(xs) {
  .postcard-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--rv-space-28);
  }
}
</style>
