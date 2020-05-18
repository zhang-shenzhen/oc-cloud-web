<template>
  <d2-container class="page">
    <el-form :model="ruleForm" :rules="rules" ref="Form" label-position="top" label-width="200px">
      <h3>{{$t('sj_project.title1')}}</h3>

      <el-row>
        <el-col :span="11">
          <el-form-item label="Pursuit Type" prop="type">
            <el-radio-group
              :disabled="type == 'look'"
              @change="changType()"
              v-model="ruleForm.type"
            >
              <el-radio label="Pursuit"></el-radio>
              <el-radio label="Secured"></el-radio>
              <el-radio label="Lost"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Project Name" prop="name">
            <el-input
              :disabled="type == 'look'"
              size="small"
              type="text"
              :placeholder="$t('pla1')"
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="Project Industry Segments" prop="industrySegments">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.industrySegments"
              :disabled="type == 'look'"
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
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Province/City" prop="ProvinceCity">
            <el-cascader
              v-model="ruleForm.ProvinceCity"
              :disabled="type == 'look'"
              size="small"
              :placeholder="$t('search')"
              filterable
              :options="selectList.cityList"
              clearable
              style="width:100%;"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="Type of Service(可多选)" prop="serviceType">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.serviceType"
              :disabled="type == 'look'"
              multiple
              clearable
              :placeholder="$t('pla2')"
              @change="ServiceCheck()"
            >
              <el-option
                v-for="item in selectList.ServiceTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="1">
          <el-form-item label="KAM or Not" prop="kam">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.kam"
              :disabled="type == 'look'"
              clearable
              :placeholder="$t('pla2')"
            >
              <el-option :value="true" label="Yes"></el-option>
              <el-option :value="false" label="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- Pursuit start -->
      <el-row v-if="ruleForm.type == 'Pursuit'">
        <el-col :span="11">
          <el-form-item label="Pursuit Status" prop="pursuitStatus">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.pursuitStatus"
              :disabled="type == 'look'"
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
        </el-col>

        <el-col :span="11" :offset="1">
          <el-form-item label="Pursuit Start Date" prop="pursuitStartDate">
            <el-date-picker
              style="width:100%;"
              size="small"
              v-model="ruleForm.pursuitStartDate"
              :disabled="type == 'look'"
              type="date"
              :placeholder="$t('pla2')"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="ruleForm.type == 'Pursuit'">
        <el-col :span="11">
          <el-form-item label="Probability" prop="probability">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.probability"
              :disabled="type == 'look'"
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
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Estimated Start/End Date" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              :disabled="type == 'look'"
              size="small"
              style="width:100%;"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type == 'Pursuit'">
        <el-col :span="11">
          <el-form-item label="Probability of success" prop="probabilityOfSuccess">
            <el-select
              size="small"
              style="width:100%;"
              :disabled="type == 'look'"
              v-model="ruleForm.probabilityOfSuccess"
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
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item label="Bind customers">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.highSeasId"
              :disabled="type == 'look'"
              clearable
              filterable
              multiple
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
        </el-col>
      </el-row>
      <!-- Pursuit end -->

      <el-row>
        <el-col :span="11">
          <el-form-item label="BD Manager" prop="leaderId">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.leaderId"
              :disabled="type == 'look'"
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
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Project Leader" prop="managerId">
            <el-select
              size="small"
              style="width:100%;"
              :disabled="type == 'look'"
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
        </el-col>
      </el-row>

      <!-- Secured start -->
      <el-row v-if="ruleForm.type == 'Secured'">
        <el-col :span="11">
          <el-form-item label="Date of Secured" prop="dateOfSecured">
            <el-date-picker
              style="width:100%;"
              :disabled="type == 'look'"
              size="small"
              v-model="ruleForm.dateOfSecured"
              type="date"
              :placeholder="$t('pla2')"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Start/End Date" prop="projectTime">
            <el-date-picker
              v-model="ruleForm.projectTime"
              size="small"
              style="width:100%;"
              type="daterange"
              :disabled="type == 'look'"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="ruleForm.type == 'Secured'">
        <el-col :span="11">
          <el-form-item label="Project Code">
            <el-input
              :disabled="type == 'look'"
              size="small"
              type="text"
              :placeholder="$t('pla1')"
              v-model="ruleForm.code"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item label="Bind customers">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.highSeasId"
              :disabled="type == 'look'"
              clearable
              filterable
              multiple
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
        </el-col>
      </el-row>
      <!-- Secured start -->

      <el-row v-if="ruleForm.type == 'Lost'">
        <el-col :span="11">
          <el-form-item label="Bind customers">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.highSeasId"
              :disabled="type == 'look'"
              clearable
              filterable
              multiple
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="$t('pla2')"
            >
              <el-option
                v-for="item in SeasList"
                :key="item.id"
                :label="item.name  + item.groupName ? '-' + item.groupName : ''"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="Project Feature in brief" prop="projectFeatureInBrief">
            <el-input
              size="small"
              type="textarea"
              :disabled="type == 'look'"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :placeholder="$t('pla1')"
              v-model="ruleForm.projectFeatureInBrief"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <h3 v-if="ruleForm.type != 'Lost'">{{$t('sj_project.title2')}}</h3>

      <el-row v-if="ruleForm.type == 'Pursuit'">
        <el-col :span="11">
          <el-form-item label="Estimated Contract Sum" prop="estimatedContractSum">
            <el-input
              size="small"
              :disabled="type == 'look'"
              :placeholder="$t('pla1')"
              v-model="ruleForm.estimatedContractSum"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="GP%" prop="gp">
            <el-input
              :disabled="type == 'look'"
              size="small"
              :placeholder="$t('pla1')"
              v-model="ruleForm.gp"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="ruleForm.type == 'Secured'">
        <el-col :span="11">
          <el-form-item label="Site Area (KM2) MP/ Park Project">
            <el-input
              :disabled="type == 'look'"
              size="small"
              :placeholder="$t('pla1')"
              v-model="ruleForm.parkProject"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="GFA(m2) Building Project">
            <el-input
              :disabled="type == 'look'"
              size="small"
              :placeholder="$t('pla1')"
              v-model="ruleForm.buildingProject"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="ruleForm.type == 'Secured'">
        <el-col :span="11">
          <el-form-item label="GP%" prop="gp">
            <el-input
              :disabled="type == 'look'"
              size="small"
              :placeholder="$t('pla1')"
              v-model="ruleForm.gp"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="ruleForm.type == 'Secured'">
        <el-col :span="11">
          <el-row>
            <el-col :span="10">
              <div style="width:100%;height:32px;line-height:32px;">Type of Service</div>
            </el-col>
            <el-col :span="10">
              <div style="width:100%;height:32px;line-height:32px;">Price</div>
            </el-col>
            <el-col :span="4">
              <div style="width:100%;height:32px;line-height:32px;">Delete</div>
            </el-col>
          </el-row>

          <el-row v-for="(item,index) in ServiceList" :key="index" style="margin-bottom:10px;">
            <el-col :span="10" style="padding-right:10px;">
              <el-select
                size="small"
                style="width:100%;"
                v-model="item.value"
                :disabled="type == 'look'"
                clearable
                :placeholder="$t('pla2')"
              >
                <el-option
                  v-for="item in selectServiceList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="10" style="padding-right:10px;">
              <el-input
                :disabled="type == 'look'"
                size="small"
                type="number"
                :placeholder="$t('pla1')"
                v-model="item.price"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                v-if="index > 0"
                :disabled="type == 'look'"
                type="text"
                size="mini"
                @click="deleteItem(index)"
              >{{$t('delete')}}</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-button
                :disabled="type == 'look'"
                type="text"
                size="mini"
                @click="addItem()"
              >{{$t('add')}}</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-form-item style="margin-top:30px">
        <el-button
          size="mini"
          type="primary"
          :disabled="type == 'look'"
          @click="submitForm('Form')"
        >{{ type == 'add' ? $t('save') : $t('update')}}</el-button>
        <el-button size="mini" @click="getback">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import { allUser } from "@/api/surbanajurong/permission";
