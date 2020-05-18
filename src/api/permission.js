import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from './index'
const apis = {
  department: 'user/department', // 部门
  role: 'user/role', // 角色
  permissionUser: 'user/permission/user?userId=', // 获取指定用户所有权限

  userDel: 'user/delete?userId=', // 用户删除 delete
  addUser: 'user/addUser', // 添加user
  userList: 'user/list', // 用户列表
  userDetails: 'user/find?id=', // 用户详情
  userEdit: 'user/updateUser', // user更新 put
  deleteBatches: 'user/batch/delete', // 批量根据userId逻辑删除用户
  updatePrassword: 'user/password', //修改密码
  resetPassword:'user/reset',//重置密码
  SyncList: 'user/qy-wx/sync', //同步部门及人员的接口
}
// 部门列表
export const list = (params) => HttpGet(apis.department, params)
// 部门新建
export const add = (params) => HttpPost(apis.department, params)
// 部门编辑
export const edit = (params) => HttpPut(apis.department, params)
// 部门删除
export const del = (params) => HttpDelete(apis.department + '/' + params.id)
// 部门详情
export const details = (params) => HttpGet(apis.department + '/' + params)

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
export const userList = (params) => HttpGet(apis.userList, params)
// 用户新建
export const addUser = (params) => HttpPost(apis.addUser, params)
// 用户编辑
export const userEdit = (params) => HttpPut(apis.userEdit, params)
// 用户删除
export const userDel = (params) => HttpDelete(apis.userDel + params.id)
// 批量根据userId逻辑删除用户
export const deleteBatches = (params) => HttpPost(apis.deleteBatches, params)
// 用户详情
export const userDetails = (params) => HttpGet(apis.userDetails + params.id)
//修改密码
export const updatePrassword = (params) => HttpPut(apis.updatePrassword ,params)
//重置密码
export const resetPassword = (params) => HttpPut(apis.resetPassword ,params)
// 同步部门及人员的接口
export const SyncList = (params) => HttpPost(apis.SyncList, params)