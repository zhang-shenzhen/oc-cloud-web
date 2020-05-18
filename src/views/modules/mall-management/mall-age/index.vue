<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('setHomePage.mallList')}}</h3>
    <div class="df aic jcsb">
      <div>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          size="mini"
          @click="addPage"
        >{{$t('setHomePage.addPage')}}</el-button>
      </div>
      <div class="df aic mb20">
        <span>{{$t('setHomePage.pageStatus')}}</span>
        <el-select v-model="pageStatus.status" :placeholder="$t('setHomePage.chose')" size="mini" class="ml10">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" class="ml10" @click="changeStatus">{{$t('setHomePage.determine')}}</el-button>
      </div>
    </div>

    <div style="padding-bottom:20px;">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
    'background-color': 'rgba(242, 242, 242, 1)',
}"
      >
        <el-table-column prop="name" :label="$t('setHomePage.pageName')" width="180"></el-table-column>
        <el-table-column prop="path" :label="$t('setHomePage.linkParams')"></el-table-column>
        <el-table-column prop="id" :label="$t('setHomePage.pageId')"></el-table-column>
        <el-table-column prop="createTime" :label="$t('setHomePage.createTime')"></el-table-column>
        <el-table-column :label="$t('setHomePage.status')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('setHomePage.operation')">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">{{$t('setHomePage.editor')}}</el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)">{{$t('setHomePage.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div class="pagination">
            <el-pagination
              background
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
      </div>-->
    </div>

    <!-- 添加页面弹窗 -->
    <div>
      <el-dialog :title="$t('setHomePage.addPage')" :visible.sync="memberList" width="30%" center>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item :label="$t('dialog.pageType')" class="ml10">
            <el-select
              v-model="formInline.status"
              :placeholder="$t('dialog.enterPageName')"
              @change="changePage"
              style="width:200px;"
            >
              <el-option
                v-for="item in cities1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('setHomePage.pageName')" class="ml10">
            <el-input v-model="formInline.pageName" :placeholder="$t('dialog.enterPageName')" style="width:200px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="jumpSetMallHomePage" size="mini">{{$t('dialog.nextStep')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import {
  AllSearch,
  StatusSwitch,
  DeleteHomePage
} from "@/api/setHomePage/setHomePage";
export default {
  name: "openList",
  data() {
    return {
      formInline: {
        status: "0",
        pageName: null
      },
      currentPage: 0,
      total: 0,
      value: true,
      memberList: false,
      tableData: [],
      //设置页面路径
      pageName: null,
      //   下拉框
      cities: [
        {
          value: "2",
          label: this.$t('setHomePage.all')
        },
        {
          value: "1",
          label: this.$t('setHomePage.able')
        },
        {
          value: "0",
          label: this.$t('setHomePage.disAble')
        }
      ],
      //弹窗下拉框数据
      cities1: [
        {
          value: "0",
          label:this.$t('dialog.homePage')
        },
        {
          value: "1",
          label: this.$t('dialog.secondPage')
        }
      ],

      pageStatus: {
        status: "2"
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList(1);
  },
  methods: {
    //添加页面弹窗
    addPage() {
      this.memberList = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    //分页
    handleCurrentChange(val) {
      console.log(val);
    },
    //跳转到设置页面去
    jumpSetMallHomePage() {
      if (!this.formInline.pageName) {
        this.open2("警告", "请填写页面名称", "warning");
        return;
      }
      this.$router.push({
        path: "/mall-management-mall-age-setMallHomePage",
        query: {
          pageName: this.formInline.pageName,
          type: this.formInline.status == "0" ? "1" : "2",
          numIndex: 2
        }
      });
      console.log(1);
      this.memberList = false;
    },
    // 查询列表
    getList(page) {
      if (this.pageStatus.status == "0" || this.pageStatus.status == "1") {
        AllSearch({
          status: this.pageStatus.status,
          page: page
        }).then(res => {
          if (res.code == "0") {
            res.data.data.forEach(item => {
              item.createTime = this.timestampToTime(item.createTime);
              item.status = item.status == "0" ? true : false;
            });
            this.tableData = res.data.data;
          }
        });
      } else {
        AllSearch({
          page: page
        }).then(res => {
          if (res.code == "0") {
            res.data.data.forEach(item => {
              item.createTime = this.timestampToTime(item.createTime);
              item.status = item.status == "0" ? true : false;
            });
            this.tableData = res.data.data;
          }
        });
      }
    },
    // 转态切换获取数据
    changeStatus() {
      this.getList(1);
    },
    // 改变状态
    changeSwitch(item) {
      StatusSwitch({
        id: item.id
      }).then(res => {
        if (res.code == "0") {
          this.open2("成功", res.message, "success");
          this.getList(1);
        } else {
          this.open2("警告", res.message, "warning");
          this.getList(1);
        }
      });
    },
    //删除某条数据
    deleteData(res) {
      DeleteHomePage({
        id: res.id
      }).then(res => {
        if (res.code == "0") {
          this.open2("成功", res.message, "success");
          this.getList(1);
        } else {
          this.open2("警告", res.message, "warning");
        }
      });
    },
    // 编辑按钮
    handleClick(item) {
      this.$router.push({
        path: "/mall-management-mall-age-setMallHomePage",
        query: {
          id: item.id,
          type: item.type,
          numIndex: 1
        }
      });
      console.log(item);
    },
    //弹窗选择框
    changePage() {
      console.log(this.status);
    },

    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      console.log(2, Y);
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    open2(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
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
.df {
  display: flex;
}
.aic {
  align-items: center;
}
.jcc {
  justify-content: center;
}
.jcsb {
  justify-content: space-between;
}
</style>
