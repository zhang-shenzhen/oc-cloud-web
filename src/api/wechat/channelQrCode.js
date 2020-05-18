import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  qrcodeList: 'wechat/qrcode',
  enabled: 'wechat/qrcode/enabled',
  getTag: 'wechat/tag',
  GetTrigger: 'user/trigger/',
  statistics: 'wechat/statistics/qrcode'
}
// 渠道二维码列表
export const QrcodeList = (params) => HttpGet(apis.qrcodeList, params)
// 禁用/启用二维码
export const enabled = (params) => HttpPut(apis.enabled, params)
// /获取标签
export const getTag = (params) => HttpGet(apis.getTag, params)
// 新增渠道二维码
export const addQrcode = (params) => HttpPost(apis.qrcodeList, params)
// /通过id查详情
export const QrcodeDetails = (params) => HttpGet(apis.qrcodeList + '/' + params.id)
// /触发器查详情
export const GetTrigger = (params) => HttpGet(apis.GetTrigger + params.id + '/')
// /编辑渠道二维码
export const UpdateQrcode = (params) => HttpPut(apis.qrcodeList, params)

// /二维码统计
export const Statistics = (params) => HttpGet(apis.statistics, params)

