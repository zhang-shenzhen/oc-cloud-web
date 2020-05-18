<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('order.title1')}}</h3>
    <!-- 搜索↓ -->

    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="orderStatus"
                        size="mini"
                        @change="radio_group">
          <el-radio-button label="1">快 递</el-radio-button>
          <el-radio-button label="2">自 提</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col class="box_col"
              :span="24">
        <div class="col_status">{{$t('order.status')}}：</div>
        <div class="col_sty">
          <el-select size="mini"
                     v-model="form.statusArr"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col_sty">
          <el-date-picker size="mini"
                          v-model="form.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          :range-separator="$t('datePicker.range')"
                          :start-placeholder="$t('datePicker.start')"
                          :end-placeholder="$t('datePicker.end')">
          </el-date-picker>
        </div>
        <div class="col_sty">
          <el-input size="mini"
                    :placeholder="$t('order.cellPhoneNumber')"
                    v-model="form.name"
                    clearable>
          </el-input>
        </div>
        <el-button size="mini"
                   type="primary"
                   @click="clickSure()">{{$t('layout.tooltip.search')}}</el-button>
        <!-- <el-button size="mini"
                   type="primary">{{$t('order.exportExcel')}}</el-button> -->
      </el-col>
    </el-row>
    <!-- 搜索↑ -->
    <!-- tab栏↓ -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :label="$t('order.allOrder')"
                   name="0"></el-tab-pane>
      <el-tab-pane v-for="(item,index) in options"
                   :key="index"
                   :label="item.label"
                   :name="item.value"></el-tab-pane>
    </el-tabs>
    <!-- tab栏↑ -->
    <!-- 表格↓ -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column :label="$t('order.goods')"
                       width="350">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{$t('order.orderNo')}}:{{ scope.row.orderNum}}</span>
          <span style="margin-left: 10px">{{$t('order.orderTime')}}:{{ scope.row.createTime }}</span>
          <div class="news_bottom"
               v-for="(item,i) in scope.row.orderCommodity"
               :key="i">
            <img class="news_img"
                 :src="$fileUrl() + item.specImage" />
            <div class="bot_right">
              <div>{{item.productName}}</div>
              <div>{{$t('q')}}：{{item.productNum}}</div>
              <div>{{$t('commodity.goods.unitPrice')}}：{{item.discountPrice}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.orderAmount')">
        <template slot-scope="scope">
          <span style="margin-left: 10px">￥{{scope.row.discount}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.actualPayment')">
        <template slot-scope="scope">
          <div>￥{{ scope.row.totalPay }}</div>
          <div>({{$t('order.freightIncluded')}}￥{{scope.row.freight || ''}})</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.consignee')">
        <template slot-scope="scope">
          <div>{{scope.row.receiveName}}</div>
          <div>{{ scope.row.receivePhone }}</div>
          <div class="list_notes">
            <el-popover placement="top-start"
                        :title="$t('order.remarks')"
                        width="300"
                        trigger="hover"
                        :content="scope.row.extraInfo.merchantRemark || ''">
              <p slot="reference">{{$t('order.remarks')}}:{{scope.row.extraInfo.merchantRemark || ''}}</p>
            </el-popover>
          </div>
          <div class="list_notes">
            <el-popover placement="top-start"
                        :title="$t('order.remarks1')"
                        width="300"
                        trigger="hover"
                        :content="scope.row.extraInfo.customerRemark || ''">
              <p slot="reference">{{$t('order.remarks1')}}：{{scope.row.extraInfo.customerRemark || ''}}</p>
            </el-popover>
          </div>
          <span style="margin-left: 10px"></span>
        </template>
      </el-table-column>
      <el-table-column label="配送方式">
        <template slot-scope="scope">{{orderType[scope.row.orderType]}} </template>
      </el-table-column>
      <el-table-column :label="$t('order.status')">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 16">已退款</span>
          <span v-if="scope.row.status != 16">{{status[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="handleDetails(scope.$index, scope.row)">{{$t('order.orderDetails')}}</el-button>
          <!-- 全额退款 -->
          <el-button size="mini"
                     type="text"
                     v-if="scope.row.status == 6 || scope.row.status == 7 || scope.row.status == 8 || scope.row.status == 12"
                     @click="handleRefund(scope.$index, scope.row)">{{$t('order.fullRefund')}}</el-button>
          <!-- 物流确认收货 -->
          <el-button size="mini"
                     type="text"
                     v-if="scope.row.status == 7"
                     @click="handleReceiving(scope.$index, scope.row)">{{$t('order.logistics')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格↑ -->
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 全额退款弹框↓ -->
    <el-dialog title="退款"
               width="30%"
               :visible.sync="dialogFormVisible">
      <el-form :model="rebate">
        <el-form-item label="金额"
                      label-width="120">
          <div>{{rebate.refundAmountStr}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="sureReimburse()">确 定</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>
<script>
import { OrderForm, OrderItem, LogisticsConfirmationReceipt, FullRefund } from '@/api/order/order'
export default {
  name: 'Coupon',
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      rebate: {
        orderId: '',
        refundAmountStr: '',
      },
      activeName: '0',
      form: {
        statusArr: '',
        time: [],
        name: '',
      },
      parameter: {},
      status: {
        '1': '待付款',
        '4': '已取消',
        '5': '已退款',
        '6': '待发货',
        '7': '待收货',
        '8': '待评价',
        '12': '已完成'
      },
      orderStatus: '1',
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
      currentPage: 1,
      total: 0,
      options: [{
        value: '1',
        label: '待付款'
      }, {
        value: '4',
        label: '已取消'
      }, {
        value: '5',
        label: '已退款'
      }, {
        value: '6',
        label: '待发货'
      }, {
        value: '7',
        label: '待收货'
      }, {
        value: '8',
        label: '待评价'
      }, {
        value: '12',
        label: '已完成'
      }],
      orderTypeArr: '1,3,5,7',
      tableData: []
    }
  },
  computed: {},
  created () {
    this.parameter = JSON.parse(JSON.stringify(this.form));
    this.orderFormInterface(1, this.parameter);
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    radio_group () {
      // 点击选择配送方式
      this.form = {
        statusArr: '',
        time: [],
        name: '',
      };
      this.activeName = '0'
      this.parameter = JSON.parse(JSON.stringify(this.form));
      if (this.orderStatus == 1) { // 快递
        this.orderTypeArr = '1,3,5,7'
      } else { // 自提
        this.orderTypeArr = '2,4,6,8,9,10,11,12'
      }
      this.orderFormInterface(1, this.parameter);
    },
    // 订单列表接口
    orderFormInterface (page, option) {
      let optionObj = {
        page: page,
        size: 10,
        simplify: false,
        orderTypeArr: this.orderTypeArr,
        sort: 'create_time;2',
      }
      if (option.name) {
        optionObj.name = option.name;
      }
      if (option.statusArr) {
        optionObj.statusArr = option.statusArr;
      }
      if (option.time) {
        optionObj.startTime = option.time[0];
        optionObj.endTime = option.time[1];
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
              item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm:ss");
              if (item.orderDetailList) {
                item.orderDetailList.map(initem => {
                  initem.discountPrice = (initem.discountPrice / 100).toFixed(2)
                  if (initem.productType != 3) {
                    if (!initem.specImage && initem.productImage) {
                      initem.specImage = initem.productImage.split(',')[0]
                    }
                    item.orderCommodity.push(initem);
                  }
                })
              }
            })
            this.tableData = data;
          } else {
            this.tableData = [];
          }
          this.total = res.data.total;
          this.currentPage = res.data.page;
        }
      })
    },
    clickSure () {
      // 点击搜索
      this.activeName = this.form.statusArr == '' ? '0' : this.form.statusArr;
      this.parameter = JSON.parse(JSON.stringify(this.form));
      if (this.form.statusArr == '5') {
        this.parameter.statusArr = '5,16';
      }
      this.orderFormInterface(1, this.parameter);
    },
    handleClick (tab, event) {
      // 点击tab切换
      this.parameter.statusArr = this.activeName == 0 ? '' : this.activeName;
      if (this.activeName == '5') {
        this.parameter.statusArr = '5,16'
      }
      this.orderFormInterface(1, this.parameter);
    },
    handleDetails (index, row) {
      // 点击订单详情
      this.$router.push({
        name: 'order-management-order-order-details', // 路径
        query: { id: row.id } // 参数
      })
    },
    handleRefund (index, row) { // 全额退款
      FullRefund({
        orderId: row.id,
        refundAmountStr: '',
        refundType: 1,
        calculate: true,
      }).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = true;
          this.rebate = res.data;
        } else {
          this.open2('警告', res.message, 'warning');
        }
      })
    },
    sureReimburse () {
      // 点击退款确认按钮
      FullRefund({
        orderId: this.rebate.orderId,
        refundAmountStr: this.rebate.refundAmountStr,
        refundType: 1,
        calculate: false,
      }).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = false;
          this.open2('成功', '退款成功', 'success');
          this.orderFormInterface(1, this.parameter);
        } else {
          this.open2('警告', res.message, 'warning');
        }
      })
    },
    handleReceiving (index, row) { // 确定收货
      this.$confirm("确定收货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          LogisticsConfirmationReceipt({
            id: row.id,
          }).then(res => {
            if (res.code == 0) {
              this.open2('成功', '收货成功', 'success');
              this.orderFormInterface(1, this.parameter);
            } else {
              this.open2('警告', res.message, 'warning');
            }
          })
        })
        .catch(() => {
          this.open2('警告', error.message, 'warning');
        });
    },
    handleCurrentChange (e) {
      // 点击分页
      this.orderFormInterface(e, this.parameter);
    },
    open2 (title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.box_col {
  display: flex;
  align-items: center;
  .col_status {
    margin-right: 10px;
  }
  .col_sty {
    margin-right: 10px;
    .sty_inp {
      width: 20%;
    }
  }
}
.table_news {
  margin-bottom: 10px;
}
.news_bottom {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  .news_img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
}
.list_notes {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

