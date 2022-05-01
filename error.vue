<template>
  <button @click="handleError">
    Clear errors
  </button>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
