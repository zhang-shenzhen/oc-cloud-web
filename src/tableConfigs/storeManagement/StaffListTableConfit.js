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
    }, {
      name: 'delete', // 统计
      btn: '删除',
      style: {
        color: '#f56c6c'
      }
    }, {
      name: 'comment', // 评论
      btn: '评论',
      style: {}
    }, {
      name: 'order', // 预约
      btn: '预约',
      style: {}
    }
  ],
  tabHeadConfig: [{
    'cn-name': '店员ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Clerk ID', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'clerkId', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '店员名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Clerk Name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '店员号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Clerk Number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'clerkNumber' // 该字段的key值
  }, {
    'cn-name': '职位', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Position', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'position' // 该字段的key值
  }, {
    'cn-name': '门店', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Store', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'storeName', // 该字段的key值
    'width': 110
  }, {
    'cn-name': '联系电话', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Phone number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phone', // 该字段的key值
    'width': 150
  }, {
    'cn-name': '评级', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Ratings', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'grade' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': 250
  }
  ]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
