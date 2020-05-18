<template>
  <div class="page-member-list">
    <div class="prizeSettingBackground">
      <div
        v-for="(item,index) in form.prizeRules"
        :key="index"
        class="prize"
      >
        <div class="prize-title">
          <div>组 {{ index+1 }} </div>
          <div @click="delPrize(index)" v-if='$route.query.OTP ==1'>删除</div>
        </div>
        <el-divider />
        <div>
          <el-form
            :model="item"
            class="prizeSettingBackground-el-form"
            size="mini"
          >
            <div class="el-form-l">
              <el-form-item
                label="适用条件"
                style="display:flex;"
              >
                <el-checkbox v-model="item.checked1" :disabled="$route.query.OTP == 3" style="margin-right:10px">限制时间</el-checkbox>
                <el-date-picker
                  v-model="item.date"
                  :disabled="!item.checked1 || $route.query.OTP == 3"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  @change="$setData('date',index)"
                />
              </el-form-item>
              <el-form-item
                label=" "
                style="display:flex;"
              >
                <el-checkbox v-model="item.checked2" :disabled="$route.query.OTP == 3" style="margin-right:10px">限制轮次</el-checkbox>
                <el-checkbox-group
                  v-model="item.rounds"
                  :disabled="!item.checked2 || $route.query.OTP == 3"
                >
                  <el-checkbox
                    v-for="(itm,idx) in form.lotteryTimesOneDay"
                    :key="idx"
                    :label="idx+1"
                  >
                    第 {{ idx+1 }} 轮
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label=" ">
                <span style="margin-left: 150px;">优先级</span>
                <el-button
                  v-if="index==0&&form.prizeRules.length>1"
                  size="mini"
                  style="margin-left: 50px;"
                  type="text"
                  @click="moveIdx(index,1)"
                > 下移 </el-button>
                <el-button
                  v-if="index!=0&&form.prizeRules.length>1"
                  size="mini"
                  style="margin-left: 50px;"
                  type="text"
                  @click="moveIdx(index,2)"
                > 上移 </el-button>
              </el-form-item>
              <el-form-item
                label="概率分布"
                style="display:flex;"
              >
                <probability
                  :table-data="item.probabilitys"
                  :index="index"
                  :type="item.type"
                  @_type="watchType"
                />
              </el-form-item>
            </div>
          </el-form>

        </div>
      </div>
      <el-button
        type="primary"
        size="mini"
        @click="addPrizes"
        v-if='$route.query.OTP ==1'
      >+ 新增一组概率</el-button>

    </div>
  </div>
</template>

<script>
import probability from './probability'
export default {
  name: 'ProbabilitySetting',
  components: {
    probability
  },
  props: {
    datas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      'form': [],
      date: [],
      rounds: [],
      serNum:0,
    }
  },
  computed: {

  },
  created() {
    this[ 'form' ] = this.$store.state.luckyData
    this._initPageData()
    console.log('概率设置2', { ...this[ 'form' ] })

    if (this.$route.query.OTP == 2 || this.$route.query.OTP==3) {
      // 回显初始化
      this.reInitDates()
    }
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    // 回显初始化
    reInitDates() {
      this.form.prizeRules.map((d, idx) => {
        if (d.rounds.length>0){
          this.$set(d, 'checked2', true) // 初始化 限制轮次状态
        }
        if (d.startTime && d.endTime) { // 初始化限制时间状态
          this.$set(d, 'checked1', true)
          this.$set(this.form.prizeRules[ idx ], 'date', [d.startTime, d.endTime])
        }
        return d
      })
      console.log(this.form.prizeRules)
    },
    // 获取当前时间变更
    $setData(k, i) {
      console.log('获取当前时间变更', this.form.prizeRules[ i ])
      if (k == 'date') {
        this.form.prizeRules[ i ].startTime = this.form.prizeRules[ i ].date[ 0 ]
        this.form.prizeRules[ i ].endTime = this.form.prizeRules[ i ].date[ 1 ]
      }
    },
    // 增加概率列表
    addPrizes() {
      // 控制长度
      if (this.form.prizeRules.length >= 8) return
      const itm = JSON.parse(JSON.stringify(this.form.prizeRules[ 0 ]))
      console.log('增加概率列表', itm)
      itm.checked1 = null
      itm.checked2 = null
      itm.date = []
      itm.rounds = []
      itm.serNum = ++this.serNum
      itm.probabilitys.map(d => {
        d.probability = null
      })
      this.form.prizeRules.push(itm)
      // console.log('增加',this.form.prizeRules)
    },
    // 删除当前
    delPrize(idx) {
      if (this.form.prizeRules.length == 1) return
      this.form.prizeRules.splice(idx, 1)
    },
    // 初始化当前页面
    _initPageData(v) {
      // 为概率设置添加奖品
      this.prizeList = []
      if (this.$route.query.OTP == 2 || this.$route.query.OTP == 3) {
        this.form.prizeRules.map((d, index) => {
          this.form.prizes.map((dd, idx) => {
            // d.probabilitys = JSON.parse(JSON.stringify(dd.probability))
            dd.probability = d.probabilitys[idx].probability || 0
            this.prizeList.push(dd)
          })
        })
        this.prizeList.length = this.form.prizes.length
      } else {
        this.form.prizes.map((dd, idx) => {
          dd.probability = 0
          this.prizeList.push(dd)
        })
      }

      this.form.prizeRules.map(d => {
        d.type = false
        d.probabilitys = JSON.parse(JSON.stringify(this.prizeList))
      })
      console.log('this.prizeList11111', this.prizeList)
    },
    // 切换概率 优先级
    moveIdx(idx, t) {
      const idxd = { ...this.form.prizeRules[ idx ] }
      this.form.prizeRules.splice(idx, 1)
      if (t == 1) {
        this.form.prizeRules.splice(idx + 1, 0, idxd)
      } else {
        this.form.prizeRules.splice(idx - 1, 0, idxd)
      }
    },
    // 观察Type
    watchType(v) {
      // console.log('watchType',v)
      const p = this.form.prizeRules[ v.index ]
      p.type = v.type
      this.$set(this.form.prizeRules, v.index, p)
    }
    // click
  }
}
</script>

<style lang="scss" scope>
.prizeSettingBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;

  .redTxt {
    padding-left: 150px;
    line-height: 30px;
    font-size: 12px;
    color: #afaeae;
    margin-top: -20px;
    margin-bottom: 20px;
  }
  .prize {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 30px;
    min-width: 980px;
    max-width: 980px;
    .prize-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: -20px;
      line-height: 40px;
      padding: 0 20px;
    }
  }
}
</style>
<style lang="scss" >
.prizeSettingBackground {
  .prize {
    .el-form-item__label {
      // width: 100% !important;
      color: #000;
      text-align: left;
      min-width: 150px;
    }
    .prizeSettingBackground-el-form {
      display: flex;
      padding-left: 30px;
      .el-form-l {
        flex: 1;
        .el-input {
          width: 200px;
        }
      }
      .el-form-r {
        flex: 1;
      }
      .el-divider--vertical {
        height: 200px;
        position: relative;
        left: -30px;
      }
      .el-form-item__content {
        display: flex;
      }
    }
  }
}
</style>
