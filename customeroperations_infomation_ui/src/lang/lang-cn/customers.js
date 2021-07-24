/*--
 * @Descripttion:
 * @version:
 * @Author: zhanghuan
 * @Date: 2020-08-06 14:42:57
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-08-06 14:42:57
--*/
export default {
  name: "客户汇总",
  infoList:[
    {
      name:"主管群(个)"
    },
    {
      name:"主管群总客户数(位)"
    }
  ],
  tableHeaderData:{
    "custNo":"客户编号",
    "custName":"客户名称",
    "custType":"客户类型",
    "idenNo":"证件号码",
    "idenType":"证件类型",
    "idenExpireDate":"证件有效期",
  },
  searchForm:{
    "custName": "客户名称",
    "custNo": "客户编号",
    "idenType": "证件类型",
    "idenNo":"证件号码",
  },
  tableTitle:"群列表展示",
  btnList:{
    "add":"新增",
    "download":"模版下载",
    "import":"引进"
  }

};
