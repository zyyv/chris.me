<script lang='ts' setup>
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <h2
    text-2xl
    md-text-3xl
    mb4
    mt-0
  >
    {{ title }}
  </h2>
  <p font-craft text-xs md-text-sm italic>
    {{ description }}
  </p>
</template>
