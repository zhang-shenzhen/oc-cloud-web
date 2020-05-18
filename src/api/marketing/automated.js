import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  automateList: 'marketing/intelligentMarketing/page',
  filterList: 'user/filter',
  addFlow: 'marketing/intelligentMarketing',
  addFlowSave: 'marketing/intelligentMarketing/save',
  FlowStatistics: 'marketing/intelligentMarketing/statistics/',
  FlowOpen: 'marketing/intelligentMarketing/',
  FlowDelete: 'marketing/intelligentMarketing/',
  FlowDetails: 'marketing/intelligentMarketing/',
  triggerName: 'user/trigger/findByName/',
  copyAutomate: 'marketing/intelligentMarketing/copy/',
  saveAutomateStore: 'marketing/intelligentMarketing/draft',
  labelList: 'member/back/tag/page/list/', // 标签组列表分页
  holidayType:'marketing/holiday',
  smslist:'sms/tpl/info',
  executeOpen:"marketing/intelligentMarketing/open/execute/",

}
// 卡券列表
export const automateList = (params) => HttpGet(apis.automateList, params)
// 筛选器列表
export const filterList = (params) => HttpGet(apis.filterList, params)
// 新建流程保存
export const addFlow = (params) => HttpPost(apis.addFlow, params)
// 新建流程
export const addFlowSave = (params) => HttpPut(apis.addFlowSave, params)
// 查统计数据
export const FlowStatistics = (params) => HttpGet(apis.FlowStatistics + params.id)

// 开启流程
export const FlowOpen = (params) => HttpPut(apis.FlowOpen + params.open + '/' + params.id)

// 删除流程
export const FlowDelete = (params) => HttpDelete(apis.FlowDelete + params.id)

// 查流程详情
export const FlowDetails = (params) => HttpGet(apis.FlowDetails + params.id)

// 触发器名字查重
export const triggerName = (params) => HttpGet(apis.triggerName + params.name)

// /复制自动化营销
export const copyAutomate = (params) => HttpGet(apis.copyAutomate + params.id)
// 存草稿箱
export const saveAutomateStore = (params) => HttpPut(apis.saveAutomateStore, params)
//标签列表
export const labelList = (params) => HttpGet(apis.labelList , params)
//节日类型
export const holidayType = (params) => HttpGet(apis.holidayType , params)
//短信
export const smslist = (params) => HttpGet(apis.smslist , params)
//单次营销开启
export const executeOpen = (params) => HttpPut(apis.executeOpen + params.id)




