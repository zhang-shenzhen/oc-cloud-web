import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
const apis = {
  list:'surbanajurong/seas',
  mylist:'surbanajurong/seas/list',
  alllist:'surbanajurong/seas/list/all',
  addMylist:'surbanajurong/seas/insert',
  updateMylist:'surbanajurong/seas/update',
  distribution:'surbanajurong/seas/',
  allSeas:'surbanajurong/seas/all',
}
//公海列表
export const List = (params) => HttpGet(apis.list, params)
//添加
export const add = (params) => HttpPost(apis.list, params)
//修改
export const update = (params) => HttpPut(apis.list, params)
//详情
export const Detail = (params) => HttpGet(apis.list +'/'+  params.id)

export const DelData = (params) => HttpDelete(apis.list +'/'+  params.id)

//我的客户列表
export const MyList = (params) => HttpGet(apis.mylist, params)
//我的全部客户列表
export const Alllist = (params) => HttpGet(apis.alllist, params)
//添加
export const  Myadd = (params) => HttpPost(apis.addMylist, params)
//修改
export const  Myupdate = (params) => HttpPut(apis.updateMylist, params)

//分配负责人
export const distribution = (params) => HttpPut(apis.distribution + params.id + '/' + params.userId)

//项目绑公海客户下拉
export const  allSeas = (params) => HttpGet(apis.allSeas, params)

// 导出
export const  exportData = (params) => HttpGet("surbanajurong/seas/export" , params)