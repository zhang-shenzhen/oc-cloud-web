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
    'cn-name': '车队ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'id', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id' // 该字段的key值
  }, {
    'cn-name': '车队名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值
  }, {
    'cn-name': '车队负责人', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'principalName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'principalName' // 该字段的key值

  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phone' // 该字段的key值
  }, {
    'cn-name': '司机人数', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'peopleNumber', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'peopleNumber', // 该字段的key值
    'width': '200px'
  }, {
    'cn-name': '保险照片', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'insuranceImage', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'insuranceImage', // 该字段的key值
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
