import {
  HttpGet,
  HttpPost,
  HttpDelete
} from '../index'

const apis = {
  publicStatistics: 'wechat/statistics/user', // 公众号信息统计Information
  publicNumber: 'wechat/official/' // 公众号信息
}
// 公众号信息统计
export const PublicStatistics = (params) => HttpGet(apis.publicStatistics, params)
// 公众号信息
export const PublicNumber = (params, id) => HttpGet(apis.publicNumber + id, params)
