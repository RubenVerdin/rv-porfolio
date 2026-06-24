<script setup lang="ts">
import { getProjectImage, getTechStack, stripHtml } from '~/utils/project'
import type { Project } from '~/types/project'

const props = withDefaults(defineProps<{
  limit?: number
  heading?: string
  viewAllHref?: string
  viewAllLabel?: string
}>(), {
  limit: 6,
})

const { data: projects, pending, error } = await useProjects()

const displayed = computed(() =>
  (projects.value ?? []).slice(0, props.limit)
)

const lead = computed(() => displayed.value[0] ?? null)
const rest = computed(() => displayed.value.slice(1))

// ─── Modal ────────────────────────────────────────────────────
const activeProject = ref<Project | null>(null)
const originRect    = ref<DOMRect | null>(null)
const modalVisible  = computed(() => activeProject.value !== null)

function openProject(e: MouseEvent, project: Project) {
  originRect.value = (e.currentTarget as HTMLElement).getBoundingClientRect()
  activeProject.value = project
  document.documentElement.style.overflow = 'hidden'
}

function closeModal() {
  activeProject.value = null
  document.documentElement.style.overflow = ''
}

// FLIP enter: panel animates from card's position/size to modal's
function onEnter(el: Element, done: () => void) {
  const overlay = el as HTMLElement
  const panel = overlay.querySelector<HTMLElement>('.project-modal__panel')!

  overlay.style.opacity = '0'

  if (originRect.value && panel) {
    const pr = panel.getBoundingClientRect()
    const or = originRect.value
    const tx = (or.left + or.width / 2) - (pr.left + pr.width / 2)
    const ty = (or.top  + or.height / 2) - (pr.top  + pr.height / 2)
    const sx = or.width  / pr.width
    const sy = or.height / pr.height
    panel.style.transformOrigin = 'center center'
    panel.style.transform       = `translate(${tx}px,${ty}px) scale(${sx},${sy})`
    panel.style.transition      = 'none'
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.45s cubic-bezier(0.2,0,0.1,1)'
      overlay.style.opacity    = '1'
      if (panel) {
        panel.style.transition = 'transform 0.55s cubic-bezier(0.2,0.85,0.25,1)'
        panel.style.transform  = 'none'
      }
      setTimeout(done, 560)
    })
  })
}

// Simple fade+scale out on leave
function onLeave(el: Element, done: () => void) {
  const overlay = el as HTMLElement
  const panel   = overlay.querySelector<HTMLElement>('.project-modal__panel')!
  const dur = '0.35s cubic-bezier(0.5,0,0.3,1)'
  overlay.style.transition = `opacity ${dur}`
  overlay.style.opacity    = '0'
  if (panel) {
    panel.style.transition = `transform ${dur}, opacity ${dur}`
    panel.style.transform  = 'scale(0.94)'
    panel.style.opacity    = '0'
  }
  setTimeout(done, 360)
}

onMounted(() => {
  const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
  window.addEventListener('keydown', handleKey)
  onUnmounted(() => window.removeEventListener('keydown', handleKey))
})

function padIdx(n: number) { return String(n + 1).padStart(2, '0') }
function category(p: Project) { return p.acf.client_name || 'Project' }
</script>

