<template>
  <d2-container class="page">
    <el-form
      ref="Form"
      :model="ruleForm"
      :rules="rules"
      label-position="left"
      label-width="120px"
      style="width:800px;"
    >
      <h3>{{ $t('user.h3_1') }}</h3>
      <el-form-item :label="$t('user.form1')" prop="email">
        <el-input
          v-model="ruleForm.email"
          size="small"
          type="email"
          :disabled="type == 'look' || type == 'update'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form2')" prop="gender">
        <el-radio-group v-model="ruleForm.gender" :disabled="type == 'look'">
          <el-radio :label="1">男/male</el-radio>
          <el-radio :label="2">女/female</el-radio>
          <el-radio :label="3">保密/secrecy</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('user.form3')" prop="roleId">
        <el-select
          v-model="ruleForm.roleId"
          :disabled="type == 'look'"
          style="width:100%;"
          size="small"
          :placeholder="$t('pla2')"
        >
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.form4')" prop="departmentName">
        <el-input
          v-model="ruleForm.departmentName"
          size="small"
          :disabled="true"
          :placeholder="$t('pla2')"
        />
        <el-tree
          v-if="type != 'look'"
          :data="treeData"
          default-expand-all
          :props="defaultProps"
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleNodeClickModel"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form5')" prop="status">
        <el-radio-group v-model="ruleForm.status" :disabled="type == 'look'">
          <el-radio :label="1">正常/normal</el-radio>
          <el-radio :label="2">离职/Quit</el-radio>
        </el-radio-group>
      </el-form-item>

      <h3>{{ $t('user.h3_2') }}</h3>

      <el-form-item :label="$t('user.form19')" prop="companyName">
        <el-input
          v-model="ruleForm.companyName"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form6')" prop="name">
        <el-input
          v-model="ruleForm.name"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form7')" prop="ename">
        <el-input
          v-model="ruleForm.ename"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form8')" prop="position">
        <el-input
          v-model="ruleForm.position"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form9')" prop="eposition">
        <el-input
          v-model="ruleForm.eposition"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.form10')" prop="companyLogoId">
        <!-- <el-select
          style="width:100%;"
          size="small"
          v-model="ruleForm.companyLogoId"
          :placeholder="$t('pla2')"
          :disabled="type == 'look'"
        >
          <el-option
            v-for="(item,index) in logoList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>-->

        <el-radio-group
          v-model="ruleForm.companyLogoId"
          :disabled="type == 'look'"
        >
          <el-radio
            v-for="(item, index) in logoList"
            :key="index"
            :label="item.id"
          >
            <img
              style="width:50px;height:50px;position:relative;top:15px;"
              :src="$fileUrl() + item.logo"
            />
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('user.form11')" prop="region">
        <el-switch
          v-model="ruleForm.companyLogoDescriptionOpen"
          :disabled="type == 'look'"
          @change="seithChange"
        />
        <el-input
          v-if="ruleForm.companyLogoDescriptionOpen"
          v-model="ruleForm.companyLogoDescription"
          size="small"
          :placeholder="$t('pla1')"
          :disabled="type == 'look'"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form12')" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          size="small"
          :disabled="type == 'look' || type == 'update'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form13')" prop="phoneExtra">
        <el-input
          v-model="ruleForm.phoneExtra"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form14')" prop="tel">
        <el-input
          v-model="ruleForm.tel"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form15')" prop="linearTel">
        <el-input
          v-model="ruleForm.linearTel"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form16')">
        <el-input
          v-model="ruleForm.email"
          size="small"
          :disabled="true"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form17')" prop="address">
        <el-input
          v-model="ruleForm.address"
          size="small"
          :disabled="type == 'look'"
          :placeholder="$t('pla1')"
        />
      </el-form-item>

      <el-form-item :label="$t('user.form18')" prop="logo">
        <div class="img-upload">
          <img
            v-if="ruleForm.logo != null"
            style="width:100%;"
            :src="$fileUrl() + ruleForm.logo"
          />
          <div v-if="ruleForm.logo == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage
            v-if="type != 'look'"
            type="custom"
            @successCBK="imageSuccessCBK"
          />
        </div>
        <div style="width:100%;height:30px;line-height:30px;color:red;">
          头像宽高比：4:5，图片大小不超过多少100kb，图片格式支持jpg、png
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          :disabled="type == 'look'"
          @click="submitForm('Form')"
          >{{ type == 'add' ? $t('save') : $t('update') }}</el-button
        >
        <el-button size="mini" @click="getback">{{ $t('cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import {
  list,
  addUser,
  updateUser,
  userLogos,
  userDetails,
  roleList,
} from '@/api/surbanajurong/permission'
import editorImage from '@/components/Tinymce/components/editorImage'
export default {
  name: 'AddDepatmentMember',
  components: { editorImage },
  data() {
    return {
      type: null,
      ruleForm: {
        departmentName: null,
        address: null, // 地址
        companyLogoDescription: null, // 名片公司logo下方描述
        companyLogoDescriptionOpen: false, // 是否开启公司logo描述
        departmentId: null, // 部门id
        email: null, // 登录名（邮箱)
        gender: null, // 性别
        status: null, // 状态
        roleId: null, // 角色id
        ename: null, // 姓名(英文)
        name: null, // 姓名
        eposition: null, // 岗位(英文)
        position: null, // 岗位
        companyLogoId: null, // 名片中公司logo的id
        phone: null, // 手机号1
        phoneExtra: null, // 额外手机号（第二手机号）
        logo: null, // logo
        tel: null, // 电话
        linearTel: null, // 直线电话
        companyName: null, // 公司名称
        extraInfo: {},
      },
      treeData: [],
      roleList: [],
      defaultProps: {
        children: 'childList',
        label: 'name',
      },
      logoList: [],
      rules: {
        email: [
          { required: true, message: this.$t('user.rule1'), trigger: 'blur' },
        ],
        gender: [
          { required: true, message: this.$t('user.rule2'), trigger: 'change' },
        ],
        departmentName: [
          { required: true, message: this.$t('user.rule3'), trigger: 'change' },
        ],
        roleId: [
          { required: true, message: this.$t('user.rule4'), trigger: 'change' },
        ],
        status: [
          { required: true, message: this.$t('user.rule5'), trigger: 'change' },
        ],
        name: [
          { required: true, message: this.$t('user.rule6'), trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: this.$t('user.rule12'), trigger: 'blur' },
        ],
        ename: [
          { required: true, message: this.$t('user.rule7'), trigger: 'blur' },
        ],
        position: [
          { required: true, message: this.$t('user.rule8'), trigger: 'blur' },
        ],
        eposition: [
          { required: true, message: this.$t('user.rule9'), trigger: 'blur' },
        ],
        companyLogoId: [
          {
            required: true,
            message: this.$t('user.rule10'),
            trigger: 'change',
          },
        ],
        phone: [
          { required: true, message: this.$t('user.rule11'), trigger: 'blur' },
        ],
      },
    }
  },
  computed: {},
  created() {
    this.getlogo()
    this.getRole()
    this.getList()
    if (this.$route.query.id) {
      this.userDetails(this.$route.query.id)
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getlogo() {
      userLogos({}).then((res) => {
        if (res.code == 0) {
          this.logoList = res.data
        }
      })
    },
    getRole() {
      const params = {
        size: 1000,
        page: 1,
      }
      roleList(params).then((res) => {
        console.log('角色列表', res)
        this.roleList = res.data.data
      })
    },
    getList() {
      this.treeData = []
      list({
        page: 1,
        size: 1000,
      }).then((res) => {
        if (res.code == 0) {
          this.treeData = res.data
        }
      })
    },
    userDetails(id) {
      userDetails({
        id: id,
      }).then((res) => {
        if (res.code == 0) {
          res.data.extraInfo = res.data.extraInfo
            ? JSON.parse(res.data.extraInfo)
            : { companyName: null }
          this.ruleForm = res.data
          this.$set(
            this.ruleForm,
            'companyName',
            res.data.extraInfo.companyName
          )
          console.log('this.ruleForm', this.ruleForm)
        }
      })
    },
    handleNodeClickModel(e) {
      this.ruleForm.departmentName = e.name
      this.ruleForm.departmentId = e.id
    },
    seithChange() {
      if (!this.ruleForm.companyLogoDescriptionOpen) {
        this.ruleForm.companyLogoDescription = null
      }
    },
    getLogo(id) {
      let url = ''
      this.logoList.map((val) => {
        if (id == val.id) {
          url = val.url
        }
      })
      return url
    },
    submitForm(formName) {
      let status = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.email = this.ruleForm.email.trim().toLowerCase()
          this.ruleForm.extraInfo.companyName = this.ruleForm.companyName
          this.ruleForm.extraInfo = JSON.stringify(this.ruleForm.extraInfo)

          if (!this.$isNull(this.ruleForm.email)) {
            var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if (!regemail.test(this.ruleForm.email)) {
              status = false
              this.$notify.error({
                title: this.$t('error'),
                message: this.$t('role.error4'),
              })
              return
            }
          }

          // if (!this.$isNull(this.ruleForm.phone)) {
          //   var reg = /^1[3456789]\d{9}$/
          //   if (!reg.test(this.ruleForm.phone)) {
          //     status = false
          //     this.$notify.error({
          //       title: this.$t('error'),
          //       message: this.$t('role.error5'),
          //     })
          //     return
          //   }
          // }

          // if (!this.$isNull(this.ruleForm.phoneExtra)) {
          //   var reg = /^1[3456789]\d{9}$/
          //   if (!reg.test(this.ruleForm.phoneExtra)) {
          //     status = false
          //     this.$notify.error({
          //       title: this.$t('error'),
          //       message: this.$t('role.error6'),
          //     })
          //     return
          //   }
          // }

          if (status) {
            this.ruleForm.companylogo = this.getLogo(
              this.ruleForm.companyLogoId
            )
            if (this.type == 'add') {
              addUser(this.ruleForm).then((res) => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t('success'),
                    message: this.$t('op_success'),
                    type: 'success',
                  })
                  this.getback()
                }
              })
            } else {
              // 编辑
              updateUser(this.ruleForm).then((res) => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t('success'),
                    message: this.$t('op_success'),
                    type: 'success',
                  })
                  this.getback()
                }
              })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    imageSuccessCBK(e) {
      // console.log(e);
      this.ruleForm.logo = e[0].url[0].url
    },
    getback() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.img-upload {
  width: 150px;
  position: relative;
}
.upload-box {
  width: 100px;
  height: 100px;
  border: 1px dashed #dddddd;
  cursor: pointer;
}
.logoIcon {
  font-size: 40px;
  color: #dddddd;
  margin: 30px;
}
</style>
