<script setup lang="ts">
const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = "Can't find what you need?"
ctaText.value  = "Reach out directly â€” I'm happy to point you in the right direction."

const pages = [
  {
    number: '01',
    to: '/',
    label: 'Home',
    desc: 'Lead story, latest writing, and featured work â€” the front page.',
  },
  {
    number: '02',
    to: '/work',
    label: 'Work',
    desc: 'Selected projects with full case-study details.',
  },
  {
    number: '03',
    to: '/writing',
    label: 'Writing',
    desc: 'Essays on frontend, design systems, and urbanism.',
  },
  {
    number: '04',
    to: '/about',
    label: 'About',
    desc: "Who I am, where I've worked, and what I care about.",
  },
  {
    number: '05',
    to: '/contact',
    label: 'Contact',
    desc: 'Availability, email, and where to find me online.',
  },
]
</script>

<template>
  <PageTitle
    eyebrow="Index"
    title="Sitemap"
    subtitle="Every page â€” mapped."
  />

  <section class="container sitemap-page">
    <nav aria-label="Sitemap">
      <NuxtLink
        v-for="page in pages"
        :key="page.to"
        :to="page.to"
        class="sitemap-item"
      >
        <span class="sitemap-item__number" aria-hidden="true">{{ page.number }}</span>
        <div class="sitemap-item__body">
          <span class="sitemap-item__label">{{ page.label }}</span>
          <span class="sitemap-item__desc">{{ page.desc }}</span>
        </div>
        <svg class="sitemap-item__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </NuxtLink>
    </nav>
  </section>
</template>
