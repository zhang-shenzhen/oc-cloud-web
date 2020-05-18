import Mock from 'mockjs'

const Random = Mock.Random

// 登录接口
Mock.mock('/login', 'post', (option) => {
  const {
    username,
    password
  } = JSON.parse(option.body)
  return (username === 'admin' && password === 'admin')
})

/**
 * 获取路由列表
 */
const menuRoutes = () => {
  const menuRoutes = {
    'code': 0,
    'msg': 'success',
    'data': [
    //会员管理-1
    {
      'id': '1',
      'name': '{"en_US": "shmydrink", "zh_CN": "会员管理"}',
      'iconCls': 'oc-hyzx',
      'type': 1,
      'url': '',
      'permission': '*',
      'parentId': '*',
      'orderNum': 1,
      'appName': '会员管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '1-1',
        'name': '{"en_US": "test member", "zh_CN": "会员管理"}',
        'children': [],
        'type': 1,
        'url': '',
        'permission': 'member.user.user-management.member-list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '会员管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null
      }, {
        'id': '1-2',
        'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
        'children': [],
        'type': 1,
        'url': 'member/user-sys/user-sys',
        'permission': 'shmydrink-service.member.*',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '会员设置',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null
      }, {
        'id': '1-3',
        'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
        'children': [],
        'type': 1,
        'url': 'member/user/userManagement/memLogin',
        'permission': 'shmydrink-service.member.*',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '会员注册',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null
      },{
        'id': '1-4',
        'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
        'children': [{
          'id': '1-4-1',
          'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
          'children': [],
          'type': 1,
          'url': '',
          'permission': 'member.user.label-management.all-label',
          'parentId': 'shmydrink-service.*',
          'orderNum': 1,
          'appName': '全部标签',
          'visible': true,
          'createTime': 1559727274000,
          'updateDate': null
        }, {
          'id': '1-4-2',
          'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
          'children': [],
          'type': 1,
          'url': '',
          'permission': 'member.user.label-management.label-arr',
          'parentId': 'shmydrink-service.*',
          'orderNum': 1,
          'appName': '标签组',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null
        },],
        'type': 1,
        'url': '',
        'permission': 'shmydrink-service.member.*',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '标签管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null
      },
      {
        'id': '1-5',
        'name': '{"en_US": "test member", "zh_CN": "æµè¯ä¼å"}',
        'children': [],
        'type': 1,
        'url': 'member/filter-folder/filter',
        'permission': 'member.filter-folder.filter',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '筛选器管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null
      }
      ]
    },
    //品牌管理-2
    {
      'id': '13',
      'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
      'iconCls': 'oc-rzgl',
      'type': 1,
      'url': '',
      'permission': 'shmydrink-service.*',
      'parentId': '*',
      'orderNum': 1,
      'appName': '品牌管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '13-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'brandSys/brandSys',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '品牌管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    },
    //微信管理-3
    {

      'id': '2',
      'name': '{"en_US": "shmydrink", "zh_CN": "微信管理"}',
      'iconCls': 'oc-wx',
      'type': 1,
      'url': '',
      'permission': 'shmydrink-service.*',
      'parentId': '*',
      'orderNum': 1,
      'appName': '微信管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '2-1',
        'name': '{"en_US": "test member", "zh_CN": "卡券列表"}',
        'type': 1,
        'url': 'wechat/coupon/list',
        'permission': 'wechat.coupon.member-list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '卡券管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-2',
        'name': '{"en_US": "test member", "zh_CN": "公众号设置"}',
        'type': 1,
        'url': 'wechat/public/index',
        'permission': 'wechat.public.index',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '公众号设置',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-3',
        'name': '{"en_US": "test member", "zh_CN": "自定义菜单"}',
        'type': 1,
        'url': 'wechat/menu/menuList',
        'permission': 'wechat.menu.menu-list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '自定义菜单',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-4',
        'name': '{"en_US": "test member", "zh_CN": "回复设置"}',
        'type': 1,
        'url': '',
        'permission': 'shmydrink-service.member.*',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '回复设置',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': [{
          'id': '2-4-1',
          'name': '{"en_US": "test member", "zh_CN": "默认回复"}',
          'type': 1,
          'url': 'wechat/reply/defaultReply',
          'permission': 'wechat.reply.default-reply',
          'parentId': 'shmydrink-service.*',
          'orderNum': 1,
          'appName': '默认回复',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        },
        {
          'id': '2-4-2',
          'name': '{"en_US": "test member", "zh_CN": "关注后回复"}',
          'type': 1,
          'url': 'wechat/reply/foucusReply',
          'permission': 'wechat.reply.foucus-reply',
          'parentId': 'shmydrink-service.*',
          'orderNum': 1,
          'appName': '关注后回复',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        },
        {
          'id': '2-4-3',
          'name': '{"en_US": "test member", "zh_CN": "关键字回复"}',
          'type': 1,
          'url': 'wechat/reply/keywordReply',
          'permission': 'wechat.reply.keyword-reply',
          'parentId': 'shmydrink-service.*',
          'orderNum': 1,
          'appName': '关键字回复',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        }
        ]
      },
      {
        'id': '2-6',
        'name': '{"en_US": "test member", "zh_CN": "群发消息"}',
        'type': 1,
        'url': '',
        'permission': 'wechat.group-messages.group-page',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '群发消息',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-5',
        'name': '{"en_US": "test member", "zh_CN": "触发器"}',
        'type': 1,
        'url': 'wechat/trigger/triggerList',
        'permission': 'wechat.trigger.trigger-list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '触发器',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-6',
        'name': '{"en_US": "test member", "zh_CN": "素材管理"}',
        'type': 1,
        'url': 'wechat/material/list',
        'permission': 'wechat.material.list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '素材管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-7',
        'name': '{"en_US": "test member", "zh_CN": "模板消息"}',
        'type': 1,
        'url': 'wechat/templateMessage/list',
        'permission': 'wechat.template-message.list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '模板消息',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '2-8',
        'name': '{"en_US": "test member", "zh_CN": "渠道二维码"}',
        'type': 1,
        'url': 'wechat/channelQrCode/list',
        'permission': 'wechat.channel-qr-code.list',
        'parentId': 'shmydrink-service.*',
        'orderNum': 1,
        'appName': '渠道二维码',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }
      ]
    },
    //营销中心-4
    {
      'id': '3',
      'name': '{"en_US": "shmydrink", "zh_CN": "营销中心"}',
      'iconCls': 'oc-yx',
      'type': 1,
      'url': '',
      'permission': 'shmydrink-service.*',
      'parentId': '*',
      'orderNum': 1,
      'appName': '营销中心',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '3-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "卡券列表"}',
        'type': 1,
        'url': 'marketing/coupon/list',
        'permission': 'marketing.coupon.list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '卡券管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '3-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "抽奖管理"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'marketing/lottery/sweepstakes',
        'permission': 'marketing.lottery.sweepstakes',
        'parentId': '*',
        'orderNum': 1,
        'appName': '抽奖管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '3-3',
        'name': '{"en_US": "shmydrink", "zh_CN": "短信管理"}',
        'type': 1,
        'url': '',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '短信管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': [{
          'id': '3-3-1',
          'name': '{"en_US": "shmydrink", "zh_CN": "短信管理"}',
          'type': 1,
          'url': 'marketing/shortmessage/shortmanagement',
          'permission': 'marketing.shortmessage.shortmanagement',
          'parentId': '*',
          'orderNum': 1,
          'appName': '短信管理',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        }, {
          'id': '3-3-2',
          'name': '{"en_US": "shmydrink", "zh_CN": "模板管理"}',
          'type': 1,
          'url': 'marketing/shortmessage/templatemanagement',
          'permission': 'marketing.shortmessage.templatemanagement',
          'parentId': '*',
          'orderNum': 1,
          'appName': '模板管理',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        }, {
          'id': '3-3-3',
          'name': '{"en_US": "shmydrink", "zh_CN": "发送记录"}',
          'iconCls': 'oc-hyzx',
          'type': 1,
          'url': 'marketing/shortmessage/send',
          'permission': 'marketing.shortmessage.send',
          'parentId': '*',
          'orderNum': 1,
          'appName': '发送记录',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        }, {
          'id': '3-3-4',
          'name': '{"en_US": "shmydrink", "zh_CN": "短信账户管理"}',
          'iconCls': 'oc-hyzx',
          'type': 1,
          'url': 'marketing/shortmessage/accountmanagement',
          'permission': 'marketing.shortmessage.accountmanagement',
          'parentId': '*',
          'orderNum': 1,
          'appName': '短信账户管理',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        }]
      },
      {
        'id': '3-4',
        'name': '{"en_US": "shmydrink", "zh_CN": "签到管理"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'marketing/signIn/signInList',
        'permission': 'marketing.sign-in.sign-in-list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '签到管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '3-5',
        'name': '{"en_US": "shmydrink", "zh_CN": "自动化营销"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'marketing/Automated/list',
        'permission': 'marketing.automated.list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '自动化营销',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '3-6',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': '',
        'type': 1,
        'url': 'marketing/integralMall/integralMall',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '积分商城',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': [{
          'id': '3-6-1',
          'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
          'iconCls': 'oc-hyzx',
          'type': 1,
          'url': 'marketing/integralMall/integralMall',
          'permission': 'shmydrink-service.*',
          'parentId': '*',
          'orderNum': 1,
          'appName': '积分商城',
          'visible': true,
          'createTime': 1559727273000,
          'updateDate': null,
          'children': []
        },]
      },
      ]
    },
    //门店管理-5
    {
      'id': '4',
      'name': '{"en_US": "shmydrink", "zh_CN": "门店管理"}',
      'iconCls': 'oc-md',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '门店管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,      
      'children': [{
        'id': '4-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "门店列表"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'storeManagement/list',
        'permission': 'store-management.list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '门店列表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },{
        'id': '4-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'storeManagement/staff-list',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '店员管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },{
        'id': '4-3',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'storeManagement/reservationList',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '预约管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },{
        'id': '4-4',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'storeManagement/commentList',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '评论管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    },
    //数据中心-6
    {
      'id': '5',
      'name': '{"en_US": "shmydrink", "zh_CN": "数据中心"}',
      'iconCls': 'oc-sjzx',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '数据中心',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '5-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "粉丝数据分析"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'dataCenter/fans/fans-list',
        'permission': 'data-center.fans.fans-list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '粉丝数据分析',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '5-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "图文数据分析"}',
        'iconCls': '',
        'type': 1,
        'url': 'dataCenter/imageText/imageGraphic',
        'permission': 'data-center.image-text.image-graphic',
        'parentId': '*',
        'orderNum': 1,
        'appName': '图文数据分析',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '5-3',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'dataCenter/memberModel/memberModel',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '会员标签模型分析',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '5-4',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'dataCenter/InteractiveReport/InteractiveReport',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '交互式报表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '5-5',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'dataCenter/channelSource/channelSource',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '渠道来源分析',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '5-6',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'dataCenter/memberChannelAndLoyalty/memberChannelAndLoyalty',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '会员渠道和忠诚度分析',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    },
    //会员模型-7
    {
      'id': '7',
      'name': '{"en_US": "shmydrink", "zh_CN": "会员模型"}',
      'iconCls': 'oc-hymx',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '会员模型',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '7-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "会员价值"}',
        'iconCls': '',
        'type': 1,
        'url': 'memberModel/membershipValue',
        'permission': 'member-model.membership-value',
        'parentId': '*',
        'orderNum': 1,
        'appName': '会员价值',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      },
      {
        'id': '7-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "用户粘性"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'memberModel/userViscosity',
        'permission': 'member-model.user-viscosity',
        'parentId': '*',
        'orderNum': 1,
        'appName': '用户粘性',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }
      ]
    },
    //订单管理-8
    {
      'id': '8',
      'name': '{"en_US": "shmydrink", "zh_CN": "订单管理"}',
      'iconCls': 'oc-ddgl',
      'type': 1,
      'url': '',
      'permission': 'upm-pm.upm-order.order',
      'parentId': '*',
      'orderNum': 1,
      'appName': '订单管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '8-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "ç±³æºé¥®æ"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'UPM-PM/UPMorder/order',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '订单列表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    }, 
    //人员管理-9
    {
      'id': '9',
      'name': '{"en_US": "shmydrink", "zh_CN": "人员管理"}',
      'iconCls': 'oc-rygl',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '人员管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '9-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "员工列表"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'upm-pm.upm-employing-management.staff-list',
        'permission': 'shmydrink-service.*',
        'parentId': '*',
        'orderNum': 1,
        'appName': '员工列表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '9-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "车队列表"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'UPM-PM/UPMEmployingManagement/FleetList',
        'permission': 'upm-pm.upm-employing-management.fleet-list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '车队列表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '9-3',
        'name': '{"en_US": "shmydrink", "zh_CN": "司机列表"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'UPM-PM/UPMEmployingManagement/driverList',
        'permission': 'upm-pm.upm-employing-management.driver-list',
        'parentId': '*',
        'orderNum': 1,
        'appName': '司机列表',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    }, 
    //部门管理-10
    {
      'id': '10',
      'name': '{"en_US": "shmydrink", "zh_CN": "部门管理"}',
      'iconCls': 'oc-bmgl',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '部门管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '10-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "系统-员工"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'UPM-PM/UPMDepartmentManagement/systemStaff',
        'permission': 'upm-pm.upm-department-management.system-staff',
        'parentId': '*',
        'orderNum': 1,
        'appName': '系统-员工',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '10-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "系统-部门"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'UPM-PM/UPMDepartmentManagement/systemDepartment',
        'permission': 'upm-pm.upm-department-management.system-department',
        'parentId': '*',
        'orderNum': 1,
        'appName': '系统-部门',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    }, 
    //权限管理-11
    {
      'id': '11',
      'name': '{"en_US": "shmydrink", "zh_CN": "权限管理"}',
      'iconCls': 'oc-yhqx',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '权限管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '11-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "用户管理"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'permission/userManagement/sys-user',
        'permission': 'permission.user-management.sys-user',
        'parentId': '*',
        'orderNum': 1,
        'appName': '用户管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '11-2',
        'name': '{"en_US": "shmydrink", "zh_CN": "部门管理"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'permission/DepartmentManagement/systemStaff',
        'permission': 'permission.department-management.system-staff',
        'parentId': '*',
        'orderNum': 1,
        'appName': '部门管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }, {
        'id': '11-3',
        'name': '{"en_US": "shmydrink", "zh_CN": "角色管理"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'permission/roleManagement/sys-role',
        'permission': 'permission.role-management.sys-role',
        'parentId': '*',
        'orderNum': 1,
        'appName': '角色管理',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    }, 
    //日志管理-12
    {
      'id': '12',
      'name': '{"en_US": "shmydrink", "zh_CN": "日志管理"}',
      'iconCls': 'oc-rzgl',
      'type': 1,
      'url': '',
      'permission': '',
      'parentId': '*',
      'orderNum': 1,
      'appName': '日志管理',
      'visible': true,
      'createTime': 1559727273000,
      'updateDate': null,
      'children': [{
        'id': '12-1',
        'name': '{"en_US": "shmydrink", "zh_CN": "操作日志"}',
        'iconCls': 'oc-hyzx',
        'type': 1,
        'url': 'logManagement/logManagement',
        'permission': 'log-management.log-management',
        'parentId': '*',
        'orderNum': 1,
        'appName': '操作日志',
        'visible': true,
        'createTime': 1559727273000,
        'updateDate': null,
        'children': []
      }]
    },
    
    
    ]
  }
  
