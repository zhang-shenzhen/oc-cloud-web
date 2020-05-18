<template>
  <d2-container class="page">
    <div class="sweepstakesBackground">
      <div class="tab-head-btn">
        <div class="tab-head-btn-l">
          <!-- $t('layout.tooltip.filter') -->
          <el-button
            class="btn"
            type="primary"
            @click="exportData"
          >导出数据</el-button>
        </div>

      </div>
      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
      />
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
  </d2-container>
</template>

<script>
import sweepTableDataConfig from '@/tableConfigs/marketing/lottery/sweepTableDataConfig'
import configUrl from '@/api/configUrl'
import { recordLottery } from '@/api/marketing/lottery'
export default {
  components: {

  },
  data() {
    return {
      tableData: [],
      tableConfig: {},
      memInfoType: false, // memInfoView
      total: 0,
      page: 1,
      currentPage: 1,
      dialogTableVisible: false,
      setingUrl: null,
      dataChannelTypeId: 1,
      dataPage: 1,
      dataTotal: 0
    }
  },
  computed: {

  },
  created() {
    this.getDateThis(1)
    this._initTab()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    _initTab() {
      this.tableConfig = sweepTableDataConfig
    },
    getDateThis(page) {
      const params = {
        size: 10,
        page: page,
        channelTypeId: 1,
        companyId: 1,
        activityId: this.$route.query.id
      }
      recordLottery(params).then(res => {
        console.log('获取抽奖活动', res)
        this.tableData = res.data
        this.currentPage = page
        this.total = res.total
      })
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getDateThis(e)
    },
    // 编辑
    upDateThis(operating) {
      this.$router.push({ name: 'member-marketing-lottery-sweepstakesInfo', query: {
        OTP: 2,
        v: operating
      }})
    },
    // 点击查看
    setThis(url) {
      this.setingUrl = url.url
      this.dialogTableVisible = true
    },
    // 导出数据
    exportData() {
      window.open(configUrl.ajax_url + 'marketing/lottery/export')
    }
  }
}
</script>

<style lang="scss" scope>
.sweepstakesBackground {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;

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
    margin-bottom: 30px;
  }
  .v-name {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
<style lang="scss" >
.sweepstakesBackground {
  .btn {
    line-height: 30px !important;
    height: 30px !important;
    padding: 0 20px !important;
  }
  .el-table th {
    color: #000 !important;
    background: #f7f6f2 !important;
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
