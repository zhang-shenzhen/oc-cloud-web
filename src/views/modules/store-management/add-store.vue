<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.addStore') }}</h3>

    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-position="left"
             label-width="160px"
             class="ruleForm">
      <el-row>
        <el-col :span="14"
                :offset="4">
          <el-form-item :label="$t('store.storeCorrType')"
                        prop="targetType">
            <el-radio-group v-model="ruleForm.targetType">
              <el-radio label="1">{{ $t('store.storeWeChat') }}</el-radio>
              <el-radio label="2">{{ $t('store.storeSelf') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item
            label="门店类目"
            prop="category"
          >
            <el-select
              v-model="ruleForm.category"
              placeholder="请选择"
            >
              <el-option
                label="区域一"
                value="shanghai"
              >层级一</el-option>
              <el-option
                label="区域二"
                value="beijing"
              >层级二</el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item :label="$t('store.store')+'ID'"
                        prop="code">
            <el-input v-if="$route.query.type == 'edit'"
                      v-model="ruleForm.code"
                      :placeholder="$t('store.storePloher')"
                      disabled />
            <el-input v-else
                      v-model="ruleForm.code"
                      :placeholder="$t('store.storePloher')" />
          </el-form-item>

          <el-form-item label="门店名称"
                        prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="门店名称" />
          </el-form-item>

          <el-form-item label="Store name"
                        prop="nameEn">
            <el-input v-model="ruleForm.extraInfo.name"
                      placeholder="Store name" />
          </el-form-item>

          <el-form-item label="分店名(选填)">
            <el-input v-model="ruleForm.branchName"
                      placeholder="分店名" />
          </el-form-item>

          <el-form-item label="Branch name(optional)">
            <el-input v-model="ruleForm.extraInfo.branchName"
                      placeholder="Branch name" />
          </el-form-item>

          <el-form-item :label="$t('store.storeLevel')"
                        prop="storeLevel">

            <el-cascader v-model="ruleForm.storeLevel"
                         :placeholder="$t('oss.qcloudRegionTips')"
                         :options="levelData"
                         @change="handleChange" />
          </el-form-item>

          <el-form-item :label="$t('store.StoreType')"
                        prop="storeType">
            <el-select v-model="ruleForm.storeType"
                       :placeholder="$t('oss.qcloudRegionTips')">
              <el-option v-for="item in storeTypeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('store.city')">
            <Address ref="mychild"
                     :addvalue="addressValue"
                     @getValue="getCheckValue" />
          </el-form-item>

          <el-form-item :label="$t('wechat.groupMessages.location')">
            <div class="address-box">
              <div class="left">
                <el-input v-model="ruleForm.address"
                          :placeholder="$t('oss.qcloudRegionTips')" />
              </div>
              <div class="right">
                <el-button type="primary"
                           @click="searchAdress">{{ $t('layout.tooltip.search') }}</el-button>
              </div>
              <div style="clear:both;" />
            </div>
            <!-- 地图 -->
            <div id="container"
                 class="map" />
          </el-form-item>

          <el-form-item label="联系人"
                        prop="contact">
            <el-input v-model="ruleForm.contact"
                      placeholder="联系人名称" />
          </el-form-item>
          <el-form-item label="Contacts"
                        prop="contactEn">
            <el-input v-model="ruleForm.extraInfo.contact"
                      placeholder="Contact name" />
          </el-form-item>

          <el-form-item :label="$t('store.storeContactPhone')"
                        prop="contactPhone">
            <el-input v-model="ruleForm.contactPhone"
                      :placeholder="$t('store.storeContactPhone')" />
          </el-form-item>

          <el-form-item :label="$t('store.clerkUpPhoto')+'('+$t('store.clerkMsg')+')'">
            <editorImage :quan-tity="5"
                         urltype="default"
                         type="default"
                         @successCBK="imageSuccessCBK" />
            <el-alert :closable="false"
                      :title="$t('userCenter.designMsg')+':850px*350px，'+$t('coupons.imageSize')"
                      type="info"
                      style="padding:0  16px;margin:10px 0;" />
            <div class="img-box">
              <div v-for="(img,index) in imglist"
                   :key="index"
                   class="img">
                <img :src="$fileUrl() + img.photoLocalUrl">
                <div class="del-div">
                  <el-button type="danger"
                             class="del-icon"
                             icon="el-icon-delete"
                             circle
                             @click="delIMg(index)" />
                </div>
              </div>
              <div style="clear:both" />
            </div>
          </el-form-item>

          <el-form-item :label="$t('store.storePhone')"
                        prop="telephone">
            <el-input v-model="ruleForm.telephone"
                      :placeholder="$t('store.storePhone')" />
          </el-form-item>

          <el-form-item :label="$t('store.businessHours')+'('+$t('store.clerkMsg')+')'"
                        prop="businessStartTime">
            <el-col :span="11">
              <el-time-select v-model="ruleForm.businessStartTime"
                              style="width:100%"
                              :placeholder="$t('datePicker.start')"
                              :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '23:45'
                }" />
            </el-col>
            <el-col style="text-align:center;"
                    :span="2">{{ $t('datePicker.range') }}</el-col>
            <el-col :span="11">
              <el-time-select v-model="ruleForm.businessEndTime"
                              style="width:100%"
                              :placeholder="$t('datePicker.end')"
                              :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '23:45'
                }" />
            </el-col>
          </el-form-item>

          <el-form-item :label="$t('store.avgPrice')+'('+$t('store.clerkMsg')+')'">
            <el-input v-model="ruleForm.avgPrice"
                      :placeholder="$t('store.price')"
                      type="number" />
          </el-form-item>

          <el-form-item :label="$t('store.service')+'('+$t('store.clerkMsg')+')'">
            <el-input v-model="ruleForm.special"
                      :placeholder="$t('store.service')" />
          </el-form-item>

          <el-form-item :label="$t('store.clerkRemark')+'('+$t('store.clerkMsg')+')'">
            <el-input v-model="ruleForm.recommend"
                      type="textarea"
                      :placeholder="$t('store.clerkRemark')"
                      :autosize="{ minRows: 4, maxRows: 6 }" />
          </el-form-item>

          <el-form-item>
            <el-button size="small"
                       @click="$router.go(-1);">{{ $t('wechat.menu.btn4') }}</el-button>
            <el-button size="small"
                       type="primary"
                       @click="submitForm('ruleForm')">{{ $t('member.filter.keep') }}</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>

  </d2-container>
