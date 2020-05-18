<template>
  <div class="memInfoView">
    <div class="memInfo">
      <div class="memInfo-l">
        <div class="memInfo-l-t pad-20">
          <div class="l-t-title">{{ $t('mem_title.title1') }}</div>
          <div class="l-t-content">
            <div class="l-t-content-l" style>
              <img :src="QUData.headPortraitUrl" alt>
            </div>
            <div class="l-t-content-r">
              <div class="l-t-content-r-l" />
              <div class="l-t-content-r-r">
                <div class="l-t-content-r-r-name l-t-title">
                  {{ userInfo.nameInfo.label }}
                </div>
                <div
                  v-for="(item, index) in userInfo.nameInfo.labels"
                  :key="index"
                  class="l-t-content-r-r-n-label"
                >
                  <i :class="item.icon" />

                  {{ $t('mem_info.' + item.label) }} : {{ item.v }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="memInfo-l-c pad-20">
          <div class="memInfo-l-c-wxInfo-title l-t-title">
            {{ $t('mem_title.title2') }}
          </div>
          <div class="memInfo-l-c-wxInfo">
            <div
              v-for="(item, index) in userInfo.wxInfo"
              :key="index"
              class="memInfo-l-c-wxInfo-item"
            >
              <i :class="item.icon" />
              <span
                class="memInfo-l-c-label"
              >{{ $t('mem_info.' + item.label) }}:</span>
              <span class="memInfo-l-c-value">{{ item.v }}</span>
            </div>
          </div>
        </div>
        <div class="memInfo-l-b pad-20">
          <div class="l-t-title">{{ $t('mem_title.title3') }}</div>
          <div class="memInfo-l-b-labels">
            
            <div
              v-for="(item, index) in userInfo.userLabels"
              :key="index"
              :class="'memInfo-l-b-label'"
              :style="{
                background: '#ecf5ff',
                border: `1px solid  #d9ecff`,
                color:'#409EFF',
              }"
            >
              {{ item.txt }}
              <div
                class="memInfo-l-b-label-bag"
                :style="{ background: '#ecf5ff'}"
              />
              <i
                class="iconfont el-icon-close setIngHover"
                :style="{
                  width: '10px',
                  height: '10px',
                  color: '#409EFF',
                  'font-size': '12px',
                }"
                @click="delTags(item.v, index)"
              />
            </div>
          </div>
          <div
            class="addLabel"
            @click="
              () => {
                showTypes.addLabelType = !showTypes.addLabelType
              }
            "
          >
            +{{ $t('mem_event.addTag') }}
          </div>
        </div>
      </div>
      <div v-if="false" class="memInfo-r pad-20">
        <div class="memInfo-r-top">
          <el-form size="mini">
            <el-form-item :label-width="formLabelWidth">
              <el-radio-group v-model="userInfoSetType" size="mini">
                <!-- <el-radio-button :label="1">用户旅程</el-radio-button> -->
                <el-radio-button :label="2">积分记录</el-radio-button>
                <el-radio-button :label="3">卡券记录</el-radio-button>
                <el-radio-button :label="4">订单记录</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <!-- <el-form-item v-if="userInfoSetType == 1" label="选择事件">
              <el-select
                v-model="region"
                size="mini"
                placeholder="请选择活动区域"
                style="margin-right:20px;"
              >
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
              <el-date-picker
                v-model="value1"
                size="mini"
                style="margin-right:20px;"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-button size="mini" type="primary">查询</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <!-- <div v-if="userInfoSetType == 1" class="memInfo-r-content">
          <memInfo-timeView  :openId="QUData.extraInfo.openId" />
        </div> -->
        <!-- 积分记录 -->
        <div v-if="userInfoSetType == 2" class="memInfo-r-bottom">
          <memInfo-porinView   :memberBrandId="QUData.memberBrandId==null?0:QUData.memberBrandId" />
        </div>
        <!-- 卡卷记录 -->
        <div v-if="userInfoSetType == 3" class="memInfo-r-content">
          <memInfo-cardView :openid="QUData.extraInfo.openId" :memberBrandId="QUData.memberBrandId" />
        </div>
        <!-- 订单记录 -->
        <div v-if="userInfoSetType == 4" class="memInfo-r-content">
          <memInfo-orderView  :memberBrandId="QUData.memberBrandId==null?0:QUData.memberBrandId" :channelId="QUData.channelId" />
        </div>
      </div>
    </div>
    <!-- add-label -->
    <div v-if="showTypes.addLabelType">
      <add-label1
        :show-type="showTypes.addLabelType"
        :set-items1="setItems1"
        :echo="echo"
        @_upAddLabel="_upAddLabel"
      />
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
// import { mapActions } from 'vuex'
import memInfoTimeView from './meminfo-time-view'
import memInfoOrderView from './meminfo-order-view'
import memInfoPorinView from './meminfo-porin-view'
import memInfoCardView from './meminfo-card-view'
import {
  wechatDetail,
  timeAxis,
  deleteTag,
  tagDetail,
  messageDetail,
  getMeberTag

} from '@/api/member/member'
import { cookieGet } from '@/common/cookie'
import addLabel from './add-label' // 添加标签
import addLabel1 from './add-label1' // 添加标签
import TAG from './tag'
import { formatDate } from '@/utils/index'
//
export default {
  components: {
    'memInfo-timeView': memInfoTimeView,
    'add-label': addLabel,
    memInfoOrderView,
    memInfoPorinView,
    memInfoCardView,
    addLabel1
  },
  props: {
    showType: {
      type: Boolean,
      default: false
    },
    
    
  },
  data() {
    return {
      API: {},
      userInfo: {
        nameInfo: {
          v: '',
          icon: 'iconfont iconopenid',
          label: '',
          labels: [
            {
              v: '',
              icon: 'iconfont iconmembercard',
              label: 'memberCard'
            },
            {
              v: '',
              icon: 'iconfont iconbirthday',
              label: 'birthday'
            },
            {
              v: '',
              icon: 'iconfont iconmobilenumber',
              label: 'phoneNumber'
            }
          ]
        },
        wxInfo: {
          openId: {
            v: '',
            icon: 'iconfont iconopenid',
            label: 'openId'
          },
          wxname: {
            v: '',
            icon: 'iconfont iconusername',
            label: 'nickName'
          },
          sex: {
            v: '',
            icon: 'iconfont iconage',
            label: 'sex'
          },
          address: {
            v: '',
            icon: 'iconfont iconlocation',
            label: 'address'
          },
          language: {
            v: '',
            icon: 'iconfont iconlanguage',
            label: 'language'
          },
          userStickiness: {
            v: '',
            icon: 'iconfont iconuserstickiness',
            label: 'viscosity'
          },
          userValue: {
            v: '',
            icon: 'iconfont iconuservalue',
            label: 'value'
          }
        },
        userLabels: []
      },
      userInfoSetType: 2,
      formLabelWidth: '120px',
      value1: '',
      region: '',
      _showType: false,
      timeTreeData: [], // 时间树数据源
      showTypes: {
        addLabelType: false //
      },
      setItems: [],
      tags: [],
      echo: '1',//不回显
      setItems1: [],
      QUData:{},//所有数据
    }
  },
  computed: {},
  watch: {},
  created() {
    this.API = {
      wechatDetail: wechatDetail,
      timeAxis: timeAxis,
      deleteTag: deleteTag,
      tagDetail: tagDetail,
      messageDetail: messageDetail,
      getMeberTag: getMeberTag
    }
    //在赋值给第一个初始化下完成
    console.log(this.$route.query.memberBrandId,"this.memberBrandId")
    this.QUData.memberBrandId=this.$route.query.memberBrandId==null?0:this.$route.query.memberBrandId
    this._showType = this.showType
    // this.QUData = { ...this.$route.query.userData }

    this.setItems.push({ id:this.$route.query.id})
    this.getwechatDetail(this.$route.query.id)
    this.getMessageDetail(this.$route.query.id)
    this.getTagDetail()
    // 海森堡的不要
    // this.haxnbauerType=false
    console.log(this.LMBshowType, this.haxnbauerType)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 获取用户操作记录
    getTimeAxis(id) {
      return
      this.API.timeAxis({ openId: id }).then((res) => {
        console.log('获取用户操作记录', res)
        this.timeTreeData = res.data
      })
    },
    // 获取会员微信信息
    getwechatDetail(id) {
      this.API.wechatDetail({ id: id }).then((res) => {
        console.log('获取会员微信信息', res)
        const _wxInfo = this.userInfo.wxInfo
        _wxInfo.openId.v = res.openId
        _wxInfo.wxname.v = res.nickname
        _wxInfo.sex.v = res.sex == 1 ? '男' : res.sex == 2 ? '女' : '未填写'
        _wxInfo.address.v = res.country + res.province + res.city
        _wxInfo.language.v = res.language
        // 获取用户操作记录
        this.getTimeAxis(res.openId)
      })
    },
    initUserDataInfo() {
      this._initNameInfo()
      this._initUserLabels()
    },
    _initWxInfo() {},
    _initNameInfo() {
      console.log("this.QUData",this.QUData)
      const nameLabels = [...this.userInfo.nameInfo.labels]
      nameLabels[0].v = this.QUData.memberCardNumber
      if (this.QUData.birthday) {
        if (String(this.QUData.birthday).length > 10) {
          this.QUData.birthday = formatDate(new Date(this.QUData.birthday), 'yyyy-MM-dd')
        } else {
          this.QUData.birthday = Number(String(this.QUData.birthday) + "000")
          this.QUData.birthday = formatDate(new Date(this.QUData.birthday), 'yyyy-MM-dd')
        }
      }
      nameLabels[1].v = this.QUData.birthday
      nameLabels[2].v = this.QUData.phoneNumber
      this.$set(this.userInfo.nameInfo, 'labels', nameLabels)
      return
    },
    // 初始化用户标签
    _initUserLabels() {
      const userLabels = []

      this.API.getMeberTag({ id: this.QUData.id }).then(res => {
        if (res.data != null) {
          const data = JSON.parse(res.data.tagInfo)
          this.setItems1 = data
          data.forEach(d => {
            userLabels.push({
              v: d.id,
              txt: d.tagName,
              color: 'skyblue'
            })
          })
        }
        console.log('res', res)
      })
      this.userInfo.userLabels = userLabels
      return
    },
    // 删除指定标签
    delTags(id, idx) {
      const that = this
      this.$confirmDel('是否要删除此标签', () => {
        that.API.deleteTag({ id: that.QUData.id, tagId: id }).then((res) => {
          if (res.code == 0) {
            that.userInfo.userLabels.splice(idx, 1)
          }
        })
      })
    },
    // 获取标签列表
    getTagDetail() {
      this.API.tagDetail().then((res) => {
        this.tags = res
      })
    },
    // 回收标签
    _upAddLabel(e) {
      console.log(e)
      TAG.addTag(this.setItems.map((d) => d.id), e.tags.map((d) => d.id)).then(res => {
        console.log('1223', res)
        if (res.code == 0) {
          this._initUserLabels()
        }
      })

      this.showTypes.addLabelType = false
    },

    // 获取用户详情
    getMessageDetail(id) {
      this.API.messageDetail({id}).then((res) => {
        this.QUData = res
        this.initUserDataInfo()
      })
    }
  }
}
</script>

