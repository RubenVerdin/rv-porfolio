<script setup lang="ts">
const props = defineProps<{
  name: 'sun' | 'moon' | 'close'
}>()

const shapes = {
  sun: { viewBox: '0 0 16 16', circle: { cx: 8, cy: 8, r: 3 }, d: 'M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3' },
  moon: { viewBox: '0 0 16 16', circle: null, d: 'M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z' },
  close: { viewBox: '0 0 20 20', circle: null, d: 'M4 4l12 12M16 4L4 16' },
} as const

const shape = computed(() => shapes[props.name])
</script>

<template>
  <svg
    class="icon"
    :viewBox="shape.viewBox"
    aria-hidden="true"
  >
    <circle
      v-if="shape.circle"
      v-bind="shape.circle"
    />
    <path :d="shape.d" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  width: var(--icon-size, var(--rv-size-icon-xs));
  height: var(--icon-size, var(--rv-size-icon-xs));
  stroke: currentColor;
  fill: none;
  stroke-width: var(--icon-stroke, 1.5);
}
</style>
