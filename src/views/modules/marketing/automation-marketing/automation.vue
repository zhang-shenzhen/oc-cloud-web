<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('automation.title') }}</h3>

    <el-row
      :gutter="24"
      style="margin-bottom:20px;"
    >
      <el-col
        :span="6"
        style="padding-top:8px"
      >
        <el-input
          v-model="keyword"
          class="input-with-select"
          :placeholder="$t('automation.search')"
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
      <!-- <el-form>
        <el-form-item :label="$t('automation.fz')">
          <el-col :span="20">
            <el-col :span="6">
              <el-select
                v-model="fz1"
                size="mini"
                clearable
                :placeholder="$t('automation.qb')"
              >
                <el-option
                  v-for="item in findfzlist"
                  :key="item.com"
                  :label="item.com"
                  :value="item.com"
                />
              </el-select>
            </el-col>
            <el-col
              :span="6"
              style="padding-top:8px"
            >
              <el-input
                v-model="keyword"
                class="input-with-select"
                :placeholder="$t('automation.search')"
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
          </el-col>
        </el-form-item>
      </el-form> -->
    </el-row>
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
            @click="add"
          >{{ $t('automation.add') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="automlist"
      style="width: 100%"
    >
      <el-table-column
        :label="$t('automation.lab1')"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('automation.lab2')">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>

      <el-table-column :label="$t('automation.lab3')">
        <template slot-scope="scope">{{ $formatDate(new Date(scope.row.createTime), 'yyyy-MM-dd') }}</template>
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

    <el-dialog
      :title="$t('automation.zdysj')"
      :visible.sync="isshow"
      width="50%"
    >
      <div style="overflow:hidden;">
        <div class="height">
          <el-form>
            <el-form-item
              :label="$t('automation.sjmc')"
              prop="title6"
            >
              <el-col :span="12">
                <el-input
                  v-model="zdyname"
                  type="text"
                  clearable
                />
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="fzdelete"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="fzadd"
        >{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>

  </d2-container>
</template>
<script>
// import configUrl from '@/api/configUrl'
import { intelligentlist, addintelligentlist, delintelligentlist, editintelligentlist } from '@/api/automation/automation'
export default {
  name: 'Company',
  components: {},
  data() {
    return {
      automlist: [],
      keyword: null,
      total: 0,
      currentPage: 1,
      findfzlist: [
        {
          com: 1
        }
      ],
      fz1: '',
      isshow: false,
      zdyname: '',
      id: ''
    }
  },
  computed: {},
  created() {
    const url = '?page=' + 1 + '&size=10'
    this.getautomlist(url)
  },
  mounted() { },
  beforeDestroy() { },
  methods: {
    add() {
      this.isshow = true
    },
    clearSearch() { },
    search() {
      const url = '?page=' + 1 + '&size=10&name=' + this.keyword
      this.getautomlist(url)
    },
    handleCurrentChange(e) {
      const url = '?page=' + e + '&size=10'
      this.getautomlist(url)
    },
    getautomlist(url) {
      intelligentlist(url).then(res => {
        if (res.code == 0) {
          this.automlist = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleDelete(item) {
      this.$confirm(this.$t('automation.qrsc'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          delintelligentlist('/' + item.id).then(res => {
            if (res.code == 0) {
              this.$notify({
                message: this.$t('automation.czcg'),
                type: 'success'
              })
              const url = '?page=' + 1 + '&size=10'
              this.getautomlist(url)
            }
          })
        })
        .catch(() => { })
    },
    handleEdit(item) {
      this.isshow = true
      this.zdyname = item.name
      this.id = item.id
    },
    fzdelete() {
      this.isshow = false
      this.zdyname = ''
    },
    fzadd() {
      if (!this.zdyname) {
        this.$message.error(this.$t('automation.qtx'))
      } else {
        if (this.id) {
          const data = {
            id: this.id,
            name: this.zdyname
          }
          editintelligentlist(data).then(res => {
            if (res.code == 0) {
              this.$message.success(this.$t('automation.czcg'))
              this.isshow = false
              this.id = ''
              this.zdyname = ''
              const url = '?page=' + 1 + '&size=10'
              this.getautomlist(url)
            }
          })
        } else {
          const data = {
            name: this.zdyname
          }
          addintelligentlist(data).then(res => {
            if (res.code == 0) {
              this.$message.success(this.$t('automation.czcg'))
              this.isshow = false
              this.zdyname = ''
              const url = '?page=' + 1 + '&size=10'
              this.getautomlist(url)
            }
          })
        }
      }
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

