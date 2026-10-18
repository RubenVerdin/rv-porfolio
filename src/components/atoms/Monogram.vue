<script setup lang="ts">
// "RV" in three treatments: the green header seal, the letterhead ring on
// the menu letter, and the wax seal that signs it.
withDefaults(defineProps<{
  variant?: 'seal' | 'letterhead' | 'wax'
}>(), {
  variant: 'seal',
})
</script>

<template>
  <span
    class="monogram"
    :class="`monogram--${variant}`"
  >RV</span>
</template>

<style scoped lang="scss">
.monogram {
  --monogram-size: 40px;

  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: var(--monogram-size);
  height: var(--monogram-size);
  border-radius: var(--rv-radius-round);
  font-family: var(--rv-font-display);

  &--seal {
    background: var(--rv-color-seal);
    color: var(--rv-object-ink-light);
    font-size: var(--rv-text-17);
    box-shadow:
      0 0 0 var(--rv-space-4) var(--rv-color-ground),
      0 0 0 var(--rv-space-4) var(--rv-color-seal);

    @include theme-transition(background-color, box-shadow);
  }

  &--letterhead {
    --monogram-size: 46px;

    border: var(--rv-border-hairline) solid var(--rv-object-ink);
    outline: var(--rv-border-hairline) solid var(--rv-object-ink);
    outline-offset: var(--rv-space-4);
    font-size: var(--rv-text-20);
  }

  &--wax {
    --monogram-size: 58px;

    background: radial-gradient(circle at 35% 30%, var(--rv-object-wax-light), var(--rv-object-wax) 58%, var(--rv-object-wax-dark));
    box-shadow:
      0 0 0 var(--rv-space-4) var(--rv-object-wax),
      var(--rv-space-4) calc(var(--rv-space-2) * -1) 0 var(--rv-space-2) var(--rv-object-wax),
      calc(var(--rv-space-4) * -1) var(--rv-space-4) 0 var(--rv-space-2) var(--rv-object-wax-edge),
      var(--rv-shadow-wax);
    font-size: var(--rv-text-20);
    color: var(--rv-object-wax-dark);
    text-shadow: 1px 1px 0 var(--rv-object-wax-highlight);
    transform: rotate(-8deg);
  }
}
</style>
