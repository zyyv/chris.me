<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <ProseHeading :id tag="h5">
    <slot />
  </ProseHeading>
</template>
