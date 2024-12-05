<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h2">
    <slot />
  </ProseHeading>
</template>
