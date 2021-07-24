/*
 * @Descripttion: customers接口
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 12:03:00
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 16:08:12
 */
var request = require("../../util/requestHandle.js");
var baseConfig = require("../../config/baseConfig.json");
var handleRes = require("../../util/responseHandle");
var { logger } = require("../../util/logger");
var fopUri = process.env.FOP_URL || baseConfig.FOP_URL;

module.exports = function backHistVersion(router, io) {
	//流程建模之历史版本回退
	router.post("/backHistVersion", function(req, res) {
		var options = {
			url: `${fopUri}/backHistVersion`,
			method: "POST",
			json: true,
			headers: { Authorization: "Bearer " + req.headers["x-token"] }, //预留token验证
			body: req.body
		};
		console.log(options);
		// logger.info(`${resoureName}创建资源成功`);
		function callback(error, response, data) {
			console.log(data);
			res.send(handleRes.handleRes(error, response, data));
		}
		request(options, callback);
  });
  
	router.post("/selectCustClassificationGroupList", function(req, res) {
		var options = {
			url: `${fopUri}/selectCustClassificationGroupList`,
			method: "POST",
			json: true,
			headers: { Authorization: "Bearer " + req.headers["x-token"] }, //预留token验证
			body: req.body
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