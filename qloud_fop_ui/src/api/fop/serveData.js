/*
 * @Author: Ray haiyoung
 * @Date: 2020-07-29 09:28:13
 * @Last Modified by: Ray haiyoung
 * @Last Modified time: 2020-07-30 20:18:22
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
    TotalNum: "10"
  }
};
export function mergeMethods(obj) {
  Object.prototype.hasOwnProperty.call(obj, "Header")
    ? (obj.Header = Object.assign(data.Header, obj.Header))
    : Object.assign(obj, data);
  return obj;
}
export default data;
