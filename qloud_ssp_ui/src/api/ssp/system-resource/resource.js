/**
 *@Descripttion: 资源
 *@version:
 *@Author: zhanghuan
 *@Date:2020-07-29 16:03:07
 *@LastEditors: zhanghuan
 *@LastEditTime: 2020-07-29 16:03:07
 **/
import { mergeMethods } from '../serveData.js'
import request from '@/utils/request'

// 获取资源列表
export function queryWebAppSourcePermission(data) {
  return request({
    url: '/http/jsonService/queryWebAppSourcePermission',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 新增资源权限
export function addWebAppSource(data) {
  return request({
    url: '/http/jsonService/addWebAppSource',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 修改资源权限
export function updateWebAppSource(data) {
  return request({
    url: '/http/jsonService/updateWebAppSource',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 删除资源权限
export function deleteWebAppSource(data) {
  return request({
    url: '/http/jsonService/deleteWebAppSource',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 查询菜单树
export function queryMenuListForTree(data) {
  return request({
    url: '/http/jsonService/queryMenuListForTree',
    method: 'post',
    data: mergeMethods(data)
  })
}

// 查询未关联资源的权限
export function queryPermissionNoRelSource(data) {
  return request({
    url: '/http/jsonService/queryPermissionNoRelSource',
    method: 'post',
    data: mergeMethods(data)
  })
}
