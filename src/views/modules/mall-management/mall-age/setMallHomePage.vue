<template>
<d2-container class="page" >
  <div class="setMallHomePage">
    <div class="setMallHomePage_2">
      <div class="setMallHomePage_1">
        <div class="df jcsb aic">
          <h3 class="list-title">{{$t('pageConfig.components')}}</h3>
          <el-button type="primary" size="mini" @click="changeIndex">{{$t('pageConfig.add')}}</el-button>
        </div>
        <div class="df jcsb fww">
          <div
            class="setMallHomePage_3 df aic fdc"
            v-for="(item,index) in data"
            :Key="index"
            @click="currtyIndex=index"
          >
            <div class="setMallHomePage_4 df aic jcc" :class="{ 'currty' : currtyIndex==index}">
              <img :src="item.img" alt />
            </div>
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="setMallHomePage_1">
        <div v-for="(item,index) in dataList" :key="index">
          <!-- banner -->
          <div class="setMallHomePage_banner" v-if="item.type==1" @click="edModule(index,0)">
            <el-carousel indicator-position="inside" height="200px">
              <el-carousel-item v-for="(i,d) in item.data" :key="d">
                <img :src="$fileUrl() +i.imageUrl" alt style="height:100%;width:100%;" />
              </el-carousel-item>
            </el-carousel>
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="setMallHomePage_banner1"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>
          <!-- 分类模块 -->
          <div class="setMallHomePage_class" v-else-if="item.type==2" @click="edModule(index,1)">
            <div class="df">
              <p
                v-for="(i,d) in item.data"
                :key="d"
                :style="{'color':i.nameColor==null?null:i.nameColor,'background-color':i.nameBackGround==null?null:i.nameBackGround}"
              >{{i.name}}</p>
            </div>
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="setMallHomePage_class1"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>
          <!-- 商城导航 -->
          <div
            class="setMallHomePage_mall df fww"
            v-else-if="item.type==3"
            @click="edModule(index,2)"
          >
            <div class="setMallHomePage_mall_1 df fdc jcc aic" v-for="(i,d) in item.data" :key="d">
              <img :src="$fileUrl() +i.imageUrl" alt />
              <p
                :style="{'color':i.nameColor==null?null:i.nameColor,'background-color':i.nameBackGround==null?null:i.nameBackGround}"
              >{{i.navigationName}}</p>
            </div>
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="setMallHomePage_mall2"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>

          <!-- 标题文字 -->
          <div class="popularWords" v-else-if="item.type==4" @click="edModule(index,3)">
            <p
              :style="{'color':item.data.nameColor==null?null:item.data.nameColor,'background-color':item.data.nameBackGround==null?null:item.data.nameBackGround,'text-align':item.data.arrangement=='1'?'left':(item.data.arrangement=='2'?'center':'right')}"
            >{{item.data.title}}</p>
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="popularWords1"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>
          <!-- 图文导航 -->

          <div
            class="setMallHomePage_navigation df fww"
            v-else-if="item.type==5"
           @click="edModule(index,4)"
          >
            <img
              :src="$fileUrl()+i.imageUrl"
              alt
              v-for="(i,d) in item.data"
              :key="d"
              :style="{'width':100/Number(item.typeSub)+'%'}"
            />
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="setMallHomePage_navigation1"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>
          <!-- 商品模块 -->
          <div class="commodityModule df fww" v-else @click="edModule(index,5)">
            <div class="commodityModule_1 df fdc jcc" v-for="(i,d) in item.data" :key="d">
              <img :src="$fileUrl()+i.coverImg" alt />
              <div class="commodityModule_2 df fdc jcc">
                <span class="commodityModule_4">{{i.productName}}</span>
                <div class="commodityModule_3 df aic jcc">
                  <div class="df aic">
                    <span class="commodityModule_5">{{$t('pageConfig.theirPrice')}}：￥{{i.coverPriceStr}}</span>
                    <span class="commodityModule_6">{{i.marketPriceStr}}</span>
                  </div>
                </div>
              </div>
            </div>
            <el-button
              @click.stop="deleteBanner(index)"
              size="mini"
              type="primary"
              class="commodityModule_7"
            >{{$t('setHomePage.delete')}}</el-button>
          </div>
        </div>
      </div>
      <div class="setMallHomePage_1">
        <byAdvertising
          v-if="addIndex==0||addIndex==2"
          :dataIndex="addIndex"
          @setBannerList="setModule"
          :bannerData="bannerData"
        ></byAdvertising>
        <classificationModule
          v-else-if="addIndex==1"
          @setClassModule="setModule"
          :classModules="classModules"
        ></classificationModule>
        <headline v-else-if="addIndex==3" @setTextList="setModule" :titleName="titleName"></headline>
        <imageNavigation
          v-else-if="addIndex==4"
          @setImageNavigation="setModule"
          :imagenation="imagenation"
        ></imageNavigation>
        <commodityModule v-else-if="addIndex==5" @setModule="setModule" :mallModule="mallModule"></commodityModule>
      </div>
    </div>
    <div class="df aic jcc" style="margin:20px 0px;width:100%;">
      <div>
        <el-button type="primary" size="mini" @click="setData">{{$t('pageConfig.submit')}}</el-button>
        <el-button size="mini" @click="goBack">{{$t('pageConfig.cancel')}}</el-button>
      </div>
    </div>
  </div>
