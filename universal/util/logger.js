//配置log日志信息
var log4js = require('log4js');
var log4jsjson = require('../log4js.json');
log4js.configure(log4jsjson);
var logger = log4js.getLogger('日志信息');


module.exports = {
    logger
};