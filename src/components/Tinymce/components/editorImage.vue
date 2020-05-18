<template>
  <div class="upload-container">
    <el-button v-if="type == 'default'"
               :style="{background:color,borderColor:color}"
               icon="el-icon-upload"
               size="small"
               type="primary"
               @click="dialogVisible=true">上传图片</el-button>
    <div v-if="type == 'custom'"
         class="box"
         @click="dialogVisible=true" />

    <el-dialog :visible.sync="dialogVisible">
      <el-upload :multiple="true"
                 :file-list="fileList"
                 :show-file-list="true"
                 :headers="headers"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :before-upload="beforeUpload"
                 class="editor-slide-upload"
                 :action="url"
                 :limit="quantity"
                 list-type="picture-card">
        <!-- :http-request="uploadSectionFile" -->
        <el-button size="mini"
                   type="primary">点击上传</el-button>
      </el-upload>
      <el-button size="mini"
                 @click="dialogVisible = false">取 消</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

/* 默认样式使用方式
<editorImage type="default"  color="#1890ff"  @successCBK="imageSuccessCBK"/>
*/

// 如果需要自定义样式,需要在父级元素上加入样式  position: relative;
/* 自定义样式使用方式
  <div class="upload-box">
      <editorImage type="custom"  @successCBK="imageSuccessCBK"/>
  </div>
  .upload-box{
    width: 100px;
    height: 100px;
    position: relative;
  }
*/
import configUrl from '../../../api/configUrl'
import { cookieGet } from '@/common/cookie'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff' //默认样式上传按钮颜色
    },
    type: {
      type: String,
      default: 'default' //上传按钮样式
    },
    urltype: {
      type: String,
      default: 'default' //上传路径
    },
    quanTity: {
      type: Number,
      default: 1 //上传数量
    },
    cid: {
      type: Number,
      default: null //一个页面中可能多次引用该组件；用于标示当前调用组件的id
    },
    direction: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      url: '',
      headers: {
        Accept: 'application/json',
        'X-Channel': null,
        'X-Channel-Type': null
      }
    }
  },
  created () {
    this.quantity = this.quanTity
    if (cookieGet('Httpheader')) {
      const header = JSON.parse(cookieGet('Httpheader'))
      this.headers['X-Channel'] = header.ChannelId
      this.headers['X-Channel-Type'] = header['X-Channel-Type']
    }
    if (this.urltype == 'default') {
      this.url = configUrl.upload
    } else if (this.urltype == 'coupon') {
      // 微信卡券
      this.url = configUrl.coupon_upload
    } else if (this.urltype == 'material') {
      // 素材
      this.url = configUrl.material_upload
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      )
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message(
          '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！'
        )
        return
      }
      if (!this.$isNull(this.cid)) {
        arr.cid = this.cid
      }

      if (!this.$isNull(this.direction)) {
        arr.direction = this.direction
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      console.log('handleSuccess===', response, file)
      const uid = file.uid
      for (let i in this.listObj) {
        if (this.listObj[i].uid === uid) {
          this.listObj[i].url = response.data
          this.listObj[i].hasSuccess = true
          return
        }
      }

    },
    handleRemove (file) {
      console.log('handleRemove', file)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      // console.log(222,this.listObj,Object.keys(this.listObj))
      const _self = this
      const _URL = window.URL || window.webkitURL
      console.log('_URL', _URL)
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        if (file.type == 'video/mp4') {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height
          }
        } else if (file.type.indexOf('image') > -1) {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function () {
            _self.listObj[fileName] = {
              hasSuccess: false,
              uid: file.uid,
              width: this.width,
              height: this.height
            }
          }
          console.log('file2--img', img)
        }
  
        resolve(true)
      })
    },
    showModel () {
      this.dialogVisible = true;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.editor-slide-upload {
  margin-bottom: 20px;
  .el-upload--picture-card {
    width: 100%;
  }
}

</style>
