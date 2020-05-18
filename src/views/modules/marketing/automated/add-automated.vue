<template>
  <d2-container class="page">
    <h3 class="list-title">新建自动化营销</h3>
    <div class="home-box">
      <div class="left-box">
        <el-menu :default-openeds="openIds" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span style="font-weight:bold;">全部模板</span>
            </template>
            <el-submenu index="0-0">
              <template slot="title">
                <span
                  style="font-weight:bold;width:100%;display:block;"
                  @click="setIndex(0)"
                  >空白模版</span
                >
              </template>
            </el-submenu>
            <el-submenu index="1-1">
              <template slot="title">
                <span
                  style="font-weight:bold;width:100%;display:block;"
                  @click="setIndex(1)"
                  >拉新用户</span
                >
              </template>
              <el-menu-item index="1-1-1">
                <img style="margin-right:10px;" src="@/assets/img/zcsl.svg" />
                <span>注册送好礼</span>
              </el-menu-item>
              <el-menu-item index="1-1-2">
                <img
                  style="margin-right:10px;"
                  src="@/assets/img/discount-voucher.svg"
                />
                <span>京东送礼券</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-2">
              <template slot="title">
                <span
                  style="font-weight:bold;width:100%;display:block;"
                  @click="setIndex(2)"
                  >留存用户</span
                >
              </template>
              <el-menu-item index="1-2-1">
                <img
                  style="margin-right:10px;"
                  src="@/assets/img/customer.svg"
                />
                <span>3个月内老客户召回计划</span>
              </el-menu-item>
              <el-menu-item index="1-2-2">
                <img style="margin-right:10px;" src="@/assets/img/vip.svg" />
                <span>VIP客户关怀计划</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-3">
              <template slot="title">
                <span
                  style="font-weight:bold;width:100%;display:block;"
                  @click="setIndex(3)"
                  >触活用户</span
                >
              </template>
              <el-menu-item index="1-3-1">
                <img style="margin-right:10px;" src="@/assets/img/yx.svg" />
                <span>日常分组活动营销</span>
              </el-menu-item>
              <el-menu-item index="1-3-2">
                <img style="margin-right:10px;" src="@/assets/img/repeat.svg" />
                <span>半年内复购提醒计划</span>
              </el-menu-item>
              <el-menu-item index="1-3-3">
                <img style="margin-right:10px;" src="@/assets/img/abs.svg" />
                <span>新品A/B测试计划</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="1-4">
              <template slot="title">
                <span
                  style="font-weight:bold;width:100%;display:block;"
                  @click="setIndex(4)"
                  >召回用户</span
                >
              </template>
              <el-menu-item index="1-4-1">
                <img
                  style="margin-right:10px;"
                  src="@/assets/img/percentage.svg"
                />
                <span>沉睡预警召回计划</span>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                <img
                  style="margin-right:10px;"
                  src="@/assets/img/precision.svg"
                />
                <span>老用户精准投放</span>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right-box">
        <!-- <div class="list">
          <div class="top" style="background:#ff8a64;">
            <img class="img" src="@/assets/img/bg1.svg" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">空白模板</div>
              <div class="p2">创建全新的空白模板</div>
            </div>
            <div class="bottom-right">
              <el-button type="primary" size="small" @click="goEnter">选用</el-button>
            </div>
          </div>
        </div> -->

        <!-- <div class="list">
          <div class="top" style="background:#0091ff;">
            <img class="img" src="@/assets/img/bg2.svg" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">实时营销</div>
              <div class="p2">在客户产生了某个事件动作或客户属性发生变化时</div>
            </div>
            <div class="bottom-right">
              <el-button
                type="primary"
                size="small"
                @click="
                  $router.push({
                    name: 'marketing-Automated-startTrigger',
                  })
                "
                >选用</el-button
              >
            </div>
          </div>
        </div> -->
        <div
          v-for="(itm, idx) in templanteList[setIdx].chilns"
          :key="idx"
          class="list"
        >
          <div class="top" :style="{ background: itm.background }">
            <img class="img" :src="require(`@/assets/img/${itm.icon}`)" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">{{ itm.title }}</div>
              <div class="p2">{{ itm.text }}</div>
            </div>
            <div class="bottom-right">
              <el-button
                type="primary"
                size="small"
                @click="routerInfo(itm.path)"
                >选用</el-button
              >
            </div>
          </div>
        </div>
        <!-- <div class="list">
          <div class="top" style="background:#f7b500;">
            <img class="img" src="@/assets/img/bg3.svg" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">周期营销</div>
              <div class="p2">以某个时间周期为条22件重复执行的营销策略</div>
            </div>
            <div class="bottom-right">
              <el-button
                type="primary"
                size="small"
                @click="
                  $router.push({
                    name: 'cycle-marketing',
                  })
                "
                >选用</el-button
              >
            </div>
          </div>
        </div>

        <div class="list">
          <div class="top" style="background:#6dd400;">
            <img class="img" src="@/assets/img/bg4.svg" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">单次营销</div>
              <div class="p2">对指定客户群进行一次营销触发执行一次即结束</div>
            </div>
            <div class="bottom-right">
              <el-button
                type="primary"
                size="small"
                @click="
                  $router.push({
                    name: 'singl-marketing',
                  })
                "
                >选用</el-button
              >
            </div>
          </div>
        </div>

        <div class="list">
          <div class="top" style="background:#f03d3d;">
            <img class="img" src="@/assets/img/bg5.svg" />
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="p1">节日营销</div>
              <div class="p2">在特殊的日期时间对客户进行营销触发</div>
            </div>
            <div class="bottom-right">
              <el-button
                type="primary"
                size="small"
                @click="
                  $router.push({
                    name: 'festival-marketing',
                  })
                "
                >选用</el-button
              >
            </div>
          </div>
        </div> -->
        <div style="clear:both" />
      </div>
    </div>
  </d2-container>
