/* eslint-disable vue/no-use-v-if-with-v-for */ /* eslint-disable
space-before-blocks */
<template>
  <d2-container class="page">
    <div class="home">
      <div class="h-head">
        <div class="h-head-l">
          <div class="h-head-l-l">
            <img
              v-if="$store.state.VUE_APP_NODE_SHOWTYPE == 1"
              style="width:67px;height:67px;    margin-left: 20px;"
              :src="circleUrl"
              alt
            />
          </div>
          <div class="h-head-l-r">
            <div class="h-head-l-r-name head-title">
              你好 , {{ info.email }}
            </div>
            <!-- <div class="h-head-l-r-tit">产品设计师</div> -->
          </div>
        </div>
        <div class="h-head-r">
          <div v-for="(itm, idx) in publics" :key="idx" class="h-head-r-itm">
            <div class="h-head-r-itm-title">{{ $t(itm.title) }}</div>
            <div class="h-head-r-itm-cont">{{ itm.sun }}</div>
            <!-- <div class="h-head-r-itm-sum">2.700% <i
              style="color:red;font-size: 18px;"
              class="el-icon-caret-top"
            /> </div>-->
          </div>
        </div>
      </div>
      <div class="h-body">
        <div class="h-b-left">
          <div class="h-b-l-box">
            <div class="h-b-l-b-head">
              <div style="font-size: 16px;">近期使用的项目</div>
              <!-- <el-button type="text" size="mini">设置</el-button> -->
            </div>
            <div class="h-b-l-b-cont">
              <div
                v-for="(itm, idx) in project"
                v-if="itm.isShow"
                :key="idx"
                class="h-b-l-b-c-itm"
                :style="{
                  'border-right': '1px solid #ebebeb',
                }"
                @click="$router.push('/' + itm.link)"
              >
                <div class="h-b-l-b-c-itm-head">
                  <img :src="itm.img" alt />
                  <span>{{ itm.title }}</span>
                </div>
                <div class="h-b-l-b-c-itm-body">
                  <span>{{ itm.p }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showType.dynamic" class="h-b-l-dynamic">
            <div class="head-title">动态</div>
            <div class="h-b-l-d-body">
              <div v-for="(itm, idx) in 5" :key="idx" class="h-b-l-d-b-itm">
                <img :src="circleUrl" alt />
                <div style="margin-left:20px;">
                  <p class="h-b-l-d-b-itm-p">
                    <span class="h-b-l-d-b-itm-p-who">林东东</span>在
                    <span class="h-b-l-d-b-itm-p-where">个性化菜单</span>
                    <span class="h-b-l-d-b-itm-p-how">发布了</span>
                    <span class="h-b-l-d-b-itm-p-what">微信菜单</span>
                  </p>
                  <span class="h-b-l-d-b-itm-time">3天前</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-b-right">
          <div class="h-b-r-logo">
            <div>
              <img
                v-if="
                  $store.state.VUE_APP_NODE_SHOWTYPE == 1 ||
                    $store.state.VUE_APP_NODE_SHOWTYPE == 'UPM'
                "
                style="width:67px;height:67px;"
                :src="officialInfo.avatar"
                alt
              />
            </div>
            <div style="width: 60%;margin-left: 20%;line-height: 50px;">
              <span>{{ officialInfo.principalName }}</span>
              <!-- <img
                style="width: 20px;height: 20px;position: relative;top: 5px;margin-left: 10px;"
                :src="circleUrl"
                alt=""
              >-->
            </div>
            <!-- <div style=" width: 35%;margin-left: 32.5%;background-color:rgba(240, 242, 245, 1);border-radius: 10px;line-height: 30px;">
              粉丝数<span> 4,891</span>
            </div>-->
          </div>
          <div v-if="showType.label" class="h-b-r-label">
            <div
              v-for="(itm, idx) in 5"
              :key="idx"
              class="h-b-r-l-item"
              :style="{
                'border-bottom': idx + 1 == 5 ? 'none' : '1px solid #ebebeb',
              }"
            >
              <div>
                <img
                  style="width:24px;height:24px;position: relative;top: 7px;left: 10px;height: 24px;"
                  :src="circleUrl"
                  alt
                />
                <span style="margin-left: 25px;    font-size: initial;"
                  >系统公告</span
                >
              </div>
              <i
                style="line-height:50px;margin-right: 5px;"
                class="el-icon-arrow-right"
              />
            </div>
          </div>
          <div v-if="showType.tag" class="h-b-r-tag">
            <div class="h-b-r-t-head head-title">资讯</div>
            <div class="h-b-r-t-body">
              <div
                v-for="(itm, idx) in 7"
                :key="idx"
                class="h-b-r-t-b-item"
                style="width:50%"
              >
                <img style="width:24px;height:24px;" :src="circleUrl" alt />
                <span>高逼格设计天团</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import { PublicStatistics, PublicNumber } from '@/api/wechat/public'
