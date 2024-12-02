<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(() => {
  return queryCollection('posts')
    .path(route.path)
    .first()
})
</script>

<template>
  <div>
    <div prose ma>
      <h1>{{ post.title }}</h1>
      <ContentRenderer :value="post" />
      <Back />
    </div>
  </div>
</template>
