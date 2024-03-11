<template>
  <div
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" icon-btn select-none
    @click="toggleDark"
  >
    <i dark:i-akar-icons:moon-fill i-carbon:light-filled />
  </div>
</template>
