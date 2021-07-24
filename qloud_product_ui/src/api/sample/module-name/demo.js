/*
 * @Descripttion: 接口调用方法封装demo
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:40:51
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 15:09:33
 */
import { mergeMethods } from "@/api/sample/serveData.js";
import request from "@/utils/request";

//demo
export function demoMethods(data) {
	return request({
		url: "/fop/internal/WfSystemStructureController/listSystemNode",
		method: "post",
		data
	});
}
