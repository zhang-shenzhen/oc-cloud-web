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
    width: '100%',
    // height: 500
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
    }
  ],
  tabHeadConfig: [{
    'cn-name': '序号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'number', // 该字段的key值
    'width': 200
  },{
    'cn-name': '门店名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Name card vouchers', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' // 该字段的key值
  },
  {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': '230px' // 该列宽度
  }
  ]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
