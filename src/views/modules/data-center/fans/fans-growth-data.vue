<template>
  <div>
    <el-row class="sty_top">
      <div class="upperPart">
        <div class="sty_left">昨日关键指标</div>
        <div class="sty_right">
          <el-tooltip
            class="item"
            effect="light"
            placement="bottom"
          >
            <div slot="content">
              <label>新关注人数</label>
              <p style="color:#a09f9f;">新关注的去重用户数</p>
              <label>取消关注人数</label>
              <p style="color:#a09f9f;">取消关注的去重用户数</p>
              <label>净增关注人数</label>
              <p style="color:#a09f9f;">净增长的去重关注用户数</p>
              <label>积累关注人数</label>
              <p style="color:#a09f9f;">当前关注的用户总数</p>
              <label>请注意</label>
              <p style="color:#a09f9f;">用户总数根据昨日数据计算,而用户管理模块根据当前实时数据计算,两者可能不一致</p>
            </div>
            <img
              class="icon_sty"
              src="./img/wen2.png"
            >
          </el-tooltip>
        </div>
      </div>
      <div class="sty_bottom">
        <div class="sty_box sty_border">
          <p>新关注人数</p>
          <h3>{{ targetInterface.newUserCount }}</h3>
        </div>
        <div class="sty_box sty_border">
          <p>取消关注人数</p>
          <h3>{{ targetInterface.cancelUserCount }}</h3>
        </div>
        <div class="sty_box sty_border">
          <p>净增长关注人数</p>
          <h3>{{ targetInterface.netIncreaseUserCount }}</h3>
        </div>
        <div class="sty_box">
          <p>积累关注人数</p>
          <h3>{{ targetInterface.cumulateUser }}</h3>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-radio-group
        v-model="tabPosition"
        size="mini"
        style="margin-bottom: 30px;"
        @change="changeType"
      >
        <el-radio-button label="1">新增人数</el-radio-button>
        <el-radio-button label="2">取消关注人数</el-radio-button>
        <el-radio-button label="3">净增人数</el-radio-button>
        <el-radio-button label="4">积累人数</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row class="sty_bottom">
      <div class="bot_top">
        <el-select
          v-model="consumeTime"
          size="small"
          clearable
          placeholder="请选择"
          @change="changeConsume"
        >
          <el-option
            label="最近一周"
            value="7"
          />
          <el-option
            label="最近一月"
            value="30"
          />
          <el-option
            label="最近一年"
            value="365"
          />
          <el-option
            label="自定义"
            value="-1"
          />
        </el-select>
        <el-date-picker
          v-model="timeDate"
          size="small"
          :disabled="consumeTime != -1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectTime"
        />
      </div>
      <div class="runChart">趋势图</div>
      <ve-line
        :data="chartData"
        :legend-visible="false"
        :data-empty="dataEmpty"
      />
    </el-row>
  </div>
