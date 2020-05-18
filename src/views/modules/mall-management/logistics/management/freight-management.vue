<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('logistics.freight') }}</h3>

    <el-row :gutter="24"
            style="margin-bottom:20px;">
      <el-col :span="4">
        <div class="grid-content1">
          <el-button style="float: left;"
                     size="mini"
                     type="primary"
                     @click="addCompany">{{ $t('logistics.freightlist') }}</el-button>
        </div>
      </el-col>
    </el-row>

    <div v-for="item in moren"
         :key="item.id"
         class="hezi">
      <div class="top">
        <div class="left">{{ item.modelName }}</div>
        <div class="time">{{ $t('logistics.lab16') }}:{{ $formatDate(new Date(item.updateTime),'yyyy-MM-dd hh:mm:ss') }}</div>
        <div>
          <!-- <el-button size="mini"
                     type="text"
                     @click="handleEdit(item)">{{ $t('edit') }}</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleEdit(item)">{{ $t('edit') }}</el-button> -->
        </div>
      </div>
      <div class="bottom">
        <div class="disp">
          <div style="width:50%">{{ $t('logistics.lab11') }}</div>
          <div class="width">{{ $t('logistics.lab12') }}</div>
          <div class="width">{{ $t('logistics.lab13') }}</div>
          <div class="width">{{ $t('logistics.lab14') }}</div>
          <div class="width">{{ $t('logistics.lab15') }}</div>
        </div>
        <div class="disp">
          <div style="width:50%">{{ item.province }} {{ item.city }}</div>
          <div class="width">{{ item.firstWeight /100 }}</div>
          <div class="width">{{ item.transportExpense /100 }}</div>
          <div class="width">{{ item.continuedHeavy /100 }}</div>
          <div class="width">{{ item.continuedExpense /100 }}</div>
        </div>
      </div>
    </div>
    <div v-for="(item,index) in transportExpenselist"
         :key="index"
         class="hezi">
      <div class="top">
        <div class="left">{{ item.modelName }}</div>
        <div class="time">{{ $t('logistics.lab16') }}:{{ $formatDate(new Date(item.updateTime),'yyyy-MM-dd hh:mm:ss') }}</div>
        <div>
          <el-button size="mini"
                     type="text"
                     @click="handleEdit(item)">{{ $t('edit') }}</el-button>
          <el-button size="mini"
                     type="text"
                     style="color:#f56c6c"
                     @click="handleDelete(item)">{{ $t('delete') }}</el-button>
        </div>
      </div>
      <div class="bottom">
        <div class="disp">
          <div style="width:50%">{{ $t('logistics.lab11') }}</div>
          <div class="width">{{ $t('logistics.lab12') }}</div>
          <div class="width">{{ $t('logistics.lab13') }}</div>
          <div class="width">{{ $t('logistics.lab14') }}</div>
          <div class="width">{{ $t('logistics.lab15') }}</div>
        </div>
        <div class="disp">
          <div style="width:50%">{{ item.province }} {{ item.city }}</div>
          <div class="width">{{ item.firstWeight /100 }}</div>
          <div class="width">{{ item.transportExpense /100 }}</div>
          <div class="width">{{ item.continuedHeavy /100 }}</div>
          <div class="width">{{ item.continuedExpense /100 }}</div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>
  </d2-container>
</template>
<script>

import { transportExpense, updatedel, queryDefault } from '@/api/logistics/logistics'
export default {
  name: 'Company',
  components: {},
  data () {
    return {
      keyword: null,
      total: 0,
      currentPage: 1,
      transportExpenselist: [],
      moren: []
    }
  },
  computed: {},
  created () {
    this.getqueryDefault()
    this.gettransportExpense(1)
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    addCompany () {
      this.$router.push({
        name: 'mall-management/logistics-management-add',
        query: {
          id: -1,
          type: 'add'
        }
      })
    },
    // 删除运费模板
    handleDelete (item) {
      this.$confirm(this.$t('logistics.sure'), this.$t('tip'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          updatedel({
            id: item.id,
            status: 1
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                message: this.$t('logistics.delete'),
                type: 'success'
              })
              this.gettransportExpense(1)
            }
          })
        })
        .catch(() => { })
    },

    handleEdit (item) {
      this.$router.push({
        name: 'mall-management/logistics-management-add',
        query: {
          id: item.id,
          type: 'edit'
        }
      })
    },
    handleCurrentChange (e) {
      this.gettransportExpense(e)
    },
    // 运费模板列表
    gettransportExpense (e) {
      const url = '?page=' + e + '&size=10'
      transportExpense(url).then(res => {
        if (res.code === 0 && res.data) {
          this.transportExpenselist = res.data.list
          this.total = res.data.count
        }
      })
    },
    // 默认模板
    getqueryDefault () {
      queryDefault().then(res => {
        if (res.code === 0 && res.data) {
          this.moren.push(res.data)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  width: 100%;
  height: 35px;
}
.top {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cdcdcd;
}
.hezi {
  width: 100%;
  height: auto;
  border: 1px solid #cdcdcd;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.left {
  width: 60%;
}
.bottom {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 20px;
  background: #eee;
}
.disp {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.width {
  width: 15%;
  text-align: center;
}
</style>

