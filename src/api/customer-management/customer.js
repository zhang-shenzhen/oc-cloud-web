import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
//  客户公海
const apis = {
  ustomerList: 'member/seas', // 客户列表
  exportingMember: 'member/seas/export', // 导出公海会员
  distributionShoppers: 'member/seas/distribution-guide', // 分配导购
  backHighSeas: 'member/seas/my/return-seas', // 还回公海
}
// 客户列表
export const UstomerList = (params) => HttpGet(apis.ustomerList, params)
// 新增客户
export const NewCustomer = (params) => HttpPost(apis.ustomerList, params)
// 客户详情
export const CustomerDetails = (params) => HttpGet(apis.ustomerList + '/' + params.id)
// 修改客户
export const ModifyCustomer = (params) => HttpPut(apis.ustomerList, params)
// 删除
export const DelCustomer = (params) => HttpPut(apis.ustomerList + '/' + params.id)
// 导出公海会员
export const ExportingMember = (params) => HttpGet(apis.exportingMember, params)
// 分配导购
export const DistributionShoppers = (params) => HttpPut(apis.distributionShoppers, params)
// 还回公海
export const backHighSeas = (params) => HttpPut(apis.backHighSeas, params)