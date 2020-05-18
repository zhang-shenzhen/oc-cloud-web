/**
 * UPM-人员管理
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

// 会员相关
const apis = {
  /**
  * UPM-人员管理--车队管理
  */
  motorcade: 'upm/motorcade', // 创建车队 //修改车队 //查询  //删除
  /**
  * UPM-人员管理--司机管理
  */
  driver: 'upm/driver', // 创建司机 //修改司机 //查询司机  //删除司机
  rePassword: 'upm/login/reset/password', // 修改密码
  /**
  * UPM-人员管理--内部人员
  */
  employee: 'upm/employee', // 创建内部人员 //修改内部人员 //查询内部人员  //删除内部人员
  employeeList: 'upm/employee/list' // 查询员工列表
}
/**
  * UPM-人员管理--车队管理
  */
// 查询车队
export const getMotorcade = (params) => HttpGet(apis.motorcade, params).then(res => {
  return res.data
})
// 修改车队
export const putMotorcade = (params) => HttpPut(apis.motorcade, params)
// 删除车队
export const delMotorcade = (params) => HttpDelete(apis.motorcade + '/' + params.id)
// 创建车队
export const createMotorcade = (params) => HttpPost(apis.motorcade, params)
// 查询单个车队
export const getOneMotorcade = (params) => HttpGet(apis.motorcade + '/' + params.id).then(res => {
  return res.data
})

/**
  * UPM-人员管理--司机管理
  */
// 查询司机list
export const driverList = (params) => HttpGet(apis.driver, params).then(res => {
  return res.data
})
// 查询司机
export const oneDriver = (params) => HttpGet(apis.driver + '/' + params.id,).then(res => {
  return res.data
})
// 修改司机
export const putDriver = (params) => HttpPut(apis.driver, params)
// 删除司机
export const delDriver = (params) => HttpDelete(apis.driver + '/' + params.id)
// 创建司机
export const createDriver = (params) => HttpPost(apis.driver, params)

/**
  * UPM-人员管理--内部人员
  */
// 查询内部人员详情
export const getEmployee = (params) => HttpGet(apis.employee + '/' + params.id,)
// 修改内部人员信息
export const putEmployee = (params) => HttpPut(apis.employee, params)
// 补全全部人员信息
export const postEmployee = (params) => HttpPost(apis.employee + '/' + params.id)
// 新增人员
export const createEmployee = (params) => HttpPost(apis.employee, params)
// 修改员工密码
export const rePassword = (params) => HttpPost(apis.rePassword, params)
// 查询员工列表
export const costcentEmployee = (params) => HttpGet(apis.employeeList, params).then(res => {
  return res.data
})
// 删除员工
export const delEmployee = (params) => HttpDelete(apis.employee + '/' + params.id)
