/*
 * @Descripttion: ssp工程共用接口
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-29 13:16:01
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-07-31 15:38:52
 */ 

var request = require("../../util/requestHandle.js");
var baseConfig = require("../../config/baseConfig.json");
var handleRes = require("../../util/responseHandle");
var { logger } = require("../../util/logger");
var sspUri = process.env.SSP_URL || baseConfig.SSP_URL;

module.exports = function attachHandlers(router, io) {

  /**
   * 获取机构类型
   */
  router.post("/http/jsonService/queryManagerPartyType", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryManagerPartyType`,
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
   *  数据字典获取指定paramGroupId的集合信息
   *  机构状态100007，机构级别100008，
   */
  router.post("/http/jsonService/queryCommonParamList", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryCommonParamList`,
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
   * 组织机构树
   */
  router.post("/http/jsonService/getOrgTree", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/getOrgTree`,
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
   * 组织机构列表
   */
  router.post("/http/jsonService/queryOrgList", function (req, res) {
    var options = {
      url: sspUri + `/http/jsonService/queryOrgList`,
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

