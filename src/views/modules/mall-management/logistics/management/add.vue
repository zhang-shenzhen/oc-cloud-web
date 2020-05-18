<template>
  <d2-container class="page">
    <h3
      class="list-title"
      style="margin-top:-10px;"
    >{{ $t('logistics.freightlist') }}</h3>
    <el-form
      ref="ruleForm"
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      size="mini"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item
        :label="$t('logistics.lab17')"
        prop="title2"
      >
        <el-col :span="12">
          <el-input
            v-model="ruleForm.title2"
            maxlength="20"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('logistics.yunfei')">
        <el-col :span="20">
          <div
            class="padding"
            style="width:60%"
          >
            <el-form-item
              :label="$t('logistics.lab11')"
              prop="title7"
            >
              <el-col :span="24">
                <el-input
                  v-model="ruleForm.title7"
                  style="width:100%;"
                  clearable
                  disabled
                />
              </el-col>
            </el-form-item>
            <div style="margin-bottom:20px">
              <el-button
                v-if="!ruleForm.title7"
                type="primary"
                @click="addqy()"
              >{{ $t('logistics.region') }}</el-button>
              <el-button
                v-if="ruleForm.title7"
                type="primary"
                @click="edit"
              >{{ $t('edit') }}</el-button>
              <el-button
                v-if="ruleForm.title7"
                @click="choosedet"
              >{{ $t('delete') }}</el-button>
            </div>
            <div v-if="ruleForm.title7">
              <el-form-item
                :label="$t('logistics.lab12')"
                prop="title3"
              >
                <el-col :span="12">
                  <el-input
                    v-model="ruleForm.title3"
                    type="number"
                    oninput="this.value=this.value.replace(/^(0+)|[^\d.]/g,'')"
                    clearable
                  />
                </el-col>
              </el-form-item>
              <el-form-item
                :label="$t('logistics.lab13')"
                prop="title4"
              >
                <el-col :span="12">
                  <el-input
                    v-model="ruleForm.title4"
                    type="number"
                    oninput="this.value=this.value.replace(/^(0+)|[^\d.]/g,'')"
                    clearable
                  />
                </el-col>
              </el-form-item>
              <el-form-item
                :label="$t('logistics.lab14')"
                prop="title5"
              >
                <el-col :span="12">
                  <el-input
                    v-model="ruleForm.title5"
                    type="number"
                    oninput="this.value=this.value.replace(/^(0+)|[^\d.]/g,'')"
                    clearable
                  />
                </el-col>
              </el-form-item>
              <el-form-item
                :label="$t('logistics.lab15')"
                prop="title6"
              >
                <el-col :span="12">
                  <el-input
                    v-model="ruleForm.title6"
                    type="number"
                    oninput="this.value=this.value.replace(/^(0+)|[^\d.]/g,'')"
                    clearable
                  />
                </el-col>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >{{ $t('confirm') }}</el-button>
        <el-button @click="resetForm()">{{ $t('cancel') }}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :title="$t('logistics.lab11')"
      :visible.sync="isshow"
      width="50%"
    >
      <div style="overflow:hidden;">
        <div class="height">
          <div
            v-for="(item, index) in options"
            :key="index"
            style="width:100%"
          >
            <div
              :class="{'pro':true,'bag':num == index?true:''}"
              @click="choose(item,index)"
            >{{ item.addressName }}</div>
          </div>
        </div>

        <div
          class="height"
          style="box-sizing:border-box;padding:5px 0 5px 20px;"
        >
          <template>
            <el-checkbox
              v-model="checkAll"
              style="width:100%"
              @change="handleCheckAllChange"
            >{{ $t('quanxuan') }}</el-checkbox>

            <el-checkbox
              v-for="(city,index) in optionscity"
              :key="city.id"
              v-model="city.list"
              :label="city.id"
              @change="change(city.list,index)"
            >{{ city.addressName }}</el-checkbox>
          </template>
        </div>

        <div class="height">
          <div
            v-for="(item, index) in chooseoptionscity"
            :key="index"
          >
            <div class="pro">{{ item.child[0].name }}</div>
          </div>
        </div>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="qydelete"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="Addmanagement"
        >{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import { addtransportExpense, gettransportExpense, updatetransportExpense } from '@/api/logistics/logistics'
import { Getcity } from '@/api/common'
export default {
  components: {},
  data() {
    return {
      checkAll: false,
      num: 0,
      isshow: false,
      ruleForm: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        title6: '',
        title7: ''
      },
      rules: {
        title2: [
          { required: true, message: this.$t('logistics.lab17') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title3: [
          { required: true, message: this.$t('logistics.lab12') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title4: [
          { required: true, message: this.$t('logistics.lab13') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title5: [
          { required: true, message: this.$t('logistics.lab14') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title6: [
          { required: true, message: this.$t('logistics.lab15') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title7: [
          { required: true, message: this.$t('logistics.lab11') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ]
      },
      // 提交信
      subInfo: {
        city: '',
        province: null,
        modelName: null,
        firstWeight: null,
        transportExpense: null,
        continuedHeavy: null,
        continuedExpense: null,
        userId: '',
        saveFlag: 1
      },
      options: [],
      optionscity: [],
      chooseoptionscity: [],
      type: 'add',
      chooseid: ''
    }
  },
  computed: {},
  created() {
    const userInfo = localStorage.getItem('userInfo')
    this.type = this.$route.query.type
    this.chooseid = this.$route.query.id
    this.subInfo.userId = userInfo.id
    this.GetcityListOne(1)
    if (this.type == 'edit' && this.chooseid != -1) {
      this.gettransportExpensemsg(this.chooseid)
    }
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    // 全选
    handleCheckAllChange(val) {
      this.chooseoptionscity = []
      this.optionscity.forEach((item) => {
        item.list = !!val
      })
      if (val) {
        this.optionscity.forEach((item) => {
          const x = {
            addressName: this.options[ this.num ].addressName,
            parentId: this.options[ this.num ].id,
            list: true,
            child: [{
              id: item.id,
              name: item.addressName
            }]
          }
          this.chooseoptionscity.push(x)
        })
      } else {
        this.chooseoptionscity = []
      }
    },
    // 选择市
    change(value, index) {
      this.chooseoptionscity = []
      this.optionscity[ index ].list = value
      if (this.optionscity.length > 0) {
        this.optionscity.forEach((item) => {
          if (item.list) {
            const x = {
              addressName: this.options[ this.num ].addressName,
              parentId: this.options[ this.num ].id,
              list: true,
              child: [{
                id: item.id,
                name: item.addressName
              }]
            }
            this.chooseoptionscity.push(x)
          }
        })
      }
      this.checkAll = this.chooseoptionscity.length == this.optionscity.length
      this.chooseoptionscity.forEach((item) => {
        if (this.checkAll) {
          item.list = true
        } else {
          item.list = false
        }
      })
    },

    // 取消选中
    qydelete() {
      if (this.type == 'add') {
        this.chooseoptionscity = []
        this.optionscity = []
        this.ruleForm.title7 = ''
        this.num = 0
        this.GetcityListTwo(this.options[ 0 ].id)
      }
      this.isshow = false
    },

    // 点击添加配送区域
    addqy() {
      this.checkAll = false
      this.isshow = true
    },
    // 编辑选择
    edit() {
      this.isshow = true
      if (this.type == 'edit') {
        this.optionscity = []
        if (this.options.length > 0 && this.chooseoptionscity.length > 0) {
          if (this.chooseoptionscity[ 0 ].list) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
          this.options.forEach((val, index) => {
            if (val.addressName == this.chooseoptionscity[ 0 ].addressName) {
              this.num = index
            }
          })
          this.GetcityListTwo(this.chooseoptionscity[ 0 ].parentId)
        }
      }
    },
    // 删除选择
    choosedet() {
      this.chooseoptionscity = []
      this.optionscity = []
      this.ruleForm.title7 = ''
      this.num = 0
      this.GetcityListTwo(this.options[ 0 ].id)
    },
    // 提提交数据
    submitForm(formName) {
      const that = this
      this.subInfo.modelName = this.ruleForm.title2
      this.subInfo.firstWeight = (this.ruleForm.title3 * 100).toFixed(2)
      this.subInfo.transportExpense = (this.ruleForm.title4 * 100).toFixed(2)
      this.subInfo.continuedHeavy = (this.ruleForm.title5 * 100).toFixed(2)
      this.subInfo.continuedExpense = (this.ruleForm.title6 * 100).toFixed(2)
      this.subInfo.province = this.options[ this.num ].addressName
      this.subInfo.dispatchArea =
        {
          selection: this.chooseoptionscity,
          distributionArea: this.ruleForm.title7
        }
      this.subInfo.dispatchArea =
        JSON.stringify(this.subInfo.dispatchArea
        )
      console.log(1000, this.subInfo)
      that.$refs[ formName ].validate(valid => {
        if (valid) {
          if (this.type == 'add') {
            that.getaddtransportExpense(that.subInfo)
          } else if (this.type == 'edit') {
            that.toupdatetransportExpense(that.subInfo)
          }
        } else {
          return false
        }
      })
    },

    resetForm() {
      this.$router.go(-1)
    },
    // 获取省
    GetcityListOne(id) {
      Getcity({}, id).then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.options = res.data
            this.GetcityListTwo(res.data[ 0 ].id)
          }
        }
      })
    },
    // 获取市
    GetcityListTwo(id) {
      this.optionscity = []
      Getcity({}, id).then(res => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            res.data.forEach((item) => {
              item.list = false
            })
            this.optionscity = res.data
            if (this.type == 'edit' && this.optionscity.length > 0) {
              this.chooseoptionscity.forEach((item) => {
                this.optionscity.forEach((val) => {
                  if (item.child[ 0 ].id == val.id) {
                    val.list = true
                  }
                })
              })
            }
          }
        }
      })
    },
    // 选择省获取市
    choose(item, index) {
      this.checkAll = false
      this.chooseoptionscity = []
      this.num = index
      this.GetcityListTwo(item.id)
    },
    // 选择确定
    Addmanagement() {
      if (this.chooseoptionscity.length == 0) {
        this.$message(this.$t('logistics.pro'))
      } else {
        this.subInfo.city = ''
        this.chooseoptionscity.forEach((item) => {
          this.subInfo.city += item.child[ 0 ].name + ','
        })
        this.subInfo.city = this.subInfo.city.substring(0, this.subInfo.city.length - 1)
        this.ruleForm.title7 =
          this.options[ this.num ].addressName +
          '|' + this.subInfo.city

        this.isshow = false
      }
    },
    // 新增运费模板
    getaddtransportExpense(info) {
      addtransportExpense(info).then(res => {
        if (res.code === 0) {
          this.$message({
            message: this.$t('logistics.addsuc'),
            type: 'success'
          })
          this.resetForm()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 模板详情
    gettransportExpensemsg(id) {
      gettransportExpense(id).then(res => {
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.ruleForm.title2 = res.data.list[ 0 ].modelName
            this.ruleForm.title3 = (res.data.list[ 0 ].firstWeight / 100).toFixed(2)
            this.ruleForm.title4 = (res.data.list[ 0 ].transportExpense / 100).toFixed(2)
            this.ruleForm.title5 = (res.data.list[ 0 ].continuedHeavy / 100).toFixed(2)
            this.ruleForm.title6 = (res.data.list[ 0 ].continuedExpense / 100).toFixed(2)
            this.subInfo.province = res.data.list[ 0 ].province
            this.subInfo.id = res.data.list[ 0 ].id
            this.options.forEach((val, index) => {
              if (val.addressName == res.data.list[ 0 ].province) {
                this.num = index
              }
            })
            this.subInfo.city = res.data.list[ 0 ].city
            const x = JSON.parse(res.data.list[ 0 ].dispatchArea
            )
            this.ruleForm.title7 = x.distributionArea
            this.chooseoptionscity = x.selection
          }
        }
      })
    },
    // 编辑运费模板
    toupdatetransportExpense(info) {
      updatetransportExpense(info).then(res => {
        if (res.code === 0) {
          this.$message({
            message: this.$t('logistics.editsuc'),
            type: 'success'
          })
          this.resetForm()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.padding {
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #cdcdcd;
}
.box {
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  .radio_sty {
    margin: 0 10%;
  }
  .inbox_sty {
    margin-bottom: 20px;
  }
  .icon_sty {
    font-size: 18px;
    color: red;
    font-weight: 800;
    cursor: pointer;
  }
}
.height {
  width: 150px;
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #cdcdcd;
  float: left;
  margin-right: 30px;
}
.pro {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}
.bag {
  background: #ccc;
}
</style>
