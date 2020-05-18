import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../../index'

const apis = {
  menuList: 'surbanajurong/wechat/menu', // 自定义菜单列表
  addMenu: 'surbanajurong/wechat/menu', // 创建菜单
  menuRelease: 'surbanajurong/wechat/menu/release', // 保存并发布菜单
  menuDetail: 'surbanajurong/wechat/menu/version/', // 菜单详情
  updateTitle: 'surbanajurong/wechat/menu/group/title', // 更新菜单组名称
  menuVersion: 'surbanajurong/wechat/menu/version', // 查询版本列表
  groupRelease: 'surbanajurong/wechat/menu/version', // 菜单组发布
  deleteVersion: 'surbanajurong/wechat/menu/version', // 删除版本
  addTitle: 'surbanajurong/wechat/menu/group', // 添加菜单组名称/修改菜单组状态
  tagNoPage: 'wechat/tag', // 标签
}
// 自定义菜单列表
export const surbanajurong_GetMenuList = (params) => HttpGet(apis.menuList, params)
// 创建菜单
export const surbanajurong_AddMenuUsb = (params) => HttpPost(apis.addMenu, params)
// 保存并发布菜单
export const surbanajurong_MenuRelease = (params) => HttpPost(apis.menuRelease, params)
// 菜单详情
export const surbanajurong_MenuDetail = (params) => HttpGet(apis.menuDetail + params.id)
// 更新菜单组名称
export const surbanajurong_UpdateTitle = params => HttpPut(apis.updateTitle, params)
// 查询版本列表
export const surbanajurong_MenuVersion = (params) => HttpGet(apis.menuVersion, params)
// 菜单组发布
export const surbanajurong_GroupRelease = params => HttpPut(apis.groupRelease, params)
// 删除版本
export const surbanajurong_DeleteVersion = (params) => HttpDelete(apis.deleteVersion + params)
// 添加菜单组名称
export const surbanajurong_AddTitle = (params) => HttpPost(apis.addTitle, params)
// 修改菜单组状态
export const surbanajurong_ChangeStatus = (params) => HttpPut(apis.addTitle, params)
// 标签
export const surbanajurong_TagNoPage = (params) => HttpGet(apis.tagNoPage, params)
//详情
export const surbanajurong_Details = (params) => HttpGet(apis.menuVersion + '/' + params.id)