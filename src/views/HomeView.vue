<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ResumeCta from '../components/ResumeCta.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>

<template>
  <div class="page">
    <TheHeader />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ResumeCta />
    <ContactSection />
    <TheFooter />
  </div>
</template>
