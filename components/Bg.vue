<script setup lang="ts">
const distance = ref(200)

function generateRandomColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const a = (Math.random() * 0.5 + 0.25).toFixed(2)
  return `rgba(${r},${g},${b},${a})`
}

function generateRandomCoordinates() {
  let x = 0
  let y = 0

  if (process.client) {
    x = Math.floor(Math.random() * (window.innerWidth - distance.value * 2) + distance.value)
    y = Math.floor(Math.random() * window.innerHeight * 2)
  }
  return { x, y }
}

function generateStyle(count = 40, duration = 100) {
  const style = []
  for (let i = 0; i < count; i++) {
    const { x, y } = generateRandomCoordinates()
    const color = generateRandomColor()
    style.push(`${x}px ${y}px ${color} `)
  }
  return {
    boxShadow: style.join(','),
    animation: `animStar ${duration}s linear infinite`,
  }
}

const styles = ref([
  generateStyle(40),
  generateStyle(50),
  generateStyle(60),
])
const afterStyles = ref([
  generateStyle(40),
  generateStyle(50),
  generateStyle(60),
])
const afterStyle_1_boxShadow = computed(() => afterStyles.value[0].boxShadow)
const afterStyle_1_animate = computed(() => afterStyles.value[0].animation)
</script>

<template>
  <ClientOnly>
    <div h-screen w-screen z--1 pf top-0 left-0 overflow-hidden>
      <div un-children="z--2 rounded-full pa">
        <div class="w-30px h-30px bg-stars" :style="styles[0]" />
        <div class="signup-bg-stars-2 w-2px h-2px" />
        <div class="signup-bg-stars-3 w-3px h-3px" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* @unocss-skip-start */
.bg-stars::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 10px 20px 30px 10px;
  opacity: 0.7;
  box-shadow: v-bind(afterStyle_1_boxShadow);
  animation: v-bind(afterStyle_1_animate);
}
/* @unocss-skip-end */
</style>
