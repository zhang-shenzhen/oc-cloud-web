<template>
  <d2-container class="page">
    <h3
      class="list-title"
      style="margin-top: -10px;"
    >{{ $t('wechat.coupon.Add') }}</h3>
    <el-form
      ref="couponform"
      label-position="left"
      :rules="Rules"
      :model="form"
      label-width="100px"
    >
      <div class="box">
        <el-form-item
          :label="$t('coupons.image')"
          prop="logoImg"
        >
          <div class="img-upload">
            <img v-if="form.logoImg != null" style="width:100%;" :src="$fileUrl() + form.logoImg">
            <div v-if="form.logoImg == null" class="upload-box">
              <i class="el-icon-plus logoIcon" />
            </div>
            <editorImage
              urltype="coupon"
              type="custom"
              @successCBK="imageSuccessCBK"
            />
          </div>
          <div style="clear:both" />
          <el-alert
            :closable="false"
            :title="$t('userCenter.designMsg')+':850px*350px，'+$t('coupons.imageSize')"
            type="info"
            style="padding:0  16px"
          />
        </el-form-item>

        <el-form-item
          :label="$t('coupons.name')"
          prop="brandName"
        >
          <el-input
            v-model="form.brandName"
            :placeholder="$t('coupons.nameplace')"
            maxlength="20"
            show-word-limit
            clearable
          />
        </el-form-item>

        <el-form-item
          :label="$t('coupons.couponsColor')"
          prop="color"
        >
          <el-radio-group
            v-model="form.color"
            style="position:relative;top:-8px;"
          >
            <el-radio
              v-for="(item,index) in colorList"
              :key="index"
              :label="item.value"
            >
              <span
                :style="{background:item.color}"
                class="color-radio"
              />
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="carType == 'discount'"
          :label="$t('coupons.discount')"
          prop="userDiscount"
        >
          <el-col :span="23">
            <el-input
              v-model="form.userDiscount"
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
          v-if="carType == 'cash'"
          :label="$t('coupons.amount')"
          prop="reduceCost"
        >
          <el-col :span="23">
            <el-input
              v-model="form.reduceCost"
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
          :label="$t('coupons.cardTitle')"
          prop="title"
        >
          <el-input
            v-model="form.title"
            type="text"
            :placeholder="$t('coupons.cardTitleplace')"
            maxlength="20"
            show-word-limit
            clearable
          />
          <el-alert
            :closable="false"
            :title="$t('coupons.cardTitleTip')"
            type="info"
            style="padding:0  16px;margin-top:10px;"
          />
        </el-form-item>

        <el-form-item
          :label="$t('validityPeriod')"
          prop="Timestamp"
        >
          <el-radio-group
            v-model="form.Timestamp"
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
              <div class="time-select">
                <el-select
                  v-model="form.fixedBeginTerm"
                  style="width:100%;"
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
                <el-checkbox-group v-model="form.availableTime">
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
                    :placeholder="$t('p')"
                    clearable
                  >
                    <div>:</div>
                  </el-input>
                  <div style="width:30px;text-align:center;">:</div>
                  <el-input
                    v-model="time.beginMinute"
                    style="width:100px"
                    :placeholder="$t('p')"
                    clearable
                  />
                  <div style="width:60px;text-align:center;">{{ $t('datePicker.range') }}</div>
                  <el-input
                    v-model="time.endHour"
                    style="width:100px"
                    :placeholder="$t('p')"
                    clearable
                  />
                  <div style="width:30px;text-align:center;">:</div>
                  <el-input
                    v-model="time.endMinute"
                    style="width:100px"
                    :placeholder="$t('p')"
                    clearable
                  />
                  <el-button
                    style="margin-left:15px;"
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
                style="padding:0  16px;margin-top:10px;"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item :label="$t('coupons.useCond')">
          <el-row v-if="carType == 'cash'" style="margin-bottom:10px;">
            <el-col :span="24">
              <el-col :span="3">
                <el-checkbox v-model="form.leastCostCheck" name="type" @click="leastCostChange">{{ $t('coupons.minBuy') }}</el-checkbox>
              </el-col>
              <el-col v-if="form.leastCostCheck == true" :span="21">
                <el-col :span="1">
                  <div class="zhe-text">{{ $t('coupons.full') }}</div>
                </el-col>
                <el-col :span="4">
                  <el-input
                    v-model="form.leastCost"
                    type="number"
                    min="0"
                    :placeholder="$t('p')"
                    clearable
                  />
                </el-col>
                <el-col :span="2">
                  <div class="zhe-text">{{ $t('coupons.full2') }}</div>
                </el-col>
              </el-col>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-col :span="3">
                <div class="__text">{{ $t('coupons.useGoods') }}</div>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="form.acceptCategory"
                  :placeholder="$t('p')"
                  maxlength="15"
                  show-word-limit
                  clearable
                />
              </el-col>
            </el-col>
          </el-row>
          <el-alert
            :closable="false"
            :title="$t('coupons.useGoodsTip')"
            type="info"
            style="padding:0  16px;margin:10px 0;"
          />

          <el-row>
            <el-col :span="24">
              <el-col :span="3">
                <div class="__text">{{ $t('coupons.noUseGoods') }}</div>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="form.rejectCategory"
                  :placeholder="$t('p')"
                  maxlength="15"
                  show-word-limit
                  clearable
                />
              </el-col>
            </el-col>
          </el-row>
          <el-alert
            :closable="false"
            :title="$t('coupons.noUseGoodsTip')"
            type="info"
            style="padding:0  16px;margin:10px 0;"
          />

          <el-row>
            <el-col :span="24">
              <el-col :span="2">
                <div class="__text">{{ $t('coupons.share') }}</div>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="form.canUseWithOtherDiscount"
                  style="width:100%;"
                  :placeholder="$t('oss.qcloudRegionTips')"
                >
                  <el-option
                    :value="false"
                    :label="$t('coupons.noshare')"
                  />
                  <el-option
                    :value="true"
                    :label="$t('coupons.canShare')"
                  />
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-alert
            :closable="false"
            :title="$t('coupons.couponstip')"
            type="info"
            style="padding:0  16px;margin:10px 0;"
          />
        </el-form-item>

        <el-form-item :label="$t('coupons.coverPhoto')">
          <div class="img-upload">
            <img
              v-if="form.coverImage != null"
              style="width:100%;"
              :src="$fileUrl() + form.coverImage"
            >
            <div v-if="form.coverImage == null" class="upload-box">
              <i class="el-icon-plus logoIcon" />
            </div>
            <editorImage
              urltype="coupon"
              type="custom"
              @successCBK="imageSuccessCoverImage"
            />
          </div>
          <div style="clear:both" />
          <el-alert
            :closable="false"
            :title="$t('userCenter.designMsg')+':850px*350px，'+$t('coupons.imageSize')"
            type="info"
            style="padding:0  16px"
          />
        </el-form-item>

        <el-form-item :label="$t('coupons.coverTitle')">
          <el-row>
            <el-col :span="8">
              <el-input
                v-model="form.abstract"
                :placeholder="$t('coupons.coverPhotoTip')"
                maxlength="12"
                show-word-limit
                clearable
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.privilege')"
          prop="defaultDetail"
        >
          <div class="__text">
            <span v-if="carType == 'discount'">{{ $t('coupons.discountTip1') }}{{ form.userDiscount }}{{ $t('coupons.discountTip2') }};</span>
            <span>{{ form.acceptCategoryInfo }}{{ form.rejectCategoryInfo }}{{ form.canUseWithOtherDiscount ? $t('coupons.canShare') : $t('coupons.noshare') }}</span>
          </div>
          <el-row v-if="carType == 'reduced'">
            <el-col :span="8">
              <el-input
                v-model="form.defaultDetail"
                type="textarea"
                :placeholder="$t('wechat.reply.content')"
                :autosize="{ minRows: 4, maxRows: 6}"
                maxlength="300"
                show-word-limit
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.useNeed')"
          prop="description"
        >
          <div class="__text">{{ $t('coupons.limitGet') }}{{ form.getLimit }}{{ $t('coupons.piece') }}</div>
          <el-row>
            <el-col :span="8">
              <el-input
                v-model="form.description"
                type="textarea"
                :placeholder="$t('wechat.reply.content')"
                :autosize="{ minRows: 4, maxRows: 6}"
                maxlength="300"
                show-word-limit
              />
            </el-col>
          </el-row>
        </el-form-item>
      </div>

      <!-- 商户介绍 -->
      <h3 class="list-title">{{ $t('wechat.coupon.introduce') }}</h3>
      <div class="box">
        <el-form-item :label="$t('coupons.phone')">
          <el-row>
            <el-col :span="8">
              <el-input
                v-model="form.servicePhone"
                :placeholder="$t('coupons.phoneplace')"
                maxlength="11"
                show-word-limit
                clearable
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="$t('coupons.services')">
          <el-row>
            <el-col :span="24">
              <el-checkbox-group v-model="form.serviceStore">
                <el-checkbox
                  label="BIZ_SERVICE_FREE_WIFI"
                  name="serve"
                >{{ $t('coupons.wifi') }}</el-checkbox>
                <el-checkbox
                  label="BIZ_SERVICE_WITH_PET"
                  name="serve"
                >{{ $t('coupons.pets') }}</el-checkbox>
                <el-checkbox
                  label="BIZ_SERVICE_FREE_PARK"
                  name="serve"
                >{{ $t('coupons.parking') }}</el-checkbox>
                <el-checkbox
                  label="BIZ_SERVICE_DELIVER"
                  name="serve"
                >{{ $t('coupons.delivered') }}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>
      </div>

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
                @change="codeDepositTypeSelect"
              >
                <el-radio label="1">{{ $t('coupons.autom') }}</el-radio>
                <el-radio label="2">{{ $t('coupons.import') }}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-radio-group v-model="form.codeLaunchType">
                <el-radio label="1">{{ $t('coupons.pre') }}</el-radio>
                <el-radio label="2">{{ $t('coupons.noPre') }}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.sku')"
          prop="quantity"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.quantity"
                  :disabled="form.codeDepositType == 2"
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
        </el-form-item>

        <el-form-item :label="$t('coupons.setting')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.useLimit"
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
          <el-row>
            <el-col :span="24">
              <el-checkbox
                v-model="form.canShare"
                name="canShareC"
              >{{ $t('coupons.shareUrl') }}</el-checkbox>
              <el-checkbox
                v-model="form.canGiveFriend"
                name="canGiveFriendC"
              >{{ $t('coupons.receiveOther') }}</el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.way')"
          prop="codeDepositType"
        >
          <el-row>
            <el-col :span="24">
              <el-radio-group v-model="form.codeType">
                <el-radio label="CODE_TYPE_TEXT">
                  <span>{{ $t('coupons.onlyCard') }}</span>
                  <span style="color:#f05050;margin-left:15px;">{{ $t('coupons.onlyCardTip') }}</span>
                </el-radio>
              </el-radio-group>
              <br>
              <el-radio-group v-model="form.codeType">
                <el-radio label="CODE_TYPE_QRCODE">
                  <span>{{ $t('coupons.qrCode') }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style="color:#f05050;margin-left:15px;">{{ $t('coupons.qrCodeTip') }}</span>
                </el-radio>
              </el-radio-group>
              <br>
              <el-radio-group v-model="form.codeType">
                <el-radio label="CODE_TYPE_BARCODE">
                  <span>{{ $t('coupons.barCode') }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style="color:#f05050;margin-left:15px;">{{ $t('coupons.barCodeTip') }}</span>
                </el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          :label="$t('coupons.hints')"
          prop="notice"
        >
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.notice"
                  :placeholder="$t('p')"
                  maxlength="16"
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
                :title="$t('coupons.hintsTip')"
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
              <el-radio-group v-model="form.useAllLocations">
                <el-radio :label="false">{{ $t('coupons.useStores') }}</el-radio>
              </el-radio-group>
              <el-button
                v-if="form.useAllLocations == false"
                style="margin-left:55px;"
                type="text"
                @click="addLOcations"
              >{{ $t('coupons.addStores') }}</el-button>
            </el-col>
            <el-col :span="24">
              <el-radio-group v-model="form.useAllLocations">
                <el-radio :label="true">{{ $t('coupons.allStores') }}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item :label="$t('schedule.remark')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.note"
                  :placeholder="$t('p')"
                  maxlength="20"
                  show-word-limit
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>
        </el-form-item>
      </div>

      <h3 class="list-title">{{ $t('wechat.coupon.outerLink') }}</h3>
      <div class="box">
        <el-form-item :label="$t('coupons.outerUrl')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.customUrlName"
                  :placeholder="$t('p')"
                  maxlength="8"
                  show-word-limit
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item :label="$t('coupons.outerUrlAddress')">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-input
                  v-model="form.customUrl"
                  :placeholder="$t('p')"
                  clearable
                />
              </el-col>
              <el-col :span="1" />
            </el-col>
          </el-row>
        </el-form-item>
      </div>

      <el-form-item style="margin-top:30px;">
        <el-button
          size="mini"
          @click="getBack"
        >{{ $t('cancel') }}</el-button>
        <el-button
          size="mini"
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
import { storesTypes, storesList, Addcoupon } from '@/api/wechat/coupon'

export default {
  name: 'WechatCouponAddCoupon',
  components: { editorImage },
  data() {
    return {
      carType: '',
      dialogVisible: false,
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
        logoImgId: null,
        logoImg: null, // 商户图片
        brandName: null, // 商户名称
        color: null, // 卡券颜色
        userDiscount: 0, // 折扣额度
        title: null, // 折扣券标题
        Timestamp: '1', // 固定日期or领取后
        validity: null, // 固定日期
        fixedBeginTerm: null, // 领取后n天
        fixedTerm: null, // 有效天数
        available: '1', // 有效期
        availableTime: [
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY'
        ], // 可用时段
        getLimit: 1, // 领券限制
        acceptCategory: null, // 适用商品
        rejectCategory: null, // 不适应商品
        canUseWithOtherDiscount: false, // 优惠共享,
        coverImage: null, // 封面图片
        coverImageId: null, // 封面图片id
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
        note: null, // 备注
        customUrlName: null, // 外链名称
        customUrl: null, // 外链地址
        reduceCost: null, // 减免金额---代金券
        leastCost: null, // 最低消费---代金券
        leastCostCheck: false,
        defaultDetail: null // 优惠详说明--优惠券
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
        available: [{ required: true, message: '', trigger: 'blur' }],
        codeDepositType: [{ required: true, message: '', trigger: 'blur' }],
        quantity: [{ required: true, message: '', trigger: 'blur' }],
        notice: [
          { required: true, message: '请输入操作提示', trigger: 'blur' }
        ],
        Timestamp: [{ required: true }],
        description: [
          { required: true, message: '请输入使用须知', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate: time => {
          // 设置可选择的日期为今天之后的一个月内
          // const curDate = (new Date()).getTime()
          // // 这里算出一个月的毫秒数,
          // const day = 10 * 24 * 3600 * 1000
          // const dateRegion = curDate + day
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      storeTypeArr: [
        {
          id: -1,
          name: '全部'
        }
      ], // /门店类型选项
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
  mounted() { },
  beforeDestroy() { },
  methods: {
    init() {
      this.carType = this.$route.query.type
      if (this.carType == 'discount') {
        // /折扣券
        this.Rules.userDiscount = [
          { required: true, message: '请输入折扣额度', trigger: 'blur' }
        ]
      }

      if (this.carType == 'reduced') {
        // /优惠券
        this.Rules.defaultDetail = [
          { required: true, message: '请输入优惠说明', trigger: 'blur' }
        ]
      }

      if (this.carType == 'cash') {
        // 代金券
        this.Rules.reduceCost = [
          { required: true, message: '请输入减免金额', trigger: 'blur' }
        ]
      }
    },
    imageSuccessCBK(e) {
      this.form.logoImg = e[0].url.localUrl
      this.form.logoImgId = e[0].url.id
    },
    imageSuccessCoverImage(e) {
      console.log(e)
      this.form.coverImage = e[0].url.localUrl
      this.form.coverImageId = e[0].url.id
    },
    TimestampSelect() {
      if (this.form.Timestamp == 1) {
        this.fixedBeginTerm = ''
        this.fixedTerm = ''
      } else {
        this.form.validity = null
      }
    },
    availableSelect() { },
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
    timeConversion(time) {
      var newTime = new Date(time).getTime()
      return (newTime / 1000).toFixed(0)
    },
    onSubmit(formName) {
      // console.log(this.setSendData())
      if (this.form.Timestamp == 1) {
        if (this.$isNull(this.form.validity)) {
          this.$notify.error({
            title: '错误',
            message: '请选择有效期'
          })
          return
        }
      } else {
        if (
          this.$isNull(this.form.fixedBeginTerm) ||
          this.$isNull(this.form.fixedTerm)
        ) {
          this.$notify.error({
            title: '错误',
            message: '请选择有效期'
          })
          return
        }
      }

      this.$refs[ formName ].validate(valid => {
        if (valid) {
          const sendData = this.setSendData()
          sendData.loading = true
          if (this.$i18n.locale == 'en-US') {
            sendData.extraInfo = JSON.stringify(sendData)
          }
          console.log(sendData)
          Addcoupon(sendData).then(res => {
            if (res.code == 0) {
              this.$router.push({
                name: 'wechat-coupon-list'
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
        cardType: '', // 券型
        codeDepositType: parseInt(this.form.codeDepositType), // 1:自动 2:导入
        codeLaunchType: parseInt(this.form.codeLaunchType), // 券号  1:预存  2:非预存
        couponInfo: {
          baseInfo: {
            locationIdList: this.form.useAllLocations
              ? null
              : this.form.locationIdList, // 门店id
            useAllLocations: !!this.form.useAllLocations, // 使用全部门店
            customUrlName: this.form.customUrlName, // 外连名
            customUrl: this.form.customUrl, // 外链地址
            logoUrl: this.form.logoImgId, // 商户头像id
            brandName: this.form.brandName, // 商户名称
            codeType: this.form.codeType, // 码型：
            /* CODE_TYPE_TEXT         文本仅code类型
              CODE_TYPE_BARCODE      一维码
              CODE_TYPE_QRCODE       二维码
              CODE_TYPE_ONLY_QRCODE  二维码无code显示
              CODE_TYPE_ONLY_BARCODE 一维码无code显示
              CODE_TYPE_NONE         不显示code和条形码类型 */
            title: this.form.title, // 卡券标题
            color: this.form.color, // 卡券颜色
            notice: this.form.notice, // 操作提示语
            description: this.form.description, // 使用须知
            servicePhone: this.form.servicePhone, // 商户电话
            sku: {
              quantity: this.form.quantity // 库存 useCustomCode:true 时 库存为0
            },
            dateInfo: {
              type: '', // DATE_TYPE_FIX _TIME_RANGE 表示固定日期区间，DATE_TYPE_FIX_TERM 表示固定时长
              beginTimestamp: null, //  固定开始时间
              endTimestamp: null,
              fixedTerm: null, // 领取后多少天内有效，不支持填写0。
              fixedBeginTerm: null // 领取后多少天开始生效，领取后当天生效填写0。（单位为天）       //  固定结束时间
            },
            getLimit: this.form.getLimit, // 每人可领券的数量限制
            useLimit: this.form.useLimit, // 没人核销数量限制
            canShare: this.form.canShare, // 卡券领取页面是否可分享
            canGiveFriend: this.form.canGiveFriend, // 卡券是否可转赠
            // customUrlName: null, //入口名称
            customUrlSubTitle: this.form.customUrlSubTitle // 引导语
            // 可用时段
          },
          advancedInfo: {
            abstract: {
              abstract: this.form.abstract, // 封面摘要简介
              iconUrlList: [] // 封面图片
            },
            textImageList: [],
            businessService: this.form.serviceStore, // 商家服务类型： BIZ_SERVICE_DELIVER 外卖服务； BIZ_SERVICE_FREE_PARK 停车位； BIZ_SERVICE_WITH_PET 可带宠物； BIZ_SERVICE_FREE_WIFI 免费wifi， 可多选
            useCondition: {
              acceptCategory: this.form.acceptCategory, // 指定可用的商品类目，仅用于代金券类型
              rejectCategory: this.form.rejectCategory, // 指定不可用的商品类目，仅用于代金券类型
              leastVost: null, // 满减门槛字段，可用于兑换券和代金券
              objectUseFor: null, // 购买xx可用类型门槛，仅用于兑换
              canUseWithOtherDiscount: this.form.canUseWithOtherDiscount // 不可以与其他类型共享门槛 ，填写false时系统将在使用须知里 拼写“不可与其他优惠共享”， 填写true时系统将在使用须知里 拼写“可与其他优惠共享”， 默认为true
            },
            timeLimit: [] // 时间段
          },
          note: this.form.note // 备注信息
        }
      }

      // //有效期组织数据
      if (this.form.Timestamp == 1) {
        cardDataInfo.couponInfo.baseInfo.dateInfo.type =
          'DATE_TYPE_FIX_TIME_RANGE'
        cardDataInfo.couponInfo.baseInfo.dateInfo.beginTimestamp = this.timeConversion(
          this.form.validity[0]
        )
        cardDataInfo.couponInfo.baseInfo.dateInfo.endTimestamp = this.timeConversion(
          this.form.validity[1]
        )
      } else {
        cardDataInfo.couponInfo.baseInfo.dateInfo.type = 'DATE_TYPE_FIX_TERM'
        cardDataInfo.couponInfo.baseInfo.dateInfo.fixedTerm = this.form.fixedTerm
        cardDataInfo.couponInfo.baseInfo.dateInfo.fixedBeginTerm = this.form.fixedBeginTerm
      }

      // 封面图片
      if (!this.$isNull(this.form.coverImage)) {
        cardDataInfo.couponInfo.advancedInfo.abstract.iconUrlList.push(
          this.form.coverImageId
        )
      }

      // /时间段
      if (this.form.available == 1) {
        cardDataInfo.couponInfo.advancedInfo.timeLimit = []
      } else {
        if (this.form.availableTime.length > 0) {
          this.form.availableTime.map(val => {
            this.availableTimeArray.map(item => {
              if (
                !this.$isNull(item.beginHour) &&
                !this.$isNull(item.beginMinute) &&
                !this.$isNull(item.endHour) &&
                !this.$isNull(item.endMinute)
              ) {
                const option = {
                  type: val,
                  beginHour: item.beginHour,
                  beginMinute: item.beginMinute,
                  endHour: item.endHour,
                  endMinute: item.endMinute
                }

                cardDataInfo.couponInfo.advancedInfo.timeLimit.push(option)
              }
            })
          })
        }
      }

      if (this.carType == 'discount') {
        // 折扣券
        cardDataInfo.cardType = 'DISCOUNT'
        cardDataInfo.couponInfo.discount = 100 - this.form.userDiscount * 10 // 折扣额度
      }

      if (this.carType == 'reduced') {
        // 优惠券
        cardDataInfo.cardType = 'GENERAL_COUPON'
        cardDataInfo.couponInfo.defaultDetail = this.form.defaultDetail // 优惠说明
      }

      if (this.carType == 'cash') {
        // 代金券
        cardDataInfo.cardType = 'CASH'
        cardDataInfo.couponInfo.leastCost = this.form.leastCost ? this.form.leastCost * 100 : 0 // 最低消费
        cardDataInfo.couponInfo.reduceCost = this.form.reduceCost // 减免金额
      }

      return cardDataInfo
    },
    leastCostChange() {
      if (!this.form.leastCostCheck) {
        this.form.leastCost = null
      }
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
        name: 'wechat-coupon-list'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
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
</style>

