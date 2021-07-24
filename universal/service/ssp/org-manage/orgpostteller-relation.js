/*
 * @Descripttion: 机构岗位用户关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:07:08
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:16:23
 */ 

var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var sspUri = process.env.SSP_URL || baseConfig.SSP_URL;

module.exports = function attachHandlers(router, io) {

  /**
   * 列表
   */
  router.post("/http/jsonService/queryOrgPostTellerRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryOrgPostTellerRelation`,
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

  /**
   * 添加
   */
  router.post("/http/jsonService/createOrgPostTellerRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/createOrgPostTellerRelation`,
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

  /**
   * 修改
   */
  router.post("/http/jsonService/modifyOrgPostTellerRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/modifyOrgPostTellerRelation`,
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
  /**
   * 删除
   */
  router.post("/http/jsonService/deleteOrgPostTellerRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/deleteOrgPostTellerRelation`,
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

  /**
   * 查询机构岗位未关联的人员
   */
  router.post("/http/jsonService/queryNotExistTellerRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryNotExistTellerRelation`,
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

  
  /**
   * 查询机构岗位用户未关联的角色
   */
  router.post("/http/jsonService/queryExistRoleByOrgPostTeller", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryExistRoleByOrgPostTeller`,
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

    /**
   * 查询机构岗位用户已关联的角色
   */
  router.post("/http/jsonService/queryNoRoleByOrgPostTeller", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryNoRoleByOrgPostTeller`,
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
}