<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h1">
    <slot />
  </ProseHeading>
</template>
