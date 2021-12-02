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

export class TwoKeyMap<K1, K2, V> {
  _map = new Map<K1, Map<K2, V>>()

  get(key1: K1, key2: K2): V | undefined {
    const m2 = this._map.get(key1)
    if (m2)
      return m2.get(key2)
  }

  getFallback(key1: K1, key2: K2, fallback: V): V {
    let m2 = this._map.get(key1)
    if (!m2) {
      m2 = new Map<K2, V>()
      this._map.set(key1, m2)
    }
    if (!m2.has(key2))
      m2.set(key2, fallback)
    return m2.get(key2)!
  }

  set(key1: K1, key2: K2, value: V) {
    let m2 = this._map.get(key1)
    if (!m2) {
      m2 = new Map()
      this._map.set(key1, m2)
    }
    m2.set(key2, value)
    return this
  }

  has(key1: K1, key2: K2) {
    return this._map.get(key1)?.has(key2)
  }

  delete(key1: K1, key2: K2) {
    return this._map.get(key1)?.delete(key2) || false
  }

  deleteTop(key1: K1) {
    return this._map.delete(key1)
  }

  map<T>(fn: (v: V, k1: K1, k2: K2) => T): T[] {
    return Array.from(this._map.entries())
      .flatMap(([k1, m2]) =>
        Array.from(m2.entries())
          .map(([k2, v]) => {
            return fn(v, k1, k2)
          })
      )
  }
}

export class BetterMap<K, V> extends Map<K, V> {
  map<R>(mapFn: (value: V, key: K) => R): R[] {
    const result: R[] = []
    this.forEach((v, k) => {
      result.push(mapFn(v, k))
    })
    return result
  }
}

export function toArray<T>(value: T | T[] = []): T[] {
  return isArray(value) ? value : [value]
}

export function uniq<T>(value: T[]): T[] {
  return Array.from(new Set(value))
}

export function mergeSet<T>(target: Set<T>, append: Set<T>): Set<T> {
  append.forEach(i => target.add(i))
  return target
}
