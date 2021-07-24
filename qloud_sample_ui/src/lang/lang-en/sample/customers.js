/*
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 12:03:00
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 10:16:52
 */
export default {
  name: "customer summary",
  infoList:[
    {
      name:"supervisor group"
    },
    {
      name:"Total number of customers in charge group"
    }
  ],
  tableHeaderData:{
    "groupId":"id",
    "groupName":"group name",
    "groupLeader":"group leader",
    "groupLeaderName":"group leader name",
    "groupLeaderContacts":"group leader contacts",
    "belong":"belong",
    "type": "type",
    "time":"time"
  },
  searchForm:{
    "groupName": "name",
    "groupId": "id",
    "groupLeader": "group leader",
    "search":"search",
    "reset":"reset",
  },
  tableTitle:"Group list display",
  btnList:{
    "add":"add",
    "download":"download",
    "import":"import"
  }

};
