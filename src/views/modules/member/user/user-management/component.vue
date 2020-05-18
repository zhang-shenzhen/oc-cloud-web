<template>
  <div>
    <div class="userTotal">
      <p>当前用户数:</p>
      <img src="@/assets/img/loading.gif" v-if="imgShow" />
      <p v-else>{{ total1 }}</p>
    </div>
    <div class="tab-head-btn">
      <div class="tab-head-btn-l">
        <!-- $t('layout.tooltip.filter') -->
        <el-button
          class="btn"
          type="primary"
          size="mini"
          :disabled="refresh"
          @click="
            () => {
              if (setItems.length == 0) return
              showTypes.addLabelType = !showTypes.addLabelType
            }
          "
        >{{ $t('member.memList.addLabel') }}</el-button>
        <!-- <el-button class="btn" size="mini" @click="callImportBox(1)">
          {{
          $t('member.memList.importMem')
          }}
        </el-button>
        <el-button class="btn" size="mini" @click="callImportBox(2)">
          {{
          $t('member.memList.exportMem')
          }}
        </el-button>-->
      </div>
      <div class="tab-head-btn-r">
        <el-button
          class="btn"
          type="primary"
          size="mini"
          :disabled="refresh"
          @click="showTypes.searchType =true"
        >{{ $t('member.memList.filterMem') }}</el-button>
      </div>
    </div>

    <!-- tabMob -->
    <table-mob
      ref="table_mob"
      :table-data="tableData"
      :table-config="tableConfig"
      :tabs-slots="f_tabsSlots"
      @_selectionChange="getTabSelList"
    >
      <template v-slot:nickName="nickName">
        <div style="height:40px;" @click="clickName(nickName.nickName)">
          <img
            class="head"
            :src="nickName.nickName.headPortraitUrl?nickName.nickName.headPortraitUrl:''"
            alt
          />
          <span style="    margin-top: -30px;display: block;">
            {{
            nickName.nickName.nickName
            }}
          </span>
        </div>
        <!-- <el-button key="change" type="text" size="mini" @click="integralThis('change')">编辑</el-button> -->
      </template>
      <template v-slot:tags="tags">
        <div style="display:flex;flex-warp:warp;">
          <span v-for="(itm, idx) in tags.tags.tags" :key="idx">
            {{
            itm.tagName + ' '
            }}
          </span>
        </div>
      </template>
      <template v-slot:operating>
        <el-button key="change" type="text" size="mini" @click="integralThis('change')">编辑</el-button>
        <el-button key="look" type="text" size="mini" @click="integralThis('look')">查看</el-button>
        <el-button key="del" size="mini" type="text" @click="integralThis('del')">删除</el-button>
      </template>
    </table-mob>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="total1"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 筛选会员侧边栏  -->
    <keep-alive>
      <div v-if="showTypes.searchType">
        <!-- <filter-view :show-type="showTypes.searchType" @_upSV="_upSV" /> -->
        <filter-view1
          :show-type="showTypes.searchType"
          @_upSV="_upSV"
          :resetData="resetData"
          :addressRest="addressRest"
          :getTageDatas="tags"
          @changePanents="changePanents"
        />
      </div>
    </keep-alive>
    <!-- add-label -->
    <div v-if="showTypes.addLabelType">
      <add-label1
        :show-type="showTypes.addLabelType"
        :set-items1="setItems1"
        :echo="echo"
        @_upAddLabel="_upAddLabel"
      />
    </div>
    <!-- 侧边栏出来选择标签
    <div v-if="showTypes.addLabelType">
      <add-label1 :show-type="showTypes.addLabelType"
                 :setItems="setItems"
                 :tags="tags"
                 @_upAddLabel="_upAddLabel" />
    </div>-->
    <!-- 导入 -->
    <div v-if="showTypes.importType == 1 || showTypes.importType == 2">
      <el-dialog
        :title="showTypes.importType == 1 ? '导入会员' : '导出会员'"
        :visible.sync="showTypes.importType == 1 || showTypes.importType == 2"
        :before-close="
          () => {
            showTypes.importType = 0
          }
        "
      >
        <component-upfile
          :import-type="showTypes.importType"
          @cancel="_upfileCancel"
          @success="_upfileSuccess"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import filterView from "./filter-view"; // 筛选栏
