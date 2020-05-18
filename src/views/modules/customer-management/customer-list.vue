<template>
  <d2-container class="page">
    <h3 class="list-title">客户列表</h3>
    <el-row :gutter="24"
            style="margin-bottom:20px;">
      <el-col :span="24"
              style="padding-top:8px">
        <el-button size="mini"
                   type="primary"
                   icon="el-icon-circle-plus-outline"
                   @click="addCustomer">添加客户</el-button>
        <el-button size="mini"
                   type="primary"
                   icon="el-icon-search"
                   @click="siftingClient">筛选客户</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="exportClient(1)">导 出</el-button>
        <!-- <el-button size="mini"
                   type="primary">导 入</el-button> -->
      </el-col>
    </el-row>
    <el-row :gutter="24"
            style="margin-bottom:20px;">
      <!-- <el-col :span="2"
              style="padding-top:8px">已选中1项</el-col> -->
      <el-col :span="14"
              style="padding-top:8px">
        <el-button size="mini"
                   type="text"
                   icon="el-icon-circle-plus-outline"
                   @click="transferClient">转 移</el-button>
        <el-button size="mini"
                   type="text"
                   icon="el-icon-upload2"
                   @click="exportClient(2)">导出选中</el-button>
        <el-button size="mini"
                   type="text"
                   icon="el-icon-circle-plus-outline"
                   @click="highSeas">放入公海</el-button>
        <el-button size="mini"
                   type="text"
                   icon="el-icon-delete"
                   @click="delCustomer">删 除</el-button>
      </el-col>
    </el-row>

    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       fixed
                       width="55"></el-table-column>
      <el-table-column label="客户姓名"
                       fixed
                       width="120">
        <template slot-scope="scope">{{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column label="客户来源"
                       width="150">
        <template slot-scope="scope">{{ scope.row.sourceName }}</template>
      </el-table-column>
      <el-table-column label="手机号"
                       width="150">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="负责人"
                       width="120">
        <template slot-scope="scope">{{ scope.row.shoppingGuide }}</template>
      </el-table-column>
      <el-table-column label="角 色"
                       width="150">
        <template slot-scope="scope">{{ scope.row.role }}</template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="180">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="累计订单"
                       width="80">
        <template slot-scope="scope">{{ scope.row.orderQt }}</template>
      </el-table-column>
      <el-table-column label="累计消费(元)"
                       width="120">
        <template slot-scope="scope">{{ scope.row.consume }}</template>
      </el-table-column>
      <el-table-column label="服务方式"
                       width="150">
        <template slot-scope="scope">{{ scope.row.serviceMode }}</template>
      </el-table-column>
      <el-table-column label="行业划分"
                       width="150">
        <template slot-scope="scope">{{ scope.row.industry }}</template>
      </el-table-column>
      <el-table-column label="操 作"
                       width="220"
                       fixed="right"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleDetails(scope.$index, scope.row)">详 情</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleTransfer(scope.$index, scope.row)">转 移</el-button>
          <el-button size="mini"
                     type="text"
                     style="color:#F56C6C"
                     @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <!-- Drawer 抽屉 -->
    <el-drawer title="筛 选"
               :visible.sync="dialog"
               direction="rtl"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-row :gutter="24"
                style="margin-bottom:20px;">
          <el-form size="mini"
                   :model="form"
                   label-width="120px">
            <el-form-item label="客户名称:">
              <el-col :span="13">
                <el-input v-model="form.name"
                          autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-col :span="13">
                <el-input v-model="form.phone"
                          autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="客户来源:">
              <el-col :span="20">
                <el-select v-model="form.source"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in selectSeach.unknown"
                             :key="item.id"
                             :label="item.label"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="服务方式:">
              <el-col :span="20">
                <el-select v-model="form.serviceMode"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in selectSeach.ServiceTypeList"
                             :key="item.label"
                             :label="item.label"
                             :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="行业细分:">
              <el-col :span="20">
                <el-select v-model="form.subdivide"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in selectSeach.IndustryTypeList"
                             :key="item.label"
                             :label="item.label"
                             :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="部门:">
              <el-col :span="20">
                <el-select v-model="form.storeId"
                           clearable
                           @change="search_store"
                           placeholder="请选择">
                  <el-option v-for="item in treeData"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="负责人:">
              <el-col :span="20">
                <el-select v-model="form.distributorId"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in clerkList"
                             :key="item.id"
                             :label="item.nickname"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-form>
        </el-row>
        <div class="demo-drawer__footer"
             style="text-align:center;">
          <el-button size="mini"
                     type="primary"
                     @click="drawerSure">筛 选</el-button>
          <el-button size="mini"
                     @click="cancelForm">重 置</el-button>
          <el-button size="mini"
                     @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- Dialog 弹框客户新增 -->
    <el-dialog title="客 户"
               width="35%"
               :visible.sync="dialogFormVisible">
      <el-form size="mini"
               :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="客户姓名"
                      prop="name">
          <el-col :span="11">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="phone">
          <el-col :span="11">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客户来源"
                      prop="source">
          <el-col :span="11">
            <el-select v-model="ruleForm.source"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in selectList.unknown"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-col :span="11">
            <el-select v-model="ruleForm.storeId"
                       clearable
                       @change="searchStore"
                       placeholder="请选择">
              <el-option v-for="item in treeData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人">
          <el-col :span="11">
            <el-select v-model="ruleForm.distributorId"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in clerkList"
                         :key="item.id"
                         :label="item.nickname"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="服务方式"
                      prop="serviceMode">
          <el-col :span="11">
            <el-select v-model="ruleForm.serviceMode"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in selectList.ServiceTypeList"
                         :key="item.label"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="行业细分"
                      prop="subdivide">
          <el-col :span="11">
            <el-select v-model="ruleForm.subdivide"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in selectList.IndustryTypeList"
                         :key="item.label"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="submitForm('ruleForm')">确 定</el-button>
        <el-button size="mini"
                   @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 点击分配/放入公海按钮 -->
    <el-dialog width="35%"
               title="操 作"
               :visible.sync="dialogDriverInfoVisible">
      <el-form :model="modelForm"
               label-position="left"
               label-width="100px">
        <el-form-item label="所属部门">
          <el-select v-model="modelForm.storeId"
                     clearable
                     size="mini"
                     @change="allocation_Store"
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

import {
  UstomerList,
  NewCustomer,
  CustomerDetails,
  ModifyCustomer,
  DistributionShoppers,
  backHighSeas,
  DelCustomer,
} from "@/api/customer-management/customer";
import { list, userList } from '@/api/permission'
import selectList from "./data";
import { mapState } from "vuex";
import configUrl from "@/api/configUrl";
export default {
  name: 'customerList',
  components: {},
  data () {
    var validatePhone = (rule, value, callback) => {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else if (!myreg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'));
      } else {
        callback();
      }
    };
    return {
      keyword: '',
      currentPage: 1,
      total: 0,
      selectList: {},
      selectSeach: {},
      details: null,
      dialogDriverInfoVisible: false,
      dialogFormVisible: false,
      multipleSelection: [],
      tableData: [],
      dialog: false,
      loading: false,
      form: {
        source: '',
        name: '',
        phone: '',
        storeId: '',
        distributorId: '',
        serviceMode: '',
        subdivide: ''
      },
      modelForm: {
        storeId: null,
        distributorId: null,
      },
      ruleForm: {
        id: '',
        source: '',
        name: '',
        phone: '',
        storeId: '',
        distributorId: '',
        serviceMode: '',
        subdivide: ''
      },
      rules: {
        source: [{ required: true, message: '请选择客户来源', trigger: 'change' }],
        name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        // storeId: [{ required: true, message: '请选择门店', trigger: 'change' }],
        // distributorId: [{ required: true, message: '请选择分销员', trigger: 'change' }],
        serviceMode: [{ required: true, message: '请选择服务方式', trigger: 'change' }],
        subdivide: [{ required: true, message: '请选择行业细分', trigger: 'blur' }]
      },
      customerId: [],
      storetype: 1,
      storeId: '',
      clerkList: [],
      options: [],
      pageOrder: 1,
      highSeasId: [], // 转移功能客户id放置处
      delCustomerId: '', //删除id放置处
      highSeastype: 1,
      multipleSelectionobj: {},
      treeData: [],
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    this.selectList = { ...selectList };
    this.selectSeach = { ...selectList };
    localStorage.setItem('multipleSelectionobj', JSON.stringify(this.multipleSelectionobj))
    this.customerListInterface(1);
    this.getList();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {

    getList () {
      this.treeData = [];
      list({
        page: 1,
        size: 1000
      }).then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length > 0) {
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
    allocation_Store () {
      this.modelForm.distributorId = '';
      let storeId = '';
      if (!this.$isNull(this.modelForm.storeId)) {
        storeId = this.modelForm.storeId
      }
      this.getUserList(storeId);
    },
    searchStore () {
      this.ruleForm.distributorId = '';
      let storeId = '';
      if (!this.$isNull(this.ruleForm.storeId)) {
        storeId = this.ruleForm.storeId
      }
      this.getUserList(storeId);
    },
    search_store () {
      this.form.distributorId = '';
      let storeId = '';
      if (!this.$isNull(this.form.storeId)) {
        storeId = this.form.storeId
      }
      this.getUserList(storeId);
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
            // if (res.data.data.length > 0) {
            //   res.data.data.map((item, index) => {
            //     item.num = index + 1 + (page - 1) * 10;
            //     this.tableData.push(item);
            //   });
            // }
          }
        }
      });
    },
    clearSearch () {
      // 点击清除按钮
      console.log(this.keyword, '点击清除按钮')
    },
    search () {
      // 点击搜索按钮
      console.log(this.keyword, '点击搜索按钮')
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.storetype = 2;
      this.dialogFormVisible = true;
      CustomerDetails({ id: row.id }).then(res => {
        console.log(res, '查询详情进行回显')
        if (res.code == 0) {
          let option = res.data;
          this.ruleForm = {
            id: option.id,
            source: option.sourceId,
            name: option.name,
            phone: option.phone,
            storeId: option.departmentId,
            distributorId: option.shoppingGuideId,
            serviceMode: option.serviceMode,
            subdivide: option.industry
          }
        }
      })

    },
    handleDetails (index, row) {
      // 点击详情按钮 
      console.log(index, row)
      this.$router.push({
        name: "customer-details", // 路径
        query: { id: row.id } // 参数
      });
    },
    transferClient () {
      // 批量转移
      this.highSeasId = []
      this.highSeastype = 1
      this.modelForm.leaderId = null;
      let data = this.export_client();
      console.log(data, 'this.export_client()')
      if (!data && !data.length) {
        return;
      } else if (data.length) {
        this.highSeasId = data;
        this.dialogDriverInfoVisible = true;
      }
    },
    handleTransfer (index, row) {
      // 点击转移
      this.highSeasId = []
      this.details = row;
      this.highSeastype = 1
      this.modelForm.leaderId = null;
      this.dialogDriverInfoVisible = true;
      this.highSeasId.push(row.id)
    },
    sendModelData () {
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
      if (this.highSeastype == 1) {
        DistributionShoppers({
          "highSeasCustomerId": this.highSeasId, // 公海会员ID
          "shoppingGuideId": this.modelForm.distributorId // 店员ID
        }).then(res => {
          if (res.code == 0) {
            this.customerListInterface(1);
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
      } else {
        backHighSeas({
          highSeasCustomerId: this.highSeasId, // 公海会员ID
          shoppingGuideId: this.modelForm.distributorId // 店员ID
        }).then(res => {
          console.log(res, '点击放入公海');
          if (res.code == 0) {
            this.customerListInterface(1);
            this.clearModel();
            this.$notify({
              title: this.$t("success"),
              message: this.$t("op_success"),
              type: "success"
            });
          } else {
            this.$formatDate(res.message, false)
          }
        })
      }

    },
    clearModel () { // 隐藏弹框
      this.modelForm.storeId = '';
      this.modelForm.distributorId = '';
      this.dialogDriverInfoVisible = false;
    },
    highSeas () {
      // 点击放入公海
      // 批量转移
      this.highSeasId = []
      this.highSeastype = 2
      this.modelForm.leaderId = null;
      let data = this.export_client();
      console.log(data, 'this.export_client()')
      if (!data && !data.length) {
        return;
      } else if (data.length) {
        this.highSeasId = data;
        this.dialogDriverInfoVisible = true;
      }
    },
    delCustomer () {
      // 点击批量删除
      let data = this.export_client();
      console.log(data, 'this.export_client()')
      if (!data && !data.length) {
        return;
      } else if (data.length) {
        this.delCustomerId = data.join(',');
      }
      this.delInterface()
    },
    handleDelete (index, row) {
      // 点击单个删除
      console.log(index, row);
      this.delCustomerId = row.id
      this.delInterface()
    },
    delInterface () {
      // 删除接口
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DelCustomer({ id: this.delCustomerId }).then(res => {
            if (res.code == 0) {
              this.customerListInterface(1);
            } else {
              this.$notifyFrame(res.message, false);
            }
            console.log()
          })
        })
        .catch(() => { });
    },
    siftingClient () { // 点击筛选客户按钮
      this.dialog = true
    },
    export_client () {
      // 点击选择导出
      // this.exportList(2);
      let data = []
      this.customerId = []
      let obj = JSON.parse(JSON.stringify(this.multipleSelectionobj));
      console.log(obj, 'obj-----')
      for (let i in obj) {
        console.log(obj[i], 'obj-----====')
        if (obj[i].length) {
          obj[i].map(item => {
            data.push(item.id)
          })
        }
      }
      if (!data.length) {
        this.$notifyFrame('请先选择客户', false);
        return;
      }
      return data;
      console.log(data, 'data==data----data')

    },
    exportClient (e) {
      // 点击导出按钮
      let option = {
        status: 2,
      };
      if (this.form.name) {
        option.name = this.form.name;
      }
      if (this.form.phone) {
        option.phone = this.form.phone;
      }
      if (this.form.source) {
        option.sourceId = this.form.source;
      }
      if (this.form.serviceMode) {
        option.serviceMode = this.form.serviceMode;
      }
      if (this.form.subdivide) {
        option.industry = this.form.subdivide;
      }
      if (this.form.storeId) {
        option.departmentId = this.form.storeId;
      }
      if (this.form.distributorId) {
        option.shoppingGuideId = this.form.distributorId;
      }
      let data = this.export_client();
      console.log(data, 'this.export_client()')
      if (e == 2 && !data.length) {
        return;
      } else if (e == 2 && data.length) {
        option.memberId = data.join(',');
      }
      let url = "?";
      let num = 0;
      for (let i in option) {
        num += 1;
        url += i + "=" + option[i];
        if (num < Object.keys(option).length) {
          url += "&";
        }
      }
      window.open(configUrl.ajax_url + 'member/seas/export' + url);
    },

    exportList () { },

    addCustomer () {
      // 点击添加客户
      this.ruleForm = {
        id: '',
        source: '',
        name: '',
        phone: '',
        storeId: '',
        distributorId: '',
        serviceMode: '',
        subdivide: ''
      };
      this.storetype = 1;
      this.dialogFormVisible = true;
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let option = {
            status: 2,
            createUser: this.info.nickname, // 当前登录人
            createUserId: this.info.id, // 当前登录人id
            industry: this.ruleForm.subdivide, // 行业细分
            name: this.ruleForm.name, // 姓名
            phone: this.ruleForm.phone, // 手机号
            departmentId: this.ruleForm.storeId, // 所属门店Id
            shoppingGuideId: this.ruleForm.distributorId, // 负责人Id
            serviceMode: this.ruleForm.serviceMode, // 服务方式
            sourceId: this.ruleForm.source, // 客户来源ID
            sourceName: '', // 客户来源
          }
          this.selectList.unknown.map(res => {
            if (res.id == this.ruleForm.source) {
              option.sourceName = res.label;
            }
          })
          console.log(this.ruleForm, 'ruleForm===ruleForm', option)
          if (this.storetype == 1) {
            NewCustomer(option).then(res => {
              if (res.code == 0) {
                console.log(res, '成功')
                this.dialogFormVisible = false;
                this.customerListInterface(1);
                this.$refs[formName].resetFields();
              } else {
                this.$formatDate(res.message, false)
              }
            })
          } else {
            option.id = this.ruleForm.id;
            ModifyCustomer(option).then(res => {
              if (res.code == 0) {
                console.log(res, '成功')
                this.dialogFormVisible = false;
                this.customerListInterface(1);
                this.$refs[formName].resetFields();
              } else {
                this.$formatDate(res.message, false)
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      localStorage.setItem('multipleSelectionobj', JSON.stringify({}))
    },

    cancel () {
      // 取消
      this.loading = false;
      this.dialog = false;
    },
    cancelForm () { // 点击重置按钮
      this.form = {
        source: '',
        name: '',
        phone: '',
        storeId: '',
        distributorId: '',
        serviceMode: '',
        subdivide: ''
      }
      localStorage.setItem('multipleSelectionobj', JSON.stringify({}))
      this.customerListInterface(1);
    },
    drawerSure () { // 点击确认
      localStorage.setItem('multipleSelectionobj', JSON.stringify({}))
      this.customerListInterface(1);
    },

    handleSelectionChange (val) {
      this.multipleSelectionobj[this.pageOrder.toString()] = []
      if (val.length) this.multipleSelectionobj[this.pageOrder.toString()] = val
    },
    handleCurrentChange (e) {
      // 点击分页
      this.pageOrder = e;
      localStorage.setItem('multipleSelectionobj', JSON.stringify(this.multipleSelectionobj))
      console.log(e, '点击分页')
      this.customerListInterface(e);
    },
    // 客户列表接口
    customerListInterface (e) {
      this.tableData = [];
      let option = {
        page: e,
        size: 10,
        status: 2,
      }

      if (this.form.name) {
        option.name = this.form.name;
      }
      if (this.form.phone) {
        option.phone = this.form.phone;
      }
      if (this.form.source) {
        option.sourceId = this.form.source;
      }
      if (this.form.serviceMode) {
        option.serviceMode = this.form.serviceMode;
      }
      if (this.form.subdivide) {
        option.industry = this.form.subdivide;
      }
      if (this.form.storeId) {
        option.departmentId = this.form.storeId;
      }
      if (this.form.distributorId) {
        option.shoppingGuideId = this.form.distributorId;
      }
      UstomerList(option).then(res => {
        console.log(res, '客户列表接口')
        if (res.code == 0) {
          this.loading = false;
          this.dialog = false;
          this.tableData = res.data.data;
          if (res.data.data) {
            res.data.data.map(item => {
              item.role = ''
              if (item.shoppingGuideId) { // 导购
                item.role = '导购'
              } else if (item.distributor) {// 分销
                item.role = '分销'
              }
              item.consume = (item.consume / 100).toFixed(2);
              item.createTime = this.$formatDate(new Date(item.createTime), "yyyy-MM-dd hh:mm:ss");
            })
            let multipleobj = JSON.parse(localStorage.getItem('multipleSelectionobj'))
            if (this.multipleSelectionobj.hasOwnProperty(e)) { // 选判断这个对象有没有这个键(有)回显
              this.echoSelection(multipleobj)
            } else { // (无)创建一个
              this.multipleSelectionobj[e.toString()] = []
            }
          }
          this.total = res.data.total;
          this.currentPage = res.data.page;
        }
      })
    },
    echoSelection (multipleobj) {
      const that = this
      const array = multipleobj[this.pageOrder.toString()] || []
      if (array.length) {
        setTimeout(() => {
          that.tableData.map((item, index) => {
            array.map(val => {
              if (item.id == val.id) {
                that.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
          })
        }, 300)
      }
      this.multipleSelectionobj = JSON.parse(JSON.stringify(multipleobj))
    },
  }
}
</script>
<style lang="scss" scoped>
</style>

