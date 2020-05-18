const tableConfig = {
  status: {
    change: true, //
    freeze: { // 冻结
      freezeTop: true, // 冻结头部
      freezeLeft: false, // 冻结首列
      freezeRight: true // 冻结尾列
    }
  },
  style: {
    width: '100%'
  },
  tabHeadConfig: [{
    'cn-name': 'ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'ID', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '签名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'sign' // 该字段的key值
  }, {
    'cn-name': '审核状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'check_status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'check_status' // 该字段的key值
  }, {
    'cn-name': '未通过原因', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'remark', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'remark' // 该字段的key值
  }, {
    'cn-name': '所属子账号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'accountNick', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'accountNick' // 该字段的key值
  }, {
    'cn-name': '通道类型', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'chan', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'chan' // 该字段的key值
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
