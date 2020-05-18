<template>
  <div>
    <div>
      <h3 class="list-title">{{$t('banner.setConponent')}}</h3>
      <p class="componentConfiguration_2">{{$t('pageConfig.imageNavigation')}}</p>
    </div>
    <div>
      <p class="componentConfiguration_1">{{$t('imageNavigation.addimage4')}}</p>
      <h3 class="list-title">{{$t('imageNavigation.choseStyle')}}</h3>
      <el-radio-group v-model="typeSub" style="margin-bottom:20px;">
        <el-radio label="1">{{$t('imageNavigation.lineOne')}}</el-radio>
        <el-radio label="2">{{$t('imageNavigation.lineTwo')}}</el-radio>
        <el-radio label="3">{{$t('imageNavigation.linethree')}}</el-radio>
        <el-radio label="4">{{$t('imageNavigation.lineFour')}}</el-radio>
      </el-radio-group>
      <div class="componentConfiguration" v-for="(item,index) in byNavigation" :key="index">
        <div class="df jcsb aic">
          <h3 class="list-title">{{$t('banner.image')}}{{index+1}}</h3>
          <el-button type="primary" size="mini" @click="remove(index)">{{$t('setHomePage.delete')}}</el-button>
        </div>
        <div class="img-upload" @click="photoIndex=index">
          <img v-if="item.imageUrl != null" style="width:100%;" :src="$fileUrl() +item.imageUrl " />
          <div v-if="item.imageUrl  == null" class="upload-box">
            <i class="el-icon-plus logoIcon" />
          </div>
          <editorImage urltype="default" type="custom" @successCBK="imageSuccessCBK1" />
        </div>
        <h3 class="list-title">{{$t('setHomePage.linkParams')}}</h3>
        <el-input :placeholder="$t('navigation.addLinkParame')" size="mini" v-model="item.linkParam"></el-input>
      </div>

      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-top:10px;"
        size="mini"
        @click="addImage"
        :disabled="byNavigation.length>=4"
      >{{$t('banner.addImage')}}</el-button>
      <h3 class="list-title">{{$t('banner.pageSort')}}</h3>
      <el-input :placeholder="$t('navigation.addPageSort')" size="mini" v-model="sortNum"></el-input>
      <div class="df aic jcc" style="margin-top:20px;">
        <div>
          <el-button type="primary" size="mini" @click="submit">{{$t('banner.save')}}</el-button>
          <el-button size="mini" @click="removeAll">{{$t('setHomePage.delete')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editorImage from "@/components/Tinymce/components/editorImage";
export default {
  name: "",
  props: ["imagenation"],
  data() {
    return {
      index: 0,
      imageUrl: "",
      resource: null,
      byNavigation: [],
      photoIndex: null,
      sortNum: null,
      typeSub: "1",
      bannerIndex: null
    };
  },
  computed: {},
  watch: {
    imagenation(newName, oldName) {
      if (Object.keys(newName).length > 0) {
        this.byNavigation = newName.data;
        this.sortNum = newName.sortNum;

        this.typeSub = String(newName.typeSub);

        this.bannerIndex = newName.index;
      } else {
        this.byNavigation = [];
        this.sortNum = null;
        this.typeSub = "1";
        this.bannerIndex = null;
      }
    }
  },
  created() {
    if (Object.keys(this.imagenation).length > 0) {
      this.byNavigation = this.imagenation.data;
      this.sortNum = this.imagenation.sortNum;
      this.typeSub = String(this.imagenation.typeSub);
      this.bannerIndex = this.imagenation.index;
    } else {
      this.byNavigation = [];
      this.sortNum = null;
      this.typeSub = "1";
      this.bannerIndex = null;
    }
  },
  components: {
    editorImage
  },
  methods: {
    imageSuccessCBK1(arr) {
     
      this.byNavigation[this.photoIndex].imageUrl = arr[0].url[0].url;
      
    },
    // 添加图片导航
    addImage() {
      let data = {
        imageUrl: null,
        linkParam: null
      };
      this.byNavigation.push(data);
    },
    // 删除图片导航
    remove(index) {
      this.byNavigation.splice(index, 1);
    },
    // 保存
    submit() {
      let data = {
        data: this.byNavigation,
        sortNum: this.sortNum,
        typeSub: this.typeSub,
        type: 5,
        typeName: "图片导航",
        index: this.bannerIndex
        //  showSty:false,
      };
      this.$emit("setImageNavigation", data);
      this.byNavigation = [];
      this.sortNum = null;
      this.typeSub = "1";
    },
    // 取消
    removeAll() {
      this.byNavigation = [];
      this.sortNum = null;
      this.typeSub = "1";
    }
  }
};
</script>

<style scoped lang="scss">
.df {
  display: flex;
}
.aic {
  align-items: center;
}
.jcc {
  justify-content: center;
}
.jcsb {
  justify-content: space-between;
}
.fdc {
  flex-direction: column;
}
.fww {
  flex-wrap: wrap;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border-color: #409eff;
  }
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  position: relative;
  img {
    width: 100px;
    height: 100px;
  }
  i {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 20px;
    width: 20px;
  }
}
.componentConfiguration {
  border: 1px solid #797979;
  border-radius: 6px;
  height: calc(100%-20px);
  width: calc(100%-20px);
  padding: 20px;
  margin-bottom: 10px;
}
.componentConfiguration_1 {
  color: #aaa;
  font-size: 12px;
}
.el-radio {
  margin-bottom: 20px;
}
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
</style>

