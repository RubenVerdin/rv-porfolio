<script setup lang="ts">
// The default (WYSIWYG) page for one-off CMS documents in content/pages/:
// Privacy, Terms… Missing fields and an empty body fall back to the lorem in
// content/fallback/page.md, so the page always looks complete. Any path
// without a document is a 404.
definePageMeta({ footer: 'back-page' })

const route = useRoute()

const { data } = await useAsyncData(`page:${route.path}`, async () => {
  const [page, fallback] = await Promise.all([
    queryCollection('pages').path(route.path).first(),
    queryCollection('pageFallback').first(),
  ])
  return { page, fallback }
})

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { head, body } = useContentPage(
  () => data.value?.page,
  () => data.value?.fallback,
)

useSeoMeta({
  title: () => `${head.value.title} — Ruben Verdin`,
  description: () => head.value.dek,
})
</script>

<template>
  <DetailTemplate spacing="flush">
    <template #head>
      <PageHead v-bind="head" />
    </template>

    <ArticleBody
      v-if="body"
      :value="body"
    />
    <Signoff ruled>
      <BaseButton
        to="/sitemap"
        variant="line"
      >
        Sitemap
      </BaseButton>
    </Signoff>
  </DetailTemplate>
</template>
