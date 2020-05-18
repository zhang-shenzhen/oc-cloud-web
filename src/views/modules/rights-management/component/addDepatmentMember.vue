<template>
  <d2-container class="page">
    <el-form ref="Form"
             :model="ruleForm"
             :rules="rules"
             label-position="left"
             label-width="120px"
             style="width:800px;">
      <h3>{{ $t('user.h3_1') }}</h3>
      <!-- 登录名(手机号) -->
      <el-form-item label="登录名(手机号)"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  size="small"
                  type="email"
                  :disabled="type == 'look' || type == 'update'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="ruleForm.password"
                  type="password"
                  size="small"
                  show-password
                  :disabled="type == 'look' || type == 'update'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 性别 -->
      <el-form-item :label="$t('user.form2')"
                    prop="sex">
        <el-radio-group v-model="ruleForm.sex"
                        :disabled="type == 'look'">
          <el-radio :label="1">男 / male</el-radio>
          <el-radio :label="2">女 / female</el-radio>
          <el-radio :label="0">保密 / secrecy</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item :label="$t('user.form3')"
                    prop="roleIds">
        <el-select v-model="ruleForm.roleIds"
                   :disabled="type == 'look'"
                   style="width:100%;"
                   size="small"
                   :placeholder="$t('pla2')">
          <el-option v-for="(item, index) in roleList"
                     :key="index"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>
      <!-- 所属部门 -->
      <el-form-item :label="$t('user.form4')"
                    prop="departmentName">
        <el-input v-model="ruleForm.departmentName"
                  size="small"
                  :disabled="true"
                  :placeholder="$t('pla2')" />
        <el-tree v-if="type != 'look'"
                 :data="treeData"
                 default-expand-all
                 :props="defaultProps"
                 highlight-current
                 :expand-on-click-node="false"
                 @node-click="handleNodeClickModel" />
      </el-form-item>
      <!-- 状态 -->
      <el-form-item :label="$t('user.form5')"
                    prop="status">
        <el-radio-group v-model="ruleForm.status"
                        :disabled="type == 'look'">
          <el-radio :label="1">正常 / normal</el-radio>
          <el-radio :label="2">离职 / Quit</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 名片内容 -->
      <h3>{{ $t('user.h3_2') }}</h3>
      <!-- 公司名称 -->
      <el-form-item label="公司名称"
                    prop="companyName">
        <el-input v-model="ruleForm.companyName"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 姓名 -->
      <el-form-item :label="$t('user.form6')"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 姓名(EN） -->
      <el-form-item :label="$t('user.form7')"
                    prop="nameEn">
        <el-input v-model="ruleForm.nameEn"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 岗位名称 -->
      <el-form-item :label="$t('user.form8')"
                    prop="position">
        <el-input v-model="ruleForm.position"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 岗位名称(EN） -->
      <el-form-item :label="$t('user.form9')"
                    prop="positionEn">
        <el-input v-model="ruleForm.positionEn"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 名片中的LOGO -->
      <el-form-item :label="$t('user.form10')"
                    prop="logo">
        <el-radio-group v-model="ruleForm.logo"
                        :disabled="type == 'look'">
          <el-radio label="https://scrm.ocheng.me/storage/M00/03/4E/CmUACF6o4PiATY19AAIM9Y_l4cc262.png">
            <img style="width:100px;height:50px;position:relative;top:15px;"
                 src="https://scrm.ocheng.me/storage/M00/03/4E/CmUACF6o4PiATY19AAIM9Y_l4cc262.png" />
          </el-radio>
        </el-radio-group>

        <!-- <el-radio-group v-model="ruleForm.logo"
                        :disabled="type == 'look'">
          <el-radio v-for="(item, index) in logoList"
                    :key="index"
                    :label="item.logo">
            <img style="width:50px;height:50px;position:relative;top:15px;"
                 :src="$fileUrl() + item.logo" />
          </el-radio>
        </el-radio-group> -->
      </el-form-item>
      <!-- LOGO下方描述 -->
      <el-form-item :label="$t('user.form11')"
                    prop="region">
        <!-- LOGO下方描述是否开启 -->
        <el-switch v-model="ruleForm.logoDetailEnable"
                   :disabled="type == 'look'"
                   @change="seithChange" />
        <!-- LOGO下方描述  -->
        <el-input v-if="ruleForm.logoDetailEnable"
                  v-model="ruleForm.logoDetail"
                  size="small"
                  :placeholder="$t('pla1')"
                  :disabled="type == 'look'" />
      </el-form-item>
      <!-- 手机号1 -->
      <!-- <el-form-item :label="$t('user.form12')"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  size="small"
                  :disabled="type == 'look' || type == 'update'"
                  :placeholder="$t('pla1')" />
      </el-form-item> -->
      <!-- 手机号2 -->
      <!-- <el-form-item :label="$t('user.form13')"
                    prop="phoneSpare">
        <el-input v-model="ruleForm.phoneSpare"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item> -->
      <!-- 电话 -->
      <el-form-item :label="$t('user.form14')"
                    prop="tel">
        <el-input v-model="ruleForm.tel"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 直线 -->
      <!-- <el-form-item :label="$t('user.form15')"
                    prop="line">
        <el-input v-model="ruleForm.line"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item> -->
      <!-- 邮箱 -->
      <el-form-item :label="$t('user.form16')">
        <el-input v-model="ruleForm.email"
                  size="small"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 地址 -->
      <el-form-item :label="$t('user.form17')"
                    prop="address">
        <el-input v-model="ruleForm.address"
                  size="small"
                  :disabled="type == 'look'"
                  :placeholder="$t('pla1')" />
      </el-form-item>
      <!-- 名片图像 -->
      <el-form-item :label="$t('user.form18')"
                    prop="head">
        <div class="img-upload">
          <img v-if="ruleForm.head != null"
               style="width:100%;"
               :src="$fileUrl() + ruleForm.head" />
          <div v-if="ruleForm.head == null"
               class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage v-if="type != 'look'"
                       type="custom"
                       @successCBK="imageSuccessCBK" />
        </div>
        <div style="width:100%;height:30px;line-height:30px;color:red;">
          头像宽高比：4:5，图片大小不超过多少100kb，图片格式支持jpg、png
        </div>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button size="mini"
                   type="primary"
                   :disabled="type == 'look'"
                   @click="submitForm('Form')">{{ type == 'add' ? $t('save') : $t('update') }}</el-button>
        <el-button size="mini"
                   @click="getback">{{ $t('cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import {
  // list,
  // addUser,
  // updateUser,
  userLogos,
  // userDetails,
  // roleList,
} from '@/api/surbanajurong/permission'
import { list, addUser, userDetails, roleList, userEdit } from '@/api/permission'
import editorImage from '@/components/Tinymce/components/editorImage'
import { mapState } from "vuex";
export default {
  name: 'AddDepatmentMember',
  components: { editorImage },
  data () {
    return {
      type: null,
      ruleForm: {
        id: null,
        email: null, // 登录名（邮箱)
        password: null, // 密码
        sex: null, // 性别
        roleIds: null, // 角色id
        departmentName: null, // 部门名称
        departmentId: null, // 部门id
        status: null, // 状态 1正常 2离职
        companyName: null, // 公司名称
        name: null, // 姓名
        nameEn: null, // 姓名(英文)
        position: null, // 岗位
        positionEn: null, // 岗位(英文)
        logo: null, // 名片中公司logo的id
        logoDetailEnable: false, // 是否开启公司logo描述
        logoDetail: null, // 名片公司logo下方描述
        phone: null, // 手机号1
        // phoneSpare: null, // 额外手机号（第二手机号）
        tel: null, // 电话
        // line: null, // 直线电话
        address: null, // 地址
        head: null, // 名片图像
        channelId: null,
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
        email: [{ required: true, message: this.$t('user.rule1'), trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        sex: [{ required: true, message: this.$t('user.rule2'), trigger: 'change' }],
        departmentName: [{ required: true, message: this.$t('user.rule3'), trigger: 'change' }],
        roleId: [{ required: true, message: this.$t('user.rule4'), trigger: 'change' }],
        status: [{ required: true, message: this.$t('user.rule5'), trigger: 'change' }],
        name: [{ required: true, message: this.$t('user.rule6'), trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        nameEn: [{ required: true, message: this.$t('user.rule7'), trigger: 'blur' }],
        position: [{ required: true, message: this.$t('user.rule8'), trigger: 'blur' }],
        positionEn: [{ required: true, message: this.$t('user.rule9'), trigger: 'blur' }],
        logo: [{ required: true, message: this.$t('user.rule10'), trigger: 'change' }],
        phone: [{ required: true, message: this.$t('user.rule11'), trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
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
  mounted () { },
  beforeDestroy () { },
  methods: {
    getlogo () {
      userLogos({}).then((res) => {
        if (res.code == 0) {
          this.logoList = res.data
        }
      })
    },
    getRole () {
      const params = {
        size: 1000,
        page: 1,
      }
      roleList(params).then((res) => {
        console.log('角色列表', res)
        this.roleList = res.data.data
      })
    },
    getList () {
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
    userDetails (id) {
      userDetails({
        id: id,
      }).then((res) => {
        if (res.code == 0) {
          if (res.data) {
            let data = res.data;
            data.extraInfo = data.extraInfo ? JSON.parse(data.extraInfo) : {};
            let rolesId = data.roles.length ? data.roles[0].id : null;
            this.ruleForm = {
              id: data.id,
              email: data.email, // 登录名（邮箱)
              password: data.password, // 密码
              sex: data.sex, // 性别
              roleIds: rolesId, // 角色id
              departmentName: data.departmentName, // 部门名称
              departmentId: data.departmentId, // 部门id
              status: data.status, // 状态 1正常 2离职
              companyName: data.extraInfo.companyName, // 公司名称
              name: data.extraInfo.name, // 姓名
              nameEn: data.extraInfo.nameEn, // 姓名(英文)
              position: data.extraInfo.position, // 岗位
              positionEn: data.extraInfo.positionEn, // 岗位(英文)
              logo: data.extraInfo.logo, // 名片中公司logo的id
              logoDetailEnable: data.extraInfo.logoDetailEnable, // 是否开启公司logo描述
              logoDetail: data.extraInfo.logoDetail, // 名片公司logo下方描述
              phone: data.extraInfo.phone, // 手机号1
              // phoneSpare: data.extraInfo.phoneSpare, // 额外手机号（第二手机号）
              tel: data.extraInfo.tel, // 电话
              // line: data.extraInfo.line, // 直线电话
              address: data.extraInfo.address, // 地址
              head: data.extraInfo.head, // 名片图像
              channelId: null,
              extraInfo: data.extraInfo,
            }
            this.$set(this.ruleForm, 'companyName', res.data.extraInfo.companyName)
            console.log('this.ruleForm', this.ruleForm)
          }

        }
      })
    },
    handleNodeClickModel (e) {
      this.ruleForm.departmentName = e.name
      this.ruleForm.departmentId = e.id
    },
    seithChange () {
      if (!this.ruleForm.logoDetailEnable) {
        this.ruleForm.logoDetail = null
      }
    },
    getLogo (id) {
      let url = ''
      this.logoList.map((val) => {
        if (id == val.id) {
          url = val.url
        }
      })
      return url
    },
    submitForm (formName) {
      let status = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let roledata = [];
          this.ruleForm.channelId = this.info.ChannelId;
          let option = { // 扩展字段放置处
            companyName: this.ruleForm.companyName,
            name: this.ruleForm.name,
            nameEn: this.ruleForm.nameEn,
            position: this.ruleForm.position,
            positionEn: this.ruleForm.positionEn,
            logo: this.ruleForm.logo,
            logoDetailEnable: this.ruleForm.logoDetailEnable,
            logoDetail: this.ruleForm.logoDetail,
            phone: this.ruleForm.phone,
            // phoneSpare: this.ruleForm.phoneSpare,
            tel: this.ruleForm.tel,
            email: this.ruleForm.email,
            address: this.ruleForm.address,
            // line: this.ruleForm.line,
            head: this.ruleForm.head,
          }
          this.ruleForm.extraInfo = JSON.stringify(option)
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
          var reg = /^1[3456789]\d{9}$/
          console.log(this.ruleForm, '这个是我要创建的')
          if (!this.$isNull(this.ruleForm.phone) && !reg.test(this.ruleForm.phone)) {
            status = false
            this.$notify.error({
              title: this.$t('error'),
              message: this.$t('role.error5'),
            })
            return
          }
          // if (!this.$isNull(this.ruleForm.phoneSpare) && !reg.test(this.ruleForm.phoneSpare)) {
          //   status = false
          //   this.$notify.error({
          //     title: this.$t('error'),
          //     message: this.$t('role.error6'),
          //   })
          //   return
          // }
          let obj = JSON.parse(JSON.stringify(this.ruleForm))
          if (status) {
            // this.ruleForm.companylogo = this.getLogo(this.ruleForm.logo)
            roledata.push(obj.roleIds);
            obj.roleIds = roledata;
            obj.nickname = obj.name;
            if (this.type == 'add') {
              delete obj.id;
              addUser(obj).then((res) => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t('success'),
                    message: this.$t('op_success'),
                    type: 'success',
                  })
                  this.getback()
                } else {
                  this.notifyFrame(res.message, false);
                }
              })
            } else {
              // 编辑
              delete obj.password;
              userEdit(obj).then((res) => {
                if (res.code == 0) {
                  this.$notify({
                    title: this.$t('success'),
                    message: this.$t('op_success'),
                    type: 'success',
                  })
                  this.getback()
                } else {
                  this.notifyFrame(res.message, false);
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
    imageSuccessCBK (e) {
      // console.log(e);
      this.ruleForm.head = e[0].url[0].url
    },
    getback () {
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
