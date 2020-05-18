<template>
  <d2-container class="page">
    <div class="user-sys">
      <div class="title">会员卡列表</div>
      <div class="list-title">请根据实际需求选择合适的会员注册开卡功能</div>
      <div class="cards">
        <!-- <div class="card" v-for="(itm,idx) in cards" :key="idx">
          <img
            src="https://d1icd6shlvmxi6.cloudfront.net/gsc/U7TCXS/2d/0c/79/2d0c7992e87848edb4bd15af63b2c9be/images/会员卡__多品牌_/u23479.png?token=23bc3872e2d1ec0f1170535479196ce651396cd596e18a43b5c64325c2531c85"
            alt
          />
          <div style="margin-left:-60px;">
            <p class="card-n">{{itm.n}}</p>
            <p class="card-f">{{itm.f}}</p>
          </div>
          <p>{{itm.t?'已开启':'未开启'}}</p>
        </div>-->
        <div
          v-if="cardList.length == 0"
          class="card"
          style="text-align: center;position: relative;"
          @click="$router.push('/member/user-sys/reuser-sys')"
        >
          <div class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
        </div>
        <div
          v-else
          class="card"
          @click="
            () => {
              if (this.cardList.length == 0) {
                $router.push('/member/user-sys/reuser-sys')
              } else {
                $router.push({
                  path: '/member/user-sys/reuser-sys',
                  query: cardList,
                })
              }
            }
          "
        >
          <img
            class="cardView-top-head"
            :src="$fileUrl() + cardList[0].logo"
            alt
          />
          <img
            :src="$fileUrl() + cardList[0].backgroundImage"
            class="cardView-backgroundImage"
            alt
          />
          <p class="card-n">{{ cardList[0].name }}</p>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { getCard } from '@/api/member/member'
import configUrl from '@/api/configUrl'
export default {
  components: {},
  data() {
    return {
      cards: [
        {
          t: true, // type
          n: '会员卡', // name
          f: '怀仁大药房', // 来源 from
        },
        {
          t: true, // type
          n: '会员卡', // name
          f: '怀仁母婴', // 来源 from
        },
      ],
      cardList: [],
    }
  },
  computed: {},
  created() {
    // 获取当前用户的卡
    this.getCards()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getCards() {
      const params = {}
      getCard(params).then((res) => {
        console.log('res', res)
        this.cardList = res || []
        // console.log('this.cardList', this.cardList[0].logo)
      })
    },
  },
}
</script>

<style lang="scss" scope>
.user-sys {
  .cardView-backgroundImage {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .cardView-top-head {
    width: 34px;
    height: 34px;
    position: absolute;
    z-index: 9;
    left: 20px;
    top: 10px;
    border-radius: 34px;
  }
  .upload-box {
    width: 100px !important;
    height: 124px !important;
    // border: 1px dashed #dddddd !important;
    cursor: pointer !important;
    line-height: 124px;
  }
  .logoIcon {
    font-size: 40px !important;
    color: #dddddd !important;
    margin: 30px !important;
  }
  .title {
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 18px;
    text-align: left;
  }
  .list-title {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 0, 0, 0.447058823529412);
    line-height: 22px;
  }
  .cards {
    display: flex;
    .card {
      border: 1px solid rgba(233, 233, 233, 1);
      border-radius: 2px;
      width: 400px;
      height: 240px;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      margin-right: 20px;
      display: flex;
      justify-content: space-around;
      position: relative;
      .card-name {
      }
      .card-n {
        font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold',
          'PingFang SC';
        font-weight: 650;
        font-style: normal;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.847058823529412);
        line-height: 24px;
        z-index: 99;
        left: 70px;
        position: absolute;
      }
      .card-f {
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        font-weight: 400;
        font-style: normal;
        color: rgba(0, 0, 0, 0.447058823529412);
        line-height: 22px;
      }
    }
  }
}
</style>
<style lang="scss">
.user-sys {
  .list-title {
    width: 100%;
    color: #666666;
    height: 35px;
    line-height: 35px;
  }
}
</style>
