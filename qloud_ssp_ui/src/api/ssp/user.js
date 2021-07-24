/*
 * @Author: Ray haiyoung
 * @Date: 2020-07-29 09:28:26
 * @Last Modified by: Ray haiyoung
 * @Last Modified time: 2020-07-29 14:20:35
 */
import serveData from "./serveData.js"
import request from '@/utils/request'

//获取所有父级菜单列表
export function fechAllPranteMenus(query) {
  return request({
    url: '/exportWorkFlow/1',
    method: 'get',
    params: query
  })
}

//创建菜单
export function createMenu(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: '/queryOrgPostRelation',
    method: 'post',
    data
  })
}
