<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('financial.information')}}</h3>
    <el-row class="record-header">
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.drawback')}}</p>
            <p class="header-div-mey">￥{{BasicOption.completed}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.ForRefund')}}</p>
            <p class="header-div-mey">￥{{BasicOption.pending}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8"
              :xs="24">
        <div class="header-box">
          <div class="header-div"></div>
          <div class="header-centent">
            <p class="header-div-title">{{$t('financial.Totalrefundamount')}}</p>
            <p class="header-div-mey">￥{{BasicOption.total}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="select-store">
      <el-col :span="20">
        {{$t('financial.YearMonth')}}:
        <el-date-picker size="mini"
                        v-model="value2"
                        type="daterange"
                        @change="changedate"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button size="mini"
                   type="primary"
                   v-if="info.storeId"
                   @click="newRefund(1)">{{$t('financial.newRefund')}}</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column :label="$t('financial.SN')">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.item')">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.accountStores')">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.amounts')">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column :label="$t('financial.memberName')">
        <template slot-scope="scope">{{ scope.row.refundPeople }}</template>
      </el-table-column>

      <el-table-column :label="$t('financial.Operator')">
        <template slot-scope="scope">{{ scope.row.operator }}</template>
      </el-table-column>
      <el-table-column :label="$t('schedule.status')">
        <template slot-scope="scope">{{ type[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column :label="$t('t')">
        <template slot-scope="scope">{{ scope.row.timeOfApplication }}</template>
      </el-table-column>
      <el-table-column :label="$t('handle')">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     v-if="scope.row.status==1 && info.storeId"
                     @click="handleAudit(2, scope.row)">审 核</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleEdit(3, scope.row)">查 看</el-button>
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

    <el-dialog width="40%"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               size="mini">
        <el-form-item :label="$t('financial.proposer')"
                      label-width="130px">
          <el-input v-model="form.name"
                    @change="blurInput"
                    :disabled="statusType!=1"
                    placeholder="输入会员编号，自动查找"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="储值账户"
                      label-width="135px">
          {{account}}
        </el-form-item>
        <el-form-item :label="$t('t')"
                      label-width="130px">
          <el-date-picker size="mini"
                          v-model="form.time"
                          type="month"
                          disabled
                          :placeholder="$t('order.date')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('financial.Storeaccount')"
                      label-width="130px">
          <el-input v-model="form.money"
                    placeholder="输入金额"
                    :disabled="statusType!=1"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账户"
                      label-width="130px">
          <el-input v-model="form.bank"
                    placeholder="输入银行账户"
                    :disabled="statusType!=1"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款人手机号"
                      label-width="130px">
          <el-input v-model="form.cellPhone"
                    placeholder="输入手机号"
                    autocomplete="off"
                    :disabled="statusType!=1"
                    maxlength="11"></el-input>
        </el-form-item>
        <el-form-item :label="$t('financial.Operator')"
                      label-width="130px">
          <p style="margin:0;">{{form.operator}}</p>
        </el-form-item>
        <el-form-item :label="$t('financial.cause')"
                      label-width="130px">
          <el-input v-model="form.cause"
                    type="textarea"
                    :disabled="statusType!=1"
                    placeholder="输入退款原因"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="statusType ==2"
                      :label="$t('schedule.status')"
                      label-width="130px">
          <p style="margin:0;">{{type[form.status]}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini"
                   type="primary"
                   v-if="statusType==1"
                   @click="submit()">提 交</el-button>
        <el-button size="mini"
                   type="primary"
                   v-if="statusType==2"
                   @click="submitAudit(2)">审核通过</el-button>
        <el-button size="mini"
                   type="primary"
                   v-if="statusType==2"
                   @click="submitAudit(3)">审核驳回</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>
<script>
import {
  RefundOrderList,
  MemberInfo,
  NewRefundOrder,
  BasicRefundInformation,
  RefundOrderDetails,
  ModifyOrder,
} from "@/api/financial/index";
import { mapState } from "vuex";
export default {
  name: '',
  components: {},
  data () {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      value2: '',
      dialogFormVisible: false,
      form: {
        applicant: '',
        time: '',
        money: '',
        bank: '',
        cellPhone: '',
        operator: '',
        cause: '',
        status: ''
      },
      account: '',
      memberoption: null,
      statusType: 1,
      type: {
        '1': '待审核',
        '2': '已退款',
        '3': '已驳回',
      },
      BasicOption: {},
      formData: {}
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  created () {
    console.log(this.info, 'cookie')
    this.refundListInterface(1);
    this.basicInformationInterface();
  },
  mounted () {

  },
  beforeDestroy () { },
  methods: {
    jude () {
      this.form = {
        applicant: '',
        time: '',
        money: '',
        bank: '',
        cellPhone: '',
        operator: '',
        cause: '',
        status: ''
      }
    },

    // 基础信息接口
    basicInformationInterface () {
      let option = {}
      if (this.info.storeId) {
        option.storeId = this.info.storeId;
      }
      BasicRefundInformation(option).then(res => {
        console.log(res, '基础信息接口')
        if (res.code == 0) {
          this.BasicOption = res.data;
          this.BasicOption.completed = this.toThousands(((res.data.completed) / 100).toFixed(2));
          this.BasicOption.pending = this.toThousands(((res.data.pending) / 100).toFixed(2));
          this.BasicOption.total = this.toThousands(((res.data.total) / 100).toFixed(2));

        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    // 退款列表接口
    refundListInterface (e) {
      let option = {
        page: e,
        size: 10,
      }
      if (this.value2) {
        option.startTime = this.value2[0];
        option.endTime = this.value2[1];
      }
      if (this.info.storeId) {
        option.storeId = this.info.storeId;
      }
      RefundOrderList(option).then(res => {
        console.log(res, '退款列表接口');
        if (res.code == 0) {
          if (res.data.data) {
            res.data.data.map(item => {
              item.amount = ((item.amount) / 100).toFixed(2);
              item.timeOfApplication = this.$formatDate(new Date(item.timeOfApplication), "yyyy-MM-dd");
            })
          }
          this.tableData = res.data.data;
          this.currentPage = res.data.page;
          this.total = res.data.total;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    // 通过会员卡号查询会员信息接口
    MemberInfoInterface (id) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      MemberInfo({ memberCard: id }).then(res => {
        loading.close();
        if (res.code == 0) {
          this.account = ((res.data.balance) / 100).toFixed(2);
          this.memberoption = res.data;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      }).catch((err) => {
        loading.close();
      })
    },
    submit () {
      // 点击弹框提交
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if ((this.form.money > this.account) || !this.form.money) {
        this.$notify.error({
          title: '错误',
          message: '请输入在余额之内的退款金额'
        });
        return;
      }
      if (!this.form.bank) {
        this.$notify.error({
          title: '错误',
          message: '请输入银行账户'
        });
        return;
      }
      if (!myreg.test(this.form.cellPhone)) {
        this.$notify.error({
          title: '错误',
          message: '请输入正确的手机号'
        });
        return;
      }
      let money = JSON.parse(JSON.stringify(this.form.money));
      this.NewRefundOrderInterface(money)
      console.log(this.form, '弹框提交')
    },


    NewRefundOrderInterface (money) {
      // 新建退款接口
      let datamoney = ((money * 100).toFixed(2)) * 1
      let option = {
        amount: datamoney, // 退款金额
        operator: this.info.nickname, // 操作人
        reason: this.form.cause, // 原因
        phone: this.form.cellPhone, // 手机号
        bankAccount: this.form.bank, // 银行账户
        memberCard: this.memberoption.memberCard, // 会员卡号
        memberId: this.memberoption.memberId, // 会员id
        refundPeople: this.memberoption.memberName, // 退款人
        storeId: this.memberoption.storeId, // 门店id
        storeName: this.memberoption.storeName, // 门店
        timeOfApplication: new Date().getTime(), // 申请时间
      }
      NewRefundOrder(option).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = false;
          this.refundListInterface(1)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    changedate () {
      // 点击选择日期
      this.refundListInterface(1);
    },
    submitAudit (i) { // i = 1通过 2驳回
      // this.formData
      // let option = {
      //   amount: '', // 退款金额
      //   bankAccount: '', // 银行账户
      //   memberCard: '', // 会员卡号
      //   memberId: '', // 会员id
      //   operator: '', // 操作人
      //   phone: '', // 手机号
      //   reason: '', // 原因
      //   refundPeople: '', // 退款人
      //   status: i, // 状态
      //   storeId: '', // 门店id
      //   storeName: '', // 门店
      //   timeOfApplication: '', // 申请时间
      // }
      this.formData.status = i;
      ModifyOrder(this.formData).then(res => {
        console.log(res, 'mmmmmm')
        if (res.code == 0) {
          this.dialogFormVisible = false;
          this.refundListInterface(1)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },

    newRefund (i) {
      // 点击新增按钮
      this.form = {
        applicant: '',
        time: '',
        money: '',
        bank: '',
        cellPhone: '',
        operator: '',
        cause: '',
        status: ''
      }
      let dateTime = this.$formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.form.time = dateTime;
      this.form.operator = this.info.nickname;
      this.statusType = i;
      this.dialogFormVisible = true;
    },
    handleAudit (index, row) {
      // 审核按钮
      this.dialogFormVisible = true;
      this.statusType = index;
      this.refundDetailsInterface(row.id);
    },
    handleEdit (index, row) {
      this.statusType = index;
      this.dialogFormVisible = true;
      console.log(index, row);
      this.refundDetailsInterface(row.id);
    },
    // 查看退款详情接口
    refundDetailsInterface (id) {
      RefundOrderDetails({
        id: id
      }).then(res => {
        console.log(res, '查看详情')
        if (res.code == 0) {
          this.account = ((res.data.amount) / 100).toFixed(2);
          let dateTime = this.$formatDate(new Date(res.data.timeOfApplication), "yyyy-MM-dd hh:mm:ss");
          this.form = {
            applicant: res.data.memberCard,
            time: dateTime,
            money: ((res.data.amount) / 100).toFixed(2),
            bank: res.data.bankAccount,
            cellPhone: res.data.phone,
            operator: res.data.operator,
            cause: res.data.reason,
            status: res.data.status
          }
          this.formData = JSON.parse(JSON.stringify(res.data))
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      })
    },
    handleCurrentChange (e) {
      // 点击分页
      this.refundListInterface(e);
    },
    blurInput (e) {
      // 弹框input失焦事件
      this.MemberInfoInterface(e);
    },
    toThousands (num) {
      let str = num.toString();
      let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?:\d{3})+$/g
      return str.replace(reg, "$1,")
    }
  }
}
</script>
<style lang="scss" scoped>
.record-header {
  text-align: center;
  margin-bottom: 20px;
}
.header-box {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  .header-div {
    width: 1px;
    height: 100%;
    background-color: #999;
  }
  .header-centent {
    width: 100%;
    text-align: center;
    font-size: 18px;
  }
}
.select-store {
  margin: 20px 0;
}
</style>

