<template>
  <d2-container class="page">
    <div class="user-center">
      <div class="title">{{ $t('userCenter.title') }}</div>
      <div class="list-title">
        <div style="min-width:630px;width:60%">{{ $t('userCenter.data') }}</div>
        <div style="padding:0 20px;">{{ $t('userCenter.preview') }}</div>
      </div>
      <div>
        <div style="display:flex;">
          <el-form ref="form" :model="form" label-width="80px" style="min-width:630px;width:60%">

            <el-form-item :label="$t('userCenter.design')">
              <el-radio-group v-model="form.cardValue">
                <el-radio :label="1" @change="handleCradValue">{{ $t('userCenter.oneself') }}</el-radio>
                <el-radio :label="2" @change="handleCradValue">{{ $t('userCenter.background') }}</el-radio>
                <el-radio :label="3" @change="handleCradValue">{{ $t('userCenter.backgroundImage') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-if="form.cardValue==2"
                v-model="form.cardColor"
                size="mini"
                type="color"
              />
              <div v-if="form.cardValue==3">
                <p>{{ $t('userCenter.designMsg') }}：1000px*600px</p>
                <div class="img-upload" style>
                  <img v-if="form.cardImage != null&&form.cardImage != ''" style="width:100%" :src="$fileUrl()+form.cardImage">
                  <div v-if="form.cardImage == null||form.cardImage == ''" class="upload-box">
                    <i class="el-icon-plus logoIcon" />
                  </div>
                  <editorImage
                    type="custom"
                    @successCBK="imageSuccessCBK"
                  />
                </div>
              </div>
            </el-form-item>

            <el-form-item v-if="$i18n.locale=='zh-CN'" style="margin-bottom:20px" label="会员功能(横向列表)">
              <!-- 表格 -->
              <div style="width:100%;border:1px solid #e5e5e5">
                <div class="tableTitle flex">
                  <span>功能名称</span>
                  <span>跳转链接</span>
                  <span>上传icon</span>
                  <span>操作</span>
                </div>
                <div v-for="(item,index) in tableDataHeng" :key="index" class="tableList flex">

                  <div class="item">
                    <el-input
                      v-model="item.name"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <el-input
                      v-model="item.url"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <div class="img-upload">
                      <img v-if="item.icon != null&&item.icon != ''" style="width:20px;height:20px;" :src="$fileUrl()+item.icon">
                      <div v-if="item.icon == null||item.icon == ''" class="upload-box">
                        <i class="el-icon-plus logoIcon" />
                      </div>
                      <editorImage
                        type="custom"
                        :cid="index+1"
                        direction="heng"
                        @successCBK="imageSuccessCBK"
                      />
                    </div>
                  </div>

                  <div class="item">
                    <el-button size="mini" type="danger" @click="handleDel(index,'zh','heng')">删除</el-button>
                  </div>
                </div>

                <el-button size="mini" type="primary" style="margin:0 20px 20px" @click="handleAdd('zh','heng')">添加</el-button>
              </div>

            </el-form-item>

            <el-form-item v-else style="margin-bottom:20px" label="Member function(Horizontal list)">
              <!-- 表格 -->
              <div style="width:100%;border:1px solid #e5e5e5">
                <div class="tableTitle flex">
                  <span>Function Name</span>
                  <span>Skip links</span>
                  <span>Upload icon</span>
                  <span>Action</span>
                </div>
                <div v-for="(item,index) in tableDataHengEn" :key="index" class="tableList flex">

                  <div class="item">
                    <el-input
                      v-model="item.name"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <el-input
                      v-model="item.url"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <div class="img-upload">
                      <img v-if="item.icon != null&&item.icon != ''" style="width:20px;height:20px;" :src="$fileUrl()+item.icon">
                      <div v-if="item.icon == null||item.icon == ''" class="upload-box">
                        <i class="el-icon-plus logoIcon" />
                      </div>
                      <editorImage
                        type="custom"
                        :cid="index+1"
                        direction="heng"
                        @successCBK="imageSuccessCBKEn"
                      />
                    </div>
                  </div>

                  <div class="item">
                    <el-button size="mini" type="danger" @click="handleDel(index,'en','heng')">Delete</el-button>
                  </div>
                </div>

                <el-button size="mini" type="primary" style="margin:0 20px 20px" @click="handleAdd('en','heng')">Add</el-button>
              </div>

            </el-form-item>

            <el-form-item v-if="$i18n.locale=='zh-CN'" style="margin-bottom:20px" label="会员功能(竖向列表)">
              <!-- 表格 -->
              <div style="width:100%;border:1px solid #e5e5e5">
                <div class="tableTitle flex">
                  <span>功能名称</span>
                  <span>跳转链接</span>
                  <span>上传icon</span>
                  <span>操作</span>
                </div>
                <div v-for="(item,index) in tableData" :key="index" class="tableList flex">

                  <div class="item">
                    <el-input
                      v-model="item.name"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <el-input
                      v-model="item.url"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <div class="img-upload">
                      <img v-if="item.icon != null&&item.icon != ''" style="width:20px;height:20px;" :src="$fileUrl()+item.icon">
                      <div v-if="item.icon == null||item.icon == ''" class="upload-box">
                        <i class="el-icon-plus logoIcon" />
                      </div>
                      <editorImage
                        type="custom"
                        :cid="index+1"
                        direction="shu"
                        @successCBK="imageSuccessCBK"
                      />
                    </div>
                  </div>

                  <div class="item">
                    <el-button size="mini" type="danger" @click="handleDel(index,'zh','shu')">删除</el-button>
                  </div>
                </div>

                <el-button size="mini" type="primary" style="margin:0 20px 20px" @click="handleAdd('zh','shu')">添加</el-button>
              </div>

            </el-form-item>

            <el-form-item v-else style="margin-bottom:20px" label="Member function(Vertical list)">
              <!-- 表格 -->
              <div style="width:100%;border:1px solid #e5e5e5">
                <div class="tableTitle flex">
                  <span>Function Name</span>
                  <span>Skip links</span>
                  <span>Upload icon</span>
                  <span>Action</span>
                </div>
                <div v-for="(item,index) in tableDataEn" :key="index" class="tableList flex">

                  <div class="item">
                    <el-input
                      v-model="item.name"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <el-input
                      v-model="item.url"
                      size="mini"
                      type="text"
                    />
                  </div>

                  <div class="item">
                    <div class="img-upload">
                      <img v-if="item.icon != null&&item.icon != ''" style="width:20px;height:20px;" :src="$fileUrl()+item.icon">
                      <div v-if="item.icon == null||item.icon == ''" class="upload-box">
                        <i class="el-icon-plus logoIcon" />
                      </div>
                      <editorImage
                        type="custom"
                        :cid="index+1"
                        direction="shu"
                        @successCBK="imageSuccessCBKEn"
                      />
                    </div>
                  </div>

                  <div class="item">
                    <el-button size="mini" type="danger" @click="handleDel(index,'en','shu')">Delete</el-button>
                  </div>
                </div>

                <el-button size="mini" type="primary" style="margin:0 20px 20px;" @click="handleAdd('en','shu')">Add</el-button>
              </div>

            </el-form-item>
          </el-form>

          <div class="rightBox">
            <div style="background:#f2f2f2;padding:10px;width:375px">
              <div class="phoneBox">
                <div class="cardView" :style="{ background: form.cardColor?form.cardColor:'#f2f2f2'}">
                  <img :src="$fileUrl()+form.cardImage" class="cardView-BackImg" alt>
                  <div class="cardView-top">
                    <div class="cardView-top-head">
                      <img
                        style="width:100%;height:100%;"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569317063513&di=910cfea4f0e2fd7751da3c60e637f3bd&imgtype=0&src=http%3A%2F%2Fimg10.360buyimg.com%2FpopWaterMark%2Fjfs%2Ft412%2F187%2F416066273%2F21190%2Fa1cd0ea9%2F541b85a0Nc285cad3.jpg"
                        alt
                      >
                    </div>
                    <div class="cardView-top-name">{{ $t('userCenter.membership') }}</div>
                  </div>
                  <div class="cardView-bottom">
                    <div class="cardView-bottom-Ctype" />
                    <div class="cardView-bottom-Cid">{{ $t('userCenter.membershipCard') }}：</div>
                  </div>
                </div>

                <div class="listTab" style="display:flex">
                  <div v-if="$i18n.locale=='zh-CN'" class="flex" style="justify-content: space-between;flex-wrap: wrap;width:100%;">
                    <div v-for="(item,index) in tableDataHeng" :key="index" class="tabItem flex">
                      <div class="img">
                        <img v-if="item.icon != null&&item.icon != ''" :src="$fileUrl()+item.icon">
                      </div>
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                  <div v-else class="flex" style="justify-content: space-between;flex-wrap: wrap;width:100%;">
                    <div v-for="(item,index) in tableDataHengEn" :key="index" class="list-item flex">
                      <div class="img">
                        <img v-if="item.icon != null&&item.icon != ''" :src="$fileUrl()+item.icon">
                      </div>
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
                <div class="list">
                  <div class="listTitle">{{ $t('userCenter.function') }}</div>
                  <div v-if="$i18n.locale=='zh-CN'" class="right-shu-list">
                    <div v-for="(item,index) in tableData" :key="index" class="list-item flex">
                      <div class="img">
                        <img v-if="item.icon != null&&item.icon != ''" :src="$fileUrl()+item.icon">
                      </div>
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                  <div v-else class="right-shu-list">
                    <div v-for="(item,index) in tableDataEn" :key="index" class="list-item flex">
                      <div class="img">
                        <img v-if="item.icon != null&&item.icon != ''" :src="$fileUrl()+item.icon">
                      </div>
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buts" style="text-align: center;margin-top:50px;">
        <el-button size="mini" type="primary" @click="onSubmit">{{ $t('confirm') }}</el-button>
        <el-button size="mini" @click="$rouetr.go(-1)">{{ $t('delete') }}</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
import editorImage from '@/components/Tinymce/components/editorImage'
import { cookieGet } from '@/common/cookie'
import { postConfig, getConfig } from '@/api/member/member'
export default {
  components: { editorImage },
  data() {
    return {
      form: {
        cardValue: 1,
        cardColor: '',
        cardImage: ''
      },
      tableData: [{
        name: '',
        url: '',
        icon: ''
      }],
      tableDataEn: [{
        name: '',
        url: '',
        icon: ''
      }],
      tableDataHeng: [{
        name: '',
        url: '',
        icon: ''
      }],
      tableDataHengEn: [{
        name: '',
        url: '',
        icon: ''
      }]
    }
  },
  computed: {},
  created() {
    getConfig().then((res) => {
      console.log(res)
      this.form.cardColor = res.backgroundColor
      this.form.cardImage = res.backgroundImg
      this.form.cardValue = res.backgroundType
      this.tableData = JSON.parse(res.functionArray).shu
      this.tableDataHeng = JSON.parse(res.functionArray).heng
      this.tableDataEn = res.extraInfo ? JSON.parse(res.extraInfo).shu : [{
        name: '',
        url: '',
        icon: ''
      }]
      this.tableDataHengEn = res.extraInfo ? JSON.parse(res.extraInfo).heng : [{
        name: '',
        url: '',
        icon: ''
      }]
    })
    console.log(this.$i18n.locale)
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCradValue(e) {
      console.log(e)
      if (e != 3) {
        this.form.cardImage = ''
      }
    },
    handleAdd(type, direction) {
      console.log(1)
      if (type == 'zh') {
        if (direction == 'heng') {
          this.tableDataHeng.push({
            name: '',
            url: '',
            icon: ''
          })
        } else {
          this.tableData.push({
            name: '',
            url: '',
            icon: ''
          })
        }
      } else {
        if (direction == 'heng') {
          this.tableDataHengEn.push({
            name: '',
            url: '',
            icon: ''
          })
        } else {
          this.tableDataEn.push({
            name: '',
            url: '',
            icon: ''
          })
        }
      }
    },
    handleDel(index, type, direction) {
      if (type == 'zh') {
        if (direction == 'heng') {
          this.tableDataHeng.splice(index, 1)
        } else {
          this.tableData.splice(index, 1)
        }
      } else {
        if (direction == 'heng') {
          this.tableDataHengEn.splice(index, 1)
        } else {
          this.tableDataEn.splice(index, 1)
        }
      }
    },
    onSubmit() {
      var functionArray = {
        heng: this.tableDataHeng,
        shu: this.tableData
      }
      var functionArrayEn = {
        heng: this.tableDataHengEn,
        shu: this.tableDataEn
      }
      var params = {
        'backgroundColor': this.form.cardColor,
        'backgroundImg': this.form.cardImage,
        'backgroundType': this.form.cardValue, // 背景类型 1使用自由会员卡 2自定义背景色 3自定义背景图,
        'channelId': JSON.parse(cookieGet('Httpheader')).ChannelId,
        'functionArray': JSON.stringify(functionArray),
        'extraInfo': JSON.stringify(functionArrayEn)
      }
      console.log(params)
      postConfig(params).then(res => {
        if (res.code == 0) {
          this.$message({
            message: '创建成功！',
            type: 'success'
          })
        } else {
          this.$message('创建失败！请重新创建')
        }
      })
    },
    imageSuccessCBK(e) {
      // 上传图片
      console.log('图片回显', e)
      const url = e[0].url[0].url
      if (!e.cid) { this.form.cardImage = url } else {
        if (e.direction == 'heng') {
          this.tableDataHeng[parseInt(e.cid - 1)].icon = url
        } else {
          this.tableData[parseInt(e.cid - 1)].icon = url
        }
      }
    },
    imageSuccessCBKEn(e) {
      // 上传图片
      console.log('图片回显', e)
      const url = e[0].url[0].url
      if (e.direction == 'heng') {
        this.tableDataHengEn[parseInt(e.cid - 1)].icon = url
      } else {
        this.tableDataEn[parseInt(e.cid - 1)].icon = url
      }
    }
  }
}
</script>

<style lang="scss" scope>
.flex{
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.tableTitle{
  margin-bottom: 10px;
  border-bottom:1px solid #e5e5e5;
  background: #eee;
  span{
    width:25%;
    text-align: center;
  }
}
.tableList{
  div.item{
    width:25%;
    text-align: center;
    margin-bottom: 10px;
  }
  input{
    width:100px;
    margin-top: 10px;
  }
  .img-upload{
    margin:0 auto;
    border:none !important;
  }
}
.user-center {
  .title {
    font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 18px;
    text-align: left;
  }
  .list-title {
    font-family: "PingFangSC-Regular", "PingFang SC";
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.447058823529412);
    padding:20px 0;
    display: flex;
    div {
      text-align: left;
      line-height: 35px;
    }
  }
  .rightBox{
    padding:0 20px;
  }
  .phoneBox {
    width:335px;
    height: 615px;
    background: #fff;
    border-radius: 20px;
    padding:20px;

    .cardView {
      height: 170px;
      border-radius: 9px;
      position: relative;
      overflow: hidden;
      div {
        position: relative;
      }
      .cardView-BackImg {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .cardView-top {
        display: flex;
        z-index: 2;
        margin: 10px;
        width: 100%;
        line-height: 34px;
        .cardView-top-head {
          width: 34px;
          height: 34px;
          border-radius: 17px;
          overflow: hidden;
        }
        .cardView-top-logo {
          width: 34px;
          height: 34px;
          overflow: hidden;
          margin-left: 130px;
        }
        .cardView-top-name {
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          text-align: left;
          margin-left: 20px;
        }
      }
      .cardView-bottom {
        margin: 10px;
        margin-top:90px;
        z-index: 2;
        .cardView-bottom-Cid {
          font-size: 14px;
          text-align: left;
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          font-style: normal;
          color: #000;
        }
      }
    }

    .listTab{
      justify-content: space-between;
      padding:30px 20px;
      .tabItem{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width:25%;
        margin-bottom: 20rpx;
        img{
          width:20px;
          margin-bottom:5px;
          height:20px;
        }
        span{
          font-size: 14px;
          text-align: left;
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          font-style: normal;
          color: #000;
          margin-bottom: 5px;
        }
      }
    }
    .list{
      padding:0 10px;
      .listTitle{
        font-size: 14px;
          text-align: left;
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          font-style: normal;
          color: #000;
          margin-bottom: 20px;
      }
      .list-item{
        height: 50px;
        border-bottom: 1px solid #eee;
        padding: 0 15px;
        justify-content: flex-start;
        align-items: center;
        .img{
          margin-right: 10px;
          width:18px;
          height:18px;
          background: #f2f2f2;
        }
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.user-center {
  .img-upload {
    // border: 1px solid #e9e9e9 !important;
    // max-height: 100px !important;
    width: 100px !important;
    position: relative !important;
    margin-bottom: 10px !important;
    text-align: center !important;
    border-radius: 2px !important;
    .upload-box {
      width: 100px !important;
      height: 100px !important;
      border: 1px dashed #dddddd !important;
      cursor: pointer !important;
      line-height: 100px;
    }
  }

  .logoIcon {
    font-size: 40px !important;
    color: #dddddd !important;
    margin: 30px !important;
  }
}
</style>
