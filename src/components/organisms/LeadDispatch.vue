<script setup lang="ts">
import type { DispatchView } from '~/types/content'
import { signature } from '~/data/site'

// The featured article, laid out as the back of a postcard.
defineProps<{
  dispatch: DispatchView
}>()
</script>

<template>
  <article class="lead-dispatch">
    <div class="lead-dispatch__message">
      <MonoLabel tone="accent">
        Dispatch No. {{ dispatch.dispatchNo }} · Featured · {{ dispatch.kind }}
      </MonoLabel>
      <h2 class="lead-dispatch__title">
        <NuxtLink
          :to="dispatch.to"
          class="lead-dispatch__title-link"
        >
          {{ dispatch.title }}
        </NuxtLink>
      </h2>
      <p class="lead-dispatch__dek">
        {{ dispatch.description }}
      </p>
      <div class="lead-dispatch__footer">
        <div>
          <div class="lead-dispatch__byline">
            {{ signature }}
          </div>
          <MonoLabel
            tag="div"
            tone="muted"
          >
            Correspondent
          </MonoLabel>
        </div>
        <BaseButton :to="dispatch.to">
          Read the dispatch
        </BaseButton>
      </div>
    </div>
    <div class="lead-dispatch__address">
      <div class="lead-dispatch__marks">
        <div class="lead-dispatch__cancel">
          <Postmark :lines="[dispatch.postmark.date, dispatch.postmark.year]" />
          <PostmarkWaves />
        </div>
        <Stamp v-bind="dispatch.stamp" />
      </div>
      <MonoLabel
        tag="div"
        tone="muted"
      >
        {{ dispatch.readTime }}
      </MonoLabel>
      <AddressLines
        v-if="dispatch.address.length"
        :lines="dispatch.address"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.lead-dispatch {
  display: flex;
  flex-wrap: wrap;
  background: var(--rv-color-paper);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);

  @include theme-transition(background-color, border-color);

  &__message {
    display: flex;
    flex: 999 1 var(--rv-basis-lead-message);
    flex-direction: column;
    gap: var(--rv-space-20);
    min-width: 0;
    padding: var(--rv-space-card);
    border-right: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-display-md);
    line-height: var(--rv-leading-100);
    letter-spacing: var(--rv-tracking-neg-1-5);
  }

  &__title-link {
    text-decoration: none;
  }

  &__dek {
    max-width: 56ch;
    font-size: var(--rv-text-20);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--rv-space-16);
    margin-top: auto;
    padding-top: var(--rv-space-20);
  }

  &__byline {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-28);
  }

  &__address {
    position: relative;
    display: flex;
    flex: 1 1 var(--rv-basis-lead-address);
    flex-direction: column;
    gap: var(--rv-space-20);
    min-width: 0;
    padding: var(--rv-space-card);
  }

  &__marks {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--rv-space-12);
  }

  &__cancel {
    display: flex;
    align-items: center;
  }
}

@include page-below(md) {
  .lead-dispatch__message {
    border-right: 0;
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}

@include page-below(xs) {
  .lead-dispatch__title {
    font-size: var(--rv-text-36);
  }

  .lead-dispatch__dek {
    font-size: var(--rv-text-17);
  }
}
</style>
