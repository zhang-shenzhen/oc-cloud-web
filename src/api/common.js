import {
  HttpGet,
  HttpPut,
  HttpPost
} from './index'

// 省市区
const apis = {
  upload: 'http://v2.ocheng.me/api/wechat/material', // 上传
  city: 'member/back/city/list/', // 省市区
  material: 'wechat/material', // 获取回复素材
  Advanced: 'wechat/material/news/advanced', // 高级图文
  getImgFile: 'wechat/material/news/', // 回顯圖文的接口

  signin: 'user/signin', // 登录
  channel: 'user/channel', // channel
  auth: 'wechat/component/auth/',
  role: 'user/role/', // 路由列表
  menuList: 'user/permission/role?roleId=', // 菜单
  changePassword: 'user/password' // 修改密码
}
export const getNav = (params) => HttpGet(apis.role + params)
// 菜单
export const getMenuList = (params) => HttpGet(apis.menuList + params + '&type=1')
// 按钮权限菜单
export const ButtonMenuList = (params) => HttpGet(apis.menuList + params + '&type=2')
// 上传
export const upload = params => HttpPost(apis.upload, params)
// 省市区
export const Getcity = (params, id) => HttpGet(apis.city + id, params)
// 获取回复素材
export const GetMaterial = (params) => HttpGet(apis.material, params)
// 高级图文
export const GetAdvanced = (params) => HttpGet(apis.Advanced, params)
// 回顯圖文的接口
export const GetImgFile = (params) => HttpGet(apis.getImgFile + params.id)

// 登录
export const signin = (params) => HttpPost(apis.signin, params)
// 修改密码
export const changePassword = (params) => HttpPut(apis.changePassword, params)
// channel
export const Getchannel = (params) => HttpGet(apis.channel, params)
// 授权
export const Addauth = (params, authType, authChannel) => HttpGet(apis.auth + authType + '/' + authChannel, params)