import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
import {
  cookieGet
} from '@/common/cookie'
import {
  getMenuList,
  ButtonMenuList
} from '@/api/common.js'
// import {
//   isURL
// } from '@/common/validate'
import {
  addDomList
} from './cdoms'
Vue.use(VueRouter)


/**
 * 增加子集路由
 * @param {Array} routerList 路由总表
 * @param {Object} fdom 对应父级路由
 * @param {Object} cdom 对应子级路由
 */
function addChildList(routerList, fdom, cdom) {
  routerList.forEach((d, idx) => {
    if (d.id == fdom.id) routerList[idx].childList.push(cdom)
  })
  return routerList
}

/**
 * 删除无用的 children 字段以及精简数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict renrenMenuToRouteDict 生成的菜单名称和 id 的对照表
 */
function renrenMenuToD2AdminMenu(menuArray, routeNameDict) {
  const transform = menu => ({
    ...(menu.childList.length > 0 ? {
      children: menu.childList.map(e => transform(e))
    } : {}),
    id: menu.id,
    icon: menu.iconCls,
    title: menu.title,
    fill: menu.fill,
    name: routeNameDict[menu.id]
  })
  return menuArray.map(e => transform(e))
}
/**
 * 将后台返回的数据转化成 d2admin/page/init 使用的数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict renrenMenuToRouteDict 生成的菜单名称和 id 的对照表
 * @param {Array} routePathDict renrenMenuToRouteDict 生成的菜单名称和 path 的对照表
 */
function renrenMenuToD2AdminPageInitData(
  menuArray,
  routeNameDict,
  routePathDict
) {
  const transform = menu => ({
    ...(menu.childList.length > 0 ? {
      children: menu.childList.map(e => transform(e))
    } : {}),
    meta: {
      title: menu.title,
    },
    name: routeNameDict[menu.id],
    path: routePathDict[menu.id]
  })

  return menuArray.map(e => transform(e))
}

/**
 * 将后台返回的数据转化成 d2admin/page/init 使用的数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict renrenMenuToRouteDict 生成的菜单名称和 id 的对照表
 * @param {Array} routePathDict renrenMenuToRouteDict 生成的菜单名称和 path 的对照表
 */
function renrenMenuToD2AdminSearchInitData(
  menuArray,
  routeNameDict,
  routePathDict
) {
  const transform = menu => ({
    ...(menu.childList.length > 0 ? {
      children: menu.childList.map(e => transform(e))
    } : {}),
    path: routePathDict[menu.id],
    title: menu.name,
    icon: menu.iconCls
  })
  return menuArray.map(e => transform(e))
}

/**
 * 将后台传来的菜单数据整理成 [{ id: routeName }] 的键值对数组
 * @param {Array} menuArray 后台返回的菜单格式
 */
function renrenMenuToRouteDict(menuArray, routePropName = 'name') {
  const dict = {}
  const step = menu => {
    var route = window.SITE_CONFIG['dynamicMenuRoutes'].filter(
      item => item.meta.menuId === menu.id
    )[0]
    if (route) {
      Object.defineProperty(dict, menu.id, {
        value: route[routePropName]
      })
    }
    if (menu.childList.length > 0) {
      menu.childList.forEach(step)
    }
  }
  menuArray.forEach(step)
  return dict
}

