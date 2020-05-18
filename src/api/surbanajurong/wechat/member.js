import { HttpGet, HttpPost, HttpPut, HttpDelete } from '../../index'
import { formatDate } from '@/utils/index'

// 会员相关
const apis = {
  memberLog: 'member/operat/memberLog', // 导出或导出数据的历史列表
  // messageList: 'member/back/list', // 会员信息列表
  messageList: 'surbanajurong/member/list', // 会员信息列表
  messageListCount: 'member/back/list/count', // 会员信息列表总数
  messageDetail: 'member/back/', // 会员详情
  wechatDetail: 'wechat/user/detail/', // 详情页微信数据
  getbrand: 'member/member/brand/', // 获取粘性值
  timeAxis: 'wechat/user/time-axis', // 获取用户操作记录

  tagDetail: 'surbanajurong/member/back/tag/tag-group-list', // 获取标签
  tagsou: 'surbanajurong/member/back/tag/tag-group-list', // 新版标签搜索
  tagoneDetail: 'surbanajurong/member/back/tag', // 标签详情

  ofGroup: 'surbanajurong/member/back/tag/group/list', // 所属标签列表下拉

  addLabel: 'surbanajurong/member/back/tag/', // 增加标签
  deleallGroup: 'surbanajurong/member/back/tag/batch/group', // 批量删除标签组
  ScreeningConditions: 'surbanajurong/member/back/add/tag/batch', // 按照搜索条件打标签
  allsignLabel: 'surbanajurong/member/back/add/tag/batch/multi', // 批量打标签
  labelGroupList: 'surbanajurong/member/back/tag/group/page/list/', // 标签组列表分页
  deleteTag: 'surbanajurong/member/back/delete/tag/', // 删除指定标签
  labelInfo: 'surbanajurong/member/back/tag/', // 获取标签详情
  delLabel: 'surbanajurong/member/back/tag/', // 删除标签
  delLabels: 'surbanajurong/member/back/tag/batch/', // 批量删除标签
  addLabelGroup: 'surbanajurong/member/back/tag/group', // 增加标签组
  getLabelGroupInfo: 'surbanajurong/member/back/tag/group/info/', // 获取标签组详情
  updateLabelGroup: 'surbanajurong/member/back/tag/group/', // 更新标签组
  delLabelGroup: 'surbanajurong/member/back/tag/group/', // 删除标签组
  delLabelGroups: 'surbanajurong/member/back/tag/batch/group/', // 批量删除标签组
  labelList: 'surbanajurong/member/back/tag/page/list/', // 标签列表分页
  userWeCheatInfo: 'surbanajurong/member/feign/getMember/one/', // 获取指定用户 微信 信息
  // messageList: "member/back/list", //会员信息列表
  card: 'surbanajurong/member/info/card', // 接口描述：根据渠道查询自有会员卡设置,//接口描述：设置自有会员卡设置
  config: 'surbanajurong/member/info/center', // 接口描述：根据渠道查找会员中心配置,//接口描述：配置会员中心配置
  list: 'surbanajurong/wechat/user',
  details: 'surbanajurong/wechat/user/find',
  timeLine: 'wechat/user/time-axis',
  exportMember: 'surbanajurong/wechat/user/export'
}

// 会员信息列表
export const surbanajurong_getMessageList = params =>
  HttpGet(apis.messageList, params).then(res => {
    res.data.data = res.data.data ? res.data.data : []
    res.data.data.map((d, idx) => {
      d.sex = d.sex == 1 ? '男' : d.sex == 2 ? '女' : '未填写'
      d.tagInfo = JSON.parse(d.tagInfo)
      d.subscribeTime = formatDate(new Date(d.subscribeTime), 'yyyy-MM-dd')
      d.birthday = formatDate(new Date(d.birthday), 'yyyy-MM-dd')

      d.address =
        (d.countryName || '') + (d.provinceName || '') + (d.cityName || '')
      d.registerTime = formatDate(new Date(d.registerTime), 'yyyy-MM-dd')
    })
    return res
  })

// 获取会员列表 总数
export const surbanajurong_getMessageListCount = params =>
  HttpGet(apis.messageListCount, params).then(res => {
    return res
  })
// 获取会员详情
export const surbanajurong_messageDetail = params =>
  HttpGet(apis.messageDetail + params.id, {}).then(res => {
    res = res.data
    res.extraInfo = JSON.parse(res.extraInfo)
    res.tagInfo = JSON.parse(res.tagInfo)
    res.tagList = JSON.parse(res.tagList)
    return res
  })
// memberLog
// 导出或导出数据的历史列表
export const surbanajurong_memberLog = params =>
  HttpPost(apis.memberLog, params).then(res => {
    res = res.data
    return res
  })
// 获取标签列表
export const surbanajurong_tagDetail = params =>
  HttpGet(apis.tagDetail, params).then(res => {
    res = res.data
    return res
  })

