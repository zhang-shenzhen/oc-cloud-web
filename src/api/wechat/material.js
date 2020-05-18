import {
  HttpGet,
  HttpPost,
  HttpDelete,
  HttpPut
} from '../index'

const apis = {
  Image: 'wechat/material', //图片素材列表
  ImageHtml: 'wechat/material', //图文素材列表
  getImgFile: 'wechat/material/news/', // 回顯圖文的接口
  deleteImageText: 'wechat/material/news/advanced',
  syncWechatMaterial_pic: 'wechat/material/syncWechatMaterial/image/',
  syncWechatMaterial_news: 'wechat/material/syncWechatMaterial/news/',
  advancedMaterialList: 'wechat/material/news/advanced',
  ImageGroup: 'wechat/material/group',
  addAdvancedMessage: 'wechat/material/news/advanced',
}
// 图片素材列表
export const Image = (params) => HttpGet(apis.Image, params)

// 图文素材列表
export const ImageHtml = (params) => HttpGet(apis.ImageHtml, params)

// 删除图文
export const deleteImageText = (params) => HttpDelete(apis.deleteImageText + '/' + params.id)
// /同步素材,素材类型，图片（image）、视频（video）、语音 （voice）、图文（news）

///同步图片
export const syncWechatMaterial_pic = (params) => HttpGet(apis.syncWechatMaterial_pic + params.startTime + '/' + params.endTime)

///同步图文
export const syncWechatMaterial_news = (params) => HttpGet(apis.syncWechatMaterial_news + params.startTime + '/' + params.endTime)

// /高级图文
export const advancedMaterialList = (params) => HttpGet(apis.advancedMaterialList, params)
// 获取分组
export const ImageGroup = (params) => HttpGet(apis.ImageGroup, params)

// 移动素材到分组
export const removeImage = (params) => HttpPut(apis.Image, params)

// 新建分组
export const AddGroup = (params) => HttpPost(apis.ImageGroup, params)
//新建高级图文
export const addAdvancedMessage = (params) => HttpPost(apis.addAdvancedMessage, params)
//查询高级图文
export const AdvancedMessageDetail = (params) => HttpGet(apis.addAdvancedMessage + '/' + params.id)
//编辑高级图文
export const updateAdvancedMessage = (params) => HttpPut(apis.addAdvancedMessage, params)

// 回顯圖文的接口
export const GetImgFile = (params) => HttpGet(apis.getImgFile + params.id)