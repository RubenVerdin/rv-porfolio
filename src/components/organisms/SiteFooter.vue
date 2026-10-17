<script setup lang="ts">
import { footerLinks } from '~/data/nav'
import { colophon, name } from '~/data/site'

// Colophon footer. `showCta` adds the "Let's work together" strip
// (work detail); the BackPage organism embeds it without the strip.
withDefaults(defineProps<{
  showCta?: boolean
  /** Inside BackPage: double rule, no top margin. */
  embedded?: boolean
}>(), {
  showCta: false,
  embedded: false,
})

const year = new Date().getFullYear()
</script>

<template>
  <Container
    tag="footer"
    class="site-footer"
    :class="{ 'site-footer--embedded': embedded }"
  >
    <div
      v-if="showCta"
      class="site-footer__cta"
    >
      <h2 class="site-footer__cta-title">
        Let’s work <em class="site-footer__accent">together.</em>
      </h2>
      <BaseButton to="/contact">
        Break the seal
      </BaseButton>
    </div>
    <div class="site-footer__colophon">
      <p class="site-footer__note">
        <MonoLabel tone="ink">
          Colophon —
        </MonoLabel>
        {{ colophon }}
      </p>
      <nav
        class="site-footer__nav"
        aria-label="Footer"
      >
        <MonoLabel tone="muted">
          © {{ year }} {{ name }}
        </MonoLabel>
        <template
          v-for="link in footerLinks"
          :key="link.label"
        >
          <NuxtLink
            v-if="link.to"
            :to="link.to"
            class="site-footer__link"
          >
            {{ link.label }}
          </NuxtLink>
          <!-- Not live yet (RSS): inert, and href="#" keeps crawlLinks happy. -->
          <a
            v-else
            href="#"
            class="site-footer__link"
            aria-disabled="true"
            @click.prevent
          >{{ link.label }}</a>
        </template>
      </nav>
    </div>
  </Container>
</template>

<style scoped lang="scss">
.site-footer {
  padding-bottom: var(--rv-space-40);

  &__cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--rv-space-20) var(--rv-space-40);
    padding: var(--rv-space-36) 0;
    border-top: var(--rv-border-double) double var(--rv-color-ink);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__cta-title {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-cta);
    line-height: var(--rv-leading-100);
  }

  &__accent {
    color: var(--rv-color-accent);
  }

  &__colophon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--rv-space-18);
    margin-top: var(--rv-space-24);
    padding-top: var(--rv-space-22);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &--embedded &__colophon {
    margin-top: 0;
    border-top: var(--rv-border-double) double var(--rv-color-ink);
  }

  &__note {
    max-width: var(--rv-measure-colophon);
    font-size: var(--rv-text-14);
    line-height: var(--rv-leading-160);
    color: var(--rv-color-ink-muted);
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rv-space-4) var(--rv-space-22);
  }

  &__link {
    @include label;

    padding: var(--rv-space-12) 0;
    text-decoration: none;
  }
}

@include page-below(xs) {
  .site-footer__cta {
    padding: var(--rv-space-28) 0;
  }

  .site-footer__cta-title {
    font-size: var(--rv-text-34);
  }
}
</style>
