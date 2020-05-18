<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('wechat.coupon.couponList') }}</h3>

    <el-row :gutter="24">
      <el-col :span="3">
        <el-button size="mini" type="primary" @click="addCouClick">{{
          $t('wechat.coupon.Add')
        }}</el-button>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">{{ $t('wechat.coupon.type') }}</div>
          <div class="right">
            <el-select
              v-model="cardType"
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
      <el-col :span="7">
        <div class="grid-content1">
          <div class="left">{{ $t('card') + $t('mail.name') }}</div>
          <div class="right">
            <el-input
              v-model="couponTitleOrId"
              :placeholder="$t('p')"
              clearable
              size="mini"
              class="input-with-select"
              @clear="clearKeyWOrd"
            >
              <el-button
                slot="append"
                size="mini"
                icon="el-icon-search"
                @click="search"
              />
            </el-input>
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
    <el-dialog
      :title="$t('coupons.create') + $t('wechat.coupon.type')"
      :visible.sync="dialogVisible_kai"
      width="30%"
    >
      <div class="container">
        <el-form
          ref="addCoupon"
          :model="addCouponObj"
          label-width="100px"
          label-position="left"
        >
          <el-form-item :label="$t('wechat.coupon.type')">
            <el-row>
              <el-col :span="24">
                <el-radio-group v-model="addCouponObj.type">
                  <el-radio
                    :label="$t('discountCoupon')"
                    style="margin-bottom:10px"
                  />
                  <el-radio :label="$t('GIFT')" style="margin-bottom:10px" />
                  <el-radio :label="$t('voucher')" style="margin-bottom:10px" />
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_kai = false"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="AddCoupon('addCoupon')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="库存" :visible.sync="dialogVisible_kuncun" width="30%">
      <div class="container">
        <el-form label-width="100px" label-position="left">
          <el-form-item prop="type" label="卡券类型">
            <el-radio-group v-model="kucunAdd">
              <el-radio label="1">增加</el-radio>
            </el-radio-group>
            <el-row>
              <el-col :span="10">
                <el-input
                  v-model="addNumber"
                  placeholder="请输入"
                  min="1"
                  type="number"
                />
              </el-col>
              <el-col :offset="1" :span="13">
                <span>张</span>
                <span style="margin-left:20px;color:#999;"
                  >库存不能少于1张</span
                >
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clear_kuncun">取消</el-button>
        <el-button type="primary" @click="save_kuncun">确定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import tableMobCopy from '@/components/GPMob/haxnbauer/tableMobCopy'
import couponTableConfig from '@/tableConfigs/marketing/haxnbauer-coupon/couponTableConfig'
import {
  couponStatus,
  qrcodeLaunch,
  deleteCoupon,
  autoCreateCodes,
  setNewCoupons,
} from '@/api/marketing/coupon'
import axios from 'axios'
import configUrl from '@/api/configUrl'
import { couponList } from './haxnbauer-api'
import { SSL_OP_NO_TLSv1_1 } from 'constants'
import { mapState } from 'vuex'

