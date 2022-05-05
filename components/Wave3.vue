<script lang='ts' setup>

const waveRef = ref<HTMLCanvasElement | null>(null)

const config = reactive({
  width: 400,
  height: 100,
  lineWidth: 1,
  waveColor: '#d9d9d9',
  progressColor: '#fa0000',
})

const wavePath = 'https://static.hi-five.cn/wave/MH/MHE/MH_MHE_0041/MH_MHE_0041_01101.json?t=1651134287&k=72f6e445935c1db0'

const { data } = await useFetch(wavePath)
const waveData = (data.value as any).data

nextTick(() => {
  setTimeout(() => {
    draw(waveRef.value)
  }, 1000)
  // console.log(waveRef.value)
  // if (waveRef.value)
  //   draw(waveRef.value)
})

function draw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, config.width, config.height)
  create(ctx)
}

function create(ctx: CanvasRenderingContext2D, color = '#fff') {
  ctx.beginPath()
  ctx.lineWidth = config.lineWidth
  const levelY = config.height / 2 //  对称轴纵坐标
  // (n-1) * config.lineWidth * 2 + config.lineWidth < config.width, n为容器内可显示点数
  const n = Math.floor(
    (config.width + config.lineWidth)
          / (config.lineWidth * 2),
  )
  const dotSpace = waveData.length / n // 取waveData的平均因子
  for (
    let i = config.lineWidth / 2, k = 1;
    i < config.width;
    i = i + config.lineWidth * 2, k++
  ) {
    ctx.moveTo(i, levelY)
    ctx.lineTo(
      i,
      levelY
            + ((waveData[Math.floor(k * dotSpace)] / 64) * levelY || 0.1),
    )
    ctx.moveTo(i, levelY)
    ctx.lineTo(
      i,
      levelY
            - ((waveData[Math.floor(k * dotSpace)] / 64) * levelY || 0.1),
    )
  }
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.closePath()
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
