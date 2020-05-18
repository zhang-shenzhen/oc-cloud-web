import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
import {
  formatDate
} from '@/utils/index'

// 抽奖管理
const apis = {
  lottery: '/marketing/lottery/', // 抽奖管理
  startLottery: '/marketing/lottery/start/', // 开始抽奖
  stopLottery: '/marketing/lottery/stop/', // 暂停抽奖管理
  deleteLottery: '/marketing/lottery/delete/', // 删除抽奖
  recordLottery: '/marketing/lottery/prize/record', // 获取中奖列表
  getLottery: '/marketing/lottery/', // 获取中奖列表
  createLottery: '/marketing/lottery/create', // 新建 抽奖活动
  modify: '/marketing/lottery/modify', // 更新抽奖活动
  copyLottery: '/marketing/lottery/copy/', // 复制抽奖活动
  export: '/marketing/lottery/export', // 导出数据
  cardList: 'marketing/coupon/front/page', // 获取卡券列表
  exportData: 'marketing/lottery/export' // 导出抽奖数据
}

// 抽奖管理
export const lotterys = (params) => HttpGet(apis.lottery, params).then(res => {
  res = res.data
  res.data.map(d => {
    d.endTime = formatDate(new Date(d.endTime), 'yyyy-MM-dd hh:mm:ss')
    d.startTime = formatDate(new Date(d.startTime), 'yyyy-MM-dd hh:mm:ss')
  })
  return res
})
// 根据ID获取活动
export const getLottery = (params) => HttpGet(apis.getLottery + params.id).then(res => {
  res = res.data
  res.startTime = formatDate(new Date(res.startTime), 'yyyy-MM-dd hh:mm:ss')
  res.endTime = formatDate(new Date(res.endTime), 'yyyy-MM-dd hh:mm:ss')

  // 初始化 activity_setting
  // res.activity_setting = {
  //   date:[res.startTime,res.endTime],
  //   lotteryTimesOneDay:res.lotteryTimesOneDay,
  //   name:res.name,
  //   maxLotteryTimes:res.maxLotteryTimes,
  //   personLotteryTimes:res.personLotteryTimes
  // }
  // 初始化 res.prizeRules 概率相关
  res.prizeRules.map(d => {
    d.startTime = formatDate(new Date(res.startTime), 'yyyy-MM-dd hh:mm:ss')
    d.endTime = formatDate(new Date(res.endTime), 'yyyy-MM-dd hh:mm:ss')
  })
  res.date = [res.startTime, res.endTime]
  // res.Probability_setting = res.prizeRules
  return res
})

// 开始抽奖
export const startLottery = (params) => HttpGet(apis.startLottery + params.id).then(res => {
  res = res.data
  return res
})

// 暂停抽奖管理
export const stopLottery = (params) => HttpGet(apis.stopLottery + params.id).then(res => {
  res = res.data
  return res
})

// 删除抽奖
export const deleteLottery = (params) => HttpGet(apis.deleteLottery + params.id).then(res => {
  res = res.data
  return res
})
// 获取中奖列表
export const recordLottery = (params) => HttpGet(apis.recordLottery, params).then(res => {
  res = res.data
  return res
})

// 新建 抽奖活动
export const createLottery = (params) => HttpPost(apis.createLottery, params).then(res => {
  res = res.data
  return res
})

// 更新 抽奖活动
export const modify = (params) => HttpPost(apis.modify, params).then(res => {
  res = res.data
  return res
})
// copyLottery 复制抽奖活动
export const copyLottery = (params) => HttpGet(apis.copyLottery + params.id).then(res => {
  res = res.data
  return res
})
// 获取卡券列表
export const CardList = (params) => HttpGet(apis.cardList, params).then(res => {
  res = res.data
  console.log('获取卡券列表', res, params)
  res.couponList.map(d => {
    d.endTimestamp = formatDate(new Date(d.endTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss')
    d.beginTimestamp = formatDate(new Date(d.beginTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss')
  })
  return res
})
// 导出抽奖数据
export const exportData = (params) => HttpPost(apis.exportData, params).then(res => {
  res = res.data
  return res
})
