<template>
  <d2-container class="page">
  <div class="add-brand">
    <div class="title">添加品牌</div>
    
    <div class="search-box">
      <el-form style="margin-top: 30px;">            
        <el-form-item class="search-box-item" label="品牌名称">
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="品牌名称"
          />
        </el-form-item>
        <el-form-item class="search-box-item" label="所属公司">
          <el-select
            v-model="form.f"
            size="mini"
            placeholder="上海分公司"
          >
           <el-option
             label="上海分公司"
             value="30"
           />
           <el-option
             label="集团总公司"
             value="365"
           />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    
    <el-button size="mini"
      class="search-box-left-btn" type='primary' @click="tv=true">新增渠道</el-button>
    <div class="brand-box">      
      <div >
        <el-table
            :data="tableData"
            size="mini"            
          >
            <el-table-column
              prop="id"
              label="渠道ID"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="渠道名称"
              prop="name"
              width="140"
            />
            <el-table-column
              label="渠道类型"
              prop="t"
              width="120"
            />            
            <el-table-column
              label="操作"              
              width="150"
            >
              <template>
                <div>
                <el-button size="mini"
      class="search-box-left-btn" type='text'>编辑</el-button>
                <el-button size="mini"
      class="search-box-left-btn" type='text'>删除</el-button>     
                </div>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
    <div class="pagination" style="margin-top:20px;">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <el-button size="mini"
      class="search-box-left-btn" @click="$router.go(-1)">返回</el-button>
      <el-button size="mini"
      class="search-box-left-btn" type='primary' @click="$router.go(-1)">保存</el-button>
    </div>
  </div>
  <div v-if='tv'>
    <el-dialog title="新增渠道" :visible.sync="tv">
      <el-form :model="form">
        <el-form-item class="search-box-item" label="渠道名称" style="display:flex;">
           <el-input
            v-model="form.n"
            size="mini"
            placeholder="请输入渠道名称"
          />          
        </el-form-item>
        <el-form-item class="search-box-item" label="渠道类型">
          <el-select
            v-model="form.t"
            size="mini"
            placeholder="渠道类型"
          >
           <el-option
             label="公众号"
             value="30"
           />
           <el-option
             label="小程序"
             value="365"
           />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="tv=!tv">确 定</el-button>
        <el-button
          size="mini"
          @click="()=>{
            tv=!tv
          }"
        >取 消</el-button>
      </div>
    </el-dialog>
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
  data() {
    return {
      cards:[{
        t:true,//type
        n:'会员卡',// name
        f:'怀仁大药房',//来源 from
      },{
        t:true,//type
        n:'会员卡',// name
        f:'怀仁母婴',//来源 from
      },],
      form: {
        name: null,
        f:null,
        n:null,
        t:null,
      },
      tableData:[{
        id:'100912',
        name:'怀仁母婴公众号',
        t:'公众号',
        sum:'3',
        msum:'160',        
      },{
        id:'100913',
        name:'怀仁大药房小程序',
        t:'小程序',
        sum:'3',
        msum:'210',        
      },],
      currentPage:1,
      total:3,      
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tv:false,      
    }
  },
  computed: {

  },
  created() {
    this.getSelectLog(1)
    this._initTab()
  },
  mounted() {
    console.log('table_mob', this.$refs)
  },
  beforeDestroy() {
  },
  methods: {
    _initTab() {
      this.tableConfig = logManagement
    },
    // 导出订单
    excleOrders() {
      window.open(configUrl.ajax_url + 'upm/order/excle/make')
    },
    /**
     *  LOG列表
     */
    getSelectLog(page) {
      const params = {
        size: 10,
        page: page
      }
      
    },

    // 分页获取数据
    handleCurrentChange(e) {
      this.getSelectLog(e)
    },
    handleCurrentChange(){

    },
    handleNodeClick(data) {
        console.log(data);
    }
  }
}
</script>

<style lang="scss" scope>
.add-brand{
  .title{
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 18px;
    text-align: left;
  }
  .list-title {
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 0, 0, 0.447058823529412);
    line-height: 22px;
  }
  .brand-box{
    display: flex;
    margin-top: 40px;
  }
  
}

</style>
<style lang="scss" >
.add-brand{
  .list-title {
    width: 100%;
    color: #666666;
    height: 35px;
    line-height: 35px;
  }
  .search-box {
    display: flex;
    margin-bottom: 20px;
    .search-box-item {
      display: flex;
      // margin-left: 20px;
    }
  }
}
</style>
