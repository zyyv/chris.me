import axios from 'axios'
import { Message } from 'element-ui'


const instance = axios.create({
  baseURL: '/api',
  timeout: 30000
})

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data && res.data.status === 200) {
      return Promise.resolve(res)
    } else {
      Message.error(res.data.msg)
      return Promise.reject(res)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message.warning('请先登录后操作')
          break
        case 403:
          Message.warning('登录过期，请重新登录')
          break
        case 404:
          Message.error('网络请求不存在')
          break
        case 500:
          Message.error('服务器内部错误')
          break
        default:
          Message.error(error.response.data.msg)
      }
    }
    return Promise.reject(error)
  }
)

export function getApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postApi(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(res => {
      resolve(res.data)
    }, err => { reject(err) })
  })
}