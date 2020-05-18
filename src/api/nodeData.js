const node = {
  list: [],
  list1: [],
  list2: [],
  object: {}
};

node.list = [
  {
    id: 1,
    name: "微信回复",
    type: "1",
    classes: "node-item wetchat",
    classesDeo: "node-deo",
    icon: "iconfont iconweixin",
    endpoints: [
      {
        dir: "Top",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Left",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Right",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Bottom",
        source: true,
        target: true,
        limit: -1
      }
    ]
  },
  {
    id: 2,
    name: "发短信",
    type: "1",
    classes: "node-item other",
    classesDeo: "node-deo",
    icon: "iconfont iconfasongxiaoxi",
    endpoints: [
      {
        dir: "Top",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Left",
        source: true,
        target: true,
        limit: -1
      },
      {
        id: 1,
        name: "微信回复",
        type: "1",
        classes: "node-item wetchat",
        classesDeo: "node-deo",
        icon: "iconfont iconweixin",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      },
      {
        id: 2,
        name: "发短信",
        type: "1",
        classes: "node-item other",
        classesDeo: "node-deo",
        icon: "iconfont iconfasongxiaoxi",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      },
      {
        id: 3,
        name: "发邮件",
        type: "1",
        classes: "node-item other",
        classesDeo: "node-deo",
        icon: "iconfont iconyoujian",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      },
      {
        id: 4,
        name: "客户属性",
        type: "1",
        classes: "node-item other",
        classesDeo: "node-deo",
        icon: "iconfont iconkehu1",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      },
      {
        id: 5,
        name: "模板消息",
        type: "1",
        classes: "node-item other",
        classesDeo: "node-deo",
        icon: "iconfont iconmobanxiaoxi",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      },
      {
        id: 6,
        name: "标签",
        type: "1",
        classes: "node-item other",
        classesDeo: "node-deo",
        icon: "iconfont iconbiaoqian1",
        endpoints: [
          { dir: "Top", source: true, target: true, limit: -1 },
          { dir: "Left", source: true, target: true, limit: -1 },
          { dir: "Right", source: true, target: true, limit: -1 },
          { dir: "Bottom", source: true, target: true, limit: -1 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "模板消息",
    type: "1",
    classes: "node-item other",
    classesDeo: "node-deo",
    icon: "iconfont iconmobanxiaoxi",
    endpoints: [
      {
        dir: "Top",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Left",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Right",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Bottom",
        source: true,
        target: true,
        limit: -1
      }
    ]
  },
  {
    id: 6,
    name: "标签",
    type: "1",
    classes: "node-item other",
    classesDeo: "node-deo",
    icon: "iconfont iconbiaoqian1",
    endpoints: [
      {
        dir: "Top",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Left",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Right",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Bottom",
        source: true,
        target: true,
        limit: -1
      }
    ]
  }
];

for (const idx in node.list) {
  const item = node.list[idx];
  node.object[item.id] = item;
}

// node.list1 = [
//   {
//     id: 7,
//     name: '属性判断',
//     classes: 'node-item',
//     classesDeo:'node-item-lin',
//      type:'2',
//     icon: 'iconfont icontongbujichengshuxing',
//     endpoints: [
//       { dir: 'Top', source: true, target: true, limit: -1 },
//       { dir: 'Left', source: true, target: true, limit: -1 },
//       { dir: 'Right', source: true, target: true, limit: -1 },
//       { dir: 'Bottom', source: true, target: true, limit: -1 }
//     ]
//   }, {
//     id: 8,
//     name: '事件判断',
//     classes: 'node-item',
//     classesDeo:'node-item-lin',
//     icon: 'iconfont iconshijianchaxun-',
//     type:'2',
//     endpoints: [
//       { dir: 'Top', source: true, target: true, limit: -1 },
//       { dir: 'Left', source: true, target: true, limit: -1 },
//       { dir: 'Right', source: true, target: true, limit: -1 },
//       { dir: 'Bottom', source: true, target: true, limit: -1 }
//     ]
//   },
//   {
//     id: 9,
//     name: '等待时间',
//     classes: 'node-item',
//     type:'2',
//     classesDeo:'node-item-lin',
//     icon: 'iconfont icondengdai',
//     endpoints: [
//       { dir: 'Top', source: true, target: true, limit: -1 },
//       { dir: 'Left', source: true, target: true, limit: -1 },
//       { dir: 'Right', source: true, target: true, limit: -1 },
//       { dir: 'Bottom', source: true, target: true, limit: -1 }
//     ]
//   }
// ]

node.list1 = [
  {
    id: 20,
    name: "微信消息",
    classes: "node-item-icon-lin  action",
    classesDeo: "node-item-lin",
    type: "2",
    icon: "lin-icon  iconfont iconweixin1",
    endpoints: [
      { dir: "Top", source: true, target: true, limit: -1 },
      { dir: "Left", source: true, target: true, limit: -1 },
      { dir: "Right", source: true, target: true, limit: -1 },
      { dir: "Bottom", source: true, target: true, limit: -1 }
    ]
  },
  {
    id: 21,
    name: "短信消息",
    classes: "node-item-icon-lin action",
    classesDeo: "node-item-lin",
    icon: "lin-icon iconfont iconxiaoxi",
    type: "2",
    endpoints: [
      { dir: "Top", source: true, target: true, limit: -1 },
      { dir: "Left", source: true, target: true, limit: -1 },
      { dir: "Right", source: true, target: true, limit: -1 },
      { dir: "Bottom", source: true, target: true, limit: -1 }
    ]
  },
  {
    id: 22,
    name: "模板消息",
    classes: "node-item-icon-lin action",
    type: "2",
    classesDeo: "node-item-lin",
    icon: "lin-icon iconfont iconmobanxiaoxi",
    endpoints: [
      { dir: "Top", source: true, target: true, limit: -1 },
      { dir: "Left", source: true, target: true, limit: -1 },
      { dir: "Right", source: true, target: true, limit: -1 },
      { dir: "Bottom", source: true, target: true, limit: -1 }
    ]
  },
  {
    id: 23,
    name: "打标签",
    classes: "node-item-icon-lin action",
    type: "2",
    classesDeo: "node-item-lin",
    icon: "lin-icon  iconfont iconbiaoqian1",
    endpoints: [
      { dir: "Top", source: true, target: true, limit: -1 },
      { dir: "Left", source: true, target: true, limit: -1 },
      { dir: "Right", source: true, target: true, limit: -1 },
      { dir: "Bottom", source: true, target: true, limit: -1 }
    ]
  }
];

for (const idx in node.list1) {
  const item = node.list1[idx];
  node.object[item.id] = item;
}

node.list2 = [
  {
    id: 10,
    name: "开始",
    type: "3",
    classes: "node-item  start",
    classesDeo: "node-deo",
    icon: "iconfont iconkaishi1",
    endpoints: [{ dir: "Bottom", source: true, target: false, limit: -1 }]
  },
  {
    id: 11,
    name: "结束",
    type: "3",
    classes: "node-item  end",
    classesDeo: "node-deo",
    icon: "iconfont iconjieshu1",
    endpoints: [{ dir: "Top", source: false, target: true, limit: 1 }]
  }
][
  {
    id: 23,
    name: "打标签",
    classes: "node-item-icon-lin action",
    type: "2",
    classesDeo: "node-item-lin",
    icon: "lin-icon  iconfont iconbiaoqian1",
    endpoints: [
      {
        dir: "Top",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Left",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Right",
        source: true,
        target: true,
        limit: -1
      },
      {
        dir: "Bottom",
        source: true,
        target: true,
        limit: -1
      }
    ]
  }
];

for (const idx in node.list1) {
  const item = node.list1[idx];
  node.object[item.id] = item;
}

node.list2 = [
  {
    id: 10,
    name: "开始",
    type: "3",
    classes: "node-item  start",
    classesDeo: "node-deo",
    icon: "iconfont iconkaishi1",
    endpoints: [
      {
        dir: "Bottom",
        source: true,
        target: false,
        limit: -1
      }
    ]
  },
  {
    id: 11,
    name: "结束",
    type: "3",
    classes: "node-item  end",
    classesDeo: "node-deo",
    icon: "iconfont iconjieshu1",
    endpoints: [
      {
        dir: "Top",
        source: false,
        target: true,
        limit: 1
      }
    ]
  }
];
for (const idx in node.list2) {
  const item = node.list2[idx];
  node.object[item.id] = item;
}

export default node;
