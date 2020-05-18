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
  defaultSort: { prop: 'date', order: 'descending' },
  style: {
    width: '100%',
    height: 480
  },
  operating: { // 操作字段
    lookThis: {}, // 查看
    changeThis: {}, // 编辑
    delThis: {} // 删除
  },
  tabHeadConfig: [{
    'cn-name': '用户名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'id', // 英文名称
    'method': '1', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'nickname' // 该字段的key值
  },
  {
    'cn-name': '所属部门', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'departmentName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'departmentName' // 该字段的key值
  }, {
    'cn-name': '邮箱', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'email' // 该字段的key值
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phone', // 英文名称
    'method': '1', // 该字段携带方法
    'key': 'phone' // 该字段的key值

  }, {
    'cn-name': '状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'tagGroupName', // 英文名称
    'method': '1', // 该字段携带方法
    'key': 'tagGroupName' // 该字段的key值
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'tagGroupName', // 英文名称
    'method': '1', // 该字段携带方法
    'key': 'tagGroupName' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'operating', // 该字段的key值
    'width': '150px'
  }
  ]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
