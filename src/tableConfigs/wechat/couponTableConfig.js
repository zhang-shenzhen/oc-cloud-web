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
      name: 'launch', // 投放
      btn: '投放',
      style: {}
    }, {
      name: 'details', // 详情
      btn: '详情',
      style: {}
    }, {
      name: 'delete', // 删除
      btn: '删除',
      style: {
        color: '#f56c6c'
      }
    }
  ],
  tabHeadConfig: [{
    'cn-name': 'ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '卡券编号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Card voucher number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'couponNumber' // 该字段的key值
  }, {
    'cn-name': '卡券名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Name card vouchers', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'title' // 该字段的key值
  }, {
    'cn-name': '卡券类型', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card voucher type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'cardTypeValue' // 该字段的key值
  }, {
    'cn-name': '卡券有效期', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Expiry date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'Expirydate', // 该字段的key值
    'width': 180 // 该列宽度
  }, {
    'cn-name': '卡券状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Card voucher status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'statusValue' // 该字段的key值
  }, {
    'cn-name': '库存', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Inventory', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'quantity' // 该字段的key值
  }, {
    'cn-name': '领取量', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Get the amount', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'getCount', // 该字段的key值
    'width': 70
  }, {
    'cn-name': '核销量', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phoneNumber', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'consumeCount', // 该字段的key值
    'width': 70
  }, {
    'cn-name': '卡券类别', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'birthday', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'category' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': 180 // 该列宽度
  }]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
