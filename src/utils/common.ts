export const isDef = (val: any) => val !== undefined && val !== null

export const isNumeric = (val: any) => /^\d+(\.\d+)?$/.test(val)

export const addUnit = (val: any) => {
  if (!isDef(val))
    return undefined

  val = String(val)
  return isNumeric(val) ? `${val}px` : val
}

export const inBrowser = typeof window !== 'undefined'

export const cloneDeep: any = (value: any) => {
  if (Array.isArray(value))
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
