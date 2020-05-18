import request from '@/plugin/axios'

export function getUserList() {
  return request({
    url: '/member/userList'
  })
}
export function getlabelList() {
  return request({
    url: '/member/labelList'
  })
}
