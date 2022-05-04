<template>
  <nuxt-layout name="error">
    <button @click="handleError">
      Clear errors
    </button>
  </nuxt-layout>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>
