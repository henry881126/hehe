/*
 * @Descripttion: 全局配置
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:18:06
 */
module.exports = {

  title: '华软金科-SSP',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {String} medium | small | mini
   * @description 全局尺寸
   */
  size:"mini",
  // 分页组件每页显示条数设置
  pageSizes:[10,20,50,100],
  // 分页layout配置
  pageLayout:"total,sizes,prev, pager, next, jumper",
  // 分页页码按钮的数量
  pagerCount:7,
  /**
   * @type {obj} clientId | clientSecret
   * @description system identification
   */
  clientInfo: {
    clientId: 'QloudSSP',
    clientSecret: 'QloudSSP'
  }
}
