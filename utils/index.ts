export function compressCode(code: string) {
  return code.replace(/\s+/g, ' ')
    .replace(/\s*\n\s*/g, '')
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
}
