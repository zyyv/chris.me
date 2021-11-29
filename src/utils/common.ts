import { DeepPartial } from '@/types'

export const isDef = (val: any) => val !== undefined && val !== null

export const isNumeric = (val: any) => /^\d+(\.\d+)?$/.test(val)

export const addUnit = (val: any) => {
  if (!isDef(val))
    return undefined

  val = String(val)
  return isNumeric(val) ? `${val}px` : val
}

export const inBrowser = typeof window !== 'undefined'

export const NOOP = () => {}

export const isArray = Array.isArray

export const isObject = (item: any): item is Record<string, any> => {
  return (item && typeof item === 'object' && !isArray(item))
}

export const cloneDeep: any = (value: any) => {
  if (isArray(value))
    return value.map(child => cloneDeep(child))

  if (typeof value === 'object' && value !== null)
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cloneDeep(v)]))

  return value
}

export const cloneNodes = (nodes: any[], source: any) => {
  return nodes.map((node) => {
    const cloned = node.clone()

    if (source !== undefined)
      cloned.source = source

    return cloned
  })
}

export const mergeDeep = <T>(original: T, patch: DeepPartial<T>): T => {
  const o = original as any
  const p = patch as any

  if (isArray(o) && isArray(p))
    return [...o, ...p] as any

  if (isArray(o))
    return [...o] as any

  const output = { ...o }
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (isObject(p[key])) {
        if (!(key in o))
          Object.assign(output, { [key]: p[key] })
        else
          output[key] = mergeDeep(o[key], p[key])
      }
      else {
        Object.assign(output, { [key]: p[key] })
      }
    })
  }
  return output
}