<template>
  <div class="work-showcase">
    <SectionHeader
      v-if="heading"
      :heading="heading"
      :view-all-href="viewAllHref"
      :view-all-label="viewAllLabel"
    />

    <div v-if="pending" class="work-showcase__state">
      <RvSpinner />
    </div>

    <p v-else-if="error" class="work-showcase__state work-showcase__state--error">
      Could not load projects.
    </p>

    <template v-else-if="lead">
      <div class="work-showcase__grid">

        <!-- Lead story -->
        <article class="project-lead" @click="openProject($event, lead)">
          <div class="project-lead__media">
            <span class="project-lead__ghost" aria-hidden="true">{{ padIdx(0) }}</span>
            <img
              v-if="getProjectImage(lead)"
              :src="getProjectImage(lead)"
              :alt="stripHtml(lead.title.rendered)"
              class="project-lead__img"
              loading="eager"
            />
            <span v-else class="project-lead__img-placeholder">Project visual</span>
          </div>

          <div class="project-lead__content">
            <div class="project-lead__meta">
              <span class="project-lead__eyebrow">{{ category(lead) }}</span>
              <span class="rv-tag">No. {{ padIdx(0) }}</span>
            </div>
            <h3 class="project-lead__heading" v-html="lead.title.rendered" />
            <p class="project-lead__summary">{{ lead.acf.summary }}</p>
            <div class="project-lead__filed">
              <span class="project-lead__filed-label">Filed under</span>
              <RvTag v-for="tech in getTechStack(lead)" :key="tech">{{ tech }}</RvTag>
            </div>
            <div class="project-lead__byline">
              <span class="project-lead__role">{{ category(lead) }}</span>
              <span v-if="lead.acf.year"> · {{ lead.acf.year }}</span>
              <span class="project-lead__read">
                Read the full story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                </svg>
              </span>
            </div>
          </div>
        </article>

        <!-- Secondary cards -->
        <article
          v-for="(project, i) in rest"
          :key="project.id"
          class="project-card"
          @click="openProject($event, project)"
        >
          <div class="project-card__media">
            <span class="project-card__ghost" aria-hidden="true">{{ padIdx(i + 1) }}</span>
            <img
              v-if="getProjectImage(project)"
              :src="getProjectImage(project)"
              :alt="stripHtml(project.title.rendered)"
              class="project-card__img"
              loading="lazy"
            />
            <span v-else class="project-card__img-placeholder">Project visual</span>
          </div>

          <div class="project-card__content">
            <div class="project-card__meta">
              <span class="project-card__eyebrow">{{ category(project) }}</span>
              <span class="rv-tag">No. {{ padIdx(i + 1) }}</span>
            </div>
            <h3 class="project-card__heading" v-html="project.title.rendered" />
            <p class="project-card__summary">{{ project.acf.summary }}</p>
            <div class="project-card__filed">
              <span class="project-card__filed-label">Filed under</span>
              <RvTag v-for="tech in getTechStack(project)" :key="tech">{{ tech }}</RvTag>
            </div>
            <div class="project-card__byline">
              <span class="project-card__role">{{ category(project) }}</span>
              <span v-if="project.acf.year"> · {{ project.acf.year }}</span>
              <span class="project-card__read">
                Read
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                </svg>
              </span>
            </div>
          </div>
        </article>

      </div>
    </template>

    <!-- Project modal -->
    <Teleport to="body">
      <Transition :css="false" @enter="onEnter" @leave="onLeave">
        <div v-if="modalVisible && activeProject" class="project-modal" @click.self="closeModal">
          <div class="project-modal__panel" role="dialog" aria-modal="true" :aria-label="stripHtml(activeProject.title.rendered)">
            <button class="project-modal__close" aria-label="Close" @click="closeModal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            <div class="project-modal__content">
              <!-- Visual pane -->
              <div class="project-modal__visual">
                <span class="project-modal__ghost" aria-hidden="true">01</span>
                <span class="project-modal__eyebrow">
                  <span class="project-modal__eyebrow-line"></span>
                  {{ category(activeProject) }}
                </span>
                <div>
                  <h2 class="project-modal__title" v-html="activeProject.title.rendered" />
                  <p class="project-modal__byline">
                    {{ category(activeProject) }}
                    <span v-if="activeProject.acf.year"> · {{ activeProject.acf.year }}</span>
                  </p>
                </div>
              </div>

              <!-- Detail pane -->
              <div class="project-modal__detail">
                <div
                  v-if="activeProject.content.rendered"
                  class="project-modal__description"
                  v-html="activeProject.content.rendered"
                />
                <p v-else class="project-modal__description">{{ activeProject.acf.summary }}</p>

                <h3 class="project-modal__section-label">Built with</h3>
                <div class="project-modal__tech">
                  <RvTag v-for="tech in getTechStack(activeProject)" :key="tech">{{ tech }}</RvTag>
                </div>

                <div class="project-modal__actions">
                  <InkButton
                    v-if="activeProject.acf.project_url"
                    :href="activeProject.acf.project_url"
                    variant="solid"
                    size="small"
                    external
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    </svg>
                    Live demo
                  </InkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
