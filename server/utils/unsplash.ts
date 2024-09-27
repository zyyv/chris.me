import fetch from 'node-fetch'
import { createApi } from 'unsplash-js'

let _unsplash: ReturnType<typeof createApi> | null = null

export function useUnsplash() {
  if (!_unsplash) {
    _unsplash = createApi({
      accessKey: process.env.Unsplash_Access_Key as string,
      fetch: fetch as any,
    })
  }

  return _unsplash
}
