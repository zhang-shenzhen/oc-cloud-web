<template>
  <d2-container class="page">
    <h3 class="list-title">请填写导购信息</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="导购员" class="mt20">
        <el-button
          plain
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="mini"
          @click="addPeople=true"
        >选择人员</el-button>
      </el-form-item>
      <el-form-item label="导购名称" class="mt20" size="mini">
        <el-input v-model="form.name" class="w300"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="mt20" size="mini">
        <el-input v-model="form.name" class="w300"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" class="mt20" size="mini">
        <el-select v-model="form.region" placeholder="请选择门店" class="w300">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" class="mt20" size="mini">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item class="mt20" size="mini">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择人员 -->
    <div>
      <el-dialog title="人员列表" :visible.sync="addPeople" width="70%" center>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="400"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="姓名"></el-table-column>
          <el-table-column prop="province" label="登录名"></el-table-column>
          <el-table-column prop="address" label="所属部门"></el-table-column>
          <el-table-column prop="address" label="关联微信"></el-table-column>
          <el-table-column prop="date" label="角色"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            background
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPeople = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addPeople = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      // 弹窗
      addPeople: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "17779863932",
          province: "上海",
          city: "1",
          address: "2020.01.31 15:22:26",
          zip: 200333
        }
      ],
      currentPage: 0,
      total: 0,
      multipleSelection: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    // 分页
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}
.w300 {
  width: 300px;
}
</style>
