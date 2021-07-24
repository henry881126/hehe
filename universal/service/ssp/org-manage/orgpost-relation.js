/*
 * @Descripttion: 机构岗位关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:07:08
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:18:46
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
  router.post("/http/jsonService/queryOrgPostRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryOrgPostRelation`,
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
  router.post("/http/jsonService/createOrgPostRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/createOrgPostRelation`,
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
  router.post("/http/jsonService/modifyOrgPostRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/modifyOrgPostRelation`,
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
  router.post("/http/jsonService/deleteOrgPostRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/deleteOrgPostRelation`,
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
   * 查询未关联的岗位信息
   */
  router.post("/http/jsonService/queryNotExistPostRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryNotExistPostRelation`,
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
