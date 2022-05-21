<script setup lang="ts">
import { isDark } from '#imports'

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" icon-btn class="!outline-none" @click="toggleDark">
    <div class="dark:i-akar-icons:moon-fill i-carbon:light-filled" />
  </button>
</template>
