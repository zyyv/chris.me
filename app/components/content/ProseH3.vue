<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h3">
    <slot />
  </ProseHeading>
</template>
