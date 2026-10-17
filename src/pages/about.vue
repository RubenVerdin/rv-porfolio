<script setup lang="ts">
import { cv, logbook } from '~/data/about'
import { crossBanners } from '~/data/site'

definePageMeta({ section: 'about', footer: 'back-page' })

const { data: story } = await useAsyncData('about-story', () => queryCollection('about').first())
const { instruments, ports, portsKicker } = useAbout()

useSeoMeta({
  title: 'About — Ruben Verdin',
  description: 'Developer, designer, writer and traveler — a short story and a long logbook.',
})
</script>

<template>
  <div class="about">
    <PageHead
      kicker="Section E — The Correspondent"
      aside="México · Toronto"
      title="About"
      accent="the correspondent."
      dek="Developer, designer, writer and traveler — a short story and a long logbook."
    />
    <Container
      tag="section"
      class="about__section about__section--intro"
      aria-label="My story"
    >
      <AboutIntro :story="story" />
    </Container>
    <Container
      tag="section"
      class="about__section"
      aria-label="Experience"
    >
      <Logbook
        :entries="logbook"
        :cv="cv"
      />
    </Container>
    <Container
      tag="section"
      class="about__section"
      aria-label="Skills"
    >
      <InstrumentsAboard :instruments="instruments" />
    </Container>
    <Container
      tag="section"
      class="about__section about__section--last"
      aria-label="Places"
    >
      <PortsOfCall
        :kicker="portsKicker"
        :ports="ports"
      />
    </Container>
    <CrossBanner :banner="crossBanners.toWork" />
  </div>
</template>

<style scoped lang="scss">
.about {
  &__section {
    padding-bottom: var(--rv-space-120);

    &--intro {
      padding-top: var(--rv-space-16);
    }

    &--last {
      padding-bottom: var(--rv-space-130);
    }
  }
}
</style>
