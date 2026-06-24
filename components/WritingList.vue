<script setup lang="ts">
import { articles as allArticles } from '~/data/portfolio'

const props = withDefaults(defineProps<{
  limit?: number
  heading?: string
  viewAllHref?: string
  viewAllLabel?: string
  featured?: boolean
}>(), {
  limit: 6,
  featured: false,
})

const displayed = computed(() => allArticles.slice(0, props.limit))
const lead      = computed(() => props.featured ? displayed.value[0] ?? null : null)
const rows      = computed(() => props.featured ? displayed.value.slice(1) : displayed.value)
</script>

<template>
  <div class="writing-list">
    <SectionHeader
      v-if="heading"
      :heading="heading"
      :view-all-href="viewAllHref"
      :view-all-label="viewAllLabel"
    />

    <div class="writing-list__feed">

      <!-- Featured lead article -->
      <a v-if="lead" href="#" class="article-lead">
        <div class="article-lead__media">
          <div class="article-lead__img-placeholder" aria-hidden="true"></div>
        </div>
        <div class="article-lead__text">
          <div class="article-lead__meta">
            <span class="article-lead__featured">Featured</span>
            <span class="article-lead__rule" aria-hidden="true"></span>
            <span class="article-lead__category">{{ lead.category }}</span>
            <span v-if="lead.isOpinion" class="article-lead__opinion">Opinion</span>
          </div>
          <h3 class="article-lead__title">{{ lead.title }}</h3>
          <p class="article-lead__dek">{{ lead.dek }}</p>
          <div class="article-lead__footer">
            <span>{{ lead.date }}</span>
            <span class="article-lead__divider" aria-hidden="true"></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
        </div>
      </a>

      <!-- Article rows -->
      <a v-for="article in rows" :key="article.slug" href="#" class="article-row">
        <div class="article-row__media">
          <div class="article-row__img-placeholder" aria-hidden="true"></div>
        </div>
        <div class="article-row__content">
          <div class="article-row__meta">
            <span class="article-row__category">{{ article.category }}</span>
            <span v-if="article.isOpinion" class="article-row__opinion">Opinion</span>
          </div>
          <h3 class="article-row__title">{{ article.title }}</h3>
          <p class="article-row__dek">{{ article.dek }}</p>
          <div class="article-row__footer">
            <span>{{ article.date }}</span>
            <span class="article-row__divider" aria-hidden="true"></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
        </div>
      </a>

    </div>
  </div>
</template>
