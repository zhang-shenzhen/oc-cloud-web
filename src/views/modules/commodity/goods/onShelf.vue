<template>
  <d2-container class="page">
    <h3 class="list-title">批量上下架</h3>
    <div class="transfer-sty">
      <div class="transfer-div">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="SKU ID录入"
                       name="1">
            <el-input type="textarea"
                      :autosize="{ minRows: 22, maxRows: 8}"
                      placeholder="请输入内容"
                      v-model="textarea">
            </el-input>
            <div>

            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="从商品池添加"
                       name="2">
            <el-row>
              <el-col :span="12"
                      :xs="24">
                <span>商品分类:</span>
                <el-cascader size="mini"
                             class="box_form"
                             clearable
                             v-model="ruleForm.categoryId"
                             :options="goodsCategor"></el-cascader>
              </el-col>
              <el-col :span="12"
                      :xs="24">
                <span>商品名称:</span>
                <el-input class="box_form"
                          v-model="ruleForm.productName"
                          size="mini"
                          clearable
                          placeholder="商品名称"></el-input>
              </el-col>
              <el-col :span="12"
                      :xs="24">
                <span>商品编号:</span>
                <el-input class="box_form"
                          v-model="ruleForm.sku"
                          size="mini"
                          clearable
                          placeholder="商品编号"></el-input>
              </el-col>
              <el-col :span="12"
                      :xs="24">
                <span>商品状态:</span>
                <el-select size="mini"
                           class="box_form"
                           v-model="ruleForm.onShelf"
                           clearable
                           placeholder="请选择商品状态">
                  <el-option label="上架"
                             value="1"></el-option>
                  <el-option label="下架"
                             value="0"></el-option>
                </el-select>
              </el-col>
            </el-row>

            <div style="width:100%; margin-top:10px;">
              <el-table ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        max-height="323px"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange">
                <el-table-column fixed
                                 type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column fixed
                                 label="图片"
                                 width="120">
                  <template slot-scope="scope">
                    <img style="width:50px;height:50px;"
                         :src="$fileUrl() + scope.row.coverImg" />
                  </template>
                </el-table-column>
                <el-table-column fixed
                                 label="商品编号"
                                 width="120">
                  <template slot-scope="scope">{{ scope.row.unionCode }}</template>
                </el-table-column>
                <el-table-column label="商品名"
                                 width="180">
                  <template slot-scope="scope">{{ scope.row.productName }}</template>
                </el-table-column>
                <el-table-column label="价格"
                                 width="80">
                  <template slot-scope="scope">{{ scope.row.productPrice }}</template>
                </el-table-column>
                <el-table-column label="库存"
                                 width="80">
                  <template slot-scope="scope">{{ scope.row.stock }}</template>
                </el-table-column>
                <el-table-column label="商品分类"
                                 width="120">
                  <template slot-scope="scope">{{ scope.row.categoryName }}</template>
                </el-table-column>
                <el-table-column label="状态"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.onShelf =='1'?$t('shelf'):$t('obtained') }}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination background
                             :current-page="currentPage"
                             layout="total, prev, pager, next, jumper"
                             :total="total"
                             @current-change="handleCurrentChange" />
            </div>
          </el-tab-pane> -->
        </el-tabs>
        <div class="btn-sty">
          <el-button size="mini"
                     @click="empty(1)">清 空</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="add">添 加</el-button>
        </div>
      </div>
      <div>
        <i class="el-icon-arrow-right icon-rights"></i>
      </div>
      <div class="transfer-div">
        <div class="transfer-title">
          <div class="title-div">已添加的商品</div>
          <div class="btn-sty">
            <el-button size="mini"
                       @click="remove">移 除</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="empty(2)">清 空</el-button>
          </div>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  max-height="500px"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column fixed
                           type="selection"
                           width="55">
          </el-table-column>
          <el-table-column fixed
                           label="图片"
                           width="120">
            <template slot-scope="scope">
              <img style="width:50px;height:50px;"
                   :src="$fileUrl() + scope.row.coverImg" />
            </template>
          </el-table-column>
          <el-table-column fixed
                           label="商品编号"
                           width="120">
            <template slot-scope="scope">{{ scope.row.unionCode }}</template>
          </el-table-column>
          <el-table-column label="商品名"
                           width="180">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="价格"
                           width="80">
            <template slot-scope="scope">{{ scope.row.productPrice }}</template>
          </el-table-column>
          <el-table-column label="库存"
                           width="80">
            <template slot-scope="scope">{{ scope.row.stock }}</template>
          </el-table-column>
          <el-table-column label="商品分类"
                           width="120">
            <template slot-scope="scope">{{ scope.row.categoryName }}</template>
          </el-table-column>
          <el-table-column label="状态"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.onShelf =='1'?$t('shelf'):$t('obtained') }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="btn-shelf">
      <el-button size="mini"
                 @click="shelf(0)">下 架</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="shelf(1)">上 架</el-button>
    </div>
  </d2-container>
