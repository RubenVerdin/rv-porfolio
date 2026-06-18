<script setup lang="ts">
import { useTheme } from 'rv-design'

const { setTheme } = useTheme()
if (typeof localStorage !== 'undefined' && !localStorage.getItem('rv-theme')) {
  setTheme('dark')
}
</script>

<template>
  <div class="rv-app">
    <NuxtPage />
  </div>
</template>
