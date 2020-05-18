import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  intelligentlist: 'marketing/intelligent/event' // 自定义事件
}
// 自定义事件列表
export const intelligentlist = (params) => HttpGet(apis.intelligentlist + params)
// 新增自定义事件
export const addintelligentlist = (params) => HttpPost(apis.intelligentlist, params)
// 删除自定义事件
export const delintelligentlist = params => HttpDelete(apis.intelligentlist + params)
// 编辑自定义事件
export const editintelligentlist = (params) => HttpPut(apis.intelligentlist, params)
