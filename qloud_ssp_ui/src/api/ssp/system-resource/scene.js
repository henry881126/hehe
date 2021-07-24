/**
*@ Descripttion: 场景
*@ version:
*@ Author: zhanghuan
*@ Date:2020-07-29 16:03:07
*@ LastEditors: zhanghuan
*@ LastEditTime: 2020-07-29 16:03:07
**/
import { mergeMethods } from '../serveData.js'
import request from '@/utils/request'

// 获取场景列表
export function querySourceList(data) {
  return request({
    url: '/http/jsonService/querySourceList',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 新增场景
export function addSource(data) {
  return request({
    url: '/http/jsonService/addSource',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 修改场景
export function updateSource(data) {
  return request({
    url: '/http/jsonService/updateSource',
    method: 'post',
    data: mergeMethods(data)
  })
}
// 删除场景
export function deleteSource(data) {
  return request({
    url: '/http/jsonService/deleteSource',
    method: 'post',
    data: mergeMethods(data)
  })
}

