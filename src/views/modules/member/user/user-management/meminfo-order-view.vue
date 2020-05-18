<template>
  <div class="memInfoCardView">
    <div class="memInfo-r-bottom">
      <div class="jf">
        <div>
          <p style>订单总数量</p>
          <p>20</p>
        </div>
        <div>
          <p>订单总金额</p>
          <p>20000</p>
        </div>
        <div>
          <p>平均订单金额</p>
          <p>1000</p>
        </div>
        <div>
          <p>距离上一次购买</p>
          <p>10天（2020.1.15）</p>
        </div>
      </div>
      <div>
        <el-table :data="tableData" size="mini" style="width: 100%">
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="商品信息"
            prop="product"
            width="300"
          >
            <template slot-scope="scope">
              <div style="display:flex;" @click="setScope(scope.row)" v-for="(item,index) in scope.row.orderDetailList" :key="index">
                <img
                  style="display:block;width:120px; margin-right:20px;"
                  :src="$fileUrl()+item.productImage"
                  alt=""
                />
                
                <div style="text-align:left;line-height:30px;">
                  <div>{{item.productName }}</div>
                  <div>数量:{{ item.productNum }}</div>
                  <!-- <div>尺码:{{ item.size }}</div> -->
                  <div>金额:{{ item.productPrice|money }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="订单金额"
            prop="orderAmount"
            width="120"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="实付款"
            prop="totalPay"
            width="100"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="收货人"
            prop="receiveName"
            width="140"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="配送方式"
            prop="orderType"
            width="120"
          />
          <!-- <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="订单类型"
            prop="orderType"
            width="120"
          /> -->
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="订单状态"
            prop="status"
            width="120"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="订单编号"
            prop="orderNum"
            width="120"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="下单时间"
            prop="createTime"
            width="120"
          />
        </el-table>
        <div class="pagination" style="margin-top:20px;">
          <el-pagination
            background
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { formatDate } from '@/utils/index'
import {OrderRecord} from  "@/api/member/member"
export default {
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
    memberBrandId:{
      type:Number
    },
    channelId:{
      type:Number
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total:0,
    }
  },
  computed: {},
  watch: {},
  filters:{
    money(item){
      return item/100

    }

  },
  created() {
   
    // console.log("this.memberBrandId",this.memberBrandId)
    // let  channelId=20;
    // let  memberBrandId=50042418;
    this.getOrderList(this.currentPage,this.channelId,this.memberBrandId,10)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setScope(scpoe) {
      console.log('setScope', scpoe)
    },
    handleCurrentChange(e) {
    //    let  channelId=20;
    // let  memberBrandId=50042418;
      this.getOrderList(e,this.channelId,this.memberBrandId,10)
    },
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      console.log('_upSV', type)
      this._showType = false
      this.$emit('_upSV', { type: type, SVData: this.form })
    },
    //获取订单记录列表
    getOrderList(page,channelId,memberBrandId,pageSize){
      OrderRecord({page,channelId,memberBrandId,pageSize}).then(res=>{
        console.log(res,res)
        if(res.data.data==null){
          return
        }else{
         this.total=res.data.total
         res.data.data.map(res=>{
           switch(res.orderType){
             case 1 :res.orderType="H5";break;
             case 2 :res.orderType="H5线下提货";break;
             case 3 :res.orderType="小程序";break;
             case 4 :res.orderType="小程序线下提货";break;
             case 5 :res.orderType="web";break;
             case 6 :res.orderType="web线下提货";break;
             case 7 :res.orderType="app";break;
             case 8 :res.orderType="app线下提货";break;
             case 9 :res.orderType="H5线下扣线上库存";break;
             case 10 :res.orderType="小程序线下扣线上库存";break;
             case 11 :res.orderType="WEB线下扣线上库存";break;
             case 12 :res.orderType="APP线下扣线上库存";break;
           }
           switch(res.status){
             case 1 :res.status="待付款";break;
             case 2 :res.status="已支付";break;
             case 3 :res.status="支付失败";break;
             case 4 :res.status="已取消";break;
             case 5 :res.status="已退款";break;
             case 6 :res.status="待发货";break;
             case 7 :res.status="待收货";break;
             case 8 :res.status="待评价（已收货）";break;
              case 9 :res.status="申请退款中";break;
             case 10 :res.status="待退款";break;
             case 11 :res.status="驳回退款";break;
             case 12 :res.status="已完成";break;
             case 13 :res.status="申请退款中(退货)";break;
             case 14 :res.status="待退款(退货)";break;
             case 15:res.status="驳回退款(退货)";break;
             case 16 :res.status="已退款(退货)";break;

           }
           res.createTime=formatDate(new Date(res.createTime), 'yyyy-MM-dd')
           res.orderAmount=res.orderAmount!=null?(res.orderAmount)/100:res.orderAmount
           res.totalPay=res.totalPay!=null?(res.totalPay)/100:res.totalPay
         })
         this.tableData=res.data.data

        }

      })
    }
  }, 
}
</script>

<style lang="scss" scope>
.jf {
  text-align: center;
  display: flex;
  justify-content: space-around;
  font-family: 'PingFangTC-Semibold', 'PingFang TC Semibold', 'PingFang TC';
  font-weight: 650;
  font-style: normal;
  font-size: 16px;
}
</style>
