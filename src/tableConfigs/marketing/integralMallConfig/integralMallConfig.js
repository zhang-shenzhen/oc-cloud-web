const tableConfig = {
  status: {
    change: true, //
    freeze: {
      // 冻结
      freezeTop: true, // 冻结头部
      freezeLeft: false, // 冻结首列
      freezeRight: true // 冻结尾列
    }
  },
  style: {
    width: '100%'
  },
  operating: {
    // 操作字段
    editThis: {}, // 编辑
    deleteThis: {} // 删除
  },
  tabHeadConfig: [
    {
      'cn-name': '商品名称', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'name', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'name' // 该字段的key值
      // 'width': 300
    },
    {
      'cn-name': '积分价格', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'integral', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'integral' // 该字段的key值
      // 'width': 80
    },
    {
      'cn-name': '已兑/可兑', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'sign_content', // 英文名称
      method: '', // 该字段携带方法
      key: 'sign_content' // 该字段的key值
      // 'width': 100
    },
    {
      'cn-name': '兑换时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'time', // 英文名称
      method: '', // 该字段携带方法
      key: 'time' // 该字段的key值
      // 'width': 150
    },
    {
      'cn-name': '状态', // 中文名称
      type: 'number', // 数据类型
      'en-name': 'statuss', // 英文名称
      method: '', // 该字段携带方法
      key: 'statuss' // 该字段的key值
      // 'width': 80
    },
    {
      'cn-name': '操作', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'operating', // 英文名称
      method: '', // 该字段携带方法
      key: 'operating', // 该字段的key值
      width: 230
    }
  ]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
