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
  // operating:{           //操作字段
  //   lookThis:{},        //查看
  //   changeThis:{},      //编辑
  //   delThis:{},         //删除
  // },
  operating: [ // 操作字段
    {
      name: 'edit', // 编辑
      btn: '编辑',
      style: {}
    },
    {
      name: 'employees', // 下载
      btn: '店员',
      style: {}
    }, {
      name: 'delete', // 统计
      btn: '删除',
      style: {
        color: '#f56c6c'
      }
    }
  ],
  tabHeadConfig: [{
    'cn-name': '门店ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store ID', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'code', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '门店名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store Name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值
  }, {
    'cn-name': '门店层级', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store Level', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'storeTypeName' // 该字段的key值
  }, {
    'cn-name': '门店类型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'storeTypeName' // 该字段的key值
  }, {
    'cn-name': '联系人', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Contact', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'contact' // 该字段的key值
  }, {
    'cn-name': '联系电话', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Contact Phone Number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'telephone', // 该字段的key值
    'width': 150
  }, {
    'cn-name': '审核', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Audit', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'statusValue' // 该字段的key值
  },
  {
    'cn-name': '状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'enabled' // 该字段的key值
  },
  {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating' // 该字段的key值
  }
  ]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