import filterView1 from "./filter-view1"; // 筛选栏(新的)
import addLabel1 from "./add-label1"; // 添加标签
import editorImage from "@/components/Tinymce/components/editorImage";
import upfile from "@/components/Tinymce/components/upfile";
import memTableConfig from "@/tableConfigs/member/memTableConfig";
import componentUpfile from "./component-upfile"; // 导入 or 导出
import { mapGetters, mapState } from "vuex";
import {
  getMessageList,
  tagDetail,
  getMessageListCount,
  memberLog,
  alladdTags,
  allsignLabel,
  getMembersList,
  GetMemberListNum
} from "@/api/member/member";
import TAG from "./tag";

export default {
  name: "MemberList",
  components: {
    "filter-view": filterView,
    filterView1: filterView1,
    "add-label1": addLabel1,
    editorImage,
    upfile,
    componentUpfile
  },
  props: {
    projectName: {
      type: String,
      default: "product"
    }
  },
  data() {
    return {
      API: {},
      tableData: [],
      tableConfig: {},
      total: 0,
      currentPage: 1,
      page: 1,
      showTypes: {
        searchType: false, // searchView的 状态
        addLabelType: false, //
        importType: 0 // 导入or导出 状态值 0:隐藏；1:导入；2:导出
      },
      f_tabsSlots: {
        nickName: "nickName",
        operating: "operating",
        tags: "tags"
      }, // 插槽
      tags: [],
      setItems: [],
      // 测试数据
      setItems1: [],

      importCurrentPage: 1, // 导入导出的 页码
      importTotal: 0, // 导入导出的数据总量
      importFileName: "", // 导出文件名
      reImportKey: false, // 修改导出字段的弹窗type
      importList: [], // 导入导出列表的数据源
      echo: "1", // 判断是否把自己的数据回显出来
      paginationShow: true, //判断是不是展示分页
      resetData: [], //传到子组件数据
      addressRest: [], //传过去的地址存一下
      prvBtn: false,
      serachId: null,
      total1: null, //总数
      getTageDatas: [], //所有标签
      // allfilter: [], //所有筛选条件的集合
      constType: false, //总数回收标识
      constType1: false, //总数据
      tiem: null,
      times: null,
      data: {},
      data1: {},
      imgShow: true,
      pageDataListShow: true, //判断下点没点最后面一页
      refresh: true //判断是否可以筛选条件
    };
  },
  /**
   * 整体思路：就是通过把筛选条件和时间戳存在vuex中  当我们筛选的时候我们会去匹配vuex里面的数据  匹配好就直接用vuex中的数据，没有的话就会存在vuex中
   * 在生成一个新的时间戳继续存  在用我们新的数据去筛选
   * 主要是后台需要时间戳  
   * 取缓存中的数据给我们
   * 
   * 
   * 
   */
  computed: {
    // ...mapGetters['allfilter'],
    ...mapState({
      allfilter: state => state.d2admin.user.allfilter
    })
  },
  created() {
    this.API = {
      getMessageList: getMessageList,
      tagDetail: tagDetail,
      getMessageListCount: getMessageListCount,
      memberLog: memberLog,
      getMembersList: getMembersList,
      GetMemberListNum: GetMemberListNum
    };
    console.log(this.allfilter, "数据拿到了");
    
    this.setAllfilter("", []);

    this._initTab();
    this.getTagDetail();
    localStorage.removeItem("address");
  },

  mounted() {
    
  },
  beforeDestroy() {},
  methods: {
    _initTab() {
      // 对 memTableConfig 配置文件 进行 增加id处理;
      memTableConfig.tabHeadConfig.map((d, idx) => {
        d.id = idx + 1;
      });
      this.tableConfig = memTableConfig;
    },
    // 获取标签列表
    getTagDetail() {
      this.API.tagDetail().then(res => {
        this.tags = res;
      });
    },
    /**
     * @description 会员列表数据
     * @page  页数
     * @List  传过来的数据
     * @bool   给returnCount赋值（后台需要的）
     * @changPage 判断上一页下一页
     * @cacheKe  时间戳（第一次保存时间戳  第二次条件改变了之后需要改变时间戳）
     *
     * @getId 是否保存id
     * @loadingClose  判断是否要不要loading
     *
     */
    getMemberList(page, List, bool, cacheKey, changPage, getId) {
      let that = this;
      this.total1 = 0;
      //  先查列表 在查数量
      this.getConsts(page, List, bool, cacheKey, changPage, getId);
    },
    // //查询列表数量（数据多的话需要一直请求  code =353001  等待3秒再次查询）
    getConst(page, List, bool, cacheKey, changPage, getId) {
      this.refresh = true;
      let that = this;
      that.data = {
        conditions: [
          {
            conditionEntries: List
          }
        ],
        page: page,
        size: 10,
        cacheKey: cacheKey,
        returnCount: bool,
        loadingClose: true
       
      };

      if (changPage == "prev") {
       
        that.data.firstId = that.tableData[0].id;
      } else if (changPage == "next") {
      
        that.data.lastId = that.tableData[9].id;
      }
      let data3 = JSON.parse(JSON.stringify(that.data));
      that.imgShow = true;
      clearInterval(that.tiem);
      that.tiem = setInterval(() => {
        that.API.GetMemberListNum(data3).then(res => {
          console.log("getConst", res.code == 0);
          if (res.code == 0) {
            clearInterval(that.tiem);
            that.refresh = false;
            that.imgShow = false;
            that.total1 = res.data;
          }
        });
      }, 3000);
    },
    //查询列表（查询列表的会后台马上给你）
    getConsts(page, List, bool, cacheKey, changPage, getId) {
      this.currentPage = page;
      let that = this;

      that.data1 = {
        conditions: [
          {
            conditionEntries: List
          }
        ],
        page: page,
        size: 10,
        cacheKey: cacheKey,
        returnCount: bool
      };

      if (changPage == "prev") {
        //如果上一页  firstId 本页取最小的
        that.tableData.sort((num1, num2) => {
    return num1.id - num2.id < 0
     })
        that.data1.firstId = that.tableData[0].id
        console.log(that.data1.firstId,"firstId")
      } else if (changPage == "next") {
        //如果上一页  lastId 本页取最大的的
         that.tableData.sort((num1, num2) => {
    return num1.id - num2.id > 0
     })
        that.data1.lastId = that.tableData[0].id;
         console.log(that.data1.lastId,"lastId")
      }
      that.API.getMembersList(that.data1).then(res => {
        if (res.data.data.length == 0) that.tableData = [];
        that.tableData = res.data.data;
        this.getConst(page, List, bool, cacheKey, changPage, getId);
        if (!bool) {
          if (that.serachId != null) {
            if (that.serachId == that.tableData[0].id) {
              that.prvBtn = false;
            } else {
              that.prvBtn = true;
            }
          }
        } else {
        }
        if (getId) {
          that.prvBtn = false;
          that.serachId = that.tableData[0].id;
        }
      });
    },
    /**
     * @page 页数
     * @List 筛选条件
     * @bool  传给后台的默认值false（之前的不是固定的 ，后面也不想改了 就传个参）
     * @cacheKey 时间戳
     * @getId  判断是否要保存firstId或者lastId
     * @sort 点最后一页倒序查询
     * @pageSize 最后一页的时候没有10条的时候需要当pageSize传过去
     * @removePage 判断page是否要传
     */
    //查询列表分别拎出来  做调用
    getConstsTwo(page,List,bool,cacheKey,changPage,getId,removePage,sort,pageSize) {
      let that = this;
      that.data1 = {
        conditions: [
          {
            conditionEntries: List
          }
        ],

        size: 10,
        cacheKey: cacheKey,
        returnCount: bool
      };
      if (sort) {
        that.data1.sort = sort;
        that.data1.size = pageSize;
        that.data1.sortBy = "_id";
      }
      if (removePage) {
        that.data1.page = page;
      }

      if (changPage == "prev") {
        that.data1.firstId = that.tableData[0].id;
      } else if (changPage == "next") {
        that.data1.lastId = that.tableData[9].id;
      }
      that.API.getMembersList(that.data1).then(res => {
        if (res.code === 353001) {
        } else {
          if (res.data.data.length == 0) that.tableData = [];
          that.tableData = res.data.data;
          if (!bool) {
            if (that.serachId != null) {
              if (that.serachId == that.tableData[0].id) {
                that.prvBtn = false;
              } else {
                that.prvBtn = true;
              }
            }
          } else {
          }
          if (getId) {
            that.prvBtn = false;
            that.serachId = that.tableData[0].id;
          }
        }
      });
    },
    getDataListMember() {},
    // 唤醒弹出
    callImportBox(type) {
      this.showTypes.importType = type;
    },
    // 回收筛选数据
    _upSV({ ...e }) {
      console.log("我是子组件中传值过来触发父组件的方法");
       this.showTypes.searchType = false;
      this.currentPage = 1;
      this.paginationShow = false;
      console.log(e);
        /**为了加快搜索
         * 拼接到this.allfilter的id里面  下次在从子组件传值过来的时候先比较id 如果找到了，就直接取this.allfilter里面的在吧时间戳给后台
         */
        var id = "";

        if(e.data.length!=0&&e.data!=undefined){
          e.data.map(res => {
          if (res.name == "tagIds") {
            if(res.value.length!=0){
               res.value.map(item => {
              id += String(item);
            });
            }
          }else if(res.name=="nickName"){
            id +=String(0)+String(res.value);
          }else if(res.name=="phoneNumber"){
            id +=String(1)+String(res.value);
          }else if(res.name=="_id"){
             id +=String(2)+String(res.value);
          }
            id += String(res.value);
        });
        }
        
      
      this.setAllfilter(id, e.data);
      this.resetData = e.data;
      this.addressRest = e.address;
     
    },
    // 添加数据和查找数据
    setAllfilter(id, setData) {
      console.log(this.allfilter.length)
      if (this.allfilter.length == 0) {
        this.cacheKey = Date.parse(new Date());
        let data = {
          time: this.cacheKey,
          filter: {
            data: setData,
            id: id
          }
        };
        this.$store.commit("d2admin/user/setMemoryTimesTamp", data);
        console.log(this.allfilter, "vuex里面的数据是不是增加了2");
        this.getMemberList(1, setData, false, this.cacheKey, "", false);
      } else {
        let dataList = this.allfilter.find(item => {
          console.log(item.filter.id, id);
          return item.filter.id == id;
        });
        if (dataList != undefined) {
          this.getMemberList( 1,dataList.filter.data,false,dataList.time, "",false);
          this.cacheKey=dataList.time
        } else {
          this.cacheKey = Date.parse(new Date());
          let data = {
            time: this.cacheKey,
            filter: {
              data: setData,
              id: id
            }
          };
          this.$store.commit("d2admin/user/setMemoryTimesTamp", data);
          console.log(this.allfilter, "vuex里面的数据是不是增加了1");
          this.getMemberList(1, setData, false, this.cacheKey, "", false);
        }
      }
    },

    // 回收标签
    _upAddLabel(e) {
      TAG.addTag(
        this.setItems.map(d => d.id),
        e.tags.map(d => d.id)
      ).then(res => {
        this.getMemberList(this.currentPage, this.resetData, false, this.cacheKey, "", false);
      });
      this.showTypes.addLabelType = false;
    },
    /**
     * onCname Tbs事件代理 中的具体代理事件；
     * //挂在在每个 tab-v 上的事件;
     * @item 当前选中值的 背景参数
     * @v 当前值的 值
     */
    clickName(v) {
      console.log("v", v.nickName);
      this.$router.push({
        name: "memInfoView",
        query: {
          id: v.id,
          memberBrandId: v.memberBrandId,
          projectName: this.projectName
        }
      });
    },

    getTabSelList(v) {
      this.setItems = v;
    },
    integralThis(type, v) {
      this.integralType = type;
    },
    handleCurrentChange(e, type) {
      let pageLat = this.total1 / 10;
      let pageSize = this.total1 % 10;
      
      if (this.total1 % 10 > 0) {
        pageLat = parseInt(pageLat) + 1;
      }
       let pageSizeNext=0
      if(e == pageLat){
        pageSizeNext=pageSize
      }else if(e <pageLat){
         pageSizeNext=10
      }
      // 上面的步骤主要是算页数和要获取页面的pageSize
     
      console.log(e, pageLat, e == pageLat);
      // if(this.currentPage,e)
      console.log("判断上一页下一页", this.currentPage - e);
      console.log(this.cacheKey,"时间戳")
      //上一页
      if (this.currentPage - e == 1) {
        this.judgePage(e, pageLat, "prev", pageSizeNext);
        // 下一页
      } else if (this.currentPage - e == -1) {
        this.judgePage(e, pageLat, "next", pageSizeNext);
        // 点最后一页
      } else if(e == pageLat) {
         this.pageDataListShow =false;//做个标识 判断一下点没有点第一页或者最后一页 true 点了第一页 false 点了最后一页
        this.judgePage(e, pageLat, "", pageSizeNext);
        //点第一页
      }else if(e == 1){
         this.pageDataListShow = true;
         this.judgePage(e, pageLat, "", pageSizeNext);
         //  随便跳页
      }else{
          this.judgePage(e, pageLat, "", pageSizeNext);
      }
    },
    /**
     * 
     */
    //判断上一页下一页
    // 思路:是通过判断是否点了第一页或者最后一页  在通过来判断是随便跳页还是选择上一页还是下一页的来选择传递不同的参数
    // 当我们传递lastId或者firstId的时候可以不传page
    judgePage(e, pageLat, turnPage, pageSize) {
      this.currentPage = e;
      if(this.pageDataListShow){
        if(turnPage=="prev"){
           this.getConstsTwo( 1,this.resetData,false,this.cacheKey,turnPage,true,false);
        }else if(turnPage=="next"){
           this.getConstsTwo( 1,this.resetData,false,this.cacheKey,turnPage,true,false);

        }else{
           this.getConstsTwo( e,this.resetData,false,this.cacheKey,turnPage,false,true);
        }
    
      }else{
         if(turnPage=="prev"){
           this.getConstsTwo(1,this.resetData,false,this.cacheKey,turnPage,true,false,-1,pageSize);
        }else if(turnPage=="next"){
           this.getConstsTwo( 1,this.resetData,false,this.cacheKey,turnPage,true,false,-1,pageSize);

        }else{
           this.getConstsTwo((pageLat-e)+1,this.resetData,false,this.cacheKey,turnPage,false,true,-1,pageSize);
        }

      }
    },
    _upfileCancel(e) {
      console.log("上传或导出--取消", e);
      this.showTypes.importType = 0;
    },
    _upfileSuccess(e) {
      console.log("上传或导出--确认", e);
      this.showTypes.importType = 0;
    },
    changePanents(e){
      this.showTypes.searchType=false
    }
  }
};
</script>

<style lang="scss" scope>
.userTotal {
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  img {
    height: 20px;
    width: 20px;
  }
}
.tab-head-btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.v-name {
  color: #409eff;
  cursor: pointer;
}
.head {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  position: relative;
  display: block;
  white-space: nowrap;
  border-radius: 500px;
}
</style>
<style lang="scss">
.el-table th {
  color: #000 !important;
  // background: #f7f6f2 !important;
  text-align: center !important;
}
.el-table td {
  text-align: center !important;
}
</style>
