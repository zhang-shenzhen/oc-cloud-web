import {
  HttpGet,
  HttpPost,
  HttpDelete,
  HttpPut
} from '../../index'

const apis = {
  deleteAdvImageText: 'wechat/material/news/advanced/',
  syncWechatMaterial_pic: 'surbanajurong/wechat/material/image/syncWechatMaterial/',//同步图片
  syncWechatMaterial_news:'surbanajurong/wechat/material/news/syncWechatMaterial/',//同步图文
  Image:'surbanajurong/wechat/material/image',//图片素材列表
  ImageHtml:'surbanajurong/wechat/material/news',//图文素材列表
  ImageGroup: 'surbanajurong/wechat/material/image/group',//图片分组
  advancedMaterialList: 'surbanajurong/wechat/material/advanced',//高级图文列表
  addAdvancedMessage:'surbanajurong/wechat/material/advanced',//新建、编辑高级图文
  detailsAdvancedMessage:'wechat/material/news/advanced',//新建、编辑高级图文
  groupMessage: 'surbanajurong/wechat/mass-send/list', // 群发消息列表
  saveMessage: 'surbanajurong/wechat/mass-send/save', // 保存 群发消息
  sendMessage: 'surbanajurong/wechat/mass-send/send', // 发送 群发消息
  detailMessage: 'surbanajurong/wechat/mass-send/edit/', // 获取群发详情
  getImgFile: 'wechat/material/news/', // 回顯圖文的接口
  tagList: 'wechat/tag', // 标签接口
}
// 素材列表
export const surbanajurong_materialList = (params) => HttpGet(apis.materialList, params)

// /同步素材,素材类型，图片（image）、视频（video）、语音 （voice）、图文（news）

//同步图片
export const surbanajurong_syncWechatMaterial_pic = (params) => HttpGet(apis.syncWechatMaterial_pic + params)
//同步图文
export const surbanajurong_syncWechatMaterial_news = (params) => HttpGet(apis.syncWechatMaterial_news + params)

// 图片素材列表
export const surbanajurong_Image = (params) => HttpGet(apis.Image, params)

// 图文素材列表
export const surbanajurong_ImageHtml = (params) => HttpGet(apis.ImageHtml, params)

// 回顯圖文的接口
export const surbanajurong_GetImgFile = (params) => HttpGet(apis.getImgFile + params.id)

// 获取分组
export const surbanajurong_ImageGroup = (params) => HttpGet(apis.ImageGroup, params)

// 新建分组
export const surbanajurong_AddGroup = (params) => HttpPost(apis.ImageGroup, params)

// 移动素材到分组
export const surbanajurong_removeImage = (params) => HttpPut(apis.Image, params)



// /高级图文
export const surbanajurong_advancedMaterialList = (params) => HttpGet(apis.advancedMaterialList, params)
//新建高级图文
export const surbanajurong_addAdvancedMessage = (params) => HttpPost(apis.addAdvancedMessage, params)
//查询高级图文
export const surbanajurong_AdvancedMessageDetail = (params) => HttpGet(apis.detailsAdvancedMessage + '/' + params.id)
//编辑高级图文
export const surbanajurong_updateAdvancedMessage = (params) => HttpPut(apis.addAdvancedMessage, params)
// 删除高级图文
export const surbanajurong_deleteImageText = (params) => HttpDelete(apis.deleteAdvImageText + params.id)


// 群发消息列表
export const surbanajurong_GroupMessage = (params) => HttpGet(apis.groupMessage, params)
// 保存 群发消息
export const surbanajurong_SaveMessage = params => HttpPost(apis.saveMessage, params)
// 发送 群发消息
export const surbanajurong_SendMessage = params => HttpPost(apis.sendMessage, params)

export const surbanajurong_DetailMessage = (params, id) => HttpGet(apis.detailMessage + id, params)
//标签
export const surbanajurong_TagList = (params) => HttpGet(apis.tagList, params)