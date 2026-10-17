<script setup lang="ts">
withDefaults(defineProps<{
  tag?: string
}>(), {
  tag: 'div',
})
</script>

<template>
  <component
    :is="tag"
    class="container"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.container {
  max-width: var(--rv-container-max);
  margin-inline: auto;
  padding-inline: var(--rv-space-gutter);
}
</style>
