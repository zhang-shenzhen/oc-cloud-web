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
  tabHeadConfig: [{
    'cn-name': 'ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'ID', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id' // 该字段的key值
  }, {
    'cn-name': 'openID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'openid', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'openid' // 该字段的key值
  }, {
    'cn-name': '会员号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'memberCardNo', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'memberCardNo', // 该字段的key值
    'width': '120px;'
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phone', // 该字段的key值
    'width': '100px'
  }, {
    'cn-name': '中奖时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'recordTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'recordTime', // 该字段的key值
    'width': '100px'
  }, {
    'cn-name': '奖品类型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'startTime', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'startTime', // 该字段的key值
    'width': '150px'
  }, {
    'cn-name': '奖品等级', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'prizeLevel', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'prizeLevel', // 该字段的key值
    'width': '150px'
  }, {
    'cn-name': '奖品名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'prizeId', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'prizeId', // 该字段的key值
    'width': '80px'
  }, {
    'cn-name': '卡券code', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'couponCode', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'couponCode', // 该字段的key值
    'width': '100px'
  }, {
    'cn-name': '积分数量', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'integral', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'integral', // 该字段的key值
    'width': '100px'
  }]
}

export default tableConfig
