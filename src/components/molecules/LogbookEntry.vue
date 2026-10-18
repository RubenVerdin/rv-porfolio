<script setup lang="ts">
import type { LogEntry } from '~/types/content'

// One port on the logbook route: when │ port dot │ role, company, notes │ where.
// Each entry draws its own stretch of the dashed route through the dot, so
// stacked entries read as one line. Below 900px the line moves to the left.
defineProps<LogEntry>()
</script>

<template>
  <div
    class="logbook-entry"
    :class="{ 'logbook-entry--current': current }"
  >
    <span class="logbook-entry__when">{{ when }}</span>
    <span
      class="logbook-entry__port"
      aria-hidden="true"
    />
    <div class="logbook-entry__body">
      <h3 class="logbook-entry__role">
        {{ role }}
      </h3>
      <div class="logbook-entry__company">
        {{ company }}
      </div>
      <p class="logbook-entry__description">
        {{ description }}
      </p>
    </div>
    <span class="logbook-entry__where">{{ where }}</span>
  </div>
</template>

<style scoped lang="scss">
.logbook-entry {
  --logbook-entry-when: 130px;
  --logbook-entry-port: 40px;
  --logbook-entry-where: 260px;
  --logbook-entry-gap: var(--rv-space-24);
  --logbook-entry-dot: 18px;
  // Centre of the port column, minus half the route's width.
  --logbook-entry-route-x: calc(var(--logbook-entry-when) + var(--logbook-entry-gap) + var(--logbook-entry-port) / 2 - var(--rv-border-thick) / 2);

  position: relative;
  display: grid;
  grid-template-columns: var(--logbook-entry-when) var(--logbook-entry-port) minmax(0, 1fr) minmax(0, var(--logbook-entry-where));
  align-items: baseline;
  gap: 0 var(--logbook-entry-gap);
  padding: var(--rv-space-32) 0;
  border-bottom: var(--rv-border-hairline) solid var(--rv-color-faint);

  // The dashed route.
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--logbook-entry-route-x);
    border-left: var(--rv-border-thick) dashed var(--rv-color-accent);
    opacity: 0.75;
  }

  &:first-child::before {
    top: var(--rv-space-10);
  }

  &:last-child {
    border-bottom: 0;

    &::before {
      bottom: var(--rv-space-10);
    }
  }

  &__when,
  &__where {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    text-transform: uppercase;
    text-align: right;
    color: var(--rv-color-ink-muted);
  }

  &__when {
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
  }

  &__where {
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
  }

  &__port {
    position: relative;
    justify-self: center;
    align-self: center;
    width: var(--logbook-entry-dot);
    height: var(--logbook-entry-dot);
    border-radius: var(--rv-radius-round);
    background: var(--rv-color-ground);
    border: var(--rv-border-thick) solid var(--rv-color-accent);

    &::after {
      content: '';
      position: absolute;
      inset: var(--rv-space-4);
      border-radius: var(--rv-radius-round);
      background: var(--rv-color-accent);
    }
  }

  &--current &__port {
    box-shadow: var(--rv-shadow-port-ring);
  }

  &__role {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-32);
    line-height: var(--rv-leading-110);
  }

  &__company {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-20);
    color: var(--rv-color-ink-muted);
  }

  &__description {
    max-width: 60ch;
    margin-top: var(--rv-space-10);
    font-size: var(--rv-text-17);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-ink-muted);
  }
}

@include page-below(md) {
  .logbook-entry {
    --logbook-entry-port: 20px;
    --logbook-entry-route-x: calc(var(--logbook-entry-port) / 2 - var(--rv-border-thick) / 2);

    grid-template-columns: var(--logbook-entry-port) minmax(0, 1fr);
    gap: var(--rv-space-4) var(--rv-space-20);
  }

  .logbook-entry__when {
    grid-column: 2;
    order: -1;
    text-align: left;
  }

  .logbook-entry__port {
    grid-column: 1;
    grid-row: 1 / span 3;
    align-self: start;
    margin-top: var(--rv-space-4);
  }

  .logbook-entry__where {
    grid-column: 2;
    text-align: left;
  }
}

@include page-below(xs) {
  .logbook-entry__role {
    font-size: var(--rv-text-24);
  }
}
</style>
