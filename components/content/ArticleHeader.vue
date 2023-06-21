<script lang='ts' setup>
const { page } = useContent()

const title = computed(() => page.value.title)
const time = computed(() => new Date(page.value.ctime).toDateString())
const timeAgo = useTimeAgo(new Date(page.value.ctime)).value.replace('"', '')

useContentHead(page)
</script>

<template>
  <div text="~ 1.5em" md-text-1.8em lg-text-2em>
    <h1>
      {{ title }}
    </h1>
    <p text-op-70>
      {{ time }} <sub ml-2 bottom-0>{{ timeAgo }}</sub>
    </p>
  </div>
</template>
