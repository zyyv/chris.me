export const waveRef = ref<HTMLCanvasElement | null>(null)

// export const props = defineProps()

export const config = reactive({
  width: 400,
  height: 100,
  lineWidth: 2,
  waveColor: '#d9d9d9',
  progressColor: '#fa0000',
})

export const getPathData = async(url: string) => {
  const { data } = await useFetch(url)
  return (data.value as any).data as number[]
}

export function draw(canvas: HTMLCanvasElement, data: number[]) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, config.width, config.height)
  create(ctx, data)
}

function create(ctx: CanvasRenderingContext2D, data: number[], color = '#fff') {
  ctx.beginPath()
  ctx.lineWidth = config.lineWidth
  const levelY = config.height / 2 //  对称轴纵坐标
  // (n-1) * config.lineWidth * 2 + config.lineWidth < config.width, n为容器内可显示点数
  const n = Math.floor(
    (config.width + config.lineWidth)
          / (config.lineWidth * 2),
  )
  const dotSpace = data.length / n // 取data的平均因子
  for (
    let i = config.lineWidth / 2, k = 1;
    i < config.width;
    i = i + config.lineWidth * 2, k++
  ) {
    ctx.moveTo(i, levelY)
    ctx.lineTo(
      i,
      levelY
            + ((data[Math.floor(k * dotSpace)] / 64) * levelY || 0.1),
    )
    ctx.moveTo(i, levelY)
    ctx.lineTo(
      i,
      levelY
            - ((data[Math.floor(k * dotSpace)] / 64) * levelY || 0.1),
    )
  }
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.closePath()
}

export default {}
