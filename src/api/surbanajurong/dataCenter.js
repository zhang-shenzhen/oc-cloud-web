import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'
const apis = {
  rate:'surbanajurong/item/rate',
  dateList:'surbanajurong/statistic/date',
  monthlyList:'surbanajurong/statistic/item/monthly',
  regionList:'surbanajurong/statistic/item/region',
  servicesList:'surbanajurong/statistic/item/services',
  pursuitList:'surbanajurong/statistic/item/pursuit',
  industryList:'surbanajurong/statistic/item/industry'
}


//汇率
export const rate = (params) => HttpGet(apis.rate, params)

//汇率
export const editRate = (params) => HttpPut(apis.rate +'?rate='+ params)

//列表
export const dateList = (params) => HttpGet(apis.dateList, params)

//列表
export const monthlyList = (params) => HttpGet(apis.monthlyList, params)

//列表
export const regionList = (params) => HttpGet(apis.regionList, params)

//列表
export const servicesList = (params) => HttpGet(apis.servicesList, params)

//列表
export const pursuitList = (params) => HttpGet(apis.pursuitList, params)

//列表
export const industryList = (params) => HttpGet(apis.industryList, params)




