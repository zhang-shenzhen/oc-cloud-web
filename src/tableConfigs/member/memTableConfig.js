const tableConfig = {
  status: {
    isAllSet: true, // 全选
    change: true, //
    freeze: {
      // 冻结
      freezeTop: true, // 冻结头部
      freezeLeft: false, // 冻结首列
      freezeRight: true // 冻结尾列
    }
  },
  style: {
    width: '100%',
    height: 500
  },
  operating: {
    // 操作字段
    lookThis: {}, // 查看
    changeThis: {}, // 编辑
    delThis: {} // 删除
  },
  tabHeadConfig: [
    {
      'cn-name': '头像昵称', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'nickName', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'nickName', // 该字段的key值
      width: '260px'
    },
    {
      'cn-name': '会员ID', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'memberId', // 英文名称
      method: '', // 该字段携带方法
      key: 'memberId' // 该字段的key值
    },
    {
      'cn-name': '会员卡号', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'memberCardNumber', // 英文名称
      method: '', // 该字段携带方法
      key: 'memberCardNumber' // 该字段的key值
    },
    {
      'cn-name': '手机号', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'phoneNumber', // 英文名称
      method: '', // 该字段携带方法
      key: 'phoneNumber', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '性别', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'sex', // 英文名称
      method: '', // 该字段携带方法
      key: 'sex' // 该字段的key值
    },

    {
      'cn-name': '积分', // 中文名称
      type: 'number', // 数据类型
      'en-name': 'memberPoints', // 英文名称
      method: '1,2', // 该字段携带方法
      key: 'memberPoints' // 该字段的key值
    },
    {
      'cn-name': '微信关注时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'subscribeTimestamp', // 英文名称
      method: '', // 该字段携带方法
      key: 'subscribeTimestamp', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '系统注册时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'registerTime', // 英文名称
      method: '', // 该字段携带方法
      key: 'registerTime', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '所属品牌', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'formBrand', // 英文名称
      method: '', // 该字段携带方法
      key: 'formBrand', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '渠道来源', // 中文名称
      type: 'string', // 数据类型
      'en-name': '', // 英文名称
      method: '', // 该字段携带方法
      key: '', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '地区', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'address', // 英文名称
      method: '', // 该字段携带方法
      key: 'address', // 该字段的key值
      width: '160px'
    },
    // {
    //   "cn-name": "用户粘性", // 中文名称
    //   type: "number", // 数据类型
    //   "en-name": "viscosityScore", // 英文名称
    //   method: "1,2", // 该字段携带方法
    //   key: "viscosityScore", // 该字段的key值
    //   width: "120px"
    // },
    // {
    //   "cn-name": "会员价值", // 中文名称
    //   type: "number", // 数据类型
    //   "en-name": "valueScore", // 英文名称
    //   method: "1,2", // 该字段携带方法
    //   key: "valueScore", // 该字段的key值
    //   width: "120px"
    // },

    {
      'cn-name': '手机号归属地', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'phoneNumber area', // 英文名称
      method: '', // 该字段携带方法
      key: 'phoneNumberArea', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '生日', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'birthday', // 英文名称
      method: '', // 该字段携带方法
      key: 'birthday', // 该字段的key值
      width: '120px'
    },
    {
      'cn-name': '标签', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'tags', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'tags', // 该字段的key值
      width: '160px'
    }

    // {
    //   'cn-name': '操作', // 中文名称
    //   'type': 'string', // 数据类型
    //   'en-name': 'operating', // 英文名称
    //   'method': '', // 该字段携带方法
    //   'key': 'operating', // 该字段的key值
    //   'width': '150px'
    // }
  ]
}
//
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
