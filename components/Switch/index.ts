import type { MaybeRef } from '@vueuse/core'

export interface SwitchProps {
  size?: 'mini' | 'medium' | 'large'
  value?: MaybeRef<boolean>
  disabled?: boolean
  activeIcon?: string
  inactiveIcon?: string
  width?: string
  height?: string
}

export interface SwitchEvents {
  (event: 'update:value', status: boolean): void
  (event: 'change', status: boolean): void
}

/**
 * get the size of the switch
 * @param size mini, medium, large  |  default: mini
 * @param w width class of the switch  |  w-2xl
 * @param h height class of the switch  |  h-2xl
 * @returns [width, height]
 */
export function initSize(size: 'mini' | 'medium' | 'large' = 'mini', w?: string, h?: string): [string, string] {
  const sizes = {
    small: ['2rem', '1.125rem'],
    medium: ['2.5rem', '1.375rem'],
    large: ['3rem', '1.625rem'],
  }
  return [w ?? sizes[size][0], h ?? sizes[size][1]]
}

export default {}

// const props = withDefaults(
//   defineProps<{
//     size?: 'small' | 'medium' | 'large'
//     value: MaybeRef<boolean> | WritableComputedRef<boolean>
//     disabled?: boolean
//     bgColor?: string
//     bgActiveColor?: string
//     width?: string
//     height?: string
//   }>(),
//   {
//     disabled: false,
//     bgColor: 'rgba(0, 0, 0, 0.14)',
//     bgActiveColor: '#60bc95',
//   },
// )
