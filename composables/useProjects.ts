import type { Project } from '~/types/project'

export const useProjects = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.wpBaseUrl

  return useFetch<Project[]>(
    `${baseUrl}/wp-json/wp/v2/project?_embed&per_page=100&orderby=date&order=desc`,
    {
      key: 'projects',
      transform: (data: Project[]) => data
    }
  )
}

export const useProject = (slug: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.wpBaseUrl

  return useFetch<Project[]>(
    `${baseUrl}/wp-json/wp/v2/project?slug=${slug}&_embed`,
    { key: `project-${slug}` }
  )
}
