<script setup lang="ts">
import { contactRows, signature } from '~/data/site'
import { contactStamp } from '~/data/stamps'
</script>

<template>
  <article
    class="contact-postcard"
    aria-label="Find me, call me"
  >
    <div class="contact-postcard__top">
      <span class="contact-postcard__word">POST CARD</span>
      <Stamp v-bind="contactStamp" />
    </div>
    <div class="contact-postcard__body">
      <div class="contact-postcard__message">
        <p class="contact-postcard__greeting">
          Hola —
        </p>
        <p>Say hello any time. Every letter gets a reply.</p>
        <div class="contact-postcard__cancel">
          <Postmark
            class="contact-postcard__postmark"
            :lines="['TORONTO', 'ON']"
            size="sm"
          />
          <PostmarkWaves class="contact-postcard__waves" />
        </div>
      </div>
      <div class="contact-postcard__rows">
        <ContactRow
          v-for="row in contactRows"
          :key="row.key"
          :row="row"
        />
      </div>
    </div>
    <div class="contact-postcard__foot">
      <span class="contact-postcard__avion">PAR AVION</span>
      <span class="contact-postcard__signature">— {{ signature }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.contact-postcard {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--rv-space-20);
  padding: var(--rv-space-28) var(--rv-space-28);
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  box-shadow: var(--rv-shadow-paper);
  transform: rotate(1.2deg);
  transition:
    transform var(--rv-duration-500) var(--rv-ease-soft),
    background-color var(--rv-duration-theme);

  &:hover {
    transform: rotate(0deg) translateY(calc(var(--rv-space-4) * -1));
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--rv-space-16);
    padding-bottom: var(--rv-space-12);
    border-bottom: var(--rv-border-double) double var(--rv-color-ink);
  }

  &__word {
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-24);
    letter-spacing: var(--rv-tracking-24);
  }

  &__body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: var(--rv-space-24);
  }

  &__message {
    padding-right: var(--rv-space-24);
    border-right: var(--rv-border-hairline) solid var(--rv-color-ink-muted);
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-140);
  }

  &__greeting {
    margin-bottom: var(--rv-space-16);
  }

  &__cancel {
    --postmark-waves-width: 70px;

    display: flex;
    align-items: center;
    gap: var(--rv-space-4);
    margin-top: var(--rv-space-24);
  }

  &__postmark {
    --postmark-rotate: -10deg;
  }

  &__rows {
    display: flex;
    flex-direction: column;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--rv-space-12);
  }

  &__avion {
    padding: var(--rv-space-6) var(--rv-space-10);
    background: var(--rv-object-navy);
    color: var(--rv-object-ink-light);
    font-family: var(--rv-font-condensed);
    font-weight: var(--rv-weight-medium);
    font-size: var(--rv-text-12);
    letter-spacing: var(--rv-tracking-8);
  }

  &__signature {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-20);
  }
}

@include page-below(md) {
  .contact-postcard {
    transform: rotate(0.6deg);
  }
}

@include page-below(xs) {
  .contact-postcard {
    padding: var(--rv-space-24) var(--rv-space-20);
    transform: none;
  }

  .contact-postcard__word {
    font-size: var(--rv-text-17);
    letter-spacing: var(--rv-tracking-24);
  }

  .contact-postcard__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-postcard__message {
    padding-right: 0;
    border-right: 0;
  }
}
</style>
