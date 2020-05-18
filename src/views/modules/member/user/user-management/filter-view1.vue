<template >
  <div class="add-label-content">
    <el-drawer
      title="筛选会员"
      :visible.sync="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
      center
    >
      <el-row :gutter="20" style="margin-left:10px;">
        <el-col style="display:flex;">
          <el-dropdown split-button size="mini" type="primary" @command="handleCommand">
            {{
            dropdowns[0].isSet
            ? dropdowns[0].name
            : dropdowns[1].isSet
            ? dropdowns[1].name
            : dropdowns[2].isSet
            ? dropdowns[2].name
            : ''
            }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(itm, idx) in dropdowns"
                :key="idx"
                :command="itm.idx"
              >{{ itm.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input
            v-model="nickName"
            style="flex:1;width:100px;"
            :placeholder="'请输入昵称、手机号、id'"
            size="mini"
            clearable
          />
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
        label-position="top"
        style="margin:20px"
      >
        <el-form-item label="标签" size="mini" prop="tags" style="height:100%;">
          <el-button type="primary" @click.native="searchTag">选择标签</el-button>
          <div style="margin:10px 0px;">
            <el-tag
              :key="tag.id"
              v-for="tag in dynamicTags1"
              closable
              :disable-transitions="false"
              @close="handleClose3(tag)"
            >{{tag.tagName}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="关注来源" prop="subscribe" size="mini">
          <el-radio-group v-model="ruleForm.subscribe">
            <el-radio label="1">全部</el-radio>
            <el-radio label="2">微信关注</el-radio>
            <el-radio label="3">系统注册</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别" prop="sex" size="mini">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">全部</el-radio>
            <el-radio label="2">男</el-radio>
            <el-radio label="3">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="addressValue" size="mini">
          <address-mob
            :addvalue="ruleForm.addressValue"
            @getValue="form_getAddressMobValue"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="关注时间" size="mini" prop="subscribeTimeInt">
          <el-date-picker
            v-model="ruleForm.subscribeTimeInt"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="注册时间" size="mini" prop="registerTimeInt">
          <el-date-picker
            v-model="ruleForm.registerTimeInt"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          ></el-date-picker>
        </el-form-item>
         <el-form-item label="生日" size="mini" prop="birthdayInt">
          <el-date-picker
            v-model="ruleForm.birthdayInt"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="积分值">
          <el-input
            v-model="ruleForm.valueScoreMin"
            style="width:40%"
            autocomplete="off"
            size="mini"
            clearable
          />至
          <el-input
            v-model="ruleForm.valueScoreMax"
            style="width:40%"
            autocomplete="off"
            size="mini"
            clearable
          />
        </el-form-item>
       

        <el-form-item>
          <el-button @click.native="resetForm" size="mini">重置筛选</el-button>
          <el-button type="primary" @click.native="submitForm" size="mini">应用筛选</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog
      title="选择标签"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose2"
      center
    >
      <div class="add_label_first">
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
        <el-tag
          :key="tag.id"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose1(tag)"
        >{{tag.tagName}}</el-tag>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancl" size="mini">取 消</el-button>
        <el-button type="primary" @click="determine" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import addressMob from "@/components/address/index"; // 该组件导入地址
import { tagDetail, tagSearch } from "@/api/member/member";
// import FilterMaterial from '@/api/member/filter'
export default {
  name: "",
  props: {
    showType: {
      type: Boolean,
      default: false
    },
    resetData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 地址Id
    addressRest: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //标签列表
    getTageDatas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {
    "address-mob": addressMob
  },
  data() {
    return {
      drawer: null,
      //表单数据
      //   输入数据
      nickName: null,
      ruleForm: {
        tags: [], //标签
        sex:"1", //性别
        subscribe:"1", //关注
        addressValue:[], //地区
        registerTimeInt: [], //注册时间
        //会员积分
        valueScoreMin: null, //积分值
        valueScoreMax: null,
        birthdayInt: [], //生日
        subscribeTimeInt: [] //关注事件
      },
      index: 0, //定义一个序号 判断是否选择的是ID 昵称 手机号
      dropdowns: [
        { idx: 0, name: "昵称", isSet: true },
        { idx: 1, name: "手机号", isSet: false },
        { idx: 2, name: "ID", isSet: false }
      ],
      tags: [],

      props: { multiple: true },
      dynamicTags: [], //标签

      dialogVisible: false,
      //   弹窗
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
      // getTageDatas: [], //获取的所有标签

      dynamicTags1: [], //侧边栏标签
      address1:[]
    };
  },
  methods: {
    handleClose() {
      this.drawer=false
      this.$emit("changePanents",this.drawer)
    },
    // 复现数据
    resetDataChid(list) {
      if (list.length == 0) return;
      list.forEach(res => {
        if (res.name == "nickName") {
          this.nickName = res.value;
          this.dropdowns.forEach(d => {
            d.isSet = false;
          });
          this.dropdowns[0].isSet = true;
          this.index=0
        } else if (res.name == "phoneNumber") {
          this.nickName = res.value;
          this.dropdowns.forEach(d => {
            d.isSet = false;
          });
          this.dropdowns[1].isSet = true;
           this.index=1
        } else if (res.name == "_id") {
          this.nickName = res.value;
          this.dropdowns.forEach(d => {
            d.isSet = false;
          });
          this.dropdowns[2].isSet = true;
           this.index=2
        } else if (res.name == "tagIds") {
          console.log(this.allTag);
          res.value.forEach(res => {
            let tagId = this.allTag.find(item => {
              return item.id== res;
            });
            this.dynamicTags1.push(tagId);
          });
          // 性别
        } else if(res.name == "sex"&& res.value ==1){
           this.ruleForm.sex = String(2);
        }else if(res.name == "sex"&& res.value == 2){
           this.ruleForm.sex = String(3);
        } else if ((res.name == "registerTimeInt") & (res.mode == 6)) {
          this.ruleForm.registerTimeInt[0] = String(res.value);
        } else if ((res.name == "registerTimeInt") & (res.mode == 4)) {
          this.ruleForm.registerTimeInt[1] = String(res.value);
          //  积分植
        } else if ((res.name == "memberPoints") & (res.mode == 6)) {
          this.ruleForm.valueScoreMin = res.value;
        } else if ((res.name == "memberPoints") & (res.mode == 4)) {
          this.ruleForm.valueScoreMax = res.value;
          // 生日
        } else if (res.name == "birthdayInt" && res.mode == 6) {
          this.ruleForm.birthdayInt[0] = String(res.value);
        } else if (res.name == "birthdayInt" && res.mode == 4) {
          this.ruleForm.birthdayInt[1] = String(res.value);
          //时间
        }  else if (res.name == "subscribeTimeInt" && res.mode == 6) {
          this.ruleForm.subscribeTimeInt[0] = String(res.value);
        } else if (res.name == "subscribeTimeInt" && res.mode == 4) {
          this.ruleForm.subscribeTimeInt[1] = String(res.value);
        }else if(res.name == "subscribe"&& res.mode == 1){
           this.ruleForm.subscribe = String(2);
        }else if(res.name == "subscribe"&& res.mode == 9){
           this.ruleForm.subscribe = String(3);

        }else if(res.name=="districtId"||res.name=="cityId"||res.name=="provinceId"){
         
        let addressList=JSON.parse(localStorage.getItem("address"))  
        addressList.forEach(d=>{
          this.ruleForm.addressValue.push(d.id)
        })
        console.log("this.ruleForm.addressValue",this.ruleForm.addressValue)
      
        }

      });
    },
    //处理数据
    submitForm() {
      let allData = [];
      if (this.nickName != null) {
        let data1 = {
          mode: 1,
          value: this.nickName
        };
        data1.name =this.index == 0? "nickName":(this.index == 1? "phoneNumber": "_id");
        console.log("数据错误",data1.name)
          
        allData.push(data1);
      }
      let data = JSON.parse(JSON.stringify(this.ruleForm));
      let list = [];
      for (let item in data) {
        if (data[item] == null || data[item].length == 0) {
          delete data[item];
        }
      }
      if (data == {}) {
        
      } else {
        //   性别处理
         if (data.hasOwnProperty("sex")) {
          if (data.sex == "1") {
           
          } else if (data.sex == "2") {
            let sex = {
              name: "sex",
              mode: 1,
              value: 1
            };
             allData.push(sex);

          } else {
            let sex1 = {
              name: "sex",
              mode: 1,
              value: 2
            };
            allData.push(sex1);
          }
        }
        
        // 关注
        if (data.hasOwnProperty("subscribe")) {
          if (data.subscribe == "1") {
            
          } else if (data.subscribe == "2") {
            let subscribe = {
              name: "subscribe",
              mode: 1,
              value: 1
            };
             allData.push(subscribe);

          } else {
            let subscribe1 = {
              name: "subscribe",
              mode: 9,
              value: 1
            };
            allData.push(subscribe1);
          }
        }

        //标签
        if (this.dynamicTags1.length > 0) {
          let dynamicTagsData=[]
          this.dynamicTags1.forEach(res=>{
            dynamicTagsData.push(res.id)
          })
          let tag = {
            name: "tagIds",
            mode: 2,
            value: dynamicTagsData
          };
          allData.push(tag);
        }

        //   地区处理
        console.log("数据", data.addressValue);
        if (data.hasOwnProperty("addressValue")) {
          let addressList = [];
          if (data.addressValue.length == 3) {
            let addressValueThree = {
              name: "districtId",
              mode: 1,
              value: data.addressValue[2].id
            };
            addressList.push(addressValueThree);
          } else if (data.addressValue.length == 2) {
            let addressValue5 = {
              name: "cityId",
              mode: 1,
              value: data.addressValue[1].id
            };
            addressList.push(addressValue5);
          } else {
            let addressValue6 = {
              name: "provinceId",
              mode: 1,
              value: data.addressValue[0].id
            };

            addressList.push(addressValue6);
          }
          allData = [...allData, ...addressList];
        }

        //注册时间
        let registerTimeInt = this.jubgeTime(data, "registerTimeInt");
        if (registerTimeInt) allData = [...allData, ...registerTimeInt];
        // 关注时间
        let subscribeTimeInt = this.jubgeTime(data, "subscribeTimeInt");
        if (subscribeTimeInt) allData = [...allData, ...subscribeTimeInt];
        //积分植
        if (data.hasOwnProperty("valueScoreMin")) {
          let dataSex = {
            name: "memberPoints",
            mode: 6,
            value: data.valueScoreMin
          };
          allData.push(dataSex);
        }
        if (data.hasOwnProperty("valueScoreMax")) {
          let dataSexs = {
            name: "memberPoints",
            mode: 4,
            value: data.valueScoreMax
          };
          allData.push(dataSexs);
        }
        //生日
        let birthdayInt = this.jubgeTime(data, "birthdayInt");
        if (birthdayInt) allData = [...allData, ...birthdayInt];

         this.$emit("_upSV", {
          data: allData,
          address: this.ruleForm.addressValue,
        });
        this.drawer = false;
      }
      
      
    },
    // 重置搜索
    resetForm() {
      this.nickName = null;
      this.dropdowns.forEach(d => {
        d.isSet = false;
      });
      this.dropdowns[0].isSet = true;
      this.dynamicTags1 = [];
      this.ruleForm.sex = "1";
      this.ruleForm.addressValue = [];
      this.ruleForm.registerTimeInt = [];
      this.ruleForm.valueScoreMin = null;
      this.ruleForm.valueScoreMax = null;
      this.ruleForm.birthdayInt = [];
      this.ruleForm.subscribeTimeInt = [];
      this.ruleForm.subscribe="1";
      this.submitForm();
    },
    // 判断时间
    jubgeTime(obj, name) {
      if (obj.hasOwnProperty(name)) {
        let dataSex = {
          name: name,
          mode: 6,
          value: Number(obj[name][0])
        };
        let dataSex1 = {
          name: name,
          mode: 4,
          value: Number(obj[name][1])
        };
        return [dataSex, dataSex1];
      } else {
        return false;
      }
    },

    handleCommand(command) {
      this.index = command;
      this.dropdowns.forEach(d => {
        d.isSet = false;
      });
      this.dropdowns[command].isSet = true;
    },
    form_getAddressMobValue(e) {
      this.ruleForm.addressValue = e;
      localStorage.setItem("address",JSON.stringify(this.ruleForm.addressValue))

    },
    getTag(e) {
      console.log(e);
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear();
      console.log(2, Y);
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var D = date.getDate();

      return Y + M + D;
    },
    //标签
    handleClose1(tag) {
      console.log(11, tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.checkedCities.splice(this.checkedCities.indexOf(tag.id), 1);
      this.tagDataList.splice(this.tagDataList.indexOf(tag.id), 1);
    },
    // 删标签
    handleClose3(tag){
       this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.dynamicTags1.splice(this.dynamicTags.indexOf(tag), 1);
       this.checkedCities.splice(this.checkedCities.indexOf(tag.id), 1);
      this.tagDataList.splice(this.tagDataList.indexOf(tag.id), 1);


    },
    handleClose2(done) {
      done();
    },
    // 弹窗

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
      list.forEach(item => {
        if (item.menuTagList.length == 0 && item.unMenuTagList.length == 0)
          return;
        let datas = {
          tagGroupName: item.tagGroupName,
          menuTagList: []
        };
        if (item.menuTagList.length >0) {
          datas.menuTagList = [...datas.menuTagList, ...item.menuTagList];
          this.allTag = [...this.allTag, ...item.menuTagList];
        } else if (item.unMenuTagList.length >0) {
          datas.menuTagList = [...datas.menuTagList, ...item.unMenuTagList];
          this.allTag = [...this.allTag, ...item.unMenuTagList];
        }
        this.menuTagList.push(datas);
      });
      console.log(111111, this.allTag);
      if(this.menuTagList.length>0){
        this.scendmenuTagList = this.menuTagList[this.currentIndex].menuTagList;

      }else{
         return
      }
      
    },
    // 判断需要回显
    judge() {
      let data = [];
      if (this.dynamicTags1.length > 0) {
        this.dynamicTags1.forEach(i => {
          data = [...data, i.id];
        });
        console.log("数据呢", this.checkedCities, data);
        this.checkedCities = [];
        if (data.length > 0) {
          data.forEach(res => {
            this.checkedCities.push(res);
          });
        }
        // this.checkedCities = this.unipe(this.checkedCities);
        console.log("数据少了", this.checkedCities);
        this.getName(data);
      }
    },
    //通过id获取tagName
    getName(list) {
      console.log(this.allTag);
      let dataList = [];
      if (list.length > 0) {
        list.forEach(res => {
          let data = this.allTag.find(item => {
            console.log("数据12345", item, res);
            return item.id == res;
          });
          console.log(3333, data);
          dataList.push(data);
        });
        this.dynamicTags = dataList;
        this.dynamicTags = this.unipe(this.dynamicTags);
      } else if (list.length == 0) {
        this.dynamicTags = [];
      }
    },
    getTageData() {},
    //去重
    unipe(arr) {
      const res = new Map();
      return arr.filter(a => !res.has(a.id) && res.set(a.id, 1));
    },
    //改变index
    changeIndex(index) {
      this.currentIndex = index;
      this.scendmenuTagList = this.menuTagList[index].menuTagList;
    },
    // 搜索
    search() {
      console.log(this.inputValue, this.menuTagList);
      tagSearch({
        name: this.inputValue,
        // type: this.radio == "1" ? 3 : 4,
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
    },
    //打开弹窗
    searchTag() {
      this.dialogVisible = true;
      this.judge();
    },
    cancl() {
      this.dialogVisible = false;
      this.dynamicTags = [];
    },
    determine() {
      this.dynamicTags1 = this.dynamicTags;
      this.dialogVisible = false;
    }
  },
  watch:{
    showType(newValue,oldValue){
      console.log(newValue,oldValue,"判断能不能插调")
      if(newValue){
        this.drawer = this.showType;
      }
    }
  },
  created() {
    console.log("this.getTageDatas",this.getTageDatas)
    this.setLabel(this.getTageDatas);
    this.resetDataChid(this.resetData);
      this.address1=JSON.parse(JSON.stringify(this.ruleForm.addressValue))
    //  this.ruleForm.addressValue=this.addressRest
       this.drawer = this.showType;
    
    

    console.log("父组件传过来的数据", this.resetData);
  }
};
</script>
<style lang='scss'>
.el-drawer.rtl {
  overflow-y: auto;
}
</style>
<style lang='scss' scoped>
.add_label_first {
  width: 100%;
  height: 300px;
  border: 1px solid #ebeef5;
  display: flex;
  //   margin: 20px;
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
.el-tag + .el-tag {
  margin: 10px 0px 0px 10px;
}
</style>