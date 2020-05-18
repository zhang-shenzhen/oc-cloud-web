<template>
  <d2-container class="page">
    <div class="caozuo">
      <el-button size="mini"
                 type="primary"
                 @click="searchData()">{{$t('screen')}}</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="exportData()">{{$t('export_sj')}}</el-button>
    </div>
    <!-- tabMob -->
    <div style="width:100%;margin-top:10px;">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="编号"
                         width="50">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column label="创建时间"
                         width="170">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="姓名"
                         width="100">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="公司名称"
                         width="240">
          <template slot-scope="scope">{{ scope.row.companyName }}</template>
        </el-table-column>
        <el-table-column label="客户来源"
                         width="240">
          <template slot-scope="scope">{{ scope.row.sourceName }}</template>
        </el-table-column>
        <el-table-column label="手机号"
                         width="140">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="电话"
                         width="140">
          <template slot-scope="scope">{{ scope.row.tel }}</template>
        </el-table-column>
        <el-table-column label="邮箱"
                         width="140">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="职位"
                         width="140">
          <template slot-scope="scope">{{ scope.row.position }}</template>
        </el-table-column>
        <el-table-column label="行业细分"
                         width="240">
          <template slot-scope="scope">{{ scope.row.industry }}</template>
        </el-table-column>
        <el-table-column label="服务方式"
                         width="240">
          <template slot-scope="scope">{{ scope.row.serviceMode }}</template>
        </el-table-column>
        <el-table-column label="集团名称"
                         width="140">
          <template slot-scope="scope">{{ scope.row.groupName }}</template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDetails(scope.row)">详 情</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleAllocation(scope.row)">分 配</el-button>
          </template>
        </el-table-column>
      </el-table>

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
          <!-- 公司名称  -->
          <el-form-item :label="$t('untracked.from1')">
            <el-input size="small"
                      type="text"
                      :placeholder="$t('pla1')"
                      v-model="ruleForm.companyName"></el-input>
          </el-form-item>
          <!-- 客户姓名 -->
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
                       v-model="ruleForm.sourceName"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.CustomersourceList"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 服务方式 -->
          <el-form-item :label="$t('untracked.from5')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.serviceMode"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.ServiceTypeList"
                         :key="item.label"
                         :label="item.label"
                         :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <!-- 行业细分 -->
          <el-form-item :label="$t('untracked.from6')">
            <el-select size="small"
                       style="width:100%;"
                       v-model="ruleForm.industry"
                       multiple
                       clearable
                       :placeholder="$t('pla2')">
              <el-option v-for="item in selectList.IndustryTypeList"
                         :key="item.label"
                         :label="item.label"
                         :value="item.label"></el-option>
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

    <!-- 点击分配按钮 -->
    <el-dialog width="35%"
               :title="$t('distribution')"
               :visible.sync="dialogDriverInfoVisible">
      <el-form :model="modelForm"
               label-position="left"
               label-width="100px">
        <el-form-item label="所属部门">
          <el-select v-model="modelForm.storeId"
                     clearable
                     size="mini"
                     @change="searchStore"
                     placeholder="请选择">
            <el-option v-for="item in treeData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配导购">
          <el-select v-model="modelForm.distributorId"
                     clearable
                     size="mini"
                     placeholder="请选择">
            <el-option v-for="item in clerkList"
                       :key="item.id"
                       :label="item.nickname"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top:10px">
          <el-button size="mini"
                     type="primary"
                     @click="sendModelData">{{$t('save')}}</el-button>
          <el-button size="mini"
                     @click="clearModel">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import { clerkList, StoreList } from '@/api/storeManagement/storeManagement'
