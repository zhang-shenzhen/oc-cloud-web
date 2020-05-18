<template>
  <div>
    <div>
      <h3 class="list-title">{{$t('banner.setConponent')}}</h3>
      <p class="componentConfiguration_2">{{$t('pageConfig.commodityModule')}}</p>
    </div>
    <div>
      <el-button type="primary" size="mini" @click="choose">{{$t('mallMoudle.choseMall')}}</el-button>
      <div v-for="(item, index) in mallList" :key="index" class="componentConfiguration">
        <h3 class="list-title">{{$t('mallMoudle.mall')}}{{ index + 1 }}</h3>
        <div class="df jcsb aic">
          <div class="df aic">
            <img
              :src="$fileUrl() + item.coverImg"
              alt
              style="height:40px;width:40px; margin-right:20px;"
            />
            <p class="componentConfiguration_1">{{ item.productName }}</p>
          </div>
          <el-button type="primary" size="mini" @click="deleteRemove(index)">{{$t('setHomePage.delete')}}</el-button>
        </div>
        <h3 class="list-title">{{$t('mallMoudle.mallSort')}}</h3>
        <el-input v-model="item.locationNum" :placeholder="$t('mallMoudle.setMallSort')" size="mini" />
        <p>{{$t('mallMoudle.setMallSortIntroduce')}}</p>
      </div>
      <h3 class="list-title">{{$t('banner.pageSort')}}</h3>
      <el-input v-model="sortNum" :placeholder="$t('navigation.addPageSort')" size="mini" />
      <div class="df aic jcc" style="margin-top:20px;">
        <div>
          <el-button type="primary" size="mini" @click="save">{{$t('banner.save')}}</el-button>
          <el-button size="mini" @click="removeSll">{{$t('setHomePage.delete')}}</el-button>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="$t('mallMoudle.mallList')"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      center
    >
      <div></div>
      <el-row>
        <el-col :span="6" :xs="24">
          <span>{{$t('mallMoudle.mallClass')}}:</span>
          <el-cascader
            v-model="ruleForm.categoryId"
            size="mini"
            class="box_form"
            clearable
            :options="goodsCategor"
          />
        </el-col>
        <el-col :span="6" :xs="24">
          <span>{{$t('mallMoudle.mallname')}}:</span>
          <el-input
            v-model="ruleForm.productName"
            class="box_form"
            size="mini"
            clearable
            :placeholder="$t('mallMoudle.mallname')"
          />
        </el-col>
        <el-col :span="6" :xs="24">
          <span>{{$t('mallMoudle.mallCode')}}:</span>
          <el-input
            v-model="ruleForm.sku"
            class="box_form"
            size="mini"
            clearable
            :placeholder="$t('mallMoudle.mallCode')"
          />
        </el-col>
        <el-col :span="6" :xs="24">
          <span>{{$t('mallMoudle.mallStatus')}}:</span>
          <el-select v-model="ruleForm.onShelf" size="mini" clearable placeholder="请选择商品状态">
            <el-option label="上架" value="1" />
            <el-option label="下架" value="0" />
          </el-select>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-button type="primary" size="mini" @click="submitForm()">
            {{
            $t('query')
            }}
          </el-button>
          <el-button type="primary" size="mini" @click="AddSku">{{$t('mallMoudle.mallSku')}}</el-button>
        </el-col>
      </el-row>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100% ;margin-top:20px;"
          height="500"
          max-height="550"
          :header-cell-style="{
            'background-color': 'rgba(242, 242, 242, 1)',
          }"
          @selection-change="handleSelectionChange"
          @select-all="selectAll"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column :label="$t('commodity.goods.itemCode')" fixed width="240">
            <template slot-scope="scope">
              <div class="box_sty">
                <img style="width:80px;height:80px;" :src="$fileUrl() + scope.row.coverImg" />
                <div style="margin-left: 10px">{{ scope.row.unionCode }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="240" :label="$t('coupons.name')">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column :label="$t('mallMoudle.mallPrice')" width="100">
            <template slot-scope="scope">{{ scope.row.productPrice }}</template>
          </el-table-column>
          <el-table-column :label="$t('mallMoudle.mallId')">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column :label="$t('mallMoudle.mallInventory')">
            <template slot-scope="scope">{{ scope.row.stock }}</template>
          </el-table-column>
          <el-table-column :label="$t('commodity.goods.class')">
            <template slot-scope="scope">{{ scope.row.categoryName }}</template>
          </el-table-column>
          <el-table-column :label="$t('mallMoudle.newProduct')" width="100">
            <template slot-scope="scope">
              {{
              scope.row.newProductRecommend
              ? $t('running.suspended1')
              : $t('running.suspended0')
              }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('mallMoudle.Hot')" width="100">
            <template slot-scope="scope">
              {{
              scope.row.hotProductRecommend
              ? $t('running.suspended1')
              : $t('running.suspended0')
              }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('commodity.goods.salesVolume')" width="100">
            <template slot-scope="scope">{{ scope.row.salesVolume }}</template>
          </el-table-column>
          <el-table-column :label="$t('menu.sort')" width="100">
            <template slot-scope="scope">{{ scope.row.sortNum }}</template>
          </el-table-column>
          <el-table-column :label="$t('wechat.menu.tab3')" width="100">
            <template slot-scope="scope">
              {{
              scope.row.onShelf == '1' ? $t('shelf') : $t('obtained')
              }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remove">{{$t('pageConfig.cancel')}}</el-button>
        <el-button type="primary" @click="addMall">{{$t('setHomePage.determine')}}</el-button>
      </span>
    </el-dialog>
    <!-- 录用sku添加商品 -->
    <div>
      <el-dialog
        :title="$t('mallMoudle.mallList')"
        :visible.sync="dialogVisibleSku"
        width="80%"
        :before-close="handleCloseSku"
        center
      >
        <div class="transfer-sty">
          <div class="transfer-div">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="SKU ID录入" name="1">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 22, maxRows: 8}"
                  :placeholder="$t('mallMoudle.addContent')"
                  v-model="textarea"
                ></el-input>
                <div></div>
              </el-tab-pane>
            </el-tabs>
            <div class="btn-sty">
              <el-button size="mini" @click="empty(1)">{{$t('mallMoudle.empty')}}</el-button>
              <el-button size="mini" type="primary" @click="add">{{$t('pageConfig.add')}}</el-button>
            </div>
          </div>
          <div>
            <i class="el-icon-arrow-right icon-rights"></i>
          </div>
          <div class="transfer-div">
            <div class="transfer-title">
              <div class="title-div">{{$t('mallMoudle.addmallGoods')}}</div>
              <div class="btn-sty">
                <el-button size="mini" @click="remove1">{{$t('mallMoudle.remove')}}</el-button>
                <el-button size="mini" type="primary" @click="empty(2)">{{$t('mallMoudle.empty')}}</el-button>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData1"
              tooltip-effect="dark"
              max-height="500px"
              style="width: 100%"
              @selection-change="handleSelectionChange1"
            >
              <el-table-column fixed type="selection" width="55"></el-table-column>
              <el-table-column fixed :label="$t('banner.image')" width="120">
                <template slot-scope="scope">
                  <img style="width:50px;height:50px;" :src="$fileUrl() + scope.row.coverImg" />
                </template>
              </el-table-column>
              <el-table-column fixed :label="$t('mallMoudle.mallCode')" width="120">
                <template slot-scope="scope">{{ scope.row.unionCode }}</template>
              </el-table-column>
              <el-table-column :label="$t('mallMoudle.mallname')" width="180">
                <template slot-scope="scope">{{ scope.row.productName }}</template>
              </el-table-column>
              <el-table-column :label="$t('mallMoudle.mallPrice')" width="80">
                <template slot-scope="scope">{{ scope.row.productPrice }}</template>
              </el-table-column>
              <el-table-column :label="$t('mallMoudle.mallInventory')" width="80">
                <template slot-scope="scope">{{ scope.row.stock }}</template>
              </el-table-column>
              <el-table-column :label="$t('mallMoudle.mallClass')" width="120">
                <template slot-scope="scope">{{ scope.row.categoryName }}</template>
              </el-table-column>
              <el-table-column :label="$t('mallMoudle.mallStatus')" show-overflow-tooltip>
                <template
                  slot-scope="scope"
                >{{ scope.row.onShelf =='1'?$t('shelf'):$t('obtained') }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btn-shelf">
          <el-button size="mini" @click="removeSku">{{$t('pageConfig.cancel')}}</el-button>
          <el-button size="mini" type="primary" @click="shelf">{{$t('setHomePage.determine')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  ItemCategoryList,
  QueryClassificationList,
  ChildSpecifications,
  ProductList,
  QueryProduct,
  GoodsOnShelf,
  GoodsDel,
  UpDownBulk,
  SpecificationGoods
} from "@/api/commodity/goods";
import configUrl from "../../../../../api/configUrl";
export default {
  name: "",
  props: ["mallModule"],
  data() {
    return {
      index: 0,
      imageUrl: "",
      dialogVisible: false,
      // 分类数据
      ruleForm: {
        categoryId: "",
        spec: "",
        sku: "",
        onShelf: "",
        specChild: "",
        productName: ""
      },
      //   分类
      goodsCategor: [],
      //   分页
      currentPage: 0,
      total: 0,
      page: 1,
      // 表格
      tableData: [],
      multipleSelection: [],

      parentId: 0,
      pageGoods: 1, // 记录当前是第几页
      mallList: [], // 选择商品数据
      //   序号
      sortNum: null,
      mallLists: [],
      bannerIndex: null,
      // 输入sku添加商品
      dialogVisibleSku: false,
      // parentId: 0,
      activeName: "1",
      textarea: "",
      // goodsCategor: [],
      tableData1: [],
      multipleSelection1: [],
      selectData: []
      // currentPage: 1,
      // total: 0,
      // ruleForm: {
      //   categoryId: "",
      //   spec: "",
      //   sku: '',
      //   onShelf: '',
      //   specChild: "",
      //   productName: ""
      // },
    };
  },
  computed: {},
  watch: {
    mallModule(newName, oldName) {
      console.log(3333, newName, oldName);
      if (Object.keys(newName).length > 0) {
        this.mallList = newName.data;
        this.sortNum = newName.sortNum;
        this.bannerIndex = newName.index;
      } else {
        this.mallList = [];
        this.sortNum = null;
        this.bannerIndex = null;
      }
    }
  },
  created() {
    // 获取分类
    this.commodityClassificationInterface(this.parentId);

    // 获取商品
    this.getDataList(1);
    if (Object.keys(this.mallModule).length > 0) {
      this.mallList = this.mallModule.data;
      this.sortNum = this.mallModule.sortNum;
      this.bannerIndex = this.mallModule.index;
    } else {
      this.mallList = [];
      this.sortNum = null;
      this.bannerIndex = null;
    }
  },
  methods: {
    // 获取商品分类接口
    commodityClassificationInterface(parentId) {
      ItemCategoryList({
        parentId: 0,
        type: 1,
        page: 1,
        size: 500
      }).then(res => {
        if (res.code == 0) {
          const data = res.data;
          if (data.data) {
            this.echoList(data.data);
          }
        }
      });
    },
    echoList(data) {
      if (!data) {
        return;
      }
      data.forEach(item => {
        item.value = item.id;
        item.label = item.categoryName;
        item.children = item.productCategoryList;
        if (item.productCategoryList && item.productCategoryList.length > 0) {
          this.echoList(item.productCategoryList);
        }
      });
      this.goodsCategor = data;
    },
    choose() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    // 分页
    handleCurrentChange(e) {
      // 点击分页
      this.pageGoods = e;
      this.getDataList(e);
    },
    // 获取选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectAll(val) {
      console.log("全选", val);
      this.multipleSelection = val;
    },
    // 获取商品
    getDataList(page) {
      const that = this;
      QueryProduct({
        page: page,
        size: 10,
        unionCode: that.ruleForm.sku, // 商品编号
        onShelf: that.ruleForm.onShelf, // 商品状态
        productName: that.ruleForm.productName, // 商品名称
        categoryId: that.ruleForm.categoryId[2]
          ? that.ruleForm.categoryId[2]
          : "" // 商品分类
      }).then(res => {
        if (res.code == 0) {
          const data = res.data.data;
          if (data) {
            console.log(data, "商品列表接口参数");
            data.map(item => {
              item.coverPrice = (item.coverPrice / 100).toFixed(2);
              item.productPrice = (item.productPrice / 100).toFixed(2);
            });
            that.tableData = data;
          } else {
            that.tableData = [];
          }
          that.currentPage = res.data.page;
          that.total = res.data.total;
        }
      });
    },
    // 筛选按钮
    submitForm() {
      // 点击筛选查询
      console.log(this.ruleForm, "查看");
      this.getDataList(1);
      this.drawer = false;
    },
    // 取消
    remove() {
      this.dialogVisible = false;
    },
    // 确定
    addMall() {
      this.multipleSelection.forEach((i, d) => {
         i.coverPrice=Math.ceil(i.coverPrice*100)
        const data = {
          productName: i.productName,
          coverImg: i.coverImg,
          coverPrice: i.coverPrice,
          coverPriceStr:i.coverPriceStr,
          marketPrice:i.marketPrice,
          marketPriceStr:i.marketPriceStr,
          id: i.id,
          locationNum: i.locationNum,
          unionCode: i.unionCode
        };
        this.mallList.push(data);
        this.mallList = this.unipe(this.mallList);
      });

      this.dialogVisible = false;
      console.log(this.mallList);
    },
    // 删除一个商品
    deleteRemove(index) {
      this.mallList.splice(index, 1);
    },
    // 保存
    save() {
      this.mallLists = this.mallList.sort((obj1, obj2) => {
        const val1 = Number(obj1.locationNum);
        var val2 = Number(obj2.locationNum);
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(this.mallList);
      const data = {
        data: this.mallLists,
        sortNum: this.sortNum,
        type: 6,
        typeName: "商品模块",
        index: this.bannerIndex
        //  showSty:false,
      };
      this.$emit("setModule", data);
    },
    // 删除
    removeSll() {
      this.mallList = [];
      this.sortNum = null;
    },
    //录用sku添加商品
    AddSku() {
      this.dialogVisible = false;
      this.dialogVisibleSku = true;
    },
    handleCloseSku(done) {
      done();
    },
    handleClick(tab, event) {
      // 选择tab栏
      console.log(tab, event);
    },
    handleSelectionChange1(val) {
      // 选择商品

      this.multipleSelection1 = val;
      val.map(res => {
        this.selectData.push(res.id);
      });
    },
    add() {
      // 点击添加按钮
      let textNum = JSON.parse(JSON.stringify(this.textarea)).replace(
        /[(\r\n)\r\n]+/g,
        ","
      );
      let arr=textNum.split(",")
      if(arr.length>=201){
        this.open2("警告","亲，最多添加200个哦", "warning");
        return
      }
      let option = {
        page: 1,
        size: 999,
        skuList: textNum
      };
      console.log(this.textarea, textNum, "textarea===textarea");
      ProductList(option).then(res => {
        if (res.code == 0) {
          let data = res.data.data;
          if (data) {
            data.map(item => {
              item.coverPrice = (item.coverPrice / 100).toFixed(2);
              item.productPrice = (item.productPrice / 100).toFixed(2);
            });
          }
          this.tableData1 = data;
        }
      });
    },
    remove1() {
      // 点击移除
      console.log(this.selectData, "selectData===selectData");
      let data = JSON.parse(JSON.stringify(this.tableData1));
      let selectionData = [];
      for (let i = 0; i < this.multipleSelection1.length; i++) {
        for (let j = 0; j < data.length; j++) {
          let ioption = this.multipleSelection1[i];
          let joption = data[j];
          if (ioption.id == joption.id) {
            data.splice(j, 1);
            j--;
          }
        }
      }
      this.tableData1 = data;
    },
    empty(i) {
      if (i == 1) {
        this.textarea = "";
      } else {
        this.tableData1 = [];
      }
    },

    shelf() {
      this.multipleSelection1.forEach((i, d) => {
        i.coverPrice=Math.ceil(i.coverPrice*100)
        const data = {
          productName: i.productName,
          coverImg: i.coverImg,
          coverPrice: i.coverPrice,
          coverPriceStr:i.coverPriceStr,
          marketPrice:i.marketPrice,
          marketPriceStr:i.marketPriceStr,
          id: i.id,
          locationNum: i.locationNum,
          unionCode: i.unionCode
        };
        this.mallList.push(data);
        this.mallList = this.unipe(this.mallList);
      });
      this.dialogVisibleSku = false;
      console.log(this.mallList);
    },
    removeSku() {
      this.dialogVisibleSku = false;
    },
    // 根据unionCode sku去重
    unipe(arr) {
      const res = new Map();
  return arr.filter((a) => !res.has(a.unionCode) && res.set(a.unionCode, 1))

    },
     open2(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
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
  margin: 10px 0px;
}
.componentConfiguration_1 {
  color: #aaa;
  font-size: 12px;
}
.box_form {
  margin-left: 10px;
  width: 200px;
}
.box_sty {
  display: flex;
  align-items: center;
}
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.box_form {
  margin-left: 10px;
  width: 200px;
}
.transfer-sty {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.transfer-div {
  width: 48%;
  height: 600px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
}
.btn-sty {
  margin: 10px;
  float: right;
}
.transfer-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon-rights {
  background-color: #909399;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
}
.btn-shelf {
  margin: 10px;
}
</style>
