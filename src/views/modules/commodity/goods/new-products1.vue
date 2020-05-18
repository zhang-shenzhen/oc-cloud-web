<template>
  <d2-container class="page">
    <h3 class="list-title">{{titleName}}</h3>
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             size="mini"
             label-width="180px"
             class="demo-ruleForm">
      <el-form-item class="box_form"
                    required
                    label="商品规格"
                    prop="specType">
        <el-radio-group v-model="ruleForm.specType"
                        @change="selectSpecs">
          <el-radio :label="1">单规格商品</el-radio>
          <el-radio :label="2">多规格商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="box_form"
                    required
                    :label="$t('coupons.name')"
                    prop="productName">
        <el-input class="box_form"
                  v-model="ruleForm.productName"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    required
                    label="商品编码"
                    prop="unionCode">
        <el-input class="box_form"
                  v-model="ruleForm.unionCode"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    required
                    :label="$t('commodity.goods.class')"
                    prop="categoryRemark">
        <el-cascader class="box_form"
                     v-model="ruleForm.categoryRemark"
                     :options="goodsdate">
          <template slot-scope="{ node, data }">
            <div @click="clickcategoryId(data)">{{ data.label }}</div>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item class="box_form"
                    label="品牌分类">
        <el-select class="box_form"
                   v-model="ruleForm.brandId"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in brandList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.productBrief')">
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="ruleForm.productIntroduction"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.commodityDescription')">
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="ruleForm.explainInfo"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.specType == 2"
                    class="box_form"
                    required
                    :label="$t('commodity.goods.costPrice')"
                    prop="marketPrice">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="ruleForm.marketPrice"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.specType == 2"
                    class="box_form"
                    required
                    :label="$t('commodity.goods.coverPrice')"
                    prop="coverPrice">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="ruleForm.coverPrice"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    required
                    v-if="ruleForm.specType == 1"
                    label="唯一编号(SKU)">
        <el-input class="box_form"
                  v-model="singleSpecificationAddition[0].list[0].skuNum"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    required
                    label="售价">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].price"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="原价">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].const"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="重量(KG)">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].weightStr"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    required
                    label="库存">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].total"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="门店库存">
        <el-button type="primary"
                   @click="editStore(-10,1)">添加门店库存</el-button>
      </el-form-item>
      <el-form-item v-if="ruleForm.specType == 2">
        <div class="box_form_guige">
          <div style="color:#999;font-size:14px;">{{$t('commodity.goods.specifications')}}</div>
          <!-- 添加规格↓ -->
          <div class="spec_div"
               v-for="(item,index) in goodsAdd"
               :key="index">
            <div class="box_spec">
              <el-tag class="spec_sty"
                      type="success">{{item.spec}}</el-tag>
              <el-button size="mini"
                         type="primary"
                         round
                         @click="addSpecifications(index)">编辑</el-button>
              <el-button size="mini"
                         type="success"
                         round
                         @click="addingSubspecifications(index)">添加子规格</el-button>
              <el-button size="mini"
                         type="danger"
                         round
                         @click="deleteSpecification('parent',index)">删除</el-button>
            </div>
            <div class="box_specs_bot">
              <div class="box_specs_bot_sty"
                   v-for="(initem,i) in item.specChild"
                   :key="i">
                <el-tag closable
                        :disable-transitions="false"
                        @close="deleteSpecification(index,i)">{{initem}}</el-tag>
              </div>
            </div>
          </div>
          <el-button v-if="goodsAdd.length < 2"
                     type="primary"
                     :plain="true"
                     @click="addSpecifications(-9)">{{$t('commodity.goods.specs2')}}</el-button>
          <!-- 添加规格↑ -->
          <!-- 添加规格后生成的表格↓ -->
          <div class="spec_table"
               v-if="goodsSpecification">
            <el-table :data="specificationList[0].list"
                      style="width: 100%"
                      max-height="500">
              <el-table-column v-for="(item,index) in specificationList[0].nameTab"
                               :key="index"
                               :label="item.name">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.specifications[index].split(":")[1] }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('coupons.image')">
                <template slot-scope="scope">
                  <div v-if="scope.row.photoList">
                    <img style="width:80px;height:80px;"
                         :src="$fileUrl() + scope.row.photoList" />
                  </div>
                  <div v-if="!scope.row.photoList">
                    <el-button type="primary"
                               @click="clickuloadImg(scope.$index,scope.row)">
                      <i class="el-icon-upload"></i>
                      {{$t('commodity.goods.uploadPhoto')}}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('commodity.goods.uniqueID')">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容"
                            v-model="scope.row.skuNum"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('coupons.sku')">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容"
                            type="number"
                            min="0"
                            v-model="scope.row.total"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('commodity.goods.unitPrice')">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容"
                            type="number"
                            min="0"
                            v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('commodity.goods.costPrice')">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容"
                            type="number"
                            min="0"
                            v-model="scope.row.const"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('commodity.goods.weight')">
                <template slot-scope="scope">
                  <el-input placeholder="请输入重量(KG)"
                            type="number"
                            min="0"
                            v-model="scope.row.weightStr"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="门店库存">
                <template slot-scope="scope">
                  <el-button type="primary"
                             @click="editStore(scope.$index,scope.row)">添加门店库存</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 添加规格后生成的表格↑ -->
        </div>
      </el-form-item>
      <el-form-item class="box_form"
                    :label="$t('commodity.sort.forder')">
        <el-input class="box_form"
                  v-model="ruleForm.sortNum"
                  autocomplete="off"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item class="box_form"
                    :label="$t('coupons.coverPhoto')"
                    prop="coverImg">
        <el-alert class="alert-sty"
                  size="mini"
                  title="建议上传图片宽度:370像素;高度:370像素"
                  type="info"
                  :closable="false">
        </el-alert>
        <div class="img_show"
             v-if="ruleForm.coverImg">
          <div class="img_show_del"
               @click="delImg(-1,1)">
            <i class="el-icon-delete"></i>
          </div>
          <img style="width:100%;height:100%;"
               :src="$fileUrl() + ruleForm.coverImg" />
        </div>
        <div v-if="!ruleForm.coverImg">
          <div class="upload_img"
               @click="clickuloadImg(999,999)">
            <i class="el-icon-plus logoIcon" />
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('commodity.goods.orderForm')"
                    prop="orderImg">
        <el-alert class="alert-sty box_form"
                  size="mini"
                  title="建议上传图片宽度:370像素;高度:370像素"
                  type="info"
                  :closable="false">
        </el-alert>
        <div class="orderImg_box">
          <div style="display:flex;margin-bottom:10px;"
               v-if="ruleForm.orderImg">
            <div class="img_show">
              <div class="img_show_del"
                   @click="delImg(index,2)">
                <i class="el-icon-delete"></i>
              </div>
              <img style="width:100%;height:100%;"
                   :src="$fileUrl() + ruleForm.orderImg" />
            </div>
          </div>

          <div class="img_upload"
               v-if="!ruleForm.orderImg">
            <div class="upload_img"
                 @click="clickuloadImg(888,888)">
              <i class="el-icon-plus logoIcon" />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('commodity.goods.banner1')"
                    prop="productBanner">
        <el-alert class="alert-sty box_form"
                  size="mini"
                  title="建议上传图片宽度:845像素;高度:845像素"
                  type="info"
                  :closable="false">
        </el-alert>
        <div class="orderImg_box">
          <div style="display:flex;flex-wrap:wrap;margin-bottom:10px;"
               v-if="ruleForm.productBanner.length != 0">
            <div class="img_show"
                 v-for="(item,index) in ruleForm.productBanner"
                 :key="index">
              <div class="img_show_del"
                   @click="delImg(index,3)">
                <i class="el-icon-delete"></i>
              </div>
              <img style="width:100%;height:100%;"
                   :src="$fileUrl() + item" />
            </div>
          </div>
          <div class="img_upload"
               v-if="ruleForm.productBanner">
            <div class="upload_img"
                 @click="clickuloadImg(666,666)">
              <i class="el-icon-plus logoIcon" />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.details')">
        <Tinymce v-model="ruleForm.detail"
                 :height="200" />
      </el-form-item>
      <el-form-item class="box_form"
                    label="热门推荐">
        <el-radio-group v-model="ruleForm.hotProductRecommend">
          <el-radio :label="1">{{$t('running.suspended1')}}</el-radio>
          <el-radio :label="0">{{$t('running.suspended0')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="box_form"
                    label="新品推荐">
        <el-radio-group v-model="ruleForm.newProductRecommend">
          <el-radio :label="1">{{$t('running.suspended1')}}</el-radio>
          <el-radio :label="0">{{$t('running.suspended0')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="width:80%"
                    :label="$t('commodity.goods.grounding')">
        <el-switch style="display: block"
                   v-model="ruleForm.onShelf"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   :active-text="$t('open')"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">{{$t('commodity.goods.submitTo')}}</el-button>
        <el-button @click="resetForm()">{{$t('wechat.menu.btn4')}}</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加规格弹框 -->
    <el-dialog :title="$t('commodity.goods.specs3')"
               width="25%"
               :visible.sync="dialogVisible">
      <el-form :model="form"
               size="mini">
        <el-form-item :label="$t('commodity.goods.formName')"
                      label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="SpecificationsStore()">{{$t('confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加子规格弹框 -->
    <el-dialog :title="$t('commodity.goods.addChild')"
               width="25%"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               size="mini">
        <el-form-item :label="$t('commodity.goods.childName')"
                      label-width="100px">
          <el-input v-model="form.specTitle"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="mini"
                   @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="SubstandardStore()">{{$t('confirm')}}</el-button>
      </div>
    </el-dialog>
    <editorImage ref="muchild"
                 :quanTity="quanTity"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
    <el-dialog :title="$t('commodity.goods.storeNum')"
               :visible.sync="storeFormVisible">
      <div class="store-form">
        <div class="store-item"
             v-for="(item,index) in storesListData"
             :key="index">
          <div class="store-item-title">{{item.storeName}}</div>
          <el-input style="width:50%"
                    type="number"
                    min="0"
                    v-model="item.stock"
                    placeholder="请输入内容"
                    size="mini"
                    clearable></el-input>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   @click="storeSure()">{{$t('confirm')}}</el-button>
        <el-button size="mini"
                   @click="storeFormVisible = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import SKU from "@/components/goods/SKU";
import editorImage from "@/components/Tinymce/components/editorImage";
import Tinymce from "@/components/Tinymce";
import SpecificationData from "@/components/specification";
import { cookieGet } from "@/common/cookie";
import {
  ItemCategoryList,
  NewProducts,
  ProductsId,
  ItemAdd,
  ListStores
} from "@/api/commodity/goods";
export default {
  components: { SKU, editorImage, Tinymce, SpecificationData },
  data () {
    return {
      quanTity: 1,
      goodsdate: [],
      productCategoryList: [],
      indexImg: 0,
      type: 0,
      titleName: "商品",
      ruleForm: {
        brandId: '',
        brandName: '',
        specType: 1, // 1为单规格2为多规格
        loading: true,
        productName: "", // 商品名称
        unionCode: "",
        productEnglishName: "", // 商品英文名(现为空)
        productImage: "", // 商品图片(暂无)
        productPrice: "", // 商品价格(拿的是封面价格)
        brandName: "", // 品牌名称(暂无)
        keywordTips: "", // 关键字提示信息(暂无)
        categoryName: "", // 分类名称
        categoryId: "", // 分类id
        categoryRemark: [],
        productSimplifyName: "", // 商品简称(暂无)
        productIntroduction: "", // 商品简介
        explainInfo: "", // 商品说明
        recommend: "0", // 是否首页推荐
        newProductRecommend: 0,//是否新品推荐
        hotProductRecommend: 0,//是否热门推荐
        marketPrice: "", // 市场价格
        marketPriceStr: "", // 市场价格字符串(暂无)
        coverPrice: "", // 封面价格
        coverPriceStr: "", // 封面价格字符串(暂无)
        sortNum: "", // 排序
        coverImg: "", // 封面图片
        orderImg: '', // 订单图片
        productBanner: [], // banner图片
        detail: "", // 商品详情
        productType: 1, // 商品类型 (1.商品2.礼品)
        onShelf: false, // false为1 true为2 是否上架
        extraInfo: "", // 拓展信息字段(用于放SKU回显用)
        productRetailSpecList: [], // 商品规格及子规格信息 goodsAdd放置处
        productRetailSkuList: [], // KSU
      },
      rules: {
        specType: [{ required: true, message: '请选择商品规格', trigger: 'change' }],
        productName: [
          {
            required: true,
            message: this.$t("commodity.goods.importName"),
            trigger: "blur"
          }
        ],
        unionCode: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
        categoryRemark: [
          {
            required: true,
            message: this.$t("commodity.goods.selectProduct"),
            trigger: "change"
          }
        ],
        marketPrice: [
          {
            required: true,
            message: this.$t("commodity.goods.marketPrice1"),
            trigger: "blur"
          }
        ],
        coverPrice: [
          {
            required: true,
            message: this.$t("commodity.goods.coverPrice1"),
            trigger: "blur"
          }
        ],
        coverImg: [
          {
            required: true,
            message: this.$t("commodity.goods.coverPhoto1"),
            trigger: "change"
          }
        ],
        orderImg: [
          {
            required: true,
            message: this.$t("commodity.goods.orderForm1"),
            trigger: "change"
          }
        ],
        productBanner: [
          {
            type: "array",
            required: true,
            message: this.$t("commodity.goods.banner2"),
            trigger: "change"
          }
        ]
      },
      form: {
        name: "",
        specTitle: ""
      },
      options: [],
      brandList: [],
      brandOptions: [], // 品牌分类
      dialogVisible: false,
      dialogFormVisible: false,
      goodsSpecification: false,
      storeFormVisible: false,
      specNum: 0,
      goodsAdd: [], // 多规格时放置处
      oneSpecs: [{ // 单规格默认值
        spec: 'spec',
        specChild: ['specSub']
      }],
      editingId: 0,
      SubstandardId: 0,
      ParameterComparison: [],
      singleSpecificationAddition: [{ // 单规格sku放置处
        list: [{
          skuNum: '',
          total: '',
          price: '',
          const: '',
          photoList: '',
          skuStoreStockList: [],
          specifications: ['spec:specSub'],
          weightStr: '',
        }],
        nameTab: ['spec']
      }],
      specificationList: [], // 多规格生成的sku放置处
      actualGrouping: [],
      storesListData: [],
      storeOriginal: []
    };
  },
  computed: {},
  created () {
    this.type = this.$route.query.type;
    const channelId = JSON.parse(cookieGet("Httpheader")).ChannelId;
    this.itemCategoryListInterface();
    this.brandClassificationInterface();
    if (this.type == 0) {
      // 新增
      this.titleName = this.$t("commodity.goods.newProducts");
    } else {
      // 编辑
      this.titleName = this.$t("commodity.goods.editedGoods");
      this.commodityDetailsInterface(this.$route.query.id);
    }
    this.ListStoresInterface(channelId);
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    // 门店列表接口
    ListStoresInterface (channelId) {
      let that = this;
      that.storeOriginal = [];
      that.storesListData = [];
      ListStores({
        page: 1,
        size: 120,
        wechatId: channelId
      }).then(res => {
        if (res.code == 0) {
          let stortList = res.data.data;
          stortList.map(res => {
            that.storeOriginal.push({
              storeId: res.id,
              storeName: res.name,
              stock: ""
            });
          });
          that.storesListData = JSON.parse(JSON.stringify(that.storeOriginal));
        }
      });
    },
    editStore (index, item) {
      // 点击添加门店库存 第index个item
      this.specNum = index; // 记录是第几个商品  
      this.storeFormVisible = true;
      this.storesListData = JSON.parse(JSON.stringify(this.storeOriginal));
      if (index == -10) {
        let skuStoreStock = this.singleSpecificationAddition[0].list[0].skuStoreStockList
        if (skuStoreStock || skuStoreStock.length != 0) {
          this.storesListData.map(res => {
            skuStoreStock.map(itm => {
              if (res.storeId == itm.storeId && itm.stock) {
                res.stock = itm.stock;
              }
            })
          })
        }

      } else {
        if (item.skuStoreStockList || item.skuStoreStockList.length != 0) {
          this.storesListData.map(res => {
            // 每次点击显示弹框的时候,如果这条数据已经有过添加了,那么你就把数值赋给它
            item.skuStoreStockList.map(itm => {
              if (res.storeId == itm.storeId && itm.stock) {
                res.stock = itm.stock;
              }
            });
          });
        }
      }
    },
    storeSure () {
      // 点击门店弹框确认按钮
      let storeData = [];
      let storeList = JSON.parse(JSON.stringify(this.storesListData));
      storeList.map(res => {
        if (res.stock) {
          storeData.push(res);
        }
      });
      if (this.specNum == -10) {
        this.singleSpecificationAddition[0].list[0].skuStoreStockList = storeData;
      } else {
        this.specificationList[0].list[this.specNum].skuStoreStockList = storeData;
      }
      this.storeFormVisible = false;
    },

    selectSpecs () {
      // 点击选择商品规格
      if (this.ruleForm.specType == 1) { // 单规格的时候默认传参数样式
      } else {
      }
      console.log('显示', this.ruleForm.specType)
    },

    // 商品详情接口
    commodityDetailsInterface (id) {
      ProductsId({
        id: id
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          data.marketPrice = (data.marketPrice / 100).toFixed(2);
          data.coverPrice = (data.coverPrice / 100).toFixed(2);
          data.productPrice = (data.productPrice / 100).toFixed(2);
          this.ruleForm = {
            brandId: data.brandId,
            brandName: data.brandName,
            specType: data.specType,
            id: data.id,
            loading: true,
            productName: data.productName,
            unionCode: data.unionCode,
            productEnglishName: '', // 商品英文名(现为空)
            productImage: '', // 商品图片(暂无)
            productPrice: data.productPrice, // 商品价格(拿的是封面价格)
            brandName: '', // 品牌名称(暂无)
            keywordTips: '', // 关键字提示信息(暂无)
            categoryName: data.categoryName, // 分类名称
            categoryId: data.categoryId,
            categoryRemark: JSON.parse(data.categoryRemark),
            productSimplifyName: '', // 商品简称(暂无)
            productIntroduction: data.productIntroduction,
            explainInfo: data.explainInfo, // 商品说明
            recommend: data.recommend + '', // 是否首页推荐
            newProductRecommend: data.newProductRecommend == false ? 0 : 1,//是否新品推荐
            hotProductRecommend: data.hotProductRecommend == false ? 0 : 1,//是否热门推荐
            marketPrice: data.marketPrice, // 市场价格
            marketPriceStr: '', // 市场价格字符串(暂无)
            coverPrice: data.coverPrice, // 封面价格
            coverPriceStr: '', // 封面价格字符串(暂无)
            sortNum: data.sortNum, // 排序
            coverImg: data.coverImg, // 封面图片
            orderImg: data.orderImg, // 订单图片
            productBanner: data.productBanner.split(","), // banner图片
            detail: data.detail.replace(/..\/..\/storage\//g, this.$fileUrl()), // 商品详情
            productType: 1, // 商品类型 (1.商品2.礼品)
            onShelf: data.onShelf == 0 ? false : true, // false为1 true为2 是否上架
            extraInfo: '', // 拓展信息字段(用于放SKU回显用)
            productRetailSpecList: [], // 商品规格及子规格信息 goodsAdd放置处
            productRetailSkuList: [], // SKU
          };
          this.productRetailSkuList(data.productRetailSpecList, data.productRetailSkuList, data.specType);
          // this.SKUGoods(data.productRetailSpecList, data.extraInfo, data.specType);
        }
      });
    },

    productRetailSkuList (productRetailSpecList, listData, type) {
      console.log(productRetailSpecList, listData, type, '进入=========')
      if (type == 1) {
        this.oneSpecs = [{ // 单规格默认值
          spec: 'spec',
          specChild: ['specSub']
        }]
        let option = listData[0]
        this.singleSpecificationAddition = [{
          "list":
            [{
              "const": (option.originalPrice / 100).toFixed(2),
              "price": (option.discountPrice / 100).toFixed(2),
              "total": option.productNum,
              "skuNum": option.sku,
              "photoList": option.skuImage,
              "weightStr": (option.weight / 1000).toFixed(2),
              "specifications": ["spec:specSub"],
              "skuStoreStockList": option.skuStoreStockList,
            }],
          "nameTab": ["spec"]
        }]
      } else {
        this.goodsAdd = [];
        productRetailSpecList.map(res => {
          this.goodsAdd.push({
            spec: res.spec,
            specChild: res.specChild.split(",")
          });
        })
        let optionList = [];
        let optionTab = [];
        listData.map(res => {
          res.extraInfo = JSON.parse(res.extraInfo)
          res.specifications = res.extraInfo.spec;
          optionList.push({
            "const": (res.originalPrice / 100).toFixed(2),
            "price": (res.discountPrice / 100).toFixed(2),
            "total": res.productNum,
            "skuNum": res.sku,
            "photoList": res.skuImage,
            "weightStr": (res.weight / 1000).toFixed(2),
            "specifications": res.specifications.split(","),
            "skuStoreStockList": res.skuStoreStockList,
          })
        })
        let specifications = JSON.parse(JSON.stringify(optionList[0].specifications));
        specifications.map(item => {
          optionTab.push({
            name: item.split(":")[0]
          })
        })
        this.specificationList = [{
          "list": optionList,
          "nameTab": optionTab
        }]
        this.goodsSpecification = true;
        console.log(this.goodsAdd, optionList, specifications, optionTab, this.specificationList, '=======这是我处理过数据')
      }
    },

    // 用来回显商品规格
    // SKUGoods (productRetailSpecList, extraInfo, type) {
    //   if (type == 1) {
    //     this.oneSpecs = [{ // 单规格默认值
    //       spec: 'spec',
    //       specChild: ['specSub']
    //     }]

    //     this.singleSpecificationAddition = JSON.parse(extraInfo);
    //   } else {
    //     this.goodsAdd = [];
    //     productRetailSpecList.map(res => {
    //       this.goodsAdd.push({
    //         spec: res.spec,
    //         specChild: res.specChild.split(",")
    //       });
    //     });
    //     this.goodsSpecification = true;
    //     this.specificationList = JSON.parse(extraInfo);

    //   }

    // },

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

    itemCategoryListInterface () {
      // 商品分类列表接口
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
      this.goodsdate = data;
    },

    // 判断价格不能为负数
    pricesDetermine (ruleForm) {
      if (ruleForm.specType == 1) {
        ruleForm.coverPrice = this.singleSpecificationAddition[0].list[0].price // 售价
        ruleForm.productPrice = this.singleSpecificationAddition[0].list[0].price // 售价
        ruleForm.marketPrice = this.singleSpecificationAddition[0].list[0].const // 原价
      }
      if (ruleForm.categoryRemark.length != 3) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: "请在第三级商品分类下创建商品",
          type: "warning"
        });
        return false;
      }
      // if (ruleForm.marketPrice < 0) {
      //   this.$notify({
      //     title: this.$t("member.filter.warning"),
      //     message: "市场价格不能为负",
      //     type: "warning"
      //   });
      //   return false;
      // }
      if (ruleForm.coverPrice < 0) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: "封面价格不能为负",
          type: "warning"
        });
        return false;
      }


      return true;
    },

    submitForm (formName) {
      let option = {};
      if (!this.pricesDetermine(this.ruleForm)) { return; }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.specificationList, this.ruleForm, '打印==1==2==3==4=')
          if (this.ruleForm.specType == 1) { // 单规格
            this.singleSpecificationAddition[0].list[0].photoList = this.ruleForm.coverImg;
            this.ruleForm.extraInfo = this.singleSpecificationAddition;
            this.ruleForm.productRetailSpecList = this.oneSpecs;
          } else { // 多规格
            this.ruleForm.extraInfo = this.specificationList;
            this.ruleForm.productRetailSpecList = this.goodsAdd;
          }
          if (this.ruleForm.brandId) {
            this.brandList.map(item => {
              if (this.ruleForm.brandId == item.id) {
                this.ruleForm.brandName = item.name;
              }
            })
          }
          option = JSON.parse(JSON.stringify(this.ruleForm));
          option.marketPrice = option.marketPrice * 100;
          option.coverPrice = option.coverPrice * 100;
          option.productPrice = option.coverPrice;
          option.orderImg = option.orderImg;
          option.productBanner = option.productBanner.join(",");
          this.specificationsProcessing(option);
        } else {
          return false;
        }
      });
    },
    resetForm () {
      this.$router.go(-1); //返回上一层
    },
    // 规格处理
    specificationsProcessing (option) {
      let number = 0;
      let number1 = 0;
      let number3 = 0;
      let optionObj;
      let goodsArray;
      option.productRetailSkuList = [];
      option.extraInfo = JSON.stringify(option.extraInfo);
      option.categoryRemark = JSON.stringify(option.categoryRemark);
      option.onShelf ? (option.onShelf = 1) : (option.onShelf = 0); // 是否上下架
      if (this.ruleForm.specType == 1) { // 单规格
        goodsArray = JSON.parse(JSON.stringify(this.oneSpecs));
        optionObj = JSON.parse(JSON.stringify(this.singleSpecificationAddition));
      } else {
        goodsArray = JSON.parse(JSON.stringify(this.goodsAdd));
        optionObj = JSON.parse(JSON.stringify(this.specificationList));
      }
      goodsArray.map(res => {
        res.specChild = res.specChild.join(",");
      });
      option.productRetailSpecList = goodsArray;
      optionObj[0].list.map(res => {
        let obj = {};
        let extraInfo = {};
        res.price = res.price * 100; // 单价元转换成分
        res.const = res.const * 100; // 原价同上
        if (!res.skuNum) { // sku不能为空
          number += 1;
        }
        if (res.total < 0) { // 库存可以为0但不能小于0
          number3 += 1;
        }
        // 原价,重量可以为空为0
        if (res.price <= 0) { // 售价,必须大于0
          number1 += 1;
        }
        extraInfo.spec = res.specifications.join(",");
        obj = {
          sku: res.skuNum,
          skuImage: res.photoList,
          originalPrice: res.const,
          productNum: res.total,
          productPrice: res.price,
          discountPrice: res.price,
          weightStr: res.weightStr,
          skuStoreStockList: res.skuStoreStockList,
          extraInfo: JSON.stringify(extraInfo)
        };
        option.productRetailSkuList.push(obj);
      });
      if (number != 0) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: this.$t("commodity.goods.sku"),
          type: "warning"
        });
        return;
      }
      if (number1 != 0) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: "售价不能小于或等于0",
          type: "warning"
        });
        return;
      }
      if (number3 != 0) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: "库存不能小于0",
          type: "warning"
        });
        return;
      }

      this.newProductsInterface(option);
    },
    // 新增商品接口
    newProductsInterface (option) {
      let uri;
      if (this.type == 0) {
        // 新增商品
        uri = NewProducts;
      } else {
        // 更新商品
        uri = ItemAdd;
      }
      option.detail = option.detail.replace(/..\/..\/storage\//g, this.$fileUrl())
      uri(option).then(res => {
        if (res.code == 0) {
          this.resetForm();
        } else {
          this.$notify({
            title: this.$t("member.filter.warning"),
            message: res.message,
            type: "warning"
          });
        }

      });
    },
    clickcategoryId (e) {
      // 联级选择器选择商品分类
      if (!e.children) {
        // 你每次选择一次商品分类那么我就要把是否首页推荐给默认选中否
        this.ruleForm.recommend = '0';
        this.ruleForm.categoryName = e.label;
        this.ruleForm.categoryId = e.id;
      }
    },
    clickuloadImg (index, e) {
      this.indexImg = index;
      if (e == 666) {
        this.quanTity = 19;
      } else {
        this.quanTity = 1;
      }
      this.$refs.muchild.showModel(); // 显示上传图片弹框
    },
    imageSuccessCBK (e) {
      // 点击上传图片
      if (this.indexImg == 999) {
        this.ruleForm.coverImg = e[0].url[0].url;
      } else if (this.indexImg == 888) {
        this.ruleForm.orderImg = e[0].url[0].url;
      } else if (this.indexImg == 666) {
        e.map(res => {
          this.ruleForm.productBanner.push(res.url[0].url)
        })
      } else {
        this.specificationList[0].list[this.indexImg].photoList =
          e[0].url[0].url;
      }
    },
    delImg (e, num) {
      // 点击删除图片
      if (num == 1) {
        this.ruleForm.coverImg = '';
      } else if (num == 2) {
        this.ruleForm.orderImg = '';
      } else if (num == 3) {
        this.ruleForm.productBanner.splice(e, 1);
      }
    },
    /**
     * 注释：↓
     * 1.id=-9 为添加规格 添加规格之前要判断 goodsAdd里面有没有有的时候还要判断子规格你添加了没有，没有添加子规格不许再次添加规格
     * 2.id!=-9 为编辑规格
     * 3.status = true的时候证明你上一条的规格里面的子规格没有数据需要先加子规格才能再次添加新的规格
     */
    addSpecifications (id) {
      // 点击添加规格
      let status = false;
      this.editingId = id;
      if (this.goodsAdd.length != 0 && id == -9) {
        // 注释1
        for (let i = 0; i < this.goodsAdd.length; i++) {
          if (this.goodsAdd[i].specChild.length == 0) {
            status = true;
            break;
          }
        }
      }
      if (status) {
        // 注释3
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: this.$t("commodity.goods.import1"),
          type: "warning"
        });
        return;
      } else {
        this.form.name = '';
      }
      if (id > -1) {
        // 注释2
        this.form.name = this.goodsAdd[this.editingId].spec;
      }
      this.dialogVisible = true;
    },
    addingSubspecifications (e) {
      // 点击添加子规格按钮
      /**
       * 注释：
       * 1.添加子规格显示弹框之前先置空input框
       */
      this.form.specTitle = '';
      this.SubstandardId = e;
      this.dialogFormVisible = true;
    },
    /**
     * 注释：↓
     * 1.当e=parent的时候为父项的删除
     * 2.当e!=parent的时候为子项的删除
     * 3.当发现你删除的这个子项为这条数据的唯一一条的时候那么提示他让他删除这条消息
     * 4.当发现goodsAdd数组为空的时候那么直接把列表置空
     * 5.当你点击删除之后那么我先判断是否数组里面有值有值的话就开始再次把数组处理摆到页面上
     * 6.当我发现表格数组里面删除过后还有值的时候--那么我先把删除之前的数组保存一下再与新生成数组对比（为了把客户填写的数据回显）
     */
    deleteSpecification (e, i) {
      // 点击删除
      if (e == "parent") {
        // 注释1
        this.goodsAdd.splice(i, 1);
        if (this.goodsAdd.length == 0) {
          // 注释4
          this.goodsSpecification = false;
          this.specificationList = [];
        }
      } else {
        if (this.goodsAdd[e].specChild.length == 1) {
          // 注释3
          this.$notify({
            title: this.$t("member.filter.warning"),
            message: this.$t("commodity.goods.delete"),
            type: "warning"
          });
          return;
        }
        this.goodsAdd[e].specChild.splice(i, 1); // 注释2
      }
      if (this.specificationList.length != 0) {
        //不等于0的时候才走进去
        this.ParameterComparison = [];
        this.ParameterComparison = JSON.parse(
          JSON.stringify(this.specificationList)
        );
      }
      if (this.goodsAdd.length != 0) {
        this.JudgementAdding();
      }
    },

    /**
     * 注释：↓
     * 1.点击添加规格
     * 2.点击编辑规格
     * 3.当你编辑成功之后发现这个里面的子规格没有东西那么你就不刷新列表（你的每一次编辑都将要刷新列表除非子规格为空）
     */
    SpecificationsStore () {
      // 点击商品规格确定按钮
      if (!this.form.name) {
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: this.$t("commodity.goods.fillIn"),
          type: "warning"
        });
        return;
      }
      let str = this.form.name;
      if (str.split(",").length > 1 || str.split(":").length > 1) {
        this.$notify({
          title: "警告",
          message: "不可输入冒号或逗号",
          type: "warning"
        });
        return;
      }

      this.dialogVisible = false;
      if (this.editingId > -1) {
        // 注释2
        this.goodsAdd[this.editingId].spec = this.form.name;
        let status = false;
        for (let i = 0; i < this.goodsAdd.length; i++) {
          // 注释3
          if (this.goodsAdd[i].specChild.length == 0) {
            status = true;
            break;
          }
        }
        if (!status) {
          // 注释3
          this.JudgementAdding();
        }
      } else {
        this.goodsAdd.push({
          // 注释1
          spec: this.form.name,
          specChild: []
        });
      }
    },
    /**
     * 注释：↓
     * 1.当点击确认的时候发现input里为空的时候不允许成功
     * 2.input不为空的时候允许成功
     */
    SubstandardStore () {
      // 子规格弹框确定
      if (this.specificationList.length != 0) {
        //不等于0的时候才走进去
        this.ParameterComparison = [];
        this.ParameterComparison = JSON.parse(JSON.stringify(this.specificationList));
      }
      let str = this.form.specTitle;
      if (str.split(",").length > 1 || str.split(":").length > 1) {
        this.$notify({
          title: "警告",
          message: "不可输入冒号或逗号",
          type: "warning"
        });
        return;
      }

      if (!this.form.specTitle) {
        // 注释1
        this.$notify({
          title: this.$t("member.filter.warning"),
          message: this.$t("commodity.goods.fillIn1"),
          type: "warning"
        });
        return;
      } else {
        // 注释1
        // this.goodsAdd[this.SubstandardId].specChild.push({
        //   specChild: this.form.specTitle,
        // })
        this.goodsAdd[this.SubstandardId].specChild.push(this.form.specTitle);
        this.dialogFormVisible = false;
      }
      this.JudgementAdding();
    },
    /**
     * 注释：
     * 1.把每条参数里的父项拿出来单独放置
     * 2.此数组为提交时候所需格式
     * 3.单独拿出来是为了动态增加表头参数
     * 4.把数组里面所有的子项都拿出来放到数组里面方便下一步处理(前端)
     * 5.把数组里面所有的子项都拿出来放到数组里面方便下一步处理(后台)
     * 6.数组每条参数里面的所有子项放到一个对象里面(先清空,在push,之后在赋值给其他变量保存，循环往复知道走完数组的每一项)
     * 7.把获取到的每条参数里的子项赋值给一个变量方便下一步处理
     * 8.当它为true的时候就证明规格表格需要显示了
     */
    JudgementAdding () {
      // 转换格式
      let that = this;
      let nameTab = [];
      let actualArray = [];
      that.actualGrouping = [];
      that.goodsAdd.map((item, index) => {
        nameTab.push({
          // 注释1
          name: item.spec
        });
        actualArray = []; // 注释6
        item.specChild.map((res, i) => {
          // actualArray.push(item.spec + ':' + res.specChild) // 注释5
          actualArray.push(item.spec + ":" + res); // 注释5
        });
        that.actualGrouping[index] = actualArray; // 注释7(后端)
      });
      that.specificationList = [
        {
          // 注释2
          nameTab: nameTab, // 注释3
          list: []
        }
      ];
      that.BackstageFormat(that.actualGrouping);
      that.goodsSpecification = true; // 注释8
    },
    /**
     * 注释：
     * 1.每次进来之前先清空
     * 2.此方法为计算出来你添加的SKU总共有多少种排列方式(这个时候他的长度是多少就代表了需要在页面上显示多少条数据)
     * 3.这个参数主要是为了当你新增或删除规格之后新生成的数组这个时候如果（原先数组）有客户填写的规格的时候不能给他清空
     */
    BackstageFormat (obj) {
      // 处理成可以摆在页面需要的样式
      let that = this;
      let arrayObj = [];
      that.specificationList[0].list = []; // 注释1
      arrayObj = that.combine(obj.reverse()); // 注释2
      arrayObj.forEach(item => {
        that.specificationList[0].list.push({
          skuStoreStockList: [],
          specifications: item,
          photoList: '',
          skuNum: '',
          total: '',
          price: '',
          const: '',
          weightStr: ''
        });
      });
      if (this.specificationList.length != 0) {
        // 注释3
        setTimeout(() => {
          this.ContrastAssignment();
        }, 200);
      }
    },
    /**
     * 注释:↓
     * 1.此数组不为空的话就证明可以判断新旧数组里的参数是否发生变化
     * 2.旧数组循环体
     * 3.新数组循环体
     * 4.当我对比发现两个数组里的子项长度相同的话那么我才开始对比不然不对比
     * 5.前面几个条件都满足的时候那么在list里面放置新增的参数的specifications数组进行对比
     * 6.当这两个数组对比过后发现长度以及内容都一样的时候开始下一步对比
     */
    ContrastAssignment () {
      let newArray = [];
      let oldArray = [];
      if (this.ParameterComparison.length != 0) {
        // 注释1
        newArray = this.specificationList[0].list;
        oldArray = this.ParameterComparison[0].list;
        newArray.map((item, index) => {
          // 注释2
          oldArray.map(element => {
            // 注释2
            if (item.specifications.length == element.specifications.length) {
              // 注释4
              let num = 0;
              item.specifications.map(intiem => {
                // 注释5
                element.specifications.map(inelement => {
                  if (intiem == inelement) {
                    num += 1;
                    if (num == element.specifications.length) {
                      item.skuStoreStockList = element.skuStoreStockList;
                      item.photoList = element.photoList;
                      item.skuNum = element.skuNum;
                      item.total = element.total;
                      item.price = element.price;
                      item.const = element.const;
                      item.weightStr = element.weightStr;
                    }
                  }
                });
              });
            }
          });
        });
      }
    },
    // 拼接成需要的格式 xx--xx--xx
    combine (arr) {
      var r = [];
      (function f (t, a, n) {
        if (n == 0) return r.push(t);
        for (let i = 0; i < a[n - 1].length; i++) {
          f(t.concat(a[n - 1][i]), a, n - 1);
        }
      })([], arr, arr.length);
      return r;
    }
  }
};
</script>
<style lang="scss" scoped>
.box_form {
  // margin-bottom: 10px;
  width: 64%;
  .box_sty {
    width: 22%;
  }
}
.box_form1 {
  width: 63%;
}
.box_form_guige {
  width: 90%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.spec_div {
  margin-bottom: 20px;
  .box_spec {
    display: flex;
    margin-bottom: 10px;
    .spec_sty {
      margin-right: 10px;
      font-size: 18px;
    }
  }
  .box_specs_bot {
    display: flex;
    margin-left: 30px;
    .box_specs_bot_sty {
      display: flex;
      margin-right: 20px;
      .del_specs {
        color: red;
        font-weight: 800;
        cursor: pointer;
      }
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}

.el-form-item {
  .orderImg_box {
    display: flex;
    flex-wrap: wrap;
  }
  .img_show {
    width: 150px;
    height: 100px;
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
    .img_show_del {
      width: 150px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      position: absolute;
      z-index: 9;
      display: none;
    }
  }
  .img_show:hover .img_show_del {
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    color: #f56c6c;
    cursor: pointer;
  }
  .upload_img {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    .logoIcon {
      font-size: 40px;
      color: #dddddd;
      margin: 30px;
    }
  }
}
.store-form {
  display: flex;
  flex-wrap: wrap;
  .store-item {
    width: 50%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .store-item-title {
      width: 40%;
    }
    .tore-item-input {
      width: 50%;
    }
  }
}
.alert-sty {
  margin-bottom: 10px;
}
.el-alert {
  padding: 0;
}
</style>

