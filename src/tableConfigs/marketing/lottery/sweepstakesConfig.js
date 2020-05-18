const tableConfig = {
  status: {
    isAllSet: false, // 全选
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
      'cn-name': 'ID', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'ID', // 英文名称
      method: '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
      key: 'id' // 该字段的key值
    },
    {
      'cn-name': '活动名称', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'name', // 英文名称
      method: '', // 该字段携带方法
      key: 'name', // 该字段的key值
      'width': 120
    },
    {
      'cn-name': '总参与人次', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'maxLotteryTimes', // 英文名称
      method: '', // 该字段携带方法
      key: 'maxLotteryTimes' // 该字段的key值
    },
    {
      'cn-name': '当前参与人次', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'participantsNumber', // 英文名称
      method: '', // 该字段携带方法
      key: 'participantsNumber' // 该字段的key值
    },
    {
      'cn-name': '当前参与人数', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'personNumber', // 英文名称
      method: '', // 该字段携带方法
      key: 'personNumber', // 该字段的key值
      width: 100
    },
    {
      'cn-name': '开始时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'startTime', // 英文名称
      method: '', // 该字段携带方法
      key: 'startTime', // 该字段的key值
      width: 180
    },
    {
      'cn-name': '结束时间', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'endTime', // 英文名称
      method: '', // 该字段携带方法
      key: 'endTime', // 该字段的key值
      width: 180
    },
    {
      'cn-name': '状态', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'status', // 英文名称
      method: '', // 该字段携带方法
      key: 'status', // 该字段的key值
      width: 60
    },
    {
      'cn-name': '外链地址', // 中文名称
      type: 'string', // 数据类型
      'en-name': 'url', // 英文名称
      method: '', // 该字段携带方法
      key: 'url', // 该字段的key值
      width: 100
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

export default tableConfig
