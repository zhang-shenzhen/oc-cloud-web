<template>
  <d2-container class="page">
    <h3 class="list-title">{{ $t('store.add') }}</h3>

    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-position="left"
      :rules="rules"
      label-width="120px"
      class="ruleForm"
    >
      <el-row>
        <el-col :span="10">

          <el-form-item
            label="门店名称"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="门店名称"
            />
          </el-form-item>

          <el-form-item
            label="Store Name"
            prop="nameEn"
          >
            <el-input
              v-model="ruleForm.nameEn"
              placeholder="Store Name"
            />
          </el-form-item>

          <el-form-item :label="$t('store.upPic')" prop="imglist">
            <editorImage
              :quan-tity="5"
              urltype="default"
              type="default"
              @successCBK="imageSuccessCBK"
            />
            <el-alert
              :closable="false"
              :title="$t('userCenter.designMsg')+':850px*350px，'+$t('coupons.imageSize')"
              type="info"
              style="padding:0  16px;margin:10px 0;"
            />
            <div class="img-box">
              <div
                v-for="(img,index) in imglist"
                :key="index"
                class="img"
              >
                <img :src="$fileUrl() + img.photoLocalUrl">
                <div class="del-div">
                  <el-button
                    type="danger"
                    class="del-icon"
                    icon="el-icon-delete"
                    circle
                    @click="delIMg(index)"
                  />
                </div>
              </div>
              <div style="clear:both" />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              size="small"
              @click="$router.push({
                name:'storeManagementList'
              })"
            >{{ $t('cancel') }}</el-button>
            <el-button
              size="small"
              type="primary"
              @click="query.type=='edit'?submitForm('add'):submitForm('edit')"
            >{{ $t('confirm') }}</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>

  </d2-container>
</template>
<script>

import Address from '@/components/address'
import editorImage from '@/components/Tinymce/components/editorImage'
import { addStore, StoreInfo, updateStore } from '@/api/storeManagement/storeManagement'

import { txMap } from './txMap.js'
export default {
  name: 'MarketingStoreManagementAddStore',
  components: { Address, editorImage },
  data() {
    return {
      ruleForm: {
        targetType: 2, // 关联商户类型：1微信，2自有门店
        code: '01', // 门店
        storeLevel: 1,
        name: '',
        photoList: '',
        contactPhone: '11111111111',
        telephone: '11111111111',
        businessStartTime: '00:00',
        businessEndTime: '00:00',
        nameEn: '',
        extraInfo: {
          name: ''
        },
        storeType: 3

      },

      rules: {
        name: [
          { required: true, message: '请选择门店名称', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: 'Please select the store name', trigger: 'blur' }
        ]
      },
      imglist: [],
      query: ''
    }
  },
  computed: {},
  created() {
    this.query = this.$route.query
    console.log(this.query)
    if (this.query.type == 'edit') {
      StoreInfo(this.query.id).then(res => {
        this.ruleForm.code = res.data.code
        this.ruleForm.name = res.data.name
        this.imglist = res.data.photoList
        this.ruleForm.photoList = res.data.photoList
        this.ruleForm.telephone = res.data.telephone
        this.ruleForm.contactPhone = res.data.contactPhone
        this.ruleForm.businessStartTime = res.data.businessStartTime
        this.ruleForm.businessEndTime = res.data.businessEndTime
        this.ruleForm.extraInfo = res.data.extraInfo != null ? JSON.parse(res.data.extraInfo) : { name: '' }
        this.ruleForm.nameEn = this.ruleForm.extraInfo.name
      })
    }
  },
  mounted() {
    txMap().then((qq) => {
      const location = {
        lat: 31.22352,
        lng: 121.45591
      }
    })
  },
  beforeDestroy() { },
  methods: {
    imageSuccessCBK(val) {
      console.log(val)
      val.map(res => {
        this.imglist.push({
          photoLocalUrl: res.url[0].url,
          photoId: res.uid
        })
      })
      console.log(this.imglist)
    },
    delIMg(index) {
      this.imglist.splice(index, 1)
    },
    submitForm(formName) {
      this.ruleForm.photoList = this.imglist
      this.ruleForm.extraInfo.name = this.ruleForm.nameEn
      this.ruleForm.extraInfo = JSON.stringify(this.ruleForm.extraInfo)
      if (this.query.type == 'add') {
        this.ruleForm.businessStartTime = this.ruleForm.businessStartTime + ':00'
        this.ruleForm.businessEndTime = this.ruleForm.businessEndTime + ':00'
        addStore(this.ruleForm).then(res => {
          if (res.code == 0 && res.data != false) {
            this.$router.push({
              name: 'haxnbauer-store-list'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '添加门店失败'
            })
          }
        })
      } else if (this.query.type == 'edit') {
        this.ruleForm.id = this.query.id
        updateStore(this.ruleForm).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'haxnbauer-store-list'
            })
          }
        })
      }
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
    // height: 150px;
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

