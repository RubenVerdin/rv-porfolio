<script setup lang="ts">
import type { AboutPortrait, StampView } from '~/types/content'

// A tilted paper print with a stamp and a postmark. Drop a photo in via
// `src` and the frame tones it to the edition: sepia print, accent wash,
// ink halftone and a vignette (night darkens it and screens the dots).
defineProps<AboutPortrait & {
  stamp: StampView
  postmark: [string, string]
}>()
</script>

<template>
  <figure class="about-portrait">
    <Stamp
      v-bind="stamp"
      class="about-portrait__stamp"
      aria-hidden="true"
    />
    <div class="about-portrait__frame">
      <img
        v-if="src"
        class="about-portrait__photo"
        :src="src"
        :alt="alt"
      >
      <div class="about-portrait__vignette" />
      <div
        v-if="!src"
        class="about-portrait__placeholder"
      >
        <span class="about-portrait__placeholder-label">[ Your portrait · 4:5 ]</span>
      </div>
    </div>
    <figcaption class="about-portrait__caption">
      <span>{{ caption }}</span>
      <span>{{ credit }}</span>
    </figcaption>
    <Postmark
      class="about-portrait__postmark"
      :lines="postmark"
      aria-hidden="true"
    />
  </figure>
</template>

<style scoped lang="scss">
.about-portrait {
  position: relative;
  margin: 0;
  padding: var(--rv-space-16);
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  box-shadow: var(--rv-shadow-paper-lg);
  transform: rotate(-1.2deg);

  @include theme-transition(background-color);

  &__frame {
    position: relative;
    isolation: isolate;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
    background-color: var(--rv-color-chart);
    background-image: repeating-linear-gradient(45deg, var(--rv-color-hatch) 0 1px, transparent 1px 7px);

    // Accent wash: tints the print in the edition's accent.
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      background: var(--rv-color-accent);
      mix-blend-mode: color;
      opacity: 0.16;
      pointer-events: none;
    }

    // Halftone dots.
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 2;
      background: radial-gradient(var(--rv-color-ink) 0.7px, transparent 1.1px) 0 0 / var(--rv-texture-photo-halftone) var(--rv-texture-photo-halftone);
      mix-blend-mode: var(--rv-blend-halftone);
      opacity: var(--rv-opacity-halftone);
      pointer-events: none;
    }
  }

  &__photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: var(--rv-filter-photo);
  }

  &__vignette {
    position: absolute;
    inset: 0;
    z-index: 3;
    box-shadow: var(--rv-shadow-vignette);
    pointer-events: none;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder-label {
    @include label;

    padding: var(--rv-space-8) var(--rv-space-12);
    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__caption {
    @include label;

    display: flex;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-top: var(--rv-space-12);
    color: var(--rv-color-ink-muted);
  }

  &__postmark {
    --postmark-rotate: -14deg;
    --postmark-size: 92px;

    position: absolute;
    right: calc(var(--rv-space-28) * -1);
    bottom: var(--rv-space-56);
    z-index: 5;
    background: var(--rv-color-paper);
  }

  &__stamp {
    position: absolute;
    top: calc(var(--rv-space-24) * -1);
    left: calc(var(--rv-space-24) * -1);
    z-index: 5;
    transform: rotate(-6deg);
  }
}

@include page-below(md) {
  .about-portrait {
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }
}

@include page-below(xs) {
  .about-portrait {
    max-width: 300px;
  }

  .about-portrait__postmark {
    --postmark-size: 72px;
    --postmark-font-size: var(--rv-text-12);

    right: calc(var(--rv-space-12) * -1);
  }

  .about-portrait__stamp {
    top: calc(var(--rv-space-16) * -1);
    left: calc(var(--rv-space-10) * -1);
  }
}
</style>
