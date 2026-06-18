<script setup lang="ts">
import { name, role, email, mailtoHref } from '~/data/portfolio'
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__inner">
      <p class="hero__eyebrow">
        <span class="hero__eyebrow-line"></span>Hey, I'm
      </p>
      <h1 class="hero__name">{{ name }}</h1>
      <p class="hero__role">{{ role }}</p>
      <p class="hero__desc">
        I build and craft digital experiences that deliver
        <span class="hero__desc-impact">real impact</span>.
      </p>
      <div class="hero__cta">
        <a href="#contact" class="rv-btn rv-btn--primary rv-btn--solid rv-btn--large hero__connect-btn">
          Let's connect
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </a>
        <a :href="mailtoHref" class="hero-email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          {{ email }}
        </a>
      </div>
    </div>
  </section>
</template>
