import {
  cookieGet
} from '@/common/cookie'
export default {
  data() {
    /* eslint-disable */
    return {
      // 设置属性
      LMBshowType: true, //乐摩吧
      DemoshowType: false, //销售demo
      productType: false, // 产品(智能营销)
      haxnbauerType:true,  //海森堡
    }
    /* eslint-enable */
  },
  mounted() {
    this.frontShowTypeFun(2)
  },
  created() {},
  methods: {
    frontShowTypeFun() {
      // console.log('全局mixins前端渠道权限', JSON.parse(cookieGet('Httpheader')))
      // 20,乐摩吧屏蔽
      const showTypes = [20]
      const productShowTypes = [1]
      const haxnbauerShowTypes = [16]
      // console.log(showTypes.indexOf(JSON.parse(cookieGet('Httpheader')).ChannelId) > -1, haxnbauerShowTypes.indexOf(JSON.parse(cookieGet('Httpheader')).ChannelId) > -1)
      if (cookieGet('Httpheader')) {
        this.LMBshowType = !(showTypes.indexOf(JSON.parse(cookieGet('Httpheader')).ChannelId) > -1)
        productShowTypes.indexOf(JSON.parse(cookieGet('Httpheader')).ChannelId) > -1 ? (this.productType = false) : (this.productType = true)
        this.haxnbauerType = !(haxnbauerShowTypes.indexOf(JSON.parse(cookieGet('Httpheader')).ChannelId) > -1)
      }
    }
  }
}
