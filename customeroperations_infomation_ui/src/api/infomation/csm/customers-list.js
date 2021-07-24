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
export function custClassificationGroupList(data) {
  return request({
    url: '/http/jsonService/queryRoleListInfo',
    method: 'post',
    data: mergeMethods(data)
  })
}