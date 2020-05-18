<template>
  <d2-container class="page">
    <h3
      class="list-title"
      style="margin-top:-10px;"
    >{{ $t('logistics.addcompany') }}</h3>
    <el-form
      ref="ruleForm"
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      size="mini"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item
        :label="$t('logistics.lab1')"
        prop="title1"
      >
        <el-col :span="8">
          <el-select
            v-model="ruleForm.title1"
            size="mini"
            clearable
            :placeholder="$t('logistics.choosename')"
          >
            <el-option
              v-for="item in findLogisticeList"
              :key="item.com"
              :label="item.com"
              :value="item.com"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('logistics.lab2')"
        prop="title2"
      >
        <el-col :span="8">
          <el-input
            v-model="ruleForm.title2"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('logistics.lab4')"
        prop="title3"
      >
        <el-col :span="8">
          <el-input
            v-model="ruleForm.title3"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('logistics.lab3')"
        prop="title4"
      >
        <el-col :span="8">
          <el-input
            v-model="ruleForm.title4"
            type="number"
            oninput="this.value=this.value.replace(/\D/g,'')"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item
        :label="$t('logistics.lab5')"
        prop="title5"
      >
        <el-col :span="8">
          <el-input
            v-model="ruleForm.title5"
            clearable
          />
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
  </d2-container>
</template>
<script>

import { getfindLogisticeList, addlogistics, updateLogistice } from '@/api/logistics/logistics'
export default {
  data() {
    return {
      options: [
        {
          name: '1',
          id: '1'
        },
        {
          name: '2',
          id: '2'
        }

      ],
      currentPage: 1,
      total: 0,
      ruleForm: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: ''
      },
      rules: {
        title1: [
          { required: true, message: this.$t('logistics.lab1') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title2: [
          { required: true, message: this.$t('logistics.lab2') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title3: [
          { required: true, message: this.$t('logistics.lab4') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title4: [
          { required: true, message: this.$t('logistics.lab3') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ],
        title5: [
          { required: true, message: this.$t('logistics.lab5') + '  ' + this.$t('logistics.empty'), trigger: 'blur' }
        ]
      },
      // 提交信息
      subInfo: {
        name: null,
        address: null,
        contacts: null,
        phone: null,
        settleStyle: null
      },
      findLogisticeList: [],
      type: 'add',
      id: ''
    }
  },
  computed: {},
  created() {
    this.getfindLogisticeList()
    this.type = this.$route.query.type
    const msg = this.$route.query.msg
    if (this.$route.query.type == 'edit') {
      this.ruleForm.title1 = msg.name
      this.ruleForm.title2 = msg.address
      this.ruleForm.title3 = msg.contacts
      this.ruleForm.title4 = msg.phone
      this.ruleForm.title5 = msg.settleStyle
      this.subInfo.id = msg.id
    } else if (this.$route.query.type == 'add') {
      this.ruleForm = {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: ''
      }
    }
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    submitForm(formName) {
      const that = this
      this.subInfo.name = this.ruleForm.title1
      this.subInfo.address = this.ruleForm.title2
      this.subInfo.contacts = this.ruleForm.title3
      this.subInfo.phone = this.ruleForm.title4
      this.subInfo.settleStyle = this.ruleForm.title5
      that.$refs[ formName ].validate(valid => {
        if (valid) {
          if (that.type == 'add') {
            that.addfindLogistice(that.subInfo)
          } else if (that.type == 'edit') {
            that.editfindLogistice(that.subInfo)
          }
        } else {
          return false
        }
      })
    },

    resetForm() {
      this.$router.go(-1)
    },
    // 获取物流公司列表
    getfindLogisticeList() {
      getfindLogisticeList({}).then(res => {
        if (res.code === 0) {
          this.findLogisticeList = res.data
        }
      })
    },
    // 添加物流公司
    addfindLogistice(info) {
      addlogistics(info).then(res => {
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
    // 编辑物流公司
    editfindLogistice(info) {
      updateLogistice(info).then(res => {
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
</style>
