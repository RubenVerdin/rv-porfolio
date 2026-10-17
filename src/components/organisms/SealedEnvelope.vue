<script setup lang="ts">
import type { Envelope } from '~/composables/useEnvelope'
import { city, letterRows } from '~/data/site'
import { waxSealPath } from '~/data/artwork'

// Airmail envelope with a wax seal. Click → the seal cracks, the flap
// opens and the letter rises out; click the letter → it tucks back in.
// Pass an `envelope` (useEnvelope) when another control drives it too
// (BackPage's "Break the seal" button); otherwise it owns one.
const props = withDefaults(defineProps<{
  envelope?: Envelope
  /** Letter already out, no entrance animation (Contact). */
  startOpen?: boolean
  /** Contact page: extra headroom for the open letter, and a hint below. */
  standalone?: boolean
}>(), {
  envelope: undefined,
  startOpen: false,
  standalone: false,
})

const { state, toggle, aria } = props.envelope ?? useEnvelope({ startOpen: props.startOpen })
const { date } = useEditionLine()

const stamp = { color: 'red', label: 'RV', icon: 'M3 15l9-11 9 11M12 4v16M7 20h10' } as const
</script>

<template>
  <div
    class="sealed-envelope"
    :class="{ 'sealed-envelope--standalone': standalone }"
  >
    <svg
      class="sealed-envelope__defs"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="sealWax"
          cx="36%"
          cy="30%"
          r="75%"
        >
          <stop
            class="sealed-envelope__wax-stop sealed-envelope__wax-stop--light"
            offset="0"
          />
          <stop
            class="sealed-envelope__wax-stop sealed-envelope__wax-stop--mid"
            offset=".55"
          />
          <stop
            class="sealed-envelope__wax-stop sealed-envelope__wax-stop--dark"
            offset="1"
          />
        </radialGradient>
      </defs>
    </svg>

    <div
      class="sealed-envelope__body"
      :class="`sealed-envelope__body--${state}`"
    >
      <div class="sealed-envelope__back" />

      <div
        class="sealed-envelope__letter"
        :aria-hidden="aria.letterHidden"
      >
        <button
          type="button"
          class="sealed-envelope__letter-close"
          aria-label="Fold the letter back into the envelope"
          :tabindex="aria.letterTabindex"
          @click="toggle"
        />
        <div class="sealed-envelope__letter-head">
          <span class="sealed-envelope__salute">Dear reader,</span>
          <span class="sealed-envelope__dateline">{{ city.toUpperCase() }} · {{ date }}</span>
        </div>
        <p class="sealed-envelope__letter-text">
          The quickest routes to my desk, in order of speed:
        </p>
        <div class="sealed-envelope__rows">
          <LetterRow
            v-for="row in letterRows"
            :key="row.key"
            :row="row"
            :tabindex="aria.letterTabindex"
          />
        </div>
        <div class="sealed-envelope__letter-foot">
          <div>
            <div class="sealed-envelope__closing">
              Yours in code &amp; ink,
            </div>
            <div class="sealed-envelope__name">
              R. Verdin
            </div>
          </div>
          <span class="sealed-envelope__reply">REPLY PAID</span>
        </div>
      </div>

      <div class="sealed-envelope__pocket">
        <div class="sealed-envelope__pocket-side sealed-envelope__pocket-side--left">
          <div />
        </div>
        <div class="sealed-envelope__pocket-side sealed-envelope__pocket-side--right">
          <div />
        </div>
        <div class="sealed-envelope__pocket-side sealed-envelope__pocket-side--bottom">
          <div />
        </div>
      </div>
      <div class="sealed-envelope__frame" />
      <div class="sealed-envelope__mark sealed-envelope__mark--avion">
        <div class="sealed-envelope__avion">
          PAR AVION<br>BY AIR MAIL
        </div>
      </div>
      <div class="sealed-envelope__mark sealed-envelope__mark--stamp">
        <PostmarkWaves tone="envelope" />
        <Stamp
          v-bind="stamp"
          size="sm"
          paper="envelope"
        />
      </div>
      <div class="sealed-envelope__flap">
        <div class="sealed-envelope__flap-face sealed-envelope__flap-face--front">
          <div />
        </div>
        <div class="sealed-envelope__flap-face sealed-envelope__flap-face--back">
          <div />
        </div>
      </div>
      <div
        class="sealed-envelope__seal"
        aria-hidden="true"
      >
        <div
          v-for="side in ['left', 'right']"
          :key="side"
          class="sealed-envelope__seal-half"
          :class="`sealed-envelope__seal-half--${side}`"
        >
          <svg viewBox="0 0 100 100">
            <path
              class="sealed-envelope__wax"
              :d="waxSealPath"
            />
            <circle
              class="sealed-envelope__wax-ring"
              cx="50"
              cy="50"
              r="33"
            />
            <circle
              class="sealed-envelope__wax-ring sealed-envelope__wax-ring--inner"
              cx="50"
              cy="50"
              r="30"
            />
            <text
              class="sealed-envelope__wax-text sealed-envelope__wax-text--highlight"
              x="51"
              y="62"
            >RV</text>
            <text
              class="sealed-envelope__wax-text"
              x="50"
              y="61"
            >RV</text>
          </svg>
        </div>
      </div>
      <button
        type="button"
        class="sealed-envelope__hit"
        :aria-label="aria.hitLabel"
        :aria-expanded="aria.expanded"
        @click="toggle"
      />
    </div>
    <MonoLabel
      v-if="standalone"
      tag="p"
      tone="muted"
      class="sealed-envelope__hint"
    >
      {{ aria.hint }}
    </MonoLabel>
  </div>
