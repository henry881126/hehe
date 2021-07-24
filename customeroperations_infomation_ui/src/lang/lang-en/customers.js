/*--
 * @Descripttion:
 * @version:
 * @Author: zhanghuan
 * @Date: 2020-08-06 14:42:37
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-08-06 14:42:37
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
    "groupId":"群编号",
    "groupName":"群名称",
    "groupLeader":"群主编码",
    "groupLeaderName":"群主名称",
    "groupLeaderContacts":"群联系人",
    "belong":"群所属机构",
    "type": "群类型",
    "time":"群日期"
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
