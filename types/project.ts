export interface WPImage {
  source_url: string
  width: number
  height: number
}

export interface Project {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  acf: {
    summary: string
    client_name: string
    year: string
    tech_stack: string
    project_url: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      media_details: {
        sizes: {
          large?: WPImage
          medium?: WPImage
          full?: WPImage
        }
      }
      source_url: string
    }>
  }
}
