import axios from 'axios'
import {
  cookieGet
} from '@/common/cookie'

// import {
//   Message
// } from 'element-ui'
// import {
//   isPlainObject
// } from 'lodash'
// import qs from 'qs'
// import store from '@/store'

// // 记录和显示错误
// function errorLog (info) {
//   // 显示提示
//   Message({
//     message: info,
//     type: 'error',
//     duration: 5 * 1000
//   })
// }

// 创建一个 axios 实例(mock  数据)
const service = axios.create({
  // baseURL: process.env.VUE_APP_API,
  baseURL: '',
  timeout: 1000 * 180,
  withCredentials: true
})

service.interceptors.request.use(config => {
  config.headers[ 'Accept-Language' ] = cookieGet('language') || 'zh-CN'
  return config
},
error => Promise.error(error)
)

export default service
