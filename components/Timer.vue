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

useIntervalFn(() => {
  time.value = new Date()
}, 1000)
</script>

<template>
  <div hidden lg:block font-mono text-sm>
    {{ weekMap.get(time.getDay()) }}, {{ time.toLocaleTimeString('en-US', { hour12: false }) }}
  </div>
</template>
