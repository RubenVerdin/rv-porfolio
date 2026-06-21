import type { Project } from '~/types/project'

export const getProjectImage = (project: Project, size: 'medium' | 'large' | 'full' = 'large'): string => {
  return project._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[size]?.source_url
    ?? project._embedded?.['wp:featuredmedia']?.[0]?.source_url
    ?? ''
}

export const getTechStack = (project: Project): string[] => {
  return project.acf.tech_stack
    ? project.acf.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    : []
}

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim()
}
