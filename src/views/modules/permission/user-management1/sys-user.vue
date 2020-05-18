<template>
  <d2-container class="page">
    <div class="driverList">
      <div class="search-box">
        <el-form>
          <el-form-item class="search-box-item" label style="display:flex;">
            <div style="display:flex;    line-height: 0;margin-top: 5px;">
              <el-input v-model="form.keyWord" size="mini" placeholder="用户名" />
              <el-button
                style="margin-left:20px;"
                size="mini"
                type="primary"
                @click="getDriverList(1)"
              >搜索</el-button>
              <el-button size="mini" type="primary" @click="dialogDriverInfoVisible = true">新建</el-button>
              <el-button size="mini" type="primary" @click="1">删除</el-button>
              <el-button size="mini" type="primary" @click="1">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- tabMob -->
      <table-mob
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        :tabs-slots="f_tabsSlots"
        @_selectionChange="getTabSelList"
      >
        <template v-slot:starLevel="starLevel">
          <el-rate v-model="value" disabled show-score text-color="#ff9900" />
        </template>

        <template v-slot:operating="operating">
          <el-button type="text" size="mini" @click="lookThis(operating.operating)">编辑</el-button>
          <el-button type="text" size="mini" @click="lookThis(operating.operating)">删除</el-button>
        </template>
      </table-mob>
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 司机详情 -->
    <div v-if="dialogDriverInfoVisible" class="sys-user-info">
      <el-dialog title="用户" :visible.sync="dialogDriverInfoVisible">
        <sys-user-info
          :driver-info-data="driverInfoData"
          @_data="(_data)=>{
            if(_data.t){
            }
            dialogDriverInfoVisible = false
          }"
        />
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import driverListConfig from '@/tableConfigs/permission/userManagement/driverList'
import { driverList } from '@/api/UPM-api/EmployingManagement'
import sysUserInfo from './sys-user-info'
export default {
  components: {
    'sys-user-info': sysUserInfo
  },
  data() {
    return {
      form: {
        keyWord: null
      },
      value: 3.7,
      total: 0,
      page: 1,
      currentPage: 1,
      tableData: [],
      tableConfig: {},
      tabSelList: [],
      tabSelIdList: [],
      searchName: '',
      dialogTableVisible: false,
      f_tabsSlots: { operating: 'operating', starLevel: 'starLevel' }, // 插槽
      dialogDriverInfoVisible: false,
      driverInfoData: null
    }
  },
  computed: {},
  created() {
    // this.getDriverList(1)
    this._initTab()
  },
  mounted() {
    console.log('table_mob', this.$refs)
  },
  beforeDestroy() {},
  methods: {
    _initTab() {
      this.tableConfig = driverListConfig
    },
    /**
     *  司机列表
     */
    getDriverList(page) {
      const params = {
        size: 10,
        page: page
      }
      Object.assign(params, this.form)
      driverList(params).then(res => {
        console.log('标签1', res)
        this.currentPage = page
        this.tableData = res.data
        this.total = res.total
      })
    },
    getTabSelList(v) {
      console.log('getTabSelList', v)
      this.tabSelList = v
      const tabSelIdList = []
      v.map(d => {
        tabSelIdList.push(d.id)
      })
      this.tabSelIdList = tabSelIdList
    },
    // 查看
    lookThis(v) {
      console.log('lookThis', v)
      this.driverInfoData = v
      this.dialogDriverInfoVisible = true
    },
    // 分页获取数据
    handleCurrentChange(e) {
      this.getDriverList(e)
    }
  }
}
</script>

<style lang="scss" scope>
.userTotal {
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
}
.search-box {
  display: flex;
  margin-bottom: 20px;
  .search-box-left {
    display: flex;
    margin-right: 150px;

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

.v-name {
  color: #409eff;
  cursor: pointer;
}
</style>
<style lang="scss" >
.driverList {
  .el-form-item__label {
    min-width: 100px;
    text-align: left;
  }
  .el-table th {
    color: #000 !important;
    // background: #f7f6f2 !important;
    text-align: center !important;
  }
  .el-table td {
    text-align: center !important;
  }
}
</style>
