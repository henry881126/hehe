var request = require('./requestHandle.js');
var baseConfig = require('../config/baseConfig.json');
var handleRes = require('./temp/v1/handleResUtil.js');
var syncRequest = require('./syncRequestHandle.js');
var oauthUri = process.env.ID_URL || baseConfig.oauth;
var application = process.env.APPLICATION || baseConfig.application;
var GeneralManager = baseConfig.GeneralManager;
var Permissions = baseConfig.Permissions;
//配置log日志信息
var {logger} = require('./logger');
// 新增权限模块
var group = {
    // 生成资源id
    gMixed: (n) => {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        function generateMixed(n) {
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        }
        return generateMixed(n);
    },
    /**
     *创建资源
     * @param resoureName
     * @param type 资源内容 endpoint,package,company
     * @returns {Promise}
     */
    createResoure: (resoureName,type) => {
        return new Promise((solve, reject) => {
            let resourceId = group.gMixed(40);
            const options = {
                url: oauthUri + "/resources",
                method: 'POST',
                json: true,
                body:
                    {
                        appExtId: application,
                        content: type, // 资源内容
                        resourceId: resourceId, // endpoint名称
                        desc: resoureName,
                        state: "1",
                    }
            };

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data);
                if (obj.statusCode == 200) {
                    logger.info(`${resoureName}创建资源成功`);
                    solve({
                        resourceId:resourceId,
                        resoureName:resoureName,
                    })
                } else {
                    logger.info('创建资源失败')
                }
            }

            // logger.info('创建资源 options', options)
            request(options, callback);
        })
    },
    /**
     * 创建权限
     * @param resoureName
     * @returns {Promise}
     */
    createPermis: (obj) => {
        return new Promise((solve, reject) => {
            const options = {
                url: oauthUri + "/permissions",
                method: 'POST',
                json: true,
                body: {
                    action: "*",
                    appExtId: application,
                    desc: obj['resoureName'],
                    displayName: obj['resoureName'],
                    externalId: obj['resourceId'],
                    resourceId: obj['resourceId'],
                    state: "1",
                }
            };

            function callback(error, response, data) {
                let res = handleRes.handleRes(error, response, data)
                if (res.statusCode == 200) {
                    logger.info(`${obj['resoureName']}创建权限成功`);
                    solve({
                        externalId:obj['resourceId'],
                        resoureName:obj['resoureName'],
                    })
                } else {
                    logger.info('创建权限失败');
                }
            }

            // logger.info('创建权限 options', options);
            request(options, callback);
        })
    },
    /**
     * 用户授予权限(用户和权限绑定)
     * @param resoureName
     * @param uId 用户名
     * @returns {Promise}
     */
    connetUser: (obj, uId) => {
        let _this = this;
        return new Promise((solve, reject) => {
            const options = {
                //               /apps/papant/users/poc@163.com/permissions/wbid
                url: oauthUri + `/apps/${application}/users/${uId}/permissions/${obj['externalId']}`,
                method: 'PUT',
                json: true,
                body:{}
            }

            function callback(error, response, data) {
                let res = handleRes.handleRes(error, response, data)
                if(res.statusCode ==200){
                    logger.info(`${obj.resoureName} | ${uId}用户和权限关联成功`)
                }else{
                    logger.info(`${obj.resoureName} | ${uId}用户和权限关联失败`)
                }
            }
            // logger.info('用户和权限关联 options',options);
            request(options, callback);
        })
    },
    // 角色和权限绑定
    permissToRole(obj) {

        // /apps/{aExtId}/roles/{rExtId}/permissions/{pExtId}
        // {aExtId}:String， 必输，应用的externalId
        // {rExtId}:String， 必输，角色的externalId
        // {pExtId}:String， 必输，权限的externalId
        // {authId}:String， 非必输，操作者的标识

        let _this = this;
        return new Promise((solve, reject) => {
            const options = {
                url: oauthUri + `/apps/${obj['aExtId']}/roles/${obj['rExtId']}/permissions/${obj['pExtId']}`,
                method: 'PUT',
                json: true,
                body:{}
            }

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data)
                if(obj.statusCode ==200){
                    solve("用户和权限关联成功")
                    logger.info(`用户和权限关联成功`)
                }else{
                    reject("用户和权限关联失败")
                    logger.info(`用户和权限关联失败`)
                }
            }
            // logger.info('用户和权限关联 options',options);
            request(options, callback);
        })

    }
}

