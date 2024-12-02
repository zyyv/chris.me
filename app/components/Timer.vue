<script lang='ts' setup>
const time = ref(new Date())
const weekMap = new Map([
  [0, 'Sun'],
  [1, 'Mon'],
  [2, 'Tue'],
  [3, 'Wed'],
  [4, 'Thu'],
  [5, 'Fri'],
  [6, 'Sat'],
])
const buildTime = import.meta.env.__BUILD_TIME__ as string
const buildTimeAgo = useTimeAgo(buildTime)

useIntervalFn(() => {
  time.value = new Date()
}, 1000)
</script>

<template>
  <ClientOnly>
    <div hidden lg:flex font-mono text-xs fcc gap-1>
      {{ weekMap.get(time.getDay()) }}, <time :datetime="time.toISOString()" :title="time.toISOString()">{{
        time.toLocaleTimeString('en-US', { hour12: false })
      }}</time>
      ·
      <div i-logos:nuxt-icon />
      Built <time :datetime="buildTime" :title="buildTime">{{ buildTimeAgo }}</time>
    </div>
  </ClientOnly>
</template>
