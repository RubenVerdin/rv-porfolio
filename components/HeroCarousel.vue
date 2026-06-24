<script setup lang="ts">
const slides = [
  { id: 1, caption: 'Behind the build' },
  { id: 2, caption: 'Shipping in public' },
  { id: 3, caption: 'Tools of the trade' },
]

const current = ref(0)

const prev = () => { current.value = (current.value - 1 + slides.length) % slides.length }
const next = () => { current.value = (current.value + 1) % slides.length }

const counter    = computed(() => `${String(current.value + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`)
const trackStyle = computed(() => ({ transform: `translateX(-${current.value * (100 / slides.length)}%)` }))
</script>

<template>
  <figure class="carousel">
    <span class="carousel__label">Front-page feature</span>

    <div class="carousel__frame">
      <div class="carousel__track" :style="trackStyle">
        <div v-for="slide in slides" :key="slide.id" class="carousel__slide">
          <div class="carousel__placeholder" aria-hidden="true"></div>
        </div>
      </div>
    </div>

    <figcaption class="carousel__caption">
      <span class="carousel__counter">
        Fig. {{ counter }} —
        <span class="carousel__caption-text">{{ slides[current].caption }}</span>
      </span>
      <div class="carousel__controls">
        <button class="carousel__btn" aria-label="Previous image" @click="prev">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button class="carousel__btn carousel__btn--next" aria-label="Next image" @click="next">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </figcaption>
  </figure>
</template>
