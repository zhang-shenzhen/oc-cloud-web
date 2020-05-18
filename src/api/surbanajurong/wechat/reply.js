import {
  HttpGet,
  HttpPost,
  HttpDelete
} from '../../index'

const apis = {

  detailsMessage: 'user/trigger/', // 消息详情id


  default:'surbanajurong/wechat/reply/default',//默认回复
  updateDefault:'surbanajurong/wechat/reply/default/update/',//修改默认回复
  enableDefault:'surbanajurong/wechat/reply/default/enable/',//启用
  disableDefault:'surbanajurong/wechat/reply/default/disable/',//禁用
  deleteDefault:'surbanajurong/wechat/reply/default/delete/',//删除

  focus:'surbanajurong/wechat/reply/focus',//关注回复
  updateFocus:'surbanajurong/wechat/reply/focus/update/',//修改关注回复
  enableFocus:'surbanajurong/wechat/reply/focus/enable/',//启用
  disableFocus:'surbanajurong/wechat/reply/focus/disable/',//禁用
  deleteFocus:'surbanajurong/wechat/reply/focus/delete/',//删除


  keyword:'surbanajurong/wechat/reply/keyword',//关键字回复
  updateKeyWord:'surbanajurong/wechat/reply/keyword/update/',//修改关键字回复
  disableKeyWord:'surbanajurong/wechat/reply/keyword/disable/',//启用
  enableKeyWord:'surbanajurong/wechat/reply/keyword/enable/',//禁用
  deleteKeyWord:'surbanajurong/wechat/reply/keyword/delete/',//删除
  
  tagList: 'wechat/tag', // 标签接口

}
// 默认回复列表接口
export const surbanajurong_DefaultReplyData = (params) => HttpGet(apis.default, params)
// 创建默认回复
export const surbanajurong_DefaultReply = (params) => HttpPost(apis.default, params)
// 修改默认回复
export const surbanajurong_defaultUpdate = (params) => HttpPost(apis.updateDefault, params)
// 禁用默认回复
export const surbanajurong_disableDefault = (params) => HttpPost(apis.disableDefault +  params )
// 启用默认回复
export const surbanajurong_enableDefault = (params) => HttpPost(apis.enableDefault +  params)
// 启用默认回复
export const surbanajurong_deleteDefault = (params) => HttpPost(apis.deleteDefault +  params)



// 关注后回复列表
export const surbanajurong_FocusReplyData = (params) => HttpGet(apis.focus , params)
// 创建关注后回复
export const surbanajurong_FocusReply = (params) => HttpPost(apis.focus, params)
// 修改关注后回复
export const surbanajurong_FocusUpdate = (params) => HttpPost(apis.updateFocus, params)
// 禁用关注后回复
export const surbanajurong_disableFocus = (params) => HttpPost(apis.disableFocus +  params )
// 启用关注后回复
export const surbanajurong_enableDFocus = (params) => HttpPost(apis.enableFocus +  params)
// 删除关注后回复
export const surbanajurong_deleteFocus = (params) => HttpPost(apis.deleteFocus +  params)



// 关键字回复列表
export const surbanajurong_KeyWordReplyData = (params) => HttpGet(apis.keyword, params)
// 创建关键字回复
export const surbanajurong_KeyWordReply = (params) => HttpPost(apis.keyword, params)
// 修改关键字回复
export const surbanajurong_KeyWordUpdate = (params) => HttpPost(apis.updateKeyWord, params)
// 禁用关键字回复
export const surbanajurong_disableKeyWord = (params) => HttpPost(apis.disableKeyWord +  params )
// 启用关键字回复
export const surbanajurong_enableKeyWord = (params) => HttpPost(apis.enableKeyWord +  params)
// 删除关键字回复
export const surbanajurong_deleteKeyWord = (params) => HttpPost(apis.deleteKeyWord +  params)


// 消息详情id
export const surbanajurong_DetailsMessage = (params, id) => HttpGet(apis.detailsMessage + id + '/', params)
// 标签接口
export const surbanajurong_TagList = (params) => HttpGet(apis.tagList, params)

