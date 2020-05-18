<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('logistics.title') }}</h3>

    <el-row
      :gutter="24"
      style="margin-bottom:20px;"
    >
      <el-col :span="4">
        <div class="grid-content1">
          <el-button
            style="float: left;"
            size="mini"
            type="primary"
            @click="addCompany"
          >{{ $t('logistics.addcompany') }}</el-button>
        </div>
      </el-col>

      <el-col :span="11">
        <div class="grid-content" />
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="keyword"
          class="input-with-select"
          :placeholder="$t('logistics.companyname')"
          clearable
          size="mini"
          @clear="clearSearch"
        >
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            @click="search"
          />
        </el-input>
      </el-col>
      <el-col :span="4">
        <div class="grid-content1">
          <el-button
            style="float: left;"
            size="mini"
            type="primary"
            @click="logisticeExcel"
          >{{ $t('export') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="selectLogisticelist"
      style="width: 100%"
    >
      <el-table-column
        :label="$t('logistics.lab1')"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('logistics.lab2')">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>

      <el-table-column :label="$t('logistics.lab4')">
        <template slot-scope="scope">{{ scope.row.contacts }}</template>
      </el-table-column>

      <el-table-column :label="$t('logistics.lab3')">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column :label="$t('logistics.lab5')">
        <template slot-scope="scope">{{ scope.row.settleStyle }}</template>
      </el-table-column>

      <el-table-column :label="$t('logistics.lab6')">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >{{ $t('edit') }}</el-button>
          <el-button
            size="mini"
            type="text"
            style="color:#f56c6c"
            @click="handleDelete(scope.row)"
          >{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </d2-container>
</template>
<script>
import configUrl from '@/api/configUrl'
import { selectLogistice, deleteLogistice } from '@/api/logistics/logistics'
export default {
  name: 'Company',
  components: {},
  data() {
    return {
      selectLogisticelist: [],
      keyword: null,
      total: 0,
      currentPage: 1
    }
  },
  computed: {},
  created() {
    const url = '?page=' + 1 + '&size=10'
    this.getselectLogistice(url)
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    addCompany() {
      this.$router.push({
        name: 'mall-management/logistics-company-add',
        query: {
          msg: {},
          type: 'add'
        }
      })
    },
    clearSearch() { },
    search() {
      const url = '?page=' + 1 + '&size=10&name=' + this.keyword
      this.getselectLogistice(url)
    },
    handleCurrentChange(e) {
      const url = '?page=' + e + '&size=10'
      this.getselectLogistice(url)
    },
    // 获取物流公司列表
    getselectLogistice(url) {
      selectLogistice(url).then(res => {
        if (res.code === 0) {
          this.selectLogisticelist = res.data.list
          this.total = res.data.count
        }
      })
    },
    handleDelete(item) {
      this.$confirm(this.$t('logistics.sure'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          deleteLogistice(item.id).then(res => {
            if (res.code == 0) {
              this.$notify({
                message: this.$t('logistics.delete'),
                type: 'success'
              })
              const url = '?page=' + 1 + '&size=10'
              this.getselectLogistice(url)
            }
          })
        })
        .catch(() => { })
    },
    handleEdit(item) {
      this.$router.push({
        name: 'mall-management/logistics-company-add',
        query: {
          msg: item,
          type: 'edit'
        }
      })
    },
    // 导出物流公司
    logisticeExcel() {
      window.open(configUrl.ajax_url + 'gasfun//excel/logisticeExcel')
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  width: 100%;
  height: 35px;
}
</style>

