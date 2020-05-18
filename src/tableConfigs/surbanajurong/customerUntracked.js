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
      name: 'update', // 编辑
      btn: "$t('update')",
      style: {}
    },
    {
      name: 'details', // 详情
      btn: "$t('look')",
      style: {}
    }, 
    {
      name: 'distribution', // 分配经理
      btn: "$t('distribution')",
      style: {
      }
    }
  ],
  tabHeadConfig: [{
    'cn-name': '编号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Number', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'num', // 该字段的key值
    'width': 50
  }, {
    'cn-name': '创建时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Creation time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': 170
  }, {
    'cn-name': '姓名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '公司类别', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Company category', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'companyType', // 该字段的key值
    'width': 240
  }, {
    'cn-name': '公司名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Corporate name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'companyName' ,// 该字段的key值
    'width': 240
  }, {
    'cn-name': '客户来源', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Customer source', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'source', // 该字段的key值
    'width': 240 // 该列宽度
  },{
    'cn-name': 'WeChatId', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'WeChat nickname', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'wechatName', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '手机号', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Phone number', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'phoneNumber', // 该字段的key值
    'width': 140
  },
  {
    'cn-name': '电话', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Telephone', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'mobilePhone', // 该字段的key值
    'width': 140
  },
  {
    'cn-name': '邮箱', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'E-mail', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'email', // 该字段的key值
    'width': 140
  }, {
    'cn-name': '职位', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'position', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'position', // 该字段的key值
    'width': 140
  }, 
  {
    'cn-name': '行业细分', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Industry segmentation', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'industrySegmentation', // 该字段的key值
    'width': 240 // 该列宽度
  }, 
  {
    'cn-name': '服务方式', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'service mode', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'service', // 该字段的key值
    'width': 240 // 该列宽度
  },
  {
    'cn-name': '集团名称', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Group name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'groupName', // 该字段的key值
    'width': 140
  },
  {
    'cn-name': '操作', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'operating', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'operating', // 该字段的key值
    'width': 150 // 该列宽度
  }]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
