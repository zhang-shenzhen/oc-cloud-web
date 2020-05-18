<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('distri.title') }}</h3>

    <el-form ref="ruleForm"
             label-position="left"
             :model="ruleForm"
             :rules="rules"
             size="mini"
             label-width="180px"
             class="demo-ruleForm">
      <el-form-item :label="$t('distri.lab1')"
                    prop="title1">
        <el-col :span="8">
          <el-input v-model="ruleForm.title1"
                    style="width:100px"
                    oninput="this.value=this.value.replace(/\D/g,'')"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('distri.lab2')"
                    prop="title2">
        <el-col :span="8">
          <el-col :span="24"
                  style="color:#cdcdcd">
            {{ $t('distri.lab3') }} {{ $t('distri.lab4') }}
          </el-col>
          <el-input v-model="ruleForm.title2"
                    style="width:100px"
                    oninput="this.value=this.value.replace(/\D/g,'')"
                    clearable />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('distri.lab5')"
                    prop="title3">
        <el-col :span="8">
          <el-col :span="20"
                  style="color:#cdcdcd">
            {{ $t('distri.lab6') }}
          </el-col>
          <el-input v-model="ruleForm.title3"
                    style="width:100px"
                    oninput="this.value=this.value.replace(/\D/g,'')"
                    clearable />
        </el-col>
      </el-form-item>
      <div class="border">
        <el-form-item v-for="(item, index) in tablist"
                      :key="index"
                      style="margin-bottom:100px;margin-left: -180px;">
          <div :span="24"
               style="height: 60px;display: flex;align-items: center;">
            <span class="margin">{{ $t('distri.lab7') }}</span>
            <el-input v-model="item.commissionStartMoney"
                      style="width:100px"
                      oninput="this.value=this.value.replace(/\D/g,'')"
                      clearable />
            <span class="margin">{{ $t('distri.lab8') }}</span>
            <div style="float:right;margin-right:200px;margin-left:250px;width:120px">
              <div class="jia"
                   style="margin-right:20px;"
                   @click="add(index)">
                +
              </div>
              <div class="jia"
                   @click="reduce(index)">-</div>
            </div>
          </div>
          <div>
            <div style="float:right;margin-right:200px">
              <span>
                {{ $t('distri.lab6') }}
              </span>
              <el-input v-model="item.commissionProportion"
                        style="width:100px"
                        oninput="this.value=this.value.replace(/\D/g,'')"
                        clearable />
            </div>
          </div>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">{{
          $t('confirm')
        }}</el-button>
        <el-button @click="resetForm()">{{ $t('cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { addsetLevel, findLevelInfo } from '@/api/distribution/distribution'
import { mapState } from "vuex";
export default {
  name: 'Returncommission',
  components: {},
  data () {
    return {
      ruleForm: {
        title1: '',
        title2: '',
        title3: ''
      },
      rules: {
        title1: [
          {
            required: true,
            message: this.$t('distri.lab1') + '  ' + this.$t('logistics.empty'),
            trigger: 'blur'
          }
        ],
        title2: [
          {
            required: true,
            message: this.$t('distri.lab2') + '  ' + this.$t('logistics.empty'),
            trigger: 'blur'
          }
        ],
        title3: [
          {
            required: true,
            message: this.$t('distri.lab5') + '  ' + this.$t('logistics.empty'),
            trigger: 'blur'
          }
        ]
      },
      tablist: [
        {
          commissionStartMoney: '',
          commissionProportion: '',
          createUserId: 1,
          level: 2
        }
      ],
      subInfo: {
        minimumMoneyDTO: { minimumMoney: '', createUserId: 1 },
        memberCommissionLevelList: []
      },
      userinfo: {}
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.userInfo = localStorage.getItem('userInfo')
    this.tablist.createUserId = this.userInfo.id
    this.subInfo.minimumMoneyDTO.createUserId = this.userInfo.id
    this.findLevelInfoInterface()
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subInfo.memberCommissionLevelList = []
          this.subInfo.minimumMoneyDTO.minimumMoney = this.ruleForm.title1
          this.subInfo.memberCommissionLevelList.push({
            commissionStartMoney: 0,
            commissionProportion: this.ruleForm.title2,
            createUserId: this.userInfo.id,
            level: 0
          })
          this.subInfo.memberCommissionLevelList.push({
            commissionStartMoney: 0,
            commissionProportion: this.ruleForm.title3,
            createUserId: this.userInfo.id,
            level: 1
          })
          this.tablist.forEach((item, index) => {
            if (!item.commissionStartMoney) {
              this.$message.error(this.$t('distri.lab9'))
              return
            }
            if (!item.commissionProportion) {
              this.$message.error(this.$t('distri.lab10'))
              return
            }
            if (item.commissionStartMoney && item.commissionProportion) {
              item.level = index + 2
              this.subInfo.memberCommissionLevelList.push(item)
            }
          })
          if (
            this.subInfo.memberCommissionLevelList.length > 0 &&
            this.subInfo.memberCommissionLevelList.length ==
            this.tablist.length + 2
          ) {
            this.addsetLevelInterface(this.subInfo)
          }
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.tablist = [
        {
          commissionStartMoney: '',
          commissionProportion: '',
          createUserId: this.userInfo.id,
          level: 2
        }
      ]
      this.ruleForm = {
        title1: '',
        title2: '',
        title3: ''
      }
      this.subInfo = {
        minimumMoneyDTO: { minimumMoney: '', createUserId: this.userInfo.id },
        memberCommissionLevelList: []
      }
    },
    add (index) {
      this.tablist.push({
        commissionStartMoney: '',
        commissionProportion: '',
        createUserId: this.userInfo.id,
        level: 2
      })
    },
    reduce (index) {
      if (index != 0) {
        this.tablist.splice(index, 1)
      } else {
        return
      }
    },
    // 设置 接口
    addsetLevelInterface (info) {
      addsetLevel(info).then(res => {
        if (res.code === 0) {
          this.$message({
            message: this.$t('distri.lab11'),
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 设置查询
    findLevelInfoInterface () {
      findLevelInfo({
        ChannelId: this.info.ChannelId
      }).then(res => {
        if (res.code === 0 && res.data) {
          this.ruleForm.title1 = res.data.minimumMoneyDTO.minimumMoney
          if (res.data.memberCommissionLevelList.length > 0) {
            this.ruleForm.title2 =
              res.data.memberCommissionLevelList[0].commissionProportion
            this.ruleForm.title3 =
              res.data.memberCommissionLevelList[1].commissionProportion
            res.data.memberCommissionLevelList.forEach((item, index) => {
              if (index == 0) {
                this.ruleForm.title2 = item.commissionProportion
              }
              if (index == 1) {
                this.ruleForm.title3 = item.commissionProportion
              }
              if (index == 2) {
                this.tablist[0].commissionStartMoney = item.commissionStartMoney
                this.tablist[0].commissionProportion = item.commissionProportion
              }
              if (index > 2) {
                this.tablist.push({
                  commissionStartMoney: item.commissionStartMoney,
                  commissionProportion: item.commissionProportion,
                  createUserId: this.userInfo.id,
                  level: item.level
                })
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.border {
  width: 100%;
  height: auto;
  border-top: 1px solid #cdcdcd;
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
}
.margin {
  margin: 0 10px;
}
.el-input {
  width: none !important;
}
.jia {
  font-size: 18px;
  float: left;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #409eff;
  border-radius: 50%;
  cursor: pointer;
}
.el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
</style>
