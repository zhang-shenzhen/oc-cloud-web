import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

//  签到管理
const apis = {
  totalFanList: 'wechat/statistics/user', // 总粉丝参数接口
  cumulativeData: 'wechat/statistics/user/period', // 累计关注趋势接口
  fansData: 'wechat/statistics/user/subscibe', // 粉丝数据
  fansSex: 'wechat/statistics/user/gender', // 获取公众号粉丝性别人数
  fansLanguage: 'wechat/statistics/user/language', // 语言分布
  fansRegion: 'wechat/statistics/user/province', // 地区分布
  keyIndex: 'wechat/statistics/user', // 昨日关键指标接口
  fanGrowthChart: 'wechat/statistics/user/period', // 粉丝增长图表接口
  terminalDistribution: 'wechat/statistics/user/model', // 终端分布
  rangedData: 'wechat/statistics/user/terminal', // 机型分布
  graphicData: 'wechat/statistics/news/summary', // 图文数据分析列表
  graphicDetails: 'wechat/statistics/news/summary/detail' // 图文数据分析详情
}

// 总粉丝参数接口
export const TotalFanList = (params) => HttpGet(apis.totalFanList, params)
// 累计关注趋势接口
export const CumulativeDataInterface = (params) => HttpGet(apis.cumulativeData, params)
// 粉丝数据
export const FansDataList = (params) => HttpGet(apis.fansData, params)
// 获取公众号粉丝性别人数
export const FansSex = (params) => HttpGet(apis.fansSex, params)
// 语言分布
export const FansLanguage = (params) => HttpGet(apis.fansLanguage, params)
// 地区分布
export const FansRegion = (params) => HttpGet(apis.fansRegion, params)
// 昨日关键指标接口
export const KeyIndex = (params) => HttpGet(apis.keyIndex, params)
// 粉丝增长图表接口
export const FanGrowthChart = (params) => HttpGet(apis.fanGrowthChart, params)
// 终端分布
export const TerminalDistribution = (params) => HttpGet(apis.terminalDistribution, params)
// 机型分布
export const RangedData = (params) => HttpGet(apis.rangedData, params)
// 图文数据分析列表
export const GraphicData = (params) => HttpGet(apis.graphicData, params)
// 图文数据分析详情
export const graphicDetails = (params) => HttpGet(apis.graphicDetails, params)
