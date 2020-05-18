import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
const apis = {
  department: 'surbanajurong/permission/department', // 部门
  user: 'surbanajurong/permission/user', // user
  allUser:'surbanajurong/permission/user/all',
  userLogos:'surbanajurong/permission/user/logos',
  role: 'surbanajurong/permission/role', // 角色
  permissionUser: 'user/permission/user?userId=', // 获取指定用户所有权限
  unbinding:'surbanajurong/permission/user/unbinding',//解绑
  updatePrassword:'surbanajurong/permission/user/password',//修改密码
  checkdefultPassword:'surbanajurong/permission/user/userId',//检查是不是初始密码
  resetPassword:'surbanajurong/permission/user/reset/password',//重置密码
  
}
// 部门列表
export const list = (params) => HttpGet(apis.department, params)
// 部门新建
export const add = (params) => HttpPost(apis.department, params)
// // 部门编辑
export const edit = (params) => HttpPut(apis.department, params)
// // 部门删除
export const del = (params) => HttpDelete(apis.department+'/' +params.id)
// // 部门详情
// export const details = (params) => HttpGet(apis.department + '/' + params)

// 角色列表
export const roleList = (params) => HttpGet(apis.role, params)
// 角色新建
export const roleAdd = (params) => HttpPost(apis.role, params)
// 角色编辑
export const roleEdit = (params) => HttpPut(apis.role, params)
// 角色删除
export const roleDel = (params) => HttpDelete(apis.role + '/' + params.id)
// 角色详情
export const roleDetails = (params) => HttpGet(apis.role + '/' + params)

// 获取指定用户所有权限
export const permissionUser = (params) => HttpGet(apis.permissionUser + params)

// 用户列表
export const userList = (params) => HttpGet(apis.user, params)
// 用户列表
export const allUser = (params) => HttpGet(apis.allUser, params)
// 用户详情
export const userDetails = (params) => HttpGet(apis.user+ '/' + params.id)
// 用户新建
export const addUser = (params) => HttpPost(apis.user, params)
//获取logo下拉
export const userLogos = (params) => HttpGet(apis.userLogos, params)
// 用户编辑
export const updateUser = (params) => HttpPut(apis.user, params)
// 用户删除
export const userDel = (params) => HttpDelete(apis.user+ '/' + params.id)
//解绑
export const unbinding = (params) => HttpPut(apis.unbinding+ '/' + params.id)
//修改密码
export const updatePrassword = (params) => HttpPut(apis.updatePrassword ,params)
//检查是不是初始密码
export const checkdefultPassword = (params) => HttpGet(apis.checkdefultPassword+ '/' + params.id)

//重置密码
export const resetPassword = (params) => HttpGet(apis.resetPassword ,params)
