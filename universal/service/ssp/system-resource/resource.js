/*--
 * @Descripttion:
 * @version:
 * @Author: zhanghuan
 * @Date: 2020-07-30 11:29:31
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-07-30 11:29:31
*/

var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var sspUri = process.env.SSP_URL || baseConfig.SSP_URL;

module.exports = function attachHandlers(router, io) {

  /**
   * 获取资源列表
   */
  router.post("/http/jsonService/queryWebAppSourcePermission", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/queryWebAppSourcePermission`,
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
   * 新增资源权限
   */
  router.post("/http/jsonService/addWebAppSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/addWebAppSource`,
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
   * 修改资源权限
   */
  router.post("/http/jsonService/updateWebAppSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/updateWebAppSource`,
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
   * 删除资源权限
   */
  router.post("/http/jsonService/deleteWebAppSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/deleteWebAppSource`,
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
   * 查询菜单树
   */
  router.post("/http/jsonService/queryMenuListForTree", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/queryMenuListForTree`,
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
   * 查询未关联资源的权限
   */
  router.post("/http/jsonService/queryPermissionNoRelSource", function (req, res) {
    var options = {
      url: `${sspUri}/http/jsonService/queryPermissionNoRelSource`,
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
