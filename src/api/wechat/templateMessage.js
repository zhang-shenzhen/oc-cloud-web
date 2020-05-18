import {
  HttpGet,
  HttpPost,
  HttpDelete,
  HttpPut
} from '../index'

const apis = {
  messagesList: 'wechat/templates/messages',
  delTemplateMeassge: 'wechat/templates/message/',
  templatesList: 'wechat/templates',
  addtemplates: 'wechat/templates/message',
  synTemplate: 'wechat/templates/syn-template',
  templateParameter: 'wechat/templates/parm' // 模板参数
}
// 模板消息列表
export const messagesList = (params) => HttpGet(apis.messagesList, params)
// /删除模板消息
export const delTemplateMeassge = (params) => HttpDelete(apis.delTemplateMeassge + params.id)
// 模板消息模板列表
export const templatesList = (params) => HttpGet(apis.templatesList, params)
// /获取模板详情
export const templatesDetails = (params) => HttpGet(apis.templatesList + '/' + params.id)
// 添加模板消息
export const Addmessages = (params) => HttpPost(apis.addtemplates, params)

// 编辑模板消息获取详情
export const addtemplatesDetails = (params) => HttpGet(apis.addtemplates + '/' + params.id)

// 编辑模板消息
export const Updatetemplate = (id, params) => HttpPut(apis.addtemplates + '/' + id, params)

// 删除模板
export const Deletetemplate = (params) => HttpDelete(apis.templatesList + '/' + params.id)

// 同步微信平台模板消息
export const synTemplate = (params) => HttpGet(apis.synTemplate, params)
// 模板参数
export const templateParameter = (params) => HttpGet(apis.templateParameter, params)

