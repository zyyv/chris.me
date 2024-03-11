<template>
  <button
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" icon-btn class="select-none"
    @click="toggleDark"
  >
    <i class="dark:i-akar-icons:moon-fill i-carbon:light-filled" />
  </button>
</template>
