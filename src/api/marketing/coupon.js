import { HttpGet, HttpPost, HttpDelete, HttpPut } from '../index'
import { DIYHttpGet, DIYHttpPost, DIYHttpDelete, DIYHttpPut } from '../DIYAxios'
const apis = {
  couponList: 'marketing/coupon/couponList',
  couponType: 'marketing/coupon/cardType',
  couponStatus: 'marketing/coupon/cardStatus',
  qrcodeLaunch: 'marketing/coupon/qrcodeLaunch',
  deleteCoupon: 'marketing/coupon/deleteCoupon',
  storesTypes: 'user/stores/types',
  storesList: 'user/stores?sort=create_time;2',
  // Addcoupon: 'marketing/coupon/create',
  Addcoupon: 'marketing/coupon/createLocal',
  CouponInfo: 'marketing/coupon/couponInfo',
  updateCoupon: 'marketing/coupon/updateLocal',
  autoCreateCodes: 'marketing/couponCode/autoCreateCode',
  newCoupons: 'palace/coupon',
  findByCoupon: 'marketing/couponApply/findByCouponId',
  cardInquire: 'marketing/coupon/couponList',
  upperLower: 'marketing/coupon/open',
  echoGoods: 'marketing/couponApply/list',
}

// 新增新人优惠券
export const newCoupons = (params) => HttpPost(apis.newCoupons, params)
// 修改新人优惠券
export const setNewCoupons = (params) => HttpPut(apis.newCoupons, params)
// 查询是否是新人优惠券
export const chenkNewCoupons = (params) =>
  HttpGet(apis.newCoupons + '/' + params.id)
// 卡券列表
export const couponList = (params) => DIYHttpPost(apis.couponList, params)
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
export const updateCoupon = (params) => HttpPut(apis.updateCoupon, params)
// 增加库存
export const autoCreateCodes = (params) =>
  HttpPost(apis.autoCreateCodes, params)
// 商品回显
export const findByCoupon = (params) =>
  HttpGet(apis.findByCoupon + '/' + params.id)
// 查询每种卡券下有多少券
export const cardInquire = (params) => DIYHttpPost(apis.cardInquire, params)
// 上下架
export const upperLower = (params) => HttpPut(apis.upperLower, params)
// 回显卡券绑定的商品
export const EchoGoods = (params) => HttpGet(apis.echoGoods + '/' + params.id)