import { allSeas } from "@/api/surbanajurong/customer-untracked";
import { add, update, Detail } from "@/api/surbanajurong/project";
import selectList from "./Data";
export default {
  name: "add-customer",
  components: {},
  data() {
    return {
      selectList: {},
      peopleList: [],
      type: null,
      loading: false,
      ruleForm: {
        type: "Pursuit",
        name: null,
        industrySegments: null,
        province: null,
        city: null,
        serviceType: [],
        pursuitStatus: null,
        kam: null,
        probabilityOfSuccess: null,
        dateOfSecured: null, //t
        pursuitStartDate: null, //t
        projectEndDate: null, //t
        projectStartDate: null, //t
        estimatedStartDate: null, //t
        estimatedEndDate: null, //t
        probability: null,
        leaderId: null,
        managerId: null,
        projectFeatureInBrief: null,
        code: null,
        ProvinceCity: null,
        time: null,
        projectTime: null,
        estimatedContractSum: null,
        gp: null,
        parkProject: null,
        contractDetail: null,
        buildingProject: null,
        highSeasId:[]
      },
      SeasList: [],
      selectServiceList: [],
      ServiceList: [{ value: null, price: null }],
      rules: {
        type: [
          {
            required: true,
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        industrySegments: [
          {
            required: true,
            trigger: "change"
          }
        ],
        ProvinceCity: [
          {
            required: true,
            trigger: "change"
          }
        ],
        serviceType: [
          {
            required: true,
            trigger: "change"
          }
        ],
        kam: [
          {
            required: true,
            trigger: "change"
          }
        ],
        pursuitStartDate: [
          {
            required: true,
            trigger: "change"
          }
        ],
        pursuitStatus: [
          {
            required: true,
            trigger: "change"
          }
        ],
        probability: [
          {
            required: true,
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            trigger: "change"
          }
        ],
        projectTime: [
          {
            required: true,
            trigger: "change"
          }
        ],
        leaderId: [
          {
            required: true,
            trigger: "change"
          }
        ],
        managerId: [
          {
            required: true,
            trigger: "change"
          }
        ],
        dateOfSecured: [
          {
            required: true,
            trigger: "change"
          }
        ],
        probabilityOfSuccess: [
          {
            required: true,
            trigger: "change"
          }
        ],
        projectFeatureInBrief: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        gp: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        estimatedContractSum: [
          {
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.selectList = { ...selectList };
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    if (this.$route.query.id) {
      this.Details(this.$route.query.id);
    }
    this.getpeopleList();
    this.getSeasList();
    this.changType();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
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
    Details(id) {
      Detail({
        id: id
      }).then(res => {
        if (res.code == 0) {
          this.ruleForm = res.data;
          this.ruleForm = {
            type: res.data.type,
            name: res.data.name,
            industrySegments: res.data.industrySegments[0],
            province: res.data.province,
            city: res.data.city,
            serviceType: res.data.serviceType,
            pursuitStatus: null,
            kam: res.data.kam,
            probabilityOfSuccess: res.data.probabilityOfSuccess,
            dateOfSecured: res.data.dateOfSecured, //t
            pursuitStartDate: res.data.pursuitStartDate, //tt
            projectEndDate: res.data.projectEndDate, //t
            projectStartDate: res.data.projectStartDate, //t
            estimatedStartDate: res.data.estimatedStartDate, //t
            estimatedEndDate: res.data.estimatedEndDate, //t
            probability: res.data.probability,
            leaderId: res.data.leaderId,
            managerId: res.data.managerId,
            projectFeatureInBrief: res.data.projectFeatureInBrief,
            code: res.data.code,
            ProvinceCity: null,
            time: null,
            projectTime: null,
            estimatedContractSum: res.data.estimatedContractSum,
            gp: null,
            parkProject: res.data.parkProject,
            contractDetail: null,
            buildingProject: res.data.buildingProject,
            highSeasId: res.data.highSeasId
          };
          this.ruleForm.id = res.data.id;

          //省市
          this.ruleForm.ProvinceCity = [];
          this.ruleForm.ProvinceCity.push(res.data.province);
          this.ruleForm.ProvinceCity.push(res.data.city);

          if (res.data.pursuitStatus) {
            this.ruleForm.pursuitStatus = res.data.pursuitStatus[0];
          }

          //时间
          if (res.data.estimatedStartDate && res.data.estimatedEndDate) {
            this.ruleForm.time = [];
            this.ruleForm.time.push(res.data.estimatedStartDate);
            this.ruleForm.time.push(res.data.estimatedEndDate);
          }
          //时间
          if (res.data.projectStartDate && res.data.projectEndDate) {
            this.ruleForm.projectTime = [];
            this.ruleForm.projectTime.push(res.data.projectStartDate);
            this.ruleForm.projectTime.push(res.data.projectEndDate);
          }
          this.ServiceCheck();

          if (res.data.contractDetail) {
            //gp
            if (res.data.contractDetail.gp) {
              this.ruleForm.gp = res.data.contractDetail.gp;
            }
            //list
            if (res.data.contractDetail.list) {
              this.ServiceList = res.data.contractDetail.list;
            }
          }

          console.log(this.ServiceList);
        }
      });
    },
    changType() {
      this.rules.pursuitStatus = null;
      this.rules.pursuitStartDate = null;
      this.rules.probability = null;
      this.rules.time = null;
      this.rules.probabilityOfSuccess = null;
      this.rules.dateOfSecured = null;
      this.rules.projectTime = null;
      this.rules.estimatedContractSum = null;

      this.ruleForm.pursuitStatus = null;
      this.ruleForm.pursuitStartDate = null;
      this.ruleForm.probability = null;
      this.ruleForm.time = null;
      this.ruleForm.probabilityOfSuccess = null;
      this.ruleForm.dateOfSecured = null;
      this.ruleForm.projectTime = null;
      this.ruleForm.code = null;
      this.ruleForm.estimatedContractSum = null;
      this.ruleForm.parkProject = null;
      this.ruleForm.buildingProject = null;

      if (this.ruleForm.type == "Pursuit") {
        this.rules.pursuitStatus = [{ required: true, trigger: "change" }];

        this.rules.pursuitStartDate = [{ required: true, trigger: "change" }];

        this.rules.probability = [{ required: true, trigger: "change" }];

        this.rules.time = [{ required: true, trigger: "change" }];

        this.rules.probabilityOfSuccess = [
          { required: true, trigger: "change" }
        ];

        this.rules.estimatedContractSum = [{ required: true, trigger: "blur" }];
      } else if (this.ruleForm.type == "Secured") {
        this.rules.dateOfSecured = [{ required: true, trigger: "change" }];

        this.rules.projectTime = [{ required: true, trigger: "change" }];
      }
    },
    submitForm(formName) {
      let status = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            type: this.ruleForm.type,
            name: this.ruleForm.name,
            serviceType: this.ruleForm.serviceType,
            industrySegments: [],
            province: null,
            city: null,
            kam: this.ruleForm.kam,
            leaderId: this.ruleForm.leaderId,
            managerId: this.ruleForm.managerId,
            projectFeatureInBrief: this.ruleForm.projectFeatureInBrief,
            highSeasId: this.ruleForm.highSeasId
          };

          data.industrySegments.push(this.ruleForm.industrySegments);
          data.province = this.ruleForm.ProvinceCity[0];
          data.city = this.ruleForm.ProvinceCity[1];

          if (data.type == "Pursuit") {
            data.pursuitStatus = [];
            data.pursuitStatus.push(this.ruleForm.pursuitStatus);

            data.pursuitStartDate = this.$formatDate(
              new Date(this.ruleForm.pursuitStartDate),
              "yyyy-MM-dd"
            );

            data.probability = this.ruleForm.probability;

            data.probabilityOfSuccess = this.ruleForm.probabilityOfSuccess;

            data.estimatedStartDate = this.$formatDate(
              new Date(this.ruleForm.time[0]),
              "yyyy-MM-dd"
            );

            data.estimatedEndDate = this.$formatDate(
              new Date(this.ruleForm.time[1]),
              "yyyy-MM-dd"
            );
            data.estimatedContractSum = this.ruleForm.estimatedContractSum;

            data.contractDetail = { gp: this.ruleForm.gp };
          } else if (data.type == "Secured") {
            data.dateOfSecured = this.$formatDate(
              new Date(this.ruleForm.dateOfSecured),
              "yyyy-MM-dd"
            );

            data.projectStartDate = this.$formatDate(
              new Date(this.ruleForm.projectTime[0]),
              "yyyy-MM-dd"
            );

            data.projectEndDate = this.$formatDate(
              new Date(this.ruleForm.projectTime[1]),
              "yyyy-MM-dd"
            );

            if (this.ruleForm.parkProject) {
              data.parkProject = this.ruleForm.parkProject;
            }
            if (this.ruleForm.code) {
              data.code = this.ruleForm.code;
            }
            if (this.ruleForm.buildingProject) {
              data.buildingProject = this.ruleForm.buildingProject;
            }
            data.contractDetail = {
              gp: this.ruleForm.gp,
              list: this.ServiceList
            };
          }

          if (this.ruleForm.id) {
            data.id = this.ruleForm.id;
          }

          if (this.type == "add") {
            add(data).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t("success"),
                  message: this.$t("op_success"),
                  type: "success"
                });
                this.getback();
              }
            });
          } else {
            // 编辑
            update(data).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t("success"),
                  message: this.$t("op_success"),
                  type: "success"
                });
                this.getback();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getback() {
      this.$router.go(-1);
    },
    deleteItem(index) {
      this.ServiceList.splice(index, 1);
    },
    addItem() {
      this.ServiceList.push({
        value: null,
        price: null
      });
    },
    ServiceCheck() {
      if (this.ruleForm.serviceType) {
        this.selectServiceList = [];
        this.selectList.ServiceTypeList.map(ite => {
          this.ruleForm.serviceType.map(val => {
            if (ite.id == val) {
              this.selectServiceList.push(ite.label);
            }
          });
        });
      }
    },
    remoteMethod(query) {
      console.log('query',query)
      if (query !== "") {
        this.loading = true;
        this.SeasList = [];
        allSeas({ page: 1, size: 100, name: query }).then(res => {
          if (res.code == 0) {
            if (res.data) {
              if (res.data.data) {
                this.loading = false;
                this.SeasList = res.data.data;
              }else{
                 this.loading = false;
              }
            }
          }
        });
      } else {
        this.getSeasList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
}
</style>

