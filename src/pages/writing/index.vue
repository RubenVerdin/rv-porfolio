<script setup lang="ts">
import { crossBanners } from '~/data/site'

definePageMeta({ section: 'writing', footer: 'back-page' })

const { data: posts } = await useAsyncData('posts', () => queryCollection('posts').all())
const { all, lead, postcards } = useDispatches(posts)

const head = computed(() => ({
  kicker: 'Section C — Correspondence',
  aside: `${numberWord(all.value.length)} dispatches`,
  title: 'Stupid, weird, original.',
  accent: 'Honest.',
  dek: 'Essays on craft & cities — on code, design, and the places in between.',
}))

useSeoMeta({
  title: 'Correspondence — Ruben Verdin',
  description: 'Essays on craft & cities — on code, design, and the places in between.',
})
</script>

<template>
  <ListingTemplate
    :head="head"
    :banner="crossBanners.toWork"
    label="Dispatches"
  >
    <LeadDispatch
      v-if="lead"
      :dispatch="lead"
    />
    <DividerHeading
      class="writing-list__divider"
      label="More dispatches"
      aside="Hover to turn over"
    />
    <PostcardGrid :dispatches="postcards" />
  </ListingTemplate>
</template>

<style scoped lang="scss">
.writing-list {
  &__divider {
    margin: var(--rv-space-72) 0 var(--rv-space-56);
  }
}
</style>
