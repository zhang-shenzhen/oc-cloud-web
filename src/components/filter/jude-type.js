let filterObj = {} // 'registerTimeInt',
filterObj.memberArray = ['gender', 'memberData.orderTotal', 'subscribeTimeInt', 'memberData.orderPayTotal', 'memberData.orderAmount', 'memberData.orderAmountAvg', 'depositAmount']
filterObj.sunMoney = ['memberData.orderAmount', 'memberData.orderAmountAvg','depositAmount']
filterObj.tabledata = [{
    id: 26,
    number: -21,
    name: '累计充值金额',
    text: 'depositAmount',
    checked: false,
    child: [{
        id: 1,
        radio1: 3,
        name: '等于',
        type: 'radio'
      },
      {
        id: 9,
        radio1: 4,
        name: '不等于',
        type: 'radio'
      },
      {
        id: 5,
        radio1: 7,
        name: '大于',
        type: 'radio'
      },
      {
        id: 3,
        radio1: 5,
        name: '小于',
        type: 'radio'
      },
      {
        id: 103,
        name: '输入框',
        radio1: 19,
        textval: '',
        type: 'input',
        ishow: true,
      }, {
        id: 14,
        name: '',
        radio1: 8,
        type: 'modify',
      }
    ]
  },
  {
    id: 27,
    number: -22,
    name: '是否为充值用户',
    text: 'deposited',
    checked: false,
    child: [{
        id: 1,
        radio1: 3,
        name: '等于',
        type: 'radio'
      },
      {
        id: 103,
        name: '输入框',
        radio1: 17,
        textval: '',
        type: 'depositedRadio',
        ishow: true,
      }, {
        id: 14,
        name: '',
        radio1: 8,
        type: 'modify',
      }
    ]
  }
]
export default filterObj