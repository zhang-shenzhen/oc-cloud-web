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
    'cn-name': '登录名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'id', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id' // 该字段的key值
  }, {
    'cn-name': '姓名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值
  }, {
    'cn-name': '时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'date' // 该字段的key值

  }, {
    'cn-name': '成本中心', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'tagGroupName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'tagGroupName' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'operating', // 该字段的key值
    'width': '150px'
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
