export function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI
}

export function getSqueeze(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
  const maxSqueeze = 0.15
  const accelerator = 750
  return Math.min(distance / accelerator, maxSqueeze)
}