// 页面路由(独立页面)
export const pageRoutes = [{
    path: '/login',
    component: () => import('@/views/d2admin/login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/d2admin/error/404'),
    name: '404',
    meta: {
      title: '404未找到'
    }
  },
  {
    path: '/channel',
    component: () => import('@/views/d2admin/channel'),
    name: 'channel',
    meta: {
      title: '选择渠道'
    }
  }
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
  path: '/',
  component: () => import('@/layout/header-aside'),
  redirect: {
    name: 'index'
  },
  meta: {
    title: '主入口布局'
  },
  children: [{
      path: '/index',
      component: () => import('@/views/modules/index'),
      name: 'index',
      meta: {
        title: '首页',
        isTab: true
      }
    },
    {
      path: '/component',
      component: () => import('@/views/modules/component'),
      name: 'component',
      meta: {
        title: '通用组件'
      }
    },
    {
      path: '/memInfoView',
      component: () =>
        import('@/views/modules/member/user/user-management/meminfo-view'),
      name: 'memInfoView',
      meta: {
        title: '会员详情'
      }
    },
    {
      path: '/label-info',
      component: () =>
        import('@/views/modules/member/user/label-management/label-info'),
      name: 'label-info',
      meta: {
        title: '编辑标签'
      }
    },
    {
      path: '/label-arr-info',
      component: () =>
        import('@/views/modules/member/user/label-management/label-arr-info'),
      name: 'label-arr-info',
      meta: {
        title: '编辑标签组'
      }
    },
    {
      path: '/member-filter-folder-filteradd',
      component: () => import('@/views/modules/member/filter-folder/filteradd'),
      name: 'member-filter-folder-filteradd',
      meta: {
        title: '编辑筛选器'
      }
    },
    {
      path: '/member-filter-folder-filter-member',
      component: () => import('@/views/modules/member/filter-folder/filter-member'),
      name: 'member-filter-folder-filter-member',
      meta: {
        title: '筛选会员列表'
      }
    },
    {
      path: '/menu-add',
      component: () => import('@/views/modules/wechat/menu/menu-add'),
      name: 'wechat-menu-menu-add',
      meta: {
        title: '新增菜单组'
      }
    },
    {
      path: '/menu-edit',
      component: () => import('@/views/modules/wechat/menu/menu-edit'),
      name: 'wechat-menu-menu-edit',
      meta: {
        title: '编辑菜单'
      }
    },
    {
      path: '/addAdvancedMessage',
      component: () =>
        import('@/views/modules/wechat/material/addAdvancedMessage'),
      name: 'wechat-material-addAdvancedMessage',
      meta: {
        title: '新建高级图文消息'
      }
    },
    {
      path: '/reply-default',
      component: () => import('@/views/modules/wechat/reply/default'),
      name: 'wechat-reply-default',
      meta: {
        title: '创建回复'
      }
    },
    {
      path: '/default-edit',
      component: () => import('@/views/modules/wechat/reply/default-edit'),
      name: 'wechat-reply-defaultEdit',
      meta: {
        title: '编辑回复'
      }
    },
    {
      path: '/keyword-edit',
      component: () => import('@/views/modules/wechat/reply/keyword-edit'),
      name: 'wechat-reply-keywordEdit',
      meta: {
        title: '编辑关键字回复'
      }
    },
    {
      path: '/sweepstakesInfo',
      component: () =>
        import('@/views/modules/marketing/lottery/sweepstakes-info'),
      name: 'sweepstakesInfo',
      meta: {
        title: '编辑标签组'
      }
    },
    {
      path: '/add-coupon',
      component: () => import('@/views/modules/wechat/coupon/add-coupon'),
      name: 'wechat-coupon-addCoupon',
      meta: {
        title: '新增卡券'
      }
    },
    {
      path: '/wechat-trigger-trigger-news',
      component: () => import('@/views/modules/wechat/trigger/trigger-news'),
      name: 'wechat-trigger-trigger-news',
      meta: {
        title: '新增触发器'
      }
    },
    {
      path: '/wechat-trigger-trigger-edit',
      component: () => import('@/views/modules/wechat/trigger/trigger-edit'),
      name: 'wechat-trigger-trigger-edit',
      meta: {
        title: '编辑触发器'
      }
    },
    {
      path: '/wechat-trigger-edit',
      component: () => import('@/views/modules/wechat/trigger/edit'),
      name: 'wechat-trigger-edit',
      meta: {
        title: '编辑触发器'
      }
    },
    {
      path: '/couponHandle',
      component: () => import('@/views/modules/wechat/coupon/coupon-handle'),
      name: 'wechat-coupon-couponHandle',
      meta: {
        title: '卡券详情/卡券编辑'
      }
    },
    {
      path: '/addTemplateMessage',
      component: () =>
        import('@/views/modules/wechat/template-message/add-template-message'),
      name: 'wechat-templateMessage-addTemplateMessage',
      meta: {
        title: '添加模板消息'
      }
    },
    {
      path: '/template-details',
      component: () =>
        import('@/views/modules/wechat/template-message/template-details'),
      name: 'wechat-templateMessage-templateDetails',
      meta: {
        title: '模板详情'
      }
    },
    {
      path: '/addCode',
      component: () =>
        import('@/views/modules/wechat/channel-qr-code/add-code'),
      name: 'wechat-channelQrCode-addCode',
      meta: {
        title: '新增/编辑渠道二维码'
      }
    },
    {
      path: '/statistical',
      component: () =>
        import('@/views/modules/wechat/channel-qr-code/statistical'),
      name: 'wechat-channelQrCode-statistical',
      meta: {
        title: '渠道二维码统计'
      }
    },
    {
      path: '/addCoupon',
      component: () => import('@/views/modules/marketing/coupon/add-coupon'),
      name: 'marketing-coupon-addCoupon',
      meta: {
        title: '新增卡券--营销'
      }
    },
    {
      path: '/marketing-coupon-couponHandle',
      component: () => import('@/views/modules/marketing/coupon/coupon-handle'),
      name: 'marketing-coupon-couponHandle',
      meta: {
        title: '卡券详情/卡券编辑--营销'
      }
    },
    {
      path: '/addStore',
      component: () => import('@/views/modules/store-management/add-store'),
      name: 'storeManagement-addStore',
      meta: {
        title: '门店管理--添加门店'
      }
    },
    {
      path: '/add-automated',
      component: () =>
        import('@/views/modules/marketing/automated/add-automated'),
      name: 'marketing-Automated-addAutomated',
      meta: {
        title: '自动化营销--模板也'
      }
    },
    {
      path: '/draw',
      component: () => import('@/views/modules/marketing/automated/draw'),
      name: 'marketing-Automated-draw',
      meta: {
        title: '自动化营销--绘图'
      }
    },
    {
      path: '/lookdraw',
      component: () => import('@/views/modules/marketing/automated/lookdraw'),
      name: 'marketing-Automated-Lookdraw',
      meta: {
        title: '自动化营销--查看绘图'
      }
    },
    {
      path: '/startTrigger',
      component: () =>
        import('@/views/modules/marketing/automated/start-trigger'),
      name: 'marketing-Automated-startTrigger',
      meta: {
        title: '自动化营销--新建开始触发器'
      }
    }, {
      path: '/singl-marketing',
      component: () =>
        import('@/views/modules/marketing/automated/singl-marketing'),
      name: 'singl-marketing',
      meta: {
        title: '自动化营销--新建单次营销'
      }
    }, {
      path: '/singl-marketing-draw',
      component: () =>
        import('@/views/modules/marketing/automated/singl-marketing-draw'),
      name: 'singl-marketing-draw',
      meta: {
        title: '自动化营销--新建单次营销绘图'
      }
    }, {
      path: '/cycle-marketing',
      component: () =>
        import('@/views/modules/marketing/automated/cycle-marketing'),
      name: 'cycle-marketing',
      meta: {
        title: '自动化营销--新建周期营销'
      }
    }, {
      path: '/cycle-marketing-draw',
      component: () =>
        import('@/views/modules/marketing/automated/cycle-marketing-draw'),
      name: 'cycle-marketing-draw',
      meta: {
        title: '自动化营销--新建周期营销绘图'
      }
    }, {
      path: '/festival-marketing',
      component: () =>
        import('@/views/modules/marketing/automated/festival-marketing'),
      name: 'festival-marketing',
      meta: {
        title: '自动化营销--新建节日营销'
      }
    }, {
      path: '/festival-marketing-draw',
      component: () =>
        import('@/views/modules/marketing/automated/festival-marketing-draw'),
      name: 'festival-marketing-draw',
      meta: {
        title: '自动化营销--新建节日营销绘图'
      }
    },
    {
      path: '/add',
      component: () =>
        import('@/views/modules/mall-management/logistics/company/add'),
      name: 'mall-management/logistics-company-add',
      meta: {
        title: '添加物流公司'
      }
    },
    {
      path: '/add',
      component: () =>
        import('@/views/modules/mall-management/logistics/management/add'),
      name: 'mall-management/logistics-management-add',
      meta: {
        title: '新建运费模板'
      }
    },
    {
      path: '/addGroupMessage',
      component: () =>
        import('@/views/modules/wechat/group-messages/add-group-message'),
      name: 'wechat-add-group-message',
      meta: {
        title: '新建群发消息'
      }
    },
    {
      path: '/editGroupMessage',
      component: () =>
        import('@/views/modules/wechat/group-messages/edit-group-message'),
      name: 'wechat-edit-group-message',
      meta: {
        title: '编辑群发消息'
      }
    },
    {
      path: '/triggerAdd',
      component: () => import('@/views/modules/wechat/trigger/trigger-add'),
      name: 'wechat-trigger-triggerAdd',
      meta: {
        title: '新增触发器'
      }
    },
    {
      path: '/trigger-edit',
      component: () => import('@/views/modules/wechat/trigger/trigger-edit'),
      name: 'wechat-trigger-triggerEdit',
      meta: {
        title: '编辑触发器'
      }
    },
    {
      path: '/label-arrInfo',
      component: () =>
        import('@/views/modules/member/user/label-management/label-arr-info'),
      name: 'member-user-userManagement-labelArrInfo',
      meta: {
        title: '编辑标签组'
      }
    },
    // {
    //   path: '/sweepstakesInfo',
    //   component: () =>
    //       import('@/views/modules/marketing/lottery/sweepstakes-info'),
    //   name: 'sweepstakesInfo',
    //   meta: {
    //     title: '编辑抽奖'
    //   }
    // },
    {
      path: '/add-lottery',
      component: () =>
        import('@/views/modules/marketing/lottery/sweepstakes-info'),
      name: 'add-lottery',
      meta: {
        title: '编辑抽奖'
      }
    },
    {
      path: '/sweepDataTable',
      component: () =>
        import('@/views/modules/marketing/lottery/sweep-data-table'),
      name: 'sweepDataTable',
      meta: {
        title: '抽奖数据'
      }
    },
    {
      path: '/signInAdd',
      component: () => import('@/views/modules/marketing/sign-in/sign-in-add'),
      name: 'signInAdd',
      meta: {
        title: '创建签到'
      }
    },
    {
      path: '/signInEdit',
      component: () => import('@/views/modules/marketing/sign-in/sign-in-edit'),
      name: 'signInEdit',
      meta: {
        title: '编辑签到'
      }
    },
    {
      path: '/signInStatistics',
      component: () =>
        import('@/views/modules/marketing/sign-in/sign-in-statistics'),
      name: 'signInStatistics',
      meta: {
        title: '签到统计'
      }
    },
    {
      path: '/imageDetails',
      component: () =>
        import('@/views/modules/data-center/image-text/image-details'),
      name: 'imageDetails',
      meta: {
        title: '图文详情'
      }
      // addBrand
    },
    {
      path: 'brandSys-addBrand',
      component: () => import('@/views/modules/brandSys/addBrand'),
      name: 'brandSys-addBrand',
      meta: {
        title: '添加品牌'
      }
    },
    {
      path: '/member/user-sys/reuser-sys',
      component: () => import('@/views/modules/member/user-sys/reuser-sys'),
      name: 'member-user-sys-reuser-sys',
      meta: {
        title: '编辑标签'
      }
    },
    {
      path: '/add-Integral',
      component: () =>
        import('@/views/modules/marketing/integralMall/addIntegral'),
      name: 'add-Integral',
      meta: {
        title: '积分商城'
      }
    },
    {
      path: '/data-Integral',
      component: () =>
        import('@/views/modules/marketing/integralMall/dataIntegral'),
      name: 'data-Integral',
      meta: {
        title: '积分商城'
      }
    },
    {
      path: '/customer-details',
      component: () =>
        import('@/views/modules/customer-management/customer-details'),
      name: 'customer-details',
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/rights-management-component-addDepatmentMember',
      component: () =>
        import('@/views/modules/rights-management/component/addDepatmentMember'),
      name: 'rights-management-component-addDepatmentMember',
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/customer-management-customer-add-customer-untracked',
      component: () =>
        import('@/views/modules/customer-management/customer/add-customer-untracked'),
      name: 'customer-management-customer-add-customer-untracked',
      meta: {
        title: '客户公海-添加公海客户'
      }
    },
    {
      path: '/customer-management-customer-customer-detail',
      component: () =>
        import('@/views/modules/customer-management/customer/customer-detail'),
      name: 'customer-management-customer-customer-detail',
      meta: {
        title: '客户公海-客户详情'
      }
    },
    // //盛裕开始
    {
      path: '/permission-add-department-member',
      component: () =>
        import(
          '@/views/modules/surbanajurong/permission/component/addDepatmentMember'
        ),
      name: 'permission-add-department-member',
      meta: {
        title: '添加部门和人员'
      }
    },
    {
      path: '/surbanajurong-website-add-project',
      component: () =>
        import('@/views/modules/surbanajurong/website/add-project'),
      name: 'surbanajurong-website-add-project',
      meta: {
        title: '官网管理-添加项目'
      }
    },
    {
      path: '/surbanajurong-website-add-tracking',
      component: () =>
        import('@/views/modules/surbanajurong/website/add-tracking'),
      name: 'surbanajurong-website-add-tracking',
      meta: {
        title: '官网管理-添加tracking'
      }
    },
    {
      path: '/surbanajurong-website-add-more-project',
      component: () =>
        import('@/views/modules/surbanajurong/website/add-more-project'),
      name: 'surbanajurong-website-add-more-project',
      meta: {
        title: '官网管理-添加更多项目'
      }
    },
    {
      path: '/surbanajurong-website-add-company-logo',
      component: () =>
        import('@/views/modules/surbanajurong/website/add-company-logo'),
      name: 'surbanajurong-website-add-company-logo',
      meta: {
        title: '官网管理-添加公司logo'
      }
    },
    {
      path: '/surbanajurong-customer-add-customer-untracked',
      component: () =>
        import('@/views/modules/surbanajurong/customer/add-customer-untracked'),
      name: 'surbanajurong-customer-add-customer-untracked',
      meta: {
        title: '客户公海-添加公海客户'
      }
    },
    {
      path: '/surbanajurong-customer-add-my-customer',
      component: () =>
        import('@/views/modules/surbanajurong/customer/add-my-customer'),
      name: 'surbanajurong-customer-add-my-customer',
      meta: {
        title: '客户公海-添加我的客户'
      }
    },
    {
      path: '/surbanajurong-customer-customer-detail',
      component: () =>
        import('@/views/modules/surbanajurong/customer/customer-detail'),
      name: 'surbanajurong-customer-customer-detail',
      meta: {
        title: '客户公海-客户详情'
      }
    },
    {
      path: '/surbanajurong-project-add-project',
      component: () =>
        import('@/views/modules/surbanajurong/project/add-project'),
      name: 'surbanajurong-project-add-project',
      meta: {
        title: '项目管理-添加项目'
      }
    },
    {
      path: '/surbanajurong-project-project-list',
      component: () =>
        import('@/views/modules/surbanajurong/project/project-list'),
      name: 'surbanajurong-project-project-list',
      meta: {
        title: '项目管理-项目列表'
      }
    },
    {
      path: '/surbanajurong-wechat-member-member-detail',
      component: () =>
        import('@/views/modules/surbanajurong/wechat/member/member-detail'),
      name: 'surbanajurong-wechat-member-member-detail',
      meta: {
        title: '关注粉丝-粉丝详情'
      }
    },
    {
      path: '/storeManagement-addStaff',
      component: () => import('@/views/modules/store-management/add-staff'),
      name: 'storeManagement-addStaff',
      meta: {
        title: '门店管理-添加店员'
      }
    },
    {
      path: '/storeManagement-StaffList',
      component: () => import('@/views/modules/store-management/StaffList'),
      name: 'storeManagement-StaffList',
      meta: {
        title: '门店管理-店员管理'
      }
    },
    {
      path: '/storeManagement-Store',
      component: () => import('@/views/modules/store-management/list'),
      name: 'storeManagement-Store',
      meta: {
        title: '门店管理'
      }
    },
    {
      path: '/storeManagement-commentList',
      component: () => import('@/views/modules/store-management/commentList'),
      name: 'storeManagement-commentList',
      meta: {
        title: '门店管理-评论管理'
      }
    },
    {
      path: '/storeManagement-reservationList',
      component: () =>
        import('@/views/modules/store-management/reservationList'),
      name: 'storeManagement-reservationList',
      meta: {
        title: '门店管理-预约管理'
      }
    },

    // //盛裕结束
    // gasfun迁移模块↓
    {
      path: '/commodity-sort-sort-add',
      component: () => import('@/views/modules/commodity/sort/sort-add'),
      name: 'commodity-sort-sort-add',
      meta: {
        title: '添加分类'
      }
    },
    {
      path: '/commodity-sort-sub-item',
      component: () => import('@/views/modules/commodity/sort/sub-item'),
      name: 'commodity-sort-sub-item',
      meta: {
        title: '添加子分类'
      }
    },
    {
      path: '/commodity-goods-new-products',
      component: () => import('@/views/modules/commodity/goods/new-products'),
      name: 'commodity-goods-new-products',
      meta: {
        title: '新增商品'
      }
    },
    {
      path: '/commodity-goods-new-products1',
      component: () => import('@/views/modules/commodity/goods/new-products1'),
      name: 'commodity-goods-new-products1',
      meta: {
        title: '新增商品'
      }
    },
    // onShelf
    {
      path: '/commodity-goods-onShelf',
      component: () =>
        import('@/views/modules/commodity/goods/onShelf'),
      name: 'commodity-goods-onShelf',
      meta: {
        title: '批量上下架'
      }
    },
    {
      path: '/order-management-order-order-details',
      component: () =>
        import('@/views/modules/order-management/order/order-details'),
      name: 'order-management-order-order-details',
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/distribution.distributor.search',
      component: () =>
        import('@/views/modules/distribution/distributor/search'),
      name: 'distribution.distributor.search',
      meta: {
        title: '明细记录'
      }
    },
    {
      path: '/home-page-banner-edit-banner',
      component: () => import('@/views/modules/home-page/banner/edit-banner'),
      name: 'home-page-banner-edit-banner',
      meta: {
        title: '编辑轮播图'
      }
    },
    {
      path: '/home-page-adsense-edit',
      component: () => import('@/views/modules/home-page/adsense/edit'),
      name: 'home-page-adsense-edit',
      meta: {
        title: '编辑首页广告位'
      }
    },
    {
      path: '/home-page-new-people-edit-vip',
      component: () => import('@/views/modules/home-page/new-people/edit-vip'),
      name: 'home-page-new-people-edit-vip',
      meta: {
        title: '编辑新人专享'
      }
    },
    {
      path: '/home-page-hot-brands-brands-edit',
      component: () =>
        import('@/views/modules/home-page/hot-brands/brands-edit'),
      name: 'home-page-hot-brands-brands-edit',
      meta: {
        title: '编辑品牌'
      }
    },
    {
      path: '/home-page-community-edit',
      component: () => import('@/views/modules/home-page/community/edit'),
      name: 'home-page-community-edit',
      meta: {
        title: '编辑社区'
      }
    },
    {
      path: '/marketing-voucher-center-add-center',
      component: () =>
        import('@/views/modules/marketing/voucher-center/add-center'),
      name: 'marketing-voucher-center-add-center',
      meta: {
        title: '编辑卡券'
      }
    }, {
      path: '/permission-user-management-sys-user-info',
      component: () =>
        import('@/views/modules/permission/user-management/sys-user-info'),
      name: 'permission-user-management-sys-user-info',
      meta: {
        title: '角色'
      }
    },
    // gasfun迁移模块↑
    {
      path: '/financial-sub-account-look-up',
      component: () =>
        import('@/views/modules/financial/sub-account/look-up'),
      name: 'financial-sub-account-look-up',
      meta: {
        title: '角色'
      }
    },

    // 海森堡迁移模块
    {
      path: '/haxnbauer-add-store',
      component: () =>
        import('@/views/modules/store-management/haxnbauer/add-store'),
      name: 'haxnbauer-add-store',
      meta: {
        title: '添加门店'
      }
    }, {
      path: '/haxnbauer-store-list',
      component: () =>
        import('@/views/modules/store-management/haxnbauer/list'),
      name: 'haxnbauer-store-list',
      meta: {
        title: '门店列表'
      }
    }, {
      path: '/haxnbauer-add-coupons',
      component: () =>
        import('@/views/modules/marketing/haxnbauer-coupons/add-coupon'),
      name: 'haxnbauer-add-coupons',
      meta: {
        title: '添加卡券'
      }
    }, {
      path: '/haxnbauer-add-couponHandle',
      component: () =>
        import('@/views/modules/marketing/haxnbauer-coupons/coupon-handle'),
      name: 'haxnbauer-add-couponHandle',
      meta: {
        title: '编辑卡券'
      }
    }, {
      path: '/haxnbauer-coupons-list',
      component: () =>
        import('@/views/modules/marketing/haxnbauer-coupons/list'),
      name: 'haxnbauer-coupons-list',
      meta: {
        title: '卡券列表'
      }
    },
    {
      path: '/haxnbauer-signInAdd',
      component: () => import('@/views/modules/marketing/haxnbauer-sign-in/sign-in-add'),
      name: 'haxnbauer-signInAdd',
      meta: {
        title: '创建签到'
      }
    },
    {
      path: '/haxnbauer-signInEdit',
      component: () => import('@/views/modules/marketing/haxnbauer-sign-in/sign-in-edit'),
      name: 'haxnbauer-signInEdit',
      meta: {
        title: '编辑签到'
      }
    },
    {
      path: '/haxnbauer-signInStatistics',
      component: () =>
        import('@/views/modules/marketing/haxnbauer-sign-in/sign-in-statistics'),
      name: 'haxnbauer-signInStatistics',
      meta: {
        title: '签到统计'
      }
    },
    // 导购管理里面的小模块
    // 添加导购
    {
      path: '/environmentManagement-openList-addShoppers',
      component: () =>
        import('@/views/modules/environmentManagement/openList/addShoppers'),
      name: 'environmentManagement-openList-addShoppers',
      meta: {
        title: '添加导购'
      }
    },
    // 商城管理
    // 商城里面的首页管理先写在这里
    {
      path: '/mall-management-mall-age',
      component: () =>
        import('@/views/modules/mall-management/mall-age'),
      name: 'mall-management-mall-age',
      meta: {
        title: '首页管理'
      }
    },
    // 首页设置
    {
      path: '/mall-management-mall-age-setMallHomePage',
      component: () =>
        import('@/views/modules/mall-management/mall-age/setMallHomePage'),
      name: 'mall-management-mall-age-setMallHomePage',
      meta: {
        title: '首页设置'
      }
    }
  ]
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: pageRoutes.concat(moduleRoutes)
})