</template>
<script>

import Address from '@/components/address'
import editorImage from '@/components/Tinymce/components/editorImage'
import { StoreInfo, addStore, storesTypes, updateStore, levelList } from '@/api/storeManagement/storeManagement'
import { cookieGet } from '@/common/cookie'

import { txMap } from './txMap.js'
var num = 1
export default {
  name: 'MarketingStoreManagementAddStore',
  components: { Address, editorImage },
  data () {
    return {
      storeTypeList: [],
      levelData: [],
      ruleForm: {
        'address': '', // 地址
        'avgPrice': '', // 人均价格
        'branchName': '', // 分店名
        'businessEndTime': '',
        'businessStartTime': '',
        'category': '', // 门店类目
        'city': '',
        'code': '', // 门店id
        'enable': 1, // 是否开启状态
        'cityName': '', // 城市
        'companyId': '',
        'contact': '', // 联系人
        'contactPhone': '', // 联系人电话
        'district': '', // 区
        'districtName': '', // 区
        'latitude': '', // 纬度
        'longitude': '', // 经度
        'name': '', // 门店名称
        'photoList': [], // 图片
        'province': '', // 省
        'provinceName': '',
        'recommend': '',
        'special': '', // 特色服务
        'storeLevel': '', // 门店层级
        'storeType': '', // 门店类型
        'targetType': '2', // 关联商户类型
        'telephone': '', //  门店电话
        'wechatId': JSON.parse(cookieGet('Httpheader')).ChannelId,
        extraInfo: {
          name: '',
          branchName: '',
          contact: ''
        }
      },
      rules: {
        code: [
          { required: true, message: '请输入门店ID', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入门店电话', trigger: 'blur' }
        ],
        storeLevel: [
          { required: true, message: '请选择门店层级', trigger: 'change' }
        ],
        storeType: [
          { required: true, message: '请选择门店类型', trigger: 'change' }
        ],
        businessStartTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      addressValue: [], // 地址id
      addressInfo: {
        province: null,
        city: null,
        district: null
      },
      imglist: []
    }
  },
  computed: {},
  created () {
    // 获取门店详情
    this.init()
  },
  mounted () {
  },
  beforeDestroy () { },
  methods: {
    init () {
      storesTypes().then(res => {
        if (res.code == 0) {
          this.storeTypeList = res.data
        }
      })

      levelList().then(res => {
        if (res.code == 0) {
          res.data = JSON.parse(JSON.stringify(res.data).replace(/sunList/g, 'children'))
          res.data = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'label'))
          res.data = JSON.parse(JSON.stringify(res.data).replace(/id/g, 'value'))
          // 删除对层对象中children属性值为空的
          this.gethref(res.data)
          console.log(res.data)
          this.levelData = res.data
        }
      })
      // 获取门店详情
      if (this.$route.query.type == 'edit') {
        this.getStoreInfo()
      } else {
        txMap().then((qq) => {
          const location = {
            lat: 31.22352,
            lng: 121.45591
          }
          this.showMap(location)
        })
      }
    },

    getStoreInfo () {
      StoreInfo(this.$route.query.id).then(res => {
        if (res.code == 0) {
          // 门店详情数据处理
          console.log(res, '详情数据参数')
          res.data.extraInfo = res.data.extraInfo != null ? JSON.parse(res.data.extraInfo) : ''
          this.ruleForm = res.data
          this.ruleForm.targetType = res.data.targetType.toString()
          var address = []
          address.push(res.data.province)
          address.push(res.data.city)
          address.push(res.data.district)
          this.addressValue = address

          this.addressInfo.province = res.data.provinceName
          this.addressInfo.city = res.data.cityName
          this.addressInfo.district = res.data.districtName

          this.imglist = this.ruleForm.photoList
          // 地图默认值
          txMap().then((qq) => {
            const location = {
              lat: res.data.latitude,
              lng: res.data.longitude
            }
            this.showMap(location)
          })
          // 营业时间
          this.ruleForm.businessStartTime = res.data.businessStartTime.match(/(\S*):/)[1]
          this.ruleForm.businessEndTime = res.data.businessEndTime.match(/(\S*):/)[1]
          console.log(this.addressValue, this.ruleForm)

          // 地址默认值传递
          this.$refs.mychild.showData(address)
        }
      })
    },

    gethref (dt, n) {
      dt.forEach((ev) => {
        if (ev.children.length <= 0) {
          delete ev.children
        } else {
          this.gethref(ev.children, ++num)
        }
      })
    },

    getCheckValue (val) {
      console.log(val)
      // 赋值给ruleForm省市区id以及名称
      this.ruleForm.province = val[0].id
      this.ruleForm.city = val[1].id
      this.ruleForm.district = val[2].id
      this.ruleForm.provinceName = val[0].label
      this.ruleForm.cityName = val[1].label
      this.ruleForm.districtName = val[2].label

      this.addressInfo.province = val[0].label
      this.addressInfo.city = val[1].label
      this.addressInfo.district = val[2].label
    },
    // 地图搜索按钮
    searchAdress () {
      if (this.$isNull(this.addressInfo.province)) {
        this.$notify.error({
          title: this.$t('member.filter.error'),
          message: this.$t('store.selectCity')
        })
        return
      }

      if (this.$isNull(this.ruleForm.address)) {
        this.$notify.error({
          title: this.$t('member.filter.error'),
          message: this.$t('store.allAddress')
        })
        return
      }

      // console.log(this.addressInfo.province + this.addressInfo.city + this.addressInfo.district + this.ruleForm.address)
      const KEY = 'S3RBZ-LJ76D-AQ54R-H73AR-L6ZEF-CHFCI'
      const url = 'https://apis.map.qq.com/ws/geocoder/v1/'
      this.$jsonp(url, {
        key: KEY,
        callbackName: 'QQmap',
        output: 'jsonp',
        address: this.addressInfo.province + this.addressInfo.city + this.addressInfo.district + this.ruleForm.address
      })
        .then(json => {
          const location = json.result.location
          this.showMap(location)
          this.ruleForm.latitude = location.lat, // 纬度
            this.ruleForm.longitude = location.lng, // 经度
            console.log(location)
        })
      // .catch(err => {
      //   this.ruleForm.address = null
      //   this.$notify.error({
      //     title: '错误',
      //     message: '未找到该地址'
      //   })
      // })
    },
    showMap (location) {
      const map = new qq.maps.Map(document.getElementById('container'), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(location.lat, location.lng),
        zoom: 15, // 设置缩放级别
        draggable: true, // 设置是否可以拖拽
        scrollwheel: true, // 设置是否可以滚动
        disableDoubleClickZoom: true, // 设置是否可以双击放大
        scaleControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [
          ]
        }, // 置空地图类型
        zoomControl: false // 设置是否可以缩放
      })
      var marker = new qq.maps.Marker({
        // 设置Marker的位置坐标
        position: new qq.maps.LatLng(location.lat, location.lng),
        // 设置显示Marker的地图
        map: map
      })
    },
    // 层级选择事件
    handleChange (value) {
      this.ruleForm.storeLevel = value[value.length - 1]
      console.log(value[value.length - 1])
    },
    // 上传图片
    imageSuccessCBK (val) {
      console.log(val)
      val.map(res => {
        this.imglist.push({
          photoLocalUrl: res.url[0].url,
          photoId: res.uid
        })
      })
    },
    // 删除图片
    delIMg (index) {
      this.imglist.splice(index, 1)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 赋值给ruleForm
          this.ruleForm.businessStartTime = this.ruleForm.businessStartTime ? this.ruleForm.businessStartTime + ':00' : ''
          this.ruleForm.businessEndTime = this.ruleForm.businessEndTime ? this.ruleForm.businessEndTime + ':00' : ''
          this.ruleForm.photoList = this.imglist
          this.ruleForm.extraInfo = JSON.stringify(this.ruleForm.extraInfo)
          // 保存请求接口
          if (this.$route.query.type == 'edit') {
            this.ruleForm.id = this.$route.query.id
            updateStore(this.ruleForm).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.$router.push({
                  name: 'storeManagement-Store'
                })
              } else {
                this.ruleForm.extraInfo = JSON.parse(this.ruleForm.extraInfo)
              }
            })
          } else {
            addStore(this.ruleForm).then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: this.$t('schedule.statusLog1'),
                  message: this.$t('prompt.success'),
                  type: 'success'
                })
                this.$router.go(-1);
              } else {
                this.ruleForm.extraInfo = JSON.parse(this.ruleForm.extraInfo)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ruleForm {
  margin-top: 30px;
}
.el-form-item {
  margin: 20px 0;
}
.address-box {
  width: 100%;
  .left {
    width: calc(100% - 90px);
    float: left;
  }
  .right {
    width: 70px;
    float: right;
  }
}
.map {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
.img-box {
  width: 100%;
  .img {
    width: 300px;
    height: 150px;
    overflow: hidden;
    float: left;
    margin: 0 10px 10px 0;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .del-div {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      .del-icon {
        position: relative;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
      }
    }
  }
  .img:hover .del-div {
    display: block;
  }
}
</style>

