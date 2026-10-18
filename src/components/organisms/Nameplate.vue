<script setup lang="ts">
import { intro, name } from '~/data/site'
</script>

<template>
  <div class="nameplate">
    <h1 class="nameplate__name">
      {{ name }}
      <i
        class="nameplate__roller"
        aria-hidden="true"
      />
    </h1>
    <p class="nameplate__intro">
      {{ intro }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.nameplate {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--rv-space-20) var(--rv-space-56);
  padding: var(--rv-space-32) 0 var(--rv-space-28);

  // The masthead, inked by a passing roller on load.
  &__name {
    position: relative;
    font-family: var(--rv-font-display);
    font-weight: var(--rv-weight-regular);
    font-size: var(--rv-text-display-md);
    line-height: var(--rv-leading-100);
    letter-spacing: var(--rv-tracking-0);
    white-space: nowrap;
  }

  &__roller {
    position: absolute;
    top: -6%;
    bottom: -6%;
    left: 0;
    width: 22%;
    background: linear-gradient(90deg, transparent, var(--rv-color-ink) 40%, var(--rv-color-ink) 60%, transparent);
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: var(--rv-blend-roller);
    animation: roll var(--rv-duration-1250) 0.2s var(--rv-ease-press) both;
  }

  &__intro {
    flex: 0 1 46ch;
    padding-left: var(--rv-space-24);
    border-left: var(--rv-border-hairline) solid var(--rv-color-ink);
    font-size: var(--rv-text-18);
    line-height: var(--rv-leading-150);
    color: var(--rv-color-ink-muted);
    text-wrap: pretty;
  }
}

@keyframes roll {
  0% { opacity: 0; transform: translateX(-30%); }
  15% { opacity: 0.18; }
  85% { opacity: 0.18; }
  100% { opacity: 0; transform: translateX(480%); }
}

@include page-below(lg) {
  .nameplate {
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--rv-space-40);
  }

  .nameplate__name {
    flex: none;
    font-size: var(--rv-text-52);
  }

  .nameplate__intro {
    flex: 1 1 auto;
    max-width: none;
    font-size: var(--rv-text-16);
  }
}

@include page-below(sm) {
  .nameplate__intro {
    padding-left: 0;
    border-left: 0;
  }
}

@include page-below(xs) {
  .nameplate {
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--rv-space-12);
    padding: var(--rv-space-24) 0 var(--rv-space-20);
  }

  .nameplate__name {
    font-size: var(--rv-text-40);
  }

  .nameplate__intro {
    font-size: var(--rv-text-17);
  }
}
</style>
