import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import configUrl from './configUrl'
import { cookieGet } from '@/common/cookie'
import { SSL_OP_NO_TLSv1_1 } from 'constants'
// 创建一个 axios 实例(接口)
console.log(configUrl.ajax_url)
const ajx = axios.create({
  // baseURL: 'https://stage.ocheng.me/api/',
  // baseURL: 'http://scrm.ocheng.me/v2/api/',
  // baseURL: '/api/',
  baseURL: process.env.NODE_ENV == 'scrm' ? configUrl.ajax_url : '/api/',
  timeout: 1000 * 180,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Channel': JSON.parse(cookieGet('Httpheader')).ChannelId,
    'X-Channel-Type': SSL_OP_NO_TLSv1_1,
    'Content-Security-Policy': 'upgrade-insecure-requests',
    'X-Security-Feign': true,
  },
})

let loading = null
// 需要加loading的接口
// console.log('当前aixos-所引用的configUrl', {
//   ...configUrl
// })

ajx.interceptors.request.use(
  (config) => {
    // 全局加loading,提交时加loading
    loading = Vue.prototype.$loading({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.6)',
    })

    return config
  },
  (error) => Promise.error(error)
)

ajx.interceptors.response.use(
  (res) => {
    if (res) {
      // 清除loading
      if (loading) {
        loading.close()
        loading = null
      }

      return res
    }
    return Promise.reject('接口报错')
  },
  (error) => {
    if (error) {
      // 清除loading
      if (loading) {
        loading.close()
        loading = null
      }
      if (error.response.data.code == 50101) {
        // 登录超时，跳回登录页
        localStorage.setItem('clearlogin', true)
        router.replace('/login')
      }

      let msg = '接口请求错误'
      if (error.response) {
        msg = error.response.data.message
      }
      Vue.prototype.$notify.error({
        title: '错误',
        message: msg,
      })
      // setTimeout(function(){
      //   router.replace('/login')
      // },1000)
      return Promise.reject(msg)
    }
    return null
  }
)

export function DIYHttpGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    ajx
      .get(url, {
        params,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function DIYHttpPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    ajx.post(url, data).then(
      (response) => {
        if (url == 'user/signin') {
          // /登录,把请求头返回
          resolve(response)
        } else {
          resolve(response.data)
        }
      },
      (err) => {
        reject(err)
      }
    )
  })
}

export function DIYHttpPatch(url, data = {}) {
  return new Promise((resolve, reject) => {
    ajx.patch(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

export function DIYHttpPut(url, data = {}) {
  return new Promise((resolve, reject) => {
    ajx.put(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
export function DIYHttpDelete(url, data = {}) {
  return new Promise((resolve, reject) => {
    ajx.delete(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
