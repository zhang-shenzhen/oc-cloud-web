<template>
  <d2-container class="page">
    <h3 class="list-title">{{$t('commodity.goods.productList')}}</h3>
    <el-row>
      <el-col :span="6"
              :xs="24">
        <span>商品分类:</span>
        <el-cascader size="mini"
                     class="box_form"
                     clearable
                     v-model="ruleForm.categoryId"
                     :options="goodsCategor"></el-cascader>
      </el-col>
      <el-col :span="6"
              :xs="24">
        <span>商品名称:</span>
        <el-input class="box_form"
                  v-model="ruleForm.productName"
                  size="mini"
                  clearable
                  placeholder="商品名称"></el-input>
      </el-col>
      <el-col :span="6"
              :xs="24">
        <span>品牌名称:</span>
        <el-select class="box_form"
                   size="mini"
                   v-model="ruleForm.brandId"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in brandList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"
              :xs="24">
        <span>商品编号:</span>
        <el-input class="box_form"
                  v-model="ruleForm.sku"
                  size="mini"
                  clearable
                  placeholder="商品编号"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"
              :xs="24">
        <span>商品状态:</span>
        <el-select size="mini"
                   v-model="ruleForm.onShelf"
                   clearable
                   placeholder="请选择商品状态">
          <el-option label="上架"
                     value="1"></el-option>
          <el-option label="下架"
                     value="0"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6"
              :xs="24">
        <el-button type="primary"
                   size="mini"
                   @click="submitForm()">{{$t('query')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="clickExport()">{{$t('commodity.goods.excel')}}</el-button>
      </el-col>
    </el-row>
    <div class="caozuo">
      <el-button size="mini"
                 type="primary"
                 @click="addData(0,0)">{{$t('add')}}</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="bulkUnloading">批量上下架</el-button>
      <el-button size="mini"
                 type="primary"
                 style="float:right;"
                 @click="searchData()">SKU录入上下架</el-button>
    </div>

    <!-- tabMob列表 -->
    <div style="width:100%;margin-top:10px;">
      <el-table :data="tableData"
                max-height="550"
                style="width: 100%"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange">
        <el-table-column fixed
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column :label="$t('commodity.goods.itemCode')"
                         fixed
                         width="240">
          <template slot-scope="scope">
            <div class="box_sty">
              <img style="width:80px;height:80px;"
                   :src="$fileUrl() + scope.row.coverImg" />
              <div style="margin-left: 10px">{{ scope.row.unionCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="240"
                         :label="$t('coupons.name')">
          <template slot-scope="scope">{{ scope.row.productName }}</template>
        </el-table-column>
        <el-table-column label="商品价格"
                         width="100">
          <template slot-scope="scope">{{ scope.row.productPrice }}</template>
        </el-table-column>
        <el-table-column label="商品ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">{{ scope.row.stock }}</template>
        </el-table-column>
        <el-table-column :label="$t('commodity.goods.class')">
          <template slot-scope="scope">{{ scope.row.categoryName }}</template>
        </el-table-column>
        <el-table-column label="品牌名称">
          <template slot-scope="scope">{{ scope.row.brandName }}</template>
        </el-table-column>
        <el-table-column label="预售商品">
          <template slot-scope="scope">{{ saleType[scope.row.advanceSale] }}</template>
        </el-table-column>
        <el-table-column label="新品推荐"
                         width="100">
          <template slot-scope="scope">{{ scope.row.newProductRecommend ? $t('running.suspended1'):$t('running.suspended0') }}</template>
        </el-table-column>
        <el-table-column label="热门推荐"
                         width="100">
          <template slot-scope="scope">{{ scope.row.hotProductRecommend ? $t('running.suspended1'):$t('running.suspended0') }}</template>
        </el-table-column>
        <el-table-column :label="$t('commodity.goods.salesVolume')"
                         width="100">
          <template slot-scope="scope">{{ scope.row.salesVolume }}</template>
        </el-table-column>
        <el-table-column :label="$t('menu.sort')"
                         width="100">
          <template slot-scope="scope">{{ scope.row.sortNum }}</template>
        </el-table-column>
        <el-table-column :label="$t('wechat.menu.tab3')"
                         width="100">
          <template slot-scope="scope">{{ scope.row.onShelf =='1'?$t('shelf'):$t('obtained') }}</template>
        </el-table-column>
        <el-table-column width="200"
                         fixed="right"
                         show-overflow-tooltip
                         :label="$t('handle')">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleStatus(scope.$index, scope.row)">{{ scope.row.onShelf =='0'?$t('shelf'):$t('obtained') }}</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.$index, scope.row,1)">{{$t('edit')}}</el-button>
            <el-button size="mini"
                       type="text"
                       style="color:#F56C6C;"
                       @click="handleDelete(scope.$index, scope.row)">{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     :current-page="currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     @current-change="handleCurrentChange" />
    </div>

    <el-dialog title="批量上下架"
               width="30%"
               :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="批量上下架"
                      label-width="100px">
          <el-radio-group v-model="radioShelf">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="2">下架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="waresSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 筛选 -->
    <el-drawer :title="$t('screen')"
               :visible.sync="drawer"
               :direction="'rtl'"
               :before-close="handleClose">
      <div class="sea-div"
           :style="{height:windowheight - 130 +'px'}">
        <el-form :model="ruleForm"
                 size="mini"
                 ref="ruleForm"
                 label-width="140px"
                 class="demo-ruleForm">
          <el-form-item :label="$t('commodity.goods.class')">
            <el-cascader class="box_form"
                         v-model="ruleForm.categoryId"
                         :options="goodsCategor"></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('commodity.goods.specs')">
            <el-select size="mini"
                       @change="changGoods(2)"
                       @clear="clickclear(2)"
                       v-model="ruleForm.spec"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in ScreeningData"
                         :key="item"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('commodity.goods.specs1')">
            <el-select size="mini"
                       v-model="ruleForm.specChild"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in specChild"
                         :key="item"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('coupons.name')">
            <el-input class="wid_inp"
                      v-model="ruleForm.productName"
                      size="mini"
                      placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       @click="submitForm()">{{$t('query')}}</el-button>
            <el-button size="mini"
                       @click="resetForm()">{{$t('commodity.goods.empty')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </d2-container>
</template>
<script>
import { cookieGet } from "@/common/cookie";
import tableMobCopy from "@/components/GPMob/tableMobCopy";
import configUrl from "@/api/configUrl";
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
export default {
  components: { tableMobCopy },
  data () {
    return {
      ChannelId: "",
      channelTypeId: "",
      parentId: 0,
      radioShelf: 0,
      dialogFormVisible: false,
      goodsType: false,
      tableData: [],
      drawer: false,
      goodsCategor: [],
      goodsCategorItem: [],
      ScreeningData: [],
      specChild: [],
      commodityList: [],
      pageGoods: 1, // 记录当前是第几页
      currentPage: 1,
      total: 0,
      ruleForm: {
        categoryId: "",
        spec: "",
        sku: '',
        onShelf: '',
        specChild: "",
        productName: ""
      },
      brandList: [],
      multipleSelection: [],
      multipleSelectionobj: {},
      windowheight: document.body.clientHeight
    };
  },
  computed: {},
  created () {
    this.commodityClassificationInterface(this.parentId);
    this.specificationsScreeningInterface();
    this.itemListInterface(1);
    this.ChannelId = JSON.parse(cookieGet("Httpheader")).ChannelId;
    this.channelTypeId = JSON.parse(cookieGet("Httpheader"))["X-Channel-Type"];
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    // 获取商品分类接口
    commodityClassificationInterface (parentId) {
      ItemCategoryList({
        parentId: 0,
        type: 1,
        page: 1,
        size: 500
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          if (data.data) {
            this.echoList(data.data);
          }
        }
      });
    },
    echoList (data) {
      if (!data) { return; }
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
    // 规格筛选接口
    specificationsScreeningInterface () {
      SpecificationGoods().then(res => {
        if (res.code == 0) {
          this.ScreeningData = res.data;
        }
      });
    },
    // 子规格筛选接口
    childSpecificationsInterface (spec) {
      ChildSpecifications({
        spec: spec
      }).then(res => {
        if (res.code == 0) {
          this.specChild = res.data;
        }
      });
    },
    changGoods (e) {
      // 点击选择了商品分类获取商品子分类
      this.specChild = [];
      this.ruleForm.specChild = "";
      this.childSpecificationsInterface(this.ruleForm.spec);
    },

    // 品牌分类接口
    brandClassificationInterface () {
      ItemCategoryList({
        parentId: 0,
        type: 3,
        page: 1,
        size: 500
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          if (data.data) {
            this.brandList = this.getBrandList(data.data, []);
          }
        }
      });
    },
    getBrandList: function (list, pushArray) {
      list.map(val => {
        pushArray.push({
          name: val.categoryName,
          id: val.id,
          imgUrl: val.imgUrl
        })
        if (val.productCategoryList) {
          this.getBrandList(val.productCategoryList, pushArray)
        }
      })
      return pushArray;
    },
    clickclear (e) {
      // 点击筛选里的商品分类清空
      this.specChild = [];
      this.ruleForm.specChild = "";
    },
    addData (id, type) {
      // 点击添加商品
      this.$router.push({
        name: "commodity-goods-new-products", // 路径
        query: { id: id, type: type } // 参数
      });
    },
    searchData () {
      // 点击批量筛选按钮
      this.$router.push({
        name: "commodity-goods-onShelf", // 路径
      });
    },

    handleClose () {
      // 点击筛选取消
      this.ruleForm = {
        categoryId: "",
        spec: "",
        specChild: "",
        productName: ""
      };
      this.drawer = false;
    },
    clickExport () {
      // 点击导出
      let obj = {
        "categoryId=": this.ruleForm.categoryId[2] ? this.ruleForm.categoryId[2] : null,
        "unionCode=": this.ruleForm.sku,
        "productName=": this.ruleForm.productName,
        "onShelf=": this.ruleForm.onShelf
      }
      let num = 0
      let str
      let windowOpen;
      for (let i in obj) {
        if (obj[i]) {
          num += 1;
          str += '&' + i + obj[i]
        }
      }
      if (num == 0) {
        windowOpen = configUrl.ajax_url + "product/retail/excel?channelTypeId=" + this.channelTypeId + "&channelId=" +
          this.ChannelId;
      } else {
        windowOpen = configUrl.ajax_url + "product/retail/excel?channelTypeId=" + this.channelTypeId + "&channelId=" +
          this.ChannelId + str
      }
      window.open(windowOpen);
    },
    submitForm () {
      // 点击筛选查询
      this.itemListInterface(1);
      this.drawer = false;
    },
    resetForm () {
      // 点击筛选重置
      this.ruleForm = {
        categoryId: "",
        spec: "",
        specChild: "",
        productName: ""
      };
    },
    handleCurrentChange (e) {
      // 点击分页
      this.pageGoods = e;
      this.itemListInterface(e);
    },
    handleEdit (index, row, type) {
      // 编辑
      this.$router.push({
        name: "commodity-goods-new-products", // 路径
        query: { id: row.id, type: type } // 参数
      });
    },
    handleDelete (index, row) {
      // 删除
      this.$confirm("确定删除此条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          GoodsDel({
            id: row.id
          }).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: this.$t("schedule.statusLog1"),
                message: this.$t("commodity.sort.delete"),
                type: "success"
              });
              this.itemListInterface(1);
            } else {
              this.$notify({
                title: this.$t("member.filter.warning"),
                message: res.message,
                type: "warning"
              });
            }
          });
        })
        .catch(() => { });
    },

    handleStatus (index, row) {
      // 状态 
      // row.onShelf = 0 为下架
      // row.onShelf = 1 为上架
      let status;
      let onShelf = row.onShelf;
      let shelfTitle = row.onShelf == 0 ? '上架' : '下架'
      let id = row.id;
      onShelf == 1 ? (status = 0) : (status = 1);
      this.$confirm("是否" + shelfTitle + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          GoodsOnShelf({
            id: id,
            onShelf: status
          }).then(res => {
            this.itemListInterface(1);
          });
        })
        .catch(() => { });
    },
    bulkUnloading () {
      // 点击批量上下架
      this.radioShelf = 0;
      this.dialogFormVisible = true;
    },
    handleSelectionChange (val) {
      // 选择商品批量上下架
      this.multipleSelectionobj[this.pageGoods.toString()] = [];
      // this.multipleSelection = val;
      if (val.length > 0) {
        val.map(item => {
          this.multipleSelectionobj[this.pageGoods.toString()].push({
            id: item.id,
            name: item.productName
          });
        })
      }
    },
    itemListInterface (page) {
      // 商品列表接口
      let that = this;
      QueryProduct({
        page: page,
        size: 10,
        unionCode: that.ruleForm.sku, // 商品编号
        onShelf: that.ruleForm.onShelf, // 商品状态
        productName: that.ruleForm.productName, // 商品名称
        categoryId: that.ruleForm.categoryId[2] ? that.ruleForm.categoryId[2] : '', // 商品分类
        // spec: that.ruleForm.spec,
        // specChild: that.ruleForm.specChild
      }).then(res => {
        if (res.code == 0) {
          let data = res.data.data;
          if (data) {
            data.map(item => {
              // res.extrat = [];
              // res.specArray = [];
              // res.spec = [];
              item.coverPrice = (item.coverPrice / 100).toFixed(2);
              // if (res.productRetailSkuList.length != 0) {
              // 用来拆分获取到商品的规格
              // res.sku = res.productRetailSkuList[0].sku;
              // res.skuImage = res.productRetailSkuList[0].skuImage;
              // res.productNum = res.productRetailSkuList[0].productNum;
              item.productPrice = ((item.productPrice) / 100).toFixed(2);
              // item.extrat = JSON.parse(item.productRetailSkuList[0].extraInfo);
              // if (res.extrat) {
              //   res.specArray = res.extrat.spec.split(",");
              //   res.specArray.forEach(item => {
              //     res.spec.push(item.split(":")[1]);
              //   });
              //   res.spec = res.spec.join("--");
              // }
              // }
            });
            that.tableData = data;
            if (!this.multipleSelectionobj.hasOwnProperty(page)) { // 没有的时候创建(第一次进入)
              this.multipleSelectionobj[page.toString()] = [];
            } else if (this.multipleSelectionobj.hasOwnProperty(page)) { // 我已经有这个对象且这一页有已经选中的对象
              this.echoSelection();
            }
          } else {
            that.tableData = [];
          }
          that.currentPage = res.data.page;
          that.total = res.data.total;
        }
      });
    },
    // 回显商品数据
    echoSelection () {
      let that = this;
      let array = this.multipleSelectionobj[this.pageGoods.toString()] || []
      setTimeout(() => {
        that.tableData.map((item, index) => {
          array.map(val => {
            if (item.id === val.id) {
              this.$refs.multipleTable.toggleRowSelection(item, true);
            }
          })
        })
      }, 300)
    },
    waresSure () {
      // 点击上下确认按钮
      this.commodityList = [];
      if (!this.radioShelf) {
        this.$notify.error({
          title: '错误',
          message: '请选择上下架'
        });
        return;
      }
      this.commodityObj = JSON.parse(JSON.stringify(this.multipleSelectionobj));
      for (let k in this.commodityObj) {
        this.commodityObj[k].map(res => {
          this.commodityList.push(res.id)
        })
      }
      let option = JSON.parse(JSON.stringify(this.commodityList))
      UpDownBulk({
        idList: option,
        onShelf: this.radioShelf == 1 ? 1 : 0
      }).then(res => {
        if (res.code == 0) {
          this.multipleSelectionobj = {}
          this.dialogFormVisible = false;
          this.itemListInterface(1);
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }

      });

    },
  }
};
</script>
<style lang="scss" scoped>
.el-row,
.el-col {
  &:first-child {
    margin-top: 0px;
  }
  margin-bottom: 20px;
}
.wid_inp {
  width: 44%;
}
.box_sty {
  display: flex;
  align-items: center;
}
.box_form {
  margin-left: 10px;
  width: 200px;
}
</style>

