const tableConfig = {}
tableConfig.Message = {
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
      name: 'delete', // 删除
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
    'key': 'number' // 该字段的key值
  }, {
    'cn-name': '标题', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Card voucher number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'title' // 该字段的key值
  }, {
    'cn-name': '模板名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Name card vouchers', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'templateTitle' // 该字段的key值
  }, {
    'cn-name': '备注', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card voucher type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'description' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': '230px' // 该列宽度
  }]
}

tableConfig.Template = {
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
    // {
    //   name: 'choose', // 选择
    //   btn: '选择',
    //   style: {}
    // },
    // {
    //   name: 'details', // 详情
    //   btn: '详情',
    //   style: {}
    // },
    // {
    //   name: 'delete', // 删除
    //   btn: '删除',
    //   style: {
    //     color: '#f56c6c'
    //   }
    // }
  ],
  tabHeadConfig: [{
    'cn-name': '序号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'number', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '模板ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Card voucher number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'wechatTemplateId', // 该字段的key值
    'width': 400
  }, {
    'cn-name': '标题', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Name card vouchers', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'title' // 该字段的key值
  }, {
    'cn-name': '一级行业', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card voucher type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'mainIndustryName' // 该字段的key值
  }, {
    'cn-name': '二级行业', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card voucher type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'industryName' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': '230px' // 该列宽度
  }]
}

tableConfig.Template.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

tableConfig.Message.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
