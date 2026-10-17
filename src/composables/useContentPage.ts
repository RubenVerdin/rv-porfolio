import type { PageFallbackCollectionItem, PagesCollectionItem } from '@nuxt/content'
import type { MaybeRefOrGetter } from 'vue'
import type { PageHeadView } from '~/types/content'

/** True when a markdown body has no nodes (frontmatter-only file). */
function isEmptyBody(item: { body?: { value?: unknown[] } } | null | undefined) {
  return !item?.body?.value?.length
}

/**
 * Maps a `pages` document onto the default content page, falling back to
 * the Page.dc.html lorem (`pageFallback`) field by field and for the body,
 * so the page always looks complete. The accent only falls back together
 * with the title — "Privacy dolor sit." would read as a typo.
 */
export function useContentPage(
  page: MaybeRefOrGetter<PagesCollectionItem | null | undefined>,
  fallback: MaybeRefOrGetter<PageFallbackCollectionItem | null | undefined>,
) {
  const head = computed<PageHeadView>(() => {
    const doc = toValue(page)
    const lorem = toValue(fallback)
    const hasTitle = Boolean(doc?.title)
    const updated = doc?.updated ? longDate(doc.updated) : lorem?.updatedPlaceholder

    return {
      kicker: doc?.kicker || lorem?.kicker || '',
      aside: updated ? `Last updated · ${updated}` : undefined,
      title: (hasTitle ? doc?.title : lorem?.title) ?? '',
      accent: hasTitle ? doc?.accent : lorem?.accent,
      dek: doc?.description || lorem?.description,
    }
  })

  /** The document to render: the page's own body, or the lorem one. */
  const body = computed(() => {
    const doc = toValue(page)
    return isEmptyBody(doc) ? toValue(fallback) : doc
  })

  return { head, body }
}