//   if(process.env.VUE_APP_NODE_SHOWTYPE==2){
//     var i = 0
//     function nurl(dd){
//       i++
//       console.log('children',dd,i)      
//       if(dd){
//         dd.map(ddd=>{
//           if(ddd.children.length>0)return nurl(dd.children)
//           ddd.url=''
//         }) 
//       }
           
//     }
//     let ids=['2','3','4','7','9','11']
//     menuRoutes.data.splice(2,1)
//     menuRoutes.data.splice(2,1)
//     menuRoutes.data.splice(2,1)
//     menuRoutes.data.splice(4,1)
//     menuRoutes.data.splice(4,1)
//     menuRoutes.data.splice(5,1)    
//   }
  if(process.env.VUE_APP_NODE_SHOWTYPE=='UPM'){
    menuRoutes.data.splice(0,1)
    menuRoutes.data.splice(0,1)
    menuRoutes.data.splice(1,1)
    menuRoutes.data.splice(1,1)
    menuRoutes.data.splice(1,1)
    menuRoutes.data.splice(1,1)
    menuRoutes.data.splice(4,1)  
    // menuRoutes.data.splice(3,1)  
  }
  return menuRoutes
}
Mock.mock('/user/permission/all', menuRoutes)

/**
 * 获取权限
 */
