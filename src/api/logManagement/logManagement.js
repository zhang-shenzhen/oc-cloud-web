/**
 * UPM-订单管理
 */
import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
import {
  formatDate
} from '@/utils/index'

// 订单相关
const apis = {
  selectLog: '/user/operation/select' // 操作日志列表
}

// 查询订单
export const selectLog = (params) => HttpGet(apis.selectLog, params)