import { cookieGet } from '@/common/cookie'
export default {
  name: 'MarketingCouponList',
  components: { tableMobCopy },
  data() {
    return {
      couponTitleOrId: null,
      currentPage: 1,
      total: 0,
      tableData: [],
      tableConfig: {},

      cardType: '',
      cardTypeList: [],
      cardStatus: '',
      cardStatusList: [],
      dialogVisible: false,
      dialogVisible_1: false,
      LaunchFrom: {
        type: '',
      },
      LaunchRules: {
        type: [
          { required: true, message: '请选择投放方式', trigger: 'change' },
        ],
      },
      addCouponhRules: {
        type: [
          {
            required: true,
            message: '请选择需要创建的卡券类型',
            trigger: 'change',
          },
        ],
      },
      coupon: null,
      qrcode: {},
      dialogVisible_kai: false,
      addCouponObj: {
        type: '折扣券',
        wechatFlag: '0',
        codeLaunchType: '1',
      },
      dialogVisible_kuncun: false,
      kucunFrom: 1,
      kucunAdd: '1',
      addNumber: 1,
      upload_url: '',
      fileList: [],
      uploadUrl: null,
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info']),
  },
  created() {
    this.tableConfig = { ...couponTableConfig }
    this.getListData(1)
    this.getSelect1()
    this.getSelect()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    clearKeyWOrd() {
      this.getListData(1)
    },
    search() {
      this.getListData(1)
    },
    getListData(page) {
      this.total = 0
      this.tableData = []
      // /获取卡券数据
      const data = {
        page: page,
        size: 10,
      }

      if (!this.$isNull(this.cardType)) {
        data.cardType = this.cardType
      }

      if (!this.$isNull(this.cardStatus)) {
        data.status = this.cardStatus
      }

      if (!this.$isNull(this.couponTitleOrId)) {
        data.couponTitleOrId = this.couponTitleOrId
      }

      couponList(data).then((res) => {
        console.log('couponList-API', res)
        this.total = res.data.count
        this.currentPage = page
        this.tableData = this.tableData.concat(res.data.couponList)
      })
    },
    getSelect() {
      axios({
        method: 'get',
        url: configUrl.ajax_url + 'marketing/coupon/cardType',
        headers: {
          Accept: 'application/json',
          'X-Channel': JSON.parse(cookieGet('Httpheader')).ChannelId,
          'X-Channel-Type': SSL_OP_NO_TLSv1_1,
          'Content-Security-Policy': 'upgrade-insecure-requests',
          'X-Security-Feign': true,
        },
        params: {},
      }).then((result) => {
        var res = result.data
        console.log(res)
        if (res.code == 0) {
          if (res.data.couponCardTypes.length > 0) {
            res.data.couponCardTypes.map((val) => {
              const option = {}
              option.value = val.type
              option.label = val.name
              this.cardTypeList.push(option)
            })
          }
        }
      })
    },
    getSelect1() {
      axios({
        method: 'get',
        url: configUrl.ajax_url + 'marketing/coupon/cardStatus',
        headers: {
          Accept: 'application/json',
          'X-Channel': configUrl.channelId,
          'X-Channel-Type': SSL_OP_NO_TLSv1_1,
          'Content-Security-Policy': 'upgrade-insecure-requests',
          'X-Security-Feign': true,
        },
        params: {},
      }).then((result) => {
        var res = result.data
        console.log(res)
        if (res.code == 0) {
          if (res.data.couponCardStatusList.length > 0) {
            res.data.couponCardStatusList.map((val) => {
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
      // console.log(e)
      var clickName = e.click_event.btn
      this.coupon = e.click_data
      if (clickName == '投放') {
        this.dialogVisible = true
      } else if (clickName == '删除') {
        this.delcoupon()
      } else if (clickName == '导出') {
        this.exportCcoupon()
      } else if (clickName == '详情') {
        this.$router.push({
          name: 'haxnbauer-add-couponHandle',
          query: {
            id: this.coupon.id,
            type: 'look',
          },
        })
      } else if (clickName == '编辑') {
        this.$router.push({
          name: 'haxnbauer-add-couponHandle',
          query: {
            id: this.coupon.id,
            type: 'update',
          },
        })
      } else if (clickName == '库存') {
        this.dialogVisible_kuncun = true
        this.uploadUrl =
          configUrl.ajax_url +
          'marketing/couponCode/importCodeExcle/' +
          this.coupon.id
      }
      // else if (clickName == '库存') { }
    },
    addCouClick() {
      this.dialogVisible_kai = true
    },
    AddCoupon(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let type = ''
          if (
            this.addCouponObj.type == '折扣券' ||
            this.addCouponObj.type == 'Discount coupon'
          ) {
            type = 'discount'
          } else if (
            this.addCouponObj.type == '礼品券' ||
            this.addCouponObj.type == 'GIFT'
          ) {
            type = 'reduced'
          } else if (
            this.addCouponObj.type == '代金券' ||
            this.addCouponObj.type == 'Voucher'
          ) {
            type = 'cash'
          }

          const query = {
            type: type,
            wechatFlag: this.addCouponObj.wechatFlag,
          }

          if (this.addCouponObj.couponFlag) {
            // 是否强制微信领取
            query.couponFlag = 1
          } else if (this.addCouponObj.couponFlag == false) {
            query.couponFlag = 0
          }

          if (this.addCouponObj.wechatFlag == '1') {
            query.codeLaunchType = this.addCouponObj.codeLaunchType
          }

          this.$router.push({
            name: 'haxnbauer-add-coupons',
            query: query,
          })
        } else {
          return false
        }
      })
    },
    saveLaunch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.LaunchFrom.type == '二维码发放') {
            this.dialogVisible = false
            qrcodeLaunch({
              channelId: 0,
              couponId: this.coupon.id,
            }).then((res) => {
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
    exportCcoupon() {
      this.$confirm('确定导出此卡券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      })
        .then(() => {
          const url =
            configUrl.ajax_url +
            'marketing/coupon/code/front/exportCouponCode?couponId=' +
            this.coupon.id +
            '&wechatId=' +
            this.info.ChannelId

          window.open(url)
        })
        .catch(() => {})
    },
    delcoupon() {
      this.$confirm('确定删除此卡券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          var newData = {
            couponId: this.coupon.id,
            deleted: 1,
          }
          deleteCoupon({
            couponId: this.coupon.id,
          }).then((res) => {
            if (res.code == 0) {
              setNewCoupons(newData).then((res) => {
                if (res.code == 0) {
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                  })
                }
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
      this.kucunFrom = 1
      this.addNumber = 1
    },
    save_kuncun() {
      if (this.kucunFrom == 1) {
        if (this.$isNull(this.addNumber)) {
          this.$notify.error({
            title: '错误',
            message: '请输入增加库存量',
          })
          return
        }
        autoCreateCodes({
          couponId: this.coupon.id,
          quantity: this.addNumber,
        }).then((res) => {
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
          type: 'success',
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
          message: '只能上传 xls、xlsx 格式文件',
        })
      }
      return extension || extension2
    },
  },
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
  display: flex;
  .left {
    width: 60px;
    line-height: 28px;
    color: #333333;
  }
  .right {
    flex: 1;
  }
}
.grid-content1 {
  width: 100%;
  display: flex;
  .left {
    width: 60px;
    color: #333333;
    line-height: 28px;
  }
  .right {
    flex: 1;
  }
}
</style>
