/*
 * @Descripttion: 组织机构
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:39:17
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-30 17:19:06
 */ 

import serveData from "../serveData.js"
import request from '@/utils/request'

//获取组织机构列表
export function queryOrgList(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/queryOrgByCombConditions',
    method: 'post',
    data
  })
}

//组织机构新增
export function createOrg(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/createOrg',
    method: 'post',
    data
  })
}

//组织机构修改
export function updateOrg(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/modifyOrg',
    method: 'post',
    data
  })
}

