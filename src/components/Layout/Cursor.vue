<template>
  <div class="dot" :ref="cursorDot.$dot" :style="style.dot"></div>
  <div id="cursor" :style="style.cursor">
    <div class="circle" :style="style.circle"></div>
  </div>
</template>

<script lang="ts" setup>
import { getAngle, getSqueeze } from '@/utils'
import { ref, reactive } from 'vue'

const style = reactive({
  dot: {},
  cursor: {},
  circle: {}
})

const mouse = { x: -100, y: -100 } // mouse pointer's coordinates
const pos = { x: 0, y: 0 } // cursor's coordinates
const speed = 0.1 // between 0 and 1

const updateCoordinates = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

window.addEventListener('mousemove', updateCoordinates)

// 坐标
function useCoordinates() {}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x)
  const diffY = Math.round(mouse.y - pos.y)

  pos.x += diffX * speed
  pos.y += diffY * speed

  const angle = getAngle(diffX, diffY)
  const squeeze = getSqueeze(diffX, diffY)

  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')'
  const rotate = 'rotate(' + angle + 'deg)'
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)'

  style.cursor = { ...style.cursor, transform: translate }
  style.circle = { ...style.circle, transform: rotate + scale }
}

const loop = () => {
  updateCursor()
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

const cursorDot = {
  endX: window.innerWidth / 2,
  endY: window.innerHeight / 2,
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: ref<HTMLElement>(),

  init: function () {
    this.setupEventListeners()
  },

  setupEventListeners: function () {
    var self = this

    document.querySelectorAll('a').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        self.cursorEnlarged = true
        self.toggleCursorSize()
      })
      el.addEventListener('mouseout', function () {
        self.cursorEnlarged = false
        self.toggleCursorSize()
      })
    })

    document.addEventListener('mousedown', function () {
      self.cursorEnlarged = true
      self.toggleCursorSize()
    })
    document.addEventListener('mouseup', function () {
      self.cursorEnlarged = false
      self.toggleCursorSize()
    })

    document.addEventListener('mousemove', function (e) {
      self.cursorVisible = true
      self.toggleCursorVisibility()

      self.endX = e.clientX
      self.endY = e.clientY
      if (self.$dot.value) {
        self.$dot.value.style.top = self.endY + 'px'
        self.$dot.value.style.left = self.endX + 'px'
      }
    })

    document.addEventListener('mouseenter', function (e) {
      self.cursorVisible = true
      self.toggleCursorVisibility()
      if (self.$dot.value) {
        self.$dot.value.style.opacity = '1'
      }
    })

    document.addEventListener('mouseleave', function (e) {
      self.cursorVisible = true
      self.toggleCursorVisibility()
      if (self.$dot.value) {
        self.$dot.value.style.opacity = '0'
      }
    })
  },

  toggleCursorSize: function () {
    var self = this
    if (self.$dot.value) {
      if (self.cursorEnlarged) {
        self.$dot.value.style.transform = 'translate(-50%, -50%) scale(1.8)'
      } else {
        self.$dot.value.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }
  },

  toggleCursorVisibility: function () {
    var self = this
    if (self.$dot.value) {
      if (self.cursorVisible) {
        self.$dot.value.style.opacity = '1'
      } else {
        self.$dot.value.style.opacity = '0'
      }
    }
  }
}
cursorDot.init()

//asd
</script>
<style lang="scss" scoped>
#cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  will-change: transform;
  z-index: 99999999;
}

.dot {
  mix-blend-mode: normal;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  opacity: 0;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: opacity 0.3s ease-in-out,
    -webkit-transform 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    -webkit-transform 0.3s ease-in-out;
}

.dot {
  z-index: 99999999;
  width: 9px;
  height: 9px;
  background-color: #adbac7;
  border: solid;
  border-radius: 50%;
  border-width: 0px;
  border-color: #000;
}
.circle {
  width: 64px;
  height: 64px;
  margin-top: -50%;
  margin-left: -50%;
  border-radius: 50%;
  border: solid 1px #adbac7;
  transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
