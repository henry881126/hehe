/*
 * @Descripttion: 公用参数封装
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:06:50
 */
const data = {
  Header: {
    SourceSysId: "1",
    ConsumerId: "1",
    ServiceCode: "1",
    TranCode: "1",
    GlobalSeq: "1",
    TranSeq: "1",
    Channel: "1",
    BranchId: "1",
    TranTeller: "100001",
    AuthFlag: "1",
    TranDate: "20180821",
    TranTime: "230651354",
    LocalLang: "1",
    LegalRepCode: "1",
    PageStart: "0",
    PageEnd: "1",
    TotalNum: "10",
  },
};
/**
 * @Author: Ray Haiyoung
 * @Descripttion: merge对象
 * @param {type:Object} obj 要merge的对象
 * @return {type:Object} obj merge后的对象
 */
export function mergeMethods(obj) {
  Object.prototype.hasOwnProperty.call(obj, "Header")
    ? (obj.Header = Object.assign(data.Header, obj.Header))
    : Object.assign(obj, data);
  return obj;
}
