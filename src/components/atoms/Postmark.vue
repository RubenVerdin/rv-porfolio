<script setup lang="ts">
// Round cancellation mark: two short lines ("APR 30" / "2025").
withDefaults(defineProps<{
  lines: [string, string]
  size?: 'md' | 'sm'
}>(), {
  size: 'md',
})
</script>

<template>
  <div
    class="postmark"
    :class="`postmark--${size}`"
  >
    {{ lines[0] }}<br>{{ lines[1] }}
  </div>
</template>

<style scoped lang="scss">
.postmark {
  --postmark-size: 78px;

  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: var(--postmark-size);
  height: var(--postmark-size);
  border-radius: var(--rv-radius-round);
  border: var(--rv-border-thick) solid var(--rv-color-ink);
  text-align: center;
  font-family: var(--rv-font-mono);
  font-size: var(--rv-text-9-5);
  letter-spacing: var(--rv-tracking-10);
  line-height: var(--rv-leading-140);
  color: var(--rv-color-ink);
  transform: rotate(var(--postmark-rotate, -8deg));

  &--sm {
    --postmark-size: 72px;
  }
}
</style>
