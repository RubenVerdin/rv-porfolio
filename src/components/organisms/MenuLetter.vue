<script setup lang="ts">
import { primaryNav } from '~/data/nav'

// The menu, styled as a folded letter. Teleported to <body> so it covers
// the viewport wherever the reader has scrolled; behaviour in useDialog.
const letter = ref<HTMLElement | null>(null)
const { isOpen, open, close } = useDialog(letter)
const { line } = useEditionLine()

defineExpose({ open, isOpen })
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="menu-letter"
    >
      <button
        type="button"
        class="menu-letter__scrim"
        aria-label="Close menu"
        tabindex="-1"
        @click="close()"
      />
      <div
        ref="letter"
        class="menu-letter__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-letter-title"
      >
        <button
          type="button"
          class="menu-letter__close"
          aria-label="Close menu"
          @click="close()"
        >
          <Icon name="close" />
        </button>
        <div class="menu-letter__letterhead">
          <Monogram variant="letterhead" />
          <span class="menu-letter__edition">{{ line }}</span>
        </div>
        <div class="menu-letter__body">
          <h2
            id="menu-letter-title"
            class="menu-letter__salute"
          >
            Dear reader,
          </h2>
          <p class="menu-letter__text">
            Where shall we set sail? Pick a heading below and I’ll take you there.
          </p>
        </div>
        <nav
          class="menu-letter__nav"
          aria-label="Menu"
        >
          <MenuLink
            v-for="item in primaryNav"
            :key="item.key"
            :item="item"
            @click="close({ restoreFocus: false })"
          />
        </nav>
        <Signoff variant="letter">
          <Monogram
            variant="wax"
            aria-hidden="true"
          />
        </Signoff>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.menu-letter {
  position: fixed;
  inset: 0;
  z-index: var(--rv-layer-overlay);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: var(--rv-space-92) var(--rv-space-16) var(--rv-space-24);
  perspective: var(--rv-perspective-letter);

  &__scrim {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: var(--rv-object-scrim);
    cursor: pointer;
    animation: fade-in var(--rv-duration-350) ease both;
  }

  &__sheet {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-18);
    width: min(var(--rv-size-menu-letter), 100%);
    padding: var(--rv-space-30) var(--rv-space-40);
    background-color: var(--rv-object-letter-paper);
    // Two fold creases + aged edges.
    background-image:
      linear-gradient(180deg, transparent 33.1%, var(--rv-object-letter-fold) 33.3%, var(--rv-object-letter-fold-light) 33.6%, transparent 34%, transparent 66.4%, var(--rv-object-letter-fold) 66.6%, var(--rv-object-letter-fold-light) 66.9%, transparent 67.3%),
      radial-gradient(120% 90% at 50% 40%, transparent 60%, var(--rv-object-letter-aging));
    color: var(--rv-object-letter-ink);
    box-shadow: var(--rv-shadow-menu);
    transform-origin: 50% 0;
    animation: unfold var(--rv-duration-800) var(--rv-ease-soft) both;
  }

  &__close {
    position: absolute;
    top: var(--rv-space-12);
    right: var(--rv-space-12);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--rv-size-touch);
    height: var(--rv-size-touch);
    background: transparent;
    border: 0;
    border-radius: var(--rv-radius-round);
    color: var(--rv-object-letter-ink);
    cursor: pointer;

    --icon-size: var(--rv-size-icon-sm);
    --icon-stroke: 1.6;

    &:hover {
      background: var(--rv-object-letter-hover);
    }
  }

  &__letterhead {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--rv-space-10);
    padding-bottom: var(--rv-space-16);
    border-bottom: var(--rv-border-hairline) solid var(--rv-object-letter-rule);
    text-align: center;
  }

  &__edition {
    @include label;

    color: var(--rv-object-letter-ink-muted);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--rv-space-6);
  }

  &__salute {
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-style: italic;
    font-size: var(--rv-text-28);
    line-height: var(--rv-leading-110);
  }

  &__text {
    font-size: var(--rv-text-17);
    line-height: var(--rv-leading-150);
    color: var(--rv-object-letter-ink-muted);
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }
}

@keyframes unfold {
  0% { opacity: 0; transform: rotateX(-75deg) translateY(-20px); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: rotate(-0.8deg); }
}

// Teleported out of the page container → viewport query.
@include viewport-below(xs) {
  .menu-letter__sheet {
    padding: var(--rv-space-26) var(--rv-space-24) var(--rv-space-24);
  }
}
</style>
