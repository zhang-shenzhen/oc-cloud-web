import {
  HttpGet,
  HttpPost
} from '../index'

const apis = {
  groupMessage: 'wechat/mass-send/list', // 群发消息列表
  saveMessage: 'wechat/mass-send/save', // 保存 群发消息
  sendMessage: 'wechat/mass-send/send', // 发送 群发消息
  detailMessage: 'wechat/mass-send/edit/', // 获取群发详情
  tagList: 'wechat/tag', // 标签接口

}
// 群发消息列表
export const GroupMessage = (params) => HttpGet(apis.groupMessage, params)
// 保存 群发消息
export const SaveMessage = params => HttpPost(apis.saveMessage, params)
// 发送 群发消息
export const SendMessage = params => HttpPost(apis.sendMessage, params)

export const DetailMessage = (params, id) => HttpGet(apis.detailMessage + id, params)
// 标签接口
export const TagList = (params) => HttpGet(apis.tagList, params)
