import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
const apis = {
  list:'surbanajurong/item',
  exportData:'surbanajurong/item/export'
}
//列表
export const List = (params) => HttpGet(apis.list, params)
//添加
export const add = (params) => HttpPost(apis.list, params)
//修改
export const update = (params) => HttpPut(apis.list, params)
//详情
export const Detail = (params) => HttpGet(apis.list +'/'+  params.id)

//导出
export const exportData = (params) => HttpGet(apis.exportData,params)