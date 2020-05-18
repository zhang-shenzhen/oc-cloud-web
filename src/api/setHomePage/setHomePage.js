
// 首页配置管理

import {
    HttpGet,
    HttpPost,
    HttpPut,
    HttpDelete
  } from '../index'
  const apis = {
    AddPage:"marketing/mall/retail/home-page/config",//新增首页
    AllSearch:"marketing/mall/retail/home-page/config/list",//全部查询
    StatusSwitch:"marketing/mall/retail/home-page/config/on-off",//状态开关
    DeleteHomePage:"marketing//mall/retail/home-page/config",//删除页面
    GetHomePageMessage:"marketing/mall/retail/home-page/config/get",//获取页面详情
    UpdateHomePage:"marketing/mall/retail/home-page/config"//更新详情

  }
  // 新增首页
export const AddPage = (params) => HttpPost(apis.AddPage, params);
//查询全部
export const AllSearch = (params) => HttpGet(apis.AllSearch, params);
//状态开关
export const StatusSwitch = (params) => HttpPut(apis.StatusSwitch+ '/' + params.id);
//删除页面
export const DeleteHomePage = (params) => HttpDelete(apis.DeleteHomePage+ '/' + params.id);
//获取页面详情
export const GetHomePageMessage = (params) => HttpGet(apis.GetHomePageMessage+ '/' + params.id);
//更新详情
export const UpdateHomePage = (params) => HttpPut(apis.UpdateHomePage,params);


