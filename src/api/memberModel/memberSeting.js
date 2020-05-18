import {
  HttpGet,
  HttpPost,
  HttpDelete
} from '../index'

const apis = {
  MemberList: 'member/value/analysis/list/',
  UpdateRules: 'member/value/analysis/'
}
// 会员价值规则设置列表
export const MemberList = (params) => HttpGet(apis.MemberList + params.id)

// 修改分值
export const UpdateRules = (params) => HttpPost(apis.UpdateRules, params)
