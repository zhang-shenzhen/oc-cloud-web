<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.addClerk') }}</h3>

    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-position="left"
             label-width="160px"
             class="ruleForm">
      <el-row>
        <el-col :span="14"
                :offset="4">

          <el-form-item :label="$t('store.clerk')+'ID'"
                        prop="clerkId">
            <el-input v-if="$route.query.type == 'edit'"
                      v-model="ruleForm.clerkId"
                      :placeholder="$t('store.clerkPloher')"
                      disabled />
            <el-input v-else
                      v-model="ruleForm.clerkId"
                      :placeholder="$t('store.clerkPloher')" />
          </el-form-item>

          <el-form-item label="店员名称"
                        prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="店员名" />
          </el-form-item>

          <el-form-item label="Clerk's name"
                        prop="nameEn">
            <el-input v-model="ruleForm.extraInfo.name"
                      placeholder="Clerk's name" />
          </el-form-item>

          <el-form-item :label="$t('store.clerkNumber')"
                        prop="clerkNumber">
            <el-input v-model="ruleForm.clerkNumber"
                      :placeholder="$t('store.clerkNumber')" />
          </el-form-item>

          <el-form-item label="职位"
                        prop="position">
            <el-input v-model="ruleForm.position"
                      placeholder="职位" />
          </el-form-item>

          <el-form-item label="position"
                        prop="positionEn">
            <el-input v-model="ruleForm.extraInfo.position"
                      placeholder="position" />
          </el-form-item>

          <el-form-item :label="$t('store.clerkStore')"
                        prop="storeId">
            <el-select v-model="ruleForm.storeId"
                       :placeholder="$t('oss.qcloudRegionTips')">
              <el-option v-for="item in StoreList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="账 号">
            <el-input v-model="ruleForm.account"
                      placeholder="账号" />
          </el-form-item>
          <el-form-item label="密 码">
            <el-input v-model="ruleForm.password"
                      type="password"
                      show-password
                      placeholder="密码" />
          </el-form-item>
          <el-form-item label="关联管理用户">
            <el-select v-model="ruleForm.userId"
                       placeholder="请选择关联管理用户">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.nickname"
                         :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('store.clerkUpPhoto')+'('+$t('store.clerkMsg')+')'">
            <editorImage :quan-tity="5"
                         urltype="default"
                         type="default"
                         @successCBK="imageSuccessCBK" />
            <el-alert :closable="false"
                      :title="$t('userCenter.designMsg')+':850px*350px，'+$t('coupons.imageSize')"
                      type="info"
                      style="padding:0  16px;margin:10px 0;" />
            <div class="img-box">
              <div v-for="(img,index) in imglist"
                   :key="index"
                   class="img">
                <img :src="$fileUrl() + img">
                <div class="del-div">
                  <el-button type="danger"
                             class="del-icon"
                             icon="el-icon-delete"
                             circle
                             @click="delIMg(index)" />
                </div>
              </div>
              <div style="clear:both" />
            </div>
          </el-form-item>

          <el-form-item :label="$t('store.clerkTelephone')"
                        prop="phone">
            <el-input v-model="ruleForm.phone"
                      :placeholder="$t('store.clerkTelephone')" />
          </el-form-item>

          <el-form-item :label="$t('store.clerkRemark')+'('+$t('store.clerkMsg')+')'">
            <el-input v-model="ruleForm.remark"
                      type="textarea"
                      :placeholder="$t('store.clerkRemark')"
                      :autosize="{ minRows: 4, maxRows: 6 }" />
          </el-form-item>

          <el-form-item>
            <el-button size="small"
                       @click="$router.go(-1)">{{ $t('wechat.menu.btn4') }}</el-button>
            <el-button size="small"
                       type="primary"
                       @click="submitForm('ruleForm')">{{ $t('member.filter.keep') }}</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>

  </d2-container>
</template>
<script>

import editorImage from '@/components/Tinymce/components/editorImage'
import { addClerk, ClerkInfo, StoreList, updateClerk } from '@/api/storeManagement/storeManagement'
import { userList } from "@/api/permission";
import { mapState } from "vuex";
export default {
  name: 'MarketingStoreManagementAddStore',
  components: { editorImage },
  data () {
    return {
      ruleForm: {
        'clerkId': '',
        'clerkNumber': '',
        'name': '',
        'phone': '',
        'picture': '',
        'position': '',
        'remark': '',
        'storeId': '',
        'account': '',
        'password': '',
        'userId': '',
        extraInfo: {
          name: '',
          position: ''
        }
      },
      rules: {
        clerkId: [
          { required: true, message: '请输入店员ID', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入店员名', trigger: 'blur' }
        ],
        clerkNumber: [
          { required: true, message: '请输入店员号', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ]
      },
      options: [],
      imglist: [],
      StoreList: []
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    // 获取员工详情
    this.init()
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    init () {
      const sendData = {
        wechatId: this.info.ChannelId,
        sort: 'create_time;2',
        page: 1,
        size: 999
      }
      StoreList(sendData).then(res => {
        if (res.code == 0) {
          this.StoreList = res.data.data
        }
      })
      this.UserListInterface();
      // 获取员工详情
      if (this.$route.query.type == 'edit') {
        this.getClerkInfo()
      }
    },
    // 用户列表接口 
    UserListInterface () {
      let option = {
        page: 1,
        size: 500,
      }
      userList(option).then(res => {
        if (res.code == 0) {
          this.options = res.data.data;
          console.log(res, '用户列表接口')
        }
      })
    },
    getClerkInfo () {
      ClerkInfo('?id=' + this.$route.query.id).then(res => {
        if (res.code == 0) {
          res.data.extraInfo = res.data.extraInfo != null ? JSON.parse(res.data.extraInfo) : ''
          // 门店详情数据处理
          this.ruleForm = res.data
        }
      })
    },
    imageSuccessCBK (val) {
      // console.log(val)
      val.map(res => {
        this.imglist.push(res.url[0].url)
      })
    },
    delIMg (index) {
      this.imglist.splice(index, 1)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 赋值给ruleForm
          this.ruleForm.picture = this.imglist[0]
          this.ruleForm.extraInfo = JSON.stringify(this.ruleForm.extraInfo)
          // 编辑
          if (this.$route.query.type == 'edit') {
            this.ruleForm.id = this.$route.query.id
            updateClerk(this.ruleForm).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.$router.push({
                  name: 'storeManagement-StaffList'
                })
              } else {
                this.ruleForm.extraInfo = JSON.parse(this.ruleForm.extraInfo)
              }
            })
          } else {
            // 保存请求接口
            addClerk(this.ruleForm).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.$router.push({
                  name: 'storeManagement-StaffList'
                })
              } else {
                this.ruleForm.extraInfo = JSON.parse(this.ruleForm.extraInfo)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ruleForm {
  margin-top: 30px;
}
.el-form-item {
  margin: 20px 0;
}
.address-box {
  width: 100%;
  .left {
    width: calc(100% - 90px);
    float: left;
  }
  .right {
    width: 70px;
    float: right;
  }
}
.map {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
.img-box {
  width: 100%;
  .img {
    width: 300px;
    height: 150px;
    overflow: hidden;
    float: left;
    margin: 0 10px 10px 0;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .del-div {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      .del-icon {
        position: relative;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
      }
    }
  }
  .img:hover .del-div {
    display: block;
  }
}
</style>
