<script setup lang="ts">
import { crossBanners } from '~/data/site'

definePageMeta({ section: 'work', footer: 'back-page' })

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').all())
const plates = usePlates(projects)

const head = computed(() => ({
  kicker: 'Section B — The Atlas of Works',
  aside: `Plates I–${toRoman(plates.value.length)}`,
  title: 'Good ideas.',
  accent: 'Carefully made.',
  dek: 'Every project, catalogued as a plate. Choose one to read how it came together.',
}))

useSeoMeta({
  title: 'The Atlas of Works — Ruben Verdin',
  description: 'Every project, catalogued as a plate.',
})
</script>

<template>
  <ListingTemplate
    :head="head"
    :banner="crossBanners.toWriting"
    label="Projects"
  >
    <AtlasGrid :plates="plates" />
  </ListingTemplate>
</template>
