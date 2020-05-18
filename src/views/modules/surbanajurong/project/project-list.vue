<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button size="mini" type="primary" @click="updateRateClick()">{{$t('rate')}}</el-button>
      <el-button
        v-if="$Buttonpermissions('surbanajurong.project.project-list[add]')"
        size="mini"
        type="primary"
        @click="addData()"
      >{{$t('add')}}</el-button>
      <el-button size="mini" type="primary" @click="searchData()">{{$t('screen')}}</el-button>
      <el-button
        size="mini"
        type="primary"
        v-if="$Buttonpermissions('surbanajurong.project.project-list[export]')"
        @click="exportData()"
      >{{$t('export_sj')}}</el-button>
    </div>
    <!-- tabMob -->
    <div style="width:100%;margin-top:10px;">
      <tableMobCopy
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        @sendData="getTableData"
      ></tableMobCopy>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-drawer
      :title="$t('screen')"
      :visible.sync="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
    >
      <div class="sea-div" :style="{height:windowheight - 130 +'px'}">
        <el-form :model="ruleForm" ref="Form" label-position="top" label-width="120px">
          <el-form-item label="Project Name">
            <el-input size="small" type="text" :placeholder="$t('pla1')" v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="Pursuit Type">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.type"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option value="Pursuit">Pursuit</el-option>
              <el-option value="Secured">Secured</el-option>
              <el-option value="Lost">Lost</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Project Industry Segments">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.industrySegments"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in selectList.IndustryTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Type of Service">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.serviceType"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in selectList.ServiceTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="KAM or Not">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.kam"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option value="Yes">Yes</el-option>
              <el-option value="No">No</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Pursuit Status">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.pursuitStatus"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in selectList.PursuitStatusList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Province/City">
            <el-cascader
              size="small"
              v-model="ruleForm.ProvinceCity"
              :placeholder="$t('search')"
              filterable
              :options="selectList.cityList"
              clearable
              style="width:100%"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="Project Leader">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.leaderId"
              clearable
              filterable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in peopleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="BD Manager">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.managerId"
              clearable
              filterable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in peopleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Bind customers">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.highSeasId"
              clearable
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in SeasList"
                :key="item.id"
                :label="item.name + '-' + item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Probability of succes">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.probabilityOfSuccess"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in selectList.SuccessProbabilityList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Probability">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.probability"
              multiple
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in selectList.ProbabilityList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-top:10px">
            <el-button size="mini" type="primary" @click="ScreenData">{{$t('screen')}}</el-button>
            <el-button size="mini" @click="resetData">{{$t('reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-dialog :title="$t('rate')" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="modelForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="120px"
        style="width:100%;"
      >
        <el-form-item :label="$t('rate')" prop="rateValue">
          <el-input size="small" :placeholder="$t('pla1')" v-model="modelForm.rateValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="$Buttonpermissions('surbanajurong.project.project-rate[update]')"
          type="primary"
          size="mini"
          @click="updateRate('ruleForm')"
        >{{$t('update')}}</el-button>
        <el-button size="mini" @click="dialogVisible = false">{{$t('cancel')}}</el-button>
      </span>
    </el-dialog>

    <!-- 导出 -->
    <el-dialog width="35%" :title="$t('export_sj')" :visible.sync="dialogExportVisible">
      <el-form label-position="left" label-width="100px">
        <el-form-item :label="$t('export_sj')">
          <el-radio-group
            size="small"
            style="width:100%;"
            v-model="expordType"
            :placeholder="$t('pla2')"
          >
            <el-radio :label="1">EXCEL</el-radio>
            <el-radio :label="2">CSV</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top:10px">
          <el-button size="mini" type="primary" @click="exportModelData">{{$t('confirm')}}</el-button>
          <el-button size="mini" @click="dialogExportVisible = false">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import TableConfig from "@/tableConfigs/surbanajurong/projectManagement";
import tableMobCopy from "@/components/GPMob/tableMobCopy";
import { List, exportData } from "@/api/surbanajurong/project";
import { allUser } from "@/api/surbanajurong/permission";
import { allSeas } from "@/api/surbanajurong/customer-untracked";
import selectList from "./Data";
import { rate, editRate } from "@/api/surbanajurong/dataCenter";
// sys-roleInfo
export default {
  components: { tableMobCopy },
  data() {
    return {
      expordType: 1,
      dialogExportVisible: false,
      dialogVisible: false,
      modelForm: {
        rateValue: null
      },
      loading: false,
      selectList: {},
      tabHeadConfig: {},
      tableData: [],
      currentPage: 1,
      total: 0,
      drawer: false,
      ruleForm: {
        name: null,
        type: [],
        industrySegments: [],
        serviceType: [],
        kam: [],
        pursuitStatus: [],
        ProvinceCity: [],
        leaderId: [],
        managerId: [],
        probabilityOfSuccess: [],
        probability: []
      },
      peopleList: [],
      SeasList: [],
      windowheight: 0,
      rules: {
        rateValue: [
          {
            required: true,
            message: this.$t("sj_project.error"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.tableConfig = { ...TableConfig };
    //权限控制
    this.tableConfig.operating.map(val => {
      val.show = false;
      //编辑
      if (val.name == "update") {
        if (
          this.$Buttonpermissions("surbanajurong.project.project-list[update]")
        ) {
          val.show = true;
        }
      }

      //详情
      if (val.name == "details") {
        if (
          this.$Buttonpermissions("surbanajurong.project.project-list[look]")
        ) {
          val.show = true;
        }
      }
    });

    this.selectList = { ...selectList };
    this.init();
    this.getpeopleList();
    this.getSeasList();
    this.getrate();
  },
  methods: {
    getrate() {
      rate({}).then(res => {
        if (res.code == 0) {
          this.modelForm.rateValue = res.data;
        }
      });
    },
    init() {
      this.ruleForm = {
        name: null,
        type: [],
        industrySegments: [],
        serviceType: [],
        kam: [],
        pursuitStatus: [],
        ProvinceCity: [],
        leaderId: [],
        managerId: [],
        probabilityOfSuccess: [],
        probability: []
      };
      this.getList(1);
      this.windowheight = document.body.clientHeight;
    },
    addData() {
      this.$router.push({
        name: "surbanajurong-project-add-project",
        query: {
          type: "add"
        }
      });
    },
    searchData() {
      this.drawer = true;
    },
    getpeopleList() {
      allUser({ page: 1, size: 1000 }).then(res => {
        if (res.code == 0) {
          this.peopleList = res.data;
        }
      });
    },
    getSeasList() {
      allSeas({ page: 1, size: 100 }).then(res => {
        if (res.code == 0) {
          if (res.data) {
            if (res.data.data) {
              this.SeasList = res.data.data;
            }
          }
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.SeasList = [];
        allSeas({ page: 1, size: 100, name: query }).then(res => {
          if (res.code == 0) {
            if (res.data) {
              if (res.data.data) {
                this.loading = false;
                this.SeasList = res.data.data;
              }
            }
          }
        });
      } else {
        this.getSeasList();
      }
    },
    getList(page) {
       let loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.6)"
      });

      this.tableData = [];
      let data = {
        page: page,
        size: 10,
        userId: localStorage.getItem("roleUserid")
      };
      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }
      if (!this.$isNull(this.ruleForm.leaderId)) {
        data.leaderId = this.ruleForm.leaderId;
      }

      if (!this.$isNull(this.ruleForm.managerId)) {
        data.managerId = this.ruleForm.managerId;
      }

      if (!this.$isNull(this.ruleForm.highSeasId)) {
        data.highSeasId = this.ruleForm.highSeasId;
      }

      if (this.ruleForm.type.length > 0) {
        data.type = this.ruleForm.type.join(",");
      }

      if (this.ruleForm.industrySegments.length > 0) {
        data.industrySegments = this.ruleForm.industrySegments.join(",");
      }

      if (this.ruleForm.serviceType.length > 0) {
        data.serviceType = this.ruleForm.serviceType.join(",");
      }

      if (this.ruleForm.kam.length > 0) {
        data.kam = this.ruleForm.kam.join(",");
      }

      if (this.ruleForm.pursuitStatus.length > 0) {
        data.pursuitStatus = this.ruleForm.pursuitStatus.join(",");
      }

      if (this.ruleForm.probabilityOfSuccess.length > 0) {
        data.probabilityOfSuccess = this.ruleForm.probabilityOfSuccess.join(
          ","
        );
      }

      if (this.ruleForm.probability.length > 0) {
        data.probability = this.ruleForm.probability.join(",");
      }

      if (this.ruleForm.ProvinceCity.length > 0) {
        data.province = this.ruleForm.ProvinceCity[0];
        data.city = this.ruleForm.ProvinceCity[1];
      }

      List(data).then(res => {
        if (res.code == 0) {
          loading.close();
          if (res.data.data) {
            this.tableData = [];
            res.data.data.map((val, index) => {
              if (val.highSeasList) {
                let list = [];
                val.highSeasList.map(vv => {
                  list.push(vv.name);
                });
                val.highSeasList = list.join("、");
              }
              val.createTime = this.$formatDate(
                new Date(val.createTime),
                "yyyy-MM-dd hh:mm:ss"
              );

              if (val.dateOfSecured) {
                val.dateOfSecured = this.$formatDate(
                  new Date(val.dateOfSecured),
                  "yyyy-MM-dd"
                );
              }

              if (val.estimatedStartDate) {
                val.estimatedStartDate = this.$formatDate(
                  new Date(val.estimatedStartDate),
                  "yyyy-MM-dd"
                );
              }

              if (val.estimatedEndDate) {
                val.estimatedEndDate = this.$formatDate(
                  new Date(val.estimatedEndDate),
                  "yyyy-MM-dd"
                );
              }
              if (val.projectStartDate) {
                val.projectStartDate = this.$formatDate(
                  new Date(val.projectStartDate),
                  "yyyy-MM-dd"
                );
              }
              if (val.projectEndDate) {
                val.projectEndDate = this.$formatDate(
                  new Date(val.projectEndDate),
                  "yyyy-MM-dd"
                );
              }
              if (val.pursuitStartDate) {
                val.pursuitStartDate = this.$formatDate(
                  new Date(val.pursuitStartDate),
                  "yyyy-MM-dd"
                );
              }

              if (val.kam) {
                val.kam = "Yes";
              } else {
                val.kam = "No";
              }

              let list = this.get_rerurnCity(val);
              val.province = list[0];
              val.city = list[1];

              if (val.serviceType) {
                val.serviceType = this.get_rerurnData(
                  val.serviceType,
                  this.selectList.ServiceTypeList
                );
              }
              if (val.industrySegments) {
                val.industrySegments = this.get_rerurnData(
                  val.industrySegments,
                  this.selectList.IndustryTypeList
                );
              }
              if (val.probabilityOfSuccess) {
                val.probabilityOfSuccess = this.get_rerurnData_1(
                  val.probabilityOfSuccess,
                  this.selectList.SuccessProbabilityList
                );
              }

              if (val.probability) {
                val.probability = this.get_rerurnData_1(
                  val.probability,
                  this.selectList.ProbabilityList
                );
              }
              this.tableData.push(val);
            });
          }
          this.total = res.data.total;
          this.currentPage = page;
          this.handleClose();
        }
      });
    },
    getTableData(e) {
      if (e.click_event.name == "update") {
        this.$router.push({
          name: "surbanajurong-project-add-project",
          query: {
            type: "update",
            id: e.click_data.id
          }
        });
      } else if (e.click_event.name == "details") {
        this.$router.push({
          name: "surbanajurong-project-add-project",
          query: {
            type: "look",
            id: e.click_data.id
          }
        });
      }
      // else if (e.click_event.name == "delete") {
      //   this.deleteData(e.click_data);
      // }
    },
    // deleteData(item) {
    //   // 删除
    //   this.$confirm(this.$t("op_Click"), this.$t("reminder"), {
    //     confirmButtonText: this.$t("confirm"),
    //     cancelButtonText: this.$t("cancel"),
    //     type: "warning"
    //   })
    //     .then(() => {
    //       // DelData({
    //       //   id: item.id
    //       // }).then(res => {
    //       //   if (res.code == 0) {
    //       //     this.$notify({
    //       //       title: this.$t("success"),
    //       //       message: this.$t("op_success"),
    //       //       type: "success"
    //       //     });
    //       //     this.init();
    //       //   }
    //       // });
    //     })
    //     .catch(() => {});
    // },
    get_rerurnCity(item) {
      let list = [];
      this.selectList.cityList.map(val => {
        if (val.value == item.province) {
          list.push(val.label);
          val.children.map(dd => {
            if (dd.value == item.city) {
              list.push(dd.label);
            }
          });
        }
      });
      return list;
    },
    get_rerurnData(arr, configlist) {
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
    get_rerurnData_1(arr, configlist) {
      let list = [];
      configlist.map(val => {
        if (arr == val.id) {
          list = val.label;
        }
      });
      return list;
    },
    handleCurrentChange(e) {
      this.getList(e);
    },
    handleClose() {
      this.drawer = false;
    },
    ScreenData() {
      this.getList(1);
    },
    resetData() {
      this.init();
      this.handleClose();
    },
    updateRateClick() {
      this.dialogVisible = true;
    },
    updateRate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editRate(this.modelForm.rateValue * 1).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false;
              this.$notify({
                title: this.$t("success"),
                message: this.$t("op_success"),
                type: "success"
              });
              this.getrate();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    exportData() {
      this.dialogExportVisible = true;
    },
    exportModelData() {
      let data = { csv: this.expordType == 1 ? false : true };
      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }
      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }
      if (!this.$isNull(this.ruleForm.leaderId)) {
        data.leaderId = this.ruleForm.leaderId;
      }

      if (!this.$isNull(this.ruleForm.managerId)) {
        data.managerId = this.ruleForm.managerId;
      }

      if (!this.$isNull(this.ruleForm.highSeasId)) {
        data.highSeasId = this.ruleForm.highSeasId;
      }

      if (this.ruleForm.type.length > 0) {
        data.type = this.ruleForm.type.join(",");
      }

      if (this.ruleForm.industrySegments.length > 0) {
        data.industrySegments = this.ruleForm.industrySegments.join(",");
      }

      if (this.ruleForm.serviceType.length > 0) {
        data.serviceType = this.ruleForm.serviceType.join(",");
      }

      if (this.ruleForm.kam.length > 0) {
        data.kam = this.ruleForm.kam.join(",");
      }

      if (this.ruleForm.pursuitStatus.length > 0) {
        data.pursuitStatus = this.ruleForm.pursuitStatus.join(",");
      }

      if (this.ruleForm.probabilityOfSuccess.length > 0) {
        data.probabilityOfSuccess = this.ruleForm.probabilityOfSuccess.join(
          ","
        );
      }

      if (this.ruleForm.probability.length > 0) {
        data.probability = this.ruleForm.probability.join(",");
      }

      if (this.ruleForm.ProvinceCity.length > 0) {
        data.province = this.ruleForm.ProvinceCity[0];
        data.city = this.ruleForm.ProvinceCity[1];
      }
      exportData(data).then(res => {
        if (res.code == 0) {
          let url = `${this.$fileUrl().replace(
            "/storage",
            ""
          )}api/storage/download?remoteFilename=${res.data}&filename=${
            this.expordType == 1 ? "项目管理.xls" : "项目管理.csv"
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
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.sea-div {
  width: 90%;
  margin: 0 auto;
  // height: 300px;
  overflow-y: auto;
}
</style>
