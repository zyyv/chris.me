export const isDef = (val: any) => val !== undefined && val !== null

export const isNumeric = (val: any) => /^\d+(\.\d+)?$/.test(val)

export const addUnit = (val: any) => {
  if (!isDef(val)) {
    return undefined
  }
  val = String(val)
  return isNumeric(val) ? val + 'px' : val
}

export const inBrowser = typeof window !== 'undefined'
