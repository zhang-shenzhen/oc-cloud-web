import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  findLogisticeList: 'marketing/mall/retail/logistics/express', // 物流公司选择列表
  addlogistics: 'marketing/mall/retail/logistics', // 添加物流公司
  selectLogistice: 'marketing/mall/retail/logistics/list', // 物流公司列表
  deleteLogistice: 'marketing/mall/retail/logistics/', // 删除物流公司
  updateLogistice: 'marketing/mall/retail/logistics', // 编辑物流公司

  transportExpense: 'marketing/mall/retail/transportExpense/list', // 查看运费列表
  update: 'marketing/mall/retail/transportExpense', // 删除编辑运费
  queryDefault: 'marketing/mall/retail/transportExpense/default', // 默认模板
  addtransportExpense: 'marketing/mall/retail/transportExpense', // 新增运费模板
  gettransportExpense: 'marketing/mall/retail/transportExpense/list?id=' // 模板详情
}
// 物流公司选择列表
export const getfindLogisticeList = () => HttpGet(apis.findLogisticeList)
// 添加物流公司
export const addlogistics = (params) => HttpPost(apis.addlogistics, params)
// 物流公司列表
export const selectLogistice = (params) => HttpGet(apis.selectLogistice + params)
// 删除物流公司
export const deleteLogistice = params => HttpDelete(apis.deleteLogistice + params)
// 编辑物流公司
export const updateLogistice = (params) => HttpPut(apis.updateLogistice, params)
// 查看运费列表
export const transportExpense = (params) => HttpGet(apis.transportExpense + params)
// 删除运费
export const updatedel = (params) => HttpPut(apis.update, params)
// 运费默认模板
export const queryDefault = () => HttpGet(apis.queryDefault)
// 新增运费模板
export const addtransportExpense = (params) => HttpPost(apis.addtransportExpense, params)
// 运费模板详情
export const gettransportExpense = (params) => HttpGet(apis.gettransportExpense + params)
// 编辑运费模板
export const updatetransportExpense = (params) => HttpPut(apis.update, params)
