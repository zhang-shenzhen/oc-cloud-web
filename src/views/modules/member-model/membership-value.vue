<template>
  <d2-container class="page">
    <h3 class="list-title">会员价值规则设置</h3>

    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="valueAnalysisName"
        label="字段名"
      />
      <el-table-column
        prop="score"
        label="分值"
      />
      <el-table-column
        prop="ruleDesc"
        label="备注"
      />
      <el-table-column label="规则配置">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="updateItem(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑资料"
      :visible.sync="dialogVisible"
      width="30%"
    >

      <div class="container">
        <el-form
          :model="From"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="活动名称">
            <el-input
              v-model="From.name"
              :disabled="true"
            />
          </el-form-item>

          <el-form-item label="分值">
            <el-input
              v-model="From.score"
              type="number"
            />
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="From.memo"
              placeholder="请输入备注"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </el-form-item>

        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="saveUpdate()"
        >确 定</el-button>

      </span>
    </el-dialog>

  </d2-container>
</template>
<script>
import { MemberList, UpdateRules } from '@/api/memberModel/memberSeting'

export default {
  name: 'MemberModelMembershipValue',
  components: {},
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      From: {
        name: null,
        score: 1,
        memo: null
      }
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  mounted() {

  },
  beforeDestroy() { },
  methods: {
    getList() {
      MemberList({
        id: 2
      }).then(res => {
        if (res.code == 0) {
          this.tableData = res.data
        }
      })
    },
    updateItem(item) {
      this.copyItem = item
      this.From.name = item.valueAnalysisName
      this.From.score = item.score
      this.From.memo = item.ruleDesc
      this.dialogVisible = true
    },
    saveUpdate() {
      if (this.$isNull(this.From.score)) {
        this.$notify.error({
          title: '错误',
          message: '请输入分值'
        })
        return
      }

      UpdateRules({
        id: this.copyItem.id,
        ruleDesc: this.From.memo,
        score: this.From.score
      }).then(res => {
        if (res.code == 0) {
          this.getList()
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>

