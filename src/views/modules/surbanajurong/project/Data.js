let node = {}
//服务类型
node.ServiceTypeList = [
  {id:1,label:'MP'},
  {id:2,label:'Conceptual MP'},
  {id:3,label:'Control/Detail Planning'},
  {id:4,label:'Urban Design'},
  {id:5,label:'Positioning Study'},
  {id:6,label:'Due Diligence'},
  {id:7,label:'Design'},
  {id:8,label:'Landscape Design'},
  {id:9,label:'Design Management'},
  {id:10,label:'PM'},
  {id:11,label:'CCM'},
  {id:12,label:'Sustainability/Environmental'},
  {id:13,label:'Facilities Management'},
  {id:14,label:'BIM'},
]

//行业细分
node.IndustryTypeList = [
  {id:1,label:'Healthcare(医院，养老，医疗，生命科学)'},
  {id:2,label:'TOD(公共交通枢纽为主导的项目)'},
  {id:3,label:'Hi-tech Park/Industrial Park(工业园区，产业园区，高新技术园区，产城融合项目)'},
  {id:4,label:'Mixed development(集商业，办公，住宅开发于一体)'},
  {id:5,label:'Public Housing(公租房，公共组屋开发的项目)'},
  {id:6,label:'Commercial Housing(商品房开发的项目)'},
  {id:7,label:'Aviation（以航空产业为主导，请选择）'},
  {id:8,label:'Infrastructure（以基础设施包括道路，桥梁等为主导的项目，请选择）'},
  {id:9,label:'Oil & gas（以气体，石油产业为主导的项目，请选择）'},
  {id:10,label:'Cultural Tourism（以文化，旅游,剧院，运动产业为主导的项目，请选择）'},
  {id:11,label:'Commercial / Office(商用或者办公为主导的项目)'},
  {id:12,label:'Hotel(以酒店为主导的项目，请选择)'},
  {id:13,label:'School(以学校，学院，教育主题为主导的项目，请选择)'}
]

//概率
node.ProbabilityList = [
  {id:1,label:'High（contract signing or under discussion）'},
  {id:2,label:'Medium（fee proposal submitted）'},
  {id:3,label:'Low（new client, initial stage）'}
]

//成功概率
node.SuccessProbabilityList = [
  {id:1,label:'100%（contract signed）'},
  {id:2,label:'80%（contract discussion）'},
  {id:3,label:'50%（proposal submission）'},
  {id:4,label:'10%（preliminary stage/Lead）'}
]

//跟踪状态
node.PursuitStatusList = [
  {id:1,label:'First contact /Initial Stage'},
  {id:2,label:'Tender'},
  {id:3,label:'Proposal Discussion'},
  {id:4,label:'Negotiation'},
  {id:5,label:'Contract signing'}
]

