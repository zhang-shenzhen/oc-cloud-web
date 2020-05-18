<template>
  <div class="add-label-content">
    <el-drawer
      title="打标签"
      :visible.sync="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
      center
    >
      <el-radio-group v-model="radio" class="ml20" @change="changeLabel">
        <el-radio :label="2">系统标签</el-radio>
        <el-radio :label="1">微信菜单标签</el-radio>
      </el-radio-group>
      <h3 class="list-title ml20">选择标签</h3>
      <div class="add_label1">
        <div class="add_label2">
          <div class="add_label4">
            <el-input
              type="text"
              placeholder="请输入标签名或者关键字"
              style="width:150px;margin-right:10px;"
              size="mini"
              clearable
              v-model="inputValue"
            ></el-input>
            <el-button size="mini" type="primary" @click="search">搜索</el-button>
          </div>
          <div class="labelChoose">
            <div
              v-for="(item,index) in menuTagList"
              :key="index"
              class="labelChoose1"
              @click="changeIndex(index)"
              :class="{'current':currentIndex==index}"
            >
              <p>{{item.tagGroupName}}</p>
            </div>
          </div>
        </div>
        <div class="add_label3">
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
            class="groupLabel"
          >
            <el-checkbox
              v-for="item in scendmenuTagList"
              :label="item.id"
              :key="item.id"
              style="margin:10px"
            >{{item.tagName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <h3 class="list-title ml20">当前已选标签</h3>
      <div class="tagLabel ml20">
        <!-- <el-tag
          :key="tag.id"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose1(tag)"
        >{{tag.tagName}}</el-tag> -->
        <div class="memInfo-l-b-labels">
            
            <div
              v-for="tag in dynamicTags"
              :key="tag.id"
              :class="'memInfo-l-b-label'"
              :style="{
                background: '#ecf5ff',
                border: `1px solid #d9ecff`,
                color: '#409EFF',
              }"
               @click="handleClose1(tag)"
              
            >
              {{ tag.tagName }}
              <div
                class="memInfo-l-b-label-bag"
                style="background:#ecf5ff"
              />
              <i
                class="iconfont el-icon-close setIngHover"
                :style="{
                  width: '10px',
                  height: '10px',
                  color:'#409EFF',
                  'font-size': '12px',

                }"
                
               
              />
            </div>
          </div>
      </div>
      <div style="margin: 20px 0 0 20px;">
        <el-button size="mini" type="primary" @click="submitData">确定</el-button>
        <el-button size="mini" type="primary" plain @click="drawer=false">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { tagDetail, tagSearch } from "@/api/member/member";
