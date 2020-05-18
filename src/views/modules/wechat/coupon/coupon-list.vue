<template>
  <d2-container class="page">
    <!-- <h3 class="list-title">{{ $t('wechat.coupon.couponList') }}</h3> -->
    <el-row :gutter="24">
      <el-col :span="2">
        <div class="grid-content1">
          <el-button size="mini" type="primary" @click="addCouClick">{{ $t('wechat.coupon.Add') }}</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="left">{{ $t('wechat.coupon.type') }}</div>
          <div class="right">
            <el-select
              v-model="cardType"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="cardTypeChange"
            >
              <el-option
                v-for="item in cardTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="left">{{ $t('wechat.coupon.status') }}</div>
          <div class="right">
            <el-select
              v-model="cardStatus"
              style="width:100%;"
              clearable
              :placeholder="$t('oss.qcloudRegionTips')"
              size="mini"
              @change="cardTypeChange"
            >
              <el-option
                v-for="item in cardStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="table">
      <tableMobCopy
        ref="table_mob"
        :table-data="tableData"
        :table-config="tableConfig"
        @sendData="getTableData"
      >
        <!-- <template v-slot:operating>
        <el-button  type="text">{{$t('update')}}</el-button>
        <el-button @click="integralThis('look')" type="text">{{$t('look')}}</el-button>
        <el-button style="color:#f56c6c;" type="text">{{$t('delete')}}</el-button>
        </template>-->
      </tableMobCopy>
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

    <!-- 添加卡券 -->
    <el-dialog title="创建卡券类型" :visible.sync="dialogVisible_kai" width="30%">
      <div class="container">
        <el-form ref="addCoupon" :model="addCouponObj" :rules="addCouponhRules" label-width="100px">
          <el-form-item prop="type" label="卡券类型">
            <el-radio-group v-model="addCouponObj.type">
              <el-radio label="折扣券" />
              <el-radio label="优惠券" />
              <el-radio label="代金券" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_kai = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="AddCoupon('addCoupon')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 投放 -->
    <el-dialog title="投放卡券（微信）" :visible.sync="dialogVisible" width="30%">
      <div class="container">
        <el-form ref="ruleForm" :model="LaunchFrom" :rules="LaunchRules" label-width="200px">
          <el-form-item prop="type" label="你可以通过以下方式投放：">
            <el-radio-group v-model="LaunchFrom.type" size="mini">
              <el-radio label="直接群发卡券（群发消息）" />
              <el-radio label="二维码发放" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveLaunch('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 二维码 -->
    <el-dialog title="二维码" :visible.sync="dialogVisible_1" width="30%">
      <div class="container">
        <el-form label-position="top" :model="qrcode" label-width="200px" size="mini">
          <el-form-item label="你可以通过以下方式投放:">
            <img :src="qrcode.img">
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="xiazaiER">下载</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible_1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="库存" :visible.sync="dialogVisible_kuncun" width="30%">
      <div class="container">
        <el-form label-width="100px" label-position="left">
          <el-form-item prop="type" label="卡券类型">
            <el-radio-group v-model="kucunFrom">
              <el-radio label="1">自动生成</el-radio>
              <el-radio label="2">导入</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="kucunFrom == '1'">
            <el-radio-group v-model="kucunAdd">
              <el-radio label="1">增加</el-radio>
            </el-radio-group>
            <el-row>
              <el-col :span="10">
                <el-input v-model="addNumber" placeholder="请输入" type="number" />
              </el-col>
              <el-col :offset="1" :span="13">
                <span>张</span>
                <span style="margin-left:20px;color:#999;">库存不能少于1张</span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item v-if="kucunFrom == '2'">
            <el-upload
              ref="upload"
              class="upload-demo"
              :action="uploadUrl"
              :file-list="fileList"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              accept=".xls, .xlsx"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">上传code</el-button>
              <div slot="tip" class="el-upload__tip">请导入Excel格式的code</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clear_kuncun">取消</el-button>
        <el-button v-if="kucunFrom == 1 || kucunFrom == 2" type="primary" @click="save_kuncun">确定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import tableMobCopy from '@/components/GPMob/tableMobCopy'
import couponTableConfig from '@/tableConfigs/wechat/couponTableConfig'
import {
  couponList,
  couponType,
  couponStatus,
  qrcodeLaunch,
  deleteCoupon,
  autoCreateCodes
} from '@/api/wechat/coupon'
import configUrl from '@/api/configUrl'
import dayjs from 'dayjs'
// import { type } from 'os'

export default {
  name: 'Coupon',
  components: { tableMobCopy },
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      tableConfig: {},
      cardStatusObj: {
        '1': '待核审',
        '2': '待投放',
        '3': '已投放',
        '4': '已删除',
        '5': '审核失败'
        // '6': '正在导入'
      },
      type: {
        CASH: '代金券',
        DISCOUNT: '折扣券',
        GENERAL_COUPON: '优惠券',
        GROUPON: '团购券',
        GIFT: '兑换券'
      },
      cardType: '',
      cardTypeList: [],
      cardStatus: '',
      cardStatusList: [],
      dialogVisible: false,
      dialogVisible_1: false,
      LaunchFrom: {
        type: ''
      },
      LaunchRules: {
        type: [{ required: true, message: '请选择投放方式', trigger: 'change' }]
      },
      addCouponhRules: {
        type: [
          {
            required: true,
            message: '请选择需要创建的卡券类型',
            trigger: 'change'
          }
        ]
      },
      coupon: null,
      qrcode: {},
      dialogVisible_kai: false,
      addCouponObj: {
        type: ''
      },
      dialogVisible_kuncun: false,
      kucunFrom: null,
      kucunAdd: '1',
      addNumber: 1,
      upload_url: '',
      fileList: [],
      uploadUrl: null
    }
  },
  computed: {},
  created() {
    this.tableConfig = { ...couponTableConfig }
    this.getListData(1)
    this.getSelect1()
    this.getSelect()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getListData(page) {
      this.total = 0
      this.tableData = []
      // /获取卡券数据
      const data = {
        page: page,
        size: 10
      }

      if (!this.$isNull(this.cardType)) {
        data.cardType = this.cardType
      }

      if (!this.$isNull(this.cardStatus)) {
        data.status = this.cardStatus
      }

      couponList(data).then(res => {
        if (res.code == 0) {
          this.total = res.data.count
          this.currentPage = page
          if (res.data.wechatCouponListDOs.length > 0) {
            res.data.wechatCouponListDOs.map(res => {
              res.statusValue = this.cardStatusObj[res.status]
              res.cardTypeValue = this.type[res.cardType]
              if (res.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE') {
                if (res.beginTimestamp) {
                  res.Expirydate = `${dayjs(res.beginTimestamp * 1000).format(
                    'YYYY-MM-DD'
                  )} 至 ${dayjs(res.endTimestamp * 1000).format('YYYY-MM-DD')}`
                }
              }
              if (res.dateInfoType == 'DATE_TYPE_FIX_TERM') {
                if (res.fixedBeginTerm) {
                  res.Expirydate = `领取后${res.fixedBeginTerm}天生效,有效天数${res.fixedTerm}天`
                }
              }
              const option = res
              option.category = '微信'
              this.tableData.push(option)
            })
          }
        }
      })
    },
    getSelect() {
      couponType().then(res => {
        if (res.code == 0) {
          if (res.data.wechatCouponCardTypes.length > 0) {
            res.data.wechatCouponCardTypes.map(val => {
              const option = {}
              option.value = val.cardType
              option.label = val.name
              this.cardTypeList.push(option)
            })
          }
        }
      })
    },
    getSelect1() {
      couponStatus().then(res => {
        if (res.code == 0) {
          if (res.data.couponCardStatusList.length > 0) {
            res.data.couponCardStatusList.map(val => {
              const option = {}
              option.value = val.status
              option.label = val.name
              this.cardStatusList.push(option)
            })
          }
        }
      })
    },
    handleCurrentChange(e) {
      this.getListData(e)
    },
    cardTypeChange(e) {
      this.getListData(1)
    },
    getTableData(e) {
      console.log(e)
      var clickName = e.click_event.btn
      this.coupon = e.click_data
      if (clickName == '投放') {
        this.dialogVisible = true
      } else if (clickName == '删除') {
        this.delcoupon()
      } else if (clickName == '详情') {
        this.$router.push({
          name: 'wechat-coupon-couponHandle',
          query: {
            id: this.coupon.id,
            type: 'look'
          }
        })
      } else if (clickName == '编辑') {
        this.$router.push({
          name: 'wechat-coupon-couponHandle',
          query: {
            id: this.coupon.id,
            type: 'update'
          }
        })
      } else if (clickName == '库存') {
        this.dialogVisible_kuncun = true
        this.uploadUrl =
          configUrl.ajax_url +
          'wechat/couponCode/importCodeExcle/' +
          this.coupon.id
      }
      // else if (clickName == '库存') { }
    },
    addCouClick() {
      this.dialogVisible_kai = true
    },
    AddCoupon(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let type = ''
          if (this.addCouponObj.type == '折扣券') {
            type = 'discount'
          } else if (this.addCouponObj.type == '优惠券') {
            type = 'reduced'
          } else if (this.addCouponObj.type == '代金券') {
            type = 'cash'
          }
          this.$router.push({
            name: 'wechat-coupon-addCoupon',
            query: {
              type: type
            }
          })
        } else {
          return false
        }
      })
    },
    saveLaunch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.LaunchFrom.type == '二维码发放') {
            this.dialogVisible = false
            qrcodeLaunch({
              channelId: 0,
              couponId: this.coupon.id
            }).then(res => {
              if (res.code == 0) {
                this.dialogVisible_1 = true
                this.qrcode.img = this.$fileUrl() + res.data[0].url
              }
            })
          }
        } else {
          return false
        }
      })
    },
    xiazaiER() {
      window.open(this.qrcode.img)
    },
    delcoupon() {
      this.$confirm('确定删除此卡券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCoupon({
            couponId: this.coupon.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })

              this.tableData.map((val, index) => {
                if (val.id == this.coupon.id) {
                  this.tableData.splice(index, 1)
                }
              })
            }
          })
        })
        .catch(() => {})
    },
    clear_kuncun() {
      this.dialogVisible_kuncun = false
      this.kucunFrom = null
      this.addNumber = 1
    },
    save_kuncun() {
      if (this.kucunFrom == 1) {
        if (this.$isNull(this.addNumber)) {
          this.$notify.error({
            title: '错误',
            message: '请输入增加库存量'
          })
          return
        }
        autoCreateCodes({
          couponId: this.coupon.id,
          quantity: this.addNumber
        }).then(res => {
          if (res.code == 0) {
            this.clear_kuncun()
            this.getListData(this.currentPage)
          }
        })
      } else {
        this.$refs.upload.submit()
      }
    },
    uploadSuccess(res) {
      if (res.code == 0) {
        this.dialogVisible_kuncun = false
        this.$notify({
          title: '成功',
          message: '上传成功,正在导入',
          type: 'success'
        })
      }
    },
    uploadError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    beforeUpload(file) {
      // console.log('beforeUploadf',file)
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      if (!extension && !extension2) {
        this.$notify.error({
          title: '错误',
          message: '只能上传 xls、xlsx 格式文件'
        })
      }
      return extension || extension2
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.table {
  width: 100%;
  margin-top: 30px;
}
.grid-content {
  width: 100%;
  height: 35px;
  display: flex;
  .left {
    width: 60px;
    line-height: 30px;
    color: #333333;
  }
  .right {
    flex: 1;
  }
}
.grid-content1 {
  width: 100%;
  height: 35px;
  float: left;
}
</style>

