<script lang='ts' setup>
import { Article } from '~/types'
import data from '~/data/posts.json'

const props = defineProps<{
  title: string
}>()

const article = computed(() => (data as Article[]).find(i => i.slug === props.title))
const timeAgo = useTimeAgo(new Date(article.value?.ctimeMs!)).value.replace('"', '')
</script>

<template>
  <div>
    <h1>{{ article?.slug }}</h1>
    <p>{{ article?.ctime }} <sub bottom-0>{{ timeAgo }}</sub></p>
  </div>
</template>