</template>
<script>
import { KeyIndex, FanGrowthChart } from '@/api/dataCenter/fansList'
export default {
  components: {},
  data() {
    return {
      timeDate: '',
      consumeTime: '7',
      tabPosition: '1',
      targetInterface: {
        cancelUserCount: '',
        cumulateUser: '',
        netIncreaseUserCount: '',
        // newMessageCount: "",
        newUserCount: ''
      },
      dataEmpty: false,
      chartData: {
        columns: [],
        rows: []
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
    // 用来每三位加一个逗号
    thousands(num) {
      var str = num.toString()
      var reg =
        str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
      return str.replace(reg, '$1,')
    },
    keyIndexInterface() {
      // 昨日关键指标接口
      KeyIndex({})
        .then(res => {
          if (res.code == 0) {
            console.log('昨日关键指标接口', res)
            this.targetInterface.cancelUserCount = this.thousands(
              res.data.cancelUserCount
            )
            this.targetInterface.netIncreaseUserCount = this.thousands(
              res.data.netIncreaseUserCount
            )
            // this.targetInterface.newMessageCount = this.thousands(
            //   res.data.newMessageCount
            // );
            this.targetInterface.cumulateUser = this.thousands(
              res.data.cumulateUser
            )
            this.targetInterface.newUserCount = this.thousands(
              res.data.newUserCount
            )
          }
        })
    },
    showTime() {
      // 页面显示时间
      const time = new Date() - 7 * 24 * 60 * 60 * 1000
      const start = this.$formatDate(new Date(time), 'yyyy-MM-dd')
      const end = this.$formatDate(new Date(), 'yyyy-MM-dd')
      this.timeDate = [start, end]
      this.fanGrowthChartInterface(start, end)
    },

    changeType() {
      // tab切换
      this.showTime()
      this.consumeTime = '7'
      console.log('你切换了tab栏', this.timeDate, this.tabPosition)
    },
    changeConsume(day) {
      // 选择日期
      if (day == -1) {
        this.timeDate = []
      } else {
        const time = new Date() - day * 24 * 60 * 60 * 1000
        const start = this.$formatDate(new Date(time), 'yyyy-MM-dd')
        const end = this.$formatDate(new Date(), 'yyyy-MM-dd')
        this.timeDate = [start, end]
        this.fanGrowthChartInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
      }
      console.log('你选择了时间段', this.timeDate)
    },
    selectTime() {
      // 自定义时间
      console.log(' this.timeDate', this.timeDate)
      this.fanGrowthChartInterface(this.timeDate[ 0 ], this.timeDate[ 1 ])
    },
    fanGrowthChartInterface(start, end) {
      // 粉丝增长图表接口参数
      const obj = {
        beginTime: start,
        endTime: end
      }
      FanGrowthChart(obj).then(res => {
        if (res.code == 0) {
          console.log('粉丝增长图表接口参数', res)
          if (res.data) {
            const list = []
            this.chartData.columns = []
            this.chartData.rows = []
            if (this.tabPosition == 1) {
              this.chartData.columns = ['time', '新增人数']
              res.data.map(item => {
                const option = {}
                option[ 'time' ] = item.refDate.substring(0, 10)
                option[ '新增人数' ] = item.newUserCount
                list.push(option)
              })
              this.chartData.rows = list
            }

            if (this.tabPosition == 2) {
              this.chartData.columns = ['time', '取消关注人数']
              res.data.map(item => {
                const option = {}
                option[ 'time' ] = item.refDate.substring(0, 10)
                option[ '新增人数' ] = item.cancelUserCount
                list.push(option)
              })
              this.chartData.rows = list
            }
            if (this.tabPosition == 3) {
              this.chartData.columns = ['time', '净增长关注人数']
              res.data.map(item => {
                const option = {}
                option[ 'time' ] = item.refDate.substring(0, 10)
                option[ '新增人数' ] = item.netIncreaseUserCount
                list.push(option)
              })
              this.chartData.rows = list
            }
            if (this.tabPosition == 4) {
              this.chartData.columns = ['time', '积累关注人数']
              res.data.map(item => {
                const option = {}
                option[ 'time' ] = item.refDate.substring(0, 10)
                option[ '新增人数' ] = item.cumulateUser
                list.push(option)
              })
              this.chartData.rows = list
            }
            this.dataEmpty = false
          } else {
            this.chartData.rows = []
            this.dataEmpty = true
          }

          console.log()
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
.sty_top {
  width: 100%;
  border: 1px solid #e7e7eb;
  .upperPart {
    width: 100%;
    padding: 10px 0;
    background-color: #f4f5f9;
    display: flex;
    justify-content: space-between;
    .sty_left {
      margin: 5px 0 0 10px;
    }
    .sty_right {
      .icon_sty {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .sty_bottom {
    display: flex;
    padding: 15px 0;
    .sty_border {
      border-right: 1px solid #ccc;
    }
    .sty_box {
      width: 25%;
      text-align: center;
    }
  }
}
.sty_bottom {
  width: 100%;
  border: 1px solid #e7e7eb;
  .bot_top {
    width: 100%;
    background-color: #f4f5f9;
  }
}
.runChart {
  margin: 20px;
  font-size: 18px;
}
</style>

