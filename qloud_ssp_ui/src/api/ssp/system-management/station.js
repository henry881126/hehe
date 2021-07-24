/*
 * @Descripttion: 组织机构
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:39:17
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-29 14:08:01
 */ 

import { mergeMethods } from '../serveData.js'
import request from '@/utils/request'

//获取组织机构列表
export function queryStationList(data) {
  return request({
    url: '/http/jsonService/queryVaguePostList',
    method: 'post',
    data: mergeMethods(data)
  })
}

//组织机构新增
export function addStationSubmit(data) {
  return request({
    url: '/http/jsonService/createPost',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 修改场景
export function updateStation(data) {
  return request({
    url: '/http/jsonService/modifyPost',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 删除场景
export function deleteStation(data) {
  return request({
    url: '/http/jsonService/deletePost',
    method: 'post',
    data: mergeMethods(data)
  })
}