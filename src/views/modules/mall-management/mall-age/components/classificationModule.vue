<template>
  <div>
    <div>
      <h3 class="list-title">{{$t('banner.setConponent')}}</h3>
      <p class="componentConfiguration_2">{{$t('pageConfig.classification')}}</p>
    </div>
    <div>
      <p class="componentConfiguration_1">{{$t('classMoudle.addClassMoudle10')}}</p>
      <div class="componentConfiguration" v-for="(item,index) in classModule" :key="index">
        <div class="df jcsb aic">
          <h3 class="list-title">{{$t('classMoudle.class')}}{{index+1}}</h3>
          <el-button type="primary" size="mini" @click="deleteClass(index)">{{$t('setHomePage.delete')}}</el-button>
        </div>
        <h3 class="list-title">{{$t('classMoudle.name')}}</h3>
        <el-input :placeholder="$t('classMoudle.enterName')" size="mini" v-model="item.name"></el-input>
        <h3 class="list-title">{{$t('navigation.nameColor')}}</h3>
        <div class="classificationModule_1">
          <el-input size="mini" v-model="item.nameColor" disabled></el-input>
          <el-color-picker v-model="item.nameColor" class="classificationModule_2" size="mini"></el-color-picker>
        </div>
        <h3 class="list-title">{{$t('navigation.backgroundColor')}}</h3>
        <div class="classificationModule_1">
          <el-input size="mini" v-model="item.nameBackGround" disabled></el-input>
          <el-color-picker v-model="item.nameBackGround" class="classificationModule_2" size="mini"></el-color-picker>
        </div>

        <h3 class="list-title">{{$t('setHomePage.linkParams')}}</h3>
        <el-input :placeholder="$t('navigation.addLinkParame')" size="mini" v-model="item.linkParam"></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-top:10px;"
        size="mini"
        @click="addClass"
        :disabled="classModule.length>=10"
      >{{$t('classMoudle.addClassmoudle')}}</el-button>
      <h3 class="list-title">{{$t('banner.pageSort')}}</h3>
      <el-input :placeholder="$t('navigation.addPageSort')" size="mini" v-model="sortNum"></el-input>
      <div class="df aic jcc" style="margin-top:20px;">
        <div>
          <el-button type="primary" size="mini" @click="submit">{{$t('banner.save')}}</el-button>
          <el-button size="mini" @click="removeAll">{{$t('pageConfig.cancel')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["classModules"],
  data() {
    return {
      index: 0,
      //分类模块
      classModule: [],
      //序号
      sortNum: null,
      bannerIndex: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    //   提交
    submit() {
      let data = {
        data: this.classModule,
        sortNum: this.sortNum,
        type: 2,
        typeName: "分类模块",
         index:this.bannerIndex,
        //  showSty:false,
      };
      this.$emit("setClassModule", data);
      this.classModule =[];
      this.sortNum = null;
    },
    //取消
    removeAll() {
      this.classModule = []; 
      this.sortNum = null
    },
    //   删除
    deleteClass(index) {
      this.classModule.splice(index, 1);
    },
    //添加分类
    addClass() {
      let data = {
        name: null,
        nameColor: "",
        nameBackGround: "",
        linkParam: null
      };
      this.classModule.push(data);
    }
  },
  watch: {
    classModules(newName, oldName) {
      if (Object.keys(newName).length > 0) {
        this.classModule = newName.data;
        this.sortNum = newName.sortNum;
        this.bannerIndex = newName.index;
      }
    }
  },
  created() {
    if (Object.keys(this.classModules).length > 0) {
      this.classModule = this.classModules.data;
      this.sortNum = this.classModules.sortNum;
      this.bannerIndex = this.classModules.index;
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
// .componentConfiguration_2{
//   width:100%;
//   text-align: center;
//   font-size: 12px;
//   line-height: 20px;

// }
</style>

