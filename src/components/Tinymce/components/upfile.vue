<template>
  <div class="upload-container">
    <el-upload
      class="upload-demo"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :headers="headers"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div  slot="tip" class="el-upload__tip">
        {{text}}
      </div>
    </el-upload>
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
  name: 'upfile',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    cid: {
      type: Number,
      default: null
    },
    fUrl: {
      type: String,
      default: ''
    },
    text:{
      type:String,
      default:'只能上传jpg/png文件，且不超过500kb'
    }
  },
  data() {
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
  created() {
    if (cookieGet('Httpheader')) {
      const header = JSON.parse(cookieGet('Httpheader'))
      this.headers['X-Channel'] = header.ChannelId
      this.headers['X-Channel-Type'] = header['X-Channel-Type']
    }
    if (this.fUrl) {
      this.url = this.fUrl
    }
  },
  methods: {
    showModel() {
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      this.$emit('upfileSuccess', {
        response,
        file,
        fileList
      })
    },
    beforeUpload(file){
      
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
