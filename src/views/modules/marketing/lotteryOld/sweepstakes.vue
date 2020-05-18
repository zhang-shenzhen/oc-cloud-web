<template>
  <d2-container class="page">
    <div class="sweepstakesBackground">
      <div class="tab-head-btn">
        <div class="tab-head-btn-l">
          <!-- $t('layout.tooltip.filter') -->
          <el-button
            type="primary"
            size="mini"
            @click="
              $router.push({
                name: 'sweepstakesInfo',
                query: {
                  OTP: 1
                }
              })
            "
            >添加活动</el-button
          >
        </div>
      </div>
      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-on-c-list="f_tabsOnCList"
        :tabs-slots="f_tabsSlots"
        @_operating="tabEvns"
      >
        <template v-slot:url="url">
          <el-button size="mini" type="text" @click="setThis(url.url)"
            >点击查看</el-button
          >
        </template>
        <template v-slot:status="status">
          <span v-if="status.status.status == 4">已结束</span>
          <span v-if="status.status.status == 2">已开始</span>
          <span v-if="status.status.status == 1">已创建</span>
          <!-- <span v-if='status.status.status==4'>结束</span> -->
        </template>
        <template v-slot:operating="operating">
          <el-button
            size="mini"
            type="text"
            @click="getDateThis(operating.operating)"
            >数据</el-button
          >
          <el-button
            v-if="operating.operating.status != 4"
            size="mini"
            type="text"
            @click="upDateThis(operating.operating)"
            >编辑</el-button
          >
          <el-button
            v-if="operating.operating.status == 2"
            size="mini"
            type="text"
            @click="endThis(operating.operating)"
            >结束</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="copyThis(operating.operating)"
            >复制</el-button
          >
          <el-button
            v-if="operating.operating.status == 1"
            size="mini"
            type="text"
            @click="startThis(operating.operating)"
            >开始</el-button
          >
          <el-button
            v-if="operating.operating.status != 2"
            size="mini"
            type="text"
            style="color:#F56C6C"
            @click="delThis(operating.operating)"
            >删除</el-button
          >
        </template>
      </table-mob>
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      style="min-width:720px;"
      title="抽奖链接"
      :visible.sync="dialogTableVisible"
    >
      <el-row>
        <el-col
          :span="22"
          class="showHide"
          style="margin-left: 5%;text-align: center;width: 90%;"
        >
          <el-divider />
          {{ setingUrl }}
          <el-divider />
        </el-col>
      </el-row>
      <div style="margin-top:20px;">
        <el-button
          v-clipboard:copy="setingUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
          >复制</el-button
        >
        <el-button @click="dialogTableVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
// import tableMob from '@/components/GPMob/tableMob'
import memTableConfig from '@/tableConfigs/marketing/lottery/sweepstakesConfig'

import {
  lotterys,
  stopLottery,
  startLottery,
  deleteLottery,
  copyLottery
} from '@/api/marketing/lottery'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      tableConfig: {},
      memInfoType: false, // memInfoView
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: 'operating', url: 'url', status: 'status' }, // 插槽
      total: 0,
      page: 1,
      currentPage: null,
      dialogTableVisible: false,
      setingUrl: null
    }
  },
  computed: {},
  created() {
    this.getLottery(1)
    this._initTab()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      this.tableConfig = memTableConfig
    },
    getLottery(page) {
      const params = {
        size: 10,
        page: page,
        channelTypeId: 1,
        companyId: 1
      }
      lotterys(params).then(res => {
        console.log('获取抽奖活动', res)
        this.tableData = res.data
        this.currentPage = page
        this.total = res.total
      })
    },
    /**
     * setIngV Tbs事件代理
     * //挂在在每个 tab-v 上的事件;
     * @k 当前选中值的 背景参数
     * @v 当前值的 值
     */
    tabEvns(k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getLottery(e)
    },
    // 编辑
    upDateThis(operating) {
      this.$router.push({
        name: 'sweepstakesInfo',
        query: {
          OTP: 2,
          v: operating
        }
      })
    },
    // 数据
    getDateThis(operating) {
      this.$router.push({ name: 'sweepDataTable', query: { id: operating.id } })
    },
    // 结束
    endThis(operating) {
      console.log('operating', operating)
      stopLottery({ id: operating.id }).then(res => {
        console.log('结束', res)
        this.getLottery(1)
      })
    },
    // 复制
    copyThis(operating) {
      copyLottery({ id: operating.id }).then(res => {
        this.getLottery(1)
      })
    },
    // 删除
    delThis(operating) {
      this.$confirmDel('是否要删除当前抽奖设置', () => {
        deleteLottery({ id: operating.id }).then(res => {
          this.getLottery(1)
        })
      })
    },
    // 开始
    startThis(operating) {
      startLottery({ id: operating.id }).then(res => {
        console.log('开始', res)
        this.getLottery(1)
      })
    },
    // 点击查看
    setThis(url) {
      this.setingUrl = url.url
      this.dialogTableVisible = true
    },
    onError() {
      this.$notify.error({
        title: '错误',
        message: '复制失败'
      })
    },
    onCopy() {
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      })
      this.dialogTableVisible = false
    }
  }
}
</script>

<style lang="scss" scope>
.sweepstakesBackground {
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .el-form {
    display: flex;
    .search-box {
      display: flex;
      .search-box-btn {
        // line-height: 40px;
        /* padding: 10px; */
        // width: 60px;
        text-align: center;
        background: #66b1ff;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        margin-left: -5px;
        border: none;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .v-name {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.sweepstakesBackground {
  .btn {
    line-height: 30px !important;
    height: 30px !important;
    padding: 0 20px !important;
  }
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
    .v-label {
      background: rgb(51, 204, 153);
      color: #fff;
      padding: 5px;
    }
  }
}
</style>
