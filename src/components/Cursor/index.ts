import { ICursorStyle } from '@/types'
import { useMouse } from '@/use'
import { getAngle, getSqueeze } from '@/utils'
import { useEventListener, useRafFn } from '@vueuse/core'
import { reactive, ref, toRef, unref, nextTick, watch } from 'vue'

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

  useRafFn(updateCursor)
}

// 更新圆点
export function useDot(style: ICursorStyle) {
  const dotState = reactive({
    visible: true,
    enlarged: false,
    dotRef: ref<HTMLElement>()
  })

  const toggleDotSize = (newStatus: boolean) => {
    const scale = newStatus ? '1.8' : '1'
    const opacity = newStatus ? '0.5' : '1'
    style.dot = {
      ...style.dot,
      opacity,
      transform: `translate(-50%, -50%) scale(${scale})`
    }
  }
  const toggleDotVisibility = (newStatus: boolean) => {
    const opacity = newStatus ? '1' : '0'
    style.dot = {
      ...style.dot,
      opacity
    }
  }

  watch(() => dotState.enlarged, toggleDotSize) // update dot size
  watch(() => dotState.visible, toggleDotVisibility, { immediate: true }) // update dot opacity

  useEventListener(document, 'mousemove', (e) => {
    dotState.visible = true
    style.dot = { ...style.dot, top: `${e.clientY}px`, left: `${e.clientX}px` }
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
