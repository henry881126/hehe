/*
 * @Descripttion: 组织机构
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:07:08
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-29 13:52:10
 */ 

var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var sspUri = process.env.SSP_URL || baseConfig.SSP_URL;

module.exports = function attachHandlers(router, io) {
  /**
   * 获取岗位列表
   */
  router.post("/http/jsonService/queryVaguePostList", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryVaguePostList`,
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
   * 获取角色新增
   */
  router.post("/http/jsonService/createRole", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/createRole`,
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
   * 修改场景
   */
  router.post("/http/jsonService/modifyPost", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/modifyPost`,
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
   * 删除场景
   */
  router.post("/http/jsonService/deletePost", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/deletePost`,
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
