import { HttpGet, HttpPost, HttpPut, HttpDelete } from '../index'
import { DIYHttpGet, DIYHttpPost, DIYHttpDelete, DIYHttpPut } from '../DIYAxios'
const apis = {
  triggerList: 'user/trigger', // 触发器列表
  createTrigger: 'user/trigger/', // 触发器创建/触发器详情
  modify: 'user/trigger/update/', // 触发器修改
  triggerEnable: 'user/trigger/enable/', // 触发器启用
  triggerDisable: 'user/trigger/disable/', // 触发器禁用
  triggerDelete: 'user/trigger/delete/', // 删除触发器
  getMenuList: 'wechat/menu/menu/list', // 菜单组列表
  getCode: 'wechat/qrcode/all', // 二维码列表
  orderStatus: 'order/gv/status', // 订单状态列表
  getFilter: 'user/filter', // 筛选器条件限制
  templatesTemplates: 'wechat/templates/messages', // 模板消息列表
  shortMessage: 'sms/tpl/trigger', // 短信列表
  cardMessage: 'marketing/coupon/front/list', // 发送卡券列表
  getTag: 'wechat/tag', // 获取标签列表
  code: 'wechat/qrcode/all', // 二维码
  intelligent: 'marketing/intelligent/event/all', // 自定义事件
  couponList: 'marketing/coupon/couponList',
}
// 触发器列表
export const triggerList = (params) => HttpGet(apis.triggerList, params)
// 触发器创建
export const CreateTrigger = (params) => HttpPost(apis.createTrigger, params)
// 触发器修改
export const Modify = (params) => HttpPost(apis.modify, params)
// 触发器详情
export const Details = (params, id) =>
  HttpGet(apis.createTrigger + id + '/', params)
// 触发器启用
export const TriggerEnable = (params, id) =>
  HttpPost(apis.triggerEnable + id + '/', params)
// 触发器禁用
export const TriggerDisable = (params, id) =>
  HttpPost(apis.triggerDisable + id + '/', params)
// 删除触发器
export const TriggerDelete = (params, id) =>
  HttpPost(apis.triggerDelete + id + '/', params)
// 菜单组列表
export const GetMenuList = (params) => HttpGet(apis.getMenuList, params)
// 二维码列表
export const GetCode = (params) => HttpGet(apis.getCode, params)
// 微信扫码
export const wxCode = (params) => HttpGet(apis.code, params)
// 订单状态列表
export const OrderStatus = (params) => HttpGet(apis.orderStatus, params)
// 筛选器条件限制
export const GetFilter = (params) => HttpGet(apis.getFilter, params)
// 模板消息列表
export const TemplatesTemplates = (params) =>
  HttpGet(apis.templatesTemplates, params)
// 短信列表
export const ShortMessage = (params) => HttpGet(apis.shortMessage, params)
// 发送卡券列表
export const CardMessage = (params) => HttpGet(apis.cardMessage, params)
// 获取标签列表
export const GetTag = (params) => HttpGet(apis.getTag, params)
// 自定义事件列表
export const intelligent = (params) => HttpGet(apis.intelligent, params)
// 卡券列表
export const couponList = (params) => DIYHttpPost(apis.couponList, params)
