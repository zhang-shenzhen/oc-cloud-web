<template>
  <d2-container class="page">
    <h3 class="list-title">客户详情</h3>
    <el-form label-width="120px">
      <el-form-item label="客户来源">{{detailsobj.sourceName}}</el-form-item>
      <el-form-item label="客户姓名">{{detailsobj.name}}</el-form-item>
      <el-form-item label="手机号">{{detailsobj.phone}}</el-form-item>
      <el-form-item label="负责人">{{detailsobj.shoppingGuide}}</el-form-item>
      <el-form-item label="服务方式">{{detailsobj.serviceMode}}</el-form-item>
      <el-form-item label="行业细分">{{detailsobj.industry}}</el-form-item>
    </el-form>
    <h3 class="list-title">订单列表</h3>
    <template>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="商品信息"
                         width="300">
          <template slot-scope="scope">
            <div class="table-order">订单编号：{{scope.row.orderNum}}</div>
            <div class="table-order">下单时间：{{scope.row.createTime}}</div>
            <div class="table-img"
                 v-for="(item,i) in scope.row.orderCommodity"
                 :key="i">
              <img style="width:100px;height:100px;"
                   :src="$fileUrl() + item.specImage" />
              <div class="bot_right">
                <el-tooltip class="item"
                            effect="dark"
                            :content="item.productName"
                            placement="top">
                  <div class="table-title">{{item.productName}}</div>
                </el-tooltip>
                <div>数量：{{item.productNum}}</div>
                <div>{{item.specName}}</div>
                <div>单价：￥{{item.discountPrice}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">￥{{ scope.row.discount }}</template>
        </el-table-column>
        <el-table-column label="实付款">
          <template slot-scope="scope">￥{{ scope.row.totalPay }}</template>
        </el-table-column>
        <el-table-column label="收货人">
          <template slot-scope="scope">{{ scope.row.receiveName }}</template>
        </el-table-column>
        <el-table-column label="配送方式">
          <template slot-scope="scope">{{ orderType[scope.row.orderType] }}</template>
        </el-table-column>
        <!-- <el-table-column label="订单类型">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column> -->
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 16">已退款</span>
            <span v-if="scope.row.status != 16">{{status[scope.row.status]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background
                       :current-page="currentPage"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
    </template>
  </d2-container>
</template>
<script>
import { CustomerDetails } from "@/api/customer-management/customer";
import { OrderForm } from '@/api/order/order'
export default {
  name: '',
  components: {},
  data () {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      detailsobj: {},
      status: {
        '1': '待付款',
        '4': '已取消',
        '5': '已退款',
        '6': '待发货',
        '7': '待收货',
        '8': '待评价',
        '12': '已完成'
      },
      orderType: {
        '1': '快递',
        '3': '快递',
        '5': '快递',
        '7': '快递',
        '2': '自提',
        '4': '自提',
        '6': '自提',
        '8': '自提',
        '9': '自提',
        '10': '自提',
        '11': '自提',
        '12': '自提',
      },
    }
  },
  computed: {},
  created () {
    this.detailsInterface(this.$route.query.id);
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    // 详情接口
    detailsInterface (id) {
      CustomerDetails({ id: id }).then(res => {
        if (res.code == 0) {
          console.log(res, '详情接口')
          let option = res.data;
          this.detailsobj = option;
          if (option.memberId) { // 查询订单
            this.orderFormInterface(1)
          }
        }
      })
    },
    handleCurrentChange (e) {
      this.orderFormInterface(e)
    },
    // 订单列表接口
    orderFormInterface (page) {
      let optionObj = {
        page: page,
        size: 10,
        simplify: false,
        memberId: this.detailsobj.memberId,
        sort: 'create_time;2',
      }
      OrderForm(optionObj).then(res => {
        if (res.code == 0) {
          let data = res.data.data;
          if (data) {
            data.map(item => {
              item.orderCommodity = [];
              item.totalPay = (item.totalPay / 100).toFixed(2)
              item.discount = (item.discount / 100).toFixed(2)
              item.extraInfo = JSON.parse(item.extraInfo)
              item.freight = (item.freight / 100).toFixed(2);
              item.createTime = this.$formatDate(
                new Date(item.createTime),
                "yyyy-MM-dd hh:mm:ss"
              );
              if (item.orderDetailList) {
                item.orderDetailList.map(initem => {
                  initem.discountPrice = (initem.discountPrice / 100).toFixed(2)
                  if (initem.productType != 3) {
                    item.orderCommodity.push(initem);
                  }
                })
              }
            })
            this.tableData = data;
            console.log(this.tableData, '订单列表接口');
          } else {
            this.tableData = [];
          }
          this.total = res.data.total;
          this.currentPage = res.data.page;
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.table-img {
  display: flex;
  .bot_right {
    text-align: left;
    margin-left: 10px;
    .table-title {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

