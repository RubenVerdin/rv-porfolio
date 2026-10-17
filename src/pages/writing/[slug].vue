<script setup lang="ts">
import { city, signature } from '~/data/site'

definePageMeta({ section: 'writing', footer: 'back-page' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: posts } = await useAsyncData('posts', () => queryCollection('posts').all())
const { all } = useDispatches(posts)

const item = computed(() => posts.value?.find(entry => slugOf(entry.path) === slug.value))
const dispatch = computed(() => all.value.find(entry => entry.slug === slug.value))
const { following } = usePager(all, slug)
const more = computed(() => following(2))

if (!item.value || !dispatch.value) {
  throw createError({ statusCode: 404, statusMessage: 'Dispatch not found', fatal: true })
}

const metaLine = computed(() => {
  const current = dispatch.value!
  return [current.featured ? 'Featured' : null, current.kind, current.readTime].filter(Boolean).join(' · ')
})

useSeoMeta({
  title: () => `${dispatch.value?.title} — Ruben Verdin`,
  description: () => dispatch.value?.description,
})
</script>

<template>
  <DetailTemplate
    v-if="item && dispatch"
    spacing="snug"
  >
    <template #head>
      <DocHead
        align="center"
        :crumbs="[{ label: 'Correspondence', to: '/writing' }, { label: `Dispatch No. ${dispatch.dispatchNo}` }]"
        :title="dispatch.title"
        :dek="dispatch.description"
      >
        <template #meta>
          <MonoLabel tone="accent">
            {{ metaLine }}
          </MonoLabel>
        </template>
        <div class="writing-detail__byline">
          <div class="writing-detail__author">
            <div class="writing-detail__name">
              {{ signature }}
            </div>
            <MonoLabel
              tag="div"
              tone="muted"
            >
              Correspondent · {{ city }}
            </MonoLabel>
          </div>
          <Postmark :lines="[dispatch.postmark.date, dispatch.postmark.year]" />
          <Stamp v-bind="dispatch.stamp" />
        </div>
      </DocHead>
    </template>

    <ArticleBody :value="item" />
    <Signoff ruled>
      <BaseButton
        to="/writing"
        variant="line"
      >
        All dispatches
      </BaseButton>
    </Signoff>

    <template #after>
      <Container
        tag="section"
        class="writing-detail__more"
        aria-label="More dispatches"
      >
        <DividerHeading
          class="writing-detail__divider"
          label="More dispatches"
        />
        <PostcardGrid :dispatches="more" />
      </Container>
    </template>
  </DetailTemplate>
</template>

<style scoped lang="scss">
.writing-detail {
  &__byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--rv-space-28);
    margin-top: var(--rv-space-8);
    padding: var(--rv-space-14) var(--rv-space-32);
    border-top: var(--rv-border-hairline) solid var(--rv-color-ink);
    border-bottom: var(--rv-border-hairline) solid var(--rv-color-ink);
  }

  &__author {
    text-align: left;
  }

  &__name {
    font-family: var(--rv-font-display);
    font-style: italic;
    font-size: var(--rv-text-24);
  }

  &__more {
    padding-bottom: var(--rv-space-100);
  }

  &__divider {
    margin-bottom: var(--rv-space-56);
  }
}
</style>
