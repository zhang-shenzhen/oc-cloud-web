import {
  HttpGet,
  HttpPut,
  HttpPost,
  HttpDelete
} from '../index'
import {
  cookieGet
} from '@/common/cookie'
console.log(
  "JSON.parse(cookieGet('Httpheader')).ChannelId",
  JSON.parse(cookieGet('Httpheader')).ChannelId
)
// 短信管理
const apis = {
  noshortmsg: '/sms/sign/info?channelId=' + JSON.parse(cookieGet('Httpheader')).ChannelId, // 签名列表'
  signinfo: '/sms/sign/info/', // 签名列表
  templateinfo: '/sms/tpl/info?channelId=' + JSON.parse(cookieGet('Httpheader')).ChannelId, // 模板列表
  sendinfo: '/sms/send/record/', // 短信列表
  accountlist: '/sms/account/account?channelId=' +
    JSON.parse(cookieGet('Httpheader')).ChannelId, // 发送账号列表
  defaultlist: '/sms/tpl/default', // 常用模板
  daccountlist: '/sms/sign/info/account/', // 短信签名
  daccountdelete: '/sms/tpl/delete/', // 删除短信模板
  adddefaultlmsg: '/sms/tpl/add-edit', // 新增或编辑模板
  synchronizationsign: '/sms/sign/sync', // 同名云签名
  // synchronizationsign: '/sms/sign/sync?channelId=' + JSON.parse(cookieGet('Httpheader')).ChannelId, // 同名云签名
  // synchronizationtpl: '/sms/tpl/sync?channelId=' + JSON.parse(cookieGet('Httpheader')).ChannelId, // 同名模板
  synchronizationtpl: '/sms/tpl/sync', // 同名模板
  addaccount: '/sms/account/create', // 新建字账号
  editaccount: '/sms/account/update', // 编辑字账号
  accountlists: '/sms/account/subaccount/list?channelId=' +
    JSON.parse(cookieGet('Httpheader')).ChannelId, // 子账户列表
  daleteaccount: '/sms/account/delete/', // 删除子账户
  viewaccount: '/sms/account/subaccount/list', // 查看账户
}
// 短信列表
export const shortmsg = params =>
  HttpGet(apis.signinfo + params).then(res => {
    return res
  })

// 短信列表
export const noshortmsg = () =>
  HttpGet(apis.noshortmsg).then(res => {
    return res
  })

// 模板列表
export const templatetmsg = params =>
  HttpGet(apis.templateinfo + params).then(res => {
    return res
  })

// 发送短信列表
export const sendmsg = params =>
  HttpGet(apis.sendinfo + params).then(res => {
    return res
  })

// 发送账号
export const account = () =>
  HttpGet(apis.accountlist).then(res => {
    return res
  })
// 短信签名
export const daccount = id =>
  HttpGet(apis.daccountlist + id).then(res => {
    return res
  })
// 常用模板
export const defaultl = () =>
  HttpGet(apis.defaultlist).then(res => {
    return res
  })
// 删除模板
export const deletel = id =>
  HttpDelete(apis.daccountdelete + id).then(res => {
    return res
  })

// 新建模板
export const adddefaultl = params =>
  HttpPut(apis.adddefaultlmsg, params).then(res => {
    return res
  })

//同步云签名 
export const synchronizationsign = (params) => HttpGet(apis.synchronizationsign, params);

// 同步云签名
// export const synchronizationsign = () =>
//   HttpGet(apis.synchronizationsign).then(res => {
//     return res
//   })

// 同步模板
// export const synchronizationtpl = () =>
//   HttpGet(apis.synchronizationtpl).then(res => {
//     return res
//   })
//同步模板 
export const synchronizationtpl = (params) => HttpGet(apis.synchronizationtpl, params);

// 新建子账号
export const addaccount = params =>
  HttpPost(apis.addaccount, params).then(res => {
    return res
  })

// 编辑子账号
export const editaccount = params =>
  HttpPut(apis.editaccount, params).then(res => {
    return res
  })

// 子账号列表
export const accountlists = () =>
  HttpGet(apis.accountlists).then(res => {
    return res
  })

// 删除子账号
export const daleteaccount = id =>
  HttpDelete(apis.daleteaccount + id).then(res => {
    return res
  })

//查看账户 
export const viewaccount = (params) => HttpGet(apis.viewaccount, params);