const getPermissions = () => {
  const data = {
    'code': 0,
    'msg': 'success',
    'data': ['sys:dept:update', 'sys:params:update', 'sys:dept:info',
      'sys:role:page', 'sys:user:export', 'sys:dept:delete', 'sys:params:delete',
      'sys:params:page', 'sys:dept:list', 'sys:user:page', 'sys:role:list',
      'sys:menu:select', 'sys:schedule:update', 'sys:schedule:save', 'sys:params:save',
      'sys:params:info', 'sys:schedule:page', 'sys:dict:info', 'sys:role:save', 'demo:news:all',
      'sys:schedule:log', 'sys:model:all', 'sys:role:update', 'sys:mail:log', 'sys:log:login',
      'sys:user:save', 'sys:oss:all', 'sys:schedule:info', 'sys:params:export', 'sys:sms:all',
      'sys:menu:update', 'sys:menu:delete', 'sys:running:all', 'sys:dict:delete', 'sys:menu:list',
      'sys:dict:page', 'sys:mail:all', 'sys:schedule:resume', 'sys:user:delete', 'sys:user:update',
      'sys:menu:info', 'sys:menu:save', 'sys:log:operation', 'sys:role:info', 'sys:schedule:delete',
      'sys:process:all', 'sys:log:error', 'sys:user:info', 'sys:schedule:run', 'sys:role:delete',
      'sys:dept:save', 'sys:schedule:pause', 'sys:dict:update', 'sys:dict:save'
    ]
  }
  return data
}
Mock.mock('/sys/menu/permissions', getPermissions)

