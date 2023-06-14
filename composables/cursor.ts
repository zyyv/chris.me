import { useStorage } from '@vueuse/core'
import type { ICursorStyle } from '~/types'

function useCustomMouse() {
  const pos = useStorage('dotPos', { x: 0, y: 0 })
  const x = ref(pos.value.x)
  const y = ref(pos.value.y)

  const mouseHandler = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  if (process.client)
    useEventListener(window, 'mousemove', mouseHandler, { passive: true })

  return { x, y }
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI
}

function getSqueeze(diffX: number, diffY: number) {
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2)
  const maxSqueeze = 0.15
  const accelerator = 750
  return Math.min(distance / accelerator, maxSqueeze)
}

// 更新圆圈样式
export function useCursor(style: ICursorStyle) {
  const mouse = useCustomMouse() // mouse pointer's coordinates
  const pos = { x: 0, y: 0 } // cursor's coordinates
  const speed = 0.1 // between 0 and 1

  const updateCursor = () => {
    const diffX = Math.round(unref(mouse.x) - pos.x)
    const diffY = Math.round(unref(mouse.y) - pos.y)

    pos.x += diffX * speed
    pos.y += diffY * speed

    const angle = getAngle(diffX, diffY)
    const squeeze = getSqueeze(diffX, diffY)

    const scale = `scale(${1 + squeeze}, ${1 - squeeze})`
    const rotate = `rotate(${angle}deg)`
    const translate = `translate3d(${pos.x}px ,${pos.y}px, 0)`

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
    dotRef: ref<HTMLElement>(),
  })

  const toggleDotSize = (newStatus: boolean) => {
    const scale = newStatus ? '1.8' : '1'
    const opacity = newStatus ? '0.5' : '1'

    style.dot = {
      ...style.dot,
      '--un-bg-opacity': opacity,
      'transform': `translate(-50%, -50%) scale(${scale})`,
    }
  }
  const toggleDotVisibility = (newStatus: boolean) => {
    const opacity = newStatus ? '1' : '0'
    style.dot = {
      ...style.dot,
      opacity,
    }
  }
  const domListener = () => {
    if (process.client) {
      [
        ...Array.from(document.querySelectorAll('a')),
        ...Array.from(document.querySelectorAll('button')),
      ].forEach((el) => {
        useEventListener(el, 'mouseover', () => {
          dotState.enlarged = true
        })
        useEventListener(el, 'mouseout', () => {
          dotState.enlarged = false
        })
      })
    }
  }

  watch(() => dotState.enlarged, toggleDotSize, { flush: 'post' }) // update dot size
  watch(() => dotState.visible, toggleDotVisibility, { immediate: true, flush: 'post' }) // update dot opacity

  if (process.client) {
    const pos = useStorage('dotPos', { x: 0, y: 0 })

    useEventListener(document, 'mousemove', (e) => {
      dotState.visible = true
      pos.value.x = e.clientX
      pos.value.y = e.clientY
      style.dot = { ...style.dot, top: `${pos.value.y}px`, left: `${pos.value.x}px` }
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
  }

  nextTick(domListener)

  return { dotRef: toRef(dotState, 'dotRef'), domListener }
}
