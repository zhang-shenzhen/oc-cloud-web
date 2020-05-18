<template>
  <d2-container class="page">
    <div class="sweepstakesInfoBackground">
      <el-steps
        :active="active"
        finish-status="success"
        style="width:980px;font-size:12px;"
      >
        <el-step title="活动设置" />
        <el-step title="奖品设置" />
        <el-step title="概率设置" />
        <el-step title="页面设置" />
      </el-steps>

        <el-alert
          v-if='isLook'
          title="此页面只可查看不可编辑"
          type="warning"
          style="margin-top:20px"
          show-icon>
        </el-alert>

      <!-- tabMob -->
      <el-divider />
      <el-form
        class="el-forms"
        size="mini"
      >
        <el-form-item>
          <el-radio-group
            v-model="active"
            :disabled="false"
            align-center
          >
            <el-radio-button :label="1">活动设置</el-radio-button>
            <el-radio-button :label="2">奖品设置</el-radio-button>
            <el-radio-button :label="3">概率设置</el-radio-button>
            <el-radio-button :label="4">页面设置</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <!-- <keep-alive>

      </keep-alive> -->
      <component
        :is="settings"
        v-if="settings"
        :ref="settings"
        :tinymce-type="tinymceType"
      />
      <el-divider />
      <el-button
        v-if="active>1"
        size="mini"
        type="primary"
        @click="activeChange('-')"
      >上一步</el-button>
      <el-button
        v-if="active<4"
        size="mini"
        type="primary"
        @click="activeChange('+')"
      >下一步</el-button>
      <el-button
        v-if="active==4 && !isLook"
        size="mini"
        type="primary"
        @click="subSweep(true)"
      >完成</el-button>
      <el-button
        size="mini"
        @click="subSweep(false)"
      >取消</el-button>
    </div>
    <!-- created情况下 点击上一步 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>返回上一页将会使该页数据丢失，请确认</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="centerDialogVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="stepOut"
        >确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import activitySetting from './activity-setting'
