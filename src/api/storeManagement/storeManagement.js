import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  StoreList: 'user/stores', // 门店列表
  Changestate: 'user/stores/state', // 门店状态
  storesTypes: 'user/stores/types', // 门店类型
  clerkList: 'user/store/clerk/select', // 员工列表
  addClerk: 'user/store/clerk/insert', // 添加员工
  deleteClerk: 'user/store/clerk/delete', // 删除员工
  ClerkInfo: 'user/store/clerk/selectId', // 员工详情
  updateClerk: 'user/store/clerk/update', // 员工修改
  commentList: 'user/store/comment/select', // 评论查询
  commentPublish: 'user/store/comment/update', // 发布评论
  deleteComment: 'user/store/comment/delete', // 删除评论
  commentPublishs: 'user/store/comment/updateList', // 批量发布评论
  deleteComments: 'user/store/comment/deleteList', // 批量删除评论
  subscribeList: 'user/subscribe/select', // 预约列表
  updateSubscribe: 'user/subscribe/update', // 修改预约状态
  levelList: 'user/stores/level/list', // 层级列表
  levelUpdate: 'user/stores/level/update/level', // 门店层级更新
  addLevel: 'user/stores/level/insert/level', // 添加门店层级
  deleteLevel: 'user/stores/level/delete/level', // 删除门店层级
  clerkExcle: 'user/store/clerk/excle/make' // 员工数据导出
}
// 门店列表
export const StoreList = (params) => HttpGet(apis.StoreList, params)
// 门店状态切换
export const Changestate = (params) => HttpPut(apis.Changestate, params)
// 门店类型
export const storesTypes = (params) => HttpGet(apis.storesTypes, params)
// 门店详情
export const StoreInfo = (params) => HttpGet(apis.StoreList + '/' + params)
// 添加门店
export const addStore = (params) => HttpPost(apis.StoreList, params)
// 修改门店
export const updateStore = (params) => HttpPut(apis.StoreList, params)
// 删除门店
export const deleteStore = (params) => HttpDelete(apis.StoreList + '/' + params)
// 员工列表
export const clerkList = (params) => HttpGet(apis.clerkList, params)
// 新增员工
export const addClerk = (params) => HttpPost(apis.addClerk, params)
// 删除店员
export const deleteClerk = (params) => HttpPut(apis.deleteClerk + params)
// 店员详情
export const ClerkInfo = (params) => HttpGet(apis.ClerkInfo + params)
// 修改门店
export const updateClerk = (params) => HttpPut(apis.updateClerk, params)
// 评论列表
export const commentList = (params) => HttpGet(apis.commentList, params)
// 评论发布
export const commentPublish = (params) => HttpPut(apis.commentPublish, params)
// 删除评论
export const deleteComment = (params) => HttpPut(apis.deleteComment + params)
// 批量发布
export const commentPublishs = (id, params) => HttpPut(apis.commentPublishs + id, params)
// 批量删除
export const deleteComments = (params) => HttpPut(apis.deleteComments, params)
// 预约列表
export const subscribeList = (params) => HttpGet(apis.subscribeList, params)
// 修改预约
export const updateSubscribe = (params) => HttpPut(apis.updateSubscribe, params)
// 门店层级列表
export const levelList = (params) => HttpGet(apis.levelList, params)
// 门店层级更新
export const levelUpdate = (params) => HttpPut(apis.levelUpdate, params)
// 门店层级添加
export const addLevel = (params) => HttpPost(apis.addLevel, params)
// 门店层级删除
export const deleteLevel = (params) => HttpPut(apis.deleteLevel + params)
// 员工数据导出
export const clerkExcle = (params) => HttpGet(apis.clerkExcle, params)
