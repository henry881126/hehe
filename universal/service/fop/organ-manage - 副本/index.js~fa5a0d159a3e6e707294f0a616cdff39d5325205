/*
 * @Author: ui_qianhengli
 * @Date: 2020-08-02 11:25:09
 * @Last Modified by:   ui_qianhengli
 * @Last Modified time: 2020-08-02 11:25:09
 */

var request = require('../../../util/requestHandle.js')
var baseConfig = require('../../../config/baseConfig.json')
var handleRes = require('../../../util/responseHandle')
var { logger } = require('../../../util/logger')
var fopUri = process.env.FOP_URL || baseConfig.FOP_URL

module.exports = function backHistVersion(router, io) {
  //系统结构查询
  router.post('/fop/manage/sysNode/listSysNode', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/sysNode/listSysNode`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  //系统结构新增
  router.post('/fop/manage/sysNode/addSysNode', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/sysNode/addSysNode`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 系统结构修改
  router.post('/fop/manage/sysNode/updateSysNode', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/sysNode/updateSysNode`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }

    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  //系统结构删除
  router.post('/fop/manage/sysNode/deleteSysNode', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/sysNode/deleteSysNode`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }

    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 流程建模之查询
  router.post('/fop/manage/procdef/selectProcDefList', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/procdef/selectProcDefList`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 流程建模之新增
  router.post('/fop/manage/procdef/addProcDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/procdef/addProcDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 流程建模之复制
  router.post('/fop/manage/procdef/copyProcDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/procdef/copyProcDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 流程建模之修改
  router.post('/fop/manage/procdef/updateProcDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/procdef/updateProcDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 流程建模之删除
  router.post('/fop/manage/procdef/deleteProcDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/procdef/deleteProcDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 一级二级分类查询
  router.post('/fop/manage/baseParam/listParam', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/baseParam/listParam`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 节点建模之新增
  router.post('/fop/manage/nodeDef/addNodeDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/nodeDef/addNodeDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 节点建模之修改
  router.post('/fop/manage/nodeDef/updateNodeDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/nodeDef/updateNodeDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 节点建模之删除
  router.post('/fop/manage/nodeDef/deleteNodeDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/nodeDef/deleteNodeDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 节点建模之查询
  router.post('/fop/manage/nodeDef/listNodeDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/nodeDef/listNodeDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 节点建模之复制
  router.post('/fop/manage/nodeDef/copyNodeDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/nodeDef/copyNodeDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 对外服务查询
  router.post('/fop/manage/interfaceDef/listInterfaceDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/interfaceDef/listInterfaceDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 对外服务增加
  router.post('/fop/manage/interfaceDef/addInterfaceDef', function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/interfaceDef/addInterfaceDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 对外服务修改
  router.post('/fop/manage/interfaceDef/updateInterfaceDef', function (
    req,
    res
  ) {
    var options = {
      url: `${fopUri}/fop/manage/interfaceDef/updateInterfaceDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })

  // 对外服务删除
  router.post('/fop/manage/interfaceDef/deleteInterfaceDef', function (
    req,
    res
  ) {
    var options = {
      url: `${fopUri}/fop/manage/interfaceDef/deleteInterfaceDef`,
      method: 'POST',
      json: true,
      headers: { Authorization: 'Bearer ' + req.headers['x-token'] }, //预留token验证
      body: req.body,
    }
    console.log(options)

    function callback(error, response, data) {
      console.log(data)
      res.send(handleRes.handleRes(error, response, data))
    }
    request(options, callback)
  })
}
