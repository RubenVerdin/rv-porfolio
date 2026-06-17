<script setup lang="ts">
import { name, year, socials } from '../data/portfolio'
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span class="footer__copy">© {{ year }} {{ name }}. All rights reserved.</span>
      <div class="footer__icons">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          :aria-label="s.label"
          class="footer-social"
        >
          <span v-html="s.icon"></span>
        </a>
      </div>
    </div>
  </footer>
</template>
