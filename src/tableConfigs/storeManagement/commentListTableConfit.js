const tableConfig = {
  status: {
    isAllSet: true, // 全选
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
      name: 'delete', // 统计
      btn: '删除',
      style: {
        color: '#f56c6c'
      }
    }, {
      name: 'release', // 编辑
      btn: '发布',
      style: {}
    }
  ],
  tabHeadConfig: [{
    'cn-name': '会员ID', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'The member ID', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'memberId', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '会员姓名', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Member name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'memberName', // 该字段的key值
    'width': 80
  }, {
    'cn-name': '评论对象', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Comment object', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'idClerkName', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '评论分数', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Comment scores', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'grade', // 该字段的key值
    'width': 100
  }, {
    'cn-name': '评论内容', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Comment content', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'comment' // 该字段的key值
  }, {
    'cn-name': '评论图片', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Comment picture', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'picture' // 该字段的key值
  }, {
    'cn-name': '门店', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Store', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'store', // 该字段的key值
    'width': 100
  },
  {
    'cn-name': '评论时间', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Comment time', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': 100
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