// 获取会员的微信详细信息
export const surbanajurong_wechatDetail = params =>
  HttpGet(apis.wechatDetail + params.id, {}).then(res => {
    res = res.data
    return res
  })
//
// 获取会员的时间树详细信息
export const surbanajurong_timeAxis = params =>
  HttpGet(apis.timeAxis, params).then(res => {
    res = res.data
    res.data.map(d => {
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
export const surbanajurong_allsignLabel = params =>
  HttpPut(apis.allsignLabel, params).then(res => {
    return res
  })
// 删除指定标签
export const surbanajurong_deleteTag = params =>
  HttpGet(apis.deleteTag + params.id + '/' + params.tagId, {}).then(res => {
    return res
  })
// 获取回复素材
export const surbanajurong_GetMaterial = params =>
  HttpGet(apis.material, params)
// 高级图文
export const surbanajurong_GetAdvanced = params =>
  HttpGet(apis.Advanced, params)

// 标签组组组组组组组组列表分页
export const surbanajurong_labelGroupList = params =>
  HttpGet(apis.labelGroupList, params).then(res => {
    res = res.data

    const GroupIdList = {}
    res.data.map(d => {
      d.updateTime = formatDate(new Date(d.updateTime), 'yyyy-MM-dd hh:mm:ss')
      d.listLength = d.list.length
      GroupIdList[d.id] = {
        id: d.id,
        tagGroupName: d.tagGroupName
      }
      d.list.map(dd => {
        if (dd.menuTag == 1 && dd.tagType == 2) {
          dd.tagType = 3
        }
      })
    })
    res.GroupIdList = GroupIdList
    return res
  })
// 标签列表分页
export const surbanajurong_labelList = params =>
  HttpGet(apis.labelList, params).then(res => {
    res = res.data
    res.data.map(d => {
      d.createTime = formatDate(new Date(d.createTime), 'yyyy-MM-dd hh:mm:ss')
      if (d.menuTag == 1 && d.tagType == 2) {
        d.tagType = 3
      }
    })
    return res
  })
// 获取标签详情
export const surbanajurong_labelInfo = params =>
  HttpGet(apis.labelInfo + params.id, {}).then(res => {
    res = res.data
    return res
  })
// 添加标签
export const surbanajurong_addLabel = params =>
  HttpPost(apis.addLabel, params).then(res => {
    res = res.data
    return res
  })

// 更新标签
export const surbanajurong_updateLabel = params =>
  HttpPut(apis.addLabel, params).then(res => {
    res = res.data
    return res
  })
// 删除标签
export const surbanajurong_delLabel = params =>
  HttpDelete(apis.delLabel + params.id, {}).then(res => {
    res = res.data
    return res
  })
// 批量删除标签
export const surbanajurong_delLabels = params =>
  HttpDelete(apis.delLabels + params.idList).then(res => {
    res = res.data
    return res
  })

// 增加标签组
export const surbanajurong_addLabelGroup = params =>
  HttpPost(apis.addLabelGroup, params).then(res => {
    res = res.data
    return res
  })
// 获取标签组详情
export const surbanajurong_getLabelGroupInfo = params =>
  HttpGet(apis.getLabelGroupInfo + params.id, {}).then(res => {
    res = res.data
    return res
  })
// 更新标签组
export const surbanajurong_updateLabelGroup = params =>
  HttpPut(apis.updateLabelGroup, params).then(res => {
    res = res.data
    return res
  })
// 删除标签组
export const surbanajurong_delLabelGroup = params =>
  HttpDelete(apis.delLabelGroup + params.id, {}).then(res => {
    res = res.data
    return res
  })

// 批量删除标签组
export const surbanajurong_delLabelGroups = params =>
  HttpDelete(apis.delLabelGroups + params.idList).then(res => {
    res = res.data
    return res
  })
// 获取指定用户 微信 信息
export const surbanajurong_userWeCheatInfo = params =>
  HttpGet(apis.userWeCheatInfo + params.id, {}).then(res => {
    res = res.data
    return res
  })
// 接口描述：根据渠道查询自有会员卡设置
export const surbanajurong_getCard = params =>
  HttpGet(apis.card, params).then(res => {
    res = res.data
    return res
  })
// 接口描述：设置自有会员卡设置
export const surbanajurong_postCard = params =>
  HttpPost(apis.card, params).then(res => {
    return res
  })
// 接口描述：根据渠道查找会员中心配置
export const surbanajurong_getConfig = params =>
  HttpGet(apis.config, params).then(res => {
    res = res.data
    return res
  })
// 接口描述：配置会员中心配置
export const surbanajurong_postConfig = params =>
  HttpPost(apis.config, params).then(res => {
    return res
  })

// 列表
export const List = params => HttpGet(apis.list, params)
// //详情
export const details = params => HttpGet(apis.details, params)
// //详情
export const timeLine = params => HttpGet(apis.timeLine, params)
// 会员导出
export const exportMember = params => HttpGet(apis.exportMember, params)