import { cookieGet } from '@/common/cookie'

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
        dynamic: false,
      },
      titleList: [
        {
          img: './img/newmsg.png',
          title: 'wechat.public.news',
          sun: '',
          link: '',
        },
      ],
      publics: {}, // 标题的设置
      officialInfo: {
        wechatUsername: '',
        principalName: '',
        avatar: '',
        type: '',
      }, // 公众号信息
      project: [], // 近期使用项目
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info', 'aside']),
  },
  created() {
    // this.getPublic()
    this.official()
    this.getProjectList()
    console.log('vuex暴露', this.aside)
  },
  methods: {
    getPublic() {
      PublicStatistics({}).then((res) => {
        console.log('公众号信息', res)
        if (res.code == 0) {
          for (const i in res.data) {
            const o = {
              sun: '',
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
      if (cookieGet('Httpheader')) {
        const id = JSON.parse(cookieGet('Httpheader')).ChannelId
        PublicNumber({}, id).then((res) => {
          console.log('2公众号信息2', res)
          if (res.code == 0) {
            this.officialInfo = res.data
          }
        })
      }
    },
    getProjectList() {
      var proObj = {
        titles: [
          '公众号设置',
          '自定义菜单',
          '渠道二维码',
          '素材管理',
          '群发消息',
          '触发器',
        ],
        links: [
          'wechat-menu-menu-list',
          'surbanajurong-wechat-menu-list',
          'surbanajurong-wechat-qrcode-list',
          'surbanajurong-wechat-material-advanced-picturehtml-list',
          'wechat-group-messages-group-page',
          'wechat-trigger-trigger-list',
        ],
        imgs: [
          require('@img/icon/icon_gzhse.png'),
          require('@img/icon/icon_zdysc.png'),
          require('@img/icon/icon_qdewm.png'),
          require('@img/icon/icon_scgl.png'),
          require('@img/icon/icon_qfxx.png'),
          require('@img/icon/icon_cfq.png'),
        ],
      }
      const links = window.SITE_CONFIG['dynamicMenuRoutes']
      for (const i in proObj.titles) {
        this.project.push({
          title: proObj.titles[i],
          link: proObj.links[i],
          img: proObj.imgs[i],
          isShow: false,
        })
        for (const j in links) {
          if (links[j].path == this.project[i].link) {
            this.project[i].isShow = true
            break
          }
        }
      }

      console.log('左侧菜单列表', window.SITE_CONFIG['menuList']) // 左侧菜单列表（后台返回，未做处理）
      console.log('页面按钮操作权限', window.SITE_CONFIG['permissions']) // 页面按钮操作权限（后台返回，未做处理）
      console.log('动态路由列表', window.SITE_CONFIG['dynamicRoutes']) // 动态路由列表
      console.log('动态(菜单)路由列表', window.SITE_CONFIG['dynamicMenuRoutes']) // 动态(菜单)路由列表
      console.log(
        '动态(菜单)路由是否已经添加的状态标示',
        window.SITE_CONFIG['dynamicMenuRoutesHasAdded']
      ) // 动态(菜单)路由是否已经添加的状态标示（用于判断是否需要重新拉取数据并进行动态添加操作）
      console.log('this.project', [...this.project])
      return
    },
  },
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
