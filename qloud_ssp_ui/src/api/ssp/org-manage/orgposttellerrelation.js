/*
 * @Descripttion: 机构岗位人员关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:39:17
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 17:51:43
 */ 

import serveData from "../serveData.js"
import request from '@/utils/request'

//列表
export function queryOrgPostTellerRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/queryOrgPostTellerRelation',
    method: 'post',
    data
  })
}

//新增
export function createOrgPostTellerRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/createOrgPostTellerRelation',
    method: 'post',
    data
  })
}

//修改
export function modifyOrgPostTellerRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/modifyOrgPostTellerRelation',
    method: 'post',
    data
  })
}

//删除
export function deleteOrgPostTellerRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/deleteOrgPostTellerRelation',
    method: 'post',
    data
  })
}

//查询未关联的岗位信息
export function queryNotExistTellerRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/queryNotExistTellerRelation',
    method: 'post',
    data
  })
}