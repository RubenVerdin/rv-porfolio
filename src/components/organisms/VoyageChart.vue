<script setup lang="ts">
import { chartCaption } from '~/data/site'

const { territories, selected, select, stateOf, isActive, onKeydown } = useVoyageChart()
</script>

<template>
  <Container
    id="about"
    tag="section"
    class="voyage-chart"
    aria-label="Map of what I do"
  >
    <figure class="voyage-chart__figure">
      <div class="voyage-chart__frame">
        <div
          class="voyage-chart__inner"
          @keydown="onKeydown"
        >
          <!-- Only the artwork + overlay controls live in the stage, so the
               buttons' % positions line up with the SVG. -->
          <div class="voyage-chart__stage">
            <VoyageChartMap
              :state-of="stateOf"
              @select="select"
            />
            <div
              class="voyage-chart__glow"
              aria-hidden="true"
            />
            <TerritoryButton
              v-for="territory in territories"
              :key="territory.id"
              :territory="territory"
              :pressed="isActive(territory.id)"
              @click="select(territory.id)"
            />
            <div class="voyage-chart__note">
              <span class="voyage-chart__note-kicker">{{ chartCaption.howTo }}</span>
              <span class="voyage-chart__note-text">{{ chartCaption.hint }}</span>
            </div>
          </div>

          <div
            class="voyage-chart__legend"
            role="group"
            aria-label="Territories"
          >
            <span class="voyage-chart__legend-hint">{{ chartCaption.tapHint }}</span>
            <TerritoryButton
              v-for="territory in territories"
              :key="territory.id"
              :territory="territory"
              :pressed="isActive(territory.id)"
              variant="legend"
              @click="select(territory.id)"
            />
          </div>

          <Cartouche :territory="selected" />
        </div>
      </div>
      <figcaption class="voyage-chart__caption">
        <span class="voyage-chart__caption-title">{{ chartCaption.title }}</span>
        <MonoLabel tone="muted">{{ chartCaption.scale }}</MonoLabel>
      </figcaption>
    </figure>
  </Container>
</template>

<style scoped lang="scss">
.voyage-chart {
  padding-top: var(--rv-space-8);

  &__frame {
    position: relative;
    padding: var(--rv-space-10);
    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);

    @include theme-transition(background-color, border-color);
  }

  &__inner {
    position: relative;
    container: voyage-chart / inline-size;
    background: var(--rv-color-chart);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);

    @include theme-transition(background-color);
  }

  &__stage {
    position: relative;
  }

  &__glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(60% 55% at 50% 50%, var(--rv-color-chart-glow), transparent 70%);
    opacity: var(--rv-glow);
    transition: opacity var(--rv-duration-800);
  }

  // "How to read this chart" sticky note (desktop only)
  &__note {
    position: absolute;
    top: 3%;
    left: 50%;
    z-index: var(--rv-layer-raised);
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-4);
    max-width: min(var(--rv-size-sticky-note), 40%);
    padding: var(--rv-space-16) var(--rv-space-20);
    background: var(--rv-color-sticky-note);
    color: var(--rv-object-ink);
    box-shadow: var(--rv-shadow-paper-sm);
    transform: translateX(-50%) rotate(-2deg);

    &::before {
      content: '';
      position: absolute;
      top: calc(var(--rv-space-6) * -1);
      left: 50%;
      width: var(--rv-space-12);
      height: var(--rv-space-12);
      margin-left: calc(var(--rv-space-6) * -1);
      border-radius: var(--rv-radius-round);
      background: var(--rv-object-red);
      box-shadow: var(--rv-shadow-lift);
    }
  }

  &__note-kicker {
    @include label(var(--rv-text-12));

    color: var(--rv-object-ink-muted);
  }

  &__note-text {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-17);
    line-height: var(--rv-leading-130);
  }

  &__legend {
    display: none;
  }

  &__legend-hint {
    grid-column: 1 / -1;
    padding: var(--rv-space-2) var(--rv-space-2) var(--rv-space-4);
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-16);
  }

  &__caption {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--rv-space-8) var(--rv-space-20);
    padding-top: var(--rv-space-12);
  }

  &__caption-title {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-16);
  }
}

@include container-below(voyage-chart, 760px) {
  .voyage-chart__note {
    display: none;
  }
}

@include container-below(voyage-chart, 620px) {
  .voyage-chart__legend {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--rv-space-8);
    padding: var(--rv-space-12);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}
</style>
