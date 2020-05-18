<template>
  <d2-container class="page">
    <h3 class="list-title">编辑商品</h3>
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
        <el-radio-group v-model="ruleForm.specType">
          <el-radio :label="1">单规格商品</el-radio>
          <el-radio :label="2">多规格商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 商品名称 -->
      <el-form-item class="box_form"
                    required
                    :label="$t('coupons.name')"
                    prop="productName">
        <el-input class="box_form"
                  v-model="ruleForm.productName"></el-input>
      </el-form-item>
      <!-- 商品编码 -->
      <el-form-item class="box_form"
                    required
                    label="商品编码"
                    prop="unionCode">
        <el-input class="box_form"
                  v-model="ruleForm.unionCode"></el-input>
      </el-form-item>
      <!-- 商品分类 -->
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
      <!-- 品牌分类 -->
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
      <!-- 商品简介 -->
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.productBrief')">
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="ruleForm.productIntroduction"></el-input>
      </el-form-item>
      <!-- 商品说明 -->
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.commodityDescription')">
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="ruleForm.explainInfo"></el-input>
      </el-form-item>
      <!-- 唯一编号(SKU) -->
      <el-form-item class="box_form"
                    required
                    v-if="ruleForm.specType == 1"
                    label="唯一编号(SKU)">
        <el-input class="box_form"
                  v-model="singleSpecificationAddition[0].list[0].skuNum"></el-input>
      </el-form-item>
      <!-- 售价 -->
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    required
                    label="售价">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].price"></el-input>
      </el-form-item>
      <!-- 原价 -->
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="原价">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].const"></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="重量(KG)">
        <el-input class="box_form"
                  type="number"
                  min="0"
                  v-model="singleSpecificationAddition[0].list[0].weightStr"></el-input>
      </el-form-item>
      <!-- 库存 -->
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
                    label="是否预售">
        <el-radio-group v-model="ruleForm.advanceSale">
          <el-radio :label="1">{{$t('running.suspended1')}}</el-radio>
          <el-radio :label="0">{{$t('running.suspended0')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 门店库存 -->
      <el-form-item class="box_form"
                    v-if="ruleForm.specType == 1"
                    label="门店库存">
        <el-button type="primary"
                   @click="editStore(-10,1)">添加门店库存</el-button>
      </el-form-item>
      <!-- 原价 -->
      <el-form-item v-if="ruleForm.specType == 2"
                    class="box_form"
                    required
                    :label="$t('commodity.goods.costPrice')"
                    prop="marketPriceStr">
        <el-input class="box_form"
                  v-model="ruleForm.marketPriceStr"></el-input>
      </el-form-item>
      <!-- 封面价格 -->
      <el-form-item v-if="ruleForm.specType == 2"
                    class="box_form"
                    required
                    :label="$t('commodity.goods.coverPrice')"
                    prop="coverPriceStr">
        <el-input class="box_form"
                  v-model="ruleForm.coverPriceStr"></el-input>
      </el-form-item>
      <!-- 多规格配置 -->
      <el-form-item v-if="ruleForm.specType == 2"
                    style="width:100%"
                    required
                    label="商品规格">
        <SpecificationData :specObj="specObj"
                           @specificationsObj="specificationsObj" />
      </el-form-item>
      <!-- 排序值 -->
      <el-form-item class="box_form"
                    :label="$t('commodity.sort.forder')">
        <el-input class="box_form"
                  v-model="ruleForm.sortNum"
                  autocomplete="off"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- 封面图片 -->
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
      <!-- 订单图片 -->
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
      <!-- 商品Banner -->
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
      <!-- 商品详情 -->
      <el-form-item class="box_form"
                    :label="$t('commodity.goods.details')">
        <Tinymce v-model="ruleForm.detail"
                 :height="200" />
      </el-form-item>
      <!-- 热门推荐 -->
      <el-form-item class="box_form"
                    label="热门推荐">
        <el-radio-group v-model="ruleForm.hotProductRecommend">
          <el-radio :label="1">{{$t('running.suspended1')}}</el-radio>
          <el-radio :label="0">{{$t('running.suspended0')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 新品推荐 -->
      <el-form-item class="box_form"
                    label="新品推荐">
        <el-radio-group v-model="ruleForm.newProductRecommend">
          <el-radio :label="1">{{$t('running.suspended1')}}</el-radio>
          <el-radio :label="0">{{$t('running.suspended0')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 直接上架 -->
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
    <!-- 上传图片 -->
    <editorImage ref="muchild"
                 :quanTity="quanTity"
                 urltype="default"
                 type="default-1"
                 @successCBK="imageSuccessCBK" />
    <el-dialog title="门店库存"
               :visible.sync="dialogFormVisible">
      <div class="dialog-sty">
        <div style="width:50%"
             v-for="(item,index) in storesListData"
             :key="index">
          <el-form size="small">
            <el-form-item :label="item.storeName"
                          label-width="120px">
              <el-input v-model="item.stock"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="storeSure()">确 定</el-button>
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
    var validateMarketPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('原价价格不能为空'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      quanTity: 1, // 允许一次上传多少图片
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
        marketPrice: "", // 原价价格
        marketPriceStr: "", // 原价价格字符串
        coverPrice: "", // 封面价格
        coverPriceStr: "", // 封面价格字符串
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
        productName: [{ required: true, message: this.$t("commodity.goods.importName"), trigger: "blur" }],
        unionCode: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
        categoryRemark: [{ required: true, message: this.$t("commodity.goods.selectProduct"), trigger: "change" }],
        marketPriceStr: [{ required: true, message: this.$t("commodity.goods.marketPrice1"), trigger: "blur" }],
        coverPriceStr: [{ required: true, message: this.$t("commodity.goods.coverPrice1"), trigger: "blur" }],
        coverImg: [{ required: true, message: '请上传封面图片', trigger: "change" }],
        orderImg: [{ required: true, message: '请上传订单图片', trigger: "change" }],
        productBanner: [{ required: true, message: '请上传商品Banner图片', trigger: "change" }],
        // marketPrice: [{ validator: validateMarketPrice, trigger: 'blur' }],
      },
      goodsAdd: [], // 多规格的时候放置规格
      singleSpecificationAddition: [{ // 单规格sku放置处
        list: [{
          advanceSale: 0,
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
      oneSpecs: [{ // 单规格默认值
        spec: 'spec',
        specChild: ['specSub']
      }],
      specificationList: [],
      goodsdate: [],
      brandList: [],
      specList: [],
      specObj: { type: null },
      storesListData: [],
      storeOriginal: [],
      specNum: 0,
    };
  },
  computed: {},
  created () {
    this.type = this.$route.query.type;
    const channelId = JSON.parse(cookieGet("Httpheader")).ChannelId;
    this.itemCategoryListInterface();
    this.brandClassificationInterface();
    this.ListStoresInterface(channelId);
    if (this.type == 0) {
    } else {
      this.commodityDetailsInterface(this.$route.query.id);
    }
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
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


    specificationsObj (e) {
      // 多规格插件参数获取处
      this.specList = e;
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
    echoList (data) { // 商品分类回调
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
    clickcategoryId (e) {
      // 联级选择器选择商品分类
      if (!e.children) {
        // 你每次选择一次商品分类那么我就要把是否首页推荐给默认选中否
        this.ruleForm.recommend = '0';
        this.ruleForm.categoryName = e.label;
        this.ruleForm.categoryId = e.id;
      }
    },
    commodityDetailsInterface (id) {
      ProductsId({ id: id }).then(res => {
        if (res.code == 0) {
          if (res.data) {
            let data = { ...res.data };
            // data.marketPrice = (data.marketPrice / 100).toFixed(2);
            // data.coverPrice = (data.coverPrice / 100).toFixed(2);
            // data.productPrice = (data.productPrice / 100).toFixed(2);
            this.ruleForm = data;
            this.ruleForm.categoryRemark = JSON.parse(data.categoryRemark);
            this.ruleForm.advanceSale = data.advanceSale ? 1 : 0,
              this.ruleForm.recommend = data.recommend + ''; // 是否首页推荐
            this.ruleForm.newProductRecommend = data.newProductRecommend == false ? 0 : 1;//是否新品推荐
            this.ruleForm.hotProductRecommend = data.hotProductRecommend == false ? 0 : 1;//是否热门推荐
            this.ruleForm.productBanner = data.productBanner.split(","); // banner图片
            this.ruleForm.detail = data.detail.replace(/..\/..\/storage\//g, this.$fileUrl()); // 商品详情
            this.ruleForm.onShelf = data.onShelf == 0 ? false : true; // false为1 true为2 是否上架
            this.productRetailSkuList(data.productRetailSpecList, data.productRetailSkuList, data.specType, data.extraInfo);
          }

        }
      })
    },
    productRetailSkuList (productRetailSpecList, listData, type, extraInfo) {
      if (type == 1) {
        this.oneSpecs = [{ // 单规格默认值
          spec: 'spec',
          specChild: ['specSub']
        }]
        let option = listData[0];
        this.singleSpecificationAddition = [{
          "list":
            [{
              advanceSale: this.ruleForm.advanceSale,
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
        let specList = {
          type: 1,
          specs: [],
          tableData: [{
            list: [],
            nameTab: [],
          }]
        }
        let option = JSON.parse(extraInfo);
        specList.tableData[0].nameTab = option.nameTab;
        specList.specs = option.specs;
        let optionList = [];
        listData.map(item => {
          let listObj = {}
          let list = [];
          let jude = [];
          item.extraInfo = JSON.parse(item.extraInfo)
          item.specifications = item.extraInfo.spec;
          listObj = {
            "advanceSale": item.advanceSale ? true : false,
            "const": (item.originalPrice / 100).toFixed(2),
            "photoList": item.skuImage,
            "price": (item.discountPrice / 100).toFixed(2),
            "skuNum": item.sku,
            "skuStoreStockList": item.skuStoreStockList,
            "total": item.productNum,
            "weightStr": (item.weight / 1000).toFixed(2),
          }
          list = item.specifications.split(",");
          jude = JSON.parse(JSON.stringify(list));
          optionList.push({
            "listObj": listObj,
            "list": list,
            "jude": jude.join(' ')
          })
        })
        specList.tableData[0].list = optionList;
        this.specObj = specList;
      }
    },


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
      // 点击门店库存按钮
      this.specNum = index; // 记录是第几个商品  
      this.dialogFormVisible = true;
      this.storesListData = JSON.parse(JSON.stringify(this.storeOriginal));
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
    },

    storeSure () {
      let storeData = [];
      let storeList = JSON.parse(JSON.stringify(this.storesListData));
      storeList.map(res => {
        if (res.stock) {
          storeData.push(res);
        }
      });
      this.singleSpecificationAddition[0].list[0].skuStoreStockList = storeData;
      this.dialogFormVisible = false;
    },

    pricesDetermine (option) {
      if (option.specType == 1) {
        option.coverPriceStr = this.singleSpecificationAddition[0].list[0].price // 封面价格
        // option.productPrice = this.singleSpecificationAddition[0].list[0].price // 商品价格
        option.marketPriceStr = this.singleSpecificationAddition[0].list[0].const // 原价
      } else {
        // this.specList.specs // 规格(放到扩展字段里面)
        // this.specList.tableData[0].nameTab // 规格列表头部(放到扩展字段里面)
        // this.specList.tableData[0].list // 规格列表参数
        this.goodsAdd = []
        let arrayGood = []
        let specsArray = JSON.parse(JSON.stringify(this.specList.specs));
        let listArray = JSON.parse(JSON.stringify(this.specList.tableData[0].list));
        let extraInfo = {
          "specs": this.specList.specs,
          "nameTab": this.specList.tableData[0].nameTab,
        }
        option.extraInfo = extraInfo;
        specsArray.map(item => { // 规格处理
          arrayGood.push({
            spec: item.attributeName,
            specChild: item.dynamicTags,
          })
        })
        this.goodsAdd = arrayGood;
        let optionList = [];
        listArray.map(res => {
          optionList.push({
            "advanceSale": res.listObj.advanceSale,
            "const": res.listObj.const,
            "price": res.listObj.price,
            "total": res.listObj.total,
            "skuNum": res.listObj.skuNum,
            "photoList": res.listObj.photoList,
            "weightStr": res.listObj.weightStr,
            "specifications": res.list,
            "skuStoreStockList": res.listObj.skuStoreStockList,
          })
        })
        this.specificationList = [{
          "list": optionList,
          "nameTab": this.specList.tableData[0].nameTab
        }]
      }
      if (!option.marketPrice && option.specType == 2) {
        this.$notifyFrame('原价价格不能为空', false)
        return false;
      } else if ((!option.coverPrice || option.coverPrice < 0) && option.specType == 2) {
        this.$notifyFrame('请输入正确的封面价格', false)
        return false;
      }
      return true;
    },


    submitForm (formName) {
      let option = {};
      if (!this.pricesDetermine(this.ruleForm)) { return; }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.specType == 1) {
            this.singleSpecificationAddition[0].list[0].photoList = this.ruleForm.coverImg; // 单规格的时候封面图片即为规格里面的图片
            this.singleSpecificationAddition[0].list[0].advanceSale = this.ruleForm.advanceSale;
            this.ruleForm.extraInfo = this.singleSpecificationAddition;
            this.ruleForm.productRetailSpecList = this.oneSpecs;
          }
          if (this.ruleForm.brandId) { // 获取品牌分类的名称
            this.brandList.map(item => {
              if (this.ruleForm.brandId == item.id) {
                this.ruleForm.brandName = item.name;
              }
            })
          }
          option = JSON.parse(JSON.stringify(this.ruleForm));
          // option.marketPrice = option.marketPrice * 100;
          // option.coverPrice = option.coverPrice * 100;
          // option.productPrice = option.coverPriceStr;
          option.orderImg = option.orderImg;
          option.productBanner = option.productBanner.join(",");
          this.specificationsProcessing(option);
        } else {
          return false;
        }
      });
    },

    specificationsProcessing (option) {
      let number = 0;
      let optionObj;
      let goodsArray;
      option.extraInfo = JSON.stringify(option.extraInfo);
      option.categoryRemark = JSON.stringify(option.categoryRemark); // 商品编码
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
      option.productRetailSkuList = [];
      for (let i = 0; i < optionObj[0].list.length; i++) {
        let obj = {};
        let extraInfo = {};
        let listObj = optionObj[0].list[i];
        listObj.price = listObj.price * 100; // 单价元转换成分
        listObj.const = listObj.const * 100; // 原价同上
        if (!listObj.skuNum) {  // sku不能为空
          this.$notifyFrame('唯一编号(SKU)不能为空', false);
          number += 1;
          break;
        }
        if (listObj.total < 0) {
          this.$notifyFrame('库存不能小于0', false);
          number += 1;
          break;
        }
        if (listObj.price < 0) {
          this.$notifyFrame('售价不能小于或等于0', false);
          number += 1;
          break;
        }
        extraInfo.spec = listObj.specifications.join(",");
        obj = {
          advanceSale: res.advanceSale ? 1 : 0,
          sku: listObj.skuNum,
          skuImage: listObj.photoList,
          originalPrice: listObj.const,
          productNum: listObj.total,
          productPrice: listObj.price,
          discountPrice: listObj.price,
          weightStr: listObj.weightStr,
          skuStoreStockList: listObj.skuStoreStockList,
          extraInfo: JSON.stringify(extraInfo)
        };
        option.productRetailSkuList.push(obj);
      }
      if (number != 0) {
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
          this.$notifyFrame(res.message, false);
        }

      });
    },




    resetForm () {
      this.$router.go(-1); //返回上一层
    },

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
.alert-sty {
  margin-bottom: 10px;
}
.el-alert {
  padding: 0;
}
.dialog-sty {
  display: flex;
  flex-wrap: wrap;
}
</style>

