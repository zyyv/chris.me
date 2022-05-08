<script lang='ts' setup>
import { config, draw, getPathData, waveRef } from '.'

const wavePath = 'https://static.hi-five.cn/wave/MH/MHE/MH_MHE_0041/MH_MHE_0041_01101.json?t=1651134287&k=72f6e445935c1db0'

const waveData = await getPathData(wavePath)

nextTick(() => {
  setTimeout(() => {
    draw(waveRef.value, waveData)
  }, 1000)
  // console.log(waveRef.value)
  // if (waveRef.value)
  //   draw(waveRef.value)
})

</script>
<script lang="ts">
export default {
  name: 'Wave2',
}
</script>

<template>
  <div>
    wave---

    <!-- {{ data }} -->
    <canvas ref="waveRef" b :width="config.width" :height="config.height" />
  </div>
</template>

<style lang='scss' scoped>
</style>
