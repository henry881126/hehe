/*
 * @Descripttion:ssp工程共用接口
 * @version:
 * @Author: tangpingying
 * @Date: 2020-07-29 13:39:17
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:39:32
 */

import serveData from "./serveData.js"
import request from '@/utils/request'

//获取机构类型
export function queryOrgType(data) {
  Object.prototype.hasOwnProperty(data,"Header") ? data : Object.assign(data,serveData);
  return request({
    url: '/http/jsonService/queryManagerPartyType',
    method: 'post',
    data
  })
}

/**
 * 数据字典获取指定paramGroupId的集合信息
 * paramGroupId:机构状态：100007，机构级别：100008，资源状态：100016，操作方式：100020
 * @param {paramGroupId} query
 */
export function queryCommonParamList(data) {
  Object.prototype.hasOwnProperty(data,"Header") ? data : Object.assign(data,serveData);
  return request({
    url: '/http/jsonService/queryCommonParamList',
    method: 'post',
    data
  })
}
/**
 * 组织机构树
 * @param {*} data 
 */
export function queryOrgTree(data) {
  Object.prototype.hasOwnProperty(data,"Header") ? data : Object.assign(data,serveData);
  return request({
    url: '/http/jsonService/getOrgTree',
    method: 'post',
    data
  })
}

/**
 * 组织机构列表
 * @param {*} data 
 */
export function queryOrgList(data) {
  Object.prototype.hasOwnProperty(data,"Header") ? data : Object.assign(data,serveData);
  return request({
    url: '/http/jsonService/queryOrgList',
    method: 'post',
    data
  })
}