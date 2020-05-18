// console.log(process.env)
const configUrl = {
  showFile: '', // 展示文件路径
  channelId: null,
  webUrl: null,
  export: null
}
let webUrl = null
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'v2') {
  // v2环境
  webUrl = 'https://v2.ocheng.me'
  // 图片显示路径
  configUrl.showFile = 'https://v2.ocheng.me/storage/'
} else if (process.env.NODE_ENV == 'stage') {
  webUrl = 'https://stage.ocheng.me'
  // 图片显示路径
  configUrl.showFile = 'https://v2.ocheng.me/storage/'
} else if (process.env.NODE_ENV == 'scrm') {
  webUrl = 'https://scrm.ocheng.me/v2'
  // 图片显示路径
  configUrl.showFile = 'https://scrm.ocheng.me/storage/'
}
configUrl.webUrl = webUrl
configUrl.channelId = 3
configUrl.upload = webUrl + '/api/storage/form/upload/single' // 普通上传地址
configUrl.material_upload = webUrl + '/api/wechat/material' // 微信素材相关上传图片路径
configUrl.coupon_upload = webUrl + '/api/wechat/coupon/uploadImg' // 微信卡券相关上传图片路径
configUrl.ajax_url = webUrl + '/api/' // 接口路径
// configUrl.CheckGate = '/h5/grand-vision/signin.html?cId=66&id=' // 网页地址
configUrl.CheckGate = '/h5/signin.html?cId=66&id=' // 网页地址

export default configUrl
