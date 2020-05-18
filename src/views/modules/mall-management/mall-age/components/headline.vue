<template>
  <div>
    <div>
      <h3 class="list-title">{{$t('banner.setConponent')}}</h3>
      <p class="componentConfiguration_2">{{$t('pageConfig.headline')}}</p>
    </div>
    <div>
      <p class="componentConfiguration_1">{{$t('headline.addHeadline10')}}</p>
      <div class="componentConfiguration">
        <h3 class="list-title">{{$t('headline.title')}}</h3>
        <el-input :placeholder="$t('headline.setTitle')" size="mini" v-model="setTextList.title"></el-input>
        <h3 class="list-title">{{$t('setHomePage.linkParams')}}</h3>
        <el-input :placeholder="$t('navigation.addLinkParame')" size="mini" v-model="setTextList.linkParam"></el-input>
        <h3 class="list-title">{{$t('navigation.nameColor')}}</h3>
        <div class="classificationModule_1">
          <el-input size="mini" v-model="setTextList.nameColor" disabled></el-input>
          <el-color-picker
            v-model="setTextList.nameColor"
            class="classificationModule_2"
            size="mini"
          ></el-color-picker>
        </div>
        <h3 class="list-title">{{$t('navigation.backgroundColor')}}</h3>
        <div class="classificationModule_1">
          <el-input size="mini" v-model="setTextList.nameBackGround" disabled></el-input>
          <el-color-picker
            v-model="setTextList.nameBackGround"
            class="classificationModule_2"
            size="mini"
          ></el-color-picker>
        </div>
        <h3 class="list-title">{{$t('headline.layout')}}</h3>
        <el-radio-group v-model="setTextList.arrangement" size="mini">
          <el-radio label="1">{{$t('headline.left')}}</el-radio>
          <el-radio label="2">{{$t('headline.right')}}</el-radio>
          <el-radio label="3">{{$t('headline.center')}}</el-radio>
        </el-radio-group>
      </div>
      <h3 class="list-title">{{$t('banner.pageSort')}}</h3>
      <el-input :placeholder="$t('navigation.addPageSort')" size="mini" v-model="sortNum" ></el-input>
      <div class="df aic jcc" style="margin-top:20px;">
        <div>
          <el-button type="primary" size="mini" @click="submit">{{$t('banner.save')}}</el-button>
          <el-button size="mini" @click="remove">{{$t('pageConfig.cancel')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:['titleName'],
  data() {
    return {
      index: 0,
      imageUrl: "",
      resource: null,
      //   设置文字
      setTextList: {
        title: null,
        linkParam: null,
        nameColor: null,
        nameBackGround: null,
        arrangement:"1",
      },
      sortNum: null,
      bannerIndex:null,
    };
  },
  computed: {},
  watch: {
    titleName(newName, oldName){
      if (Object.keys(newName).length > 0) {
        this.setTextList = newName.data;
        this.sortNum = newName.sortNum;
        this.bannerIndex = newName.index;
      }
    }

  },
  created(){
     if(Object.keys(this.titleName).length>0){
         this.setTextList=this.titleName.data
      this.sortNum=this.titleName.sortNum
      this.bannerIndex=this.titleName.index
      }
  },
  methods: {
    //保存
    submit() {
        let setTextLists=JSON.parse(JSON.stringify(this.setTextList))
      let data = {
        data: setTextLists,
        sortNum: this.sortNum,
        type: 4,
        typeName: "标题文字",
         index:this.bannerIndex,
        //  showSty:false,
      };
      this.$emit("setTextList", data);
      this.setTextList.title=null;
      this.setTextList.linkParam=null;
      this.setTextList.nameColor=null;
       this.setTextList.nameBackGround=null;
        this.setTextList.arrangement="1";
      this.sortNum=null
    },
    //   取消
    remove() {
      this.$emit("setTextList", data);
      this.setTextList.title=null;
      this.setTextList.linkParam=null;
      this.setTextList.nameColor=null;
       this.setTextList.nameBackGround=null;
        this.setTextList.arrangement="1";
      this.sortNum=null

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
.classificationModule_1 {
  position: relative;
  .classificationModule_2 {
    position: absolute;
    right: 0px;
  }
}
</style>