router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // 路由拦截
  const token = sessionStorage.getItem('token')
  if (token == null || token == undefined) {
    if (to.name != 'login') {
      next('/login')
    }
  }
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  // 添加动态(菜单)路由
  // 已添加或者当前路由为页面路由, 可直接访问
  if (
    window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] ||
    fnCurrentRouteIsPageRoute(to, pageRoutes)
  ) {
    return next()
  }
  console.log(
    "localStorage.getItem('userInfo-1.6.18')",
    localStorage.getItem('userInfo-1.6.18')
  )
  const id = JSON.parse(localStorage.getItem('userInfo-1.6.18')).roleIds[0]
  // 获取按钮权限
  ButtonMenuList(id).then(res => {
    if (res.code == 0) {
      if (res.data) {
        const buttonPermission = {}
        res.data.map(val => {
          if (val.path != '') {
            buttonPermission[val.path] = val.path
          }
          localStorage.setItem(
            'buttonPermission',
            JSON.stringify(buttonPermission)
          )
        })
      }
    }
  })
  // 获取菜单列表, 添加并全局变量保存
  getMenuList(id)
    .then(res => {
      // 性能优化 提前计算出路由 id 和 route 属性的对照
      let permissions = []
      if (res.data[0].childList && res.data[0].childList.length > 0) {
        permissions = res.data[0].childList
        getNavTitle(permissions)
      }

      /** ***************开发零临时加菜单开始********************/

      const ArrayList = [{
          appName: 'user-service',
          childList: [{
              appName: 'member-service',
              childList: [],
              createTime: 1569306690000,
              iconCls: '',
              id: 1001,
              name: "{'en_US': 'Member Register', 'zh_CN': '营销管理'}",
              orderNum: 1,
              parentId: 'oc.marketing.*',
              path: 'marketing.automation-marketing.automation',
              permission: 'oc.marketing.automation-marketing.automation',
              title: '自动化营销',
              type: 1,
              updateTime: 1572511052000,
              url: null,
              visible: true
            }
            // { // 暂时不显示
            // appName: 'member-service',
            // childList: [],
            // createTime: 1569306690000,
            // iconCls: '',
            // id: 1002,
            // name: "{'en_US': 'Member Register', 'zh_CN': '领券中心'}",
            // orderNum: 1,
            // parentId: 'oc.marketing.*',
            // path: 'marketing.voucher-center.list',
            // permission: 'oc.marketing.voucher-center.list',
            // title: '领券中心',
            // type: 1,
            // updateTime: 1572511052000,
            // url: null,
            // visible: true
            // }
          ],
          createTime: 1564034706000,
          iconCls: 'oc-rzgl',
          id: 1000,
          name: "{'en_US':'Data Center','zh_CN':'营销管理'}",
          title: '营销管理',
          orderNum: 1,
          parentId: 'oc.*',
          path: '',
          permission: 'oc.permission.*',
          type: 1,
          updateTime: 1572574879000,
          url: null,
          visible: true
        },
        {
          appName: 'user-service',
          childList: [{
              appName: 'member-service',
              childList: [],
              createTime: 1569306690000,
              iconCls: '',
              id: 3001,
              name: "{'en_US': 'Opens A List', 'zh_CN': '客户列表'}",
              orderNum: 1,
              parentId: 'oc.marketing.*',
              path: 'customer-management.customer-list',
              permission: 'oc.customer-management.customer-list',
              title: '客户列表',
              type: 1,
              updateTime: 1572511052000,
              url: null,
              visible: true
            },
            // {
            // appName: 'member-service',
            // childList: [],
            // createTime: 1569306690000,
            // iconCls: '',
            // id: 3002,
            // name: "{'en_US': 'Opens A List', 'zh_CN': '我的客户'}",
            // orderNum: 1,
            // parentId: 'oc.marketing.*',
            // path: 'customer-management.customer.my-customer',
            // permission: 'oc.customer-management.customer.my-customer',
            // title: '我的客户',
            // type: 1,
            // updateTime: 1572511052000,
            // url: null,
            // visible: true
            // },
            {
              appName: 'member-service',
              childList: [],
              createTime: 1569306690000,
              iconCls: '',
              id: 3003,
              name: "{'en_US': 'Opens A List', 'zh_CN': '客户公海'}",
              orderNum: 1,
              parentId: 'oc.marketing.*',
              path: 'customer-management.customer.customer-untracked',
              permission: 'oc.customer-management.customer.customer-untracked',
              title: '客户公海',
              type: 1,
              updateTime: 1572511052000,
              url: null,
              visible: true
            }
          ],
          createTime: 1564034706000,
          iconCls: 'oc-rzgl',
          id: 3000,
          name: "{'en_US':'Environment Management','zh_CN':'客户管理'}",
          title: '客户管理',
          orderNum: 1,
          parentId: 'oc.*',
          path: '',
          permission: 'oc.permission.*',
          type: 1,
          updateTime: 1572574879000,
          url: null,
          visible: true
        }, {
          appName: 'user-service',
          childList: [{
            appName: 'member-service',
            childList: [],
            createTime: 1569306690000,
            iconCls: '',
            id: 3011,
            name: "{'en_US': 'Opens A List', 'zh_CN': '人员管理-核销端'}",
            orderNum: 1,
            parentId: 'oc.marketing.*',
            path: 'rights-management.permission-department-menber',
            permission: 'oc.rights-management.permission-department-menber',
            title: '人员管理-核销端',
            type: 1,
            updateTime: 1572511052000,
            url: null,
            visible: true
          }, {
            appName: 'member-service',
            childList: [],
            createTime: 1569306690000,
            iconCls: '',
            id: 3012,
            name: "{'en_US': 'Opens A List', 'zh_CN': '角色管理-核销端'}",
            orderNum: 1,
            parentId: 'oc.marketing.*',
            path: 'rights-management.permission-role',
            permission: 'oc.rights-management.permission-role',
            title: '角色管理-核销端',
            type: 1,
            updateTime: 1572511052000,
            url: null,
            visible: true
          }],
          createTime: 1564034706000,
          iconCls: 'oc-yhqx',
          id: 3010,
          name: "{'en_US':'Environment Management','zh_CN':'权限管理-核销端'}",
          title: '角色管理-核销端',
          orderNum: 1,
          parentId: 'oc.*',
          path: '',
          permission: 'oc.permission.*',
          type: 1,
          updateTime: 1572574879000,
          url: null,
          visible: true
        }
      ]

      if (
        process.env.NODE_ENV == 'development' ||
        process.env.NODE_ENV == 'v2'
      ) {
        permissions = permissions.concat(ArrayList)
      }
      addDomList.forEach(d => {
        permissions = addChildList(permissions, d.fdom, d.cdom)
      })
      /** ***************开发零临时加菜单结束*****************/
      console.log('permissions', permissions)
      window.SITE_CONFIG['menuList'] = permissions
      fnAddDynamicMenuRoutes(permissions)

      const routeNameDict = renrenMenuToRouteDict(permissions, 'name')
      const routePathDict = renrenMenuToRouteDict(permissions, 'path')
      store.commit(
        'd2admin/menu/asideSet',
        renrenMenuToD2AdminMenu(permissions, routeNameDict)
      )
      store.commit(
        'd2admin/page/init',
        renrenMenuToD2AdminPageInitData(
          permissions,
          routeNameDict,
          routePathDict
        )
      )
      store.commit(
        'd2admin/search/init',
        renrenMenuToD2AdminSearchInitData(
          permissions,
          routeNameDict,
          routePathDict
        )
      )
      next({
        ...to,
        replace: true
      })
      // 进度条
      NProgress.done()
    })
    .catch(error => {
      console.log('error', error)
      next({
        name: 'login'
      })
      // 进度条
      NProgress.done()
    })
})

