<template>
  <d2-container class="page">
    <div class="integralMall">
      <div class="userTotal">{{ $t('integral') + $t('mall') }}</div>
      <div class="search-box">
        <div class="search-box-left">
          <span class="time">{{
            $t('commoditys') + $t('schedule.status')
          }}</span>
          <el-select v-model="setStatus"
                     style="width:62%;"
                     clearable
                     size="mini"
                     @change="getInteralMallList(1)">
            <el-option :label="$t('commoditys')"
                       :value="0" />
            <el-option :label="$t('shelf')"
                       :value="1" />
            <el-option :label="$t('obtained')"
                       :value="2" />
            <el-option :label="$t('delete')"
                       :value="3" />
          </el-select>
          <el-button type="primary"
                     size="mini"
                     class="search-box-left-btn"
                     @click="getInteralMallList(1)">{{ $t('layout.tooltip.search') }}</el-button>
        </div>
        <div class="search-box-left">
          <el-input v-model="setName"
                    style="400px;"
                    size="mini"
                    :placeholder="$t('p')" />
          <el-button type="primary"
                     size="mini"
                     class="search-box-left-btn"
                     @click="getInteralMallList(1)">{{ $t('layout.tooltip.search') }}</el-button>
        </div>
      </div>
      <el-button type="primary"
                 size="mini"
                 @click="routerToAdd()">{{
        $t('add') + $t('commoditys')
      }}</el-button>
      <table-mob ref="table_mob"
                 :table-data="tableData"
                 :table-config="tableConfig"
                 :tabs-slots="f_tabsSlots">
        <template v-slot:operating="operating">
          <el-button v-if="operating.operating.status == 2"
                     type="text"
                     size="mini"
                     @click="integralThis(1, operating.operating)">{{ $t('shelf') }}</el-button>
          <el-button v-else
                     type="text"
                     size="mini"
                     @click="integralThis(2, operating.operating)">{{ $t('obtained') }}</el-button>
          <el-button type="text"
                     size="mini"
                     @click="routerToAdd(operating.operating.id, operating.operating)">{{ $t('edit') }}</el-button>
          <el-button type="text"
                     size="mini"
                     @click="
              () => {
                $router.push({
                  name: 'data-Integral',
                  query: { id: operating.operating.id }
                })
              }
            ">{{ $t('data') }}</el-button>
          <el-button size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="integralThis(3, operating.operating)">{{ $t('delete') }}</el-button>
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
  </d2-container>
</template>
<script>
import integralMallTableConfig from '@/tableConfigs/marketing/integralMallConfig/integralMallConfig'
import {
  interalMallList,
  edit,
  changeDetails
} from '@/api/marketing/interalMall'
import { formatDate } from '@/utils/index'

export default {
  name: 'ShortManagement',
  components: {},
  data () {
    return {
      setName: '',
      setStatus: 0,
      tableData: [],
      tableConfig: {},
      currentPage: 1,
      total: 0,
      page: 1,
      f_tabsSlots: {
        operating: 'operating'
      } // 插槽
    }
  },
  computed: {},
  created () {
    this.getInteralMallList(1)
    this._initTab()
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    _initTab () {
      console.log('tableConfig', { ...integralMallTableConfig })
      // 对 memTableConfig 配置文件 进行 增加id处理;
      integralMallTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1
      })
      this.tableConfig = integralMallTableConfig
    },
    integralThis (type, v) {
      console.log('integralThis', type, v)
      const that = this
      let msg = '确定要上架这件商品？'
      if (type == 2) msg = '确定要下架这件商品？'
      if (type == 3) msg = '确定要删除这件商品？'

      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        console.log('v,type', v, type)
        that.changeIntegral(v, type)
      })
    },
    handleCurrentChange (e) {
      console.log('分页', e)
      this.getInteralMallList(e)
    },
    getInteralMallList (page = 1) {
      const params = {
        page: page,
        size: 10,
        name: this.setName,
        status: this.setStatus
      }
      interalMallList(params).then(res => {
        console.log('积分商城列表', res)
        this.tableData = res.data
        this.total = res.count
      })
    },
    routerToAdd (id = null, data = null) {
      this.$router.push({
        name: 'add-Integral',
        query: {
          id: id,
          data: data
        }
      })
    },
    // 编辑当前接口
    changeIntegral (v, type) {
      v.status = type
      changeDetails(v).then(res => {
        this.getInteralMallList(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.integralMall {
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
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
      .phone {
        width: 80px;
        height: 30px;
        line-height: 30px;
      }
      .time {
        width: 130px;
        height: 30px;
        line-height: 30px;
      }
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
