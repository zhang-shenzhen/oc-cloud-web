import { HttpGet, HttpPost, HttpPut, HttpDelete } from '../index'
import { formatDate } from '@/utils/index'

// 会员相关
const apis = {
  messageList: 'member/back/list', // 会员信息列表
  getMembersList: 'member/info/query', // 获取会员信息列表
  getMemberListNum: 'member/info/query/count', // 获取会员列表数量
  getMeberTag: 'member/tag-data/info/channel/', // 获取会员个人标签
  messageListCount: 'member/back/list/count', // 会员信息列表总数
  messageDetail: 'member/back/', // 会员详情
  wechatDetail: 'wechat/user/detail/', // 详情页微信数据
  getbrand: 'member/member/brand/', // 获取粘性值
  timeAxis: 'wechat/user/time-axis', // 获取用户操作记录
  memberLog: 'member/operat/memberLog', // 导出或导出数据的历史列表
  memberExport: 'grandvision/member/back/export', // 会员列表筛选导出
  template: '/member/operat/template', // 下载会员模版

  getMemberIntegralRecord: 'member/point/getList', // 获取会员积分记录

  tagDetail: 'member/back/tag/tag-group-list', // 获取标签
  tagsou: 'member/back/tag/tag-group-list', // 新版标签搜索
  tagoneDetail: 'member/back/tag', // 标签详情
  tagSearch: 'member/back/tag/group/page/list', // 搜索标签

  ofGroup: 'member/back/tag/group/list', // 所属标签列表下拉

  addLabel: 'member/back/tag/', // 增加标签
  deleallGroup: 'member/back/tag/batch/group', // 批量删除标签组
  ScreeningConditions: 'member/back/add/tag/batch', // 按照搜索条件打标签
  allsignLabel: 'member/back/add/tag/batch/multi', // 批量打标签(老版本))
  alladdTags: 'member/tag/hit/batch', // 批量打标签(佳楠版)

  labelGroupList: '/member/back/tag/group/page/list/', // 标签组列表分页
  deleteTag: 'member/tag-data/info/', // 删除指定标签
  labelInfo: '/member/back/tag/', // 获取标签详情
  delLabel: 'member/tag/delete/', // 删除标签(老版本))
  delTag: '/member/tag-data/info/', // 删除标签 (佳楠版)

  delLabels: '/member/tag/delete/batch/', // 批量删除标签
  addLabelGroup: '/member/back/tag/group', // 增加标签组
  getLabelGroupInfo: '/member/back/tag/group/info/', // 获取标签组详情
  updateLabelGroup: '/member/back/tag/group/', // 更新标签组
  delLabelGroup: '/member/back/tag/group/', // 删除标签组
  delLabelGroups: '/member/back/tag/batch/group/', // 批量删除标签组
  labelList: '/member/back/tag/page/list/', // 标签列表分页
  tagList: '/member/tag/manage/list', // 标签列表分页
  wechatTagList: 'wechat/tag/page', // 微信标签列表
  userWeCheatInfo: 'member/feign/getMember/one/', // 获取指定用户 微信 信息
  // messageList: "member/back/list", //会员信息列表
  card: '/member/info/card', // 接口描述：根据渠道查询自有会员卡设置,//接口描述：设置自有会员卡设置
  config: '/member/info/center', // 接口描述：根据渠道查找会员中心配置,//接口描述：配置会员中心配置
  myCard: '/member/info/card', // 接口描述：根据渠道查询自有会员卡设置

  haxnbauerpointRuleList: '/haxnbauer/integral/rule/list', // 接口描述：获取积分规则列表
  haxnbauerpointRuleSet: '/haxnbauer/integral/rule/set', // 接口描述：修改积分规则

  //  会员详情
  orderRecord: '/order/retail/list', // 订单记录
  cardVolumeRecord: '/marketing/coupon/code/front/pageByOpenId', // 卡卷记录
}
// 订单记录
export const OrderRecord = (params) => HttpGet(apis.orderRecord, params)

