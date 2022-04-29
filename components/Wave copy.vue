<template>
  <div
    :class="$style.waveWarp"
    :style="{ background: `${waveConfig.outBoxBg}` }"
    @mousedown="pointMoving = true"
    @mousemove="movePoint"
    @mouseup="pointMoving = false"
    @mouseleave="pointMoving = false"
    @click.stop="handleProgress"
  >
    <canvas ref="waveform" />
    <div
      ref="progress"
      :style="{
        width: `${progressW}px`,
        background: `${waveConfig.innerBoxBg}`,
        ['border-right']: `${
          progressW && waveConfig.innerBoxPoint ? '1px solid #d42a29' : '0'
        }`
      }"
      :class="[$style.canvasProgress, { [$style.active]: progressW }]"
    >
      <canvas ref="waveProgress" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as util from './util'
import $http from './util/http'
const defaultConfig = {
  bg: '#999', // #f2f2f2
  progress: '#fa0000', // #d42a29
  gap: 20,
  width: 700,
  height: 70
}
export default {
  name: 'AgmWave',
  props: {
    durations: {
      type: Number,
      default: 50
    },
    curTime: {
      type: Number,
      default: 0
    },
    waveConfig: {
      type: Object,
      default() {
        return {
          bg: '#999',
          progress: '#fa0000',
          outBoxBg: '#000',
          innerBoxBg: 'rgba(255, 0, 0, 0.1)',
          innerBoxPoint: true
        }
      }
    },
    waveData: {
      type: Array,
      default() {
        return []
      }
    },
    waveUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      waveform: null,
      waveProgress: null,
      wave: [],
      halfPixel: 0,
      config: {},
      progressW: 0, // progress宽度
      pointMoving: false
    }
  },
  watch: {
    curTime(time) {
      if (!this.pointMoving)
        this.progressW = ((time / this.durations) * this.config.width).toFixed(
          2
        )
    },
    waveUrl(url) {
      this.httpData()
    }
  },
  mounted() {
    this.config = Object.assign({}, defaultConfig, this.waveConfig)
    const canvass = [this.$refs.waveform, this.$refs.waveProgress]
    Array.from(canvass).forEach(canvas => {
      canvas.width = this.config.width
      canvas.height = this.config.height
    })
    this.init()
    if (this.waveData.length > 0) {
      this.createCanvas(this.waveData)
    } else {
      this.httpData()
    }
  },
  methods: {
    init() {
      this.waveform = this.$refs.waveform
      this.waveProgress = this.$refs.waveProgress
    },
    movePoint(e) {
      if (this.pointMoving) {
        this.progressW = e.offsetX
      }
    },
    handleProgress(event) {
      const x = event.offsetX
      const second = ((x / this.config.width) * this.durations).toFixed(2)
      this.progressW = x
      this.$emit('audioProgress', second)
    },
    play(nS) {
      nS = nS || 0
      let startTime
      let timer
      this.createAnimation()
      const moveIt = time => {
        if (!startTime) {
          startTime = time
        }
        time += nS * 1000
        const delta = Math.min(1, (time - startTime) / (this.durations * 1000))
        if (delta > 0.7) {
          this.$emit('changeState', 'tips')
        }
        this.progressW = delta * this.config.width
        if (delta < 1) {
          requestAnimationFrame(moveIt)
        } else {
          timer && cancelAnimationFrame(timer)
          this.$emit('changeState', 'step')
        }
      }
      timer = requestAnimationFrame(moveIt)
    },
    createAnimation() {
      if (!window.requestAnimationFrame) {
        let lastTime = 0
        window.requestAnimationFrame = function(callback) {
          const currTime = new Date().getTime()
          const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
          const id = window.setTimeout(function() {
            callback(currTime + timeToCall)
          }, timeToCall)
          lastTime = currTime + timeToCall
          return id
        }
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id)
        }
      }
    },
    createCanvas(wave) {
      this.drawPoint(
        this.waveform,
        this.config.bg,
        wave,
        0,
        this.config.width,
        this.config.height
      )
      this.drawPoint(
        this.waveProgress,
        this.config.progress,
        wave,
        0,
        this.config.width,
        this.config.height
      )
      this.$emit('canvasCreated', true)
    },
    drawPoint(canvas, color, peaks, start, end, height) {
      const offsetY = this.config.gap // 距离canvas上下边距
      const halfH = (this.config.height - 2 * offsetY) / 2
      const absMax = util.max(peaks)
      const length = peaks.length / 2
      // 间隔多少取一个点
      // const segSize = Math.ceil(peaks.length / this.config.width)
      // 不固定取值
      const entry = {
        start: 0,
        end: 1
      }

      // 取离散点
      const first = Math.round(length * entry.start)
      const last = Math.round(length * entry.end) + 1
      const canvasStart = first
      const canvasEnd = last

      // 默认填满父级元素
      const scale = this.config.width / length
      const ctx = canvas.getContext('2d')
      // opimization
      const halfOffset = halfH + offsetY
      const absmaxHalf = absMax / halfH

      ctx.clearRect(0, 0, end, height)

      // 先画一条直线
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.moveTo(0, this.config.height / 2)
      ctx.lineTo(this.config.width, this.config.height / 2)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.moveTo((canvasStart - first) * scale, halfOffset)

      ctx.lineTo(
        (canvasStart - first) * scale,
        halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf)
      )
      for (let i = canvasStart; i < canvasEnd; i++) {
        const peak = peaks[2 * i] || 0
        const h = Math.round(peak / absmaxHalf)
        ctx.lineTo((i - first) * scale + this.halfPixel, halfOffset - h)
      }
      for (let j = canvasEnd - 1; j >= canvasStart; j--) {
        const peak = peaks[2 * j + 1] || 0
        const h = Math.round(peak / absmaxHalf)
        ctx.lineTo((j - first) * scale + this.halfPixel, halfOffset - h)
      }
      ctx.lineTo(
        (canvasStart - first) * scale,
        halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf)
      )

      ctx.closePath()
      ctx.fill()
    },
    // async httpData() {
    httpData() {
      if (!this.waveUrl) return
      const that = this
      $http({
        url: this.waveUrl,
        type: 'get',
        success(res) {
          that.wave = res.data
          that.createCanvas(that.wave)
        },
        error() {
          console.info('获取波形失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" module>
.waveWarp {
  width: 100%;
  position: relative;
  user-select: none;
  background: #181818;
  .canvasProgress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    overflow: hidden;
    background: rgba(255, 0, 0, 0.1);
    &.active {
      z-index: 5;
      border-right: 1px solid #d42a29;
      pointer-events: none;
    }
  }
}
</style>

