<script setup lang="ts">
import { email, mailtoHref, location, socials } from '~/data/portfolio'
</script>

<template>
  <section id="contact" class="section section--no-border">
    <div class="section-header">
      <span class="section-eyebrow">
        <span class="eyebrow-line"></span>04 — Contact
      </span>
      <h2 class="section-title">Get in touch<span class="accent">.</span></h2>
      <p class="section-subtitle">Have a project in mind or just want to say hello?</p>
    </div>
    <div class="contact__grid">
      <div class="contact__left">
        <a :href="mailtoHref" class="contact-email">{{ email }}</a>
        <div class="contact__location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ location }}
        </div>
        <a :href="mailtoHref" class="rv-btn rv-btn--primary rv-btn--solid rv-btn--large contact__email-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Send me an email
        </a>
      </div>
      <div class="contact__socials">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="social-link"
        >
          <span class="social-link__label">
            <span class="social-link__icon" v-html="s.icon"></span>
            {{ s.label }}
          </span>
          <svg class="social-link__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>
