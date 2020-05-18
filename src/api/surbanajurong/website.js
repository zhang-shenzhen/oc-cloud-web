import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
const apis = {
  info:'surbanajurong/official',
  project:'surbanajurong/project',
  projectMoreList:'surbanajurong/image/project',
  article:'surbanajurong/article',
  statistics:'surbanajurong/article/statistics',
  companyLogo:'surbanajurong/company/logo',
  clickDataExport:'surbanajurong/click/export'
  
}
//官网内容新建
export const websiteInfo = (params) => HttpPost(apis.info, params)
//官网内容查询
export const getwebsiteInfo = (params) => HttpGet(apis.info, params)
//项目列表
export const projectList = (params) => HttpGet(apis.project, params)
//项目详情
export const projectDetail = (params) => HttpGet(apis.project + '/' + params.id)
//添加项目
export const addproject = (params) => HttpPut(apis.project , params)
//更多项目列表
export const projectMoreList = (params) => HttpGet(apis.projectMoreList , params)
//更多项目详情
export const moerProjectDetail = (params) => HttpGet(apis.projectMoreList + '/' + params.id)
// 新建更多项目
export const addMoreProject = (params) => HttpPost(apis.projectMoreList , params)
// 编辑更多项目
export const updateMoreProject = (params) => HttpPut(apis.projectMoreList , params)
//删除项目详情
export const delProjectDetail = (params) => HttpDelete(apis.projectMoreList + '/' + params.id)

//tracking页列表
export const trackingList = (params) => HttpGet(apis.article, params)
//tracking新增
export const addTracking = (params) => HttpPost(apis.article, params)
//tracking详情
export const trackingDetail = (params) => HttpGet(apis.article + '/' + params.id)
//tracking修改
export const updateTracking = (params) => HttpPut(apis.article , params)
//tracking删除
export const trackingDel= (params) => HttpDelete(apis.article + '/' + params.id)
// 统计
export const statistics= (params) => HttpGet(apis.statistics , params)



//公司logo列表
export const companyLogoList = (params) => HttpGet(apis.companyLogo, params)
//公司logo新增
export const addcompanyLogo = (params) => HttpPost(apis.companyLogo, params)
//公司logo详情
export const companyLogoDetail = (params) => HttpGet(apis.companyLogo + '/' + params.id)
//公司logo修改
export const updatecompanyLogo = (params) => HttpPut(apis.companyLogo , params)
//公司logo删除
export const companyLogoDel= (params) => HttpDelete(apis.companyLogo + '/' + params.id)

export const clickDataExport = (params) => HttpGet(apis.clickDataExport, params)

