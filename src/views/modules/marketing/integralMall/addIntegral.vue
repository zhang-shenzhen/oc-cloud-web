<template>
  <d2-container class="page">
    <div class="addIntegral">
      <div class="userTotal">
        {{
          integralType
            ? $t('edit') + $t('commoditys')
            : $t('add') + $t('commoditys')
        }}
      </div>
      <el-form :model="form" label-width="140px" style="width:760px;">
        <el-form-item size="mini" label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="productType" size="mini" label="name">
          <el-input v-model="form.international.name" />
        </el-form-item>
        <el-form-item
          size="mini"
          :label="$t('edit') + $t('member.filter.name')"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item size="mini" :label="$t('association') + $t('card')">
          <el-button
            v-if="!form.couponId"
            type="primary"
            size="mini"
            @click="dialongType = !dialongType"
            >{{ $t('choose') + $t('card') }}</el-button
          >
          <div v-else>
            <el-tag
              type="success"
              closable
              @close="
                () => {
                  form.couponId = null
                }
              "
              >{{ card.couponInfo.baseInfo.title }}</el-tag
            >
          </div>
        </el-form-item>

        <el-form-item size="mini" :label="$t('choose') + $t('rule')">
          <div style="display:flex">
            <el-input v-model="form.integral" />
            <div style="width:70px;">{{ $t('integral') }}</div>
          </div>
        </el-form-item>
        <el-form-item size="mini" :label="$t('convertible') + $t('q')">
          <el-input v-model="form.stock" />
        </el-form-item>
        <el-form-item
          v-if="LMBshowType"
          size="mini"
          :label="$t('mem') + $t('exclusive')"
        >
          <!-- multiple -->
          <el-select
            v-model="form.level"
            clearable
            style="width:100%"
            placeholder="请选择"
          >
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.levelName"
              :value="item.id"
            />
          </el-select>
          <!-- <el-select v-model="form.level"
                     :placeholder="$t('p')"> -->
          <!-- <el-option value>{{ $t('p') }}</el-option>
            <el-option :label="$t('all')"
                       :value="0" />
            <el-option :label="$t('gold') + $t('card')"
                       :value="46" />
            <el-option :label="$t('platinum') + $t('card')"
                       :value="45" />
            <el-option :label="$t('diamond') + $t('card')"
                       :value="44" />
            <el-option :label="$t('crown') + $t('card')"
                       :value="43" /> -->
          <!-- </el-select> -->
        </el-form-item>
        <el-form-item size="mini" :label="$t('exchange') + $t('t')">
          <div>
            <el-radio-group v-model="form.timeType">
              <el-radio :label="true">{{ $t('long') }}</el-radio>
              <el-radio :label="false">{{ $t('validityPeriod') }}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="!form.timeType" style="margin-top:20px">
            <el-date-picker
              v-model="form.times"
              type="daterange"
              value-format="yyyy-MM-dd"
              :range-separator="$t('datePicker.range')"
              :start-placeholder="$t('datePicker.start')"
              :end-placeholder="$t('datePicker.end')"
            />
          </div>
        </el-form-item>
        <el-form-item size="mini" :label="$t('exchange') + $t('limit')">
          <div>
            <el-radio-group
              v-model="form.numberOfTimesType"
              @change="radioGroupChange"
            >
              <el-radio :label="-1">{{ $t('unlimited') }}</el-radio>
              <el-radio :label="1">{{ $t('limit') }}</el-radio>
            </el-radio-group>
          </div>
          <div
            v-if="form.numberOfTimesType === 1"
            style="display:flex;margin-top:20px"
          >
            <el-input v-model="form.numberOfTimes" />
            <div style="width:70px;">{{ $t('piece') + '/' + $t('pe') }}</div>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('commoditys') + $t('process.diagramResourceName')"
        >
          <!-- <div
            style="height: 100%;min-height: 60px;border: 1px solid #999;margin-bottom: 20px;width: 200px;display:flex;"
          >
            <div v-if="form.picUrl">
              <img
                style="width:100%;height:100%;"
                :src="$fileUrl() + form.picUrl"
                alt
              />
            </div>
            <editorImage
              urltype="material"
              type="custom"
              @successCBK="imageSuccessCBK1"
            >
              <el-button type="primary" size="mini">{{
                $t('click') + $t('upload')
              }}</el-button>
            </editorImage>
          </div> -->
          <div class="img-upload">
            <img
              v-if="form.picUrl != null"
              style="width:100%;"
              :src="$fileUrl() + form.picUrl"
            />
            <div v-if="form.picUrl == null" class="upload-box">
              <i class="el-icon-plus logoIcon" />
            </div>
            <editorImage
              urltype="material"
              type="custom"
              @successCBK="imageSuccessCBK1"
            />
          </div>
        </el-form-item>
        <el-form-item label="兑换详情">
          <Tinymce v-model="form.detail" />
        </el-form-item>
        <el-form-item v-if="productType" label="exchange Desc">
          <Tinymce v-model="form.international.detail" />
        </el-form-item>
        <el-form-item :label="$t('shelf')">
          <el-switch v-model="form.status" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini" @click="$router.go(-1)">{{
            $t('cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 卡券弹窗 -->
    <div v-if="dialongType" class="integral-cardView">
      <el-dialog title="选择卡券" :visible.sync="dialongType">
        <div
          class="integral-cardView-search"
          style="display:flex;margin-bottom:30px;"
        >
          <div style="display:flex;">
            <span style="display:block;    line-height: 28px;"
              >{{ $t('oss.type') }}:</span
            >
            <el-select
              v-model="search.cardType"
              size="mini"
              :placeholder="$t('p')"
            >
              <el-option :label="$t('all')" value />
              <el-option :label="$t('discountCoupon')" value="DISCOUNT" />
              <el-option :label="$t('voucher')" value="CASH" />
              <el-option :label="$t('coupon')" value="GENERAL_COUPON" />
              <el-option :label="$t('groupCoupon')" value="GROUPON" />
              <el-option :label="$t('GIFT')" value="GIFT" />
            </el-select>
          </div>
          <div style="display:flex;margin-left:50px;">
            <el-input v-model="search.titleOrId" size="mini" />
            <el-button type="primary" size="mini" @click="getCardList(1)">{{
              $t('layout.tooltip.search')
            }}</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" size="mini">
          <el-table-column prop="id" :label="$t('choose')" width="100">
            <template slot-scope="set">
              <el-radio v-model="setIngCard" :label="set.row.id">{{
                ''
              }}</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            :label="$t('card') + $t('n')"
            width="100"
          />
          <el-table-column
            prop="typeName"
            :label="$t('card') + $t('oss.type')"
            width="100"
          />
          <el-table-column
            prop="date"
            :label="$t('validityPeriod')"
            width="180"
          >
            <template slot-scope="fixedTerm">
              <span
                >{{ $t('receive')
                }}{{ fixedTerm.row.fixedTerm + $t('effective') }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="quantity" :label="$t('sum')" width="100" />
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            background
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="footer" style="text-align: center;margin-top: 40px;">
          <el-button size="mini" type="primary" @click="setCard(true)">{{
            $t('confirm')
          }}</el-button>
          <el-button size="mini" @click="setCard(false)">{{
            $t('cancel')
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import integralMallTableConfig from '@/tableConfigs/marketing/integralMallConfig/integralMallConfig'
import {
  addDetails,
  changeDetails,
  coupon,
  cardList,
  MembershipCardList,
} from '@/api/marketing/interalMall'
import { formatDate } from '@/utils/index'

import Tinymce from '@/components/Tinymce'
import editorImage from '@/components/Tinymce/components/editorImage'
export default {
  name: 'ShortManagement',
  components: {
    Tinymce,
    editorImage,
  },
  data() {
    return {
      form: {
        name: '',
        couponId: '', // 会员卡id
        integral: '', // 规则
        stock: '', // 可兑换数
        level: 0, // 会员专项，会员级别
        detail: null, // 兑换说明
        times: [],
        startTime: null,
        endTime: null,
        timeType: true, // 是否长期有效
        picUrl: null, // 图片url
        status: null, // 上架状态
        numberOfTimes: '', // 如果被限制，-1不限制，1限制则需要填写具体内容
        numberOfTimesType: -1, // 是否被限制，-1不限制，1限制
        international: {
          name: null,
          detail: null,
        },
      },
      options: [],
      integralType: false, // 是否编辑状态
      dialongType: false, // 弹窗状态
      search: {
        cardType: null,
        titleOrId: null,
      }, // 筛选条件
      currentPage: 1, // 当前页码
      total: 0,
      page: 1,
      tableData: [], // cardList
      setIngCard: null, // 选中的卡券;并未确定
      card: {
        couponInfo: {
          baseInfo: {},
        },
      }, // 卡券详情
      // setIngCardEd:null,
    }
  },
  computed: {},
  created() {
    if (this.LMBshowType) {
      // 乐摩吧不调接口
      this.cardListInterface()
    }

    // 获取积分详情
    if (this.$route.query.id) {
      this.integralType = true
      const d = this.$route.query.data
      console.log('当前数据', d)
      d.times = !d.timeType ? [new Date(d.startTime), new Date(d.endTime)] : []
      d.numberOfTimesType = d.numberOfTimes === -1 ? -1 : 1
      d.numberOfTimes = 1
      d.international = d.international
        ? JSON.parse(d.international)
        : {
            name: null,
            detail: null,
          }
      d.status = d.statuss != '下架'
      if (d.details) {
        d.detail = d.details
      }
      // if (d.level) {
      //   d.level = JSON.parse(d.level)
      // }
      this.form = d
      this.setIngCard = d.couponId
      this.getCoupon(d.couponId)
      console.log(this.form, 'this.form')
    }
    this.getCardList(1)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    radioGroupChange(e) {
      console.log('radioGroupChange', e, this.numberOfTimesType)
    },
    imageSuccessCBK1(arr) {
      this.form.picUrl = arr[0].url.localUrl
    },
    // 会员卡列表接口
    cardListInterface() {
      MembershipCardList({}).then((res) => {
        console.log(res, '会员卡列表接口')
        if (res.code == 0) {
          this.options = res.data
        }
      })
    },
    // 提交
    onSubmit() {
      const formOption = JSON.parse(JSON.stringify(this.form))
      // formOption.level = JSON.stringify(formOption.level)
      const params = this.initParams(formOption)
      console.log(params, '上传参数')
      // 判断当前是否为编辑状态
      if (!this.integralType) {
        addDetails(params).then((res) => {
          if (res.code == 0) this.$router.go(-1)
        })
      } else {
        changeDetails(params).then((res) => {
          if (res.code == 0) this.$router.go(-1)
        })
      }
    },
    // 卡券详情
    getCoupon(e) {
      coupon({ couponId: e }).then((res) => {
        this.$set(this, 'card', res.data)
      })
    },
    // 获取卡券列表
    getCardList(page = 1) {
      let params = {
        page: page,
        size: 10,
      }
      params = Object.assign(params, this.search)
      cardList(params).then((res) => {
        this.tableData = res.data.couponList
        this.total = res.data.count
      })
    },
    // 初始化参数
    initParams(p) {
      if (!p.timeType) {
        p.startTime = p.times[0]
        p.endTime = p.times[1]
        // p.startTime = formatDate(p.times[0], 'yyyy-MM-dd')
        // p.endTime = formatDate(p.times[1], 'yyyy-MM-dd')
      }
      if (!p.numberOfTimes) p.numberOfTimes = p.numberOfTimesType
      if (p.numberOfTimesType === -1) p.numberOfTimes = -1
      p.status = p.status ? 1 : 2
      p.international = JSON.stringify(p.international)
      return p
    },

    // 筛选卡券
    searchCard() {},
    // 分页获取数据
    handleCurrentChange(e) {
      this.getCardList(e)
    },
    // 选择卡券
    setCard(t) {
      if (t) {
        const f = this.form
        f.couponId = this.setIngCard
        this.getCoupon(f.couponId)
      }
      this.dialongType = false
    },
  },
}
</script>
<style lang="scss" scoped>
.addIntegral {
  .img-upload {
    width: 100px;
    position: relative;
    margin-bottom: 10px;
  }
  .upload-box {
    width: 100px;
    height: 100px;
    border: 1px dashed #dddddd;
    cursor: pointer;
  }
  .logoIcon {
    font-size: 40px;
    color: #dddddd;
    margin: 30px;
  }
  .userTotal {
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
  }
}
</style>
