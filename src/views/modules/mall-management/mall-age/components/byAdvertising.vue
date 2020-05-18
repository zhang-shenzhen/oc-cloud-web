<template>
  <div>
    <div>
      <h3 class="list-title">{{$t('banner.setConponent')}}</h3>
      <p class="componentConfiguration_2" v-if="dataIndex==0">{{$t('pageConfig.photoList')}}</p>
      <p class="componentConfiguration_2" v-else>{{$t('pageConfig.mallnavigation')}}</p>
    </div>
    <div>
      <p class="componentConfiguration_1" v-if="dataIndex==0">{{$t('banner.addPictures5')}}</p>
      <p class="componentConfiguration_1" v-else>{{$t('navigation.addnavigation4')}}</p>
      <div
        class="componentConfiguration"
        v-for="(item,index) in imgData"
        :key="index"
        v-show="imgData.length>=1"
      >
        <div class="df jcsb aic">
          <h3 class="list-title" v-if="dataIndex==0">{{$t('banner.image')}}{{index+1}}</h3>
          <h3 class="list-title" v-else>{{$t('navigation.navigation')}}{{index+1}}</h3>
          <el-button type="primary" size="mini" @click="remove(index)">{{$t('setHomePage.delete')}}</el-button>
        </div>
        <h3 class="list-title" v-if="dataIndex!=0">{{$t('navigation.name')}}</h3>
        <el-input :placeholder="$t('navigation.addLinkParame')" size="mini" v-model="item.navigationName" v-if="dataIndex!=0"></el-input>
        <h3 class="list-title" v-if="dataIndex!=0">{{$t('navigation.nameColor')}}</h3>
        <div class="classificationModule_1" v-if="dataIndex!=0">
          <el-input size="mini" v-model="item.nameColor" disabled></el-input>
          <el-color-picker v-model="item.nameColor" class="classificationModule_2" size="mini"></el-color-picker>
        </div>
        <h3 class="list-title" v-if="dataIndex!=0">{{$t('navigation.backgroundColor')}}</h3>
        <div class="classificationModule_1" v-if="dataIndex!=0" style="margin-bottom:10px;">
          <el-input size="mini" v-model="item.nameBackGround" disabled></el-input>
          <el-color-picker v-model="item.nameBackGround" class="classificationModule_2" size="mini"></el-color-picker>
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
        v-if="dataIndex==0"
        @click="addImg"
        :disabled="imgData.length>=5"
      >{{$t('banner.addImage')}}</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-top:10px;"
        size="mini"
        v-else
        @click="addNavigation"
         :disabled="imgData.length>=4"
      >{{$t('navigation.addnavigation')}}</el-button>
      <h3 class="list-title">{{$t('banner.pageSort')}}</h3>
      <el-input :placeholder="$t('navigation.addPageSort')" size="mini" v-model="sortNum"></el-input>
      <div class="df aic jcc" style="margin-top:20px;">
        <div>
          <el-button type="primary" size="mini" @click="subit">{{$t('banner.save')}}</el-button>
          <el-button size="mini" @click="removeBanner">{{$t('setHomePage.delete')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editorImage from '@/components/Tinymce/components/editorImage'
export default {
  name: "",
  props:["dataIndex","bannerData"],
  data() {
    return {
      index: 8,
      imageUrl: '',
      // 轮播图列表
      imgData:[],
      // 排序
      sortNum:null,
      photoIndex:0,
      bannerIndex:null,

    };
  },
  computed: {},
  watch: {},
  components:{
    editorImage

  },
  methods: {
     imageSuccessCBK1 (arr) {
       console.log(11,arr)
      this.imgData[this.photoIndex].imageUrl=arr[0].url[0].url
      console.log(this.imgData)
    },
    subit(){
      console.log(11111111,this.bannerIndex)
      if(this.dataIndex==0){
        let data={
        data:this.imgData,
        sortNum:this.sortNum,
        type:1,
        typeName:"轮播广告",
        index:this.bannerIndex,
        // showSty:false,
      }
       this.$emit("setBannerList",data),
       console.log(this.imgData)
       this.imgData=[],
       this.sortNum=null,
       this.bannerIndex=null

      }else{
        console.log(1)
        let data={
        data:this.imgData,
        sortNum:this.sortNum,
        type:3,
        typeName:"商城导航",
         index:this.bannerIndex,
        //  showSty:false,

      }
       this.$emit("setBannerList",data)
       this.imgData=[],
       this.sortNum=null,
        this.bannerIndex=null
      }
    },
      //添加图片
      addImg(){
        let data={};
        data.imageUrl=null;//图片路径
        data.linkParam=null;//链接参数
        this.imgData.push(data)
      },
      //删除图片
      remove(index){
        this.imgData.splice(index,1)
      },
      removeBanner(){
        this.imgData=[];
        this.sortNum=null;

      },
      addNavigation(){
        let data={};
        data.imageUrl=null;//图片路径
        data.linkParam=null;//链接参数
        data.nameColor="";
        data.nameBackGround="";
        this.imgData.push(data)
      }
  },
  watch:{
    dataIndex(){
       this.imgData=[];
    this.sortNum=null;
    },
    bannerData(newName, oldName){
      console.log(3333,newName, oldName)
      if(Object.keys(newName).length>0){
         this.imgData=newName.data
      this.sortNum=newName.sortNum
      this.bannerIndex=newName.index
      }

    }
    
  },
  created(){
   if(Object.keys(this.bannerData).length>0){
         this.imgData=this.bannerData.data
      this.sortNum=this.bannerData.sortNum
      this.bannerIndex=this.bannerData.index
      }
  },
  
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
.classificationModule_1 {
  position: relative;
  .classificationModule_2 {
    position: absolute;
    right: 0px;
  }
}
</style>

