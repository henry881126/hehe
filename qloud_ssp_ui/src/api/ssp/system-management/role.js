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

//获取角色列表
export function roleList(data) {
  return request({
    url: '/http/jsonService/queryRoleListInfo',
    method: 'post',
    data: mergeMethods(data)
  })
}

//组织机构新增
export function addRole(data) {
  return request({
    url: '/http/jsonService/createRole',
    method: 'post',
    data: mergeMethods(data)
  })
}


// 修改场景
export function updateRole(data) {
  return request({
    url: '/http/jsonService/modifyRole',
    method: 'post',
    data: mergeMethods(data)
  })
}


// 删除场景
export function deleteRole(data) {
  return request({
    url: '/http/jsonService/deleteRole',
    method: 'post',
    data: mergeMethods(data)
  })
}

//权限分配
export function PermissionsListRole(data) {
  return request({
    url: '/http/jsonService/queryNotExistPermissions',
    method: 'post',
    data: mergeMethods(data)
  })
}

