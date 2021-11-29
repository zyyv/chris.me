export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const mouseHandler = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  useEventListener(window, 'mousemove', mouseHandler, { passive: true })

  return { x, y }
}
