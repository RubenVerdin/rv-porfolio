<script setup lang="ts">
// Markdown tables. Wide tables scroll inside the measure instead of pushing
// the page sideways; cell styles live with `.prose` (cells are bare elements).
</script>

<template>
  <div class="prose-table">
    <table class="prose-table__table">
      <slot />
    </table>
  </div>
</template>

<style scoped lang="scss">
.prose-table {
  overflow-x: auto;
}
</style>
