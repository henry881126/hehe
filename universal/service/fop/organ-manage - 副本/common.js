/*
 * @Author: Ray haiyoung
 * @Date: 2020-07-29 15:24:10
 * @Last Modified by: Ray haiyoung
 * @Last Modified time: 2020-07-29 15:58:07
 */
var request = require("../../../util/requestHandle.js");
var baseConfig = require("../../../config/baseConfig.json");
var handleRes = require("../../../util/responseHandle");
var { logger } = require("../../../util/logger");
var fopUri = process.env.FOP_URL || baseConfig.FOP_URL;

module.exports = function backHistVersion(router, io) {
	//系统结构查询
	router.post("/fop/internal/WfSystemStructureController/listSystemNode", function(req, res) {
		var options = {
			url: `${fopUri}/fop/internal/WfSystemStructureController/listSystemNode`,
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
	//系统结构新增
	router.post("/fop/internal/WfSystemStructureController/addSystemNode", function(req, res) {
		var options = {
			url: `${fopUri}/fop/internal/WfSystemStructureController/addSystemNode`,
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

	//系统结构删除
	router.post("/fop/internal/WfSystemStructureController/deleteSystemNode", function(req, res) {
		var options = {
			url: `${fopUri}/fop/internal/WfSystemStructureController/deleteSystemNode`,
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

	// 流程建模之查询
	router.post("/fop/internal/WorkFlowDefinitionController/selectWorkFlowList", function(req, res) {
		var options = {
			url: `${fopUri}/fop/internal/WorkFlowDefinitionController/selectWorkFlowList`,
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
