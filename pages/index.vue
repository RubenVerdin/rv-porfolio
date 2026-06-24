<script setup lang="ts">
import { name } from '~/data/portfolio'

const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = "Let's work together."
ctaText.value  = "I'm open to freelance projects, collaborations, and interesting conversations."
</script>

<template>
  <!-- ===== LEAD STORY ===== -->
  <section class="container home-edition">
    <div class="home-edition__bar">
      <span>The Main Story</span>
      <span>Toronto Edition · Vol. I</span>
      <span>Est. 2026</span>
    </div>
  </section>

  <section class="container home-lead">
    <div class="home-lead__grid">
      <!-- Left: editorial copy -->
      <div class="home-lead__left">
        <p class="home-lead__eyebrow">
          <span class="home-lead__eyebrow-line" aria-hidden="true"></span>
          Developer. Writer.
        </p>
        <h1 class="home-lead__headline">
          I build software, write about ideas, and help businesses ship better products.
        </h1>
        <hr class="home-lead__divider" aria-hidden="true" />
        <p class="home-lead__bio">
          <span class="home-lead__drop-cap" aria-hidden="true">I</span>'m a frontend developer
          specialising in Vue, design systems, and the details that make an interface feel
          considered. I turn complex problems into clean, maintainable software — and reusable
          components other teams can build on.
        </p>
        <p class="home-lead__bio">
          I also write about architecture, urbanism, and the intersection of design and the cities
          we live in. Outside of work you'll find me exploring urban spaces, reading about history
          and psychology, and sketching ideas that rarely make it to shipping.
        </p>
        <p class="home-lead__byline">By {{ name }} · Reporting from Toronto, Canada</p>
        <div class="home-lead__cta">
          <InkButton to="/about" variant="solid">
            About me
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </InkButton>
          <InkButton to="/work" variant="outline">Explore what I do</InkButton>
        </div>
      </div>

      <!-- Right: feature carousel -->
      <div class="home-lead__right">
        <HeroCarousel />
      </div>
    </div>
  </section>

  <!-- ===== LATEST WRITING ===== -->
  <section class="container home-section home-section--writing">
    <WritingList
      heading="Latest writing"
      view-all-href="/writing"
      view-all-label="View all writing"
      :limit="4"
      :featured="true"
    />
  </section>

  <!-- ===== FEATURED WORK ===== -->
  <section class="container home-section home-section--work">
    <WorkShowcase
      heading="Featured work"
      view-all-href="/work"
      view-all-label="View all projects"
      :limit="3"
    />
  </section>
</template>

<style>

</style>
