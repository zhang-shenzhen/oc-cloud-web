<template>
  <d2-container class="page">
  <div class="brandy-sys">
    <div class="title">品牌列表</div>
    
    <div class="search-box">
      <el-form style="display:flex;    margin-top: 30px;">            
        <el-form-item class="search-box-item">
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="品牌名称"
          />
        </el-form-item>
        <el-form-item class="search-box-item">
          <el-button
            type="primary"
            size="mini"
            class="search-box-left-btn"
            @click="getSelectLog(1)"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button      
      size="mini"
      class="search-box-left-btn"
      @click="$router.push('brandSys-addBrand')"
    >添加品牌</el-button>
    <div class="brand-box">
      <div style="flex:2">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div style="flex:8">
        <el-table
            :data="tableData"
            size="mini"
            
          >
            <el-table-column
              prop="id"
              label="品牌ID"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="品牌名"
              prop="name"
              width="140"
            />
            <el-table-column
              label="渠道数量"
              prop="sum"
              width="120"
            />
            <el-table-column
              label="门店数量"
              prop="msum"
              width="100"
            >              
            </el-table-column>
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
                <el-button size="mini"
      class="search-box-left-btn" type='text'>渠道管理</el-button>
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
        name: null
      },
      tableData:[{
        id:'100912',
        name:'怀仁母婴',
        sum:'3',
        msum:'160',        
      },{
        id:'100913',
        name:'怀仁大药房',
        sum:'3',
        msum:'210',        
      },{
        id:'100914',
        name:'怀仁母婴',
        sum:'3',
        msum:'160',        
      },],
      currentPage:1,
      total:3,
      data: [{
          label: '集团总公司',
          children: [{
            label: '上海分公司',
            children: []
          }]
        }, {
          label: '华北区',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }      
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
.brandy-sys{
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
.brandy-sys{
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
      // margin-left: 20px;
    }
  }
}
</style>
