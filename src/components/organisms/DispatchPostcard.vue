<script setup lang="ts">
import type { DispatchView } from '~/types/content'
import { city, signature } from '~/data/site'

// "Greetings from" postcard that turns over on hover/focus: the back shows
// the title and read time while the postmark slams in and the stamp pops.
defineProps<{
  dispatch: DispatchView
}>()

const address = ['To: you, the reader', `From: ${signature}, ${city}`]
</script>

<template>
  <NuxtLink
    :to="dispatch.to"
    class="dispatch-postcard"
    :style="{ '--dispatch-postcard-tilt': `${dispatch.tilt}deg` }"
    :aria-label="`${dispatch.number} — ${dispatch.title}, ${dispatch.readTime}`"
  >
    <div class="dispatch-postcard__card">
      <div
        class="dispatch-postcard__face dispatch-postcard__face--front"
        :class="`dispatch-postcard__face--${dispatch.ground}`"
      >
        <span class="dispatch-postcard__greeting">Greetings from</span>
        <span class="dispatch-postcard__word">{{ dispatch.word }}</span>
        <div class="dispatch-postcard__strip">
          <span class="dispatch-postcard__strip-title">{{ dispatch.title }}</span>
          <MonoLabel>{{ dispatch.number }}</MonoLabel>
        </div>
      </div>

      <div class="dispatch-postcard__face dispatch-postcard__face--back">
        <div class="dispatch-postcard__message">
          <MonoLabel tone="accent">
            {{ dispatch.number }} · {{ dispatch.category }}
          </MonoLabel>
          <h3 class="dispatch-postcard__title">
            {{ dispatch.title }}
          </h3>
          <MonoLabel>{{ dispatch.readTime }} · Read →</MonoLabel>
        </div>
        <div class="dispatch-postcard__address">
          <div class="dispatch-postcard__marks">
            <Postmark
              class="dispatch-postcard__postmark"
              :lines="[dispatch.postmark.date, dispatch.postmark.year]"
            />
            <Stamp
              class="dispatch-postcard__stamp"
              v-bind="dispatch.stamp"
            />
          </div>
          <AddressLines
            class="dispatch-postcard__lines"
            :lines="address"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.dispatch-postcard {
  display: block;
  container: dispatch-postcard / inline-size;
  perspective: var(--rv-perspective-card);
  color: var(--rv-color-ink);
  text-decoration: none;
  outline-offset: var(--rv-space-6);
  transform: rotate(var(--dispatch-postcard-tilt, -1deg));

  &:hover {
    color: var(--rv-color-ink);
  }

  &__card {
    position: relative;
    aspect-ratio: 3 / 2;
    transform-style: preserve-3d;
    transition: transform var(--rv-duration-1000) var(--rv-ease-flip);
  }

  &:hover &__card,
  &:focus-visible &__card {
    transform: rotateY(180deg);
  }

  &__face {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
    box-shadow: var(--rv-shadow-paper);
    backface-visibility: hidden;

    &--front {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--rv-space-6);
    }

    &--back {
      display: flex;
      padding: var(--rv-space-22);
      transform: rotateY(180deg);
    }

    // Patterned grounds behind the big word.
    &--sun {
      background: repeating-conic-gradient(from 0deg at 50% 120%, var(--rv-color-accent) 0 5deg, var(--rv-color-paper) 5deg 10deg);
    }

    &--ruled {
      background-color: var(--rv-color-paper);
      background-image:
        linear-gradient(90deg, transparent 54px, var(--rv-color-accent) 54px 56px, transparent 56px),
        repeating-linear-gradient(0deg, var(--rv-color-faint) 0 1px, transparent 1px 26px);
    }

    &--tiles {
      background: repeating-conic-gradient(var(--rv-color-seal) 0 25%, var(--rv-color-paper) 0 50%) 0 0 / 56px 56px;
    }

    &--lanes {
      background:
        repeating-linear-gradient(115deg, var(--rv-color-ink) 0 2px, transparent 2px 18px),
        var(--rv-color-chart);
    }
  }

  &__greeting {
    padding: var(--rv-space-2) var(--rv-space-12);
    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-22);
  }

  &__word {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-bold);
    font-size: var(--rv-text-postcard-word);
    line-height: var(--rv-leading-88);
    letter-spacing: var(--rv-tracking-1);
    text-align: center;
    text-transform: uppercase;
    white-space: pre-line;
    color: var(--rv-color-paper);
    -webkit-text-stroke: var(--rv-border-thick) var(--rv-color-ink);
    text-shadow: 5px 5px 0 var(--rv-color-ink);
  }

  &__strip {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding: var(--rv-space-10) var(--rv-space-14);
    background: var(--rv-color-paper);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__strip-title {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-16);
  }

  &__message {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding-right: var(--rv-space-20);
    border-right: var(--rv-border-hairline) solid var(--rv-color-ink-muted);
  }

  &__title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-postcard-title);
    line-height: var(--rv-leading-108);
  }

  &__address {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--rv-space-16);
    padding-left: var(--rv-space-20);
  }

  &__marks {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__postmark {
    --postmark-rotate: -10deg;
  }

  &__lines {
    margin-top: auto;
  }

  &:hover &__postmark,
  &:focus-visible &__postmark {
    animation: slam var(--rv-duration-550) var(--rv-duration-450) var(--rv-ease-spring) both;
  }

  &:hover &__stamp,
  &:focus-visible &__stamp {
    animation: pop var(--rv-duration-400) var(--rv-duration-300) both;
  }
}

// Narrow card: the back keeps only the message.
@include container-below(dispatch-postcard, 440px) {
  .dispatch-postcard__face--back {
    padding: var(--rv-space-16);
  }

  .dispatch-postcard__address {
    display: none;
  }

  .dispatch-postcard__message {
    padding-right: 0;
    border-right: 0;
  }

  .dispatch-postcard__greeting {
    font-size: var(--rv-text-16);
  }

  .dispatch-postcard__strip-title {
    font-size: var(--rv-text-14);
  }
}
</style>
