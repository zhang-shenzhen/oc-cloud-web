import {
  HttpGet,
  HttpPost,
  HttpDelete,
  HttpPut
} from '../index'

//  签到管理
const apis = {  
  tableData: 'marketing/attendance', // 列表数据
  delData: 'marketing/attendance/', // 删除
  copyData: 'marketing/attendance/copy/', // 复制数据
  signinData: 'marketing/attendance/record', // 签到统计里的列表数据
  cardList: 'marketing/coupon/front/page', // 获取卡券列表
  createActivities: 'marketing/attendance', // 创建签到活动
  editActivities: 'marketing/attendance', // 编辑签到活动
  checkDetails: 'marketing/attendance/' // 签到详情
}

// 列表数据
export const TableDataList = (params) => HttpGet(apis.tableData, params)
// 删除
export const DeleteDate = (params) => HttpDelete(apis.delData + params.id)
// 复制数据
export const CopyingData = (params, id) => HttpPost(apis.copyData + id, params)
// 签到统计里的列表数据
export const SigninData = (params) => HttpGet(apis.signinData, params)
// 获取卡券列表
export const CardList = (params) => HttpGet(apis.cardList, params)
// 创建签到活动
export const CreateActivities = (params) => HttpPost(apis.createActivities, params)
// 编辑签到活动
export const editActivities = (params) => HttpPut(apis.editActivities, params)
// 签到详情
export const CheckDetails = (params, id) => HttpGet(apis.checkDetails + id, params)
