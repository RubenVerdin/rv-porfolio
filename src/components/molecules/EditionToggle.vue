<script setup lang="ts">
import type { Edition } from '~/types/content'

// Not defineModel: that skips the update when the value doesn't change, but
// clicking the edition that's already showing (from the device setting)
// is still an explicit choice that should be remembered.
defineProps<{
  modelValue: Edition
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Edition]
}>()

const options = [
  { value: 'day', label: 'Day', icon: 'sun' },
  { value: 'night', label: 'Night', icon: 'moon' },
] as const
</script>

<template>
  <div
    class="edition-toggle"
    role="group"
    aria-label="Edition"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="edition-toggle__option"
      :class="{ 'edition-toggle__option--active': modelValue === option.value }"
      :aria-pressed="modelValue === option.value"
      :aria-label="option.label"
      @click="emit('update:modelValue', option.value)"
    >
      <Icon :name="option.icon" />
      <span class="edition-toggle__label">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.edition-toggle {
  display: flex;
  gap: var(--rv-space-2);
  padding: var(--rv-space-4);
  border: var(--rv-border-hairline) solid var(--rv-color-ink);
  border-radius: var(--rv-radius-pill);

  &__option {
    @include label(var(--rv-text-12), var(--rv-tracking-8));

    display: flex;
    align-items: center;
    gap: var(--rv-space-6);
    min-height: var(--rv-size-control);
    padding: 0 var(--rv-space-16);
    background: transparent;
    color: var(--rv-color-ink);
    border: 0;
    border-radius: var(--rv-radius-pill);
    cursor: pointer;
    transition:
      background-color var(--rv-duration-350),
      color var(--rv-duration-350);

    &--active {
      background: var(--rv-color-ink);
      color: var(--rv-color-ground);
    }
  }
}

@include page-below(xs) {
  .edition-toggle__label {
    display: none;
  }

  .edition-toggle__option {
    padding: 0 var(--rv-space-12);
  }
}
</style>
