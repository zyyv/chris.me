<script lang='ts' setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <h1 text-2xl md-text-3xl base text-black mb4>
    「 {{ title }} 」
  </h1>
  <p text-base base italic>
    {{ description }}
  </p>
</template>
