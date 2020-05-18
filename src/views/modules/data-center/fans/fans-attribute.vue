<template>
  <div>
    <el-row>
      <div class="times">
        <el-date-picker
          v-model="timeDate"
          type="daterange"
          clearable
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectTime"
        />
      </div>
    </el-row>
    <el-row>
      <h2>总粉丝数:{{ totalfans }}</h2>
    </el-row>
    <el-row class="_data">
      <div class="data_sty">
        <h2>性别分布</h2>
        <ve-ring
          :data="fansChartData"
          :data-empty="fansChartDataEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
      <div class="data_sty">
        <h2>语言分布</h2>
        <ve-ring
          :data="languageChartData"
          :data-empty="languageEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
    </el-row>
    <el-row class="_data">
      <div class="data_sty">
        <h2>省份分布</h2>
        <ve-ring
          :data="provinceChartData"
          :data-empty="provinceEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
      <div class="data_sty">
        <h2>关注渠道</h2>
        <ve-ring
          :data="focusChannelData"
          :data-empty="focusChannelEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
    </el-row>
    <el-row class="_data">
      <div class="data_sty">
        <h2>终端分布</h2>
        <ve-ring
          :data="terminalChartData"
          :data-empty="terminalEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
      <div class="data_sty">
        <h2>机型分布</h2>
        <ve-ring
          :data="rangedChartData"
          :data-empty="rangedChartEmpty"
          :extend="chartExtend"
          :settings="chartSettings"
        />
      </div>
    </el-row>
  </div>
</template>
<script>
import {
  KeyIndex,
  FansSex,
  FansLanguage,
  FansRegion,
  FansDataList,
  TerminalDistribution,
  RangedData
} from '@/api/dataCenter/fansList'
export default {
  name: 'FansAttribute',
  components: {},
  data() {
    this.chartSettings = {
      radius: [60, 100],
      offsetY: 230,
      labelLine: { show: false },
      legendLimit: 100,
      label: {
        normal: {
          show: false
        }
      }
    }
    return {
      timeDate: '',
      totalfans: null,
      // 性别分布图表参数↓
      fansChartDataEmpty: false,
      fansChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 语言分布图表参数↓
      languageEmpty: false,
      languageChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 省份分布图表参数↓
      provinceEmpty: false,
      provinceChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 关注渠道图表参数↓
      focusChannelEmpty: false,
      focusChannelData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 终端分布图表参数↓
      terminalEmpty: false,
      terminalChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      // 机型分布图表参数↓
      rangedChartEmpty: false,
      rangedChartData: {
        columns: ['name', 'list'],
        rows: []
      },
      chartExtend: {
        legend: {
          type: 'scroll' /** 数据过多时分页显示 */,
          //   orient: "vertical",
          x: 'center',
          y: 'bottom'
        }
      }
    }
  },
  computed: {},
  created() {
    this.showTime()
    this.keyIndexInterface()
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    keyIndexInterface() {
      // 昨日关键指标接口
      KeyIndex({})
        .then(res => {
          if (res.code == 0) {
            console.log('昨日关键指标接口', res)
            this.totalfans = res.data.cumulateUser
          }
        })
    },
    showTime() {
      // 页面显示时间
      const start = '2014-12-01'
      const end = this.$formatDate(new Date(), 'yyyy-MM-dd')
      this.timeDate = [start, end]
      console.log('eeeee', this.timeDate)
      this.fansSexInterface(start, end)
      this.fansLanguageInterface(start, end)
      this.fansRegionInterface(start, end)
      this.fansDataListinterface(start, end)
      this.terminalDistributionInterface(start, end)
      this.rangedDataInterface(start, end)
    },
    selectTime() {
      // 选择时间
      console.log(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.fansSexInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.fansLanguageInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.fansRegionInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.fansDataListinterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.terminalDistributionInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      this.rangedDataInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
    },
    fansSexInterface(str, end) {
      // 公众号粉丝性别人数分布图表
      const obj = {
        beginTime: str,
        endTime: end
      }
      FansSex(obj).then(res => {
        if (res.code == 0) {
          this.fansChartData.rows = []
          if (res.data) {
            const list = []
            res.data.map(item => {
              const option = {}
              option[ 'name' ] = item.genderString
              option[ 'list' ] = item.count
              list.push(option)
            })
            this.fansChartData.rows = list
            console.log(this.fansChartData, '2222222')
            this.languageEmpty = false
          } else {
            this.languageEmpty = true
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
          this.languageChartData.rows = []
          if (res.data) {
            const dataList = []
            res.data.map(item => {
              const opiton = {}
              opiton[ 'name' ] = item.language
              opiton[ 'list' ] = item.count
              dataList.push(opiton)
            })
            this.languageChartData.rows = dataList
            this.fansAttributeEmpty = false
          } else {
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
          this.provinceChartData.rows = []
          if (res.data) {
            const dataList = []
            res.data.map(item => {
              const opiton = {}
              opiton[ 'name' ] = item.province
              opiton[ 'list' ] = item.count
              dataList.push(opiton)
            })
            this.provinceChartData.rows = dataList
            this.provinceEmpty = false
          } else {
            this.provinceEmpty = true
          }
        }
      })
    },
    fansDataListinterface(star, end) {
      // (粉丝渠道分析)
      const obj = {
        beginTime: star,
        endTime: end
      }
      FansDataList(obj)
        .then(res => {
          if (res.code == 0) {
            this.focusChannelData.rows = []
            if (res.data) {
              const dataList = []
              res.data.map(item => {
                const fansOption = {}
                fansOption[ 'name' ] = item.subscribe
                fansOption[ 'list' ] = item.count
                dataList.push(fansOption)
              })
              this.focusChannelData.rows = dataList
              this.focusChannelEmpty = false
            } else {
              this.focusChannelEmpty = true
            }
          }
        })
    },
    terminalDistributionInterface(star, end) {
      // 终端分布
      const obj = {
        beginTime: star,
        endTime: end
      }
      TerminalDistribution(obj)
        .then(res => {
          if (res.code == 0) {
            this.terminalChartData.rows = []
            if (res.data) {
              const dataList = []
              res.data.map(item => {
                const fansOption = {}
                fansOption[ 'name' ] = item.model
                fansOption[ 'list' ] = item.count
                dataList.push(fansOption)
              })
              this.terminalChartData.rows = dataList
              this.terminalEmpty = false
            } else {
              this.terminalEmpty = true
            }
          }
        })
    },
    rangedDataInterface(star, end) {
      // 机型分布
      const obj = {
        beginTime: star,
        endTime: end
      }
      RangedData(obj).then(res => {
        if (res.code == 0) {
          this.rangedChartData.rows = []
          if (res.data) {
            const dataList = []
            res.data.map(item => {
              const fansOption = {}
              fansOption[ 'name' ] = item.terminal
              fansOption[ 'list' ] = item.count
              dataList.push(fansOption)
            })
            this.rangedChartData.rows = dataList
            this.rangedChartEmpty = false
          } else {
            this.rangedChartEmpty = true
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
.times {
  width: 100%;
  background-color: #f4f5f9;
}
._data {
  display: flex;
  justify-content: space-between;
  .data_sty {
    width: 45%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #f4f5f9;
    .consumption {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

