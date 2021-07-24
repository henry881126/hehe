/*
 * @Descripttion: 岗位机构关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:39:17
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:20:53
 */ 

import serveData from "../serveData.js"
import request from '@/utils/request'

//列表
export function queryOrgPostRelationList(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/queryOrgPostRelation',
    method: 'post',
    data
  })
}

//新增
export function createOrgPostRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/createOrgPostRelation',
    method: 'post',
    data
  })
}

//修改
export function modifyOrgPostRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/modifyOrgPostRelation',
    method: 'post',
    data
  })
}

//删除
export function deleteOrgPostRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/deleteOrgPostRelation',
    method: 'post',
    data
  })
}

//查询未关联的岗位信息
export function queryNotExistPostRelation(data) {
  Object.prototype.hasOwnProperty.call(data,'Header') ? data.Header = Object.assign(serveData.Header, data.Header) : Object.assign(data, serveData)
  return request({
    url: '/http/jsonService/queryNotExistPostRelation',
    method: 'post',
    data
  })
}