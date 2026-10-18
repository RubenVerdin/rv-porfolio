<script setup lang="ts">
definePageMeta({ section: 'work', footer: 'back-page' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Same pattern as v1: query the collection, match on the last path segment
// (content lives in content/projects/, routes are /work/[slug]).
const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').all())
const plates = usePlates(projects)

const item = computed(() => projects.value?.find(entry => slugOf(entry.path) === slug.value))
const plate = computed(() => plates.value.find(entry => entry.slug === slug.value))
const { prev, next } = usePager(plates, slug)

if (!item.value || !plate.value) {
  throw createError({ statusCode: 404, statusMessage: 'Plate not found', fatal: true })
}

const facts = computed(() => {
  const current = plate.value!
  return [
    { term: 'Role', value: current.role ?? '[Your role]' },
    { term: 'Disciplines', value: current.disciplines.join(' · ') },
    { term: 'Year', value: String(current.year) },
    ...(current.liveUrl ? [{ term: 'Visit', value: 'Live site', href: current.liveUrl }] : []),
    ...(current.repoUrl ? [{ term: 'Source', value: 'Repository', href: current.repoUrl }] : []),
  ]
})

useSeoMeta({
  title: () => `${plate.value?.title} — ${plate.value?.label} — Ruben Verdin`,
  description: () => plate.value?.description,
})
</script>

<template>
  <DetailTemplate v-if="item && plate">
    <template #head>
      <DocHead
        :crumbs="[{ label: 'The Atlas of Works', to: '/work' }, { label: plate.label }]"
        :title="plate.title"
        :dek="plate.description"
      >
        <template #meta>
          <div class="work-detail__meta">
            <PlateNumber tone="accent">
              {{ plate.label }}
            </PlateNumber>
            <MonoLabel tone="muted">
              {{ plate.index }} — {{ plate.category }}
            </MonoLabel>
          </div>
        </template>
        <FactList :items="facts" />
      </DocHead>
    </template>

    <template #media>
      <Container>
        <figure class="work-detail__cover">
          <PlateImage
            :src="plate.coverImage"
            :alt="plate.title"
            placeholder="[ Cover image · 16:9 ]"
            aspect="16 / 9"
          />
          <figcaption class="work-detail__caption">
            <span>{{ plate.label }} — {{ plate.title }}</span>
            <span>{{ plate.coverCredit ?? '[Image credit]' }}</span>
          </figcaption>
        </figure>
      </Container>
    </template>

    <ArticleBody :value="item" />

    <template #after>
      <Container
        v-if="prev && next"
        tag="nav"
        class="work-detail__pager"
        aria-label="More plates"
      >
        <div class="work-detail__pager-grid">
          <PagerLink
            direction="prev"
            :label="prev.label"
            :title="prev.title"
            :to="prev.to"
          />
          <PagerLink
            direction="next"
            :label="next.label"
            :title="next.title"
            :to="next.to"
          />
        </div>
      </Container>
    </template>
  </DetailTemplate>
</template>

<style scoped lang="scss">
.work-detail {
  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--rv-space-20);
  }

  &__cover {
    padding: var(--rv-space-16);
    background: var(--rv-color-paper);
    border: var(--rv-border-hairline) solid var(--rv-color-ink);

    @include theme-transition(background-color);
  }

  &__caption {
    @include label;

    display: flex;
    justify-content: space-between;
    gap: var(--rv-space-12);
    padding-top: var(--rv-space-12);
    color: var(--rv-color-ink-muted);
  }

  &__pager {
    padding-bottom: var(--rv-space-40);
  }

  &__pager-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: var(--rv-border-double) double var(--rv-color-ink);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }
}

@include page-below(xs) {
  .work-detail__cover {
    padding: var(--rv-space-8);
  }

  .work-detail__pager-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
