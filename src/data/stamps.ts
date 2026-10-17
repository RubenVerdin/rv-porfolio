import type { StampTopic, StampView } from '~/types/content'

// Topic → stamp, from the design's postcard data (stCls / icon / stLabel).

export const topicStamps: Record<StampTopic, StampView & { category: string }> = {
  vue: { category: 'Vue', color: 'seal', label: 'VUE', icon: 'M3 5l9 15 9-15M8 5l4 7 4-7' },
  css: { category: 'CSS', color: 'navy', label: 'CSS', icon: 'M8 6l-5 6 5 6M16 6l5 6-5 6' },
  writing: { category: 'Writing', color: 'red', label: 'INK', icon: 'M4 20l4-1 11-11-3-3L5 16z' },
  systems: { category: 'Systems', color: 'brown', label: 'SYS', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  cities: { category: 'Cities', color: 'steel', label: 'CITY', icon: 'M3 21V9l5-3v15M8 21V6l6 3v12M14 21V9l7-3v15' },
}

/** The MX·CA stamp on the contact postcard. */
export const contactStamp: StampView = { color: 'red', label: 'MX·CA', icon: 'M12 3v18M3 12h18M12 3l3 9-3 9-3-9z' }

/** Postcard tilts, cycled by position (design: -1.2, .9, .6, -.8). */
export const postcardTilts = [-1.2, 0.9, 0.6, -0.8]
