<template>
  <d2-container class="page">
    <div class="shortBackground">
      <div class="shortTotal">{{ $t('short.msg') }}</div>
      <div class="search-box">
        <div class="search-box-left">
          <el-input size="mini"
                    clearable
                    placeholder="请输入内容"
                    v-model="searchName"
                    class="input-with-select">
            <el-button slot="append"
                       class="search-box-left-btn"
                       @click="getshortList(1)">{{ $t('short.search') }}</el-button>
          </el-input>
          <!-- <el-input v-model="searchName" size="mini" />
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="getshortList(1)"
            >{{ $t('short.search') }}</el-button
          > -->
        </div>
      </div>
      <div class="caozuo">
        <el-button type="primary"
                   size="mini"
                   @click="synchronization()">{{
          $t('short.synchronization')
        }}</el-button>
      </div>

      <!-- tabMob -->
      <table-mob ref="table_mob"
                 :table-data="tableData"
                 :table-config="tableConfig"
                 :tabs-slots="f_tabsSlots"
                 :tabs-on-c-list="f_tabsOnCList"
                 @_selectionChange="getTabSelList"
                 @_name="tabEvns"
                 @_sex="tabEvns"
                 @_operating="tabEvns" />

      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>

      <!-- 同步 -->
      <el-dialog :title="title"
                 width="40%"
                 :visible.sync="childrenFormVisible">
        <el-col :span="24"
                class="bottom">
          <div>{{ $t('short.sure') }}</div>
          <el-form>
            <el-form-item label="请选择账户">
              <el-select size="mini"
                         v-model="value"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.nick"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>

        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     size="mini"
                     @click="sure()">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini"
                     @click="off()">{{ $t('cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import shortTableConfig from '@/tableConfigs/marketing/short/shortmanagentConfig'
import { shortmsg, synchronizationsign, viewaccount } from '@/api/marketing/short'
import { mapState } from "vuex";
export default {
  name: 'ShortManagement',
  components: {},
  data () {
    return {
      options: [],
      value: '',
      title: this.$t('short.synchronization'),
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
    ...mapState('d2admin/user', ['info'])
  },
  created () {
    this.getshortList(1)
    this._initTab()
    this.viewaccountinterface(this.info.ChannelId)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    _initTab () {
      console.log('tableConfig', { ...shortTableConfig })
      // 对 memTableConfig 配置文件 进行 增加id处理;
      shortTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = shortTableConfig
    },
    tabEvns (k, v) {
      console.log('setIngV', 'onC' + k, k, v)
      this['onC' + k](v) // 动态调用当前列表中的方法;
    },
    getTabSelList (v) {
      console.log('getTabSelList', v)
    },
    integralThis (type, v) {
      this.integralType = type
      console.log(type, v, 111111)
    },
    handleCurrentChange (e) {
      console.log('分页', e)
      this.getshortList(e)
    },
    getshortList (page) {
      const params = '?page=' + page + '&size=10' + '&sign=' + this.searchName
      shortmsg(params).then(res => {
        console.log('短信列表', res)
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    synchronization () {
      this.childrenFormVisible = true
    },
    // 获取账户接口
    viewaccountinterface (ChannelId) {
      viewaccount({
        channelId: ChannelId
      }).then(res => {
        if (res.code == 0) {
          this.options = res.data.data;
          this.value = this.options[0].id
        }
      })
    },
    sure () {
      synchronizationsign({
        channelId: this.info.ChannelId,
        accountId: this.value
      }).then(res => {
        console.log('同步云签名', res)
        if (res.code == 0) {
          this.$notify({
            message: this.$t('short.tbsuc'),
            type: 'success'
          })
          this.getshortList(1)
          this.childrenFormVisible = false
        }
      })
    },
    off () {
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
