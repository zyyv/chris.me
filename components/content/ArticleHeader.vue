<script lang='ts' setup>
const { page } = useContent()

const title = computed(() => page.value.title)
const time = computed(() => new Date(page.value.ctime).toDateString())
const timeAgo = useTimeAgo(new Date(page.value.ctime)).value.replace('"', '')

useContentHead(page)
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ time }} <sub bottom-0>{{ timeAgo }}</sub></p>
  </div>
</template>
