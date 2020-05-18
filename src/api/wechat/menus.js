import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  menuList: 'wechat/menu', // 自定义菜单列表
  addMenu: 'wechat/menu', // 创建菜单
  menuRelease: 'wechat/menu/release', // 保存并发布菜单
  menuDetail: 'wechat/menu/version/', // 菜单详情
  updateTitle: 'wechat/menu/group/title', // 更新菜单组名称
  menuVersion: 'wechat/menu/version', // 查询版本列表
  groupRelease: 'wechat/menu/version', // 菜单组发布
  deleteVersion: 'wechat/menu/version', // 删除版本
  addTitle: 'wechat/menu/group', // 添加菜单组名称/修改菜单组状态
  tagNoPage: 'wechat/tag' // 标签
}
// 自定义菜单列表
export const GetMenuList = (params) => HttpGet(apis.menuList, params)
// 创建菜单
export const AddMenuUsb = (params) => HttpPost(apis.addMenu, params)
// 保存并发布菜单
export const MenuRelease = (params) => HttpPost(apis.menuRelease, params)
// 菜单详情
export const MenuDetail = (params) => HttpGet(apis.menuDetail + params.id)
// 更新菜单组名称
export const UpdateTitle = params => HttpPut(apis.updateTitle, params)
// 查询版本列表
export const MenuVersion = (params) => HttpGet(apis.menuVersion, params)
// 菜单组发布
export const GroupRelease = params => HttpPut(apis.groupRelease, params)
// 删除版本
export const DeleteVersion = (params) => HttpDelete(apis.deleteVersion + params)
// 添加菜单组名称
export const AddTitle = (params) => HttpPost(apis.addTitle, params)
// 修改菜单组状态
export const ChangeStatus = (params) => HttpPut(apis.addTitle, params)
// 标签
export const TagNoPage = (params) => HttpGet(apis.tagNoPage, params)
// 详情
export const Details = (params) => HttpGet(apis.menuVersion + '/' + params.id)

