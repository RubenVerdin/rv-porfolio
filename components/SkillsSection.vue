<script setup lang="ts">
import { skills } from '~/data/portfolio'
</script>

<template>
  <section id="skills" class="section">
    <div class="section-header">
      <span class="section-eyebrow">
        <span class="eyebrow-line"></span>02 — Skills
      </span>
      <h2 class="section-title">Skills &amp; expertise<span class="accent">.</span></h2>
      <p class="section-subtitle section-subtitle--capped">
        A collection of technologies I'm proficient with, from languages to frameworks and tools.
      </p>
    </div>
    <div class="skills__grid">
      <div v-for="group in skills" :key="group.group" class="skills__card">
        <h3 class="skills__group-title">{{ group.group }}</h3>
        <div class="tags-wrap">
          <RvTag v-for="item in group.items" :key="item">{{ item }}</RvTag>
        </div>
      </div>
    </div>
  </section>
</template>
