import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

//  首页管理模块
const apis = {
  mallHomeList: 'marketing/mall/retail/advert', // 查询商城首页显示图片
  details: 'marketing/mall/retail/advert/findById', // 详情
  delete: 'marketing/mall/retail/advert/deleted', // 删除
}

// 查询商城首页显示图片
export const MallHomeList = (params) => HttpGet(apis.mallHomeList, params)
// 新增商城首页轮播图
export const AddmallHome = (params) => HttpPost(apis.mallHomeList, params)
// 查询商城首页显示图片
export const MallDetails = (params) => HttpGet(apis.details, params)
// 编辑
export const EditmallHome = (params) => HttpPut(apis.mallHomeList, params)
// 删除
export const DeleteList = (params) => HttpDelete(apis.delete + '/?id=' + params.id)