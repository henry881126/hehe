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
var Infomation_URL = process.env.Infomation_URL || baseConfig.Infomation_URL;

module.exports = function attachHandlers(router, io) {

  /**
   * 根据条件查询客户列表
   */
  router.post("/http/jsonService/selectPartyMainInfoList", function (req, res) {
    console.log(`${Infomation_URL}/http/jsonService/selectPartyMainInfoList`);
    var options = {
      url: `${Infomation_URL}/http/jsonService/selectPartyMainInfoList`,
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
