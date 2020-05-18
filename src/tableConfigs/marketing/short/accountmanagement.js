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
  operating: { // 操作字段
    editThis: {}, // 编辑
    deleteThis: {} // 删除
  },
  tabHeadConfig: [{
    'cn-name': '账户名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'nick', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'nick' // 该字段的key值
  }, {
    'cn-name': '申请时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'gmtCreated', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'gmtCreated' // 该字段的key值
  }, {
    'cn-name': '账户类型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'type' // 该字段的key值
  }, {
    'cn-name': '发送数量', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'sendTotal', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'sendTotal' // 该字段的key值
  }, {
    'cn-name': '消耗金额', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'balance', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'balance' // 该字段的key值
  }, {
    'cn-name': '通道类型', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'type' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'operating' // 该字段的key值
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
