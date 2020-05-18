<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('order.orderDetails')}}</h3>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane :label="$t('order.orderDetail1')"
                   name="1">
        <!-- 订单信息↓ -->
        <div class="order_top">
          <div class="order_top_box">
            <h4 class="order_top_title">{{$t('order.orderDetail1')}}</h4>
            <p>{{$t('order.orderNo')}}：{{OrderDetail.orderNum}}</p>
            <p>{{$t('order.orderTime')}}：{{OrderDetail.createTime}}</p>
          </div>
          <div class="order_top_box">
            <h4 class="order_top_title">{{$t('order.paymentInformation')}}</h4>
            <p>{{$t('order.pay')}}：{{OrderDetail.paymentNo}}</p>
            <p>{{$t('order.payTime')}}：{{OrderDetail.paymentTime}}</p>
            <p>{{$t('order.payMethod')}}：{{paymentType[OrderDetail.payment]}}</p>
            <p>配送方式：{{orderType[OrderDetail.orderType]}}</p>
            <p class="order_top_color">{{$t('order.status')}}：{{OrderDetail.statusType}}</p>
          </div>
          <div class="order_top_box">
            <h4 class="order_top_title">{{$t('order.info')}}</h4>
            <p>{{$t('order.info')}}：{{OrderDetail.extraInfo.customerRemark}}</p>
            <p>{{$t('order.remarks')}}：{{OrderDetail.extraInfo.merchantRemark}}</p>
          </div>
        </div>
        <div>
          <!-- 修改商家备注 -->
          <el-button size="mini"
                     type="primary"
                     @click="reviseList(1)">{{$t('order.remarks3')}}</el-button>
        </div>
        <!-- 商品信息↓ -->
        <div>
          <h1>{{$t('order.goods')}}</h1>
        </div>
        <div>
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column :label="$t('commodity.goods.itemCode')"
                             width="280">
              <template slot-scope="scope">
                <div class="scope-div">
                  <img style="width:50px;height:50px;"
                       :src="$fileUrl() + scope.row.specImage" />
                  <span style="margin-left: 10px">{{ scope.row.sku }}</span>
                </div>

              </template>
            </el-table-column>
            <el-table-column :label="$t('order.tradeName')">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.productName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('commodity.goods.class')">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.categoryName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('q')">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.commodityPrice')">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.discountPrice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="news_list">
          <div class="news_list_left">
            <el-row>
              <!-- <el-col :span="8">
                {{$t('order.cashPledge')}}：
                <span v-if="OrderDetail.extraInfo.depositFree">￥0.00</span>
                <span v-if="!OrderDetail.extraInfo.depositFree">￥{{OrderDetail.extraInfo.deposit || 0.00}}</span>
              </el-col> -->
              <el-col :span="8">
                {{$t('order.deductFrom')}}：￥{{OrderDetail.couponDeductionAmount || 0.00}}
              </el-col>
              <!-- <el-col :span="8">
                积分抵扣 ：￥{{OrderDetail.extraInfo.pointDeductionAmount || 0.00}}
              </el-col> -->
            </el-row>
            <div class="news_list_money">{{$t('order.sumMoney')}}：￥ {{OrderDetail.totalPay || 0.00}}</div>
            <div>
              <!-- 货款金额修改 待付款 -->
              <el-button size="mini"
                         type="primary"
                         v-if="OrderDetail.status == 1"
                         @click="reviseList(3)">{{$t('order.paymentGoods')}}</el-button>
            </div>
          </div>
          <div class="news_list_right">
            <div>{{$t('order.freight')}}：￥{{OrderDetail.extraInfo.freight || 0.00}}</div>
            <div class="news_list_money">{{$t('order.total')}}：￥{{OrderDetail.totalPay || 0.00}}</div>
          </div>
        </div>
        <!-- 商品信息↑ -->

        <!-- 订单信息↑ -->
      </el-tab-pane>
      <el-tab-pane :label="$t('order.information')"
                   name="2">
        <h4 class="order_top_title">{{$t('order.information')}}</h4>
        <div class="order_top">
          <div class="order_top_box">
            <p>{{$t('order.consignee')}}：{{OrderDetail.receiveName}}</p>
            <p>{{$t('sms.mobile')}}：{{OrderDetail.receivePhone}}</p>
            <p>{{$t('order.logistics1')}}：{{OrderDetail.extraInfo.logisticsCompany}}</p>
            <p>{{$t('order.address')}}：{{OrderDetail.extraInfo.logisticsNumber}}</p>
          </div>
          <div class="order_top_box">
            <p>{{$t('order.address1')}}：{{OrderDetail.receiveAddress}}</p>
            <p>{{$t('order.deliveryTime')}}：{{OrderDetail.extraInfo.deliveryTime}}</p>
            <p>{{$t('order.receivingTime')}}：{{OrderDetail.extraInfo.receivingTime}}</p>
          </div>
        </div>
        <div>
          <!-- 修改物流按钮 -->
          <!-- <el-button size="mini"
                     type="primary"
                     @click="clickLogistics(1)">{{$t('order.modify')}}</el-button> -->
          <!-- 发货按钮 待发货 -->
          <el-button size="mini"
                     type="primary"
                     v-if="OrderDetail.status == 6"
                     @click="clickLogistics(2)">{{$t('order.deliverGoods3')}}</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('order.invoiceInformation')"
                   name="3">
        <h4 class="order_top_title">{{$t('order.invoiceInformation')}}</h4>
        <div class="order_top">
          <div class="order_top_box">
            <p>{{$t('order.openTicket')}}：
              <span v-if="OrderDetail.extraInfo.invoice.writeInvoice">是</span>
              <span v-if="!OrderDetail.extraInfo.invoice.writeInvoice">否</span>
            </p>
            <div>
              <p>{{$t('order.invoiceTitle')}}：{{OrderDetail.extraInfo.invoice.invoiceType}}</p>
              <p>{{$t('order.invoiceRise')}}：{{OrderDetail.extraInfo.invoice.invoiceTitle}}</p>
              <p>{{$t('order.dutyParagraph')}}：{{OrderDetail.extraInfo.invoice.dutyParagraph}}</p>
            </div>
          </div>
          <div class="order_top_box">
            <p>{{$t('order.phoneNumber')}}:{{OrderDetail.extraInfo.invoice.phone}}</p>
            <p>{{$t('order.unitAddress')}}:{{OrderDetail.extraInfo.invoice.address}}</p>
            <p>{{$t('order.backDeposit')}}:{{OrderDetail.extraInfo.invoice.bankName}}</p>
            <p>{{$t('order.bankAccount')}}:{{OrderDetail.extraInfo.invoice.bankAccount}}</p>
          </div>
        </div>
        <div>
          <!-- 修改发票按钮 -->
          <!-- <el-button size="mini"
                     type="primary"
                     @click="invoiceFormVisible = true">{{$t('order.bill')}}</el-button> -->
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 备注/货款金额修改/弹框↓ -->
    <el-dialog :title="reviseListTitle"
               width="30%"
               :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item v-if="reviseListType == 1"
                      :label="$t('order.remarks')"
                      label-width="100px">
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="form.textarea">
          </el-input>
        </el-form-item>
        <el-form-item v-if="reviseListType == 3"
                      :label="$t('order.loanAmount')"
                      label-width="100px">
          <el-input size="mini"
                    type="number"
                    min="0"
                    placeholder="请输入内容"
                    v-model="form.number"
                    clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogTableVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="merchantRemarks()">{{$t('confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- /货款金额修改/弹框↑ -->

    <!-- 修改物流信息/发货弹框↓ -->
    <el-dialog width="30%"
               :title="logisticsTitle"
               :visible.sync="logisticsFormVisible">
      <el-form :model="logistics"
               size="mini">
        <el-form-item v-if="logisticsType == 1"
                      :label="$t('order.consignee')"
                      label-width="100px">
          <el-input v-model="logistics.name"></el-input>
        </el-form-item>
        <el-form-item v-if="logisticsType == 1"
                      :label="$t('sms.mobile')"
                      label-width="100px">
          <el-input type="number"
                    min="0"
                    maxlength="12"
                    v-model="logistics.phone"></el-input>
        </el-form-item>
        <!-- 快递公司 -->
        <el-form-item :label="$t('order.expressCompany')"
                      label-width="100px">
          <el-select v-model="logistics.express"
                     clearable
                     @change="selectCompany()"
                     placeholder="请选择">
            <el-option v-for="item in courierServices"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 送货师傅 -->
        <el-form-item v-if="logisticsType == 2"
                      :label="$t('order.deliverGoods4')"
                      label-width="100px">
          <el-select v-model="logistics.master"
                     clearable
                     @change="selectMaster()"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.contacts"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 送货师傅电话 -->
        <el-form-item v-if="logisticsType == 2"
                      :label="$t('order.phone')"
                      label-width="100px">
          <el-input type="number"
                    disabled
                    v-model="logistics.phone"></el-input>
        </el-form-item>
        <!-- 快递单号 -->
        <el-form-item :label="$t('order.courierNumber')"
                      label-width="100px">
          <el-input v-model="logistics.number"></el-input>
        </el-form-item>
        <el-form-item v-if="logisticsType == 1"
                      :label="$t('order.address1')"
                      label-width="100px">
          <el-input v-model="logistics.address"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="logisticsFormVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="logisticsSure()">{{$t('confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改物流信息/发货弹框↑ -->
    <!-- 修改发票信息弹框↓ -->
    <el-dialog width="30%"
               :title="$t('order.bill')"
               :visible.sync="invoiceFormVisible">
      <el-form :model="invoice"
               size="mini">
        <el-form-item :label="$t('order.openTicket')"
                      label-width="100px">
          <el-select v-model="invoice.billing"
                     :placeholder="$t('order.whetherNot')">
            <el-option :label="$t('running.suspended1')"
                       value="1"></el-option>
            <el-option :label="$t('running.suspended0')"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="invoice.billing == '1'">
          <el-form-item :label="$t('order.invoiceTitle')"
                        label-width="100px">
            <el-input v-model="invoice.type"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.invoiceRise')"
                        label-width="100px">
            <el-input v-model="invoice.invoiceTitle"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.dutyParagraph')"
                        label-width="100px">
            <el-input v-model="invoice.ird"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.phoneNumber')"
                        label-width="100px">
            <el-input v-model="invoice.phone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.unitAddress')"
                        label-width="100px">
            <el-input v-model="invoice.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.backDeposit')"
                        label-width="100px">
            <el-input v-model="invoice.bankName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.bankAccount')"
                        label-width="100px">
            <el-input v-model="invoice.bankAccount"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="invoiceFormVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="invoiceSure()">{{$t('confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改发票信息弹框↑ -->
  </d2-container>
</template>
<script>
import { OrderItem, ModificationPayment, ExpressCompany, ExpressCompanyMentor, DeliverGoods, Remarks, ExpressInformation } from '@/api/order/order'
export default {
  components: {},
  data () {
    return {
      activeName: '1',
      reviseType: 0,
      reviseListType: 0,
      logisticsType: 0,
      invoiceFormVisible: false,
      logisticsFormVisible: false,
      dialogTableVisible: false,
      logisticsTitle: '物流信息',
      reviseListTitle: '修改',
      dialogTitle: '修改时间',
      dialogLabel: '日期',
      formTitle: '时间段',
      form: {
        textarea: '',
        number: '', // 货款金额页面显示字段
      },
      paymentType: {
        '5': '微信',
        '6': '支付宝',
        '7': '银联',
      },
      status: {
        '1': '待付款',
        '4': '已取消',
        '5': '已退款',
        '6': '待发货',
        '7': '待收货',
        '8': '待评价',
        '10': '自提',
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
      logistics: {
        contacts: '',
        name: '',
        phone: '',
        express: '',
        number: '',
        address: '',
        master: '',
      },
      invoice: {
        billing: '',
        type: '',
        invoiceTitle: '',
        ird: '',
        phone: '',
        address: '',
        bankName: '',
        bankAccount: '',
      },
      tableData: [{
        date: '王小虎'
      }],
      options: [],
      OrderDetail: {
        id: null,
        channelId: null,
        channelTypeId: null,
        couponCode: null,
        couponDeductionAmount: null,
        couponType: null,
        createTime: null,
        customerRemark: null,
        deductionPoint: null,
        deleted: null,
        discount: null,
        extraInfo: {
          'invoice': {
            'address': '',
            'bankAccount': '',
            'bankName': '',
            'dutyParagraph': '',
            'invoiceDetail': '',
            'invoiceTitle': '',
            'invoiceType': '',
            'phone': '',
            'writeInvoice': '',
          },
          'depositFree': null,
          'customerRemark': null,
          'merchantRemark': null,
          'depositFree': null,
          'deposit': null,
          'couponDiscount': null,
          'pointDeductionAmount': null,
          'freight': null,
          'logisticsCompany': null,
          'logisticsNumber': null,
          'deliveryTime': null,
          'receivingTime': null,
        },
        freight: null,
        memberId: null,
        memberName: null,
        memberNo: null,
        memberPhone: null,
        openId: null,
        orderAmount: null,
        orderDeposit: null,
        orderDetailList: {},
        orderNum: null,
        orderType: null,
        outsideCustomerId: null,
        payment: null,
        paymentNo: null,
        pointDeductionAmount: null,
        receiveAddress: null,
        receiveName: null,
        receivePhone: null,
        refundAmount: null,
        returnFlag: null,
        source: null,
        status: null,
        statusType: '',
        totalPay: null,
        unionId: null,
        updateTime: null
      },
       expressObj: {},
      courierServices: [], // 快递公司参数
    }
  },
  computed: {},
  created () {
    this.orderDetailsInterface(this.$route.query.id);
    this.expressInformationInterface(this.$route.query.id)
    this.expressCompanyInterface();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    // 查询快递信息接口
    expressInformationInterface (id) {
      ExpressInformation({ id: id }).then(res => {
        console.log(res, '查询快递信息接口')
        if (res.code == 0) { }
      })
    },
    // 订单详情接口
    orderDetailsInterface (id) {
      OrderItem({ id: id }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          let orderCommodity = [];
          data.extraInfo = JSON.parse(data.extraInfo);
          data.totalPay = (data.totalPay / 100).toFixed(2);
          data.discount = (data.discount / 100).toFixed(2);
          data.couponDeductionAmount = (data.couponDeductionAmount / 100).toFixed(2)
          data.createTime = this.setTime(data.createTime, 1);
          if (data.status == 16) {
            data.statusType = '已退款'
          } else {
            data.statusType = this.status[data.status];
          }
          if (data.status == 12 && (data.returnFlag == 5 || data.returnFlag == 6)) {
            data.statusType = '已退款(部分退款)'
          }
          if (data.receiveAddress) {
            data.receiveAddress = data.receiveAddress.replace(/@#&/g, '-');
          }
          if (data.orderDetailList.length) {
            data.orderDetailList.map(item => {
              if (item.productType != 3) { // !=3为商品
                item.discountPrice = (item.discountPrice / 100).toFixed(2)
                orderCommodity.push(item)
              }
            })
          }
          this.OrderDetail = data;
          this.tableData = orderCommodity; // 商品列表
        }
      })
    },

    setTime (time, number) {
      let form;
      number == 1 ? form = "yyyy-MM-dd hh:mm:ss" : form = "yyyy-MM-dd"
      return time = this.$formatDate(new Date(time), form);
    },

    handleClick (tab, event) {
    },
    /**
     * 注释：↓
     * 1.e=1商家备注
     * 2.e=2押金修改
     * 3.e=3货款金额修改
     * 4.e=4退押金
     * 5.e=5续租改价
     */
    reviseList (e) {
      let that = this;
      that.reviseListType = e;
      that.dialogTableVisible = true;
      switch (e) {
        case 1:
          that.reviseListTitle = this.$t('order.remarks')
          this.form.textarea = this.OrderDetail.extraInfo.merchantRemark;
          break;
        case 3:
          that.reviseListTitle = this.$t('order.paymentGoods');
          that.form.number = this.OrderDetail.discount;
          break;
      }
    },
    merchantRemarks () {
      // 点击商弹框确认按钮
      let that = this;

      if (that.reviseListType == 1) {
        this.noteInterface();
      } else if (that.reviseListType == 3) {
        that.paymentAmountInterface();
      }
    },
    // 备注接口 
    noteInterface () {
      Remarks({
        id: this.$route.query.id,
        merchantRemark: this.form.textarea
      }).then(res => {
        if (res.code == 0) {
          this.dialogTableVisible = false;
          this.OrderDetail.extraInfo.merchantRemark = this.form.textarea;
          this.open2('成功', '修改成功', 'success');
        } else {
          this.open2('警告', res.message, 'warning');
        }
      })
    },

    // 货款金额修改接口
    paymentAmountInterface () {
      let discount = JSON.parse(JSON.stringify(this.form.number))
      ModificationPayment({
        orderId: this.$route.query.id,
        discountStr: discount,
      }).then(res => {
        if (res.code == 0) {
          this.dialogTableVisible = false;
          this.open2('成功', '修改成功', 'success');
          this.orderDetailsInterface(this.$route.query.id)
        } else {
          this.open2('警告', res.message, 'warning');
        }
      })
    },
    /**
     * 注释：↓
     * 1.e=1修改物流信息
     * 2.e=2发货
     */
    clickLogistics (e) {
      let that = this;
      that.logisticsType = e;
      that.logisticsFormVisible = true;
      switch (e) {
        case 1:
          that.logisticsTitle = this.$t('order.modify');
          break;
        case 2:
          that.logisticsTitle = this.$t('order.deliverGoods3');
          this.logistics.contacts = this.OrderDetail.extraInfo.delivererName; // 送货师傅
          this.logistics.master = this.OrderDetail.extraInfo.delivererId; // 送货人ID
          this.logistics.phone = this.OrderDetail.extraInfo.delivererPhone; // 送货电话
          this.logistics.number = this.OrderDetail.extraInfo.logisticsNumber; // 物流单号
          this.logistics.express = this.OrderDetail.extraInfo.logisticsCompany; // 物流公司
          break;
      }
    },
    logisticsSure () {
      // 点击发货/修改弹框里的确认按钮
      if (!this.logistics.number) {
        this.open2('警告', '请输入订单号', 'warning');
        return;
      }
      let deliveryOption = JSON.parse(JSON.stringify(this.logistics))
      this.deliveryInterface(deliveryOption);

    },
    invoiceSure () {
      // 点击修改发票信息弹框确认按钮
      // == 1的时候为开发票
      this.invoiceFormVisible = false;
      if (invoice.billing == '1') {

      } else { }
    },
    // 快递公司接口 
    expressCompanyInterface () {
      ExpressCompany().then(res => {
        if (res.code == 0) {
          if (res.data) {
            let data = res.data;
            this.courierServices = data;
          }
        }
      })
    },
    selectCompany () { // 点击选择物流公司
      this.logistics.master = ''; // 送货师傅id
      this.logistics.contacts = ''; // 送货师傅名称;
      this.logistics.phone = ''; // 送货师傅电话;
      ExpressCompanyMentor({
        name: this.logistics.express
      }).then(res => {
        if (res.code == 0) {
          this.options = res.data.list;
        }
      })
    },
    selectMaster () {
      // 选择送货师傅
      this.options.map(res => {
        if (res.id == this.logistics.master) {
          this.logistics.contacts = res.contacts;
          this.logistics.phone = res.phone;
        }
      })
    },
    // 送货接口
    deliveryInterface (option) {
      DeliverGoods({
        id: this.$route.query.id,
        logisticsCompany: option.express,
        delivererId: option.master,
        delivererName: option.contacts,
        delivererPhone: option.phone,
        logisticsNumber: option.number,
      }).then(res => {
        if (res.code == 0) {
          this.logisticsFormVisible = false;
          this.open2('成功', '发货成功', 'success');
          this.orderDetailsInterface(this.$route.query.id)
        } else {
          this.open2('警告', res.message, 'warning');
        }
      })
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
.order_top {
  display: flex;
  margin-top: 20px;
  .order_top_box {
    width: 33%;
    .order_top_title {
      margin-bottom: 20px;
    }
    .order_top_color {
      color: #f56c6c;
    }
  }
}
.form_time {
  width: 170px;
}
.time_right {
  margin-right: 10px;
}
.news_list {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 20px;
  .news_list_left {
    width: 50%;
  }
  .news_list_money {
    margin: 20px 0;
  }
}
.scope-div {
  display: flex;
  align-items: center;
}
</style>

