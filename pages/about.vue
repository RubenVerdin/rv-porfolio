<script setup lang="ts">
import { experiences, technologies, interests } from '~/data/portfolio'

const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = "Let's build something together."
ctaText.value  = "I'm open to freelance projects, collaborations, and interesting conversations."
</script>

<template>
  <PageTitle
    title="About"
    subtitle="The person behind the code and the ideas."
  />

  <!-- ===== WHO I AM ===== -->
  <section class="container about-who">
    <div class="about-who__section-head">
      <h2 class="about-who__label">Who I am</h2>
      <span 
        class="about-who__rule" 
        aria-hidden="true"
      ></span>
    </div>

    <div class="about-who__grid">
      <div>
        <h3 class="about-who__headline">
          I'm a frontend developer who cares about craft, systems, and impact.
        </h3>
        <p class="about-who__bio">
          I build user interfaces with Vue, create design systems that scale, and write about the
          intersection of technology, architecture, and the cities we live in.
        </p>
        <p class="about-who__bio">
          Outside of work, you'll find me exploring urban spaces, reading about history and
          psychology, and sketching ideas that rarely make it to shipping.
        </p>
        <InkButton to="/work" variant="solid" class="about-who__cta">
          View my work
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </InkButton>
      </div>

      <!-- Portrait placeholder -->
      <figure class="about-who__figure">
        <div class="about-who__portrait" aria-label="Portrait placeholder">
          <span class="about-who__portrait-label" aria-hidden="true">Drop a photo</span>
        </div>
        <figcaption class="about-who__caption">Toronto, Canada</figcaption>
      </figure>
    </div>
  </section>

  <!-- ===== CAREER TIMELINE ===== -->
  <section class="container about-timeline">
    <div class="about-timeline__head">
      <h2 class="about-timeline__label">Career timeline</h2>
      <span class="about-timeline__rule" aria-hidden="true"></span>
    </div>

    <div>
      <div v-for="exp in experiences" :key="exp.company" class="timeline-row">
        <div class="timeline-row__period">{{ exp.period }}</div>
        <div class="timeline-row__body">
          <span class="timeline-row__dot" aria-hidden="true"></span>
          <h3 class="timeline-row__role">{{ exp.role }}</h3>
          <div class="timeline-row__meta">
            <span class="timeline-row__company">{{ exp.company }}</span>
            · {{ exp.location }}
          </div>
          <p class="timeline-row__desc">{{ exp.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== TECHNOLOGIES + INTERESTS ===== -->
  <section class="container about-tech-grid">
    <!-- Technologies -->
    <div>
      <div class="about-section-head">
        <h2 class="about-section-head__label">Technologies</h2>
        <span class="about-section-head__rule" aria-hidden="true"></span>
      </div>
      <div class="about-chips">
        <span v-for="tech in technologies" :key="tech" class="about-chip">{{ tech }}</span>
      </div>
    </div>

    <!-- Interests -->
    <div>
      <div class="about-section-head">
        <h2 class="about-section-head__label">Interests</h2>
        <span class="about-section-head__rule" aria-hidden="true"></span>
      </div>
      <div class="about-interests">
        <div v-for="it in interests" :key="it.key" class="about-interest">
          <div class="about-interest__thumb" aria-hidden="true"></div>
          <div>
            <h3 class="about-interest__title">{{ it.title }}</h3>
            <p class="about-interest__desc">{{ it.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

