// import request from '@/plugin/axios'
// import {
//   HttpGet
// } from '@api/index'

/**
 * @description [ sys ] 系统信息
 */
// export const sysInfoService = {
//   /**
//    * 获取系统信息
//    */
//   get() {
//     return request({
//       url: '/sys/info'
//     })
//   }
// }

// /**
//  * @description [ sys ] 菜单和路由相关
//  */
// export const sysMenuService = {
//   /**
//    * 获取菜单
//    */
//   getNav(data) {
//     return request({
//       url: '/user/role/' + data
//     })
//   },

//   /**
//    * 获取权限
//    */
//   getPermissions() {
//     return request({
//       url: '/sys/menu/permissions'
//     })
//   }
// }

// /**
//  * @description [ sys ] 用户相关
//  */
// export const sysUserService = {
//   /**
//    * 获取用户信息
//    */
//   getInfo() {
//     return request({
//       url: '/sys/user/info'
//     })
//   },
//   updatePassword(data) {
//     return request({
//       url: '/sys/user/password',
//       method: 'put',
//       data
//     })
//   }
// }