</template>
<script>
import {
  ItemCategoryList,
  ProductList,
  QueryProduct,
  UpDownBulk,
} from "@/api/commodity/goods";
import configUrl from '../../../../api/configUrl';
export default {
  name: '',
  components: {},
  data () {
    return {
      parentId: 0,
      activeName: '1',
      textarea: '',
      goodsCategor: [],
      tableData: [],
      multipleSelection: [],
      selectData: [],
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

    }
  },
  computed: {},
  created () {
    this.commodityClassificationInterface(this.parentId);
    // this.itemListInterface(1);
  },
  mounted () {

  },
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
    handleClick (tab, event) {
      // 选择tab栏
      console.log(tab, event);
    },
    handleSelectionChange (val) {
      // 选择商品
      console.log(val, 'val==val')
      this.multipleSelection = val;
      val.map(res => {
        this.selectData.push(res.id)
      })
    },
    add () {
      // 点击添加按钮
      let textNum = JSON.parse(JSON.stringify(this.textarea)).replace(/[(\r\n)\r\n]+/g, ',');
      let option = {
        page: 1,
        size: 999,
        skuList: textNum
      }
      console.log(this.textarea, textNum, 'textarea===textarea');
      ProductList(option).then(res => {
        console.log(res, '点击添加按钮')
        if (res.code == 0) {
          let data = res.data.data;
          if (data) {
            data.map(item => {
              item.coverPrice = (item.coverPrice / 100).toFixed(2);
              item.productPrice = ((item.productPrice) / 100).toFixed(2);
            });
          }
          this.tableData = data;
        }
      })
    },
    remove () {
      // 点击移除
      console.log(this.selectData, 'selectData===selectData')
      let data = JSON.parse(JSON.stringify(this.tableData))
      let selectionData = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        for (let j = 0; j < data.length; j++) {
          let ioption = this.multipleSelection[i];
          let joption = data[j];
          if (ioption.id == joption.id) {
            data.splice(j, 1)
            j--;
          }
        }
      }
      this.tableData = data;
      console.log(data, this.tableData, 'data===data')

    },
    empty (i) {
      if (i == 1) {
        this.textarea = ''
      } else {
        this.tableData = [];
      }

    },
    itemListInterface (page) {
      // 商品列表接口
      let that = this;
      // that.multipleSelection = [];
      QueryProduct({
        page: page,
        size: 10,
        sku: that.ruleForm.sku, // 商品编号
        onShelf: that.ruleForm.onShelf, // 商品状态
        productName: that.ruleForm.productName, // 商品名称
        categoryId: that.ruleForm.categoryId[2] ? that.ruleForm.categoryId[2] : '', // 商品分类
      }).then(res => {
        if (res.code == 0) {
          let data = res.data.data;
          if (data) {
            console.log(data, '商品列表接口参数')
            data.map(item => {
              item.coverPrice = (item.coverPrice / 100).toFixed(2);
              item.productPrice = ((item.productPrice) / 100).toFixed(2);

            });
            that.tableData = data;
          } else {
            that.tableData = [];
          }
          that.total = res.data.total;
        }
      });
    },
    handleCurrentChange (e) {
      // 点击分页
      this.itemListInterface(e);
    },
    shelf (i) {
      // 点击下架
      let data = JSON.parse(JSON.stringify(this.tableData))
      let arraydata = [];
      data.map(res => {
        arraydata.push(res.id)
      })
      UpDownBulk({
        idList: arraydata,
        onShelf: i
      }).then(res => {
        if (res.code == 0) {
          this.multipleSelectionobj = {}
          this.dialogFormVisible = false;
          this.$router.go(-1);//返回上一层
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }

      });
    },

  }
}
</script>
<style lang="scss" scoped>
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
  float: right;
  margin: 10px;
}
</style>

