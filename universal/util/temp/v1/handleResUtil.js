/*!
 *全局请求拦截器
 *统一处理接口返回信息
 * author ： gcc
 * create time ：2020-07-28
 *
 */

exports.handleRes =function handleRes(error, response, data) {
    if(error){
        try{
            return {"statusCode":response.statusCode,"message":error};
        }catch (err){
            return {"statusCode":"1","message":"系统错误"};
        }
    }else{
        if(typeof data == "string") {
            if(data != ""&&data != undefined){
                data=JSON.parse(data)
            }else{
                data={"message":error}
            }
        }
        if(response.statusCode==200){
            return {"statusCode":response.statusCode,"data":data};
        }else if(response.statusCode==201){
            return {"statusCode":response.statusCode,"data":data};
        }else if(response.statusCode==202){
            return {"statusCode":response.statusCode,"data":data};
        }
        else if(response.statusCode==204){
            return {"statusCode":response.statusCode};
        }else{
            if(data.message){
                data.message=error;
            }
            // return {"statusCode":response.statusCode,"message":data.message};
            return {"statusCode":response.statusCode,"message":data};
        }
    }
}