</template>

<style scoped lang="scss">
.sealed-envelope {
  container: sealed-envelope / inline-size;
  min-width: 0;
  padding-top: var(--rv-space-envelope-stage);
  padding-bottom: var(--rv-space-24);

  &--standalone {
    padding-top: var(--rv-space-envelope-stage-lg);
    padding-bottom: 0;
  }

  &__defs {
    position: absolute;
    width: 0;
    height: 0;
  }

  &__wax-stop {
    &--light { stop-color: var(--rv-object-wax-light); }
    &--mid { stop-color: var(--rv-object-wax); }
    &--dark { stop-color: var(--rv-object-wax-dark); }
  }

  // The envelope
  &__body {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    perspective: var(--rv-perspective-card);
    transition: transform var(--rv-duration-600) var(--rv-ease-soft);
  }

  &__back,
  &__pocket,
  &__frame,
  &__flap,
  &__letter,
  &__seal,
  &__hit,
  &__mark {
    position: absolute;
  }

  &__back {
    inset: 0;
    z-index: 1;
    background: var(--rv-color-envelope-inside);
    box-shadow: var(--rv-shadow-envelope);

    @include theme-transition(background-color);
  }

  &__pocket {
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  &__pocket-side {
    position: absolute;
    inset: 0;
    filter: drop-shadow(var(--rv-shadow-pocket));

    > div {
      position: absolute;
      inset: 0;

      @include theme-transition(background-color);
    }

    &--left > div {
      background: var(--rv-color-envelope-shade);
      clip-path: polygon(0 0, 51% 54%, 0 100%);
    }

    &--right > div {
      background: var(--rv-color-envelope-shade);
      clip-path: polygon(100% 0, 49% 54%, 100% 100%);
    }

    &--bottom > div {
      background: var(--rv-color-envelope);
      clip-path: polygon(0 100%, 50% 46%, 100% 100%);
    }
  }

  // Airmail border
  &__frame {
    inset: 0;
    z-index: 4;
    pointer-events: none;
    border: var(--rv-border-envelope) solid transparent;
    border-top-width: 0;
    border-image: repeating-linear-gradient(-45deg, var(--rv-object-airmail-red) 0 14px, transparent 14px 22px, var(--rv-object-airmail-blue) 22px 36px, transparent 36px 44px) 10;
  }

  &__mark {
    z-index: 4;
    pointer-events: none;

    &--avion {
      left: 5%;
      bottom: 9%;
    }

    &--stamp {
      --postmark-waves-width: 70px;

      right: 5%;
      bottom: 8%;
      display: flex;
      align-items: center;
      gap: var(--rv-space-4);
    }
  }

  &__avion {
    padding: var(--rv-space-6) var(--rv-space-10);
    background: var(--rv-object-airmail-blue);
    color: var(--rv-object-airmail-ink);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-11);
    letter-spacing: var(--rv-tracking-14);
    line-height: var(--rv-leading-130);
  }

  // The flap folds open (front face → patterned inside)
  &__flap {
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    height: 58%;
    transform-origin: 50% 0;
    transform-style: preserve-3d;
    transition: transform var(--rv-duration-450) var(--rv-ease-flap);
  }

  &__flap-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;

    > div {
      position: absolute;
      inset: 0;
    }

    &--front {
      filter: drop-shadow(var(--rv-shadow-crease));
    }

    &--front > div {
      background: var(--rv-color-envelope);
      clip-path: polygon(0 0, 100% 0, 50% 100%);

      @include theme-transition(background-color);
    }

    &--back {
      transform: rotateX(180deg);
    }

    &--back > div {
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
      background-color: var(--rv-object-airmail-blue);
      background-image:
        radial-gradient(var(--rv-object-airmail-dots) 1px, transparent 1.2px),
        repeating-linear-gradient(135deg, var(--rv-object-airmail-lines) 0 1px, transparent 1px 9px);
      background-size: var(--rv-texture-airmail) var(--rv-texture-airmail), auto;
    }
  }

  // The letter
  &__letter {
    top: 5%;
    right: 6%;
    left: 6%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-letter-gap);
    height: 92%;
    padding: var(--rv-space-letter-block) var(--rv-space-letter-inline);
    background-color: var(--rv-color-letter);
    background-image: repeating-linear-gradient(0deg, var(--rv-object-letter-lines) 0 1px, transparent 1px 28px);
    color: var(--rv-object-letter-ink);
    box-shadow: var(--rv-shadow-letter);

    @include theme-transition(background-color);

    // Content sits above the full-size close button; links stay clickable.
    > * {
      position: relative;
      z-index: 1;
      pointer-events: none;
    }

    :deep(a) {
      pointer-events: auto;
    }
  }

  &__letter-close {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    pointer-events: auto;
  }

  &__letter > &__letter-close {
    position: absolute;
    z-index: 0;
    pointer-events: auto;
  }

  &__letter-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--rv-space-12);
  }

  &__salute {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-letter-salute);
  }

  &__dateline {
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-10);
    letter-spacing: var(--rv-tracking-14);
    color: var(--rv-object-letter-ink-muted);
  }

  &__letter-text {
    font-size: var(--rv-text-letter-body);
    line-height: var(--rv-leading-150);
    color: var(--rv-object-letter-ink-muted);
  }

  &__rows {
    display: flex;
    flex-direction: column;
  }

  &__letter-foot {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--rv-space-12);
    margin-top: auto;
  }

  &__closing,
  &__name {
    font-family: var(--rv-font-display);
    font-style: italic;
  }

  &__closing {
    font-size: var(--rv-text-letter-closing);
    color: var(--rv-object-letter-ink-muted);
  }

  &__name {
    font-size: var(--rv-text-letter-name);
  }

  &__reply {
    padding: var(--rv-space-4) var(--rv-space-8);
    border: var(--rv-border-medium) solid var(--rv-object-letter-accent);
    font-family: var(--rv-font-mono);
    font-size: var(--rv-text-10);
    letter-spacing: var(--rv-tracking-14);
    color: var(--rv-object-letter-accent);
    transform: rotate(-4deg);
  }

  // The wax seal, in two halves that split apart
  &__seal {
    top: 58%;
    left: 50%;
    z-index: 6;
    width: var(--rv-size-seal);
    aspect-ratio: 1;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  &__seal-half {
    position: absolute;
    inset: 0;
    transition:
      transform var(--rv-duration-500) var(--rv-ease-soft),
      opacity var(--rv-duration-450);

    svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(var(--rv-shadow-wax));
    }

    &--left {
      clip-path: polygon(0 0, 53% 0, 46% 22%, 55% 42%, 47% 61%, 54% 80%, 49% 100%, 0 100%);
    }

    &--right {
      clip-path: polygon(53% 0, 100% 0, 100% 100%, 49% 100%, 54% 80%, 47% 61%, 55% 42%, 46% 22%);
    }
  }

  &__wax {
    fill: url('#sealWax');
  }

  &__wax-ring {
    fill: none;
    stroke: var(--rv-object-wax-ink);
    stroke-width: 1.6;
    opacity: 0.75;

    &--inner {
      stroke: var(--rv-object-wax-ring);
      stroke-width: 0.8;
      opacity: 0.55;
    }
  }

  &__wax-text {
    font-family: var(--rv-font-display);
    font-size: var(--rv-text-34);
    text-anchor: middle;
    fill: var(--rv-object-wax-ink);

    &--highlight {
      fill: var(--rv-object-wax-highlight);
      opacity: 0.55;
    }
  }

  // Whole-envelope hit area (opens / closes)
  &__hit {
    inset: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;

    &:focus-visible {
      outline: var(--rv-border-thick) solid var(--rv-color-accent);
      outline-offset: var(--rv-space-6);
    }
  }

  &__hint {
    margin-top: var(--rv-space-8);
    text-align: center;
  }

  // ── States ──────────────────────────────────────────────
  &__body--closed:hover {
    transform: translateY(calc(var(--rv-space-4) * -1)) rotate(-0.6deg);
  }

  &__body--closed:hover &__flap {
    transform: rotateX(16deg);
  }

  &__body--open &__hit,
  &__body--static &__hit {
    z-index: 6;
  }

  &__body--open &__letter,
  &__body--static &__letter {
    cursor: pointer;
  }

  &__body--open &__flap,
  &__body--static &__flap {
    z-index: 1;
    transform: rotateX(180deg);
    transition:
      transform var(--rv-duration-750) 0.25s var(--rv-ease-fold),
      z-index 0s 0.62s;
  }

  &__body--open &__seal-half--left,
  &__body--static &__seal-half--left {
    opacity: 0;
    transform: translate(-22%, 14%) rotate(-24deg);
  }

  &__body--open &__seal-half--right,
  &__body--static &__seal-half--right {
    opacity: 0;
    transform: translate(22%, 14%) rotate(20deg);
  }

  &__body--open &__letter {
    animation: emerge var(--rv-duration-1500) 0.8s var(--rv-ease-bearing) both;
  }

  // Starts open and sits still (Contact): no rise over the heading.
  &__body--static &__letter {
    z-index: 7;
    transform: translateY(-30%) rotate(-1.4deg);
  }

  &__body--closing &__letter {
    animation: tuck var(--rv-duration-1100) var(--rv-ease-tuck) both;
  }

  &__body--closing &__flap {
    transition:
      transform var(--rv-duration-600) 1.05s var(--rv-ease-fold),
      z-index 0s 1.05s;
  }

  &__body--closing &__seal-half {
    transition:
      transform var(--rv-duration-450) 1.6s var(--rv-ease-spring-soft),
      opacity var(--rv-duration-200) 1.6s;
  }
}

@keyframes emerge {
  0% { transform: none; z-index: 2; }
  52% { transform: translateY(-108%); z-index: 2; }
  53% { transform: translateY(-108%); z-index: 7; }
  100% { transform: translateY(-30%) rotate(-1.4deg); z-index: 7; }
}

@keyframes tuck {
  0% { transform: translateY(-30%) rotate(-1.4deg); z-index: 7; }
  48% { transform: translateY(-108%); z-index: 7; }
  49% { transform: translateY(-108%); z-index: 2; }
  100% { transform: none; z-index: 2; }
}

@include container-below(sealed-envelope, 520px) {
  .sealed-envelope__body {
    aspect-ratio: 1 / 1;
  }
}

@include page-below(xs) {
  .sealed-envelope:not(.sealed-envelope--standalone) {
    padding-top: var(--rv-space-110);
  }
}

// With motion off, an opened letter still has to end up out of the envelope.
@media (prefers-reduced-motion: reduce) {
  .sealed-envelope__body--open .sealed-envelope__letter {
    z-index: 7;
    transform: translateY(-30%) rotate(-1.4deg);
  }
}
</style>
