import {
  HttpGet,
  HttpPost,
  HttpPut
} from '../index'
const apis = {
  listLedger: 'order/specialAccount/order/list', // 分账记录列表
  reviseLedgerRecord: 'order/specialAccount/order', // 修改分账记录
  tradingRecord: 'member/account/trade-record/find', // 查询会员账户交易记录
  refundOrderList: 'order/refund/order/list', // 退款订单列表
  newRefundOrder: 'order/refund/order', // 新建退款订单
  memberInfo: 'member/account/find', // 通过会员卡号查询会员信息
  refundOrderDetails: 'order/refund/order/detail/', // 退款订单详情
  basicRefundInformation: 'order/refund/order/get/amount', // 获取退款基础金额信息
  collectingInformation: 'order/specialAccount/order/get/amount', // 获取分账基础金额信息
  tradeInformation: 'member/account/get/amount', // 获取交易记录基础金额信息
  listMemberAccounts: 'member/account/list', // 条件查询会员账户列表
}
// 分账记录列表
export const ListLedger = (params) => HttpGet(apis.listLedger, params)
// 修改分账记录
export const ReviseLedgerRecord = (params) => HttpPut(apis.reviseLedgerRecord, params)
// 查询会员账户交易记录
export const TradingRecord = (params) => HttpGet(apis.tradingRecord, params)
// 退款订单列表
export const RefundOrderList = (params) => HttpGet(apis.refundOrderList, params)
// 新建退款订单
export const NewRefundOrder = (params) => HttpPost(apis.newRefundOrder, params)
// 修改订单
export const ModifyOrder = (params) => HttpPut(apis.newRefundOrder, params)
// 通过会员卡号查询会员信息
export const MemberInfo = (params) => HttpGet(apis.memberInfo, params)
// 退款订单详情
export const RefundOrderDetails = (params) => HttpGet(apis.refundOrderDetails + params.id)
// 获取退款基础金额信息
export const BasicRefundInformation = (params) => HttpGet(apis.basicRefundInformation, params)
// 获取分账基础金额信息
export const CollectingInformation = (params) => HttpGet(apis.collectingInformation, params)
// 获取交易记录基础金额信息
export const TradeInformation = (params) => HttpGet(apis.tradeInformation, params)
// 条件查询会员账户列表
export const ListMemberAccounts = (params) => HttpGet(apis.listMemberAccounts, params)