<template>
  <d2-container class="page">

    <el-collapse v-model="activeNames">
      <el-collapse-item title="富文本" name="1">
        <Tinymce
          id="tinymce"
          v-model="info"
          :height="100"
        />
      </el-collapse-item>

      <el-collapse-item title="上传文件" name="2">
        <p>一:自定义样式上传文件</p>
        <div class="upload-box">
          <editorImage urltype="material" type="custom" @successCBK="imageSuccessCBK" />
        </div>
        <p>二:默认样式上传文件</p>
        <editorImage urltype="default" type="default" @successCBK="imageSuccessCBK" />

        <p>1. urltype参数:代表上传路径,值为material(微信素材上传路径)或值为coupon(微信卡券图片上传)或值为default(其他上传路径),如果不传,默认为default</p>
        <p>2. type:代表上传按钮样式,值为custom(自定义样式)与default(默认样式)两种,如果不传,默认为default</p>
        <p>3. quanTity:代表允许上传文件的个数,数值为数字,如果不传,默认为1</p>
        <p>4. 如果需要自定义样式,需要在父级元素上加入样式  position: relative;</p>
        <p>5. 得到值通过监听successCBK方法</p>

      </el-collapse-item>

      <el-collapse-item title="图标引用" name="3">
        <i class="iconfont iconicon_rilix" style="font-size:18px;color:red;" />
        <br>
        <i class="iconfont iconicon_rilix" style="font-size:18px;color:green;" />
      </el-collapse-item>

      <el-collapse-item title="地址选取组件" name="4">
        <Address :size="'small'" :addvalue="addressValue" @getValue="getCheckValue" />
        <p>1. 回显值必须传一个数组,数组内为省市区的id,如:[3,37,410]</p>
        <p>2. 得到值通过监听getValue方法</p>
        <p>3. 控件大小通过size属性传递,其值为medium / small / mini 三种</p>
      </el-collapse-item>

      <el-collapse-item title="渠道二维码/回复设置/群发消息/回复方式" name="5">
        <div v-for="(item,index) in ReplyList" :key="index">
          <Reply
            :function-list="['文本','图片','图文','链接','小程序']"
            :item-id="item.id
            "
            @getObj="getValue"
          />
        </div>
        <!--   -->
        <p>1.得到的值:{{ ReplyList }}</p>
        <p>2. 传回的值是一个对象,需根据具体情况去对象中取对应的值</p>
        <p>3. 得到值通过监听getObj方法</p>
        <p>4. functionList属性:需要什么功能需要传一个功能list过去,如:functionList="['文本','图片','图文','链接','小程序']",就代表了需要这几个功能,如果不传此属性,默认为文本,图片,图文三种功能</p>
        <p>5. itemId属性:要遍历使用此组件时,比需要传此值,对应的是数组的id</p>
        <p>6. 遍历式调用数组格式如下:   ReplyList:[{id:1,getVal:{}},{id:2,getVal:{}}]</p>
        <p>7. 为了适应组件遍历式调用,单次调用也需要以数组的方式调用</p>
      </el-collapse-item>

    </el-collapse>

  </d2-container>
</template>

<script>
import { sysInfoService } from '@/common/api'
import Tinymce from '@/components/Tinymce'
import Address from '@/components/address'
import Reply from '@/components/reply'
import editorImage from '@/components/Tinymce/components/editorImage'

export default {
  components: { Tinymce, editorImage, Address, Reply },
  data() {
    return {
      activeNames: [],
      info: '<p>33333</p>',
      addressValue: [],
      ReplyList: [{
        id: 1,
        getVal: {}
      }, {
        id: 2,
        getVal: {}
      }]
    }
  },
  created() {
    // this.getSysInfo()
  },
  methods: {
    get() {
      console.log(this.ReplyList)
    },
    getSysInfo() {
      sysInfoService
        .get()
        .then(res => {
          this.sysInfo = res
        })
        .catch(() => { })
    },
    imageSuccessCBK() {

    },
    getCheckValue(e) {
      console.log(e)
    },
    getValue(e) {
      console.log(e)
      this.ReplyList.map(res => {
        if (res.id == e.itemId) {
          res.getVal = e
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box{
  width:200px;
  height:200px;
  position: relative;
  background: red;
}
.page {
  p {
    &:first-child {
      margin-top: 0px;
    }
    b {
      color: $color-text-main;
      margin-right: 10px;
    }
    span {
      color: $color-text-normal;
    }
  }
}
</style>