//省市
node.cityList = [{
  "value": "1",
  "label": "Beijing",
  "children": [{
      "value": "375",
      "label": "Dongchengqu"
    },
    {
      "value": "376",
      "label": "Xichengqu"
    },
    {
      "value": "377",
      "label": "Chaoyangqu"
    },
    {
      "value": "378",
      "label": "Fengtaiqu"
    },
    {
      "value": "379",
      "label": "Shijingshanqu"
    },
    {
      "value": "380",
      "label": "Haidianqu"
    },
    {
      "value": "381",
      "label": "Mentougouqu"
    },
    {
      "value": "382",
      "label": "Fangshanqu"
    },
    {
      "value": "383",
      "label": "Tongzhouqu"
    },
    {
      "value": "384",
      "label": "Shunyiqu"
    },
    {
      "value": "385",
      "label": "Changpingqu"
    },
    {
      "value": "386",
      "label": "Daxingqu"
    },
    {
      "value": "387",
      "label": "Huairouqu"
    },
    {
      "value": "388",
      "label": "Pingguqu"
    },
    {
      "value": "389",
      "label": "Miyunqu"
    },
    {
      "value": "390",
      "label": "Yanqingqu"
    }
  ]
}, {
  "value": "2",
  "label": "Tianjin",
  "children": [{
      "value": "391",
      "label": "Hepingqu"
    },
    {
      "value": "392",
      "label": "Hedongqu"
    },
    {
      "value": "393",
      "label": "Hexiqu"
    },
    {
      "value": "394",
      "label": "Nankaiqu"
    },
    {
      "value": "395",
      "label": "Hebeiqu"
    },
    {
      "value": "396",
      "label": "Hongqiaoqu"
    },
    {
      "value": "397",
      "label": "Dongliqu"
    },
    {
      "value": "398",
      "label": "Xiqingqu"
    },
    {
      "value": "399",
      "label": "Jinnanqu"
    },
    {
      "value": "400",
      "label": "Beichenqu"
    },
    {
      "value": "401",
      "label": "Wuqingqu"
    },
    {
      "value": "402",
      "label": "Baodiqu"
    },
    {
      "value": "403",
      "label": "Binhaixinqu"
    },
    {
      "value": "404",
      "label": "Ninghequ"
    },
    {
      "value": "405",
      "label": "Jinghaiqu"
    },
    {
      "value": "406",
      "label": "Jizhouqu"
    }
  ]
}, {
  "value": "3",
  "label": "Hebei",
  "children": [{
      "value": "34",
      "label": "Shijiazhuang"
    },
    {
      "value": "35",
      "label": "Tangshan"
    },
    {
      "value": "36",
      "label": "Qinhuangdao"
    },
    {
      "value": "37",
      "label": "Handan"
    },
    {
      "value": "38",
      "label": "Xingtai"
    },
    {
      "value": "39",
      "label": "Baoding"
    },
    {
      "value": "40",
      "label": "Zhangjiakou"
    },
    {
      "value": "41",
      "label": "Chengde"
    },
    {
      "value": "42",
      "label": "Cangzhou"
    },
    {
      "value": "43",
      "label": "Langfang"
    },
    {
      "value": "44",
      "label": "Hengshui"
    }
  ]
}, {
  "value": "4",
  "label": "Shanxi",
  "children": [{
      "value": "45",
      "label": "Taiyuan"
    },
    {
      "value": "46",
      "label": "Datong"
    },
    {
      "value": "47",
      "label": "Yangquan"
    },
    {
      "value": "48",
      "label": "Changzhi"
    },
    {
      "value": "49",
      "label": "Jincheng"
    },
    {
      "value": "50",
      "label": "Shuozhou"
    },
    {
      "value": "51",
      "label": "Jinzhong"
    },
    {
      "value": "52",
      "label": "Yuncheng"
    },
    {
      "value": "53",
      "label": "Xinzhou"
    },
    {
      "value": "54",
      "label": "Linfen"
    },
    {
      "value": "55",
      "label": "Lvliang"
    }
  ]
}, {
  "value": "5",
  "label": "Namenggu",
  "children": [{
      "value": "56",
      "label": "Huhehaote"
    },
    {
      "value": "57",
      "label": "Baotou"
    },
    {
      "value": "58",
      "label": "Wuhai"
    },
    {
      "value": "59",
      "label": "Chifeng"
    },
    {
      "value": "60",
      "label": "Tongliao"
    },
    {
      "value": "61",
      "label": "Eerduosi"
    },
    {
      "value": "62",
      "label": "Hulunbeier"
    },
    {
      "value": "63",
      "label": "Bayanneer"
    },
    {
      "value": "64",
      "label": "Wulanchabu"
    },
    {
      "value": "65",
      "label": "Xinganmeng"
    },
    {
      "value": "66",
      "label": "Xilinguolemeng"
    },
    {
      "value": "67",
      "label": "Alashanmeng"
    }
  ]
}, {
  "value": "6",
  "label": "Liaoning",
  "children": [{
      "value": "68",
      "label": "Shenyang"
    },
    {
      "value": "69",
      "label": "Dalian"
    },
    {
      "value": "70",
      "label": "Anshan"
    },
    {
      "value": "71",
      "label": "Fushun"
    },
    {
      "value": "72",
      "label": "Benxi"
    },
    {
      "value": "73",
      "label": "Dandong"
    },
    {
      "value": "74",
      "label": "Jinzhou"
    },
    {
      "value": "75",
      "label": "Yingkou"
    },
    {
      "value": "76",
      "label": "Fuxin"
    },
    {
      "value": "77",
      "label": "Liaoyang"
    },
    {
      "value": "78",
      "label": "Panjin"
    },
    {
      "value": "79",
      "label": "Tieling"
    },
    {
      "value": "80",
      "label": "Chaoyang"
    },
    {
      "value": "81",
      "label": "Huludao"
    }
  ]
}, {
  "value": "7",
  "label": "Jilin",
  "children": [{
      "value": "82",
      "label": "Changchun"
    },
    {
      "value": "83",
      "label": "Jilin"
    },
    {
      "value": "84",
      "label": "Siping"
    },
    {
      "value": "85",
      "label": "Liaoyuan"
    },
    {
      "value": "86",
      "label": "Tonghua"
    },
    {
      "value": "87",
      "label": "Baishan"
    },
    {
      "value": "88",
      "label": "Songyuan"
    },
    {
      "value": "89",
      "label": "Baicheng"
    },
    {
      "value": "90",
      "label": "Yanbianchaoxianzuzizhizhou"
    }
  ]
}, {
  "value": "8",
  "label": "Heilongjiang",
  "children": [{
      "value": "91",
      "label": "Haerbin"
    },
    {
      "value": "92",
      "label": "Qiqihaer"
    },
    {
      "value": "93",
      "label": "Jixi"
    },
    {
      "value": "94",
      "label": "Hegang"
    },
    {
      "value": "95",
      "label": "Shuangyashan"
    },
    {
      "value": "96",
      "label": "Daqing"
    },
    {
      "value": "97",
      "label": "Yichun"
    },
    {
      "value": "98",
      "label": "Jiamusi"
    },
    {
      "value": "99",
      "label": "Qitaihe"
    },
    {
      "value": "100",
      "label": "Mudanjiang"
    },
    {
      "value": "101",
      "label": "Heihe"
    },
    {
      "value": "102",
      "label": "Suihua"
    },
    {
      "value": "103",
      "label": "Daxinganlingdiqu"
    }
  ]
}, {
  "value": "9",
  "label": "Shanghai",
  "children": [{
      "value": "1135",
      "label": "Huangpuqu"
    },
    {
      "value": "1136",
      "label": "Xuhuiqu"
    },
    {
      "value": "1137",
      "label": "Changningqu"
    },
    {
      "value": "1138",
      "label": "Jinganqu"
    },
    {
      "value": "1139",
      "label": "Putuoqu"
    },
    {
      "value": "1140",
      "label": "Hongkouqu"
    },
    {
      "value": "1141",
      "label": "Yangpuqu"
    },
    {
      "value": "1142",
      "label": "Minxingqu"
    },
    {
      "value": "1143",
      "label": "Baoshanqu"
    },
    {
      "value": "1144",
      "label": "Jiadingqu"
    },
    {
      "value": "1145",
      "label": "Pudongxinqu"
    },
    {
      "value": "1146",
      "label": "Jinshanqu"
    },
    {
      "value": "1147",
      "label": "Songjiangqu"
    },
    {
      "value": "1148",
      "label": "Qingpuqu"
    },
    {
      "value": "1149",
      "label": "Fengxianqu"
    },
    {
      "value": "1150",
      "label": "Chongmingqu"
    }
  ]
}, {
  "value": "10",
  "label": "Jiangsu",
  "children": [{
      "value": "105",
      "label": "Nanjing"
    },
    {
      "value": "106",
      "label": "Wuxi"
    },
    {
      "value": "107",
      "label": "Xuzhou"
    },
    {
      "value": "108",
      "label": "Changzhou"
    },
    {
      "value": "109",
      "label": "Suzhou"
    },
    {
      "value": "110",
      "label": "Nantong"
    },
    {
      "value": "111",
      "label": "Lianyungang"
    },
    {
      "value": "112",
      "label": "Huaian"
    },
    {
      "value": "113",
      "label": "Yancheng"
    },
    {
      "value": "114",
      "label": "Yangzhou"
    },
    {
      "value": "115",
      "label": "Zhenjiang"
    },
    {
      "value": "116",
      "label": "Taizhou"
    },
    {
      "value": "117",
      "label": "Suqian"
    }
  ]
}, {
  "value": "11",
  "label": "Zhejiang",
  "children": [{
      "value": "118",
      "label": "Hangzhou"
    },
    {
      "value": "119",
      "label": "Ningbo"
    },
    {
      "value": "120",
      "label": "Wenzhou"
    },
    {
      "value": "121",
      "label": "Jiaxing"
    },
    {
      "value": "122",
      "label": "Huzhou"
    },
    {
      "value": "123",
      "label": "Shaoxing"
    },
    {
      "value": "124",
      "label": "Jinhua"
    },
    {
      "value": "125",
      "label": "Quzhou"
    },
    {
      "value": "126",
      "label": "Zhoushan"
    },
    {
      "value": "127",
      "label": "Taizhou"
    },
    {
      "value": "128",
      "label": "Lishui"
    }
  ]
}, {
  "value": "12",
  "label": "Anhui",
  "children": [{
      "value": "129",
      "label": "Hefei"
    },
    {
      "value": "130",
      "label": "Wuhu"
    },
    {
      "value": "131",
      "label": "Bangbu"
    },
    {
      "value": "132",
      "label": "Huainan"
    },
    {
      "value": "133",
      "label": "Maanshan"
    },
    {
      "value": "134",
      "label": "Huaibei"
    },
    {
      "value": "135",
      "label": "Tongling"
    },
    {
      "value": "136",
      "label": "Anqing"
    },
    {
      "value": "137",
      "label": "Huangshan"
    },
    {
      "value": "138",
      "label": "Chuzhou"
    },
    {
      "value": "139",
      "label": "Fuyang"
    },
    {
      "value": "140",
      "label": "Suzhou"
    },
    {
      "value": "141",
      "label": "Liuan"
    },
    {
      "value": "142",
      "label": "Bozhou"
    },
    {
      "value": "143",
      "label": "Chizhou"
    },
    {
      "value": "144",
      "label": "Xuancheng"
    }
  ]
}, {
  "value": "13",
  "label": "Fujian",
  "children": [{
      "value": "145",
      "label": "Fuzhou"
    },
    {
      "value": "146",
      "label": "Xiamen"
    },
    {
      "value": "147",
      "label": "Putian"
    },
    {
      "value": "148",
      "label": "Sanming"
    },
    {
      "value": "149",
      "label": "Quanzhou"
    },
    {
      "value": "150",
      "label": "Zhangzhou"
    },
    {
      "value": "151",
      "label": "Nanping"
    },
    {
      "value": "152",
      "label": "Longyan"
    },
    {
      "value": "153",
      "label": "Ningde"
    }
  ]
}, {
  "value": "14",
  "label": "Jiangxi",
  "children": [{
      "value": "154",
      "label": "Nanchang"
    },
    {
      "value": "155",
      "label": "Jingdezhen"
    },
    {
      "value": "156",
      "label": "Pingxiang"
    },
    {
      "value": "157",
      "label": "Jiujiang"
    },
    {
      "value": "158",
      "label": "Xinyu"
    },
    {
      "value": "159",
      "label": "Yingtan"
    },
    {
      "value": "160",
      "label": "Ganzhou"
    },
    {
      "value": "161",
      "label": "Jian"
    },
    {
      "value": "162",
      "label": "Yichun"
    },
    {
      "value": "163",
      "label": "Fuzhou"
    },
    {
      "value": "164",
      "label": "Shangrao"
    }
  ]
}, {
  "value": "15",
  "label": "Shandong",
  "children": [{
      "value": "165",
      "label": "Jinan"
    },
    {
      "value": "166",
      "label": "Qingdao"
    },
    {
      "value": "167",
      "label": "Zibo"
    },
    {
      "value": "168",
      "label": "Zaozhuang"
    },
    {
      "value": "169",
      "label": "Dongying"
    },
    {
      "value": "170",
      "label": "Yantai"
    },
    {
      "value": "171",
      "label": "Weifang"
    },
    {
      "value": "172",
      "label": "Jining"
    },
    {
      "value": "173",
      "label": "Taian"
    },
    {
      "value": "174",
      "label": "Weihai"
    },
    {
      "value": "175",
      "label": "Rizhao"
    },
    {
      "value": "176",
      "label": "Laiwu"
    },
    {
      "value": "177",
      "label": "Linyi"
    },
    {
      "value": "178",
      "label": "Dezhou"
    },
    {
      "value": "179",
      "label": "Liaocheng"
    },
    {
      "value": "180",
      "label": "Binzhou"
    },
    {
      "value": "181",
      "label": "Heze"
    }
  ]
}, {
  "value": "16",
  "label": "Henan",
  "children": [{
      "value": "182",
      "label": "Zhengzhou"
    },
    {
      "value": "183",
      "label": "Kaifeng"
    },
    {
      "value": "184",
      "label": "Luoyang"
    },
    {
      "value": "185",
      "label": "Pingdingshan"
    },
    {
      "value": "186",
      "label": "Anyang"
    },
    {
      "value": "187",
      "label": "Hebi"
    },
    {
      "value": "188",
      "label": "Xinxiang"
    },
    {
      "value": "189",
      "label": "Jiaozuo"
    },
    {
      "value": "190",
      "label": "Puyang"
    },
    {
      "value": "191",
      "label": "Xuchang"
    },
    {
      "value": "192",
      "label": "Leihe"
    },
    {
      "value": "193",
      "label": "Sanmenxia"
    },
    {
      "value": "194",
      "label": "Nanyang"
    },
    {
      "value": "195",
      "label": "Shangqiu"
    },
    {
      "value": "196",
      "label": "Xinyang"
    },
    {
      "value": "197",
      "label": "Zhoukou"
    },
    {
      "value": "198",
      "label": "Zhumadian"
    },
    {
      "value": "199",
      "label": "Zhixiaxianjixingzhengquhua"
    }
  ]
}, {
  "value": "17",
  "label": "Hubei",
  "children": [{
      "value": "200",
      "label": "Wuhan"
    },
    {
      "value": "201",
      "label": "Huangshi"
    },
    {
      "value": "202",
      "label": "Shiyan"
    },
    {
      "value": "203",
      "label": "Yichang"
    },
    {
      "value": "204",
      "label": "Xiangyang"
    },
    {
      "value": "205",
      "label": "Ezhou"
    },
    {
      "value": "206",
      "label": "Jingmen"
    },
    {
      "value": "207",
      "label": "Xiaogan"
    },
    {
      "value": "208",
      "label": "Jingzhou"
    },
    {
      "value": "209",
      "label": "Huanggang"
    },
    {
      "value": "210",
      "label": "Xianning"
    },
    {
      "value": "211",
      "label": "Suizhou"
    },
    {
      "value": "212",
      "label": "Enshitujiazumiaozuzizhizhou"
    },
    {
      "value": "213",
      "label": "Zhixiaxianjixingzhengquhua"
    }
  ]
}, {
  "value": "18",
  "label": "Hunan",
  "children": [{
      "value": "214",
      "label": "Changsha"
    },
    {
      "value": "215",
      "label": "Zhuzhou"
    },
    {
      "value": "216",
      "label": "Xiangtan"
    },
    {
      "value": "217",
      "label": "Hengyang"
    },
    {
      "value": "218",
      "label": "Shaoyang"
    },
    {
      "value": "219",
      "label": "Yueyang"
    },
    {
      "value": "220",
      "label": "Changde"
    },
    {
      "value": "221",
      "label": "Zhangjiajie"
    },
    {
      "value": "222",
      "label": "Yiyang"
    },
    {
      "value": "223",
      "label": "Chenzhou"
    },
    {
      "value": "224",
      "label": "Yongzhou"
    },
    {
      "value": "225",
      "label": "Huaihua"
    },
    {
      "value": "226",
      "label": "Loudi"
    },
    {
      "value": "227",
      "label": "Xiangxitujiazumiaozuzizhizhou"
    }
  ]
}, {
  "value": "19",
  "label": "Guangdong",
  "children": [{
      "value": "228",
      "label": "Guangzhou"
    },
    {
      "value": "229",
      "label": "Shaoguan"
    },
    {
      "value": "230",
      "label": "Shenzhen"
    },
    {
      "value": "231",
      "label": "Zhuhai"
    },
    {
      "value": "232",
      "label": "Shantou"
    },
    {
      "value": "233",
      "label": "Fushan"
    },
    {
      "value": "234",
      "label": "Jiangmen"
    },
    {
      "value": "235",
      "label": "Zhanjiang"
    },
    {
      "value": "236",
      "label": "Maoming"
    },
    {
      "value": "237",
      "label": "Zhaoqing"
    },
    {
      "value": "238",
      "label": "Huizhou"
    },
    {
      "value": "239",
      "label": "Meizhou"
    },
    {
      "value": "240",
      "label": "Shanwei"
    },
    {
      "value": "241",
      "label": "Heyuan"
    },
    {
      "value": "242",
      "label": "Yangjiang"
    },
    {
      "value": "243",
      "label": "Qingyuan"
    },
    {
      "value": "244",
      "label": "Dongguan"
    },
    {
      "value": "245",
      "label": "Zhongshan"
    },
    {
      "value": "246",
      "label": "Chaozhou"
    },
    {
      "value": "247",
      "label": "Jieyang"
    },
    {
      "value": "248",
      "label": "Yunfu"
    }
  ]
}, {
  "value": "20",
  "label": "Guangxi",
  "children": [{
      "value": "249",
      "label": "Nanning"
    },
    {
      "value": "250",
      "label": "Liuzhou"
    },
    {
      "value": "251",
      "label": "Guilin"
    },
    {
      "value": "252",
      "label": "Wuzhou"
    },
    {
      "value": "253",
      "label": "Beihai"
    },
    {
      "value": "254",
      "label": "Fangchenggang"
    },
    {
      "value": "255",
      "label": "Qinzhou"
    },
    {
      "value": "256",
      "label": "Guigang"
    },
    {
      "value": "257",
      "label": "Yulin"
    },
    {
      "value": "258",
      "label": "Baise"
    },
    {
      "value": "259",
      "label": "Hezhou"
    },
    {
      "value": "260",
      "label": "Hechi"
    },
    {
      "value": "261",
      "label": "Laibin"
    },
    {
      "value": "262",
      "label": "Chongzuo"
    }
  ]
}, {
  "value": "21",
  "label": "Hainan",
  "children": [{
      "value": "263",
      "label": "Haikou"
    },
    {
      "value": "264",
      "label": "Sanya"
    },
    {
      "value": "265",
      "label": "Sansha"
    },
    {
      "value": "266",
      "label": "Danzhou"
    },
    {
      "value": "267",
      "label": "Zhixiaxianjixingzhengquhua"
    }
  ]
}, {
  "value": "22",
  "label": "ChongQing",
  "children": [{
    "value": "2497",
    "label": "Wanzhouqu"
  }, {
    "value": "2498",
    "label": "Fulingqu"
  }, {
    "value": "2499",
    "label": "Yuzhongqu"
  }, {
    "value": "2500",
    "label": "Dadukouqu"
  }, {
    "value": "2501",
    "label": "Jiangbeiqu"
  }, {
    "value": "2502",
    "label": "Shapingbaqu"
  }, {
    "value": "2503",
    "label": "Jiulongpoqu"
  }, {
    "value": "2504",
    "label": "Nananqu"
  }, {
    "value": "2505",
    "label": "Beibeiqu"
  }, {
    "value": "2506",
    "label": "Qijiangqu"
  }, {
    "value": "2507",
    "label": "Dazuqu"
  }, {
    "value": "2508",
    "label": "Yubeiqu"
  }, {
    "value": "2509",
    "label": "Bananqu"
  }, {
    "value": "2510",
    "label": "Qianjiangqu"
  }, {
    "value": "2511",
    "label": "Changshouqu"
  }, {
    "value": "2512",
    "label": "Jiangjinqu"
  }, {
    "value": "2513",
    "label": "Hechuanqu"
  }, {
    "value": "2514",
    "label": "Yongchuanqu"
  }, {
    "value": "2515",
    "label": "Nanchuanqu"
  }, {
    "value": "2516",
    "label": "Bishanqu"
  }, {
    "value": "2517",
    "label": "Tongliangqu"
  }, {
    "value": "2518",
    "label": "Tongnanqu"
  }, {
    "value": "2519",
    "label": "Rongchangqu"
  }, {
    "value": "2520",
    "label": "Kaizhouqu"
  }, {
    "value": "2521",
    "label": "Liangpingqu"
  }, {
    "value": "2522",
    "label": "Wulongqu"
  }]
}, {
  "value": "23",
  "label": "Sichuan",
  "children": [{
    "value": "270",
    "label": "Chengdu"
  }, {
    "value": "271",
    "label": "Zigong"
  }, {
    "value": "272",
    "label": "Panzhihua"
  }, {
    "value": "273",
    "label": "Luzhou"
  }, {
    "value": "274",
    "label": "Deyang"
  }, {
    "value": "275",
    "label": "Mianyang"
  }, {
    "value": "276",
    "label": "Guangyuan"
  }, {
    "value": "277",
    "label": "Suining"
  }, {
    "value": "278",
    "label": "Najiang"
  }, {
    "value": "279",
    "label": "Leshan"
  }, {
    "value": "280",
    "label": "Nanchong"
  }, {
    "value": "281",
    "label": "Meishan"
  }, {
    "value": "282",
    "label": "Yibin"
  }, {
    "value": "283",
    "label": "Guangan"
  }, {
    "value": "284",
    "label": "Dazhou"
  }, {
    "value": "285",
    "label": "Yaan"
  }, {
    "value": "286",
    "label": "Bazhong"
  }, {
    "value": "287",
    "label": "Ziyang"
  }, {
    "value": "288",
    "label": "Abacangzuqiangzuzizhizhou"
  }, {
    "value": "289",
    "label": "Ganzicangzuzizhizhou"
  }, {
    "value": "290",
    "label": "Liangshanyizuzizhizhou"
  }]
}, {
  "value": "24",
  "label": "Guizhou",
  "children": [{
    "value": "291",
    "label": "Guiyang"
  }, {
    "value": "292",
    "label": "Liupanshui"
  }, {
    "value": "293",
    "label": "Zunyi"
  }, {
    "value": "294",
    "label": "Anshun"
  }, {
    "value": "295",
    "label": "Bijie"
  }, {
    "value": "296",
    "label": "Tongren"
  }, {
    "value": "297",
    "label": "Qianxinanbuyizumiaozuzizhizhou"
  }, {
    "value": "298",
    "label": "Qiandongnanmiaozudongzuzizhizhou"
  }, {
    "value": "299",
    "label": "Qiannanbuyizumiaozuzizhizhou"
  }]
}, {
  "value": "25",
  "label": "Yunnan",
  "children": [{
    "value": "300",
    "label": "Kunming"
  }, {
    "value": "301",
    "label": "Qujing"
  }, {
    "value": "302",
    "label": "Yuxi"
  }, {
    "value": "303",
    "label": "Baoshan"
  }, {
    "value": "304",
    "label": "Zhaotong"
  }, {
    "value": "305",
    "label": "Lijiang"
  }, {
    "value": "306",
    "label": "Puer"
  }, {
    "value": "307",
    "label": "Lincang"
  }, {
    "value": "308",
    "label": "Chuxiongyizuzizhizhou"
  }, {
    "value": "309",
    "label": "Honghehanizuyizuzizhizhou"
  }, {
    "value": "310",
    "label": "Wenshanzhuangzumiaozuzizhizhou"
  }, {
    "value": "311",
    "label": "Xishuangbannadaizuzizhizhou"
  }, {
    "value": "312",
    "label": "Dalibaizuzizhizhou"
  }, {
    "value": "313",
    "label": "Dehongdaizujingpozuzizhizhou"
  }, {
    "value": "314",
    "label": "Nujianglisuzuzizhizhou"
  }, {
    "value": "315",
    "label": "Diqingcangzuzizhizhou"
  }]
}, {
  "value": "26",
  "label": "Xizang",
  "children": [{
    "value": "316",
    "label": "Lasa"
  }, {
    "value": "317",
    "label": "Rikaze"
  }, {
    "value": "318",
    "label": "Changdu"
  }, {
    "value": "319",
    "label": "Linzhi"
  }, {
    "value": "320",
    "label": "Shannan"
  }, {
    "value": "321",
    "label": "Naqudiqu"
  }, {
    "value": "322",
    "label": "Alidiqu"
  }]
}, {
  "value": "27",
  "label": "Shaanxi",
  "children": [{
    "value": "323",
    "label": "Xian"
  }, {
    "value": "324",
    "label": "Tongchuan"
  }, {
    "value": "325",
    "label": "Baoji"
  }, {
    "value": "326",
    "label": "Xianyang"
  }, {
    "value": "327",
    "label": "Weinan"
  }, {
    "value": "328",
    "label": "Yanan"
  }, {
    "value": "329",
    "label": "Hanzhong"
  }, {
    "value": "330",
    "label": "Yulin"
  }, {
    "value": "331",
    "label": "Ankang"
  }, {
    "value": "332",
    "label": "Shangluo"
  }]
}, {
  "value": "28",
  "label": "Gansu",
  "children": [{
    "value": "333",
    "label": "Lanzhou"
  }, {
    "value": "334",
    "label": "Jiayuguan"
  }, {
    "value": "335",
    "label": "Jinchang"
  }, {
    "value": "336",
    "label": "Baiyin"
  }, {
    "value": "337",
    "label": "Tianshui"
  }, {
    "value": "338",
    "label": "Wuwei"
  }, {
    "value": "339",
    "label": "Zhangye"
  }, {
    "value": "340",
    "label": "Pingliang"
  }, {
    "value": "341",
    "label": "Jiuquan"
  }, {
    "value": "342",
    "label": "Qingyang"
  }, {
    "value": "343",
    "label": "Dingxi"
  }, {
    "value": "344",
    "label": "Longnan"
  }, {
    "value": "345",
    "label": "Linxiahuizuzizhizhou"
  }, {
    "value": "346",
    "label": "Gannancangzuzizhizhou"
  }]
}, {
  "value": "29",
  "label": "Qinghai",
  "children": [{
    "value": "347",
    "label": "Xining"
  }, {
    "value": "348",
    "label": "Haidong"
  }, {
    "value": "349",
    "label": "Haibeicangzuzizhizhou"
  }, {
    "value": "350",
    "label": "Huangnancangzuzizhizhou"
  }, {
    "value": "351",
    "label": "Hainancangzuzizhizhou"
  }, {
    "value": "352",
    "label": "Guoluocangzuzizhizhou"
  }, {
    "value": "353",
    "label": "Yushucangzuzizhizhou"
  }, {
    "value": "354",
    "label": "Haiximengguzucangzuzizhizhou"
  }]
}, {
  "value": "30",
  "label": "Ningxia",
  "children": [{
    "value": "355",
    "label": "Yinchuan"
  }, {
    "value": "356",
    "label": "Shizuishan"
  }, {
    "value": "357",
    "label": "Wuzhong"
  }, {
    "value": "358",
    "label": "Guyuan"
  }, {
    "value": "359",
    "label": "Zhongwei"
  }]
}, {
  "value": "31",
  "label": "Xinjiang",
  "children": [{
    "value": "360",
    "label": "Wulumuqi"
  }, {
    "value": "361",
    "label": "Kelamayi"
  }, {
    "value": "362",
    "label": "Tulufan"
  }, {
    "value": "363",
    "label": "Hami"
  }, {
    "value": "364",
    "label": "Changjihuizuzizhizhou"
  }, {
    "value": "365",
    "label": "Boertalamengguzizhizhou"
  }, {
    "value": "366",
    "label": "Bayinguolengmengguzizhizhou"
  }, {
    "value": "367",
    "label": "Akesudiqu"
  }, {
    "value": "368",
    "label": "Kezilesukeerkezizizhizhou"
  }, {
    "value": "369",
    "label": "Kashidiqu"
  }, {
    "value": "370",
    "label": "Hetiandiqu"
  }, {
    "value": "371",
    "label": "Yilihasakezizhizhou"
  }, {
    "value": "372",
    "label": "Tachengdiqu"
  }, {
    "value": "373",
    "label": "Aletaidiqu"
  }, {
    "value": "374",
    "label": "Zhixiaxianjixingzhengquhua"
  }]
}, {
  "value": "3384",
  "label": "Taiwan",
  "children": [{
    "value": "3387",
    "label": "Taiwan"
  }]
}, {
  "value": "3385",
  "label": "Hongkong",
  "children": [{
    "value": "3388",
    "label": "Hongkong"
  }]
}, {
  "value": "3386",
  "label": "Macau",
  "children": [{
    "value": "3389",
    "label": "Macau"
  }]
}]

export default node