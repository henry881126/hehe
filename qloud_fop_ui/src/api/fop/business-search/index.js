/*
 * @Author: LeiRuiQi
 * @Date: 2020-07-29 15:43:45
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-04 17:53:45
 */ 
import serveData from "../serveData.js"
import request from '@/utils/request'

// 流程实例汇总查询
export function flowInstanceAllSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/queryRunInstanceCount",
    method: "post",
    data
  })
}

// 流程实例检索
export function flowInstanceSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/queryRunInstance",
    method: "post",
    data
  })
}

// 流程实例流程表单
export function flowInstanceTable(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/queryApproveRecord",
    method: "post",
    data
  })
}

// 流程实例挂起 和 恢复
export function flowInstanceHangUp(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/hangUp",
    method: "post",
    data
  })
}

// 流程实例终止
export function flowInstanceEnd(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/complete",
    method: "post",
    data
  })
}

// 流程实例超时延长
export function flowInstanceExtendTimeOut(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/processExtendTimeOut",
    method: "post",
    data
  })
}

// 历史实例汇总查询
export function historyInstanceAllSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/queryEndInstanceCount",
    method: "post",
    data
  })
}

// 历史实例查询
export function historyInstanceSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/manage/core/queryEndInstance",
    method: "post",
    data
  })
}

// 待办任务之查询
export function backlogTaskSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/internal/manager/queryUndoTask",
    method: "post",
    data
  })
}

// 待办任务之跳转提交
export function backlogTaskJumpSub(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/internal/taskmanager/taskJump",
    method: "post",
    data
  })
}

// 待办任务之跳转节点查询
export function backlogTaskJumpSearch(data) {
  Object.prototype.hasOwnProperty.call(data,"Header") ? data.Header = Object.assign(serveData.Header,data.Header) : Object.assign(data,serveData);
  return request({
    url: "/fop/internal/query/queryFopDefNode",
    method: "post",
    data
  })
}