let colorList = ['#67c23a', '#e6a23c', '#f56c6c', '#0486FE']
/* 递归设置菜单中英文*/
function getNavTitle(navList, str) {
  const language = cookieGet('language') || 'zh-CN'
  navList.map(val => {
    if (language == 'zh-CN') {
      val.title = JSON.parse(val.name)['zh_CN']
    } else {
      val.title = JSON.parse(val.name)['en_US']
    }
    if (str == undefined || str == null) {
      val.fill = colorList[0]
      colorList.splice(0, 1)
      if (colorList.length == 0) {
        colorList = ['#67c23a', '#e6a23c', '#f56c6c', '#0486FE']
      }
    }
    if (val.childList.length > 0) {
      getNavTitle(val.childList, 2)
    }
  })
}

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function fnCurrentRouteIsPageRoute(route, pageRoutes = []) {
  // console.log('判断当前路由是否为页面路由',route, pageRoutes)
  var temp = []
  for (var i = 0; i < pageRoutes.length; i++) {
    if (route.path === pageRoutes[i].path) {
      return true
    }
    if (pageRoutes[i].childList && pageRoutes[i].childList.length >= 1) {
      temp = temp.concat(pageRoutes[i].childList)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteIsPageRoute(route, temp) : false
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].childList && menuList[i].childList.length >= 1) {
      temp = temp.concat(menuList[i].childList)
      continue
    }
    // 组装路由
    var route = {
      path: '',
      component: null,
      name: '',
      meta: {
        ...window.SITE_CONFIG['contentTabDefault'],
        menuId: menuList[i].id,
        title: menuList[i].title
      }
    }
    // TODO: 因为下面的 eval(s2) 导致暂时只能使用 window.SITE_CONFIG 全局变量。s2的值中存在这段代码
    // eslint-disable-next-line
    let URL = (menuList[i].path.split('.').join('/') || '').replace(
      /{{([^}}]+)?}}/g,
      // eslint-disable-next-line no-eval
      (s1, s2) => eval(s2)
    ) // URL支持{{ window.xxx }}占位符变量
    URL = URL.replace(/^\//, '').replace(/_/g, '-')
    route['path'] = route['name'] = URL.replace(/\//g, '-')
    route['component'] = () => import(`@/views/modules/${URL}`)

    routes.push(route)
    // console.log('打印router', route)
  }
  if (temp.length >= 1) {
    return fnAddDynamicMenuRoutes(temp, routes)
  }
  // 添加路由
  router.addRoutes([{
      ...moduleRoutes,
      name: 'main-dynamic-menu',
      children: routes
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ])
  window.SITE_CONFIG['dynamicMenuRoutes'] = routes
  window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = true
  // console.log('总路由列表', routes)
}

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
})

export default router