<style lang="scss" scope>
.memInfoView {
  height: 630px;
  overflow: auto;
  .setIngHover {
    cursor: pointer;
    z-index: 2;
    position: relative;
  }
  .l-t-title {
    font-weight: bold;
  }
  // background:#999;
  padding: 20px;
  div {
    border-radius: 8px;
  }
  .pad-20 {
    padding: 20px;
  }
  .memInfo {
    display: flex;
    .memInfo-l {
      flex: 3;
      margin-right: 20px;
      min-width: 382px;
      .memInfo-l-t {
        background: #fff;
        margin-bottom: 20px;
        .l-t-content {
          display: flex;

          .l-t-content-l {
            width: 80px;
            height: 80px;
            border-radius: 40px;
            padding-top: 20px;
            img {
              width: 80px;
              height: 80px;
              border-radius: 40px;
            }
          }
          .l-t-content-r {
            display: flex;
            .l-t-content-r-l {
              display: flex;
              justify-content: space-around;
            }
            .l-t-content-r-r {
              margin-left: 20px;
              div {
                margin-bottom: 10px;
              }
              .l-t-content-r-r-n-label {
                color: #999;
              }
            }
          }
        }
      }
      .memInfo-l-c {
        background: #fff;
        margin-bottom: 20px;
        .memInfo-l-c-wxInfo-title {
          margin-bottom: 10px;
        }
        .memInfo-l-c-wxInfo-item {
          line-height: 30px;
          color: #999;
          .memInfo-l-c-label {
          }
          .memInfo-l-c-value {
            margin-left: 10px;
          }
        }
      }
      .memInfo-l-b {
        background: #fff;
        position: relative;
        min-height: 110px;
        .memInfo-l-b-labels {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          .memInfo-l-b-label {
            padding: 3px 5px;
            margin-right: 10px;
            font-size: 14px;
            border-radius: 4px;
            position: relative;
            margin-top: 5px;
            .memInfo-l-b-label-bag {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0.1;
              border-radius: 4px;
            }
          }
        }

        .addLabel {
          color: #409eff;
          font-size: 16px;
          position: absolute;
          right: 15px;
          bottom: 15px;
          cursor: pointer;
        }
      }
    }
    .memInfo-r {
      flex: 6;
      background: #fff;
      padding-left: 30px;
      min-width: 740px;
    }
  }
  .jf {
    display: flex;
    justify-content: space-around;
    font-family: 'PingFangTC-Semibold', 'PingFang TC Semibold', 'PingFang TC';
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
.memInfoView {
  .iconfont {
    color: #ff7f00;
    width: 40px;
    display: inline-block;
    text-align: center;
  }

  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>

