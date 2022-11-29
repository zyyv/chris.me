<script lang='ts' setup>
import { useTitle } from '@vueuse/core'
import { Article } from '~/types'

useHead({
  title: 'Chris\' Blog | Posts',
})

function sortArticles(list: Article[]) {
  return list.sort((a, b) => {
    return new Date(b.ctime).getTime() - new Date(a.ctime).getTime()
  })
}
</script>

<template>
  <div prose font-mono ma origin>
    <PageHeader title="Posts" description="Some boring but useful articles." />
    <hr>
    <ContentList>
      <template #default="{ list }">
        <template v-for="article in sortArticles(list)" :key="article._id">
          <nuxt-link
            v-if="!article.draft"
            :to="article._path"
            important-no-underline
            block
            op-70
            hover:op-100
          >
            <h3 text-lg md-text-xl>
              {{ article.title }}
            </h3>
            <div italic fic text-sm text-gray4 fw-normal>
              {{ new Date(article.ctime).toDateString() }}
            </div>
          </nuxt-link>
        </template>
      </template>
      <template #not-found>
        No Posts Found
      </template>
    </ContentList>
  </div>
</template>
