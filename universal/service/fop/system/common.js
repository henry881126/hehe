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
	//流程建模之历史版本回退
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
};
