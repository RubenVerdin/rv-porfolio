<script setup lang="ts">
import { news } from '~/data/site'

definePageMeta({ section: 'home', footer: 'back-page' })

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').all())
const { data: posts } = await useAsyncData('posts', () => queryCollection('posts').all())

const plates = usePlates(projects)
const { lead, postcards } = useDispatches(posts)

const newsItems = computed(() => lead.value
  ? [...news, { label: 'Off the press', text: lead.value.title }]
  : news)
const latestPostcards = computed(() => postcards.value.slice(0, 4))
const plateRange = computed(() => `Plates I–${toRoman(plates.value.length)}`)

useSeoMeta({
  title: 'Ruben Verdin — Developer & Designer',
  description: 'Mexican-born developer and designer in Toronto. Front-ends, design systems, and writing about the craft between.',
})
</script>

<template>
  <div class="home">
    <Container>
      <Nameplate />
      <NewsLine :items="newsItems" />
    </Container>

    <VoyageChart />

    <Container
      id="work"
      tag="section"
      class="home__atlas"
      aria-labelledby="home-atlas-title"
    >
      <SectionHead
        class="home__head"
        :kicker="`Section B — The Atlas of Works · ${plateRange}`"
        :link="{ label: 'See all projects', to: '/work' }"
        title="Good ideas."
        accent="Carefully"
        tail="made."
      />
      <AtlasGrid :plates="plates" />
    </Container>

    <Container
      id="writing"
      tag="section"
      class="home__correspondence"
      aria-label="Correspondence"
    >
      <SectionHead
        class="home__head"
        kicker="Section C — Correspondence"
        :link="{ label: 'View all writing', to: '/writing' }"
        title="Stupid, weird, original."
        accent="Honest."
      />
      <LeadDispatch
        v-if="lead"
        class="u-reveal"
        :dispatch="lead"
      />
      <DividerHeading
        class="home__divider"
        label="More dispatches"
        aside="Hover to turn over"
      />
      <PostcardGrid :dispatches="latestPostcards" />
    </Container>
  </div>
</template>

<style scoped lang="scss">
.home {
  &__atlas {
    padding-top: var(--rv-space-120);
    padding-bottom: var(--rv-space-40);
  }

  &__correspondence {
    padding-top: var(--rv-space-96);
    padding-bottom: var(--rv-space-120);
  }

  &__head {
    margin-bottom: var(--rv-space-48);
  }

  &__divider {
    margin: var(--rv-space-80) 0 var(--rv-space-56);
  }
}
</style>
