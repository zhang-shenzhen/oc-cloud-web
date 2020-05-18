const tableConfig = {
  status: {
    isAllSet: false, // 全选
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
    lookThis: {}, // 查看
    changeThis: {}, // 编辑
    delThis: {} // 删除
  },
  tabHeadConfig: [{
    'cn-name': '用户名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'name', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '用户操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'userOperation', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'userOperation', // 该字段的key值
    'width': 150
  }, {
    'cn-name': '请求连接', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'requestUrl', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'requestUrl', // 该字段的key值
    'width': 240
  }, {
    'cn-name': '请求方式', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'requestType', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'requestType', // 该字段的key值
    'width': 70
  }, {
    'cn-name': '操作IP', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operationIp', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'operationIp', // 该字段的key值
    'width': 150
  }, {
    'cn-name': 'User-Agent', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'userAgent', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'userAgent', // 该字段的key值
    'width': 340
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'createTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': 180
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
