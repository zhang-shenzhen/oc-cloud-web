import {
  cookieGet
} from '@/common/cookie'
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
  // operating: [ // 操作字段
  //   {
  //     name: 'edit', // 编辑
  //     btn: '编辑',
  //     style: {}
  //   },
  //   // {
  //   //   name: 'launch', // 投放
  //   //   btn: '投放',
  //   //   style: {}
  //   // },
  //   {
  //     name: 'export', // 导出
  //     btn: '导出',
  //     style: {}
  //   },
  //   {
  //     name: 'details', // 详情
  //     btn: '详情',
  //     style: {}
  //   }, {
  //     name: 'delete', // 删除
  //     btn: '删除',
  //     style: {
  //       color: '#f56c6c'
  //     }
  //   }
  // ],
  tabHeadConfig: [{
    'cn-name': '编号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id', // 该字段的key值
    'width': 50
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
    'cn-name': '是否微信卡券', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Expiry date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'wechatFlagValue', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '卡券有效期', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Expiry date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'Expirydate', // 该字段的key值
    'width': 200 // 该列宽度
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
    'key': 'getCount' // 该字段的key值
  }, {
    'cn-name': '核销量', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'phoneNumber', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'consumeCount' // 该字段的key值
  }, {
    'cn-name': '上下架', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Stand up and down', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'opened' // 该字段的key值
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': 280 // 该列宽度
  }]
}
if (JSON.parse(cookieGet('Httpheader')).ChannelId == 20) {
  tableConfig.tabHeadConfig.splice(3, 1)
  tableConfig.tabHeadConfig.splice(4, 1)
  tableConfig.tabHeadConfig.splice(7, 2)
}
tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

// eslint-disable-next-line eol-last
export default tableConfig