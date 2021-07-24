/*--
 * @Descripttion: 场景
 * @version: 
 * @Author: zhanghuan
 * @Date: 2020-07-29 16:03:07
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-07-29 16:03:07
*/

var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var sspUri = process.env.SSP_URL || baseConfig.SSP_URL;

module.exports = function attachHandlers(router, io) {

  /**
   * 获取场景列表
   */
  router.post("/http/jsonService/querySourceList", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/querySourceList`,
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
   * 新增场景
   */
  router.post("/http/jsonService/addSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/addSource`,
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
  router.post("/http/jsonService/updateSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/updateSource`,
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
  router.post("/http/jsonService/deleteSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/deleteSource`,
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