export default {
  name: "addLabel",
  props: {
    showType: {
      type: Boolean,
      default: false
    },
    // 数据格式
    // [{id: 1079,tagName: "菜单标签123"}]
    setItems1: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 传0 是在客户的标签上修改  传1就是单独的打标签
    echo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      drawer: null,
      radio: 2,
      checkedCities: [],
      cities: [],
      currentIndex: 0,
      dynamicTags: [],
      menuTagList: [], //菜单标签
      menuTagListTwo: [], //菜单标签
      unMenuTagList: [], //非菜单标签
      tagData: [],
      //所有的标签总和
      allTag: [],
      // 复制一份父组件的数据
      tagDataList: [],
      scendmenuTagList: [],
      inputValue: "", //搜索内容
      getTageDatas: [] //获取的所有标签
    };
  },
  methods: {
    handleClose() {
      this.drawer = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);

      this.getName(this.checkedCities);
    },
    handleClose1(tag) {
      console.log(11, tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.checkedCities.splice(this.checkedCities.indexOf(tag.id), 1);
      this.tagDataList.splice(this.tagDataList.indexOf(tag.id), 1);
    },
    // 处理标签
    setLabel(list) {
      // if(list.length==0) return
      list.forEach(item => {
        if (item.menuTagList.length == 0 && item.unMenuTagList.length == 0)
          return;
        if (item.menuTagList.length > 0) {
          let menuTagLists = {
            tagGroupName: item.tagGroupName,
            menuTagList: item.menuTagList
          };
          this.allTag = this.allTag.concat(menuTagLists.menuTagList);
          this.menuTagListTwo = [...this.menuTagListTwo, menuTagLists];
          // this.menuTagList = [...this.menuTagList, menuTagLists];
        } else if (item.unMenuTagList.length > 0) {
          let menuTagLists = {
            tagGroupName: item.tagGroupName,
            menuTagList: item.unMenuTagList
          };
          this.allTag = this.allTag.concat(menuTagLists.menuTagList);
          this.unMenuTagList = [...this.unMenuTagList, menuTagLists];
          // this.menuTagList = [...this.menuTagList, menuTagLists];
        }
      });
      if (this.unMenuTagList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.unMenuTagList));
        this.menuTagList = data;
        this.scendmenuTagList = this.menuTagList[this.currentIndex].menuTagList;
      }

      this.allTag = this.unipe(this.allTag);
    },
    // 判断需要回显
    judge() {
      console.log("没删掉", this.tagDataList);
      let data = [];
      if (this.tagDataList.length > 0) {
        this.tagDataList.forEach(i => {
          data = [...data, i.id];
        });
        console.log("数据呢", this.checkedCities, data);
        if (data.length > 0) {
          data.forEach(res => {
            this.checkedCities.push(res);
          });
        }
        this.checkedCities = [...new Set(this.checkedCities)];
        console.log("数据少了", this.checkedCities);
        this.getName(data);
      }
    },
    //通过id获取tagName
    getName(list) {
      console.log(2222, this.checkedCities);
      console.log("数据", this.menuTagList, list);
      console.log("长度", list.length > 0);
      let dataList = [];
      if (list.length > 0) {
        list.forEach(res => {
          let data = this.allTag.find(item => {
            console.log("数据12345", item, res);
            return item.id == res;
          });
          console.log("筛选出来的数据", data);

          dataList.push(data);
          // this.dynamicTags = [...this.dynamicTags,data];
        });
        this.dynamicTags = dataList;
        this.dynamicTags = this.unipe(this.dynamicTags);
      } else if (list.length == 0) {
        this.dynamicTags = [];
      }
      console.log("少了数据", this.dynamicTags);
      console.log("标签数据", this.dynamicTags);
    },
    // 单选切换
    changeLabel() {
      if (this.radio == "1") {
        if (this.menuTagListTwo.length > 0) {
          let data = JSON.parse(JSON.stringify(this.menuTagListTwo));
          this.menuTagList = data;
        } else {
          this.menuTagList = [];
        }
      } else {
        if (this.unMenuTagList.length > 0) {
          let data = JSON.parse(JSON.stringify(this.unMenuTagList));
          this.menuTagList = data;
        } else {
          this.menuTagList = [];
        }
      }
      this.changeIndex(0);
    },
    getTageData() {
      this.API.tagDetail().then(res => {
        this.getTageDatas = res;
        console.log("this.getTageDatas", this.getTageDatas);
        this.setLabel(this.getTageDatas);
        // this.setLabel("1")
        if (this.echo == "0") {
          this.judge();
        }
      });
    },
    //去重
    unipe(arr) {
      const res = new Map();
      return arr.filter(a => !res.has(a.id) && res.set(a.id, 1));
    },
    //传值到父组件
    submitData() {
      this.$emit("_upAddLabel", { tags: this.dynamicTags });
    },
    //改变index
    changeIndex(index) {
      this.currentIndex = index;
      console.log("this.menuTagList.length", this.menuTagList.length);
      if (this.menuTagList.length == 0) {
        this.scendmenuTagList = [];
      } else {
        this.scendmenuTagList = this.menuTagList[index].menuTagList;
      }
    },
    // 搜索
    search() {
      console.log(this.inputValue, this.menuTagList);
      tagSearch({
        name: this.inputValue,
        type: this.radio == "1" ? 3 : 4,
        returnAll: true
      }).then(res => {
        if (res.data == []) {
          this.changeIndex(data);
        } else {
          console.log(res);

          let data = this.menuTagList.findIndex(item => {
            return res.data[0].tagGroupName == item.tagGroupName;
          });
          console.log("找到了", data);
          this.changeIndex(data);
        }
      });
    }
  },
  watch: {
    showType(newValue, old) {
      this.drawer = newValue;
    }
  },
  mounted() {},
  created() {
    this.API = {
      tagDetail: tagDetail
    };
    this.drawer = this.showType;
    this.tagDataList = JSON.parse(JSON.stringify(this.setItems1));
    console.log("传过来的数据", this.setItems1, this.echo);
    this.getTageData();
  }
};
</script>
<style lang="scss" scope>
.add-label-content {
  padding: 20px;
}
.add_label1 {
  width: 100%;
  height: 300px;
  border: 1px solid #ebeef5;
  display: flex;
  margin: 20px;
  border-radius: 10px;
  .add_label2 {
    width: 50%;
    border-right: 1px solid #ebeef5;
    .add_label4 {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ebeef5;
    }
  }
  .add_label3 {
    width: 50%;
    overflow-y: auto;
  }
}
.ml20 {
  margin-left: 20px;
}
.groupLabel {
  display: flex;
  flex-direction: column;
}
.labelChoose {
  height: 250px;
  overflow-y: auto;
  .labelChoose1 {
    height: 30px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #ebeef5;
      cursor: pointer;
    }
    p {
    }
  }
}
.current {
  background: #ebeef5;
}
.tagLabel {
  .memInfo-l-b-labels {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          .memInfo-l-b-label {
            padding: 3px 5px;
            margin-right: 10px;
            font-size: 14px;
            border-radius: 4px;
            position: relative;
            margin-top: 5px;
            .memInfo-l-b-label-bag {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0.1;
              border-radius: 4px;
            }
          }
        }
}
</style>
<style lang="scss">
.memInfoView {
  .iconfont {
    color: #ff7f00;
    width: 40px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>