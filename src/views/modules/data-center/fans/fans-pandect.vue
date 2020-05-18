<template>
  <div>
    <el-row class="_tab">
      <div class="tab_sty tab_cor1">
        <img
          class="icon_sty"
          src="./img/total-fans.png"
        >
        <div class="_sty">
          <p>总粉丝数量</p>
          <p>{{ totalfans.cumulateUser }}</p>
        </div>
      </div>
      <div class="tab_sty tab_cor2">
        <img
          class="icon_sty"
          src="./img/yesterday-add.png"
        >
        <div class="_sty">
          <p>昨日新增粉丝</p>
          <p>{{ totalfans.newUserCount }}</p>
        </div>
      </div>
      <div class="tab_sty tab_cor3">
        <img
          class="icon_sty"
          src="./img/yesterday-toeck.png"
        >
        <div class="_sty">
          <p>昨日取关粉丝</p>
          <p>{{ totalfans.cancelUserCount }}</p>
        </div>
      </div>
      <div class="tab_sty tab_cor4">
        <img
          class="icon_sty"
          src="./img/yesterdayNet.png"
          alt
        >
        <div class="_sty">
          <p>昨日净增粉丝</p>
          <p>{{ totalfans.netIncreaseUserCount }}</p>
        </div>
      </div>
      <div class="tab_sty tab_cor5">
        <img
          class="icon_sty"
          src="./img/newMessage.png"
          alt
        >
        <div class="_sty">
          <p>新消息数</p>
          <p>{{ totalfans.newMessageCount }}</p>
        </div>
      </div>
    </el-row>
    <el-row class="_data">
      <div class="data_sty">
        <div class="consumption">
          <h2>累计关注趋势</h2>
          <el-date-picker
            v-model="cumulativeData"
            size="mini"
            style="margin-top:13px;"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="cumulativeTime(1)"
          />
        </div>
        <ve-line
          :data="chartData"
          :legend-visible="false"
          :data-empty="dataEmpty"
        />
      </div>
      <div class="data_sty">
        <div class="consumption">
          <h2>净增关注趋势</h2>
          <el-date-picker
            v-model="cnetGainData"
            size="mini"
            style="margin-top:13px;"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="cumulativeTime(2)"
          />
        </div>
        <ve-line
          :data="chartData1"
          :legend-visible="false"
          :data-empty="cumulativeEmpty"
        />
      </div>
    </el-row>
    <el-row class="_data">
      <div class="data_sty">
        <div class="consumption">
          <h2>粉丝渠道分析</h2>
          <el-date-picker
            v-model="fanChannel"
            size="mini"
            style="margin-top:13px;"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="cumulativeTime(3)"
          />
        </div>
        <p class="font_sty">总粉丝数:{{ totalfans.cumulateUser }}</p>
        <ve-ring
          :data="fansChartData"
          :data-empty="fansChartDataEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
      <div class="data_sty">
        <div class="consumption">
          <h2>粉丝属性分析</h2>
          <el-date-picker
            v-model="fansAttributeTime"
            size="mini"
            style="margin-top:13px;"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="cumulativeTime(4)"
          />
        </div>
        <p class="font_sty">总粉丝数:{{ totalfans.cumulateUser }}</p>
        <el-radio-group
          v-model="tabPosition"
          size="mini"
          style="margin-bottom: 30px;"
          @change="changeType"
        >
          <el-radio-button label="sex">性别</el-radio-button>
          <el-radio-button label="language">语言</el-radio-button>
          <el-radio-button label="territory">地域</el-radio-button>
        </el-radio-group>
        <ve-ring
          :data="fansAttributeData"
          :data-empty="fansAttributeEmpty"
          :settings="fansChartSettings"
          :extend="chartExtend"
        />
      </div>
    </el-row>
  </div>
