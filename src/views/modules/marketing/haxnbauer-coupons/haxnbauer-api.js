/**
 * 海森堡
 */
import {
  DIYHttpGet,
  DIYHttpPost,
  DIYHttpPut,
  DIYHttpDelete,
} from '@/api/DIYAxios'
import { formatDate } from '@/utils/index'
import dayjs from 'dayjs'
// 卡券列表
export const couponList = (params) =>
  DIYHttpPost('marketing/coupon/couponList', params).then((res) => {
    console.log(res)
    res.data.couponList = res.data.couponList || []
    const cardStatusObj = {
      '1': '待核审',
      '2': '待投放',
      '3': '已投放',
      '4': '已删除',
      '5': '审核失败',
      // '6': '正在导入'
    }
    const type = {
      CASH: '代金券',
      DISCOUNT: '折扣券',
      GENERAL_COUPON: '礼品券',
      GROUPON: '团购券',
      GIFT: '兑换券',
    }
    res.data.couponList.forEach((d) => {
      d.statusValue = cardStatusObj[d.status]
      d.cardTypeValue = type[d.cardType]
      d.wechatFlagValue = d.wechatFlag == 1 ? '是' : '否'
      if (d.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE') {
        if (d.beginTimestamp) {
          d.Expirydate = `${dayjs(d.beginTimestamp * 1000).format(
            'YYYY-MM-DD'
          )} 至 ${dayjs(d.endTimestamp * 1000).format('YYYY-MM-DD')}`
        }
      }
      if (d.dateInfoType == 'DATE_TYPE_FIX_TERM') {
        if (d.fixedBeginTerm >= 0) {
          d.Expirydate = `领取后${
            d.fixedBeginTerm == 0 ? '当天' : d.fixedBeginTerm
          }天生效,有效天数${d.fixedTerm}天`
        }
      }
      d.category = '微信'
    })
    return res
  })