// 获取会员积分记录
export const GetMemberIntegralRecord = (params) =>
  HttpPost(apis.getMemberIntegralRecord, params)
// 获取卡卷记录
export const CardVolumeRecord = (params) =>
  HttpGet(apis.cardVolumeRecord, params)
// 获取会员列表数量
export const GetMemberListNum = (params) =>
  HttpPost(apis.getMemberListNum, params)

// 会员信息列表
export const getMessageList = (params) =>
  HttpGet(apis.messageList, params).then((res) => {
    res.data.data = res.data.data ? res.data.data : []
    res.data.data.map((d, idx) => {
      d.memberPoints = d.memberPoints ? d.memberPoints : 0
      d.sex = d.sex == 1 ? '男' : d.sex == 2 ? '女' : '未填写'
      // d.tagInfo = JSON.parse(d.tagInfo)
      d.subscribeTime = d.subscribeTime
        ? formatDate(new Date(d.subscribeTime), 'yyyy-MM-dd')
        : d.subscribeTime
      d.birthday = d.birthday
        ? formatDate(new Date(d.birthday), 'yyyy-MM-dd')
        : d.birthday
      d.address =
        (d.countryName || '') + (d.provinceName || '') + (d.cityName || '')
      d.registerTime = d.registerTime
        ? formatDate(new Date(d.registerTime), 'yyyy-MM-dd')
        : d.registerTime
      d.phoneNumberArea = d.extraInfo
        ? JSON.parse(d.extraInfo).place_of_ownership
          ? JSON.parse(d.extraInfo).place_of_ownership
          : '未获取'
        : '未获取'
    })
    // console.log('getMessageList', res)
    return res
  })
// 获取会员信息列表
export const getMembersList = (params) =>
  HttpPost(apis.getMembersList, params).then((res) => {
    if (res.data.data == null) {
      res.data.data = []
      return
    }
    res.data.data = res.data.data ? res.data.data : []
    res.data.data.map((d, idx) => {
      d.memberPoints = d.memberPoints ? d.memberPoints : 0
      d.sex = d.sex == 1 ? '男' : d.sex == 2 ? '女' : '未填写'
      // d.tagInfo = JSON.parse(d.tagInfo)
      d.subscribeTime = d.subscribeTime
        ? formatDate(new Date(d.subscribeTime), 'yyyy-MM-dd')
        : d.subscribeTime
      d.birthday = d.birthday
        ? formatDate(new Date(d.birthday), 'yyyy-MM-dd')
        : d.birthday
      d.address =
        (d.countryName || '') + (d.provinceName || '') + (d.cityName || '')

      d.registerTime = d.registerTime
        ? formatDate(new Date(d.registerTime), 'yyyy-MM-dd')
        : d.registerTime
      if (d.subscribeTimestamp) {
        if (String(d.subscribeTimestamp).length > 10) {
          d.subscribeTimestamp = formatDate(
            new Date(d.subscribeTimestamp),
            'yyyy-MM-dd'
          )
        } else {
          d.subscribeTimestamp = Number(String(d.subscribeTimestamp) + '000')
          d.subscribeTimestamp = formatDate(
            new Date(d.subscribeTimestamp),
            'yyyy-MM-dd'
          )
        }
      }
      d.phoneNumberArea = d.extraInfo
        ? JSON.parse(d.extraInfo).place_of_ownership
          ? JSON.parse(d.extraInfo).place_of_ownership
          : '未获取'
        : '未获取'
    })

    return res
  })

// 获取会员个人标签
export const getMeberTag = (params) =>
  HttpGet(apis.getMeberTag + params.id, {}).then((res) => {
    return res
  })
// 获取自有会员卡
export const myCard = (params) =>
  HttpGet(apis.myCard, params).then((res) => {
    return res
  })
// 获取会员列表 总数
export const getMessageListCount = (params) =>
  HttpGet(apis.messageListCount, params).then((res) => {
    return res
  })