// 删除权限模块
var dels = {
    // 查询权限
    checkPemiss(userId){
        var p = new Promise((resolve,reject)=>{
            let uri = process.env.ID_URL || baseConfig.oauth;
            let application = process.env.APPLICATION || baseConfig.application;
            let options = {
                url: `${uri}/apps/${application}/users/${userId}/permissions`,
                method: 'GET'
            };
            console.log('获取权限options',options)
            request(options, function (error, response, data){
                let resources = JSON.parse(data).resources;
                resolve(resources);
            })
        });
        return p;
    },
    /**
     *  删除权限
     * @param externalId 权限的externalId
     * @returns {Promise}
     */
    permission(externalId){
        return new Promise(solve=>{
            var options =
                {
                    url: oauthUri+`/apps/${application}/permissions/${externalId}`,
                    method: 'DELETE'
                };
            function callback(error, response, data) {
                // logger.info('删除权限 data',data,typeof data)
                if (typeof data == 'string' && data == "{}" ) {
                    solve(externalId)
                } else {
                    logger.info('删除权限失败')
                }
            }
            logger.info('删除权限 options',options)
            request(options, callback);
        })
    },
    /**
     * 删除资源
     * @param resourceId 资源的resourceId
     * @returns {Promise}
     */
    resource(resourceId){
        return new Promise(solve=>{
            var options =
                {
                    url: oauthUri+`/apps/${application}/resources/${resourceId}`,
                    method: 'DELETE'
                };
            function callback(error, response, data) {
                if (typeof data == 'string' && data == "{}" ) {
                    logger.info(`${resourceId}删除资源成功`)
                } else {
                    logger.info(`${resourceId}删除资源失败`)
                }
            }
            logger.info('删除资源 options',options)
            request(options, callback);
        })
    }
}

var role = {

    isExisted:()=>{
        // 查询域（应用）是否存在
        return new Promise((solve, reject) => {
            const options = {
                url: `${oauthUri}/applications/${application}`,
                method: 'GET'
            };

            function callback(error, response, data) {
                console.log('查询域（应用）',data)
                if(typeof  data == "string"){
                    data = JSON.parse(data);
                }
                var isExist = !!(data['externalId'] && data['displayName']);
                if (isExist == false) {
                    solve()
                } else {
                    reject('域存在，所以不再创建')
                }
            }
            // logger.info('查询域 options', options)
            request(options, callback);
        })
    },

    createDomain: () => {
        // 创建域（应用）
        return new Promise((solve, reject) => {
            const options = {
                url: oauthUri + "/applications",
                method: 'POST',
                json: true,
                body:{
                        "externalId": application,//必输且全局唯一，外部id
                        "displayName": application,//必输，域展示名称
                        "version": "1.0",//非必输，版本
                        "category": "",//非必输，部门
                        "provider": "",//非必输，供应商
                        "ssoEnabled": "1",//非必输，是否开启sso（0为禁用，1为可用）
                        "state": "1",//非必输，状态信息(0为禁用，1可用)
                        "desc": "初始化域"//非必输，描述信息
                    }
             };

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data)
                console.log('创建域（应用）',obj);
                if (obj.statusCode == 200) {
                    console.log("--------1创建域（应用）成功-----------")
                    solve();
                } else {
                    reject("创建域（应用）失败")
                }
            }

            // logger.info('创建域 options', options)
            request(options, callback);
        })
    },
    createRole: () => {
        // 创建普通管理员角色
        return new Promise((solve, reject) => {
            const options = {
                url: oauthUri + "/roles",
                method: 'POST',
                json: true,
                body:
                    {
                        "externalId": GeneralManager, //必输且同一应用下唯一，外部id
                        "displayName": "管理员", //必输，展示名称
                        "desc": `拥有${application}域的所有权限`,  //非必输，描述信息
                        "appExtId": application, //必输，应用的externalId ,域
                        "state": "1" //非必输，状态信息（0为禁用，1可用）
                    }
            };

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data)
                console.log('创建普通管理员角色',obj)
                if (obj.statusCode == 200) {
                    console.log("--------2创建管理员角色成功-----------")
                    solve();
                } else {
                    reject('创建管理员角色失败')
                }
            }
            // logger.info('创建角色 options', options)
            request(options, callback);
        })
    },
    createUser: (username) => {
        // 创建普通管理员
        return new Promise((solve, reject) => {
            const options = {
                url: oauthUri + "/users",
                method: 'POST',
                json: true,
                body:
                    {
                        "id": username, //必输且全局唯一，值为用户名
                        "email": username +"@admin.com",  //必输，邮箱
                        "name": "obp管理员", //非必输，用户真实姓名
                        "expired": "0",//非必输，是否过期（0为未过期，1为过期）
                        "disabled": "0"//非必输，是否禁用（0为不禁用，1为禁用）
                    }
            };

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data)
                console.log('创建管理员',obj)
                if (obj.statusCode == 200) {
                    console.log("--------3创建创建管理员成功-----------")
                    solve();
                } else {
                    solve();
                    // reject('创建创建管理员失败')
                    console.log("--------3创建创建管理员失败-----------")
                }
            }
            // logger.info('创建管理员 options', options)
            request(options, callback);
        })
    },
    roleToUser(obj){
        // 绑定用户和角色
        return new Promise((solve, reject) => {

            // {aExtId}:String， 必输，应用的externalId
            // {uId}:String， 必输，用户Id
            // {rExtId}:String， 必输，角色的externalId
            // {authId}:String， 非必输，操作者的标识
            const options = {
                url: oauthUri + `/apps/${obj['aExtId']}/users/${obj['uId']}/roles/${obj['rExtId']}`,
                method: 'PUT',
                json:true,
                body:{}
            };

            function callback(error, response, data) {
                let obj = handleRes.handleRes(error, response, data)
                console.log('绑定用户和角色',obj)
                if (obj.statusCode == 200) {
                    console.log("--------4绑定用户和角色成功-----------")
                    solve();
                } else {
                    reject('绑定用户和角色失败')
                }
            }
            // logger.info('创建管理员 options', options)
            request(options, callback);
        })
    }
}

module.exports = {
    group,
    dels,
    role
}