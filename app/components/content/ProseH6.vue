<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h6">
    <slot />
  </ProseHeading>
</template>
