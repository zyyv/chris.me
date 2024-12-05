<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#3c3c43',
  }],
})

const lastPreference = computed(() => color.value)

function toggleDark(event: MouseEvent) {
  const mode = ['system', 'dark', 'light']
  const nextPreference = mode[(mode.indexOf(color.preference) + 1) % mode.length]!
  const isAppearanceTransition = typeof document.startViewTransition === 'function'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition || !event || lastPreference.value === nextPreference) {
    color.preference = nextPreference
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    color.preference = nextPreference
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: color.value === 'dark'
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: color.value === 'dark'
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

const icon = computed(() => {
  switch (color.preference) {
    case 'dark':
      return 'i-akar-icons:moon-fill'
    case 'light':
      return 'i-carbon:light-filled'
    case 'system':
      return 'i-carbon:cloud-service-management'
    default:
      return ''
  }
})
</script>

<template>
  <ClientOnly>
    <button class="!outline-none op-64 hover:op-100" @click="toggleDark">
      <i :class="icon" size-5.5 />
    </button>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2147483646;
}
.dark::view-transition-old(root) {
  z-index: 2147483646;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