import prizeSetting from './prize-setting'
import pageSetting from './page-setting'
import ProbabilitySetting from './probability-setting'
import { getLottery, createLottery, modify } from '@/api/marketing/lottery'
import luckyData from './luckyData' // 导入后端需要 数据结构
export default {
  components: {
    'activity_setting': activitySetting,
    'prize_setting': prizeSetting,
    'page_setting': pageSetting,
    'Probability_setting': ProbabilitySetting
  },
  data() {
    return {
      active: 1, // 进度步长控制
      settings: null, // 当前视图选中
      isCallData: false, // 回收数据状态
      tinymceType: true,
      isCreated: false, // 是否为新建状态
      nextType: 1,
      centerDialogVisible: false,
      isLook:false,

      // 重构数据结构
      // 抽奖数据

    }
  },
  computed: {

  },
  watch: {
    active(nv, ov) {
      if (this.isCreated && nv > ov && !this.nextType) {
        console.log('不该跳跃')
        this.$nextTick(function() {
          this.$set(this, 'active', ov)
        })

        return
      }
      this.activeStepChange(nv, ov)
    }
  },
  created() {
    console.log('luckyData', { ...luckyData })
    // 是否是新建状态
    if (this.$route.query.OTP == 1) {
      this.isCreated = true // 新建状态
      this.$store.state.luckyData = { ...luckyData } // 数据源 注入VUEX
      console.log('this.$store.state.luckyData', { ...luckyData })
      this.settings = 'activity_setting' // 展示 当前子组件；
    }else if (this.$route.query.OTP == 3) {
      this.isLook=true
      this.getLotteryInfo(this.$route.query.id) // 获取当前ID的 活动详情
    } else {
      this.getLotteryInfo(this.$route.query.id) // 获取当前ID的 活动详情
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    // 获取抽奖详情
    getLotteryInfo(id) {
      getLottery({ id: id }).then(res => {
        console.log('getLotteryInfo活动详情', res)
        res.prizeRules.map(d => {
          d.rounds=d.rounds==null?[]:d.rounds
          return d.probabilitys.map(p=>{
            var probability = p.probability;
            p.probability = parseInt(probability * 100)
            return p;
          })
        })
        this.$store.state.luckyData = res
        this.settings = 'activity_setting'
      })
    },
    // 步长变动
    activeChange(type) {
      console.log('this.$store.state.luckyData', { ...this.$store.state.luckyData })
      // 必填校验
      if (type == '+') {
        // 变更下一步状态
        this.submitForms() // 表单验证
        if (this.active == 3) this.submitForms3() // 针对this.active==3 单独的验证
        if (!this.nextType) return // 如果当前步长状态 为false 则不允许 下一步；由表单验证 控制
        this.active++
      } else if (type == '-') {
        if (this.isCreated) this.centerDialogVisible = true
        else this.active--
      }
    },
    // 选择 步长 变更
    activeStepChange(nv, ov) {
      switch (nv) {
        case 1:
          this.settings = 'activity_setting'
          break
        case 2:
          this.settings = 'prize_setting'
          break
        case 3:
          this.settings = 'Probability_setting'
          break
        case 4:
          this.settings = 'page_setting'
          break
      }
      // 变更下一步状态
      this.nextType = false
    },
    stepOut() {
      this.centerDialogVisible = false
      this.active--
      // this.$store.state.sweepstakInfo[ this.settings ] = this.sweepstakInfoCP[ this.settings ]
    },
    // 必填验证提交前
    submitForms() {
      this.$refs[ this.settings ].$children.map((d, idx) => {
        if (d.$el._prevClass.indexOf('el-form') > -1) {
          return this.submitForm(d)
        }
      })
    },
    // 实际进行表单验证
    submitForm(el) {
      const that = this
      el.validate((valid) => {
        if (valid) {
          that.nextType = true
        } else {
          this.$notify.error({
            title: '错误',
            message: '请完善信息提醒'
          })
          that.nextType = false
        }
      })
    },
    // 只验证 active == 3
    submitForms3() {
      this.$refs[ this.settings ][ 'form' ].prizeRules.map(d => {
        if (!d.type) {
          if(this.$route.query.OTP != 3){
            this.$notify.error({
              title: '错误',
              message: '请完善信息提醒'
            })
            this.nextType = false
          }
        }
      })
    },
    checkTime(i){
       if (i<10){
           i="0" + i
       }
       return i;
    },
    changeData(d){
      var date = new Date(d);  
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + this.checkTime(date.getHours()) + ':' + this.checkTime(date.getMinutes()) + ':' + this.checkTime(date.getSeconds()); 
    },
    // 提交数据
    subSweep(t) {
      console.log(this.isLook)
      if (t) {
        let LD = this.$store.state.luckyData
        LD.date[ 0 ]=this.changeData(LD.date[ 0 ])
        LD.date[ 1 ]=this.changeData(LD.date[ 1 ])
        LD.startTime = LD.date[ 0 ]
        LD.endTime = LD.date[ 1 ]

        LD.prizeRules.map(d => {
          return d.probabilitys.map(p=>{
            var probability = p.probability;
            p.probability = parseFloat(probability / 100)
            return p;
          })
        })
        console.log('LD', LD)
        if (this.isCreated) {
          createLottery(LD).then(res => {
            console.log('新建--提交数据', res)
          })
        } else {
          modify(LD).then(res => {
            console.log('更新--提交数据', res)
          })
        }
      }
      this.$store.state.luckyData = {}
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scope>
.sweepstakesInfoBackground {
  // padding: 20px;
  // background: #fff;
  // border-radius: 10px;
  // margin: 10px;
  // min-width: 1080px;
  // height: 780px;
  // box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
  // // max-width: 1180px;
  // overflow: auto;
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .el-forms {
    display: flex;
    .search-box {
      display: flex;
      .search-box-btn {
        // line-height: 40px;
        /* padding: 10px; */
        // width: 60px;
        text-align: center;
        background: #66b1ff;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        margin-left: -5px;
        border: none;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .v-name {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
<style lang="scss" >
.el-step__title {
  font-size: 14px;
}
.sweepstakesInfoBackground {
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
    .v-label {
      background: rgb(51, 204, 153);
      color: #fff;
      padding: 5px;
    }
  }
}
</style>
