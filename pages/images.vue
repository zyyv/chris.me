<script lang="ts" setup>
const { data } = await useFetch('/api/images')

console.log(data.value)
</script>

<template>
  <div class="w-70% mxa">
    <ImgBlurHash v-for="src in data" :key="src.id" w-100 :src="src.urls.raw" :blurhash="src.blur_hash" />
  </div>
</template>
