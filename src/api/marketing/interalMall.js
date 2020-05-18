import {
  HttpGet,
  HttpPut,
  HttpPost,
  HttpDelete
} from '../index'
import {
  formatDate
} from '@/utils/index'

// 短信管理
const apis = {
  noshortmsg: '/sms/sign/info?channelId=3', // 签名列表'
  interalMallList: '/marketing/integral/query', //积分商城列表
  add: 'marketing/integral/add', //新增积分
  edit: 'marketing/integral/update', //编辑
  cardList: 'marketing/coupon/front/page', //获取卡券列表
  data: 'marketing/integra/down/', // 列表-数据
  integralDetails: 'marketing/integral/getIntegralDetails', //积分商城数据
  export: 'marketing/integral/down/', //积分商品详情
  coupon: 'marketing/coupon/couponInfo', // 积分商品详情
  changeDetails: '/marketing/integral/update', //编辑积分商城
  addDetails: 'marketing/integral/add', //新增积分商城
  dataExport: 'marketing/integral/down/', //数据导出
  membershipCardList: 'member/info/card', // 会员卡列表
}

// 积分商城列表
export const interalMallList = (params) => HttpPost(apis.interalMallList, params).then(res => {
  res = res.data
  res.data.map(d => {
    d.endTime = d.endTime ? formatDate(new Date(d.endTime), 'yyyy-MM-dd') : d.endTime
    d.startTime = d.startTime ? formatDate(new Date(d.startTime), 'yyyy-MM-dd') : d.startTime
    d.sign_content = d.converted + '/' + d.stock
    d.time = d.endTime ? d.startTime + '-' + d.endTime : '长期'
    d.statuss = d.status == 1 ? '上架' : d.status == 2 ? '下架' : '删除'
  })
  return res
})
// 新建积分商品
export const addDetails = (params) => HttpPost(apis.addDetails, params).then(res => {
  return res
})
// 编辑积分商品
export const changeDetails = (params) => HttpPost(apis.changeDetails, params).then(res => {
  return res
})
//获取积分商品详情 
export const coupon = (params) => HttpPost(apis.coupon, params).then(res => {
  return res
})
//获取卡券列表 
export const cardList = (params) => HttpGet(apis.cardList, params).then(res => {
  let types = {
    CASH: "代金券",
    GENERAL_COUPON: "优惠券",
    GROUPON: "团购券",
    GIFT: "礼品券",
    DISCOUNT: "折扣券",
  }
  res.data.couponList.map(d => {
    d.typeName = types[d.cardType] || ''
  })
  return res
})

// 积分商城数据
export const integralDetails = (params) => HttpGet(apis.integralDetails + '/' + params.id, {}).then(res => {
  res.data.map(d => {
    d.createTime = formatDate(new Date(createTime))
  })
  return res.data
})
//  导出数据
export const donwData = (params) => HttpGet(apis.data + '/' + params.id, params).then(res => {

  return res
})



// 签名列表
export const noshortmsg = () => HttpGet(apis.noshortmsg).then(res => {
  return res
})

// 模板列表
export const templatetmsg = (params) => HttpGet(apis.add).then(res => {
  return res
})

// 发送短信列表
export const sendmsg = (params) => HttpGet(apis.sendinfo + params).then(res => {
  return res
})

// 发送账号
export const account = () => HttpGet(apis.accountlist).then(res => {
  return res
})
// 短信签名
export const daccount = (id) => HttpGet(apis.daccountlist + id).then(res => {
  return res
})
// 常用模板
export const defaultl = () => HttpGet(apis.defaultlist).then(res => {
  return res
})
// 删除模板
export const deletel = (id) => HttpGet(apis.daccountdelete + id).then(res => {
  return res
})

// 新建模板
export const adddefaultl = (params) => HttpPut(apis.adddefaultlmsg, params).then(res => {
  return res
})

// 同步云签名
export const synchronizationsign = () => HttpGet(apis.synchronizationsign).then(res => {
  return res
})

// 同步模板
export const synchronizationtpl = () => HttpGet(apis.synchronizationtpl).then(res => {
  return res
})

// 新建子账号
export const addaccount = (params) => HttpPost(apis.addaccount, params).then(res => {
  return res
})

// 编辑子账号
export const editaccount = (params) => HttpPut(apis.editaccount, params).then(res => {
  return res
})

// 子账号列表
export const accountlists = () => HttpGet(apis.accountlists).then(res => {
  return res
})

// 删除子账号
export const daleteaccount = (id) => HttpDelete(apis.daleteaccount + id).then(res => {
  return res
})
// 数据导出
export const DataExport = (params) => HttpGet(apis.dataExport + params.id, params)
// export const dataExport = (id) => HttpGet(apis.dataExport + id).then(res => {
//   return res
// })
export const MembershipCardList = (params) => HttpGet(apis.membershipCardList, params)