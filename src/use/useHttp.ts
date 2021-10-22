import { http } from '@/utils'

export function useHttp() {
  const { $get, $delete, $post, $put } = http

  return { $get, $delete, $post, $put }
}
