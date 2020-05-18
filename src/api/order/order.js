import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

//  订单模块
const apis = {
  orderForm: '/order/retail/list', // 订单列表
  orderItem: '/order/retail', // 订单详情
  modificationPayment: 'order/retail/back/modifyPrice', // 货款金额修改
  expressCompany: 'marketing/mall/retail/logistics/name-list', // 快递公司
  expressCompanyMentor: 'marketing/mall/retail/logistics/list', // 快递公司下送货师傅
  deliverGoods: 'order/retail/back/deliverGoods', // 送货
  remarks: 'order/retail/back/merchantRemark', // 备注
  logisticsConfirmationReceipt: 'order/retail/back/received', // 物流确认收货
  fullRefund: 'order/retail/payment/refund', // 全额退款
  evaluationManagement: 'order/evaluateOrder/selectOrderEvaluateList', // 评价管理列表
  evaluationDel: 'order/evaluateOrder/updateOrderEvaluate', // 评价删除
  expressInformation: 'order/retail/online/logistics-info/', // 查看快递信息
}

// 订单列表
export const OrderForm = (params) => HttpGet(apis.orderForm, params)
// 订单详情
export const OrderItem = (params) => HttpGet(apis.orderItem + '/' + params.id)
// 货款金额修改
export const ModificationPayment = (params) => HttpPut(apis.modificationPayment, params)
// 快递公司
export const ExpressCompany = (params) => HttpGet(apis.expressCompany, params)
// 快递公司下送货师傅
export const ExpressCompanyMentor = (params) => HttpGet(apis.expressCompanyMentor, params)
// 送货
export const DeliverGoods = (params) => HttpPut(apis.deliverGoods + '/' + params.id, params)
// 备注
export const Remarks = (params) => HttpPut(apis.remarks + '/' + params.id, params)
// 物流确认收货
export const LogisticsConfirmationReceipt = (params) => HttpPut(apis.logisticsConfirmationReceipt + '/' + params.id)
// 全额退款
export const FullRefund = (params) => HttpPost(apis.fullRefund, params)
// 评价管理列表
export const EvaluationManagement = (params) => HttpGet(apis.evaluationManagement, params)
// 评价删除
export const EvaluationDel = (params) => HttpPut(apis.evaluationDel, params)
// 查看快递信息
export const ExpressInformation = (params) => HttpGet(apis.expressInformation + params.id)