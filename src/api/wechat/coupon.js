import {
  HttpGet,
  HttpPost
} from '../index'

const apis = {
  couponList: 'wechat/coupon/couponList',
  couponType: 'wechat/coupon/cardType',
  couponStatus: 'wechat/coupon/cardStatus',
  qrcodeLaunch: 'wechat/coupon/qrcodeLaunch',
  deleteCoupon: 'wechat/coupon/deleteCoupon',
  storesTypes: 'user/stores/types',
  storesList: 'user/stores?sort=create_time;2',
  Addcoupon: 'wechat/coupon/create',
  CouponInfo: 'wechat/coupon/couponInfo',
  updateCoupon: 'wechat/coupon/updateCoupon',
  autoCreateCodes: 'wechat/couponCode/autoCreateCodes'
}
// 卡券列表
export const couponList = (params) => HttpPost(apis.couponList, params)
// 卡券列表筛选-卡券类型
export const couponType = (params) => HttpGet(apis.couponType, params)
// 卡券列表筛选-卡券状态
export const couponStatus = (params) => HttpGet(apis.couponStatus, params)
// 卡券投放
export const qrcodeLaunch = (params) => HttpPost(apis.qrcodeLaunch, params)
// 删除卡券
export const deleteCoupon = (params) => HttpPost(apis.deleteCoupon, params)

// 门店类型
export const storesTypes = (params) => HttpGet(apis.storesTypes, params)

// 门店列表
export const storesList = (params) => HttpGet(apis.storesList, params)

// 新建卡券
export const Addcoupon = (params) => HttpPost(apis.Addcoupon, params)

// 卡券详情
export const CouponInfo = (params) => HttpPost(apis.CouponInfo, params)
// 修改卡券
export const updateCoupon = (params) => HttpPost(apis.updateCoupon, params)
// 增加库存
export const autoCreateCodes = (params) => HttpPost(apis.autoCreateCodes, params)