// 获取会员详情
export const messageDetail = (params) =>
  HttpGet(apis.messageDetail + params.id, {}).then((res) => {
    res = res.data
    res.extraInfo = JSON.parse(res.extraInfo)
    res.tagInfo = JSON.parse(res.tagInfo)
    res.tagList = JSON.parse(res.tagList)
    return res
  })
// memberLog
// 导出或导出数据的历史列表
export const memberLog = (params) =>
  HttpPost(apis.memberLog, params).then((res) => {
    res = res.data
    res.data.forEach((d) => {
      d.createTime = formatDate(new Date(d.createTime), 'yyyy-MM-dd')
    })

    return res
  })
// 会员列表导出接口
export const memberExport = (params) =>
  HttpPost(apis.memberExport, params).then((res) => {
    res = res.data
    // res.data.forEach(d => {
    //   d.createTime = formatDate(new Date(d.createTime), 'yyyy-MM-dd')
    // })

    return res
  })

// 获取标签列表
export const tagDetail = (params) =>
  HttpGet(apis.tagDetail, params).then((res) => {
    res = res.data
    return res
  })

// 搜索标签
export const tagSearch = (params) =>
  HttpGet(apis.tagSearch, params).then((res) => {
    res = res.data
    return res
  })

// 获取会员的微信详细信息
export const wechatDetail = (params) =>
  HttpGet(apis.wechatDetail + params.id, {}).then((res) => {
    res = res.data
    return res
  })
//
// 获取会员的时间树详细信息
export const timeAxis = (params) =>
  HttpGet(apis.timeAxis, params).then((res) => {
    res = res.data
    res.data.map((d) => {
      d.createTime = formatDate(new Date(d.createTime), 'yyyy-MM-dd')
      switch (d.event) {
        case 'unsubscribe':
          d.str_a = '取消关注'
          break
        case 'VIEW':
          d.str_a = '点击菜单'
          d.str_b = '跳转链接:' + d.info
          break
        case 'text':
          d.str_a = '文本消息'
          d.str_b = '内容:' + d.info
          break
        case 'subscribe':
          d.str_a = '关注'
          break
        case 'image':
          d.str_b = '图片:' + d.info
          break
        case 'voice':
          d.str_b = '音频:' + d.info
          break
        default:
          break
      }
    })

    return res
  })
// 打标签
export const allsignLabel = (params) =>
  HttpPut(apis.allsignLabel, params).then((res) => {
    return res
  })
// 打标签 (佳楠版本)
export const alladdTags = (params) =>
  HttpPost(apis.alladdTags, params).then((res) => {
    return res
  })

// 删除指定标签
export const deleteTag = (params) =>
  HttpDelete(apis.deleteTag + params.id + '/' + params.tagId, {}).then(
    (res) => {
      return res
    }
  )
// 获取回复素材
export const GetMaterial = (params) => HttpGet(apis.material, params)
// 高级图文
export const GetAdvanced = (params) => HttpGet(apis.Advanced, params)

// 标签组组组组组组组组列表分页
export const labelGroupList = (params) =>
  HttpGet(apis.labelGroupList, params).then((res) => {
    res = res.data
    // console.log('标签组组组组组组组组列表分页', res)
    const GroupIdList = {}
    res.data.map((d) => {
      d.updateTime = formatDate(new Date(d.updateTime), 'yyyy-MM-dd hh:mm:ss')
      d.listLength = d.list.length
      GroupIdList[d.id] = {
        id: d.id,
        tagGroupName: d.tagGroupName,
      }
      d.list.map((dd) => {
        if (dd.menuTag == 1 && dd.tagType == 2) {
          dd.tagType = 3
        }
      })
    })

    res.GroupIdList = GroupIdList
    return res
  })
// 标签列表分页
export const labelList = (params) =>
  HttpGet(apis.labelList, params).then((res) => {
    res = res.data
    console.log('标签列表分页labelList', res)
    res.data.map((d) => {
      d.createTime = formatDate(new Date(d.createTime), 'yyyy-MM-dd hh:mm:ss')
      if (d.menuTag == 1 && d.tagType == 2) {
        d.tagType = 3
      }
    })
    return res
  })
