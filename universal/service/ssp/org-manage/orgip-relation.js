/*
 * @Descripttion: 机构IP关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:07:08
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:18:30
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
  router.post("/http/jsonService/queryOrgIpRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryOrgIpRelation`,
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
  router.post("/http/jsonService/addOrgIpRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/addOrgIpRelation`,
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
  router.post("/http/jsonService/updateOrgIpRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/updateOrgIpRelation`,
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
  router.post("/http/jsonService/deleteOrgIpRelation", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/deleteOrgIpRelation`,
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
