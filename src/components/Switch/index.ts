export const useSize = (
  size: 'small' | 'medium' | 'large'
): {
  _width: string
  _height: string
} => {
  const sizeEnum = {
    small: ['2rem', '1.125rem'],
    medium: ['2.5rem', '1.375rem'],
    large: ['3rem', '1.625rem']
  }
  return {
    _width: sizeEnum[size][0],
    _height: sizeEnum[size][1]
  }
}
