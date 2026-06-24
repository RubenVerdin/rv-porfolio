<script setup lang="ts">
import { email, mailtoHref, socials, location } from '~/data/portfolio'

const { ctaTitle, ctaText } = usePageMeta()
ctaTitle.value = 'Prefer email?'
ctaText.value  = 'Drop me a line directly — I read everything and reply within a day or two.'
</script>

<template>
  <PageTitle
    title="Contact"
    subtitle="Let's talk — about a project, an idea, or anything in between."
  />

  <section class="container contact-page">
    <div class="contact-page__grid">

      <!-- Left: availability + primary contact -->
      <div class="contact-main">
        <div class="contact-main__pill">
          <span class="contact-main__dot" aria-hidden="true"></span>
          Available for new projects
        </div>

        <a :href="mailtoHref" class="contact-main__email" aria-label="Send email">
          {{ email }}
        </a>

        <p class="contact-main__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {{ location }}
        </p>

        <InkButton :href="mailtoHref" external variant="solid" class="contact-main__cta">
          Send me an email
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </InkButton>

        <p class="contact-main__note">
          I usually reply within one business day. For project enquiries, a brief
          description of what you're building helps me respond faster.
        </p>
      </div>

      <!-- Right: social links -->
      <div class="contact-socials">
        <h2 class="contact-socials__heading">Find me online</h2>
        <ul class="contact-socials__list" role="list">
          <li v-for="social in socials" :key="social.id" class="contact-social-item">
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-social-item__link"
              :aria-label="social.label"
            >
              <span class="contact-social-item__icon" v-html="social.icon" aria-hidden="true"></span>
              <div class="contact-social-item__body">
                <span class="contact-social-item__name">{{ social.label }}</span>
                <span class="contact-social-item__handle">{{ social.handle }}</span>
              </div>
              <svg class="contact-social-item__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>
