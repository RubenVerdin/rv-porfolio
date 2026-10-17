<script setup lang="ts">
// Compass rose glyph for the Menu button. The parent turns the needle by
// setting --compass-needle-turn (e.g. 45deg on hover, 405deg when open).
</script>

<template>
  <svg
    class="compass-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10.5"
    />
    <path
      class="compass-icon__ticks"
      d="M12 1.5v2.5M12 20v2.5M1.5 12h2.5M20 12h2.5"
    />
    <g class="compass-icon__needle">
      <path
        class="compass-icon__north"
        d="M12 4.5l2.4 7.5h-4.8z"
      />
      <path
        class="compass-icon__south"
        d="M12 19.5l2.4-7.5h-4.8z"
      />
    </g>
    <circle
      class="compass-icon__pin"
      cx="12"
      cy="12"
      r="1.2"
    />
  </svg>
</template>

<style scoped lang="scss">
.compass-icon {
  width: var(--rv-size-icon-lg);
  height: var(--rv-size-icon-lg);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;

  &__ticks {
    stroke-width: 1.6;
  }

  &__needle {
    transform-origin: 12px 12px;
    transform: rotate(var(--compass-needle-turn, 0deg));
    transition: transform var(--rv-duration-700) var(--rv-ease-needle);
  }

  &__north {
    fill: var(--rv-color-accent);
    stroke: none;
  }

  &__south {
    fill: currentColor;
    stroke: none;
    opacity: 0.55;
  }

  &__pin {
    fill: currentColor;
    stroke: none;
  }
}
</style>
