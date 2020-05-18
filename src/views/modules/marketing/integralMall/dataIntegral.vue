<template>
  <d2-container class="page">
    <div class="integralMall">
      <div class="userTotal">兑换统计</div>
      <el-button type="primary"
                 size="mini"
                 @click="doDonwData">导出记录</el-button>
      <el-table :data="tableData"
                style="width: 100%"
                size="mini">
        <el-table-column prop="productName"
                         label="商品名称"></el-table-column>
        <el-table-column prop="memberCard"
                         label="会员号"></el-table-column>
        <el-table-column prop="phone"
                         label="会员手机号"></el-table-column>
        <el-table-column prop="createTime"
                         label="兑换时间"></el-table-column>
        <el-table-column prop="integral"
                         label="兑换积分"></el-table-column>
      </el-table>
    </div>
  </d2-container>
</template>
<script>
import integralMallTableConfig from "@/tableConfigs/marketing/integralMallConfig/integralMallConfig";
import { integralDetails, donwData, DataExport } from "@/api/marketing/interalMall";
import { formatDate } from "@/utils/index";
import configUrl from '@/api/configUrl'
export default {
  name: "ShortManagement",
  components: {},
  data () {
    return {
      setName: "",
      setStatus: 0,
      tableData: [],
      tableConfig: {},
      currentPage: 1,
      total: 0,
      page: 1,
      f_tabsSlots: {
        operating: "operating"
      } // 插槽
    };
  },
  computed: {},
  created () {
    this.getIntegralDetails(this.$route.query.id);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    //积分商城数据
    getIntegralDetails (id) {
      console.log('积分商城数据', id)
      integralDetails({ id: id }).then(res => {
        console.log("res", res);
        this.tableData = res.data;
      });
    },
    doDonwData () {
      // console.log(configUrl.ajax_url + 'marketing/integral/down/' + this.$route.query.id)
      DataExport({ id: this.$route.query.id }).then(res => {
        console.log(res, '数据导出')
        if (res.code == 0) {
          window.open(this.$fileUrl() + res.data);
        }
      })
    },
  }
};
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
        width: 70px;
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
