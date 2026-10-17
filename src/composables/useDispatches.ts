import type { MaybeRefOrGetter } from 'vue'
import type { PostsCollectionItem } from '@nuxt/content'
import type { DispatchView } from '~/types/content'
import { postcardTilts, topicStamps } from '~/data/stamps'

/**
 * Posts collection → dispatches.
 *
 * Order: the featured lead first, then newest first. "No. 02"-style
 * numbers and postcard tilts follow that order (the lead is No. 01).
 */
export function useDispatches(items: MaybeRefOrGetter<PostsCollectionItem[] | null | undefined>) {
  const all = computed<DispatchView[]>(() => {
    const posts = [...(toValue(items) ?? [])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const leadIndex = posts.findIndex(post => post.featured)
    if (leadIndex > 0) posts.unshift(...posts.splice(leadIndex, 1))
    return posts.map((post, index) => toDispatchView(post, index))
  })

  const lead = computed(() => all.value.find(dispatch => dispatch.featured) ?? all.value[0] ?? null)

  /** Everything except the lead, re-tilted by position in this list. */
  const postcards = computed(() =>
    all.value
      .filter(dispatch => dispatch !== lead.value)
      .map((dispatch, index) => ({ ...dispatch, tilt: tiltAt(index) })))

  return { all, lead, postcards }
}

function tiltAt(index: number) {
  return postcardTilts[index % postcardTilts.length] ?? 0
}

export function toDispatchView(post: PostsCollectionItem, index: number): DispatchView {
  const slug = slugOf(post.path)
  const stamp = topicStamps[post.topic]
  return {
    slug,
    to: `/writing/${slug}`,
    number: ordinalLabel(index + 1),
    dispatchNo: dispatchNumber(post.date),
    title: post.title,
    description: post.description,
    kind: post.kind,
    category: stamp.category,
    featured: post.featured ?? false,
    readTime: `${readMinutes(post.rawbody)} min read`,
    postmark: postmarkDate(post.date),
    stamp: { color: stamp.color, icon: stamp.icon, label: stamp.label },
    word: post.postcard.word,
    ground: post.postcard.ground,
    tilt: tiltAt(index),
    address: post.address ?? [],
  }
}
