<template>
  <d2-container class="page">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="input" :placeholder="$t('member.filter.searchFilter')" size="mini" clearable>
          <el-button slot="append" type="primary" size="mini" @click="search()">{{ $t('member.filter.search') }}
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-button type="primary" size="mini" @click="ToAdd(-99,1)">{{ $t('member.filter.newBuilt') }}</el-button>

        <el-button type="danger" size="mini" @click="delFilter(-99,1)">{{ $t('member.filter.delete') }}</el-button>
      </el-col>
    </el-row>
    <!-- 表单 -->
    <el-row :gutter="20">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" size="mini"
        :row-key="(row) => { return row.id }" @selection-change="handleSelectionChange">
        <!-- checkbox -->
        <el-table-column :reserve-selection="true" type="selection" width="100" />
        <!-- name -->
        <el-table-column fixed :label="$t('member.filter.name')">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top-start">
              <el-button type="text" @click="btnTitle(scope.row)">{{ scope.row.name }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>

        <!-- 是否动态打标签  -->
        <el-table-column label="会员建组类型">
          <template slot-scope="scope">{{ trendsTab[scope.row.automatic]}}</template>
        </el-table-column>
        <el-table-column label="会员人数">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.memberCount}}</span>
            <el-button type="text" :disabled="isdisabled" v-if="scope.row.automatic==2" :icon="scope.row.icon"
              @click="Refresh(scope.$index,scope.row)">刷 新</el-button>
          </template>
        </el-table-column>
        <!-- last time  -->
        <el-table-column prop="createTime" :label="$t('member.filter.endTime')" />
        <!-- time  -->
        <el-table-column prop="updateTime" :label="$t('member.filter.startTime')" />
        <!-- 操作 -->
        <el-table-column fixed="right" :label="$t('member.filter.operation')">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button type="text" size="mini" @click="ToAdd(scope.row.id,2)">{{ $t('member.filter.edit') }}</el-button>
            <!-- 删除  -->
            <el-button type="text" style="color:red" size="mini" prop="id" @click="delFilter(scope.row.id,2)">
              {{ $t('member.filter.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 页数 -->
    <el-row :gutter="20">
      <el-pagination background style="float:right;" :current-page="currentPage" :page-size="pagesize"
        layout="total, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-row>
  </d2-container>
</template>
<script>
import {
  FilterList,
  FilterBatchDelete,
  FilterDel,
  NumberData
} from '@/api/member/filter'
export default {
  data () {
    return {
      trendsTab: {
        '2': '动态建组',
        '3': '静态建组',
      },
      isdisabled: false,
      indexData: 0,
      input: '',
      sizerText: '',
      id: '', // 点击删除的时候带的id
      number: '', // 点击删除弹框的时候1: 多个删除 2：单个删除
      total: 0, // 默认数据总页数
      currentPage: 1, // 当前页码数
      pagesize: 10, // 每页的数据条数
      dialogVisible: false, // 弹框
      filterId: [], // 放置选中的数据id
      tableData: []
    }
  },
  created () {
    // 生命周期 组件实例创建完成，属性已绑定，但DOM为生成
    this.sizerText = this.input;
    this.filterInterface(1)
  },
  updated () {
    // 更新完成后
  },
  methods: {
    filterInterface (page) {
      this.tableData = []
      FilterList({
        page: page,
        pageSize: 10,
        keyword: this.sizerText
      }).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.forEach(item => {
              item.icon = 'el-icon-refresh';
              item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd");
              item.updateTime = this.$formatDate(new Date(item.updateTime), "yyyy-MM-dd");
              if (typeof item.memberCount == 'object') {
                item.memberCount = '统计中'
              }
            })
            this.tableData = res.data.data
            console.log(this.tableData)
          }
          this.currentPage = res.data.page;
          this.total = res.data.total
        }
      })
    },
    Refresh (index, item) {
      // 点击刷新按钮
      this.indexData = index;
      this.$set(this.tableData[index], "icon", 'el-icon-loading');
      this.isdisabled = true;
      let id = item.id
      NumberData({}, id).then(res => {
        this.isdisabled = false;
        this.$set(this.tableData[index], "icon", 'el-icon-refresh');
        if (res.code == 0) {
          this.$set(this.tableData[index], "memberCount", res.data);
          this.$notifyFrame('刷新成功', true);
        } else {
          this.$notifyFrame(res.message, false);
        }
      }).catch(() => { this.isdisabled = false; })
    },

    search () {
      // 点击搜索按钮
      this.sizerText = JSON.parse(JSON.stringify(this.input))
      this.filterInterface(1)
    },
    btnTitle (item) {
      // 点击名称跳转到详情
      console.log(item, '点击名称跳转到详情')
      sessionStorage.setItem('filterObj', JSON.stringify(item))
      this.$router.push({
        name: "member-filter-folder-filter-member",
        query: { id: item.id, automatic: item.automatic }
      });
    },

    ToAdd (id, title) {
      // 点击新建/编辑 路由传参
      let dataoption = {
        type: title // 1为新增 2为编辑
      };
      sessionStorage.setItem('filterOptions', JSON.stringify(dataoption))
      this.$router.push({
        name: 'member-filter-folder-filteradd', // 路径
        query: { id: id, title: title } // 参数
      })
    },
    handleSelectionChange (val) {
      // 点击全选/单选 val 获取的是这条对象的数据
      this.filterId = []
      if (val) {
        val.forEach(item => {
          this.filterId.push(item.id)
        })
      }

    },
    handleSizeChange (val) {
      // 点击某一页
      this.currentPage = val;
      this.filterInterface(val)
    },
    handleCurrentChange (val) {
      // 点击跳转到第几页
      this.currentPage = val;
      this.filterInterface(val)
    },
    delFilter (id, num) {
      // 点击显示弹框 num=1批量=2单个
      this.id = id
      this.number = num
      if (num == 1 && id == -99 && this.filterId.length === 0) {
        // 不满足删除条件时
        this.$notifyFrame(this.$t('member.filter.message'), false);
        return
      }
      let ids;
      let uri;
      if (num == 1) { // 批量删除
        ids = this.filterId.join(',')
        uri = FilterBatchDelete;
      } else if (num == 2) { // 单个删除
        ids = id;
        uri = FilterDel;
      }
      console.log(ids, uri, '删除按钮', this.filterId)
      this.$confirm("是否删除此会员组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          uri({}, ids).then(res => {
            if (res.code === 0) {
              this.$refs.multipleTable.clearSelection();
              this.$notifyFrame(this.$t('prompt.success'), true);
              this.filterInterface(1)
            }
          })
        })
        .catch(() => { });
    },
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
</style>

