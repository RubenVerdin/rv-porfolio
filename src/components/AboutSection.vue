<script setup lang="ts">
import { stats } from '../data/portfolio'
</script>

<template>
  <section id="about" class="section">
    <div class="section-header">
      <span class="section-eyebrow">
        <span class="eyebrow-line"></span>01 — About
      </span>
      <h2 class="section-title">About me<span class="accent">.</span></h2>
      <p class="section-subtitle">Get to know me better</p>
    </div>
    <p class="about__bio">
      I'm a passionate full-stack developer with expertise in building scalable web applications.
      I specialize in <span class="about__tech">React, Next.js, and Node.js</span> ecosystems,
      delivering clean code and exceptional user experiences. With a keen eye for detail and a love
      for elegant solutions, I transform complex problems into simple, beautiful, and intuitive designs.
    </p>
    <div class="about__stats">
      <div v-for="stat in stats" :key="stat.label" class="about__stat">
        <div class="about__stat-num">{{ stat.num }}</div>
        <div class="about__stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>
