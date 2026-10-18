<script setup lang="ts">
// Fenced code blocks in markdown. ```vue [Card.vue] → header shows the
// filename and the language, as in the design's `.code-h`.
const props = withDefaults(defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: () => [],
  meta: null,
  class: null,
})

const languageLabel = computed(() => props.language ?? 'text')
</script>

<template>
  <div class="code-block">
    <div class="code-block__header">
      <span>{{ filename ?? languageLabel }}</span>
      <span>{{ languageLabel }}</span>
    </div>
    <pre
      class="code-block__pre"
      :class="props.class"
    ><slot /></pre>
  </div>
</template>

<style scoped lang="scss">
.code-block {
  overflow: hidden;
  background: var(--rv-color-inverse-bg);
  color: var(--rv-color-inverse-fg);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);

  @include theme-transition(background-color, color);

  &__header {
    @include label(var(--rv-text-12), var(--rv-tracking-8));

    display: flex;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding: var(--rv-space-10) var(--rv-space-20);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-inverse-rule);
    color: var(--rv-color-inverse-muted);
  }

  &__pre {
    margin: 0;
    padding: var(--rv-space-20);
    overflow-x: auto;
    scrollbar-color: var(--rv-color-inverse-muted) var(--rv-color-inverse-bg);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-14);
    line-height: var(--rv-leading-170);
    white-space: pre;
  }
}
</style>
