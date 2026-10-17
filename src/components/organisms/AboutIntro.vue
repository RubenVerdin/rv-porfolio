<script setup lang="ts">
import type { AboutCollectionItem } from '@nuxt/content'
import { portrait, portraitPostmark, portraitStamp } from '~/data/about'

// The portrait beside "A short story": prose, then a sign-off with the
// way to write back. Stacks below 900px.
defineProps<{
  story?: AboutCollectionItem | null
}>()
</script>

<template>
  <div class="about-intro">
    <AboutPortrait
      v-bind="portrait"
      :stamp="portraitStamp"
      :postmark="portraitPostmark"
    />
    <div class="about-intro__story">
      <MonoLabel
        tag="div"
        tone="accent"
        class="about-intro__kicker"
      >
        A short story
      </MonoLabel>
      <ArticleBody
        v-if="story"
        :value="story"
        class="about-intro__prose"
      />
      <Signoff class="about-intro__sign">
        <BaseButton to="/contact">
          Write to me
        </BaseButton>
      </Signoff>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-intro {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: start;
  gap: var(--rv-space-72);

  &__kicker {
    margin-bottom: var(--rv-space-18);
  }

  &__prose {
    max-width: none;
    margin: 0;
  }

  &__sign {
    margin-top: var(--rv-space-8);
    padding-top: var(--rv-space-22);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}

@include page-below(md) {
  .about-intro {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--rv-space-48);
  }
}
</style>
