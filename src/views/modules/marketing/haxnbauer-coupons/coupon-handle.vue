<template>
  <d2-container class="page">
    <h3
      class="list-title"
      style="margin-top:-10px;"
    >{{ $t('wechat.coupon.Add') }}</h3>
    <el-form
      ref="couponform"
      label-position="left"
      :rules="Rules"
      :model="form"
      label-width="100px"
    >
      <div class="box">

        <el-form-item :label="$t('coupons.newCoupons')" prop="newCoupons">
          <el-radio v-model="isNewCoupons" label="1">{{ $t('running.suspended0') }}</el-radio>
          <el-radio v-model="isNewCoupons" label="2">{{ $t('running.suspended1') }}</el-radio>
        </el-form-item>
        <el-form-item
          :label="$t('coupons.image')"
          prop="logoImg"
        >
          <div class="img-upload">
            <img
              v-if="form.logoImg != null"
              style="width:100%;"
              :src="$fileUrl() + form.logoImg"
            >
            <div
              v-if="form.logoImg == null"
              class="upload-box"
            >
              <i class="el-icon-plus logoIcon" />
            </div>
            <editorImage
              v-if="type == 'update'"
              urltype="coupon"
              type="custom"
              @successCBK="imageSuccessCBK"
            />
          </div>
          <div style="clear:both" />
          <el-alert
            :closable="false"
            :title=" $t('coupons.designMsg')+':200px*200px，'+$t('coupons.imageSize')"
            type="info"
            style="padding:0  16px"
          />

        </el-form-item>

        <!-- <el-form-item
          :label="$t('coupons.name')"
          prop="brandName"
        >
          <el-input
            v-model="form.brandName"
            :disabled="type == 'look' || type == 'update'"
            :placeholder="$t('coupons.nameplace')"
            maxlength="20"
            show-word-limit
            clearable
          />
        </el-form-item> -->

        <el-form-item
          v-if="carType == 'DISCOUNT'"
          :label="$t('coupons.discount')"
          prop="userDiscount"
        >
          <el-col :span="23">
            <el-input
              v-model="form.userDiscount"
              :disabled="type == 'look' || type == 'update'"
              type="number"
              min="0"
              :placeholder="$t('coupons.discountplace')"
              clearable
            />
          </el-col>
          <el-col :span="1">
            <div class="zhe-text">{{ $t('coupons.count') }}</div>
          </el-col>
          <el-col :span="24">
            <el-alert
              :closable="false"
              :title="$t('coupons.tip')"
              type="info"
              style="padding:0  16px;margin-top:10px;"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          v-if="carType == 'CASH'"
          :label="$t('coupons.amount')"
          prop="reduceCost"
        >
          <el-col :span="23">
            <el-input
              v-model="form.reduceCost"
              :disabled="type == 'look' || type == 'update'"
              type="number"
              min="0"
              :placeholder="$t('coupons.amountplace')"
              clearable
            />
          </el-col>
          <el-col :span="1">
            <div class="zhe-text">{{ $t('coupons.money') }}</div>
          </el-col>
          <el-col :span="24">
            <el-alert
              :closable="false"
              :title="$t('coupons.amountTip')"
              type="info"
              style="padding:0  16px;margin-top:10px;"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="卡券标题"
          prop="title"
        >
          <el-input
            v-model="form.title"
            type="text"
            :disabled="type == 'look' || type == 'update'"
            placeholder="请填写卡券标题"
            maxlength="20"
            show-word-limit
            clearable
          />
        </el-form-item>

        <el-form-item
          v-if="form.extraInfo!=''"
          label="Title card vouchers"
          prop="title"
        >
          <el-input
            v-model="form.extraInfo.title"
            type="text"
            :disabled="type == 'look' || type == 'update'"
            placeholder="Please enter the title card vouchers"
            maxlength="20"
            show-word-limit
            clearable
          />
        </el-form-item>

        <el-form-item :label="$t('validityPeriod')">
          <el-radio-group
            v-model="form.Timestamp"
            :disabled="type == 'look' || type == 'update'"
            @change="TimestampSelect"
          >
            <el-radio label="1">{{ $t('coupons.fixedDate') }}</el-radio>
            <el-radio label="2">{{ $t('coupons.receiveafter') }}</el-radio>
          </el-radio-group>
          <el-col
            v-if="form.Timestamp == 1"
            :span="23"
          >
            <el-date-picker
              v-model="form.validity"
              :disabled="type == 'look' || type == 'update'"
              :picker-options="pickerOptions"
              type="datetimerange"
              :range-separator="$t('datePicker.range')"
              :start-placeholder="$t('datePicker.start')"
              :end-placeholder="$t('datePicker.end')"
            />
          </el-col>
          <div v-if="form.Timestamp == 2">
            <el-col :span="8">
              <div class="time-label">{{ $t('coupons.receiveafter') }}</div>
              <div class="time-select" style="width:100px">
                <el-select
                  v-model="form.fixedBeginTerm"
                  style="width:100%;"
                  :disabled="type == 'look' || type == 'update'"
                  :placeholder="$t('oss.qcloudRegionTips')"
                >
                  <el-option
                    v-for="(val,index) in 90"
                    :key="index"
                    :label="val"
                    :value="val"
                  />
                </el-select>
              </div>
              <div class="time-label-1">{{ $t('coupons.valid') }}</div>
              <div class="time-select-1">
                <el-select
                  v-model="form.fixedTerm"
                  style="width:100%;"
                  :disabled="type == 'look'"
                  :placeholder="$t('oss.qcloudRegionTips')"
                >
                  <el-option
                    v-for="(val,index) in 90"
                    :key="index"
                    :label="val"
                    :value="val"
                  />
                </el-select>
              </div>
            </el-col>
          </div>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.useTime')"
          prop="available"
        >
          <div>
            <el-radio-group
              v-model="form.available"
              :disabled="type == 'look' || type == 'update'"
              @click="availableSelect"
            >
              <el-radio label="1">{{ $t('coupons.allTime') }}</el-radio>
              <el-radio label="2">{{ $t('coupons.partTime') }}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="form.available == 2">
            <el-col :span="24">
              <div class="available-label">{{ $t('coupons.date') }}:</div>
              <div class="available-select">
                <el-checkbox-group
                  v-model="form.availableTime"
                  :disabled="type == 'look' || type == 'update'"
                >
                  <el-checkbox
                    label="MONDAY"
                    name="week"
                  >{{ $t('coupons.weeks1') }}</el-checkbox>
                  <el-checkbox
                    label="TUESDAY"
                    name="week"
                  >{{ $t('coupons.weeks2') }}</el-checkbox>
                  <el-checkbox
                    label="WEDNESDAY"
                    name="week"
                  >{{ $t('coupons.weeks3') }}</el-checkbox>
                  <el-checkbox
                    label="THURSDAY"
                    name="week"
                  >{{ $t('coupons.weeks4') }}</el-checkbox>
                  <el-checkbox
                    label="FRIDAY"
                    name="week"
                  >{{ $t('coupons.weeks5') }}</el-checkbox>
                  <el-checkbox
                    label="SATURDAY"
                    name="week"
                  >{{ $t('coupons.weeks6') }}</el-checkbox>
                  <el-checkbox
                    label="SUNDAY"
                    name="week"
                  >{{ $t('coupons.weeks7') }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
            <el-col :span="24">
              <el-button
                v-if="availableTimeArray.length < 2"
                :disabled="type == 'look' || type == 'update'"
                type="text"
                @click="AddavailableTimeArray"
              >{{ $t('coupons.addTime') }}</el-button>
            </el-col>

            <el-col
              v-for="(time,index) in availableTimeArray"
              :key="index"
              style="margin-bottom:15px;"
              :span="24"
            >
              <div class="available-label">{{ $t('t') }}:</div>
              <div class="available-select">
                <div class="available-add-time">
                  <el-input
                    v-model="time.beginHour"
                    style="width:100px"
                    :placeholder="$t('oss.qcloudRegionTips')"
                    :disabled="type == 'look' || type == 'update'"
                    clearable
                  >
                    <div>:</div>
                  </el-input>
                  <div style="width:30px;text-align:center;">:</div>
                  <el-input
                    v-model="time.beginMinute"
                    style="width:100px"
                    :placeholder="$t('oss.qcloudRegionTips')"
                    :disabled="type == 'look' || type == 'update'"
                    clearable
                  />
                  <div style="width:60px;text-align:center;">{{ $t('datePicker.range') }}</div>
                  <el-input
                    v-model="time.endHour"
                    style="width:100px"
                    :placeholder="$t('oss.qcloudRegionTips')"
                    :disabled="type == 'look' || type == 'update'"
                    clearable
                  />
                  <div style="width:30px;text-align:center;">:</div>
                  <el-input
                    v-model="time.endMinute"
                    style="width:100px"
                    :placeholder="$t('oss.qcloudRegionTips')"
                    :disabled="type == 'look' || type == 'update'"
                    clearable
                  />
                  <el-button
                    style="margin-left:15px;"
                    :disabled="type == 'look' || type == 'update'"
                    type="text"
                    @click="availableTimeArray.splice(index,1)"
                  >{{ $t('coupons.delTime') }}</el-button>
                </div>
              </div>
            </el-col>
          </div>
        </el-form-item>
      </div>

      <!-- 卡券详情 -->
      <h3 class="list-title">{{ $t('wechat.coupon.details') }}</h3>
      <div class="box">
        <el-form-item :label="$t('coupons.limit')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.getLimit"
                  type="number"
                  :disabled="type == 'look'"
                  min="0"
                  :placeholder="$t('oss.qcloudRegionTips')"
                  clearable
                />
              </el-col>
              <el-col :span="1">
                <div class="zhe-text">{{ $t('coupons.piece') }}</div>
              </el-col>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-alert
                :closable="false"
                :title="$t('coupons.limitTip')"
                type="info"
                style="padding:0  16px;margin-top:10px;"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- <el-form-item :label="$t('coupons.privilege')">
          <div class="__text">
            <span v-if="carType == 'discount'">{{ $t('coupons.discountTip1') }}{{ form.userDiscount }}{{ $t('coupons.discountTip2') }};</span>
            <span>{{ form.acceptCategoryInfo }}{{ form.rejectCategoryInfo }}{{ form.canUseWithOtherDiscount ? $t('coupons.canShare') : $t('coupons.noshare') }}</span>
          </div>
        </el-form-item> -->

        <el-form-item
          v-if="form.extraInfo!=''"
          label="Coupon details"
        >
          <!-- <div class="__text">Each limit get{{ form.getLimit }}piece</div> -->
          <el-row>
            <Tinymce v-model="form.descriptionEn" />
          </el-row>
        </el-form-item>

        <el-form-item label="优惠券详情">
          <!-- <div class="__text">每人限领{{ form.getLimit }}张</div> -->
          <el-row>
            <Tinymce v-model="form.description" />
          </el-row>
        </el-form-item>

      </div>

      <el-col
        v-for="(time,index) in availableTimeArray"
        :key="index"
        style="margin-bottom:15px;"
        :span="24"
      >
        <div class="available-label">{{ $t('t') }}:</div>
        <div class="available-select">
          <div class="available-add-time">
            <el-input
              v-model="time.beginHour"
              style="width:100px"
              :placeholder="$t('oss.qcloudRegionTips')"
              :disabled="type == 'look' || type == 'update'"
              clearable
            >
              <div>:</div>
            </el-input>
            <div style="width:30px;text-align:center;">:</div>
            <el-input
              v-model="time.beginMinute"
              style="width:100px"
              :placeholder="$t('p')"
              :disabled="type == 'look' || type == 'update'"
              clearable
            />
            <div style="width:60px;text-align:center;">{{ $t('datePicker.range') }}</div>
            <el-input
              v-model="time.endHour"
              style="width:100px"
              :placeholder="$t('p')"
              :disabled="type == 'look' || type == 'update'"
              clearable
            />
            <div style="width:30px;text-align:center;">:</div>
            <el-input
              v-model="time.endMinute"
              style="width:100px"
              :placeholder="$t('p')"
              :disabled="type == 'look' || type == 'update'"
              clearable
            />
            <el-button
              style="margin-left:15px;"
              :disabled="type == 'look' || type == 'update'"
              type="text"
              @click="availableTimeArray.splice(index,1)"
            >{{ $t('coupons.delTime') }}</el-button>
          </div>
        </div>
      </el-col>

      <!-- 核销券设置 -->
      <h3 class="list-title">{{ $t('wechat.coupon.verification') }}</h3>
      <div class="box">
        <el-form-item
          :label="$t('coupons.codeNum')"
          prop="codeDepositType"
        >
          <el-row>
            <el-col :span="24">
              <el-radio-group
                v-model="form.codeDepositType"
                :disabled="type == 'look' || type == 'update'"
                @change="codeDepositTypeSelect"
              >
                <el-radio label="1">{{ $t('coupons.autom') }}</el-radio>
                <!-- <el-radio label="2">{{ $t('coupons.import') }}</el-radio> -->
              </el-radio-group>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-radio-group
                v-model="form.codeLaunchType"
                :disabled="type == 'look' || type == 'update'"
              >
                <el-radio label="1">{{ $t('coupons.pre') }}</el-radio>
                <el-radio label="2">{{ $t('coupons.noPre') }}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row> -->
        </el-form-item>

        <!-- <el-form-item
          :label="$t('coupons.sku')"
          prop="quantity"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.quantity"
                  :disabled="form.codeDepositType == 2 || type == 'look' || type == 'update'"
                  type="number"
                  min="0"
                  :placeholder="$t('p')"
                  clearable
                />
              </el-col>
              <el-col :span="1">
                <div class="zhe-text">{{ $t('coupons.piece') }}</div>
              </el-col>
            </el-col>
          </el-row>
        </el-form-item> -->

        <el-form-item :label="$t('coupons.setting')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.useLimit"
                  :disabled="type == 'look' || type == 'update'"
                  type="number"
                  min="0"
                  :placeholder="$t('p')"
                  clearable
                />
              </el-col>
              <el-col :span="1">
                <div class="zhe-text">{{ $t('coupons.piece') }}</div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-alert
                :closable="false"
                :title="$t('coupons.limitTip')"
                type="info"
                style="padding:0  16px;margin:10px 0;"
              />
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-checkbox
                v-model="form.canShare"
                :disabled="type == 'look'"
                name="canShareC"
              >{{ $t('coupons.shareUrl') }}</el-checkbox>
              <el-checkbox
                v-model="form.canGiveFriend"
                :disabled="type == 'look'"
                name="canGiveFriendC"
              >{{ $t('coupons.receiveOther') }}</el-checkbox>
            </el-col>
          </el-row> -->
        </el-form-item>

        <el-form-item
          :label="$t('coupons.way')"
          prop="codeDepositType"
        >
          <el-row>
            <el-col :span="24">
              <el-radio-group
                v-model="form.codeType"
                :disabled="type == 'look'"
              >
                <el-radio label="CODE_TYPE_QRCODE">
                  <span>{{ $t('coupons.qrCode') }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style="color:#f05050;margin-left:15px;">{{ $t('coupons.qrCodeTip') }}</span>
                </el-radio>
              </el-radio-group>
              <br>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          label="使用须知"
          prop="notice"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.notice"
                  placeholder="请输入"
                  maxlength="16"
                  show-word-limit
                  :disabled="type == 'look' || type == 'update'"
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-alert
                :closable="false"
                title="建议引导用户到店出示卡券,由店员完成核销操作"
                type="info"
                style="padding:0  16px;margin:10px 0;"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          v-if="form.extraInfo!=''"
          label="Use the information"
          prop="noticeEn"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.extraInfo.notice"
                  :disabled="type == 'look' || type == 'update'"
                  placeholder="placeholder"
                  maxlength="200"
                  show-word-limit
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-alert
                :closable="false"
                title="Advice to guide users to store show card voucher, completed by the clerk verification operation"
                type="info"
                style="padding:0  16px;margin:10px 0;"
              />
            </el-col>
          </el-row>
        </el-form-item>
      </div>

      <h3 class="list-title">{{ $t('wechat.coupon.shop') }}</h3>
      <div class="box">
        <el-form-item :label="$t('coupons.stores')">
          <el-row>
            <el-col :span="24">
              <el-radio-group
                v-model="form.useAllLocations"
                :disabled="type == 'look'"
              >
                <el-radio :label="false">
                  {{ $t('coupons.useStores') }}
                </el-radio>
              </el-radio-group>
              <el-button
                v-if="form.useAllLocations == false"
                style="margin-left:55px;"
                type="text"
                @click="addLOcations"
              >{{ $t('coupons.addStores') }}</el-button>
            </el-col>
            <el-col :span="24">
              <el-radio-group
                v-model="form.useAllLocations"
                :disabled="type == 'look'"
              >
                <el-radio :label="true">
                  {{ $t('coupons.allStores') }}
                </el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- <el-form-item :label="$t('schedule.remark')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.note"
                  :disabled="type == 'look'"
                  :placeholder="$t('p')"
                  maxlength="20"
                  show-word-limit
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>
        </el-form-item> -->
      </div>

      <el-form-item
        v-if="type == 'update'"
        style="margin-top:30px;"
      >
        <el-button
          size="small"
          @click="getBack"
        >{{ $t('cancel') }}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="onSubmit('couponform')"
        >{{ $t('confirm') }}</el-button>
      </el-form-item>

    </el-form>

    <el-dialog
      :title="$t('coupons.checkStores')"
      :visible.sync="dialogVisible"
      width="50%"
    >

      <div class="container">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-select
              v-model="storeType"
              :placeholder="$t('oss.qcloudRegionTips')"
              @change="storeTypeChange"
            >
              <el-option
                v-for="item in storeTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col
            :span="8"
            :offset="8"
          >
            <el-input
              v-model="searchKey"
              :placeholder="$t('wechat.reply.content')"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchData"
              />
            </el-input>
          </el-col>
        </el-row>

        <div style="width:100%;margin-top:30px;">
          <el-table
            ref="multipleTable"
            :data="storesListArray"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="id"
              :label="$t('coupons.stores')+'ID'"
              width="120"
            />
            <el-table-column
              prop="name"
              :label="$t('coupons.StoreName')"
              width="120"
            />
            <el-table-column
              prop="storeType"
              :label="$t('coupons.StoreType')"
            />
            <el-table-column
              :label="$t('coupons.StoreAddress')"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.provinceName }}
                {{ scope.row.cityName }}
                {{ scope.row.districtName }}
                {{ scope.row.address }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination">
          <el-pagination
            background
            :page-size="10"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>

      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          @click="setStoreIds"
        >{{ $t('confirm') }}</el-button>

      </span>
    </el-dialog>

  </d2-container>
</template>
<script>

// import dayjs from 'dayjs'
import editorImage from '@/components/Tinymce/components/editorImage'
import Tinymce from '@/components/Tinymce'
import { storesTypes, storesList, CouponInfo, updateCoupon, chenkNewCoupons, setNewCoupons } from '@/api/marketing/coupon'

export default {
  name: 'WechatCouponCouponHandle',
  components: { editorImage, Tinymce },
  data() {
    return {
      type: '', // 查看\编辑
      carType: '',
      dialogVisible: false,
      wechatFlag: '', // 是否同步到微信
      isNewCoupons: 1,
      colorList: [
        { value: 'Color010', color: '#63b359' },
        { value: 'Color020', color: '#2c9f67' },
        { value: 'Color030', color: '#509fc9' },
        { value: 'Color040', color: '#5885cf' },
        { value: 'Color050', color: '#9062c0' },
        { value: 'Color060', color: '#d09a45' },
        { value: 'Color070', color: '#e4b138' },
        { value: 'Color080', color: '#ee903c' },
        { value: 'Color081', color: '#f08500' },
        { value: 'Color082', color: '#a9d92d' },
        { value: 'Color090', color: '#dd6549' },
        { value: 'Color100', color: '#cc463d' },
        { value: 'Color101', color: '#cf3e36' },
        { value: 'Color102', color: '#5E6671' }
      ],
      form: {
        logoImg: null, // 商户图片
        brandName: '111', // 商户名称
        color: null, // 卡券颜色
        userDiscount: 0, // 折扣额度
        title: null, // 折扣券标题
        Timestamp: '1', // 固定日期or领取后
        validity: [], // 固定日期
        fixedBeginTerm: null, // 领取后n天
        fixedTerm: null, // 有效天数
        available: '1', // 有效期
        availableTime: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'], // 可用时段
        getLimit: 1, // 领券限制
        acceptCategory: null, // 适用商品
        rejectCategory: null, // 不适应商品
        canUseWithOtherDiscount: false, // 优惠共享,
        coverImage: null, // 封面图片
        abstract: null, // 封面标题
        description: null, // 使用须知
        servicePhone: null, // 商户电话
        serviceStore: [],
        codeDepositType: '1', // 自动生成/导入券号
        codeLaunchType: '1', // 预存模式/非预存模式
        quantity: 0, // 库存
        useLimit: 1, // 核销设置
        canShare: false, // 用户可以分享领券链接
        canGiveFriend: false, // 用户可转赠其他好友
        codeType: 'CODE_TYPE_TEXT', // 核销方式
        notice: null, // 操作提示
        useAllLocations: true, // 使用全部门店
        locationIdList: null, // 门店id
        note: '111', // 备注
        customUrlName: null, // 外链名称
        customUrl: null, // 外链地址
        reduceCost: null, // 减免金额---代金券
        leastCost: 0, // 最低消费---代金券
        extraInfo: '' // 英文
      },
      availableTimeArray: [], // /可用时段添加
      Rules: {
        logoImg: [
          { required: true, message: '请上传商户图片', trigger: 'change' }
        ],
        brandName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请选择卡券颜色', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请选择折扣券标题', trigger: 'blur' }
        ],
        available: [
          { required: true, message: '', trigger: 'blur' }
        ],
        codeDepositType: [
          { required: true, message: '', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '', trigger: 'blur' }
        ],
        notice: [
          { required: true, message: '请输入操作提示', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate: (time) => {
          // // 设置可选择的日期为今天之后的一个月内
          // const curDate = (new Date()).getTime()
          // // 这里算出一个月的毫秒数,
          // const day = 10 * 24 * 3600 * 1000
          // const dateRegion = curDate + day
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      storeTypeArr: [{
        id: -1,
        name: '全部'
      }], // /门店类型选项
      storeType: -1, // /门店选项
      searchKey: '', // 搜索
      storesListArray: [], // /门店list
      currentPage: 1,
      total: 0,
      SelectionStore: [] // 选中的门店
    }
  },
  computed: {},
  created() {
    // /分析是建那种券
    this.init()
    this.GetadvancedInfo(1)
    this.GetstoreTypeArr()
  },
  mounted() {

  },
  beforeDestroy() { },
  methods: {
    init() {
      // /获取卡券信息
      this.getcouponInfo()
      this.type = this.$route.query.type
    },
    getcouponInfo() {
      chenkNewCoupons(this.$route.query.id).then(res => {
        console.log(res)
        if (res.data != null && res.data.deleted == 0) {
          this.isNewCoupons = '2'
        } else {
          this.isNewCoupons = '1'
        }
      })
      CouponInfo({ couponId: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          // //回显值
          const Info = res.data
          this.carType = Info.cardType// 卡券类型
          this.form.extraInfo = Info.couponInfo.extraInfo != null ? JSON.parse(Info.couponInfo.extraInfo) : ''

          // /卡券信息
          this.form.logoImg = Info.couponInfo.baseInfo.logo_url// 商户头像
          this.form.brandName = Info.couponInfo.baseInfo.brand_name// 商户名称
          this.form.color = Info.couponInfo.baseInfo.color// 卡券颜色
          this.form.title = Info.couponInfo.baseInfo.title// 卡券标题
          this.form.reduceCost = Info.couponInfo.reduceCost
          this.form.userDiscount = 10 - (Info.couponInfo.discount / 10)
          this.wechatFlag = Info.wechatFlag

          // 有效期
          if (Info.couponInfo.baseInfo.date_info.type == 'DATE_TYPE_FIX_TIME_RANGE') {
            this.form.Timestamp = '1'
            if (Info.couponInfo.baseInfo.date_info.begin_timestamp) {
              this.form.validity.push(new Date((Info.couponInfo.baseInfo.date_info.begin_timestamp * 1000)))
              this.form.validity.push(new Date((Info.couponInfo.baseInfo.date_info.end_timestamp * 1000)))
            }
          } else if (Info.couponInfo.baseInfo.date_info.type == 'DATE_TYPE_FIX_TERM') {
            this.form.Timestamp = '2'
            this.form.fixedBeginTerm = Info.couponInfo.baseInfo.date_info.fixed_begin_term == 0 ? '当天' : Info.couponInfo.baseInfo.date_info.fixed_begin_term
            this.form.fixedTerm = Info.couponInfo.baseInfo.date_info.fixed_term
          }

          // /可用时段
          if (Info.couponInfo.advancedInfo.time_limit.length == 0) {
            this.form.available = '1'
          } else {
            this.form.available = '2'
            this.form.availableTime = []
            const time_limit = Info.couponInfo.advancedInfo.time_limit
            time_limit.map(val => {
              if (this.form.availableTime.indexOf(val.type) == -1) {
                this.form.availableTime.push(val.type)
              }
            })

            this.availableTimeArray.push({
              beginHour: time_limit[ 0 ].begin_hour,
              beginMinute: time_limit[ 0 ].begin_minute,
              endHour: time_limit[ 0 ].end_hour,
              endMinute: time_limit[ 0 ].end_minute
            })

            if (time_limit[ 1 ]) {
              if (time_limit[ 0 ].type == time_limit[ 1 ].type) {
                this.availableTimeArray.push({
                  beginHour: time_limit[ 1 ].begin_hour,
                  beginMinute: time_limit[ 1 ].begin_minute,
                  endHour: time_limit[ 1 ].end_hour,
                  endMinute: time_limit[ 1 ].end_minute
                })
              }
            }
          }

          // 卡券详情
          this.form.getLimit = Info.couponInfo.baseInfo.get_limit// 领券限制
          this.form.acceptCategory = Info.couponInfo.advancedInfo.use_condition.accept_category// 适用商品
          this.form.rejectCategory = Info.couponInfo.advancedInfo.use_condition.reject_category// 不适用商品

          this.form.canUseWithOtherDiscount = Info.couponInfo.advancedInfo.use_condition.can_use_with_other_discount// 不可以与其他类型共享门槛 ，填写false时系统将在使用须知里 拼写“不可与其他优惠共享”， 填写true时系统将在使用须知里 拼写“可与其他优惠共享”， 默认为true

          // 封面图片
          if (Info.couponInfo.advancedInfo.abstract.icon_url_list.length > 0) {
            this.form.coverImage = Info.couponInfo.advancedInfo.abstract.icon_url_list[ 0 ]
          }

          // 封面标题
          this.form.abstract = Info.couponInfo.advancedInfo.abstract.abstract
          // 使用须知
          this.form.description = Info.couponInfo.baseInfo.description
          // 商户介绍
          this.form.servicePhone = Info.couponInfo.baseInfo.service_phone
          this.form.serviceStore = Info.couponInfo.advancedInfo.business_service

          // 核销券
          this.form.codeDepositType = JSON.stringify(Info.codeDepositType)// 1:自动 2:导入
          this.form.codeLaunchType = JSON.stringify(Info.codeDepositType)// // 券号  1:预存  2:非预存
          this.form.quantity = Info.couponInfo.baseInfo.sku.quantity// 库存
          this.form.useLimit = Info.couponInfo.baseInfo.useLimit// 核销数量
          this.form.canShare = Info.couponInfo.baseInfo.can_share// 转赠
          this.form.canGiveFriend = Info.couponInfo.baseInfo.can_give_friend// 分享
          this.form.codeType = Info.couponInfo.baseInfo.code_type// 核销方式
          this.form.notice = Info.couponInfo.baseInfo.notice// 操作提示

          // 门店设置
          this.form.useAllLocations = Info.couponInfo.baseInfo.use_all_locations

          if (!this.form.useAllLocations) {
            this.form.locationIdList = Info.couponInfo.baseInfo.location_id_list
          }

          // 外链设置
          this.form.customUrlName = Info.couponInfo.baseInfo.custom_url_name
          this.form.customUrl = Info.couponInfo.baseInfo.custom_url
        }
      })
    },
    imageSuccessCBK(e) {
      this.form.logoImg = e[ 0 ].url.localUrl
    },
    imageSuccessCoverImage(e) {
      this.form.coverImage = e[ 0 ].url.localUrl
    },
    TimestampSelect() {
      if (this.form.Timestamp == 1) {
        this.fixedBeginTerm = ''
        this.fixedTerm = ''
      } else {
        this.form.validity = ''
      }
    },
    availableSelect() {

    },
    codeDepositTypeSelect(e) {
      if (e == 2) {
        this.form.quantity = 0
      }
    },
    AddavailableTimeArray() {
      const option = {
        type: null,
        beginHour: null,
        beginMinute: null,
        endHour: null,
        endMinute: null
      }
      this.availableTimeArray.push(option)
    },
    onSubmit(formName) {
      // console.log(this.setSendData())
      this.$refs[ formName ].validate((valid) => {
        if (valid) {
          const sendData = this.setSendData()
          sendData.loading = true
          sendData.couponInfo.extraInfo = JSON.stringify(sendData.couponInfo.extraInfo)
          console.log(sendData)
          updateCoupon(sendData).then(res => {
            if (res.code == 0) {
              var newData = {
                couponId: this.$route.query.id,
                deleted: this.isNewCoupons == '2' ? 0 : 1
              }
              setNewCoupons(newData).then(res => {
                if (res.code == 0) {
                  this.$router.push({
                    name: 'haxnbauer-coupons-list'
                  })
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '添加新人优惠券失败'
                  })
                }
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '有必填字段未填写'
          })
          return false
        }
      })
    },
    setSendData() {
      const cardDataInfo = {
        'couponId': this.$route.query.id,
        'cardType': this.carType,
        'codeDepositType': parseInt(this.form.codeDepositType),
        'codeLaunchType': parseInt(this.form.codeLaunchType),
        'couponInfo': {
          locationIdList: this.form.useAllLocations ? null : this.form.locationIdList, // 门店id
          useAllLocations: !!this.form.useAllLocations, // 使用全部门店
          customUrlName: this.form.customUrlName, // 外连名
          customUrl: this.form.customUrl, // 外链地址
          'codeType': this.form.codeType,
          'color': this.form.color,
          'notice': this.form.notice,
          'description': this.form.description,
          'logoUrl': this.form.logoImg, // 商户头像id
          'dateInfo': {
            'type': 'DATE_TYPE_FIX_TIME_RANGE'
            // 'beginTimestamp': null,
            // 'endTimestamp': null
          },
          'get_custom_code_mode': null,
          'use_custom_code': null,
          'bind_openid': null,
          'service_phone': this.form.servicePhone,
          'location_id_list': this.form.useAllLocations ? null : this.form.locationIdList,
          'center_title': null,
          'center_sub_title': null,
          'center_url': null,
          'custom_url_name': this.form.customUrlName,
          'custom_url': this.form.customUrl,
          'custom_url_sub_title': null,
          'promotion_url_name': null,
          'promotion_url': null,
          'promotion_url_sub_title': null,
          'get_limit': this.form.getLimit,
          'can_share': this.form.canShare,
          'can_give_friend': this.form.canGiveFriend,
          'note': this.form.note
        }

      }

      return cardDataInfo
    },
    addLOcations() {
      // /添加门店
      this.dialogVisible = true
    },
    GetadvancedInfo(page) {
      // /获取门店信息
      this.storesListArray = []
      const sendData = {
        size: 10,
        page: page
      }
      if (this.storeType > -1) {
        sendData.storeType = this.storeType
      }

      if (!this.$isNull(this.searchKey)) {
        sendData.name = this.searchKey
      }

      storesList(sendData).then(res => {
        if (res.code == 0) {
          if (res.data.data.length > 0) {
            this.storesListArray = res.data.data
            this.total = res.data.total
            this.currentPage = res.data.page
          }
        }
      })
    },
    GetstoreTypeArr() {
      storesTypes({}).then(res => {
        if (res.code == 0) {
          res.data.map(val => {
            this.storeTypeArr.push(val)
          })
        }
      })
    },
    storeTypeChange() {
      this.currentPage = 1
      this.GetadvancedInfo(this.currentPage)
    },
    handleSelectionChange(val) {
      // /选择门店
      if (val.length > 0) {
        val.map(res => {
          if (this.SelectionStore.indexOf(res.id) == -1) {
            this.SelectionStore.push(res.id)
          }
        })
      }
      //  console.log(this.SelectionStore)
    },
    setStoreIds() {
      this.form.locationIdList = this.SelectionStore
      this.dialogVisible = false
    },
    handleCurrentChange(e) {
      this.GetadvancedInfo(e)
    },
    searchData() {
      this.currentPage = 1
      this.GetadvancedInfo(this.currentPage)
    },
    getBack() {
      this.$router.push({
        name: 'haxnbauer-coupons-list'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 80%;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 30px 15px;
}
.color-radio {
  width: 60px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  position: relative;
  top: 8px;
  // margin-bottom: 10px
}
.img-upload {
  width: 100px;
  position: relative;
  margin-bottom: 10px;
}
.zhe-text {
  width: 100%;
  text-align: center;
}
.__text {
  width: 100%;
  color: #666666;
}
.time-label {
  width: 70px;
  float: left;
  color: #666666;
  position: relative;
  top: 4px;
}
.time-select {
  width: calc(50% - 70px);
  float: left;
  color: #666666;
}
.time-label-1 {
  width: 130px;
  float: left;
  color: #666666;
  position: relative;
  top: 4px;
  text-align: center;
}
.time-select-1 {
  width: calc(50% - 130px);
  float: left;
  color: #666666;
}
.available-label {
  width: 70px;
  float: left;
  color: #666666;
}
.available-select {
  width: calc(100% - 70px);
  float: left;
  color: #666666;
}
.available-add-time {
  width: 100%;
  display: flex;
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
.el-form-item {
  margin-bottom: 20px;
}
</style>

