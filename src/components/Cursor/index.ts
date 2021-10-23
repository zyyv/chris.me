import { ICursorStyle } from '@/types'
import { getAngle, getSqueeze } from '@/utils'
import { useMouse, useEventListener } from '@vueuse/core'
import { reactive, ref, toRef, unref, watchEffect, nextTick } from 'vue'

// 更新圆圈样式
export function useCursor(style: ICursorStyle) {
  const mouse = useMouse() // mouse pointer's coordinates
  const pos = { x: 0, y: 0 } // cursor's coordinates
  const speed = 0.1 // between 0 and 1

  const updateCursor = () => {
    const diffX = Math.round(unref(mouse.x) - pos.x)
    const diffY = Math.round(unref(mouse.y) - pos.y)

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
}

// 更新圆点
export function useDot(style: ICursorStyle) {
  const dotState = reactive({
    visible: true,
    enlarged: false,
    dotRef: ref<HTMLElement>()
  })

  const toggleDotSize = () => {
    const scale = dotState.enlarged ? '1.8' : '1'
    style.dot = {
      ...style.dot,
      transform: `translate(-50%, -50%) scale(${scale})`
    }
  }
  const toggleDotVisibility = () => {
    const opacity = dotState.visible ? '1' : '0'
    style.dot = {
      ...style.dot,
      opacity
    }
  }

  watchEffect(toggleDotSize) // update dot size
  watchEffect(toggleDotVisibility) // update dot opacity

  useEventListener(document, 'mousemove', (e) => {
    dotState.visible = true
    style.dot = { top: `${e.clientY}px`, left: `${e.clientX}px` }
  })
  useEventListener(document, 'mouseenter', () => {
    dotState.visible = true
  })
  useEventListener(document, 'mouseleave', () => {
    dotState.visible = false
  })
  useEventListener(document, 'mousedown', () => {
    dotState.enlarged = true
  })
  useEventListener(document, 'mouseup', () => {
    dotState.enlarged = false
  })
  
  nextTick(() => {
    document.querySelectorAll('a').forEach(function (el) {
      useEventListener(el, 'mouseover', () => {
        dotState.enlarged = true
      })
      useEventListener(el, 'mouseout', () => {
        dotState.enlarged = false
      })
    })
  })

  return { dotRef: toRef(dotState, 'dotRef') }
}
