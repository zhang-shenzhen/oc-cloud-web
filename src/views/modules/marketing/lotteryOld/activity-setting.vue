<template>
  <div class="activitySettingBackground">
    <el-form
      ref=""
      :model="form"
      label-width="120px"
      :rules="rules"
      class="demo-ruleForm"
      size="mini"
    >
      <div style="display:flex">
        <el-form-item
          prop="name"
          label="活动名称"
          style="display:flex"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <div class="redTxt">(字数不超过20)</div>
      </div>
      <el-form-item
        label="参与活动时间"
        prop="date1"
      >
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />
      </el-form-item>

      <div style="display:flex">
        <el-form-item
          label="用户每天可参与轮次"
          style="display:flex"
          prop="desc1"
        >
          <el-input
            v-model.number="form.lotteryTimesOneDay"
            type="number"
          />
        </el-form-item>
        <div class="redTxt">(上限20)</div>
      </div>

      <div style="display:flex">
        <el-form-item
          label="用户可参与总次数"
          style="display:flex"
        >
          <el-input
            v-model="form.personLotteryTimes"
            type="input"
          />
        </el-form-item>
        <div class="redTxt">(不填默认不限次数)</div>
      </div>

      <div style="display:flex">
        <el-form-item
          label="活动总参与次数"
          style="display:flex"
        >
          <el-input
            v-model="form.maxLotteryTimes"
            type="input"
          />
        </el-form-item>
        <div class="redTxt">(不填默认不限次数)</div>
      </div>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ActivitySetting',
  components: {
  },
  props: {
    showType: {
      type: Boolean,
      default: false
    },
    datas: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      'form': {

      },
      numberValidateForm: {
        age: ''
      },
      rules: {
        'name': [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度应小于20', trigger: 'blur' }
        ],
        'date': [
          { type: 'array', required: true, message: '请选择日期', trigger: 'change' }
        ],
        'lotteryTimesOneDay': [
          { required: true, message: '请填写用户每天可参与轮次', trigger: 'blur' },
          { type: 'number', min: 1, max: 20, message: '上限20次', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.form = this.$store.state.luckyData
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {

    integralThis(type, v) {
      this.integralType = type
      console.log(type, v, 111111)
    }

  }
}
</script>

<style lang="scss" scope>
.activitySettingBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;

  position: relative;
  margin-left: 40px;
  .el-timeline-item__timestamp.is-top {
    position: relative !important;
    left: -100px;
  }
}
</style>
<style lang="scss">
.activitySettingBackground {
  .redTxt {
    padding-left: 20px;
    line-height: 30px;
    font-size: 12px;
    color: red;
  }
  .el-dialog__wrapper {
    .el-dialog {
      margin-top: 0 !important;
      left: 100%;
      margin-left: -30%;
      //  height: 100%;
    }
  }

  .el_fomr_label {
    line-height: 60px;
    font-size: 16px;
  }
  .el-form-item {
    .el-form-item__label {
      // width: 100% !important;
      color: #000;
      text-align: left;
      min-width: 150px;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      .el-textarea {
        width: 400px;
      }
      .el-input {
        width: 400px;
      }
      .el-select {
        width: 400px;
      }
    }
  }
}
</style>
