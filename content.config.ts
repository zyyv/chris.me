import { defineCollection, z } from '@nuxt/content'

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**',
    schema: z.object({
      date: z.string(),
    }),
  }),
}
