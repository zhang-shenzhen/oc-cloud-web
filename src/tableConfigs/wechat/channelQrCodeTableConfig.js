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
      name: 'download', // 下载
      btn: '下载',
      style: {}
    }, {
      name: 'statistical', // 统计
      btn: '统计',
      style: {}
    }
  ],
  tabHeadConfig: [{
    'cn-name': '序号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'number', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Title', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'title' // 该字段的key值
  }, {
    'cn-name': '类型', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'codeType' // 该字段的key值
  }, {
    'cn-name': '使用量', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Usage quantity', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'scanCount' // 该字段的key值
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'number', // 数据类型
    'en-name': 'Creation time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': 200 // 该列宽度
  }, {
    'cn-name': '失效时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Failure time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'expireTime', // 该字段的key值
    'width': 200 // 该列宽度
  }, {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': '230px' // 该列宽度
  }, {
    'cn-name': '二维码状态', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Status', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'enabled' // 该字段的key值
  }]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
