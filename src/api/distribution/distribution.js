import {
  HttpGet,
  HttpPost,
  HttpPut
} from '../index'
import {
  cookieGet
} from '@/common/cookie'

const apis = {
  addsetLevel: 'member/commissionLevel/setLevel', // 返佣设置
  findLevelInfo: 'member/commissionLevel/findLevelInfo/', // 返佣查询
  commissionlist: 'member/commission/page?', // 分销商查询
  commissionLog: 'member/commissionLog/page?', // 明细查询
  commissionApply: 'member/commissionApply/page?', // 明细查询
  commissionLogOrderPage: 'member/commissionLog/commissionLogOrderPage', // 账变明细
  detailcommissionApply: 'member/commissionApply/', // 提现详情
  statuscommissionApply: 'member/commissionApply/status' // 提现审批
}
// 返佣设置
export const addsetLevel = (params) => HttpPost(apis.addsetLevel, params)
// 返佣查询
export const findLevelInfo = (params) => HttpGet(apis.findLevelInfo +params.ChannelId, params)
// 分销商查询
export const commissionlist = (params) => HttpGet(apis.commissionlist + params)
// 明细查询
export const commissionLog = params => HttpGet(apis.commissionLog + params)
// 明细查询
export const commissionApply = params => HttpGet(apis.commissionApply + params)
// 账变明细
export const commissionLogOrderPage = (params) => HttpGet(apis.commissionLogOrderPage + params)
// 提现详情
export const detailcommissionApply = (params) => HttpGet(apis.detailcommissionApply + params)
// 提现审批
export const statuscommissionApply = (params) => HttpPut(apis.statuscommissionApply, params)