<script setup lang="ts">
// Kicker bar over a big display title with an italic accent:
// "Section B — The Atlas of Works" / "Good ideas. *Carefully* made."
withDefaults(defineProps<{
  kicker: string
  aside?: string
  link?: { label: string, to: string }
  title?: string
  accent?: string
  /** Text after the accent, e.g. "made." */
  tail?: string
  tag?: 'h1' | 'h2'
  /** `page` = the quieter page heading (no rule, enters on load). */
  variant?: 'section' | 'page'
}>(), {
  aside: undefined,
  link: undefined,
  title: undefined,
  accent: undefined,
  tail: undefined,
  tag: 'h2',
  variant: 'section',
})
</script>

<template>
  <div
    class="section-head"
    :class="`section-head--${variant}`"
  >
    <div class="section-head__bar">
      <MonoLabel class="section-head__kicker">
        {{ kicker }}
      </MonoLabel>
      <NuxtLink
        v-if="link"
        :to="link.to"
        class="section-head__link"
      >
        {{ link.label }} →
      </NuxtLink>
      <MonoLabel
        v-else-if="aside"
        class="section-head__kicker"
        tone="muted"
      >
        {{ aside }}
      </MonoLabel>
    </div>
    <component
      :is="tag"
      v-if="title || accent"
      class="section-head__title"
      :class="{ 'u-press-in': variant === 'section' }"
    >
      {{ title }} <em
        v-if="accent"
        class="section-head__accent"
      >{{ accent }}</em>{{ tail ? ` ${tail}` : '' }}
    </component>
  </div>
</template>

<style scoped lang="scss">
.section-head {
  &__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-top: var(--rv-space-14);
    border-top: var(--rv-border-double) double var(--rv-color-ink);
  }

  &__link {
    @include label;

    padding: var(--rv-space-12) 0;
    text-decoration: none;
  }

  &__title {
    margin-top: var(--rv-space-28);
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-section);
    line-height: var(--rv-leading-95);
    letter-spacing: var(--rv-tracking-neg-1-5);
  }

  &__accent {
    color: var(--rv-color-accent);
  }

  &--page {
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-22);
  }

  &--page &__bar {
    border-top-color: transparent;
  }

  &--page &__title {
    margin: 0;
    animation: head-in var(--rv-duration-900) var(--rv-ease-soft) both;
  }
}

@include page-below(xs) {
  .section-head__kicker,
  .section-head__link {
    font-size: var(--rv-text-11);
  }

  .section-head--page {
    gap: var(--rv-space-16);
  }
}
</style>
