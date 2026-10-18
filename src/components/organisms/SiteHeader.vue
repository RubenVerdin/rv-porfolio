<script setup lang="ts">
import type { NavKey } from '~/types/content'
import { primaryNav } from '~/data/nav'
import { name } from '~/data/site'

// The homepage top bar, used on every page (decision 2026-10-17).
// `current` is undefined on pages outside the nav (/sitemap, /privacy).
defineProps<{
  current?: NavKey
}>()

const { edition, setEdition } = useEdition()
const { line } = useEditionLine()

const editionModel = computed({
  get: () => edition.value,
  set: setEdition,
})

const menu = useTemplateRef<{ open: (trigger?: EventTarget | null) => void, isOpen: boolean }>('menu')
</script>

<template>
  <Container
    tag="header"
    class="site-header"
  >
    <div class="site-header__bar">
      <div class="site-header__brand">
        <NuxtLink
          to="/"
          class="site-header__home"
          :aria-label="`${name}, home`"
        >
          <Monogram />
        </NuxtLink>
        <MonoLabel
          class="site-header__edition"
          tone="muted"
        >
          {{ line }}
        </MonoLabel>
      </div>
      <div class="site-header__actions">
        <PrimaryNav
          class="site-header__nav"
          :items="primaryNav"
          :current="current"
        />
        <EditionToggle v-model="editionModel" />
        <MenuButton
          :expanded="menu?.isOpen ?? false"
          @click="menu?.open($event.currentTarget)"
        />
      </div>
    </div>
    <MenuLetter ref="menu" />
  </Container>
</template>

<style scoped lang="scss">
.site-header {
  &__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-block: var(--rv-space-16);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--rv-space-16);
  }

  &__home {
    display: flex;
    border-radius: var(--rv-radius-round);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rv-space-8) var(--rv-space-24);
  }
}

// ≤1440: the nav gives way to the Menu button (MenuButton shows itself there).
@include page-below(xl) {
  .site-header__nav {
    display: none;
  }
}

// ≤1024: the edition line moves into the menu letter.
@include page-below(lg) {
  .site-header__edition {
    display: none;
  }
}
</style>
