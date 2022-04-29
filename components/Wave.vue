<script lang='ts' setup>
const waveRef = ref<HTMLCanvasElement | null>(null)

const config = reactive({
  bg: '#999',
  progress: '#fa0000',
  gap: 20,
  width: 700,
  height: 70,
  outBoxBg: '#000',
  innerBoxBg: 'rgba(255, 0, 0, 0.1)',
  innerBoxPoint: true,
})

function createCanvas(wave) {
  if (waveRef.value)
    draw(waveRef.value, '#999', wave, 0, 320, 60)
}

const wavePath = 'https://static.hi-five.cn/wave/MH/MHE/MH_MHE_0041/MH_MHE_0041_01101.json?t=1651134287&k=72f6e445935c1db0'

const { data } = await useFetch(wavePath)

createCanvas(data.value)

function draw(canvas: HTMLCanvasElement, color, preaks, start, width, height) {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(start, height)
  ctx.lineTo(start, height - preaks[0])
  for (let i = 1; i < preaks.length; i++)
    ctx.lineTo(start + i, height - preaks[i])

  ctx.lineTo(end, height)
  ctx.lineTo(start, height)
  ctx.fill()
}

</script>

<template>
  <div>
    wave---

    <!-- {{ data }} -->
    <canvas ref="waveRef" width="320" height="60" />
  </div>
</template>

<style lang='scss' scoped>
</style>
