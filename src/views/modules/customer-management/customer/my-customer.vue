<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button size="mini"
                 type="primary"
                 @click="addData()">{{$t('add')}}</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="searchData()">{{$t('screen')}}</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="exportData()">{{$t('export_sj')}}</el-button>
    </div>
    <!-- tabMob -->
    <div style="width:100%;margin-top:10px;">
      <tableMobCopy ref="table_mob"
                    :table-data="tableData"
                    :table-config="tableConfig"
                    @sendData="getTableData"></tableMobCopy>
    </div>
    <div class="pagination">
      <el-pagination background
                     :page-size="15"
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <el-drawer :title="$t('screen')"
               :visible.sync="drawer"
               :direction="'rtl'"
               :before-close="handleClose">
      <div class="sea-div"
           :style="{height:windowheight - 130 +'px'}">
        <el-form :model="ruleForm"
                 ref="Form"
                 label-position="top"
                 label-width="120px">
          <el-form-item :label="$t('untracked.from1')">
            <el-input size="small"
                      type="text"
                      :placeholder="$t('pla1')"
                      v-model="ruleForm.companyName"></el-input>
          </el-form-item>

          <el-form-item :label="$t('untracked.from2')">
            <el-input size="small"
                      type="text"
                      :placeholder="$t('pla1')"
                      v-model="ruleForm.name"></el-input>
          </el-form-item>
          <!-- 客户来源 -->
          <el-form-item :label="$t('untracked.from3')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.source"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.CustomersourceList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <!-- 公司类别 -->
          <el-form-item :label="$t('untracked.from4')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.companyType"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.CompanyTypeList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 服务方式 -->
          <el-form-item :label="$t('untracked.from5')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.service"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.ServiceTypeList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <!-- 行业细分 -->
          <el-form-item :label="$t('untracked.from6')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.industrySegmentation"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.IndustryTypeList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-top:10px">
            <el-button size="mini"
                       type="primary"
                       @click="ScreenData">{{$t('screen')}}</el-button>
            <el-button size="mini"
                       @click="resetData">{{$t('reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 导出 -->
    <el-dialog width="35%"
               :title="$t('export_sj')"
               :visible.sync="dialogExportVisible">
      <el-form label-position="left"
               label-width="100px">
        <el-form-item :label="$t('export_sj')">
          <el-radio-group size="small"
                          style="width:100%;"
                          v-model="expordType"
                          :placeholder="$t('pla2')">
            <el-radio :label="1">EXCEL</el-radio>
            <el-radio :label="2">CSV</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top:10px">
          <el-button size="mini"
                     type="primary"
                     @click="exportModelData">{{$t('confirm')}}</el-button>
          <el-button size="mini"
                     @click="dialogExportVisible = false">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import TableConfig from "@/tableConfigs/surbanajurong/myCustomer";
import tableMobCopy from "@/components/GPMob/tableMobCopy";

import {
  Alllist,
  MyList,
  DelData,
  exportData
} from "@/api/surbanajurong/customer-untracked";
import selectList from "./Data";
// sys-roleInfo
export default {
  components: { tableMobCopy },
  data () {
    return {
      expordType: 1,
      dialogExportVisible: false,
      selectList: {},
      tabHeadConfig: {},
      tableData: [],
      currentPage: 1,
      total: 0,
      drawer: false,
      ruleForm: {
        companyName: null,
        name: null,
        source: null,
        companyType: null,
        service: null,
        industrySegmentation: null,
        windowheight: 0
      }
    };
  },
  computed: {},
  created () {
    this.tableConfig = { ...TableConfig };
    //权限控制
    this.tableConfig.operating.map(val => {
      val.show = false;
      //编辑
      if (val.name == "update") {
        if (
          this.$Buttonpermissions("surbanajurong.customer.my-customer[update]")
        ) {
          val.show = true;
        }
      }

      //详情
      if (val.name == "details") {
        if (
          this.$Buttonpermissions("surbanajurong.customer.my-customer[look]")
        ) {
          val.show = true;
        }
      }
    });
    this.selectList = { ...selectList };
    this.init();
  },
  methods: {
    init () {
      this.ruleForm = {
        name: null,
        companyName: null,
        source: null,
        companyType: null,
        service: null,
        industrySegmentation: null
      };
      this.getList(1);
      this.windowheight = document.body.clientHeight;
    },
    addData () {
      this.$router.push({
        name: "surbanajurong-customer-add-my-customer",
        query: {
          type: "add"
        }
      });
    },
    searchData () {
      this.drawer = true;
    },
    getList (page) {
      this.tableData = [];
      let data = {
        page: page,
        size: 15
      };

      let loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.6)"
      });

      // if (localStorage.getItem("roleUserid")) {
      //   data.userInChargeId = localStorage.getItem("roleUserid");
      // } else {
      //   data.isSystem = true;
      // }

      // if (!this.$isNull(this.ruleForm.companyName)) {
      //   data.companyName = this.ruleForm.companyName;
      // }

      // if (!this.$isNull(this.ruleForm.name)) {
      //   data.name = this.ruleForm.name;
      // }

      // if (!this.$isNull(this.ruleForm.source)) {
      //   if (this.ruleForm.source.length > 0) {
      //     data.source = this.ruleForm.source.join(",");
      //   }
      // }

      // if (!this.$isNull(this.ruleForm.companyType)) {
      //   if (this.ruleForm.companyType.length > 0) {
      //     data.companyType = this.ruleForm.companyType.join(",");
      //   }
      // }

      // if (!this.$isNull(this.ruleForm.service)) {
      //   if (this.ruleForm.service.length > 0) {
      //     data.companyType = this.ruleForm.service.join(",");
      //   }
      // }

      // if (!this.$isNull(this.ruleForm.industrySegmentation)) {
      //   if (this.ruleForm.industrySegmentation.length > 0) {
      //     data.industrySegmentation = this.ruleForm.industrySegmentation.join(
      //       ","
      //     );
      //   }
      // }

      // if (this.$Buttonpermissions("surbanajurong.customer.my-customer[all]")) {
      //   Alllist(data).then(res => {
      //     if (res.code == 0) {
      //       loading.close();
      //       this.setdata(res, page);
      //     }
      //   });
      // } else {
      //   MyList(data).then(res => {
      //     if (res.code == 0) {
      //       loading.close();
      //       this.setdata(res, page);
      //     }
      //   });
      // }
    },
    setdata (res, page) {
      if (res.data.data) {
        this.tableData = [];
        res.data.data.map((val, index) => {
          val.num = page * 10 - 10 + index + 1;
          val.createTime = this.$formatDate(
            new Date(val.createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
          if (val.source) {
            val.source = this.get_rerurnData(
              val.source,
              this.selectList.CustomersourceList
            );
          }

          if (val.companyType) {
            val.companyType = this.get_rerurnData(
              val.companyType,
              this.selectList.CompanyTypeList
            );
          }

          if (val.service) {
            val.service = this.get_rerurnData(
              val.service,
              this.selectList.ServiceTypeList
            );
          }
          if (val.industrySegmentation) {
            val.industrySegmentation = this.get_rerurnData(
              val.industrySegmentation,
              this.selectList.IndustryTypeList
            );
          }
          this.tableData.push(val);
        });
      }

      this.total = res.data.total;
      this.currentPage = page;
      this.handleClose();
    },
    getTableData (e) {
      if (e.click_event.name == "update") {
        this.$router.push({
          name: "surbanajurong-customer-add-my-customer",
          query: {
            type: "update",
            id: e.click_data.id
          }
        });
      } else if (e.click_event.name == "details") {
        this.$router.push({
          name: "surbanajurong-customer-customer-detail",
          query: {
            id: e.click_data.id
          }
        });
      } else if (e.click_event.name == "delete") {
        this.deleteData(e.click_data);
      }
    },
    deleteData (item) {
      // 删除
      this.$confirm(this.$t("op_Click"), this.$t("reminder"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          DelData({
            id: item.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.init();
            }
          });
        })
        .catch(() => { });
    },
    get_rerurnData (arr, configlist) {
      let list = [];
      configlist.map(val => {
        arr.map(item => {
          if (item == val.id) {
            list.push(val.label);
          }
        });
      });
      return list.join("、");
    },
    handleCurrentChange (e) {
      this.getList(e);
    },
    handleClose () {
      this.drawer = false;
    },
    ScreenData () {
      this.getList(1);
    },
    resetData () {
      this.init();
      this.handleClose();
    },
    exportData () {
      this.dialogExportVisible = true;
    },
    exportModelData () {
      let data = {
        csv: this.expordType == 1 ? false : true,
        all: this.$Buttonpermissions("surbanajurong.customer.my-customer[all]")
          ? true
          : false
      };

      if (!this.$isNull(this.ruleForm.companyName)) {
        data.companyName = this.ruleForm.companyName;
      }

      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }

      if (!this.$isNull(this.ruleForm.source)) {
        if (this.ruleForm.source.length > 0) {
          data.source = this.ruleForm.source.join(",");
        }
      }

      if (!this.$isNull(this.ruleForm.companyType)) {
        if (this.ruleForm.companyType.length > 0) {
          data.companyType = this.ruleForm.companyType.join(",");
        }
      }

      if (!this.$isNull(this.ruleForm.service)) {
        if (this.ruleForm.service.length > 0) {
          data.companyType = this.ruleForm.service.join(",");
        }
      }

      if (!this.$isNull(this.ruleForm.industrySegmentation)) {
        if (this.ruleForm.industrySegmentation.length > 0) {
          data.industrySegmentation = this.ruleForm.industrySegmentation.join(
            ","
          );
        }
      }

      exportData(data).then(res => {
        if (res.code == 0) {
          let url = `${this.$fileUrl().replace(
            "/storage",
            ""
          )}api/storage/download?remoteFilename=${res.data}&filename=${
            this.expordType == 1 ? "我的客户.xls" : "我的客户.csv"
            }`;
          window.open(url);
          this.dialogExportVisible = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.sea-div {
  width: 90%;
  margin: 0 auto;
  overflow-y: auto;
}
</style>