</template>
<script>
import {
  TotalFanList,
  CumulativeDataInterface,
  FansDataList,
  FansSex,
  FansLanguage,
  FansRegion
} from '@/api/dataCenter/fansList'
import 'v-charts/lib/style.css'
import { formatDate } from '@/utils/index'
export default {
  name: 'FansPandect',
  components: {},
  data() {
    this.chartSettings = {
      radius: [60, 100],
      offsetY: 230,
      labelLine: { show: false },
      label: {
        normal: {
          show: false
        }
      }
    }
    this.fansChartSettings = {
      radius: [60, 100],
      offsetY: 180,
      labelLine: { show: false },
      legendLimit: 100,
      label: {
        normal: {
          show: false,
          position: 'center'
        }
      }
    }
    return {
      tabPosition: 'sex',
      number: null,
      totalfans: {
        cancelUserCount: '',
        cumulateUser: '',
        netIncreaseUserCount: '',
        newMessageCount: '',
        newUserCount: ''
      },
      // 累计关注趋势图表参数↓
      dataEmpty: false,
      cumulativeData: [],
      chartData: {
        columns: ['日期', '累计关注'],
        rows: []
      },
      // 净增关注趋势图表参数↓
      cumulativeEmpty: false,
      cnetGainData: [],
      chartData1: {
        columns: ['日期', '净增人数', '新增人数', '取关人数'],
        rows: []
      },
      // 粉丝渠道分析图表参数↓
      fansChartDataEmpty: false,
      fanChannel: [],
      fansChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 粉丝属性分析图表参数↓
      fansAttributeEmpty: false,
      fansAttributeTime: [],
      fansAttributeData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 设置图表提示语放置处↓
      chartExtend: {
        legend: {
          type: 'scroll' /** 数据过多时分页显示 */,
          orient: 'vertical',
          x: 'right',
          y: 'center'
        }
      }
    }
  },
  computed: {},
  created() {
    this.totalFanListInterface()
    this.showTime()
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    thousands(num) {
      // 用来每三位加一个逗号
      var str = num.toString()
      var reg =
        str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
      return str.replace(reg, '$1,')
    },
    totalFanListInterface() {
      // 总粉丝参数接口
      TotalFanList({})
        .then(res => {
          if (res.code == 0) {
            console.log('总粉丝参数接口', res)
            this.totalfans.cancelUserCount = this.thousands(
              res.data.cancelUserCount
            )
            this.totalfans.netIncreaseUserCount = this.thousands(
              res.data.netIncreaseUserCount
            )
            this.totalfans.newMessageCount = this.thousands(
              res.data.newMessageCount
            )
            this.totalfans.cumulateUser = this.thousands(res.data.cumulateUser)
            this.totalfans.newUserCount = this.thousands(res.data.newUserCount)
            console.log(this.totalfans, 'eeeeeeeeeeee')
          }
        })
    },
    showTime() {
      const end = formatDate(new Date(), 'yyyy-MM-dd')
      const start = '2014-12-01'
      this.cumulativeData = [start, end]
      this.cnetGainData = [start, end]
      this.fanChannel = [start, end]
      this.fansAttribute = [start, end]
      this.fansAttributeTime = [start, end]
      this.cumulativeInterface(start, end)
      this.fansDataListinterface(start, end)
      this.fansSexInterface(start, end)
    },
    cumulativeTime(number) {
      // 累计关注趋势
      this.number = number
      console.log(this.cumulativeData)
      if (number == 1) {
        this.cumulativeInterface(
          this.cumulativeData[ 0 ],
          this.cumulativeData[ 1 ]
        )
      }
      if (number == 2) {
        this.cumulativeInterface(this.cnetGainData[ 0 ], this.cnetGainData[ 1 ])
      }
      if (number == 3) {
        this.fansDataListinterface(this.fanChannel[ 0 ], this.fanChannel[ 1 ])
      }
      if (number == 4) {
        this.changeType()
      }
    },
    cumulativeInterface(star, end) {
      // 累计关注趋势接口
      const obj = {
        beginTime: star,
        endTime: end
      }
      CumulativeDataInterface(obj)
        .then(res => {
          if (res.code == 0) {
            if (this.number == null) {
              this.cumulativeAttention(res.data)
              this.netGainAttention(res.data)
            }
            if (this.number == 1) {
              this.cumulativeAttention(res.data)
            }
            if (this.number == 2) {
              this.netGainAttention(res.data)
            }
          }
        })
    },

    cumulativeAttention(list) {
      // 累计关注趋势数据处理
      const dataList = []
      if (list) {
        list.map(res => {
          const option = {}
          option[ '日期' ] = res.refDate
          option[ '累计关注' ] = res.cumulateUser
          dataList.push(option)
        })
        if (dataList.length > 0) {
          this.dataEmpty = false
          this.chartData.rows = dataList
        }
      } else {
        this.chartData.rows = []
        this.dataEmpty = true
      }
    },
    netGainAttention(list) {
      //  净增关注趋势数据处理
      const dataList = []
      if (list) {
        this.cumulativeEmpty = false
        list.map(res => {
          const option = {}
          option[ '日期' ] = res.refDate
          option[ '净增人数' ] = res.netIncreaseUserCount
          option[ '新增人数' ] = res.newUserCount
          option[ '取关人数' ] = res.cancelUserCount
          dataList.push(option)
        })
        if (dataList.length > 0) {
          this.chartData1.rows = dataList
        }
      } else {
        this.chartData1.rows = []
        this.cumulativeEmpty = true
      }
    },
    fansDataListinterface(star, end) {
      // 粉丝数据接口 (粉丝渠道分析)
      const obj = {
        beginTime: star,
        endTime: end
      }
      FansDataList(obj)
        .then(res => {
          if (res.code == 0) {
            if (res.data) {
              const dataList = []
              res.data.map(item => {
                const fansOption = {}
                fansOption[ 'name' ] = item.subscribe
                fansOption[ 'list' ] = item.count
                dataList.push(fansOption)
              })
              this.channelAnalysis(dataList)
            } else {
              this.fansChartData.rows = []
              this.fansChartDataEmpty = true
            }
          }
        })
    },
    channelAnalysis(list) {
      // 粉丝渠道分析数据处理
      console.log(list, 'list')
      if (list) {
        this.fansChartData.rows = list
        this.fansChartDataEmpty = false
      } else {
        this.fansChartData.rows = []
        this.fansChartDataEmpty = true
      }
    },

    changeType() {
      // 选择粉丝属性(性别,语言,地域)
      if (this.tabPosition == 'sex') {
        console.log(this.tabPosition)
        this.fansSexInterface(
          this.fansAttributeTime[ 0 ],
          this.fansAttributeTime[ 1 ]
        )
      }
      if (this.tabPosition == 'language') {
        console.log(this.tabPosition)
        this.fansLanguageInterface(
          this.fansAttributeTime[ 0 ],
          this.fansAttributeTime[ 1 ]
        )
      }
      if (this.tabPosition == 'territory') {
        console.log(this.tabPosition)
        this.fansRegionInterface(
          this.fansAttributeTime[ 0 ],
          this.fansAttributeTime[ 1 ]
        )
      }
    },

    fansSexInterface(star, end) {
      // 获取公众号粉丝性别人数接口
      const obj = {
        beginTime: star,
        endTime: end
      }
      FansSex(obj).then(res => {
        if (res.code == 0) {
          console.log('获取公众号粉丝性别人数接口', res)
          if (res.data) {
            const dataList = []
            res.data.map(item => {
              const opiton = {}
              opiton[ 'name' ] = item.genderString
              opiton[ 'list' ] = item.count
              dataList.push(opiton)
            })
            console.log(dataList, 'dataListdataList')
            this.fansAttributeData.rows = dataList
          } else {
            this.fansAttributeData.rows = []
            this.fansAttributeEmpty = true
          }
        }
      })
    },
    fansLanguageInterface(star, end) {
      // 语言分布
      const obj = {
        beginTime: star,
        endTime: end
      }
      FansLanguage(obj).then(res => {
        if (res.code == 0) {
          console.log('语言分布', res)
          if (res.data) {
            const dataList = []
            res.data.map(item => {
              const opiton = {}
              opiton[ 'name' ] = item.language
              opiton[ 'list' ] = item.count
              dataList.push(opiton)
            })

            this.fansAttributeData.rows = dataList

            console.log(this.fansAttributeData.rows, 'dataListdataList')
            this.fansAttributeEmpty = false
          } else {
            this.fansAttributeData.rows = []
            this.fansAttributeEmpty = true
          }
        }
      })
    },
    fansRegionInterface(star, end) {
      // 地区分布
      const obj = {
        beginTime: star,
        endTime: end
      }
      FansRegion(obj).then(res => {
        if (res.code == 0) {
          if (res.data) {
            console.log('地区分布', res)
            const dataList = []
            res.data.map(item => {
              const opiton = {}
              opiton[ 'name' ] = item.province
              opiton[ 'list' ] = item.count
              dataList.push(opiton)
            })

            if (dataList.length > 0) {
              this.fansAttributeData.rows = dataList
            }
            console.log(this.fansAttributeData.rows, 'dataListdataList')
            this.fansAttributeEmpty = false
          } else {
            this.fansAttributeData.rows = []
            this.fansAttributeEmpty = true
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
._tab {
  display: flex;
  justify-content: space-between;
  .tab_sty {
    width: 19%;
    padding-top: 10px;
    box-sizing: border-box;
    background-color: red;
    box-shadow: 3px 3px 4px rgb(192, 192, 192);
    display: flex;
    ._sty {
      text-align: center;
      margin-left: 10%;
      font-size: 16px;
      font-weight: 800;
      color: #505050;
    }
  }
  .tab_cor1 {
    background-color: #f3b131;
  }
  .tab_cor2 {
    background-color: #93e0a5;
  }
  .tab_cor3 {
    background-color: #91dbf2;
  }
  .tab_cor4 {
    background-color: #b8b2dc;
  }
  .tab_cor5 {
    background-color: #fdb8c2;
  }
}
._data {
  display: flex;
  justify-content: space-between;
  .data_sty {
    width: 49%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #f4f5f9;
    .consumption {
      display: flex;
      justify-content: space-between;
    }
  }
}
.font_sty {
  font-size: 16px;
  font-weight: 600;
}
</style>

