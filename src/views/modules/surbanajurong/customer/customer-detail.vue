<template>
  <d2-container class="page">
    <div class="title-div">
      <div class="left">{{details.companyName}}</div>
      <div class="right">
        <div v-if="details.createUserName" class="right-div">
          <span>{{$t('untracked.label1')}}</span>
          <span>{{details.createUserName}}</span>
        </div>
        <div class="right-div">
          <span>{{$t('untracked.label2')}}</span>
          <span>{{details.updateTime}}</span>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="contant">
      <el-divider content-position="left">{{$t('untracked.title2')}}</el-divider>
      <el-form
        style="padding: 20px;"
        :model="details"
        ref="Form"
        label-position="left"
        label-width="auto"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from3')">
              <div class="text-div">{{details.source}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from4')">
              <div class="text-div">{{details.companyType}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from7')">
              <div class="text-div">{{details.groupName}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from1')">
              <div class="text-div">{{details.companyName}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from5')">
              <div class="text-div">{{details.service}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from6')">
              <div class="text-div">{{details.industrySegmentation}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from8')">
              <div class="text-div">{{details.name}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from9')">
              <div class="text-div">{{details.position}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from11')">
              <div class="text-div">{{details.mobilePhone}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from10')">
              <div class="text-div">{{details.phoneNumber}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from12')">
              <div class="text-div">{{details.email}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('untracked.from13')">
              <div class="text-div">{{details.wechatName}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="details.userInChargeName || details.deptName">
          <el-col v-if="details.userInChargeName" :span="12">
            <el-form-item :label="$t('untracked.from15')">
              <div class="text-div">{{details.userInChargeName}}</div>
            </el-form-item>
          </el-col>
          <el-col v-if="details.deptName" :span="12">
            <el-form-item :label="$t('untracked.from16')">
              <div class="text-div">{{details.deptName}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="contant">
      <el-divider content-position="left">{{$t('untracked.title3')}}</el-divider>
      <div class="contant-div">
        <el-radio-group
          size="small"
          @change="changRadio"
          v-model="tabPosition"
          style="margin-bottom: 10px;"
        >
          <el-radio-button label="All">All</el-radio-button>
          <el-radio-button label="Secured">Secured</el-radio-button>
          <el-radio-button label="Pursuit">Pursuit</el-radio-button>
          <el-radio-button label="Lost">Lost</el-radio-button>
        </el-radio-group>

        <div style="width:100%;margin-top:10px;">
          <tableMobCopy ref="table_mob" :table-data="tableData" :table-config="tableConfig"></tableMobCopy>
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
      </div>
    </div>
  </d2-container>
</template>
<script>
import { Detail } from "@/api/surbanajurong/customer-untracked";
import { List } from "@/api/surbanajurong/project";
import selectList from "./Data";
import rrojectSelectList from "@/views/modules/surbanajurong/project/Data";
import tableMobCopy from "@/components/GPMob/tableMobCopy";
import TableConfig from "@/tableConfigs/surbanajurong/projectManagementDetails";
export default {
  components: { tableMobCopy },
  data() {
    return {
      details: {},
      selectList: {},
      tabPosition: "All",
      rrojectSelectList: {},
      tabHeadConfig: {},
      tableData: [],
      currentPage: 1,
      total: 0
    };
  },
  computed: {},
  created() {
    this.selectList = { ...selectList };
    this.rrojectSelectList = { ...rrojectSelectList };
    this.tableConfig = { ...TableConfig };

    if (this.$route.query.id) {
      this.Details(this.$route.query.id);
      this.getList(1);
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    get_rerurnData(arr, configlist) {
      if (arr) {
        let list = [];
        configlist.map(val => {
          arr.map(item => {
            if (item == val.id) {
              list.push(val.label);
            }
          });
        });
        return list.join("、");
      } else {
        return null;
      }
    },
    Details(id) {
      Detail({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.details = {
            companyName: res.data.companyName,
            companyType: this.get_rerurnData(
              res.data.companyType,
              this.selectList.CompanyTypeList
            ),
            email: res.data.email,
            groupName: res.data.groupName,
            industrySegmentation: this.get_rerurnData(
              res.data.industrySegmentation,
              this.selectList.IndustryTypeList
            ),
            mobilePhone: res.data.mobilePhone,
            name: res.data.name,
            phoneNumber: res.data.phoneNumber,
            position: res.data.position,
            service: this.get_rerurnData(
              res.data.service,
              this.selectList.ServiceTypeList
            ),
            source: this.get_rerurnData(
              res.data.source,
              this.selectList.CustomersourceList
            ),
            status: res.data.status,
            wechatName: res.data.wechatName,
            id: res.data.id,
            updateTime: this.$formatDate(
              new Date(res.data.updateTime),
              "yyyy-MM-dd hh:mm:ss"
            ),
            createUserName: res.data.createUserName,
            deptName: res.data.deptName,
            userInChargeName: res.data.userInChargeName
          };
        }
      });
    },
    getList(page) {
      this.tableData = [];
      let data = {
        page: page,
        size: 10,
        hsId: this.$route.query.id
      };

      if (this.tabPosition != "All") {
        data.type = this.tabPosition;
      }

      List(data).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.tableData = [];
            if (res.data.data.length > 0) {
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
                    this.rrojectSelectList.ServiceTypeList
                  );
                }
                if (val.industrySegments) {
                  val.industrySegments = this.get_rerurnData(
                    val.industrySegments,
                    this.rrojectSelectList.IndustryTypeList
                  );
                }

                if (val.probabilityOfSuccess) {
                  val.probabilityOfSuccess = this.get_rerurnData_1(
                    val.probabilityOfSuccess,
                    this.rrojectSelectList.SuccessProbabilityList
                  );
                }

                if (val.probability) {
                  val.probability = this.get_rerurnData_1(
                    val.probability,
                    this.rrojectSelectList.ProbabilityList
                  );
                }
                this.tableData.push(val);
              });
            }
          }
          this.total = res.data.total;
          this.currentPage = page;
        }
      });
    },
    get_rerurnCity(item) {
      if (arr) {
        let list = [];
        this.rrojectSelectList.cityList.map(val => {
          if (val.value == item.province) {
            list.push(val.label);
            if (val.children) {
              val.children.map(dd => {
                if (dd.value == item.city) {
                  list.push(dd.label);
                }
              });
            }
          }
        });
        return list;
      } else {
        return null;
      }
    },
    get_rerurnData(arr, configlist) {
      if (arr) {
        let list = [];
        configlist.map(val => {
          arr.map(item => {
            if (item == val.id) {
              list.push(val.label);
            }
          });
        });
        return list.join("、");
      } else {
        return null;
      }
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
    changRadio() {
      this.getList(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.title-div {
  width: 100%;
  height: 50px;
  .left {
    width: 50%;
    height: 50px;
    line-height: 50px;
    float: left;
    font-size: 24px;
  }
  .right {
    width: 50%;
    height: 50px;
    float: right;
    .right-div {
      width: 100%;
      text-align: right;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
    }
  }
}
.contant {
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  .text-div {
    width: 100%;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .contant-div {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>

