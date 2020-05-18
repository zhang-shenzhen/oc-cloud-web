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
  operating: [],
  tabHeadConfig: [{
    'cn-name': 'No', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'No', // 英文名称
    'method': '', // 该字段携带方法 :1.sort排序 , 2.冻结该列, 3...
    'key': 'id', // 该字段的key值
    'width': 50
  }, {
    'cn-name': 'Project Type', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Type', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'type', // 该字段的key值
    'width': 170
  }, {
    'cn-name': 'Bind customers', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Bind customers', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'highSeasList', // 该字段的key值
    'width': 170
  }, 
  {
    'cn-name': 'Project Code', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Code', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'code', // 该字段的key值
    'width': 240
  }, {
    'cn-name': 'Project Name', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Name', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'name' ,// 该字段的key值
    'width': 240
  }, {
    'cn-name': 'Province', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Province', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'province', // 该字段的key值
    'width': 150 // 该列宽度
  }, {
    'cn-name': 'City', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'City', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'city', // 该字段的key值
    'width': 150
  }, {
    'cn-name': 'Type of Service', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Type of Service', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'serviceType', // 该字段的key值
    'width': 200
  }, {
    'cn-name': 'Project industry segment', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project industry segment', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'industrySegments', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'KAM or Not', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'KAM or Not', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'kam', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Pursuit Start Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Pursuit Start Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'pursuitStartDate', // 该字段的key值
    'width': 240
  }, {
    'cn-name': 'Project Start Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Start Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'projectStartDate', // 该字段的key值
    'width': 240
  }, 
  {
    'cn-name': 'Project End Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project End Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'projectEndDate', // 该字段的key值
    'width': 240 // 该列宽度
  }, 
  {
    'cn-name': 'Site Area (KM2) MP/ Park Project', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Site Area (KM2) MP/ Park Project', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'parkProject', // 该字段的key值
    'width': 240 // 该列宽度
  },
  {
    'cn-name': 'GFA(m2) Building Project', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'GFA(m2) Building Project', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'buildingProject', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Estimated Start Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Estimated Start Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'estimatedStartDate', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Estimated End Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Estimated End Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'estimatedEndDate', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Estimated Contract Sum', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Estimated Contract Sum', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'estimatedContractSum', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Probability of success', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Probability of success', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'probabilityOfSuccess', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Probability', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Probability', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'probability', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Date of secured', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Date of secured', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'dateOfSecured', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Project Feature in brief', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Feature in brief', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'projectFeatureInBrief', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Project Leader', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Project Leader', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'leaderName', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'BD Manager', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'BD Manager', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'managerName', // 该字段的key值
    'width': 240
  },
  {
    'cn-name': 'Creat Date', // 中文名称
    'type': 'string', // 数据类型
    'en-name': 'Creat Date', // 英文名称
    'method': '', // 该字段携带方法
    'key': 'createTime', // 该字段的key值
    'width': 240
  }]
}

tableConfig.tabHeadConfig.map((d, idx) => {
  d.id = idx + 1
})

export default tableConfig
