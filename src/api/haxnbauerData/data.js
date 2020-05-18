import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

const apis = {
  getMemberData: 'user/stores',
  getMemberList: 'haxnbauer/member/list',
  getMemberHave: 'haxnbauer/member/get/behaviour',
  getStoreList: 'haxnbauer/shop/list',
  getMenuList:'haxnbauer/food/list',
  getStoreData:'haxnbauer/shop/get/info',
  getStoreMenu:'haxnbauer/food/get/shop/food',
  getStoreTime:'haxnbauer/shop/count/hour/pay',
  
}
//  获取会员数据
export const getMemberData = (params) => HttpGet(apis.StoreList, params)
//  获取会员列表
export const getMemberList = (params) => HttpGet(apis.getMemberList+params)
//  获取会员消费数据
export const getMemberHave = (params) => HttpGet(apis.getMemberHave+params)
//  获取店铺列表
export const getStoreList = (params) => HttpGet(apis.getStoreList+params)
//  获取店铺菜单列表
export const getStoreMenu = (params) => HttpGet(apis.getStoreMenu+params)
//  获取店铺统计数据
export const getStoreData = (params) => HttpGet(apis.getStoreData+params)
//  获取店铺时间内的销售量
export const getStoreTime = (params) => HttpGet(apis.getStoreTime+params)

