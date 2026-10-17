<script setup lang="ts">
// Reading progress as a voyage: a dotted route fills in and a ship sails it
// as the page scrolls; the port at the end pulses on arrival. Pinned to the
// top of the window and hidden until the header scrolls away (≥1025px only).
// Decorative — the browser's scrollbar stays the real control.
const { progress, shown, docked } = useScrollProgress()
const percent = computed(() => `${Math.round(progress.value * 100)}%`)
</script>

<template>
  <div
    class="voyage-progress"
    :class="{
      'voyage-progress--shown': shown,
      'voyage-progress--docked': docked,
    }"
    :style="{ '--voyage-progress': progress }"
    aria-hidden="true"
  >
    <div class="voyage-progress__band">
      <Container class="voyage-progress__inner">
        <span class="voyage-progress__log">Log · <b class="voyage-progress__percent">{{ percent }}</b></span>
        <div class="voyage-progress__track">
          <span class="voyage-progress__route" />
          <span class="voyage-progress__ticks" />
          <span class="voyage-progress__route voyage-progress__route--sailed" />
          <svg
            class="voyage-progress__ship"
            viewBox="-15 -27 30 34"
          >
            <g class="voyage-progress__ship-bob"><path
              class="voyage-progress__ship-hull"
              d="M-13,0 L13,0 L8,6 L-9,6 Z"
            /><path
              class="voyage-progress__ship-sail"
              d="M0,-1 L0,-20 L11,-2 Z"
            /><path
              class="voyage-progress__ship-sail"
              d="M-2,-17 L-11,-2 L-2,-2 Z"
            /><path
              class="voyage-progress__ship-flag"
              d="M0,-20 L6,-23 L0,-25 Z"
            /></g>
          </svg>
        </div>
        <span class="voyage-progress__port" />
      </Container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.voyage-progress {
  // Component geometry (design: 48px band; the route runs on the 38px line,
  // the ship's hull sits just above it).
  --voyage-progress-route-top: 35px;
  --voyage-progress-route-height: 6px;
  --voyage-progress-ticks-top: 42px;
  --voyage-progress-ticks-height: 4px;
  --voyage-progress-dot-pitch: 9px;
  --voyage-progress-ship-width: 30px;
  --voyage-progress-ship-height: 34px;
  --voyage-progress-port: 12px;
  --voyage-progress-percent-width: 4ch;

  // Zero-height sticky anchor at the top of the page: the band hangs from
  // it, so it never takes space and never travels with the content.
  position: sticky;
  top: 0;
  z-index: var(--rv-layer-sticky);
  height: 0;

  &__band {
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: var(--rv-height-voyage-band);
    background-color: var(--rv-color-ground);
    box-shadow: var(--rv-shadow-band);
    opacity: 0;
    transform: translateY(calc(-1 * var(--rv-space-10)));
    pointer-events: none;
    transition:
      transform var(--rv-duration-band-out) var(--rv-ease-band-out),
      opacity var(--rv-duration-band-out-fade) ease,
      background-color var(--rv-duration-theme) ease;
  }

  &--shown &__band {
    opacity: 1;
    transform: none;
    transition:
      transform var(--rv-duration-band-in) var(--rv-ease-band-in),
      opacity var(--rv-duration-band-in-fade) ease,
      background-color var(--rv-duration-theme) ease;
  }

  &__inner {
    display: flex;
    align-items: flex-end;
    gap: var(--rv-space-18);
    height: 100%;
  }

  &__log {
    @include label(var(--rv-text-10));

    flex: none;
    margin-bottom: var(--rv-space-3);
    color: var(--rv-color-ink-muted);
    line-height: var(--rv-leading-140);
    white-space: nowrap;
  }

  &__percent {
    display: inline-block;
    min-width: var(--voyage-progress-percent-width);
    color: var(--rv-color-accent);
    font-weight: var(--rv-weight-medium);
    text-align: right;
  }

  &__track {
    position: relative;
    flex: 1;
    height: 100%;
  }

  &__route {
    position: absolute;
    top: var(--voyage-progress-route-top);
    inset-inline: 0;
    height: var(--voyage-progress-route-height);
    background:
      radial-gradient(circle, var(--rv-color-hatch) 1px, transparent 1.4px)
      left center / var(--voyage-progress-dot-pitch) var(--voyage-progress-route-height) repeat-x;

    &--sailed {
      inset-inline-end: auto;
      width: calc(var(--voyage-progress) * 100%);
      background:
        radial-gradient(circle, var(--rv-color-accent) 1.6px, transparent 2px)
        left center / var(--voyage-progress-dot-pitch) var(--voyage-progress-route-height) repeat-x;
      transition: width var(--rv-duration-120) linear;
    }
  }

  // Chart scale: a tick every 10% of the voyage.
  &__ticks {
    position: absolute;
    top: var(--voyage-progress-ticks-top);
    inset-inline: 0;
    height: var(--voyage-progress-ticks-height);
    background: repeating-linear-gradient(to right, var(--rv-color-hatch) 0 1px, transparent 1px 10%);
  }

  &__ship {
    position: absolute;
    top: var(--rv-space-2);
    left: calc(var(--voyage-progress) * 100%);
    width: var(--voyage-progress-ship-width);
    height: var(--voyage-progress-ship-height);
    margin-left: calc(var(--voyage-progress-ship-width) / -2);
    overflow: visible;
    transition: left var(--rv-duration-120) linear;
  }

  &__ship-hull {
    fill: var(--rv-color-ink);
  }

  &__ship-sail {
    fill: var(--rv-color-paper);
    stroke: var(--rv-color-ink);
    stroke-width: 1;
    stroke-linejoin: round;
  }

  &__ship-flag {
    fill: var(--rv-color-accent);
  }

  &__ship-bob {
    animation: bob var(--rv-duration-2400) var(--rv-ease-in-out) infinite;
  }

  &__port {
    position: relative;
    flex: none;
    width: var(--voyage-progress-port);
    height: var(--voyage-progress-port);
    margin-bottom: var(--rv-space-4);
    border: var(--rv-border-thick) solid var(--rv-color-accent);
    border-radius: var(--rv-radius-round);

    &::after {
      content: '';
      position: absolute;
      inset: var(--rv-space-2);
      border-radius: var(--rv-radius-round);
      background: var(--rv-color-accent);
    }

    // Arrival ring, only animated once docked.
    &::before {
      content: '';
      position: absolute;
      inset: calc(-1 * var(--rv-space-6));
      border: var(--rv-border-medium) solid var(--rv-color-accent);
      border-radius: var(--rv-radius-round);
      opacity: 0;
    }
  }

  &--docked &__port::before {
    animation: voyage-progress-arrive var(--rv-duration-1600) var(--rv-ease-out) infinite;
  }
}

@keyframes voyage-progress-arrive {
  0% { opacity: 0.9; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(1.6); }
}

// Desktop only: on tablet and phone the band is hidden (decision 2026-10-17).
@include page-below(lg) {
  .voyage-progress {
    display: none;
  }
}
</style>
