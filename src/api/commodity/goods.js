import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete
} from '../index'

//  商品模块
const apis = {
  // itemCategoryList: 'product/base/category/all/page/0', // 商品分类列表接口
  itemCategoryList: 'product/base/category/all/page', // 商品分类列表接口
  deleteProductCategory: 'product/base/category', // 删除某条商品分类
  addCategory: 'product/base/category', // 添加商品分类
  classificationDetails: 'product/base/category', // 查询某条商品分类的详情(回显)
  editCommodity: 'product/base/category', // 编辑商品分类(put)
  queryClassificationList: 'product/base/category', // 每次可以查询所有的父类或父类下的子类接口(商品列表查询用)(get)
  productList: 'product/retail/list/union-sku', // 查询商品列表
  queryProduct: 'product/retail/list', // 查询商品列表(全部1)
  newProducts: 'product/retail', // 新增商品 or 商品详情(回显) or 更新商品
  goodsCategory: 'product/retail/recommend/category', // 能否首页推荐
  goodsOnShelf: 'product/retail/onShelf', // 商品上下架
  upDownBulk: 'product/retail/onShelf/batch', // 商品批量上下架
  goodsDel: 'product/retail', // 商品删除
  specificationGoods: 'product/retail/spec', // 查询商品规格
  childSpecifications: 'product/retail/spec/child', // 查询商品子规格
  listStores: 'user/stores', // 获取门店列表
}
// 商品分类列表接口
export const ItemCategoryList = (params) => HttpGet(apis.itemCategoryList, params)
// 删除某条商品分类
export const Del = (params) => HttpDelete(apis.deleteProductCategory + '/' + params.check + '/' + params.id + '/' + params.type)
// 添加商品分类
export const AddCategory = (params) => HttpPost(apis.addCategory, params)
// 查询某条商品分类的详情
export const ClassificationDetails = (params) => HttpGet(apis.classificationDetails + '/' + params.id)
// 编辑商品分类
export const EditCommodity = (params) => HttpPut(apis.editCommodity, params)
// 每次可以查询所有的父类或父类下的子类接口
export const QueryClassificationList = (params) => HttpGet(apis.queryClassificationList, params)
// 查询商品列表
export const ProductList = (params) => HttpGet(apis.productList, params)
// 查询商品列表(全部)
export const QueryProduct = (params) => HttpGet(apis.queryProduct, params)
// 新增商品
export const ItemAdd = (params) => HttpPut(apis.newProducts, params)
// 更新商品
export const NewProducts = (params) => HttpPost(apis.newProducts, params)
// 商品详情(回显)
export const ProductsId = (params) => HttpGet(apis.newProducts + '/' + params.id)
// 能否首页推荐
export const GoodsCategory = (params) => HttpGet(apis.goodsCategory + '/' + params.categoryId)
// 商品上下架
export const GoodsOnShelf = (params) => HttpPut(apis.goodsOnShelf + '/' + params.id + '/' + params.onShelf)
// 商品批量上下架
export const UpDownBulk = (params) => HttpPut(apis.upDownBulk, params)
// 商品删除
export const GoodsDel = (params) => HttpDelete(apis.goodsDel + '/' + params.id)
// 查询商品规格
export const SpecificationGoods = (params) => HttpGet(apis.specificationGoods, params)
// 查询商品子规格
export const ChildSpecifications = (params) => HttpGet(apis.childSpecifications, params)
// 获取门店列表
export const ListStores = (params) => HttpGet(apis.listStores, params)