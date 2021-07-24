/*
 * @Descripttion: 接口调用方法封装demo
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 15:09:33
 */
import { mergeMethods } from "@/api/infomation/serveData.js";
import request from "@/utils/request";

//根据条件查询客户列表
export function selectPartyMainInfoList(data) {
	return request({
		url: "/http/jsonService/selectPartyMainInfoList",
		method: "post",
    data: mergeMethods(data)
	});
}

export function deleteWebAppSource(data) {
	return request({
		url: "/http/jsonService/selectPartyMainInfoList",
		method: "post",
    data: mergeMethods(data)
	});
}
