const tableConfig = {
  status: {
    isAllSet: true, // 全选
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
    lookThis: {}, // 查看
    changeThis: {}, // 编辑
    delThis: {} // 删除
  },
  tabHeadConfig: [
    {
      'cn-name': '标签组', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'tagGroupName', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'tagGroupName', // 该字段的key值
      width: '200px'
    },
    {
      'cn-name': '表述', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'description', // 英文名称
      method: '', // 该字段携带方法
      key: 'description', // 该字段的key值
      width: '200px'
    },
    {
      'cn-name': '标签', // 中文名称
      type: 'Array', // 数据类型
      'en-name': 'list', // 英文名称
      method: '', // 该字段携带方法
      key: 'list', // 该字段的key值
      width: '300px'
    },
    {
      'cn-name': '标签数', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'listLength', // 英文名称
      method: '', // 该字段携带方法
      key: 'listLength', // 该字段的key值
      width: '150px'
    },
    {
      'cn-name': '更新时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'updateTime', // 英文名称
      method: '', // 该字段携带方法
      key: 'updateTime', // 该字段的key值
      width: '150px'
    },
    {
      'cn-name': '操作', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'operating', // 英文名称
      method: '', // 该字段携带方法
      key: 'operating2' // 该字段的key值
    }
  ]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
