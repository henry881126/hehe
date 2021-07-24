/**
 *@ Descripttion: 菜单
 *@ version:
 *@ Author: zhanghuan
 *@ Date:2020-08-03 16:03:07
 *@ LastEditors: zhanghuan
 *@ LastEditTime: 2020-08-03 16:03:07
 **/
import { mergeMethods } from '../serveData.js'
import request from '@/utils/request'

// 获取菜单列表
export function queryMenuList(data) {
  return request({
    url: '/http/jsonService/queryMenuList',
    method: 'post',
    data: mergeMethods(data)
  })
}

