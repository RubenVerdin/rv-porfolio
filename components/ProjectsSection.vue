<script setup lang="ts">
import { getProjectImage, getTechStack } from '~/utils/project'

const { data: projects, pending, error } = await useProjects()
</script>

<template>
  <section id="projects" class="section">
    <div class="section-header section-header--lg">
      <span class="section-eyebrow">
        <span class="eyebrow-line"></span>04 — Projects
      </span>
      <h2 class="section-title">Selected work<span class="accent">.</span></h2>
      <p class="section-subtitle">A few things I've built.</p>
    </div>

    <div v-if="pending" class="projects__state">
      <RvSpinner />
    </div>

    <div v-else-if="error" class="projects__state projects__state--error">
      Could not load projects.
    </div>

    <div v-else class="projects__grid">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <div v-if="getProjectImage(project)" class="project-card__image-wrap">
          <img
            :src="getProjectImage(project)"
            :alt="project.title.rendered"
            class="project-card__image"
            loading="lazy"
          />
        </div>

        <div class="project-card__body">
          <div class="project-card__meta">
            <span v-if="project.acf.client_name" class="project-card__client">
              {{ project.acf.client_name }}
            </span>
            <span v-if="project.acf.year" class="project-card__year">
              {{ project.acf.year }}
            </span>
          </div>

          <h3 class="project-card__title" v-html="project.title.rendered" />

          <p v-if="project.acf.summary" class="project-card__summary">
            {{ project.acf.summary }}
          </p>

          <div v-if="getTechStack(project).length" class="tags-wrap project-card__tags">
            <RvTag v-for="tech in getTechStack(project)" :key="tech">{{ tech }}</RvTag>
          </div>

          <div v-if="project.acf.project_url" class="project-card__footer">
            <a
              :href="project.acf.project_url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
            >
              View project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
