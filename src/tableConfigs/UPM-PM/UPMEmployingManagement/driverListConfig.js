const tableConfig = {
  status: {
    isAllSet: true, // 全选
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
    'cn-name': '司机ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'id', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id' // 该字段的key值
  }, {
    'cn-name': '所属车队', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'motorcadeName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'motorcadeName' // 该字段的key值
  }, {
    'cn-name': '司机姓名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值

  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phone' // 该字段的key值
  }, {
    'cn-name': '接单次数', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'orderCount', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'orderCount', // 该字段的key值
    'width': '200px'
  }, {
    'cn-name': '星级', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'starLevel', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'starLevel', // 该字段的key值
    'width': '200px'
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
