import {
  HttpGet,
  HttpPost,
  HttpDelete
} from '../index'

const apis = {
  defaultReply: 'user/trigger/query/', // 默认回复列表接口/关注后回复列表
  tagList: 'wechat/tag', // 标签接口
  delReply: 'user/trigger/delete/', // 删除消息
  enablingMessage: 'user/trigger/enable/', // 启用消息
  disableMessage: 'user/trigger/disable/', // 禁用消息
  detailsMessage: 'user/trigger/', // 消息详情id
  reply: 'user/trigger/', // 创建默认回复
  replyUpdate: 'user/trigger/update/' // 编辑回复 (默认 关注 关键字)
}
// 默认回复列表接口
export const DefaultReplyData = (params) => HttpGet(apis.defaultReply + 'default', params)
// 关注后回复列表
export const FocusReplyData = (params) => HttpGet(apis.defaultReply + 'focus', params)
// 关键字回复列表
export const KeyWordReplyData = (params) => HttpGet(apis.defaultReply + 'keyword', params)
// 标签接口
export const TagList = (params) => HttpGet(apis.tagList, params)
// 删除消息
export const DelReply = (params, id) => HttpPost(apis.delReply + params)
// 启用消息
export const EnablingMessage = (params, id) => HttpPost(apis.enablingMessage + params)
// 禁用消息
export const DisableMessage = (params, id) => HttpPost(apis.disableMessage +  params)
// 消息详情id
export const DetailsMessage = (params, id) => HttpGet(apis.detailsMessage + id + '/', params)
// 创建默认回复
export const DefaultReply = (params) => HttpPost(apis.reply, params)
// 创建关注回复
export const  FocusReply = (params) => HttpPost(apis.reply, params)
// 编辑回复 (默认 关注 关键字)
export const ReplyUpdate = (params) => HttpPost(apis.replyUpdate, params)
