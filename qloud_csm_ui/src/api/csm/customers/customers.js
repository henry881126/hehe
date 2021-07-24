/*
 * @Descripttion: 接口调用方法封装demo
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 10:50:46
 */
import { mergeMethods } from "@/api/sample/serveData.js";
import request from "@/utils/request";

//demo
export function handleGroupList(data) {
	return request({
		url: "219/selectCustClassificationGroupList",
		method: "post",
		mergeMethods(data)
	});
}