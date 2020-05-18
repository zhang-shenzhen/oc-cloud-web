

import {
    HttpGet,
    HttpPost,
    HttpPut,
    HttpDelete
  } from '../index'
  
  // 省市区
  const apis = {
    memberRegisterConfig:'/member/info/config',//接口描述：查找指定公众号的会员配置信息 POST //接口描述：设置公众号会员配置（新增或修改）
    
  }
  
  // 查找指定公众号的会员配置信息
  export const memberRegisterConfig = (params) => HttpGet(apis.memberRegisterConfig, params)
  // 设置公众号会员配置（新增或修改）
  export const memberRegisterConfigPost = params => HttpPost(apis.memberRegisterConfig, params)

 
  