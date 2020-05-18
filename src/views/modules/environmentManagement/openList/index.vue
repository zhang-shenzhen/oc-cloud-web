<template>
  <div class="openListStyle1">
    <div class="openListStyle">
      <div class="openList_top">
        <h3 class="list-title">导购筛选</h3>
        <el-form :inline="true" :model="formInline" class="demo-form-inline mt10">
          <el-form-item label="状态" size="mini" class="ml10">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店" size="mini" class="ml10">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini" class="ml10">
            <el-input v-model="formInline.user" placeholder="请输入导购名称或手机号" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item size="mini" class="ml10">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="openList_mian">
        <h3 class="list-title">导购列表</h3>
        <el-button
          plain
          icon="el-icon-circle-plus-outline"
          type="primary"
          class="mb20"
          size="mini"
          @click="jumpAddShoppers"
        >添加导购</el-button>
        <div style="padding-bottom:20px;">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="400"
            :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
          >
            <el-table-column prop="date" label="导购名称" width="180"></el-table-column>
            <el-table-column prop="province" label="手机号"></el-table-column>
            <el-table-column prop="address" label="购物ID"></el-table-column>
            <el-table-column prop="address" label="所属门店"></el-table-column>
            <el-table-column label="分销人数">
              <template slot-scope="scope">
                <p style="color:#409EFF;cursor: pointer;" @click="changeDistributorsList">{{scope.row.city}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="创建时间"></el-table-column>
            <el-table-column label="状态">
              <template>
                <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">会员</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
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
        </div>
      </div>
    </div>
    <!-- 分销商列表弹窗 -->
    <div>
      <el-dialog title="分销员列表" :visible.sync="distributorsList" width="70%" center>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="400"
          :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
        >
          <el-table-column prop="date" label="分销员名称"></el-table-column>
          <el-table-column prop="province" label="来源"></el-table-column>
          <el-table-column prop="address" label="手机号"></el-table-column>
          <el-table-column prop="address" label="导购员"></el-table-column>
           <el-table-column prop="date" label="加入时间"></el-table-column>
          <el-table-column prop="province" label="绑定客户"></el-table-column>
          <el-table-column prop="address" label="累计消费"></el-table-column>
          <el-table-column prop="address" label="累计收益"></el-table-column>
           <el-table-column prop="address" label="状态"></el-table-column>
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
          <el-button @click="distributorsList = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="distributorsList = false" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 会员列表弹窗 -->
    <div>
      <el-dialog title="会员列表" :visible.sync="memberList" width="90%" center>
           <el-table
          :data="tableData"
          style="width:100%"
          height="400"
          :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
        >
          <el-table-column prop="date" label="会员"></el-table-column>
          <el-table-column prop="province" label="手机号"></el-table-column>
          <el-table-column prop="address" label="会员ID"></el-table-column>
          <el-table-column prop="address" label="会员卡号"></el-table-column>
           <el-table-column prop="date" label="积分"></el-table-column>
          <el-table-column prop="province" label="最近消费时间" sortable></el-table-column>
          <el-table-column prop="address" label="消费金额（元）" sortable></el-table-column>
          <el-table-column prop="address" label="消费次数" sortable></el-table-column>
           <el-table-column prop="address" label="微信关注时间" sortable></el-table-column>
           <el-table-column prop="address" label="系统注册时间" sortable></el-table-column>
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
          <el-button @click="memberList = false" size='mini'>取 消</el-button>
          <el-button type="primary" @click="memberList = false" size='mini'>确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "openList",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      currentPage: 0,
      total: 0,
      value: true,
      //分销商列表弹窗
      distributorsList: false,
      //   会员列表弹窗
      memberList: false,
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
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    //跳转到添加导购页面
    jumpAddShoppers() {
      console.log(1);
      this.$router.push("/environmentManagement-openList-addShoppers");
    },
    onSubmit() {
      console.log("submit!");
    },
    // 会员列表弹窗
    handleClick(row) {
      console.log(row);
      this.memberList = true;
    },
    //分销商列表弹窗
    changeDistributorsList() {
      this.distributorsList = true;
    },
    //分页
    handleCurrentChange(val) {
      console.log(val);
    }
  },
  components: {}
};
</script>

<style lang="scss"  scoped>
.openList_top {
  background: #fff !important;
  border-radius: 10px;
  height: auto !important;
  padding: 20px;
}
.openList_mian {
  background: #fff;
  border-radius: 10px;
  margin: 30px 0px;
  padding: 20px;
  height: auto !important;
}
.openListStyle {
  height: 100%;
  margin: 20px;
}
.openListStyle1 {
  padding: 0px 20px 0px 0px;
  height: auto;
  margin-bottom: 20px !important;
}
.mt10 {
  margin-bottom: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
.box_form {
  margin-left: 10px;
  width: 200px;
}
.ml10 {
  margin-left: 10px;
}
.openList_top {
  height: 50px;
  background-color: rgba(242, 242, 242, 1);
  margin-top: 30px;
  margin-bottom: 30px;
  
}
</style>
