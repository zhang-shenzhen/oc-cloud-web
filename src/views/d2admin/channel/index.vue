<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n" />
      </ul>
    </div>
    <!-- <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >{{time}}</div>-->
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify box:justify">
        <div class="page-login--content-header" flex="main:justify box:justify">
          <p class="page-login--content-header-side">
            <span
              class="page-login--content-header-side-text"
              style="opacity: 0;"
            >
              <d2-icon name="language" />
              {{ $t('login.language') }}
            </span>
          </p>
          <!-- <p class="page-login--content-header-center">{{ $t('login.motto') }}</p> -->
          <p class="page-login--content-header-side">
            <el-dropdown
              size="mini"
              @command="(command) => ($i18n.locale = command)"
            >
              <span class="page-login--content-header-side-text">
                <d2-icon name="language" />
                {{ $t('login.language') }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(language, index) in $languages"
                  :key="index"
                  :command="language.value"
                  >{{ language.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <!-- <img class="page-login--logo" src="./image/logo@2x.png"> -->
          <!-- 表单 -->

          <div class="page-login--form">
            <!-- 选择渠道 -->
            <div v-if="!ChannelType" class="contant-box">
              <div style="text-align: center;font-size: 20px;font-weight: 200;">
                点击LOGO登录
              </div>
              <!-- <div class="header">{{ $t('brand.channel') }}</div> -->
              <div class="banner">
                <el-carousel
                  ref="carousel"
                  trigger="cliclk"
                  arrow="never"
                  :autoplay="false"
                  type="card"
                  height="220px"
                >
                  <el-carousel-item
                    v-for="(item, index) in channelList"
                    :key="index"
                    class="carousel"
                  >
                    <div class="banner-list" @click="checkChannel(item)">
                      <div class="img-box">
                        <!-- <img :src="item.logo" /> -->
                        <el-image style="width: 100%;" :src="item.logo" />
                        <!-- <img src="./image/channel.jpg"> -->
                      </div>
                      <div class="name-list">{{ item.name }}</div>
                    </div>
                  </el-carousel-item>
                  <el-carousel-item v-if="loadEnd" class="carousel">
                    <div class="add-channel" @click="addChannel">
                      <div class="add-top" />
                      <div class="add-bottom">新建</div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="btn-box">
                <img
                  class="img1"
                  src="./image/left-icon.png"
                  @click="prevClick"
                />
                <img
                  class="img2"
                  src="./image/right-icon.png"
                  @click="nextClick"
                />
              </div>

              <el-button
                class="button-login"
                size="default"
                type="warning"
                @click="loginOut"
                >{{ $t('logout') }}</el-button
              >
            </div>

            <!-- 添加渠道 -->
            <div v-if="ChannelType" class="addChannel">
              <img
                v-if="$store.state.VUE_APP_NODE_SHOWTYPE == 1"
                class="page-login-newlogo"
                src="./image/logo@2x.png"
              />
              <div class="header">
                <div class="xian-left" />
                <div
                  :style="{
                    flex: $t('brand.productDesc') == '智能营销云' ? 1 : 2.5,
                  }"
                  class="xian-center"
                >
                  {{ $t('brand.productDesc') }}
                </div>
                <div class="xian-right" />
              </div>

              <div class="select-list">
                <div class="title">授权方式</div>
                <el-select
                  v-model="authType"
                  style="width:100%;"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in style"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>

              <div class="select-list">
                <div class="title">类型</div>
                <el-select
                  v-model="authChannel"
                  style="width:100%;"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in style1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>

              <el-button
                class="button-add"
                size="default"
                type="warning"
                @click="Impower"
                >{{ $t('login.form.impowerButton') }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p
            v-if="$store.state.VUE_APP_NODE_SHOWTYPE==1"
            class="page-login--content-footer-copyright"
          >
            {{ $t('login.copyright.p1') }}
            <d2-icon name="copyright" />
            {{ $t('login.copyright.p2') }}
          </p>-->
        </div>
      </div>
    </div>

    <el-dialog title="授权链接" :visible.sync="dialogVisible" width="30%">
      <span>{{ copyUrl }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
          @click="dialogVisible = false"
          >{{ $t('copy') }}</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible_m" width="50%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input
            v-model="ruleForm.oldPassword"
            size="small"
            style="width：100%"
            placeholder="请输入原始密码"
          />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="ruleForm.newPassword"
            size="small"
            style="width：100%"
            placeholder="请输入新密码"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="aginPassword">
          <el-input
            v-model="ruleForm.aginPassword"
            style="width：100%"
            size="small"
            placeholder="请输入确认密码"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          @click="updatePassword('ruleForm')"
          >修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Getchannel, Addauth } from '@/api/common'
import {
  checkdefultPassword,
  updatePrassword,
} from '@/api/surbanajurong/permission'
import { cookieGet, cookieSet } from '@/common/cookie'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value !== '') {
        const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![0-9A-Z]+$)(?![0-9a-z]+$)^.{8,16}$/
        if (!reg.test(value)) {
          callback(new Error('密码长度必须大于8位且必须包含大小写字母和数字'))
        }
        callback()
      } else {
        if (this.ruleForm.aginPassword !== '') {
          this.$refs.ruleForm.validateField('aginPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      copyUserid: null,
      dialogVisible: false,
      dialogVisible_m: false,
      ruleForm: {
        newPassword: null,
        oldPassword: null,
        aginPassword: null,
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原始密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        aginPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
      copyUrl: '',
      channelList: [],
      loadEnd: false,
      ChannelType: false,
      style: [
        {
          value: '2',
          label: '链接',
        },
        {
          value: '1',
          label: '二维码',
        },
      ],
      authType: '2',
      style1: [
        {
          value: '1',
          label: '公众号',
        },
        {
          value: '2',
          label: '小程序',
        },
        {
          value: '3',
          label: '公众号+小程序',
        },
      ],
      authChannel: '1',
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info']),
  },
  created() {
    this.getChannel()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    ...mapActions('d2admin/user', ['set_user']),
    getChannel() {
      Getchannel().then((res) => {
        //  console.log(res)
        const userInfo = JSON.parse(localStorage.getItem('userInfo-1.6.18'))
        if (res.code == 0) {
          console.log('userInfo', userInfo)
          if (userInfo.roleIds.indexOf(1) > -1) {
            this.loadEnd = true
          }
          if (res.data) {
            if (res.data.length > 0) {
              this.channelList = res.data
            }
          }
        }
      })
    },
    checkChannel(val) {
      const token = cookieGet('token')
      const Httpheader = {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Channel-Type': val.channelTypeId,
        'X-Channel': val.channelId,
        'X-Security-Token': token,
        ChannelId: val.channelId,
      }

      const userInfo = JSON.parse(cookieGet('userInfo'))
      console.log(val, userInfo, '点击选择渠道')
      if (val.name && userInfo) {
        userInfo.channelName = val.name
      }
      console.log(userInfo, 'userInfouserInfo')
      cookieSet('userInfo', userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      cookieSet('Httpheader', Httpheader)
      if (val.channelId == 12 || val.channelId == 17) {
        // 盛裕改密码逻辑
        localStorage.setItem('projectName', 'surbanajurong')
        this.checkPassword(
          JSON.parse(
            localStorage.getItem(`userInfo-${process.env.VUE_APP_VERSION}`)
          ).id
        )
      } else {
        this.goView()
        localStorage.setItem('projectName', 'product')
      }
    },
    goView() {
      if (localStorage.getItem('view-path')) {
        if (process.env.NODE_ENV == 'scrm') {
          let url = localStorage.getItem('view-path').replace('/v3', '')
          if (url == '/login' || url == '/channel') {
            url = '/'
          }
          localStorage.removeItem('view-path')
          this.$router.replace(url)
        } else {
          let url = localStorage.getItem('view-path').replace('/oc-cloud-ui-web-new', '')
          if (url == '/login' || url == '/channel') {
            url = '/'
          }
          localStorage.removeItem('view-path')
          this.$router.replace(url)
        }
      } else {
        this.$router.replace('/')
      }
    },
    checkPassword(id) {
      localStorage.removeItem('roleUserid')
      checkdefultPassword({ id: id }).then((res) => {
        if (res.code == 0) {
          if (res.data) {
            localStorage.setItem('roleUserid', res.data.id)
            if (res.data.status == 2) {
              this.$notify.error({
                title: '错误',
                message: '用户已离职，无法登录',
              })
              return
            }
            if (res.data.defaultPassword) {
              this.dialogVisible_m = true
              this.copyUserid = res.data.id
            } else {
              this.goView()
            }
          } else {
            this.goView()
          }
        }
      })
    },
    // 下一页
    nextClick() {
      this.$refs.carousel.next()
    },
    // 上一页
    prevClick() {
      this.$refs.carousel.prev()
    },
    loginOut() {
      this.logout({
        confirm: false,
      })
    },
    addChannel() {
      this.ChannelType = true
    },
    Impower() {
      Addauth({}, this.authType, this.authChannel).then((res) => {
        if (res.code == 0) {
          if (this.authType == 1) {
            // 二维码
            window.open(res.data)
          } else if (this.authType == 2) {
            // 链接
            this.copyUrl = res.data
            this.dialogVisible = true
          }
        }
      })
    },
    onError() {
      this.$notify.error({
        title: '错误',
        message: '复制失败',
      })
    },
    onCopy() {
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success',
      })
    },
    updatePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            id: this.copyUserid,
            newPassword: this.ruleForm.newPassword,
            oldPassword: this.ruleForm.oldPassword,
          }
          updatePrassword(data).then((res) => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '密码修改成功,请重新登录',
                type: 'success',
              })
              this.$router.replace('/login')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
.el-input__inner {
  border: none !important;
}
.page-login {
  // @extend %unable-select;
  // $backgroundColor: red;
  // // ---
  // background-color: $backgroundColor;
  background: url('./image/bg.png') 100% no-repeat;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-side {
      margin: 0px 20px;
      padding: 0px;
      .page-login--content-header-side-text {
        color: $color-text-normal;
        font-size: 12px;
      }
    }
    .page-login--content-header-center {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      font-size: 12px;
      text-align: center;
    }
  }
  // main
  .page-login--logo {
    width: 290px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 560px;
    background: #ffffff;
    box-shadow: 0 2px 54px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    .contant-box {
      width: 360px;
      margin: 50px auto 60px auto;
      .header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        //  font-weight: bold;
        color: #999999;
        text-align: center;
        position: relative;
      }
      .carousel {
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
      .banner {
        width: 100%;
        margin-top: 40px;
        .banner-list {
          width: 100%;
          height: 220px;
          .img-box {
            width: 100%;
            height: 180px;
            overflow: hidden;
            display: flex;
            img {
              width: 100%;
              display: block;
            }
          }
          .name-list {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #1f1e22;
            text-indent: 20px;
          }
        }
        .banner-list1 {
          width: 100%;
          height: 250px;
          background: yellow;
        }
        .banner-list2 {
          width: 100%;
          height: 250px;
          background: green;
        }
      }
      .add-channel {
        width: 100%;
        height: 220px;
        .add-top {
          width: 100%;
          height: 180px;
          box-sizing: border-box;
          border: 1px dashed #dddddd;
          background: url('./image/add.png') no-repeat center;
        }
        .add-bottom {
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #1f1e22;
          text-indent: 20px;
        }
      }
      .btn-box {
        width: 100px;
        height: 50px;
        margin: 0 auto;
        .img1 {
          width: 50px;
          display: block;
          float: left;
          transform: rotate(180deg);
          cursor: pointer;
        }
        .img2 {
          width: 50px;
          display: block;
          float: right;
          transform: rotate(180deg);
          cursor: pointer;
        }
      }
      .button-login {
        width: 100%;
        margin-top: 30px;
      }
    }
    .addChannel {
      width: 360px;
      margin: 50px auto 60px auto;
      .page-login-newlogo {
        width: 150px;
        width: 0px;
        display: block;
        margin: 50px auto 10px auto;
      }
      .header {
        width: 100%;
        height: 30px;
        display: flex;
        margin-bottom: 25px;
        .xian-left {
          flex: 1;
          height: 1px;
          background: #eeeeee;
          margin-top: 15px;
        }
        .xian-center {
          height: 30px;
          line-height: 30px;
          text-align: center;
          // line-height: 30px;
          font-size: 14px;
          color: #999999;
        }
        .xian-right {
          flex: 1;
          height: 1px;
          background: #eeeeee;
          margin-top: 15px;
        }
      }
      .select-list {
        width: 100%;
        margin-bottom: 15px;
        .title {
          width: 100%;
          height: 25px;
          line-height: 25px;
          color: #666666;
          font-size: 16px;
          margin-bottom: 5px;
        }
      }
      .button-add {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
