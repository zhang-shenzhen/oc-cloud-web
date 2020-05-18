<template>
  <div>
    <div class="public_header">
      <el-row>
        <el-col :span="24">
          <div class="grid-content">{{ $t('wechat.public.publicNumber') }}</div>
        </el-col>
        <el-col
          :span="6"
          class="public_sty"
        >
          <el-col :span="6">
            <img
              class="icon_sty"
              src="./img/newmsg.png"
              alt
            >
          </el-col>
          <el-col
            :span="17"
            :offset="1"
          >
            <span>{{ $t('wechat.public.news') }}</span>
            <p>{{ publics.newMessageCount }}</p>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="public_sty">
            <el-col :span="6">
              <img
                class="icon_sty"
                src="./img/update.png"
                alt
              >
            </el-col>
            <el-col
              :span="17"
              :offset="1"
            >
              <span>{{ $t('wechat.public.newFansAddedyesterday') }}</span>
              <p>{{ publics.newUserCount }}</p>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="public_sty">
            <el-col :span="6">
              <img
                class="icon_sty"
                src="./img/takeoff.png"
                alt
              >
            </el-col>
            <el-col
              :span="17"
              :offset="1"
            >
              <span>{{ $t('wechat.public.YesterdaysPickUpFans') }}</span>
              <p>{{ publics.cancelUserCount }}</p>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="public_sty">
            <el-col :span="6">
              <img
                class="icon_sty"
                src="./img/increase.png"
                alt
              >
            </el-col>
            <el-col
              :span="17"
              :offset="1"
            >
              <span>{{ $t('wechat.public.NetAdditionsFansYesterday') }}</span>
              <p>{{ publics.netIncreaseUserCount }}</p>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="public_container">
      <el-row>
        <el-col
          :span="4"
          style="text-align:center"
        >
          <img
            :src="officialInfo.avatar"
            class="avatar"
          >
        </el-col>
        <el-col :span="20">
          <el-col
            :span="24"
            class="public_name"
          >
            <el-col :span="2">{{ $t('wechat.public.wechatNumber') }}:</el-col>
            <el-col :span="20">{{ officialInfo.wechatUsername }}</el-col>
          </el-col>
          <el-col
            :span="24"
            class="public_name"
          >
            <el-col :span="2">{{ $t('model.name') }}:</el-col>
            <el-col :span="20">{{ officialInfo.principalName }}</el-col>
          </el-col>
          <!-- <el-col
            :span="24"
            class="public_name"
          >
            <el-col :span="2">{{ $t('oss.type') }}:</el-col>
            <el-col :span="20">{{ officialInfo.type }}</el-col>
          </el-col> -->
          <el-col
            :span="24"
            class="public_name"
          >
            <el-col :span="2">{{ $t('wechat.public.interfaceException') }}:</el-col>
            <el-col :span="20">正常</el-col>
            <!-- <button @click="sure">确定</button> -->
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { PublicStatistics, PublicNumber } from '@/api/wechat/public'
export default {
  name: 'Public',
  data() {
    return {
      publics: {
        newUserCount: '',
        cancelUserCount: '',
        cumulateUser: '',
        wechaeId: '',
        netIncreaseUserCount: '',
        newMessageCount: ''
      },
      officialInfo: {
        wechatUsername: '',
        principalName: '',
        avatar: '',
        type: ''
      },
      officialType: {
        0: '订阅号',
        1: '订阅号',
        2: '服务号',
        3: '小程序'
      }
    }
  },
  computed: {},
  created() {
    this.getPublic()
    this.official()
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    sure() {
      for (let text of "Hello world") {
        console.log(text);
      }
    },

    getPublic() {
      PublicStatistics({}).then(res => {
        console.log('公众号信息', res)
        if (res.code == 0) {
          this.publics = res.data
        }
      })
    },
    official() {
      let id = localStorage.getItem("X-Channel");
      // const id = 3;
      PublicNumber({}, id).then(res => {
        console.log('2公众号信息2', res)
        if (res.code == 0) {
          this.officialInfo = res.data
          // this.officialInfo.type = this.officialType[res.data.type];
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.public_header {
  margin: 15px;
  border: 1px solid #dee5e7;
  background-color: #fff;
  box-shadow: 0 1px 10px #dee5e7; /*底边阴影*/
}
.grid-content {
  background-color: #f6f8f8;
  padding: 10px 15px;
  font-weight: 700;
  color: #333;
  border-bottom: 1px solid transparent;
}
.public_sty {
  padding: 20px;
}

.icon_sty {
  width: 100%;
}
.public_container {
  margin: 15px;
  padding: 15px;
  border: 1px solid #dee5e7;
  background-color: #fff;
}
.public_name {
  margin-bottom: 15px;
}
.avatar {
  width: 70%;
}
</style>

