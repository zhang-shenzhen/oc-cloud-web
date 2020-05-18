<template>
  <div class="memInfoCardView">
    <div class="memInfo-r-bottom">
      <div class="jf">
        <div>
          <p style>卡券数量</p>
          <p>16</p>
        </div>
        <div>
          <p>已使用</p>
          <p>2</p>
        </div>
        <div>
          <p>未使用</p>
          <p>8</p>
        </div>
      </div>
      <div>
        <el-table :data="tableData" size="mini" style="width: 100%">
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="卡券ID"
            prop="couponId"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="卡券券号"
            prop="code"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="卡券状态"
            prop="status"
          />
          <el-table-column
            style="background:rgba(0,0,0,00.1)"
            label="领取时间"
            prop="getTime"
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
import {CardVolumeRecord} from '@/api/member/member'
import { formatDate } from '@/utils/index'
export default {
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
    openid:{
      type:String,
    },
    memberBrandId:{
      type:Number,
    }

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
  created() {
    // let id=319917

    this.getCardData(this.currentPage,10,this.openid,this.memberBrandId)

  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCurrentChange(e) {
     this.getCardData(e,10,this.openid,this.memberBrandId)
    },
    //获取卡卷记录列表
    getCardData(page,size,openid,memberBrandId){
      CardVolumeRecord({page,size,openid,memberBrandId}).then(res=>{
        console.log(res.data,"resdata")
        if(res.data.length==0)return
        res.data.couponCodeList.map(item=>{
          if(item.status==3){
            item.status="未使用"
          }else if(item.status==4){
             item.status="已使用"
          }else{
            item.status="已过期"
          }
          item.getTime=formatDate(new Date(item.getTime), 'yyyy-MM-dd')
        })
        this.tableData=res.data.couponCodeList
        this.total=res.data.count

      })
    },
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      console.log('_upSV', type)
      this._showType = false
      this.$emit('_upSV', { type: type, SVData: this.form })
    },
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
