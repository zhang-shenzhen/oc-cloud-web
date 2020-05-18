import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../../index'

const apis = {
  qrcodeList_old: 'wechat/qrcode',
  qrcodeList: 'surbanajurong/wechat/qrcode',
  enabled: 'surbanajurong/wechat/qrcode/enabled',
  getTag: 'wechat/tag',
  GetTrigger: 'user/trigger/',
  statistics: 'surbanajurong/wechat/statistics/qrcode'
}
// 渠道二维码列表
export const surbanajurong_QrcodeList = (params) => HttpGet(apis.qrcodeList, params)
// 禁用/启用二维码
export const surbanajurong_enabled = (params) => HttpPut(apis.enabled, params)
// /获取标签
export const surbanajurong_getTag = (params) => HttpGet(apis.getTag, params)
// 新增渠道二维码
export const surbanajurong_addQrcode = (params) => HttpPost(apis.qrcodeList, params)
// /通过id查详情
export const surbanajurong_QrcodeDetails = (params) => HttpGet(apis.qrcodeList_old + '/' + params.id)
// /触发器查详情
export const surbanajurong_GetTrigger = (params) => HttpGet(apis.GetTrigger + params.id + '/')
// /编辑渠道二维码
export const surbanajurong_UpdateQrcode = (params) => HttpPut(apis.qrcodeList, params)

// /二维码统计
export const surbanajurong_Statistics = (params) => HttpGet(apis.statistics, params)