</d2-container>
</template>

<script>
//轮播图设置
import byAdvertising from "./components/byAdvertising";
//分类模块
import classificationModule from "./components/classificationModule";
//标题文字
import headline from "./components/headline";
//图片导航
import imageNavigation from "./components/imageNavigation";
//商品模块
import commodityModule from "./components/commodityModule";
import {
  AddPage,
  GetHomePageMessage,
  UpdateHomePage
} from "@/api/setHomePage/setHomePage";
export default {
  name: "",
  data() {
    return {
      currtyIndex: 0,
      addIndex: 0,
      chageIndex: 3,
      img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage1.png"),
      data: [
        {
          name:this.$t('pageConfig.photoList'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage1.png")
        },
        {
          name:this.$t('pageConfig.classification'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage3.png")
        },
        {
          name: this.$t('pageConfig.mallnavigation'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage4.png")
        },
        {
          name: this.$t('pageConfig.headline'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage2.png")
        },
        {
          name:this.$t('pageConfig.imageNavigation'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage6.png")
        },
        {
          name: this.$t('pageConfig.commodityModule'),
          img: require("../../../../../public/image/theme/d2/setHomePage/setHomePage5.png")
        }
      ],
      //数组控制
      dataList: [],
      //banner数据
      bannerData: {},
      //classModule分类模块
      classModules: {},
      //标题文字
      titleName: {},
      //图文导航
      imagenation: {},
      // 商品模块
      mallModule: {},
      name: null
    };
  },
  computed: {},
  watch: {
  },
  methods: {
    changeIndex() {
      this.addIndex = this.currtyIndex;
      this.bannerData = {};
      this.classModules = {};
      this.titleName = {};
      this.imagenation = {};
      this.mallModule = {};
    },
    setModule() {
      const moduleList = {
        bannerData: '轮播广告',
        classModules: '分类模块',
        titleName: '标题文字',
        imagenation: '图片导航',
        mallModule: '商品模块',
      }
      const moduleNames = Object.values(moduleList)
      const moduleKeys = Object.keys(moduleList)
      const moduleName = arguments[0].typeName
      if(moduleName=="商城导航"){
         this.$set(this,'bannerData',{})
      }else{
         this.$set(this, moduleKeys[moduleNames.indexOf(moduleName)], {})
      }
      if (arguments[0].index != null || arguments[0].index != undefined) {
        this.dataList.splice(arguments[0].index, 1)
        this.dataList.splice(arguments[0].sortNum, 0, arguments[0])
      } else this.dataList.splice(arguments[0].sortNum, 0, arguments[0])
      
      this.dataList=this.dataList.sort(this.compare("sortNum"))


    },
    edModule(index, addIndex) {
      const moduleList = {
        bannerData: '轮播广告',
        classModules: '分类模块',
        titleName: '标题文字',
        imagenation: '图片导航',
        mallModule: '商品模块',
      }
      const moduleNames = Object.values(moduleList)
      const moduleKeys = Object.keys(moduleList)
      const moduleName = this.dataList[index].typeName
      this.addIndex = addIndex
      const data = JSON.parse(JSON.stringify(this.dataList[index]))
      data.index = index
       if(moduleName=="商城导航"){
          this.$set(this,'bannerData', data)
      }else{
        this.$set(this, moduleKeys[moduleNames.indexOf(moduleName)], data)
      }
    },
    // 设置首页
    setData() {
      let dataLists = JSON.parse(JSON.stringify(this.dataList));
      dataLists.forEach(item => {
        item.data = JSON.stringify(item.data);
      });
      
      let data = {
        name:
          this.$route.query.numIndex == 1
            ? this.name
            : this.$route.query.pageName,
        type: this.$route.query.type,
        path:
          this.$route.query.type == "1"
            ? "pages/index/mall"
            : "pages/index/secondPage",
        homePageConfigSubList: dataLists
      };
      if (this.$route.query.numIndex == 1) {
        data.id = this.$route.query.id;
        UpdateHomePage(data).then(res => {
          if (res.code == "0") {
            history.go(-1);
          }
        });
      } else {
        AddPage(data).then(res => {
          if (res.code == "0") {
            history.go(-1);
          }
        });
      }

    },
    deleteBanner(index) {
      this.dataList.splice(index, 1);
    },
    // 获取页面详情数据
    getData() {
      GetHomePageMessage({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 0) {
          let data = JSON.parse(JSON.stringify(res.data.homePageConfigSubList));
          this.name = res.data.name;
          console.log(data);
          this.dataList = data;
          console.log(this.dataList);
          this.dataList.forEach(res => {
            res.data = JSON.parse(res.data);
          });

          console.log("变化数据", this.dataList);
        }
      });
    },
    goBack() {
      history.go(-1);
    },
    //排序
    compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
    
  },
  components: {
    byAdvertising,
    classificationModule,
    headline,
    imageNavigation,
    commodityModule
  },
  created() {
    if (this.$route.query.numIndex == 1) {
      this.getData();
    }
  }
};
</script>

<style scoped lang='scss'>
.setMallHomePage {
  height: 100%;
  .setMallHomePage_2 {
    display: flex;
    justify-content: space-between;
    .setMallHomePage_1 {
      width: 28%;
     border: 1px solid #EBEEF5;
     border-radius:10px; 
      padding: 20px;
      height: 540px;
      overflow-x: auto;
      .setMallHomePage_banner {
        margin: 10px 0px 0px;
        border: 1px solid #fff;
        position: relative;
        .setMallHomePage_banner1 {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1000;
        }
      }
      .setMallHomePage_class {
        width: 100%;
        overflow-y: auto;
        border: 1px solid #fff;
        margin: 10px 0px 0px;
        position: relative;
        .setMallHomePage_class1 {
          position: absolute;
          right: 0px;
          top: 0px;
        }
        div {
          p {
            margin: 0 20px;
            font-size: 16px;
            text-align: center;
            line-height: 30px;
            white-space: nowrap;
            font-weight: 500;
          }
        }
      }
      .setMallHomePage_mall {
        width: 100%;
        margin: 10px 0px 0px;
        border: 1px solid #fff;
        position: relative;
        .setMallHomePage_mall2 {
          position: absolute;
          right: 0px;
          top: 0px;
        }
        .setMallHomePage_mall_1 {
          width: 25%;
          img {
            width: 40px;
            height: 40px;
            border: 1px solid red;
            border-radius: 5px;
          }
          p {
            font-size: 12px;
            text-align: center;
            line-height: 20px;
          }
        }
      }
      .popularWords {
        width: 100%;
        height: 30px;
        margin: 10px 0px 0px;
        border: 1px solid #fff;
        position: relative;
        .popularWords1 {
          position: absolute;
          right: 0px;
          top: 0px;
        }
        p {
          line-height: 30px;
          font-size: 16px;
          width: 100%;
          height: 100%;
        }
      }
      .setMallHomePage_navigation {
        border: 1px solid #fff;
        width: 100%;
        margin: 10px 0px 0px;
        position: relative;
        .setMallHomePage_navigation1 {
          position: absolute;
          right: 0px;
          top: 0px;
        }
        img {
          height: 200px;
        }
      }
      .commodityModule {
        width: 100%;
        margin: 10px 0px 0px;
        border: 1px solid #fff;
        position: relative;
        .commodityModule_7 {
          position: absolute;
          right: 0px;
          top: 0px;
        }
        .commodityModule_1 {
          width: 50%;
          img {
            width: 100%;
            height: 200px;
          }
          .commodityModule_2 {
            margin: 6px 0px;
            .commodityModule_4 {
              font-size: 12px;
              font-weight: 500;
              text-align: center;
            }
            .commodityModule_3 {
              font-size: 12px;
              .commodityModule_5 {
                color: orange;
                margin-right: 4px;
              }
              .commodityModule_6 {
                text-decoration: line-through;
                color: #aaa;
              }
            }
          }
        }
      }
    }
    .setMallHomePage_3 {
      width: 40%;
      margin: 0px 0px;
      .setMallHomePage_4 {
        height: 100px;
        width: 100%;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        img {
          height: 100%;
          width: 100%;
        }

        &:hover {
          border: 1px solid #409eff !important;
          cursor: pointer;
        }
      }
      p {
        line-height: 24px;
      }
    }
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
  }
  .currty {
    border: 1px solid #409eff !important;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.resoult {
  border: 1px solid #409eff !important;
}
</style>
