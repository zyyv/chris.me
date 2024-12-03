import { defineCollection, z } from '@nuxt/content'

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/*.md',
    schema: z.object({
      date: z.string(),
      tags: z.array(z.string()),
      lang: z.string(),
      rawbody: z.string(),
    }),
  }),
}
