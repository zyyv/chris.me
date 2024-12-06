<script lang="ts" setup>
const { data: posts } = await useAsyncData(() => {
  return queryCollection('posts')
    .select('title', 'description', 'path', 'id', 'date', 'tags', 'lang', 'rawbody')
    .order('date', 'DESC')
    .all()
})

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s/g).length
  return Math.ceil(words / wordsPerMinute)
}
</script>

<template>
  <div mxa w-65ch>
    <PageHeader title="Posts" description="In the flow of time, seeking resonance with the soul." />

    <ul my-8 space-y-7>
      <li
        v-for="post in posts"
        :key="post.id"
      >
        <nuxt-link :to="`${post.path}`">
          <strong>{{ post.title }}</strong>
          <sub v-if="post.rawbody" bottom-0 left-1.5>
            <span text-2.75 op-72>{{ calculateReadingTime(post.rawbody) }} min</span>
          </sub>
        </nuxt-link>

        <p italic font-dank my-2 line-clamp-2 text-sm op-72>
          {{ post.description }}
        </p>

        <div fbc op-64>
          <div flex="~ wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              inline-block text-xs rd-full px-1.5 py-1px
              b="~ gray dashed"
            >{{ tag }}</span>
          </div>
          <div>
            <span text-2.75 mr-2>{{ useDateFormat(post.date, 'MMM DD', { locales: 'en-US' }) }}</span>
            <span text-2.75>{{ useTimeAgo(post.date) }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
