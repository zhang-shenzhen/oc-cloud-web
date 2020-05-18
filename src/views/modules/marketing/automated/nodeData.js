const node = {
  list: [],
  list1: [],
  list2: [],
  object: {},
}
node.lineList = [
  {
    id: 1,
    name: '直线',
    icon: 'iconfont iconzhixian',
    check: true,
    type: 'Straight',
    line: [
      'Straight',
      {
        curviness: 50,
      },
    ],
  },
  {
    id: 2,
    name: '折线',
    check: false,
    icon: 'iconfont iconzhexiantu',
    type: 'Flowchart',
    line: [
      'Flowchart',
      {
        curviness: 50,
      },
    ],
  },
  {
    id: 3,
    name: '曲线',
    check: false,
    icon: 'iconfont iconquxian',
    type: 'Bezier',
    line: [
      'Bezier',
      {
        curviness: 50,
      },
    ],
  },
]
node.list = [
  {
    id: 1,
    name: '关注',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo wetchat',
    icon: 'iconfont iconweixin',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 2,
    name: '微信扫码',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo wetchat',
    icon: 'iconfont iconweixin',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 3,
    name: '点击菜单',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 4,
    name: '发送消息',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 6,
    name: '会员开卡',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 7,
    name: '订单变更',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 16,
    name: '会员注册',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 13,
    name: '自定义事件',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 17,
    name: '会员补全信息',
    type: '1',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
]

for (const idx in node.list) {
  const item = node.list[idx]
  node.object[item.id] = item
}

node.list1 = [
  {
    id: 20,
    name: '微信消息',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    type: '2',
    icon: 'iconfont iconweixin1',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 21,
    name: '短信消息',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconxiaoxi',
    type: '2',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 22,
    name: '模板消息',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconmobanxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 23,
    name: '打微信标签',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconbiaoqian1',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 24,
    name: '修改会员信息',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo  other',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 25,
    name: '发送卡券',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconkaika',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 26,
    name: '发积分',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconkaika',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
  {
    id: 27,
    name: '打自有标签',
    type: '2',
    classes: 'node-item other',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconbiaoqian1',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
]

for (const idx in node.list1) {
  const item = node.list1[idx]
  node.object[item.id] = item
}

node.list2 = [
  {
    id: 30,
    name: '属性判断',
    classes: 'node-item-icon-lin action',
    type: '3',
    classesDeo: 'node-item-lin',
    icon: 'lin-icon  iconfont iconshuxingpanduan',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Left',
        source: true,
        target: true,
        limit: 1,
      },
      {
        dir: 'Right',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Bottom', source: true, target: true, limit: -1 }
    ],
  },
  {
    id: 33,
    name: '会员建组',
    classes: 'node-item-icon-lin action',
    type: '3',
    classesDeo: 'node-item-lin',
    icon: 'lin-icon  iconfont iconshuxingpanduan',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Left',
        source: true,
        target: true,
        limit: 1,
      },
      {
        dir: 'Right',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Bottom', source: true, target: true, limit: -1 }
    ],
  },
]

for (const idx in node.list2) {
  const item = node.list2[idx]
  node.object[item.id] = item
}

node.list3 = [
  //  {
  //     id: 30,
  //     name: '属性判断',
  //     classes: 'node-item-icon-lin action',
  //     type:'2',
  //     classesDeo:'node-item-lin',
  //     icon: 'lin-icon  iconfont iconbiaoqian1',
  //     endpoints: [
  //       { dir: 'Top', source: true, target: true, limit: -1 },
  //       { dir: 'Left', source: true, target: true, limit: -1 },
  //       { dir: 'Right', source: true, target: true, limit: -1 },
  //       { dir: 'Bottom', source: true, target: true, limit: -1 }
  //     ]
  //   },
  {
    id: 31,
    name: '分支',
    classes: 'node-item-icon-lin action',
    type: '3',
    classesDeo: 'node-item-lin',
    icon: 'lin-icon  iconfont iconziyuanshuxing',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Left',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Right',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: -1,
      },
    ],
  },
  {
    id: 32,
    name: 'A/B测试',
    classes: 'node-item-icon-lin action',
    type: '3',
    classesDeo: 'node-item-lin',
    icon: 'lin-icon  iconfont iconzidonghua',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Left',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Right',
        source: true,
        target: true,
        limit: -1,
      },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: -1,
      },
    ],
  },
]
for (const idx in node.list3) {
  const item = node.list3[idx]
  node.object[item.id] = item
}

// 条件控制
node.list4 = [
  {
    id: 10,
    name: '开始',
    type: '1',
    classes: 'node-item  start',
    classesDeo: 'node-deo-start',
    icon: 'iconfont iconkaishi1',
    endpoints: [
      {
        dir: 'Bottom',
        source: true,
        target: false,
        limit: 1,
      },
    ],
  },
  {
    id: 11,
    name: '结束',
    type: '1',
    classes: 'node-item  end',
    classesDeo: 'node-deo other',
    icon: 'iconfont iconjieshu1',
    endpoints: [
      {
        dir: 'Top',
        source: false,
        target: true,
        limit: 1,
      },
    ],
  },
]
for (const idx in node.list4) {
  const item = node.list4[idx]
  node.object[item.id] = item
}

node.list5 = [
  {
    id: 100,
    name: '卡券到期提醒',
    type: '10',
    classes: 'node-item wetchat',
    classesDeo: 'node-deo  wetchat',
    icon: 'iconfont iconfasongxiaoxi',
    endpoints: [
      {
        dir: 'Top',
        source: true,
        target: true,
        limit: 1,
      },
      // { dir: 'Left', source: true, target: true, limit: -1 },
      // { dir: 'Right', source: true, target: true, limit: -1 },
      {
        dir: 'Bottom',
        source: true,
        target: true,
        limit: 1,
      },
    ],
  },
]
for (const idx in node.list5) {
  const item = node.list5[idx]
  node.object[item.id] = item
}
export default node
