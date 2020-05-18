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
    'cn-name': '发送ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'sid', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'sid', // 该字段的key值
    'width': 120
  }, {
    'cn-name': '发送时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'send_time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'send_time', // 该字段的key值
    'width': 160
  }, {
    'cn-name': '发送状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'send_status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'send_status', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '发送内容', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'text', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'text' // 该字段的key值
  }, {
    'cn-name': '计费条数', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'fee', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'fee', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'mobile', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'mobile', // 该字段的key值
    'width': 120
  }, {
    'cn-name': '接收状态', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'report_status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'report_status', // 该字段的key值
    'width': 80
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
