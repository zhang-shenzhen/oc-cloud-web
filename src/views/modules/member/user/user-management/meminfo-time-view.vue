<template>
  <div class="memInfoTimeView">
    <!-- <el-timeline>
      <el-timeline-item v-for='(itme,index) in datas' :key='index' :timestamp="itme.createTime" placement="top">
        <el-card>
          <h4>{{itme.str_a}}</h4>
          <p>{{itme.createTime}}</p>
          <p v-if='itme.str_b'> {{itme.str_b}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline> -->
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in datas"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >
        <h4>{{ activity.content }}</h4>
        <p>{{ activity.content }}</p>
        <img
          :src="require(`@img/icon/${activity.icon}`)"
          class="timeIcon"
          alt=""
        />
        <div v-if="activity.prodectimg" style="display:flex;">
          <img
            style="display:block;width:40px; margin-right:20px;"
            :src="require(`@img/icon/${activity.prodectimg}`)"
            alt=""
          />
          <div>
            <div>LOEWE卫衣</div>
            <div>价格:$200</div>
          </div>
        </div>
        <p v-if="activity.url">{{ activity.url }}</p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
    openId:{
      type:String,
      default:''
    },
    datas: {
      type: Array,
      default: function() {
        return [
          {
            content: '关注微信公众号',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            color: '#fff',
            type: 'primary',
            icon: 'wxbook.png',
          },
          {
            content: '点击微信菜单',
            timestamp: '2018-04-03 20:46',
            color: '#fff',
            size: 'large',
            icon: 'wxlist.png',
            url: 'www.wx.me/h5/ododoosaaad/23111111...',
          },
          {
            content: '访问小程序商城',
            timestamp: '2018-04-03 20:46',
            size: 'large',
            color: '#fff',
            icon: 'el-icon-present',
            icon: 'miapp.png',
          },
          {
            content: '浏览商品',
            size: 'large',
            color: '#fff',
            timestamp: '2018-04-03 20:46',
            icon: 'prodect.png',
            prodectimg: 'prodect.png',
          },
          {
            content: '加入购物车',
            size: 'large',
            color: '#fff',
            timestamp: '2018-04-04 20:46',
            icon: 'shopcar.png',
          },
          {
            content: '支付订单',
            size: 'large',
            color: '#fff',
            timestamp: '2018-04-05 20:46',
            icon: 'order.png',
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.openId)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      console.log('_upSV', type)
      this._showType = false
      this.$emit('_upSV', { type: type, SVData: this.form })
    },
  },
}
</script>

<style lang="scss" scope>
.memInfoTimeView {
  margin-left: 140px;
  .timeIcon {
    position: absolute;
    margin-top: 8px;
    left: -5px;
    top: -2px;
    width: 28px;
    background: #fff;
    height: 28px;
    z-index: 999;
  }
}
</style>
<style lang="scss">
.el-timeline-item__node--large {
  left: -10px;
  width: 28px;
  height: 28px;
  border-radius: 50% !important;
}
.memInfoTimeView {
  position: relative;
  .el-timeline-item__timestamp.is-top {
    position: relative !important;
    left: -100px;
  }
}
.el-timeline-item__timestamp.is-bottom {
  position: absolute;
  margin-top: 8px;
  left: -150px;
  top: -10px;
  background: rgba(0, 0, 0, 00.1);
  padding: 10px;
}
</style>
