<template>
  <NuxtLayout name="error">
    <button @click="handleError">
      Clear errors
    </button>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
