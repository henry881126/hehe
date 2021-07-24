
var request = require('request');
var baseConfig = require("../config/baseConfig.json");
var REST_URL = null; 
var dataId = process.env.NACOS_DATAID || baseConfig.dataId;
var group = process.env.NACOS_GROUP || baseConfig.group;
var tenant = process.env.NACOS_TENANT || baseConfig.tenant;
var nacosUrl = process.env.NACOS_ADDRESS || baseConfig.nacosUrl;

// 闭包缓存全局url
exports.getRestUrl = function (callback) {
  var url = `${nacosUrl}?dataId=${dataId}&group=${group}&tenant=${tenant}`
  console.log("服务地址",url) 
  if (REST_URL){
    return callback(REST_URL);
  }else{
    request({
      url: url,//"http://nacos.dap.service.sd/nacos/v1/cs/configs?dataId=qui-dap-admin.json&group=UI_GROUP&tenant=dev",
      method: "GET",
      json: true,
      headers: {
        "content-type": "application/json",
      }
    }, function (error, response, body) {
        console.log(response) 
      if (response.statusCode == 200) {
        REST_URL = body;  
        callback(REST_URL);
      }else{
        console.log(error) 
      }
  });
  }
};