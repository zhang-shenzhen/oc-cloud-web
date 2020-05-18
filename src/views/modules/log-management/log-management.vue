<template>
  <d2-container class="page">
    <div class="order">
      <div class="order">
        <div class="search-box">
          <el-form style="display:flex;">
            <el-form-item class="search-box-item">
              <!-- 用户名 -->
              <el-input v-model="form.name"
                        size="mini"
                        clearable
                        :placeholder="$t('log.username')" />
            </el-form-item>
            <el-form-item class="search-box-item">
              <!-- 搜索 -->
              <el-button type="primary"
                         size="mini"
                         class="search-box-left-btn"
                         @click="getSelectLog(1)">{{$t('log.search')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- tabMob -->
        <table-mob ref="table_mob"
                   :table-data="tableData"
                   :table-config="tableConfig"
                   :tabs-slots="f_tabsSlots">
          <template v-slot:orderNo="orderNo">
            <div class="labelBack">
              <el-tooltip class="item"
                          effect="dark"
                          :content="orderNo.orderNo.id+''"
                          placement="top-start">
                <span>{{ orderNo.orderNo.orderNo }}</span>
              </el-tooltip>
            </div>
          </template>
        </table-mob>

        <div class="pagination">
          <el-pagination background
                         :current-page="currentPage"
                         layout="total, prev, pager, next, jumper"
                         :total="total"
                         @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import logManagement from '@/tableConfigs/logManagement/logManagement'
import { selectLog } from '@/api/logManagement/logManagement'
import configUrl from '@/api/configUrl'
export default {
  components: {
  },
  data () {
    return {
      form: {
        name: null
      },
      total: 0,
      page: 1,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      tabSelList: [],
      tabSelIdList: [],
      searchName: '',
      dialogTableVisible: false,
      f_tabsSlots: { operating: 'operating', orderNo: 'orderNo', tagType: 'tagType', price: 'price', status: 'status' } // 插槽

    }
  },
  computed: {

  },
  created () {
    this.getSelectLog(1)
    this._initTab()
  },
  mounted () {
    console.log('table_mob', this.$refs)
  },
  beforeDestroy () {
  },
  methods: {
    _initTab () {
      this.tableConfig = logManagement
    },
    // 导出订单
    excleOrders () {
      window.open(configUrl.ajax_url + 'upm/order/excle/make')
    },
    /**
     *  LOG列表
     */
    getSelectLog (page) {
      this.tableData = []
      const params = {
        size: 10,
        page: page,
      }
      Object.assign(params, this.form)
      selectLog(params).then(res => {
        if (res.code == 0) {
          if (res.data.list) {
            res.data.list.map(val => {
              val.createTime = this.$formatDate(new Date(val.createTime), "yyyy-MM-dd hh:mm:ss");
            })
            this.tableData = res.data.list
          } else {
            this.currentPage = 1;
          }
          this.total = res.data.count
        } else {
          this.$notifyFrame(res.message, false)
        }
      })
    },

    // 分页获取数据
    handleCurrentChange (e) {
      this.currentPage = e
      this.getSelectLog(e)
    }
  }
}
</script>

<style lang="scss" scope>
.order {
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  min-width: 1080px;

  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
  .search-box {
    display: flex;
    margin-bottom: 20px;
    .search-box-item {
      margin-left: 20px;
    }
  }
}

.tab-head-btn {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
}

.v-name {
  color: #409eff;
  cursor: pointer;
}
.order-price {
  .order-price-iptBox {
    display: flex;
    .order-price-iptBox-l {
      width: 100px;
      line-height: 30px;
    }
    .order-price-iptBox-v {
      width: 300px;
    }
  }
}
</style>
<style lang="scss" >
.order {
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
  }
  .el-form-item__label {
    display: inline-block;
    min-width: 70px;
  }
}
</style>
