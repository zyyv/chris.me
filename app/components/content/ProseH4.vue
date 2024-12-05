<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h4">
    <slot />
  </ProseHeading>
</template>
