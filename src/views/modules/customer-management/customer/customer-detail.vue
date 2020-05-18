<template>
  <d2-container class="page">
    <div class="title-div">
      <div class="left">{{details.companyName}}</div>
      <div class="right">
        <!-- 创建人 -->
        <div v-if="details.createUser"
             class="right-div">
          <span>{{$t('untracked.label1')}}</span>
          <span>{{details.createUser}}</span>
        </div>
        <!-- 更新时间 -->
        <div class="right-div">
          <span>{{$t('untracked.label2')}}</span>
          <span>{{details.createTime}}</span>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="contant">
      <el-divider content-position="left">{{$t('untracked.title2')}}</el-divider>
      <el-form style="padding: 20px;"
               :model="details"
               ref="Form"
               label-position="left"
               label-width="auto">
        <el-row>
          <!-- 客户来源 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from3')">
              <div class="text-div">{{details.sourceName}}</div>
            </el-form-item>
          </el-col>
          <!-- 邮箱 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from12')">
              <div class="text-div">{{details.email}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 集团名称 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from7')">
              <div class="text-div">{{details.groupName}}</div>
            </el-form-item>
          </el-col>
          <!-- 公司名称 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from1')">
              <div class="text-div">{{details.companyName}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 服务方式 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from5')">
              <div class="text-div">{{details.serviceMode}}</div>
            </el-form-item>
          </el-col>
          <!-- 行业细分 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from6')">
              <div class="text-div">{{details.industry}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 姓名 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from8')">
              <div class="text-div">{{details.name}}</div>
            </el-form-item>
          </el-col>
          <!-- 职位 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from9')">
              <div class="text-div">{{details.position}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 电话 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from11')">
              <div class="text-div">{{details.tel}}</div>
            </el-form-item>
          </el-col>
          <!-- 手机 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from10')">
              <div class="text-div">{{details.phone}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 负责人 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from15')">
              <div class="text-div">{{details.shoppingGuide}}</div>
            </el-form-item>
          </el-col>
          <!-- 负责人部门 -->
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from16')">
              <div class="text-div">{{details.deptName}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="contant">
      <el-divider content-position="left">订单列表</el-divider>
      <div class="contant-div">
        <div style="width:100%;margin-top:10px;">
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
        </div>
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
import { CustomerDetails, ModifyCustomer } from "@/api/customer-management/customer";
import { OrderForm } from '@/api/order/order'
import selectList from "./Data";
export default {
  components: {},
  data () {
    return {
      details: {},
      selectList: {},
      tableData: [],
      currentPage: 1,
      total: 0,
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
    };
  },
  computed: {},
  created () {
    this.selectList = { ...selectList };
    if (this.$route.query.id) {
      this.Details(this.$route.query.id);
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {

    Details (id) {
      // 详情接口
      CustomerDetails({ id: id }).then(res => {
        console.log(res, '详情接口')
        if (res.code == 0) {
          res.data.createTime = this.$formatDate(new Date(res.data.createTime), "yyyy-MM-dd hh:mm:ss");
          this.details = res.data;
          if (res.data.memberId) { // 查询订单
            this.orderFormInterface(1)
          }
        } else {
          this.$formatDate(res.message, false)
        }
      })
    },

    // 订单列表接口
    orderFormInterface (page) {
      let optionObj = {
        page: page,
        size: 10,
        simplify: false,
        memberId: this.details.memberId,
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

    handleCurrentChange (e) {
      this.orderFormInterface(e);
    },

  }
};
</script>
<style lang="scss" scoped>
.title-div {
  width: 100%;
  height: 50px;
  .left {
    width: 50%;
    height: 50px;
    line-height: 50px;
    float: left;
    font-size: 24px;
  }
  .right {
    width: 50%;
    height: 50px;
    float: right;
    .right-div {
      width: 100%;
      text-align: right;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
    }
  }
}
.contant {
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  .text-div {
    width: 100%;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .contant-div {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
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

