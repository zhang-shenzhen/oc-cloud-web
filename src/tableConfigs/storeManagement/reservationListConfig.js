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
      name: 'Sign in', // 编辑
      btn: '签到',
      style: {}
    }, {
      name: 'delete', // 统计
      btn: '取消',
      style: {
        color: '#f56c6c'
      }
    }
  ],
  tabHeadConfig: [{
    'cn-name': '姓名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Name', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'memberName', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '性别', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Sex', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'sex', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Telephone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phone' // 该字段的key值
  }, {
    'cn-name': '卡号', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card Number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'card' // 该字段的key值
  }, {
    'cn-name': '卡类型', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Card Type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'cardType' // 该字段的key值
  }, {
    'cn-name': '门店', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'store' // 该字段的key值
  }, {
    'cn-name': '店员', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Clerk', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'clerk' // 该字段的key值
  },
  {
    'cn-name': '预约时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Appointment time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime' // 该字段的key值
  }, {
    'cn-name': '预约类型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Appointment type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'type' // 该字段的key值
  }, {
    'cn-name': '预约状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Appointment status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'state' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': '130px' // 该列宽度
  }
  ]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
