import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Collections stay schema-separate (same rule as v1). `title` and
// `description` come from the `page` type; `description` is the dek.
// Everything presentational that can be derived — roman numerals, postmarks,
// dispatch numbers, read time, stamps, tilt, pager — is derived in
// composables/utils, not authored here.

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        // 1 → "Plate I." Also the atlas order and grid slot.
        plate: z.number().int().min(1),
        // Catalogue index shown as "01 — Digital publishing".
        index: z.string(),
        category: z.string(),
        disciplines: z.array(z.string()).default([]),
        year: z.number(),
        role: z.string().optional(),
        liveUrl: z.string().url().optional(),
        repoUrl: z.string().url().optional(),
        coverImage: z.string().optional(),
        coverCredit: z.string().optional(),
        // Stand-in content; replace with a real case study.
        placeholder: z.boolean().default(false),
      }),
    }),
    posts: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        date: z.date(),
        // "Opinion" → "Featured · Opinion · 9 min read"
        kind: z.string(),
        // The one lead dispatch (LeadDispatch on home + /writing).
        featured: z.boolean().default(false),
        // Picks the stamp (colour, icon, label) — see data/stamps.ts.
        topic: z.enum(['vue', 'css', 'writing', 'systems', 'cities']),
        // Front of the "Greetings from" postcard.
        postcard: z.object({
          word: z.string(),
          ground: z.enum(['sun', 'ruled', 'tiles', 'lanes']),
        }),
        // Address lines on the lead dispatch's postcard back.
        address: z.array(z.string()).optional(),
        placeholder: z.boolean().default(false),
        // Raw markdown, used to compute read time.
        rawbody: z.string(),
      }),
    }),
  },
})
