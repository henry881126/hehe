/*
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 12:03:00
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 10:11:16
 */
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
    "groupName": "群名称",
    "groupId": "群编号",
    "groupLeader": "群主",
    "search":"检索",
    "reset":"重置",
  },
  tableTitle:"群列表展示",
  btnList:{
    "add":"新增",
    "download":"模版下载",
    "import":"引进"
  }

};
