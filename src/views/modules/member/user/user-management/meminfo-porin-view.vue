<template>
  <div class="memInfoPorinView">
    <div class="memInfo-r-bottom">
      <div class="jf">
        <div>
          <p style>总积分</p>
          <p>600.00</p>
        </div>
        <div>
          <p>已过期积分</p>
          <p>600.00</p>
        </div>
        <div>
          <p>本月待过期积分</p>
          <p>100.00</p>
        </div>
      </div>
      <div>
        <el-table :data="tableData" size="mini" style="width: 100%">
          <el-table-column label="积分类型" prop="type" />
          <el-table-column label="积分来源" prop="typeDesc" />
          <el-table-column label="变化日期" prop="createTime" />
          <el-table-column label="变化积分" prop="point" />
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
//会员积分记录
import { GetMemberIntegralRecord } from '@/api/member/member'
export default {
  props: {
    showType: {
      type: Boolean,
      default: false,
    },
    memberBrandId:{
      type:Number,
    }
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getData(this.currentPage,this.memberBrandId,10)

  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCurrentChange(e) {
      this.getData(e,this.memberBrandId,10)
    },
    /**
     * @description 会员列表数据
     */
    _upSV(type) {
      console.log('_upSV', type)
      this._showType = false
      this.$emit('_upSV', { type: type, SVData: this.form })
    },
    //获取积分记录列表
   getData(page,memberBrandId,size){
    GetMemberIntegralRecord({page,memberBrandId,size}).then(res=>{
       console.log(res,"res")
      if(res.data.data.length==0)return
      this.total=res.data.total
      res.data.data.map(item=>{
        switch(item.type){
          case 1:item.type="购物送积分",item.point=`+${item.point}`;break;
          case 2:item.type="新会员注册送积分",item.point=`+${item.point}`;break;
          case 3:item.type="邀请好友送积分",item.point=`+${item.point}`;break;
          case 4:item.type="绑定送积分",item.point=`+${item.point}`;break;
          case 5:item.type="退款扣积分",item.point=`-${item.point}`;break;
          case 6:item.type="积分",item.point=`+${item.point}`;break;
          case 7:item.type="使用积分",item.point=`-${item.point}`;break;
          case 8:item.type="签到送积分",item.point=`+${item.point}`;break;
          case 9:item.type="返还积分",item.point=`+${item.point}`;break;
          case 10:item.type="积分到期扣减",item.point=`-${item.point}`;break;
          case 11:item.type="领取会员卡送积分",item.point=`+${item.point}`;break;
          case 12:item.type="其他",item.point=`+${item.point}`;break;
          case 13:item.type="抽奖加积分",item.point=`+${item.point}`;break;
        }
        item.createTime=formatDate(new Date(item.createTime), 'yyyy-MM-dd')
      })
      this.tableData=res.data.data

     
     
      
    })
      
    }
  },
}
</script>

<style lang="scss" scope>
.jf {
  display: flex;
  justify-content: space-around;
  font-family: 'PingFangTC-Semibold', 'PingFang TC Semibold', 'PingFang TC';
  font-weight: 650;
  font-style: normal;
  font-size: 16px;
}
</style>
