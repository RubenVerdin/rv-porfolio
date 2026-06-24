<script setup lang="ts">
interface Props {
  to?: string
  href?: string
  variant?: 'solid' | 'outline'
  size?: 'default' | 'small'
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'default',
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="ink-btn"
    :class="[`ink-btn--${variant}`, `ink-btn--${size}`]"
  >
    <slot />
  </component>
</template>
