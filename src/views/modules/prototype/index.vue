<template>
  <d2-container class="page">
    <div class="home">
      <iframe
        style="background:#eaeaea;"
        width="100%"
        height="800"
        src="https://u7tcxs.axshare.com"
        frameborder="0"
        allowFullScreen="true"
      >
      </iframe>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import { PublicStatistics, PublicNumber } from '@/api/wechat/public'

// import { userInfo } from "@/api/UPM-api/order";
export default {
  name: 'Home',
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      showType: {
        label: false,
        tag: false,
        dynamic: false
      },
      titleList: [
        {
          img: './img/newmsg.png',
          title: 'wechat.public.news',
          sun: '',
          link: ''
        }
      ],
      publics: {}, // 标题的设置
      officialInfo: {
        wechatUsername: '',
        principalName: '',
        avatar: '',
        type: ''
      }, // 公众号信息
      project: [
        {
          title: '',
          img: '',
          p: '',
          link: ''
        }
      ] // 近期使用项目
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info', 'aside'])
  },
  created() {
    // this.getPublic()
    this.official()
    this.getProjectList()
    console.log('vuex暴露', this.aside)
  },
  methods: {
    thousands(num) {
      // 用来每三位加一个逗号
      var str = num.toString()
      var reg =
        str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
      return str.replace(reg, '$1,')
    },
    getPublic() {
      PublicStatistics({}).then(res => {
        console.log('公众号信息', res)
        if (res.code == 0) {
          for (const i in res.data) {
            const o = {
              sun: ''
            }
            o.sun = res.data[i]
            res.data[i] = { ...o }
          }
          res.data.cancelUserCount.title = 'wechat.public.YesterdaysPickUpFans'
          res.data.netIncreaseUserCount.title =
            'wechat.public.NetAdditionsFansYesterday'
          res.data.newMessageCount.title = 'wechat.public.news'
          res.data.newUserCount.title = 'wechat.public.newFansAddedyesterday'
          this.publics = res.data
          delete this.publics.cumulateUser
          delete this.publics.refDate
          console.log('this.publics', this.publics)
        }
      })
    },
    official() {
      // let id = localStorage.getItem('X-Channel')
      const id = 3
      PublicNumber({}, id).then(res => {
        console.log('2公众号信息2', res)
        if (res.code == 0) {
          this.officialInfo = res.data
          // this.officialInfo.type = this.officialType[ res.data.type ]
        }
      })
    },
    getProjectList() {
      const pro = []
      for (let i = 0; i < 6; i++) {
        pro.push({
          img: '',
          p: '',
          title: '',
          link: ''
        })
      }
      if (this.$store.state.VUE_APP_NODE_SHOWTYPE == '1') {
      }
      pro[0].title = '公众号设置'
      pro[0].link = '/wechat-public-index'
      pro[0].img = require('@img/icon/icon_gzhse.png')
      pro[1].title = '自定义菜单'
      pro[1].link = '/wechat-menu-menuList'
      pro[1].img = require('@img/icon/icon_zdysc.png')
      pro[2].title = '渠道二维码'
      pro[2].link = '/wechat-channelQrCode-list'
      pro[2].img = require('@img/icon/icon_qdewm.png')
      pro[3].title = '素材管理'
      pro[3].link = '/wechat-material-list'
      pro[3].img = require('@img/icon/icon_scgl.png')
      pro[4].title = '群发消息'
      pro[4].link = '/wechat-groupMessages-groupPage'
      pro[4].img = require('@img/icon/icon_qfxx.png')
      pro[5].title = '触发器'
      pro[5].link = '/wechat-trigger-triggerList'
      pro[5].img = require('@img/icon/icon_cfq.png')
      // /oc-cloud-ui-web-new/img/icon_qfxx.fe08c6b3.png
      if (this.$store.state.VUE_APP_NODE_SHOWTYPE == 'UPM') {
        pro[0].title = '微信管理'
        pro[0].link = '/wechat-coupon-list'
        pro[1].title = '订单管理'
        pro[1].link = '/UPM-PM-UPMorder-order'
        pro[2].title = '人员管理'
        pro[2].link = '/UPM-PM-UPMEmployingManagement-staff-list'
        pro[3].title = '部门管理'
        pro[3].link = '/UPM-PM-UPMDepartmentManagement-systemStaff'
        pro[4].title = '日志管理'
        pro[4].link = '/logManagement-logManagement'
      }

      this.project = [...pro]
      console.log('pro', [...pro])
      return
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  .head-title {
    font-weight: bolder;
    font-size: 20px;
    line-height: 50px;
    /* margin-left: 20px; */
    padding-left: 20px;
    border-bottom: 1px solid #ededed;
  }
  .h-head {
    width: 100%;
    background: #fff;
    display: flex;
    // border-bottom: 1px solid #ededed;
    margin-bottom: 20px;
    .h-head-l {
      display: flex;
      flex: 2;
      .h-head-l-r {
        margin-left: 30px;
        line-height: 50px;
        .h-head-l-r-name {
          border: none;
          font-weight: 100;
          font-family: sans-serif;
          padding: 0;
          line-height: 35px;
        }
        .h-head-l-r-tit {
          color: #8a8a82;
        }
      }
    }
    .h-head-r {
      display: flex;
      flex: 8;
      .h-head-r-itm {
        flex: 1;
        text-align: center;
        line-height: 30px;
        .h-head-r-itm-cont {
          font-weight: bolder;
          font-size: 16px;
          line-height: 24px;
          color: #000;
        }
      }
    }
  }
  .h-body {
    display: flex;
    padding: 20px;
    background-color: rgba(240, 242, 245, 1);
    .h-b-left {
      width: 70%;
      .h-b-l-box {
        background: #fff;
        .h-b-l-b-head {
          display: flex;
          padding: 10px 20px;
          justify-content: space-between;
          border-bottom: 1px solid #ededed;
        }
        .h-b-l-b-cont {
          display: flex;
          flex-wrap: wrap;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.447058823529412);
          line-height: 20px;
          text-align: center;
          .h-b-l-b-c-itm {
            text-align: left;

            width: 33.2%;
            box-sizing: border-box;
            padding: 15px;
            border-bottom: 1px solid #ebebeb;
            border-right: 1px solid #ebebeb;
            height: 150px;
            .h-b-l-b-c-itm-head {
              line-height: 24px;
              margin-bottom: 10px;
              img {
                width: 24px;
                height: 24px;
                position: relative;
                top: 5px;
              }
              span {
                margin-left: 10px;
                font-size: 16px;
                line-height: 24px;
                color: #000;
              }
            }
          }
        }
      }
      .h-b-l-dynamic {
        margin-top: 20px;
        background: #fff;
        .h-b-l-d-body {
          padding: 5px;
          .h-b-l-d-b-itm {
            width: 95%;
            margin-left: 2.5%;
            border-bottom: 1px solid #ededed;
            display: flex;
            box-sizing: border-box;
            height: 93px;
            padding-top: 10px;
            img {
              width: 40px;
              height: 40px;
              margin-top: 10px;
            }
            .h-b-l-d-b-itm-p {
              font-weight: bolder;
              font-size: 16px;
              line-height: 24px;
              span {
                color: #000;
              }
              .h-b-l-d-b-itm-p-where {
                color: #409eff;
              }
              .h-b-l-d-b-itm-p-what {
                color: #409eff;
              }
            }
            .h-b-l-d-b-itm-time {
              color: #8a8a82;
              line-height: 24px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .h-b-right {
      width: 30%;
      margin-left: 20px;
      background-color: rgba(240, 242, 245, 1);
      .h-b-r-logo {
        text-align: center;
        height: 172px;
        background: #fff;
      }
      .h-b-r-label {
        margin-top: 20px;
        background: #fff;
        .h-b-r-l-item {
          line-height: 50px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(235, 235, 235, 1);
          width: 95%;
          margin-left: 2.5%;
        }
      }
      .h-b-r-tag {
        margin-top: 20px;
        background: #fff;
        .h-b-r-t-body {
          display: flex;
          flex-flow: wrap;
          padding: 5px;
          .h-b-r-t-b-item {
            line-height: 50px;
            padding-left: 20px;
            box-sizing: border-box;
            img {
              position: relative;
              top: 7px;
              left: -10px;
            }
            span {
              font-size: initial;
            }
          }
        }
      }
    }
  }
}
.page {
  p {
    &:first-child {
      margin-top: 0px;
    }
    b {
      color: $color-text-main;
      margin-right: 10px;
    }
    span {
      color: $color-text-normal;
    }
  }
}
</style>
