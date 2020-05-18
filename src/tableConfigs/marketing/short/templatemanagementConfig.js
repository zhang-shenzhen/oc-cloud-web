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
    'cn-name': 'ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'ID', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '模板内容', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'tpl_content', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'tpl_content', // 该字段的key值
    'width': 350
  }, {
    'cn-name': '签名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'sign_content', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'sign_content', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'create_time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'create_time', // 该字段的key值
    'width': 180
  }, {
    'cn-name': '审核状态', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'check_status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'check_status', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '未通过原因', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'reason', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'reason', // 该字段的key值
    'width': 300
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
