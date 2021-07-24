/*
 * @Author: LeiRuiQi
 * @Date: 2020-07-29 16:18:22
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-04 17:15:17
 */ 
var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var fopUri = process.env.FOP_URL || baseConfig.FOP_URL;

module.exports =  function businessSearchAll(router, io) {
  // 流程实例汇总查询
  router.post("/fop/manage/core/queryRunInstanceCount", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/queryRunInstanceCount`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 流程实例之查询
  router.post("/fop/manage/core/queryRunInstance", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/queryRunInstance`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 流程实例之流程表
  router.post("/fop/manage/core/queryApproveRecord", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/queryApproveRecord`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 流程实例挂起 和 恢复
  router.post("/fop/manage/core/hangUp", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/hangUp`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 流程实例终止
  router.post("/fop/manage/core/complete", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/complete`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 流程实例超时延长
  router.post("/fop/manage/core/processExtendTimeOut", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/processExtendTimeOut`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

  // 历史实例汇总查询
  router.post("/fop/manage/core/queryEndInstanceCount", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/queryEndInstanceCount`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });
  
  // 历史实例查询
  router.post("/fop/manage/core/queryEndInstance", function (req, res) {
    var options = {
      url: `${fopUri}/fop/manage/core/queryEndInstance`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });
  // 待办任务之查询
  router.post("/fop/internal/manager/queryUndoTask", function (req, res) {
    var options = {
      url: `${fopUri}/fop/internal/manager/queryUndoTask`,
      method: "POST",
      json: true,
      headers: { "Authorization": "Bearer " + req.headers["x-token"] },//预留token验证
      body: req.body,
    };
    console.log(options);
    // logger.info(`${resoureName}创建资源成功`);
    function callback(error, response, data) {
      console.log(data);
      res.send(handleRes.handleRes(error, response, data));
    }
    request(options, callback);
  });

};
