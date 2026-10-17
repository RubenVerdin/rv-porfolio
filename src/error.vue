<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: isNotFound.value ? 'Off the chart — Ruben Verdin' : 'Something went wrong — Ruben Verdin' })
</script>

<template>
  <NuxtLayout>
    <PageHead
      :kicker="`Error ${error.statusCode}`"
      aside="Here be dragons"
      :title="isNotFound ? 'Off the' : 'Lost at'"
      :accent="isNotFound ? 'chart.' : 'sea.'"
      :dek="isNotFound
        ? 'This page isn’t on any chart I keep. It may have moved, or it was never drawn.'
        : 'Something went wrong on the way here. Try again in a moment.'"
    />
    <Container class="error-page">
      <BaseButton
        to="/"
        @click="clearError({ redirect: '/' })"
      >
        Back to the chart
      </BaseButton>
    </Container>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.error-page {
  padding-bottom: var(--rv-space-120);
}
</style>
