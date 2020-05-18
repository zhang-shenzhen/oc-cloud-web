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
  operating: { // 操作字段
    lookThis: {}, // 查看
    changeThis: {}, // 编辑
    delThis: {} // 删除
  },
  tabHeadConfig: [ {
    'cn-name': '申请人', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'employeeName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'employeeName', // 该字段的key值
    'width': '60px;'
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'employeePhone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'employeePhone', // 该字段的key值
    'width': '140px;'
  }, {
    'cn-name': '乘车人数', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'peopleNumber', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'peopleNumber', // 该字段的key值
    'width': '80px;'
  }, {
    'cn-name': '用车时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'byCarTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'byCarTime', // 该字段的key值
    'width': '150px;'
  }, {
    'cn-name': '出发地', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'departurePlace', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'departurePlace', // 该字段的key值
    'width': '150px;'
  }, {
    'cn-name': '目的地', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'destinationPlace', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'destinationPlace', // 该字段的key值
    'width': '150px;'
  },{
    'cn-name': '部门', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'departmentName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'departmentName', // 该字段的key值
    'width': '150px;'
  },{
    'cn-name': '成本中心', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'costCenterNames', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'costCenterNames', // 该字段的key值
    'width': '150px;'
  }, {
    'cn-name': '车队信息', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'motorcadeName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'motorcadeName', // 该字段的key值
    'width': '140px'
  },  {
    'cn-name': '司机信息', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'driverName', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'driverName', // 该字段的key值
    'width': ''
  }, {
    'cn-name': '订单状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'status', // 该字段的key值
    'width': ''
  },  {
    'cn-name': '车型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'carModel', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'carModel', // 该字段的key值
    'width': ''
  },  {
    'cn-name': '车牌号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'carNumber', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'carNumber', // 该字段的key值
    'width': ''
  }, {
    'cn-name': '订单金额', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'price', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'price', // 该字段的key值
    'width': ''
  },{
    'cn-name': '订单编号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'orderNo', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'orderNo' // 该字段的key值
  },{
    'cn-name': '预定时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'createTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': '150px'
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'operating', // 该字段的key值
    'width': '150px'
  }]
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
