<template>
  <d2-container class="page">
    <div class="shortBackground">
      <div class="shortTotal">
        签名显示在短信内容的最前面，显示这条短信来自哪家公司/产品/网站。因运营商要求，签名需经过审核。
      </div>
      <div class="search-box">
        <div class="search-box-left">
          <el-input
            v-model="searchName"
            size="mini"
            placeholder="请输入签名内容关键字"
          />
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="getshortList(1)"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="caozuo">
        <el-button type="primary" size="mini" @click="synchronization()"
          >同步云片签名</el-button
        >
      </div>

      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-slots="f_tabsSlots"
        :tabs-on-c-list="f_tabsOnCList"
        @_selectionChange="getTabSelList"
        @_name="tabEvns"
        @_sex="tabEvns"
        @_operating="tabEvns"
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

      <!-- 同步 -->
      <el-dialog :title="title" width="40%" :visible.sync="childrenFormVisible">
        <el-col :span="24" class="bottom">
          <div>确认同步云片签名？</div>
        </el-col>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="sure()"
            >确 定</el-button
          >
          <el-button size="mini" @click="off()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import shortTableConfig from '@/tableConfigs/marketing/short/shortmanagentConfig'
import { shortmsg, synchronizationsign } from '@/api/marketing/short'
export default {
  name: 'ShortManagement',
  components: {},
  data() {
    return {
      title: '同步云片签名',
      childrenFormVisible: false,
      searchName: '',
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: null,
      page: 1,
      f_tabsOnCList: [], // 该tab的事件集合  @ k:key; mT:methodsType
      f_tabsSlots: { operating: '' } // 插槽
    }
  },
  computed: {
    // ...mapState('d2admin/user', ['info'])
  },
  created() {
    this.getshortList(1)
    this._initTab()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    _initTab() {
      console.log('tableConfig', { ...shortTableConfig })
      // 对 memTableConfig 配置文件 进行 增加id处理;
      shortTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = shortTableConfig
    },
    tabEvns(k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    getTabSelList(v) {
      console.log('getTabSelList', v)
    },
    integralThis(type, v) {
      this.integralType = type
      console.log(type, v, 111111)
    },
    handleCurrentChange(e) {
      console.log('分页', e)
      this.getshortList(e)
    },
    getshortList(page) {
      const params = '?page=' + page + '&size=10' + '&sign=' + this.searchName
      shortmsg(params).then(res => {
        console.log('短信列表', res)
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    synchronization() {
      this.childrenFormVisible = true
    },
    sure() {
      synchronizationsign().then(res => {
        console.log('同步云签名', res)
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '同步成功',
            type: 'success'
          })
          this.childrenFormVisible = false
        }
      })
    },
    off() {
      this.childrenFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.shortBackground {
  .shortTotal {
    padding: 10px 15px;
    border: 1px solid rgba(0, 204, 255, 1);
    background: rgba(229, 246, 255, 1);
    color: #ccc;
    margin-bottom: 20px;
  }
  .search-box {
    display: flex;
    margin-bottom: 20px;
    .search-box-left {
      display: flex;
      margin-right: 150px;

      .search-box-left-btn {
        text-align: center;
        height: 30px;
        color: #fff;
        // background: #66b1ff;
        // margin-left: -5px;
        border: none;
      }
    }
    .search-box-right {
      line-height: 28px;
      .search-box-right-title {
        margin-right: 20px;
        color: #606266;
      }
    }
  }

  .tab-head-btn {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }
}
</style>