</template>

<script>
import templanteLists from './templanteList'
export default {
  name: 'MarketingAutomatedAddAutomated',
  data() {
    return {
      // openIds: ["1", "1-1", "1-2", "1-3", "1-4"]
      openIds: ['0', '1'],
      setIdx: 0, // 当前选中的下标
      templanteList: [],
    }
  },
  created() {
    this.$set(this, 'templanteList', templanteLists)
    console.log([...this.templanteList])
  },
  mounted() {},
  methods: {
    goEnter() {
      this.$router.push({
        name: 'marketing-Automated-startTrigger',
      })
    },
    setIndex(index) {
      this.setIdx = index
      console.log('this.setIdx', this.setIdx)
    },
    routerInfo(path) {
      if (!path) return
      this.$router.push({
        name: path,
      })
    },
  },
}
</script>

<style scoped>
.home-box {
  width: 100%;
  border: 1px solid #dddddd;
  margin: 0px;
  display: flex;
  background: #ffffff;
}
.left-box {
  width: 280px;
  padding-bottom: 150px;
  border-right: 1px solid #dddddd;
}
.right-box {
  flex: 1;
  padding-bottom: 150px;
}
.list {
  width: calc(25% - 30px);
  min-width: 295px;
  height: 220px;
  border-radius: 2px;
  border: 1px solid #dddddd;
  cursor: pointer;
  margin: 10px;
  float: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.top {
  width: 100%;
  height: 50%;
  position: relative;
}
.bottom {
  width: 100%;
  height: 50%;
  background: #ffffff;
  padding: 20px;
  box-sizing: border-box;
}
.bottom-left {
  width: calc(100% - 80px);
  height: 100%;
  float: left;
}
.bottom-right {
  width: 80px;
  height: 100%;
  float: right;
  padding-top: 35px;
}
.p1 {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.p2 {
  color: #999999;
  font-size: 14px;
  text-align: left;
  margin-top: 10px;
}
.img {
  width: 45px;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
}
</style>
