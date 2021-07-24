/*
 * @Author: ui_qianhengli
 * @Date: 2020-08-02 11:22:27
 * @Last Modified by:   ui_qianhengli
 * @Last Modified time: 2020-08-02 11:22:27
 */

import serveData from "../serveData.js";
import request from "@/utils/request";

//系统结构查询
export function listSysNode(data) {
  return request({
    url: "/fop/manage/sysNode/listSysNode",
    method: "post",
    data
  });
}

// 系统结构新增
export function addSysNode(data) {
  return request({
    url: "/fop/manage/sysNode/addSysNode",
    method: "post",
    data
  });
}

// 系统结构修改
export function updateSysNode(data) {
  return request({
    url: "/fop/manage/sysNode/updateSysNode",
    method: "post",
    data
  });
}

// 系统结构删除
export function deleteSysNode(data) {
  return request({
    url: "/fop/manage/sysNode/deleteSysNode",
    method: "post",
    data
  });
}

//流程建模之查询
export function selectProcDefList(data) {
  return request({
    url: "/fop/manage/procdef/selectProcDefList",
    method: "post",
    data
  });
}

//流程建模之新增
export function addProcDef(data) {
  return request({
    url: "/fop/manage/procdef/addProcDef",
    method: "post",
    data
  });
}

//流程建模之修改
export function updateProcDef(data) {
  return request({
    url: "/fop/manage/procdef/updateProcDef",
    method: "post",
    data
  });
}

//流程建模之删除
export function deleteProcDef(data) {
  return request({
    url: "/fop/manage/procdef/deleteProcDef",
    method: "post",
    data
  });
}

//流程建模之复制
export function copyProcDef(data) {
  return request({
    url: "/fop/manage/procdef/copyProcDef",
    method: "post",
    data
  });
}

// 一级二级分类查询
export function listParam(data) {
  return request({
    url: "/fop/manage/baseParam/listParam",
    method: "post",
    data
  });
}

// 节点建模之新增
export function addNodeDef(data) {
  return request({
    url: "/fop/manage/nodeDef/addNodeDef",
    method: "post",
    data
  });
}

// 节点建模之修改
export function updateNodeDef(data) {
  return request({
    url: "/fop/manage/nodeDef/updateNodeDef",
    method: "post",
    data
  });
}

// 节点建模之删除
export function deleteNodeDef(data) {
  return request({
    url: "/fop/manage/nodeDef/deleteNodeDef",
    method: "post",
    data
  });
}

// 节点建模之查询
export function listNodeDef(data) {
  return request({
    url: "/fop/manage/nodeDef/listNodeDef",
    method: "post",
    data
  });
}

// 节点建模之复制
export function copyNodeDef(data) {
  return request({
    url: "/fop/manage/nodeDef/copyNodeDef",
    method: "post",
    data
  });
}

// 对外服务查询
export function listInterfaceDef(data) {
  return request({
    url: "/fop/manage/interfaceDef/listInterfaceDef",
    method: "post",
    data
  });
}

// 对外服务增加
export function addInterfaceDef(data) {
  return request({
    url: "/fop/manage/interfaceDef/addInterfaceDef",
    method: "post",
    data
  });
}

// 对外服务修改
export function updateInterfaceDef(data) {
  return request({
    url: "/fop/manage/interfaceDef/updateInterfaceDef",
    method: "post",
    data
  });
}

// 对外服务删除
export function deleteInterfaceDef(data) {
  return request({
    url: "/fop/manage/interfaceDef/deleteInterfaceDef",
    method: "post",
    data
  });
}