import configUrl from "@/api/configUrl";
import { UstomerList, ExportingMember, DistributionShoppers } from "@/api/customer-management/customer";
import selectList from "./Data";
import { mapState } from "vuex";
import { list, userList } from '@/api/permission'
// sys-roleInfo
export default {
  components: {},
  data () {
    return {


      tabHeadConfig: {},


      peopleList: [],
      // 分界线↓
      dialogDriverInfoVisible: false,
      details: null,
      modelForm: {
        storeId: null,
        distributorId: null,
      },
      clerkList: [],
      StoreList: [],
      drawer: false,
      loading: null,
      selectList: {},
      tableData: [],
      currentPage: 1,
      total: 0,
      ruleForm: {
        companyName: null,
        name: null,
        sourceName: null,
        companyType: null,
        serviceMode: null,
        industry: null,
        windowheight: 0,
        treeData: [],
      },
    };
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.selectList = { ...selectList };
    this.init();
    this.getStoreList();
    this.getListInterface()
  },
  methods: {
    init () {
      this.ruleForm = {
        name: null,
        companyName: null,
        sourceName: null,
        companyType: null,
        serviceMode: null,
        industry: null
      };
      this.getList(1);
      this.windowheight = document.body.clientHeight;
    },
    // 接口
    getListInterface () {
      this.treeData = [];
      list({
        page: 1,
        size: 1000
      }).then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length > 0) {
            // this.treeData = res.data;
            // this.getUserList(1);
            let list = [];
            this.treeData = this.treeInter(res.data, list)
          }
        }
      });
    },
    treeInter (arr, list) {
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          list.push({
            id: arr[i].id,
            name: arr[i].name,
          })
          if (arr[i].childList.length) {
            this.treeInter(arr[i].childList, list)
          }
        }
      }
      return list;
    },

    getUserList (id) {
      let data = {
        size: 1000,
        page: 1,
        departmentId: id
      };
      userList(data).then(res => {
        if (res.code == 0) {
          if (res.data.data) {
            this.clerkList = res.data.data;
          }
        }
      });
    },


    getList (e) {
      this.tableData = [];
      let data = {
        status: 1,
        page: e,
        size: 15
      };
      let loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
      if (!this.$isNull(this.ruleForm.companyName)) {
        data.companyName = this.ruleForm.companyName;
      }
      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }
      if (!this.$isNull(this.ruleForm.sourceName)) {
        if (this.ruleForm.sourceName.length) {
          data.sourceName = this.ruleForm.sourceName.join(",");
        }
      }
      if (!this.$isNull(this.ruleForm.serviceMode)) {
        if (this.ruleForm.serviceMode.length) {
          data.serviceMode = this.ruleForm.serviceMode.join(",");
        }
      }
      if (!this.$isNull(this.ruleForm.industry)) {
        if (this.ruleForm.industry) {
          data.industry = this.ruleForm.industry.join(",");
        }
      }
      UstomerList(data).then(res => {
        loading.close();
        if (res.code == 0) {
          console.log(res, '客户公海列表接口')
          res.data.data.map(item => {
            item.role = ''
            if (item.shoppingGuideId) { // 导购
              item.role = '导购'
            } else if (item.distributor) { // 分销
              item.role = '分销'
            }
            item.consume = (item.consume / 100).toFixed(2);
            item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm:ss");
          })
          this.tableData = res.data.data;
        }
        this.total = res.data.total;
        this.currentPage = e;
      })
    },
    handleCurrentChange (e) {
      this.getList(e);
    },
    ScreenData () { // 点击筛选按钮
      console.log(this.ruleForm, 'ruleForm===ruleForm')
      this.getList(1);
    },

    resetData () { // 点击重置按钮
      this.init();
      this.handleClose();
    },
    handleClose () {
      this.drawer = false;
    },
    exportData () { // 点击导出按钮显示弹框
      this.exportModelData();
    },

    exportModelData () { // 点击导出里的确认按钮
      let data = {
        status: 1,
      };
      if (!this.$isNull(this.ruleForm.companyName)) {
        data.companyName = this.ruleForm.companyName;
      }
      if (!this.$isNull(this.ruleForm.name)) {
        data.name = this.ruleForm.name;
      }
      if (!this.$isNull(this.ruleForm.sourceName)) {
        if (this.ruleForm.sourceName.length) {
          data.sourceName = this.ruleForm.sourceName.join(",");
        }
      }
      if (!this.$isNull(this.ruleForm.serviceMode)) {
        if (this.ruleForm.serviceMode.length) {
          data.serviceMode = this.ruleForm.serviceMode.join(",");
        }
      }
      if (!this.$isNull(this.ruleForm.industry)) {
        if (this.ruleForm.industry) {
          data.industry = this.ruleForm.industry.join(",");
        }
      }

      let url = "?";
      let num = 0;
      for (let i in data) {
        num += 1;
        url += i + "=" + data[i];
        if (num < Object.keys(data).length) {
          url += "&";
        }
      }
      console.log(url, configUrl.ajax_url + 'member/seas/export' + url)
      window.open(configUrl.ajax_url + 'member/seas/export' + url);
    },
    handleEdit (e) {
      // 点击编辑
      this.$router.push({
        name: "customer-management-customer-add-customer-untracked",
        query: {
          type: "update",
          id: e.id
        }
      });
    },
    handleDetails (e) {
      // 详情
      this.$router.push({
        name: "customer-management-customer-customer-detail",
        query: {
          id: e.id
        }
      });
    },
    handleAllocation (e) {
      // 点击分配按钮
      this.details = e;
      this.modelForm.leaderId = null;
      this.dialogDriverInfoVisible = true;
    },

    searchStore () {
      this.modelForm.distributorId = '';
      this.getUserList(this.modelForm.storeId);
    },

    // 获取门店列表
    // getStoreList () {
    //   const sendData = {
    //     wechatId: this.info.ChannelId,
    //     sort: 'create_time;2',
    //     page: 1,
    //     size: 999
    //   }
    //   // 获取门店列表
    //   StoreList(sendData).then(res => {
    //     if (res.code == 0) {
    //       this.StoreList = res.data.data
    //     }
    //   })
    // },
    // 获取店员列表数据
    // getClerkList () {
    //   const sendData = {
    //     page: 1,
    //     size: 500
    //   }
    //   if (!this.$isNull(this.modelForm.storeId)) {
    //     sendData.storeId = this.modelForm.storeId
    //   }
    //   clerkList(sendData).then(res => {
    //     this.clerkList = []
    //     if (res.code == 0) {
    //       this.clerkList = res.data.data
    //     }
    //   })
    // },

    sendModelData () {
      let highSeas = [];
      if (this.$isNull(this.modelForm.storeId)) {
        this.$notify.error({
          title: this.$t("error"),
          message: '请选择所属部门'
        });
        return;
      }
      if (this.$isNull(this.modelForm.distributorId)) {
        this.$notify.error({
          title: this.$t("error"),
          message: '请选择导购'
        });
        return;
      }
      highSeas.push(this.details.id)
      DistributionShoppers({
        "highSeasCustomerId": highSeas, // 公海会员ID
        "shoppingGuideId": this.modelForm.distributorId // 店员ID
      }).then(res => {
        if (res.code == 0) {
          this.init();
          this.clearModel();
          this.$notify({
            title: this.$t("success"),
            message: this.$t("op_success"),
            type: "success"
          });
        } else {
          this.$formatDate(res.message, false)
        }
      });
    },
    clearModel () { // 隐藏弹框
      this.modelForm.storeId = '';
      this.modelForm.distributorId = '';
      this.dialogDriverInfoVisible = false;
    },
    searchData () {
      this.drawer = true;
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