// 标签列表分页
export const tagList = (params) =>
  HttpGet(apis.tagList, params).then((res) => {
    res = res.data
    console.log('标签列表分页tagList', res)

    return res
  })
// 标签列表分页
export const wechatTagList = (params) =>
  HttpGet(apis.wechatTagList, params).then((res) => {
    res = res.data
    console.log('微信标签列表', res)
    return res
  })

// 获取标签详情
export const labelInfo = (params) =>
  HttpGet(apis.labelInfo + params.id, {}).then((res) => {
    res = res.data
    return res
  })
// 添加标签
export const addLabel = (params) =>
  HttpPost(apis.addLabel, params).then((res) => {
    res = res.data
    return res
  })

// 更新标签
export const updateLabel = (params) =>
  HttpPut(apis.addLabel, params).then((res) => {
    res = res.data
    return res
  })
// 删除标签
export const delLabel = (params) =>
  HttpDelete(apis.delLabel + params.id, {}).then((res) => {
    res = res.data
    return res
  })
// 删除标签 delTag (佳楠版)
export const delTag = (params) =>
  HttpDelete(apis.delTag + params.memberId + '/' + params.tagId, {}).then(
    (res) => {
      return res
    }
  )
//
// 批量删除标签
export const delLabels = (params) =>
  HttpDelete(apis.delLabels + params.idList).then((res) => {
    res = res.data
    return res
  })

// 增加标签组
export const addLabelGroup = (params) =>
  HttpPost(apis.addLabelGroup, params).then((res) => {
    res = res.data
    return res
  })
// 获取标签组详情
export const getLabelGroupInfo = (params) =>
  HttpGet(apis.getLabelGroupInfo + params.id, {}).then((res) => {
    res = res.data
    return res
  })
// 更新标签组
export const updateLabelGroup = (params) =>
  HttpPut(apis.updateLabelGroup, params).then((res) => {
    res = res.data
    return res
  })
// 删除标签组
export const delLabelGroup = (params) =>
  HttpDelete(apis.delLabelGroup + params.id, {}).then((res) => {
    res = res.data
    return res
  })

// 批量删除标签组
export const delLabelGroups = (params) =>
  HttpDelete(apis.delLabelGroups + params.idList).then((res) => {
    res = res.data
    return res
  })
// 获取指定用户 微信 信息
export const userWeCheatInfo = (params) =>
  HttpGet(apis.userWeCheatInfo + params.id, {}).then((res) => {
    res = res.data
    return res
  })
// 接口描述：根据渠道查询自有会员卡设置
export const getCard = (params) =>
  HttpGet(apis.card, params).then((res) => {
    res = res.data
    return res
  })
// 接口描述：设置自有会员卡设置
export const postCard = (params) =>
  HttpPost(apis.card, params).then((res) => {
    return res
  })
// 接口描述：根据渠道查找会员中心配置
export const getConfig = (params) =>
  HttpGet(apis.config, params).then((res) => {
    res = res.data
    return res
  })
// 接口描述：配置会员中心配置
export const postConfig = (params) =>
  HttpPost(apis.config, params).then((res) => {
    return res
  })

// 接口描述：导入会员下载模版
export const getTemplate = (params) =>
  HttpGet(apis.template, params).then((res) => {
    return res
  })

// 接口描述：获取积分规则列表
export const pointRuleList = (params) =>
  HttpGet(apis.pointRuleList, params).then((res) => {
    return res
  })
// 接口描述：修改积分规则
export const pointRuleSet = (params) =>
  HttpPut(apis.pointRuleSet, params).then((res) => {
    return res
  })

// 接口描述：获取积分规则列表
export const haxnbauerpointRuleList = (params) =>
  HttpGet(apis.haxnbauerpointRuleList, params).then((res) => {
    return res
  })
// 接口描述：修改积分规则
export const haxnbauerpointRuleSet = (params) =>
  HttpPut(apis.haxnbauerpointRuleSet, params).then((res) => {
    return res
  })
