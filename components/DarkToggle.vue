<script setup lang='ts'>
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="!outline-none" @click="toggleDark()">
    <div class="dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
