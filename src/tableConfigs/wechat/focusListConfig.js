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
    'cn-name': '编号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id' // 该字段的key值
  }, {
    'cn-name': '回复描述', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Menu group name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值
  }, {
    'cn-name': '状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'state', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'enabled' // 该字段的key值
  }, {
    'cn-name': '类型', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'current version', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'userStickiness' // 该字段的key值
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'CreateTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime' // 该字段的key值
  }, {
    'cn-name': '备注', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Remarks', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'description' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'operation', // 英文名称
    'method': '2', // 该字段携带方法
    'key': 'operating' // 该字段的key值
  }]
}

export default tableConfig
