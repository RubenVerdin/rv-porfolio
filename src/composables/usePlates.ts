import type { MaybeRefOrGetter } from 'vue'
import type { ProjectsCollectionItem } from '@nuxt/content'
import type { PlateView } from '~/types/content'

/** Projects collection → atlas plates, in plate order. */
export function usePlates(items: MaybeRefOrGetter<ProjectsCollectionItem[] | null | undefined>) {
  return computed<PlateView[]>(() =>
    [...(toValue(items) ?? [])]
      .sort((a, b) => a.plate - b.plate)
      .map(toPlateView))
}

export function toPlateView(item: ProjectsCollectionItem): PlateView {
  const slug = slugOf(item.path)
  const disciplines = item.disciplines ?? []
  return {
    slug,
    to: `/work/${slug}`,
    plate: item.plate,
    label: `Plate ${toRoman(item.plate)}.`,
    index: item.index,
    category: item.category,
    title: item.title,
    description: item.description,
    meta: [...disciplines, String(item.year)].join(' · '),
    disciplines,
    year: item.year,
    role: item.role,
    liveUrl: item.liveUrl,
    repoUrl: item.repoUrl,
    coverImage: item.coverImage,
    coverCredit: item.coverCredit,
  }
}
