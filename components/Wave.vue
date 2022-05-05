<script lang='ts' setup>

function max(values: any) {
  return Math.max(...values.map(i => Math.abs(i)))
}

// function min(values:any) {
//   let smallest = Number(Infinity)
//   Object.keys(values).forEach((i) => {
//     if (values[i] < smallest)
//       smallest = values[i]
//   })
//   console.log('smallest: ', smallest)
//   return smallest
// }

const util = { max }

const waveRef = ref<HTMLCanvasElement | null>(null)

const config = reactive({
  bg: '#999',
  progress: '#fa0000',
  gap: 5, // 间距
  width: 500,
  height: 100,
  outBoxBg: '#000',
  innerBoxBg: 'rgba(255, 0, 0, 0.1)',
  innerBoxPoint: true,
})

function createCanvas(wave) {
  setTimeout(() => {
    if (waveRef.value)
      draw(waveRef.value, '#fff', wave.data, 0, config.width, 100)
  }, 1000)
}

const wavePath = 'https://static.hi-five.cn/wave/MH/MHE/MH_MHE_0041/MH_MHE_0041_01101.json?t=1651134287&k=72f6e445935c1db0'

const { data } = await useFetch(wavePath)

createCanvas(data.value)

function draw(canvas: HTMLCanvasElement, color, peaks, start, end, height) {
  console.log(canvas, color, peaks, start, end, height)
  const offsetY = config.gap // 距离canvas上下边距
  const halfH = (config.height - 2 * offsetY) / 2 // 每一条波形 可画距离的一半
  const absMax = util.max(peaks)
  const length = peaks.length / 2
  // 间隔多少取一个点
  // const segSize = Math.ceil(peaks.length / config.width)
  // 不固定取值
  const entry = {
    start: 0,
    end: 1,
  }

  // 取离散点
  const first = Math.round(length * entry.start)
  const last = Math.round(length * entry.end) + 1
  console.log(first)
  console.log(last)
  const canvasStart = first
  const canvasEnd = last

  // 默认填满父级元素
  const scale = config.width / length // 每一条波形的宽度
  const ctx = canvas.getContext('2d')
  // opimization
  const halfOffset = halfH + offsetY // 1/2 height
  const absmaxHalf = absMax / halfH

  ctx.clearRect(0, 0, end, height)

  // 先画一条直线
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(0, config.height / 2)
  ctx.lineTo(config.width, config.height / 2)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.fillStyle = color
  // ctx.moveTo((canvasStart - first) * scale, halfOffset) // (0, 50)

  // ctx.lineTo(
  //   (canvasStart - first) * scale,
  //   halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf),
  // ) // (0, 50)

  // for (let i = 0; i < peaks.length / 100; i += 2) {
  //   const p1 = peaks[i] || 0
  //   const p2 = peaks[i + 1] || 0

  //   const h1 = Math.round(p1 / absmaxHalf)
  //   const h2 = Math.round(p2 / absmaxHalf)

  //   const startP = (i - first) * scale + 0

  //   ctx.moveTo(startP, halfOffset - h1)
  //   ctx.lineTo(startP, halfOffset - h2)
  //   console.log(startP, [halfOffset - h1, halfOffset - h2])
  //   // ctx.fill()
  // }

  console.log(ctx)
  for (let i = canvasStart; i < canvasEnd; i++) {
    const peak = peaks[2 * i] || 0
    const h = Math.round(peak / absmaxHalf)
    ctx.lineTo((i - first) * scale + 0, halfOffset - h)
  }
  for (let j = canvasEnd - 1; j >= canvasStart; j--) {
    const peak = peaks[2 * j + 1] || 0
    const h = Math.round(peak / absmaxHalf)
    ctx.lineTo((j - first) * scale + 0, halfOffset - h)
  }
  ctx.lineTo(
    (canvasStart - first) * scale,
    halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf),
  )

  ctx.closePath()
  ctx.fill()
}

</script>

<template>
  <div>
    wave---

    <!-- {{ data }} -->
    <canvas ref="waveRef" b width="500" height="100" />
  </div>
</template>

<style lang='scss' scoped>
</style>