/**
 * 获取用户信息
 */
const getInfo = () => {
  const data = {
    'code': 0,
    'msg': 'success',
    'data': {
      'sysTime': '1559704212354',
      'osName': 'Linux',
      'osArch': 'amd64',
      'osVersion': '3.10.0-514.26.2.el7.x86_64',
      'userLanguage': 'en',
      'userDir': '/data/demo/security-enterprise-server',
      'totalPhysical': '3790',
      'freePhysical': '120',
      'memoryRate': 96.83,
      'processors': 2,
      'jvmName': 'Java HotSpot(TM) 64-Bit Server VM',
      'javaVersion': '1.8.0_144',
      'javaHome': '/usr/java/jdk1.8.0_144/jre',
      'javaTotalMemory': '640',
      'javaFreeMemory': '349',
      'javaMaxMemory': '843',
      'userName': 'root',
      'systemCpuLoad': 2.53,
      'userTimezone': 'Asia/Shanghai'
    }
  }
  return data
}
Mock.mock('/sys/user/info', getInfo)

/**
 * 会员列表
 */
class Member {
  constructor(listData = {
    'code': 0,
    'msg': 'success',
    'data': [],
    total: 200
  }) {
    // 返回的data的固定数据
    this.userList = listData
    this.labelList = listData
    this.methods = {

    }
  }
  // 创造会员详细数据
  creatUserInfo(i = 0) {
    const info = {
      'id': i + 1,
      'date': Random.date('yyyy-MM-dd'),
      'name': Random.cname(),
      'address': Mock.mock('@county(true)'),
      'phone': Mock.mock(/^1[0-9]{10}$/),
      'status': Random.integer(0, 1),
      'label': Mock.mock(/^1[0-9]{3}$/),
      'sex': Mock.mock({
        'string|1': ['男', '女']
      }).string,
      'formValue':Mock.mock({
        'string|1': ['微信公众号', '京东','小程序','其他']
      }).string,
      'formBrand':Mock.mock({
        'string|1': ['怀仁母婴', '怀仁大药房']
      }).string,
    }
    return info
  }
  // 批量输出数据
  MemberList(n = 20) {
    for (let i = 0; i < n; i++) {
      this.userList.data.push(this.creatUserInfo(i))
    }
    return this.userList
  }
  //
  // 创造会员详细数据
  creatLabelInfo(i = 0) {
    const info = {
      'id': i + 1,
      'label': Mock.mock(/^1[0-9]{3}$/),
      'createTime': Random.date('yyyy-MM-dd'),
      'labelType': '微信标签',
      'labelArrey': '门店',
      'remarks': Mock.mock('@county(true)')
    }
    return info
  }
  // 批量输出数据
  labelsList(n = 20) {
    for (let i = 0; i < n; i++) {
      this.labelList.data.push(this.creatLabelInfo(i))
    }
    return this.labelList
  }
}

// eslint-disable-next-line new-cap
Mock.mock('/member/userList', new Member().MemberList())
Mock.mock('/member/labelList', new Member().labelsList())

// Mock.mock('/member/list', Mock.mock({"data|1-10":[
//   MemberList()
// ]}))
