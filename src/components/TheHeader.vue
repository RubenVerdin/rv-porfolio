<script setup lang="ts">
import { useTheme } from 'rv-design'
import { firstName, navLinks } from '../data/portfolio'

const { mode, cycle } = useTheme()
</script>

<template>
  <header class="nav-header">
    <nav class="nav">
      <a href="#home" class="nav-logo">
        {{ firstName }}<span class="accent">.</span>
      </a>
      <div class="nav-actions">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link">
          {{ link.label }}
        </a>
        <button
          class="rv-btn rv-btn--default rv-btn--ghost rv-btn--small"
          :aria-label="`Switch theme (current: ${mode})`"
          @click="cycle"
        >
          <svg v-if="mode === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
        <a href="#" class="rv-btn rv-btn--primary rv-btn--solid rv-btn--small nav-resume">Resume</a>
      </div>
    </nav>
  </header>
</template>
