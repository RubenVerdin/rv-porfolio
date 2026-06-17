<script setup lang="ts">
import { experiences } from '../data/portfolio'
</script>

<template>
  <section id="experience" class="section">
    <div class="section-header section-header--lg">
      <span class="section-eyebrow">
        <span class="eyebrow-line"></span>03 — Experience
      </span>
      <h2 class="section-title">Experience<span class="accent">.</span></h2>
      <p class="section-subtitle">My professional journey</p>
    </div>
    <div>
      <div v-for="(job, i) in experiences" :key="i" class="exp__item">
        <span class="exp__dot"></span>
        <div class="exp__header">
          <h3 class="exp__title">{{ job.role }}</h3>
          <span class="exp__period">{{ job.period }}</span>
        </div>
        <div class="exp__meta">
          <span class="exp__company">{{ job.company }}</span>
          <span class="exp__location"> • {{ job.location }}</span>
        </div>
        <ul class="exp__bullets">
          <li v-for="(bullet, j) in job.bullets" :key="j" class="exp__bullet">
            <span class="exp__bullet-line"></span>
            <span class="exp__bullet-text">{{ bullet }}</span>
          </li>
        </ul>
        <div class="tags-wrap">
          <RvTag v-for="tech in job.tech" :key="tech">{{ tech }}</RvTag>
        </div>
      </div>
    </div>
  </section>
</template>
