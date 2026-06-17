<script setup lang="ts">
import { useTheme } from 'rv-design'
import HomeView from './views/HomeView.vue'

const { setTheme } = useTheme()
if (typeof localStorage !== 'undefined' && !localStorage.getItem('rv-theme')) {
  setTheme('dark')
}
</script>

<template>
  <div class="rv-app">
    <HomeView />
  </div>
</template>
