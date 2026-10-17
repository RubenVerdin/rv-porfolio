<script setup lang="ts">
import type { CrossBannerPreset } from '~/types/content'

// Full-bleed dark banner linking to the other section: a ship sails a
// dotted route to a pulsing port under a huge headline, with a marquee
// ribbon of words along the bottom. Chart artwork is verbatim from
// CrossBanner.dc.html.
const props = defineProps<{
  banner: CrossBannerPreset
}>()

const svg = ref<SVGSVGElement | null>(null)
const { reducedMotion } = useVoyageTimeline(svg)

// Four passes of the words; the marquee scrolls by half, so it loops.
const ribbon = computed(() => Array.from({ length: 4 }, () => props.banner.words).flat())
</script>

<template>
  <section
    class="cross-banner"
    :aria-label="banner.kicker"
  >
    <svg
      ref="svg"
      class="cross-banner__sea"
      viewBox="0 0 1440 680"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs><mask
        id="xbMask"
        maskUnits="userSpaceOnUse"
        x="-100"
        y="0"
        width="1640"
        height="680"
      ><path
        class="cross-banner__route-mask"
        pathLength="1000"
        d="M-40,560 C220,600 360,420 560,470 C760,520 860,640 980,520 C1060,440 1080,360 1180,320"
      /></mask><path
        id="xbRoute"
        d="M-40,560 C220,600 360,420 560,470 C760,520 860,640 980,520 C1060,440 1080,360 1180,320"
      /></defs>
      <line
        class="cross-banner__graticule"
        x1="0"
        y1="80"
        x2="1440"
        y2="80"
      /><line
        class="cross-banner__graticule"
        x1="0"
        y1="200"
        x2="1440"
        y2="200"
      /><line
        class="cross-banner__graticule"
        x1="0"
        y1="320"
        x2="1440"
        y2="320"
      /><line
        class="cross-banner__graticule"
        x1="0"
        y1="440"
        x2="1440"
        y2="440"
      /><line
        class="cross-banner__graticule"
        x1="0"
        y1="560"
        x2="1440"
        y2="560"
      /><line
        class="cross-banner__graticule"
        x1="0"
        y1="680"
        x2="1440"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="120"
        y1="0"
        x2="120"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="300"
        y1="0"
        x2="300"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="480"
        y1="0"
        x2="480"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="660"
        y1="0"
        x2="660"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="840"
        y1="0"
        x2="840"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="1020"
        y1="0"
        x2="1020"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="1200"
        y1="0"
        x2="1200"
        y2="680"
      /><line
        class="cross-banner__graticule"
        x1="1380"
        y1="0"
        x2="1380"
        y2="680"
      />
      <line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="2880"
        y2="320"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2847"
        y2="652"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2751"
        y2="971"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2593"
        y2="1264"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="2382"
        y2="1522"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2124"
        y2="1733"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="1831"
        y2="1891"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="1512"
        y2="1987"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="1180"
        y2="2020"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="848"
        y2="1987"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="529"
        y2="1891"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="236"
        y2="1733"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="-22"
        y2="1522"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-233"
        y2="1264"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-391"
        y2="971"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-487"
        y2="652"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="-520"
        y2="320"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-487"
        y2="-12"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-391"
        y2="-331"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="-233"
        y2="-624"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="-22"
        y2="-882"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="236"
        y2="-1093"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="529"
        y2="-1251"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="848"
        y2="-1347"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="1180"
        y2="-1380"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="1512"
        y2="-1347"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="1831"
        y2="-1251"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2124"
        y2="-1093"
      /><line
        class="cross-banner__rhumb cross-banner__rhumb--major"
        x1="1180"
        y1="320"
        x2="2382"
        y2="-882"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2593"
        y2="-624"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2751"
        y2="-331"
      /><line
        class="cross-banner__rhumb"
        x1="1180"
        y1="320"
        x2="2847"
        y2="-12"
      />
      <g transform="translate(1180 320)"><g class="cross-banner__rose"><circle
        class="cross-banner__rose-ring"
        r="200"
      /><circle
        class="cross-banner__rose-ring"
        r="188"
      /><circle
        class="cross-banner__rose-ring"
        r="120"
      /><polygon
        class="cross-banner__rose-star"
        points="0.0,-150.0 10.7,-25.9 56.6,-56.6 25.9,-10.7 150.0,0.0 25.9,10.7 56.6,56.6 10.7,25.9 0.0,150.0 -10.7,25.9 -56.6,56.6 -25.9,10.7 -150.0,0.0 -25.9,-10.7 -56.6,-56.6 -10.7,-25.9"
      /><polygon
        class="cross-banner__rose-north"
        points="0,-150 10,-28 0,0 -10,-28"
      /></g></g>
      <path
        class="cross-banner__route"
        d="M-40,560 C220,600 360,420 560,470 C760,520 860,640 980,520 C1060,440 1080,360 1180,320"
        mask="url(#xbMask)"
      />
      <circle
        class="cross-banner__pulse"
        cx="1180"
        cy="320"
        r="12"
      />
      <circle
        class="cross-banner__port"
        cx="1180"
        cy="320"
        r="10"
      /><circle
        class="cross-banner__port-dot"
        cx="1180"
        cy="320"
        r="4"
      />
      <g
        class="cross-banner__ship"
        :transform="reducedMotion ? 'translate(1180 320)' : undefined"
      ><animateMotion
         v-if="!reducedMotion"
         dur="7s"
         begin="0.4s"
         fill="freeze"
         rotate="auto"
         calcMode="spline"
         keyPoints="0;1"
         keyTimes="0;1"
         keySplines="0.6 0.1 0.4 1"
       ><mpath href="#xbRoute"/></animateMotion>
        <g transform="translate(0 -6) scale(1.6)"><g class="cross-banner__ship-bob"><path
          class="cross-banner__ship-hull"
          d="M-13,0 L13,0 L8,6 L-9,6 Z"
        /><path
          class="cross-banner__ship-sail"
          d="M0,-1 L0,-20 L11,-2 Z"
        /><path
          class="cross-banner__ship-sail"
          d="M-2,-17 L-11,-2 L-2,-2 Z"
        /><path
          class="cross-banner__ship-flag"
          d="M0,-20 L6,-23 L0,-25 Z"
        /></g></g></g>
    </svg>
    <Container class="cross-banner__content">
      <span class="cross-banner__kicker">{{ banner.kicker }}</span>
      <h2 class="cross-banner__title">
        <NuxtLink
          :to="banner.to"
          class="cross-banner__title-link"
        >
          {{ banner.title }} <em class="cross-banner__accent">{{ banner.accent }}</em>
        </NuxtLink>
      </h2>
      <p class="cross-banner__dek">
        {{ banner.dek }}
      </p>
      <BaseButton
        :to="banner.to"
        variant="inverse"
        size="lg"
      >
        {{ banner.cta }}
      </BaseButton>
    </Container>
    <div
      class="cross-banner__ribbon"
      aria-hidden="true"
    >
      <div class="cross-banner__track">
        <span
          v-for="(word, index) in ribbon"
          :key="index"
          class="cross-banner__word"
          :class="{ 'cross-banner__word--alt': index % 2 === 1 }"
        >{{ word }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cross-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: var(--rv-height-banner);
  overflow: hidden;
  background: var(--rv-color-inverse-bg);
  color: var(--rv-color-inverse-fg);

  @include theme-transition(background-color, color);

  // Chart artwork
  &__sea {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__graticule {
    fill: none;
    stroke: var(--rv-color-inverse-fg);
    stroke-width: 0.6;
    opacity: 0.12;
  }

  &__rhumb {
    stroke: var(--rv-color-inverse-fg);
    stroke-width: 0.6;
    opacity: 0.14;

    &--major {
      stroke: var(--rv-color-telegram);
      opacity: 0.28;
    }
  }

  &__rose {
    transform-box: fill-box;
    transform-origin: center;
    animation: spin var(--rv-duration-spin-slower) linear infinite;
  }

  &__rose-ring {
    fill: none;
    stroke: var(--rv-color-inverse-fg);
    stroke-width: 1.2;
    opacity: 0.45;
  }

  &__rose-star {
    fill: none;
    stroke: var(--rv-color-inverse-fg);
    stroke-width: 1.2;
    opacity: 0.55;
  }

  &__rose-north {
    fill: var(--rv-color-telegram);
    opacity: 0.85;
  }

  &__route {
    fill: none;
    stroke: var(--rv-color-telegram);
    stroke-width: 2.4;
    stroke-dasharray: 9 8;
    stroke-linecap: round;
    opacity: 0.85;
  }

  &__route-mask {
    fill: none;
    stroke: var(--rv-object-mask);
    stroke-width: 14;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw var(--rv-duration-voyage-banner) var(--rv-ease-voyage) 0.4s forwards;
  }

  &__port {
    fill: var(--rv-color-inverse-bg);
    stroke: var(--rv-color-telegram);
    stroke-width: 2;
  }

  &__port-dot {
    fill: var(--rv-color-telegram);
  }

  &__pulse {
    fill: none;
    stroke: var(--rv-color-telegram);
    stroke-width: 2;
    transform-box: fill-box;
    transform-origin: center;
    animation: pulse var(--rv-duration-2000) var(--rv-ease-out) infinite;
  }

  &__ship-hull {
    fill: var(--rv-color-inverse-fg);
  }

  &__ship-sail {
    fill: var(--rv-color-inverse-bg);
    stroke: var(--rv-color-inverse-fg);
    stroke-width: 1.4;
  }

  &__ship-flag {
    fill: var(--rv-color-telegram);
  }

  &__ship-bob {
    animation: bob var(--rv-duration-2400) var(--rv-ease-in-out) infinite;
  }

  // Copy
  &__content {
    position: relative;
    z-index: var(--rv-layer-base);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--rv-space-26);
    width: 100%;
    padding-top: var(--rv-space-110);
    padding-bottom: var(--rv-space-150);
  }

  &__kicker {
    @include label;

    display: flex;
    align-items: center;
    gap: var(--rv-space-14);
    color: var(--rv-color-inverse-muted);

    &::before {
      content: '';
      width: var(--rv-space-48);
      border-top: var(--rv-border-hairline) solid var(--rv-color-inverse-muted);
    }
  }

  &__title {
    max-width: 12ch;
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-banner);
    line-height: var(--rv-leading-90);
    letter-spacing: var(--rv-tracking-neg-2);
  }

  &__title-link,
  &__title-link:hover {
    color: inherit;
    text-decoration: none;
  }

  &__accent {
    color: var(--rv-color-telegram);
  }

  &__dek {
    max-width: 40ch;
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-inverse-muted);
  }

  &__ribbon {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--rv-layer-base);
    overflow: hidden;
    border-top: var(--rv-border-hairline) solid var(--rv-color-inverse-rule);
  }

  &__track {
    display: flex;
    width: max-content;
    animation: marquee var(--rv-duration-marquee-banner) linear infinite;
  }

  &__word {
    padding: var(--rv-space-14) var(--rv-space-26);
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-bold);
    font-size: var(--rv-text-44);
    letter-spacing: var(--rv-tracking-6);
    text-transform: uppercase;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke: var(--rv-border-hairline) var(--rv-color-inverse-muted);

    &--alt {
      font-family: var(--rv-font-display);
      font-weight: var(--rv-weight-regular);
      font-size: var(--rv-text-36);
      text-transform: none;
      color: var(--rv-color-telegram);
      -webkit-text-stroke: 0;
    }
  }
}

@supports (animation-timeline: view()) {
  .cross-banner__title {
    animation: press-in linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
}

@include page-below(lg) {
  .cross-banner__content {
    padding-inline: var(--rv-space-20);
  }
}

@include page-below(md) {
  .cross-banner {
    min-height: var(--rv-height-banner-md);
  }

  .cross-banner__content {
    padding-top: var(--rv-space-80);
    padding-bottom: var(--rv-space-130);
  }
}

@include page-below(xs) {
  .cross-banner {
    min-height: var(--rv-height-banner-sm);
  }

  .cross-banner__content {
    padding: var(--rv-space-64) var(--rv-space-16) var(--rv-space-110);
  }

  .cross-banner__title {
    font-size: var(--rv-text-58);
  }

  .cross-banner__dek {
    font-size: var(--rv-text-17);
  }

  .cross-banner__word {
    font-size: var(--rv-text-30);
  }

  .cross-banner__word--alt {
    font-size: var(--rv-text-26);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cross-banner__route-mask {
    stroke-dashoffset: 0;
  }
}
</style>
