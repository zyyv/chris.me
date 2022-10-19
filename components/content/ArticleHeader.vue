<script lang='ts' setup>
const { page } = useContent()

const title = computed(() => page.value.title)
const time = computed(() => new Date(page.value.ctime).toDateString())
const timeAgo = useTimeAgo(new Date(page.value.ctime)).value.replace('"', '')

useContentHead(page)
</script>

<template>
  <div base>
    <h1 text-2xl md-text-3xl lg-text-4xl>
      {{ title }}
    </h1>
    <p important-text-op-70>
      {{ time }} <sub ml-2 bottom-0>{{ timeAgo }}</sub>
    </p>
  </div>
</template>
