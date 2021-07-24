/* !
 * 全局请求拦截器
  * 对reques统一处理
  * author ： gcc
    * create time ：2020 - 07 - 28
      * 
 */
var request=require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports =function requestHandle(options,callback) {
    console.log("-----------------------------------------")
    console.log("request options",options)
  if (options.type=="form"){
    request.post({ url: options.url, headers: options.headers, form: options.body }, callback)  
  }else{
    request(options, callback);
  }
    // request(options,callback);
}

