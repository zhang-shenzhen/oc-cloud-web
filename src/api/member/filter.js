import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  languageInterface: 'wechat/language', // 语言接口
  // filterGroup: 'member/back/tag/tag/list', // 标签接口 ======
  filterGroup: 'member/tag/manage/list', // 标签接口 ======
  filterList: 'user/filter/list/', // 筛选器列表接口
  filterSearch: 'user/filter', // 筛选器搜索接口
  filterBatchDelete: 'user/filter/batch?ids=', // 筛选器批量删除接口
  filterDel: 'user/filter/', // 筛选器删除接口 or 回显
  filterAdd: 'user/filter/', // 筛选器新增接口
  filterEdit: 'user/filter/', // 筛选器编辑接口
  cityList: 'member/back/city/list', // 省市区接口
  accountInfo: 'member/info/query', // 通过条件查询会员信息
  numberData: 'user/filter/refresh?filterId=', // 获取动态会员组数量
}

// 语言
export const GetMaterial = (params) => HttpGet(apis.languageInterface, params)
// 标签
export const FilterMaterial = (params) => HttpGet(apis.filterGroup, params)
// 筛选器列表
export const FilterList = (params) => HttpGet(apis.filterList, params)
// 筛选器搜索
export const FilterSearch = (params) => HttpGet(apis.filterSearch, params)
// 筛选器批量删除接口
export const FilterBatchDelete = (params, id) => HttpDelete(apis.filterBatchDelete + id, params)
// 筛选器删除接口
export const FilterDel = (params, id) => HttpDelete(apis.filterDel + id + '/', params)
// 筛选器新增接口
export const FilterAdd = params => HttpPost(apis.filterAdd, params)
// 筛选器回显接口
export const FilterEcho = (params, id) => HttpGet(apis.filterDel + id + '/', params)
// 筛选器编辑接口
export const FilterEdit = params => HttpPut(apis.filterAdd, params)
// 省市区接口
export const CityList = params => HttpGet(apis.cityList, params)
// 通过条件查询会员信息
export const AccountInfo = params => HttpPost(apis.accountInfo, params)
// 获取动态会员组数量
export const NumberData = (params, id) => HttpGet(apis.numberData + id, params)