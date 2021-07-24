<!--
 * @Descripttion: 机构岗位人员关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-27 14:15:28
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:09:16
--> 

<template>
  <div class="org-post-teller-list">
    <div class="condition-title">
      <h5>检索条件</h5>
    </div>
    <div>
      <form-view
        labelWidth="80px"
        :searchData="searchData"
        :rules="Rules"
        ref="form"
        :formRef="formRef"
        :searchForm="searchForm"
        :searchHandle="searchHandle"
      ></form-view>
    </div>
    <div class="but">
      <el-button type="primary" @click="handleCreate">新增</el-button>
    </div>
    <div class="g-table">
      <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        :current-page="searchData.Header.CurrentPageNum"
        :total="tableData.total"
        v-on:getPageSize="currentSizeChange"
        v-on:getPage="currentPageChange"
        v-on:operate="getIndex"
      />
    </div>
  </div>
</template>

<script>
import {
  queryOrgPostTellerRelation,
  createOrgPostTellerRelation,
  modifyOrgPostTellerRelation,
  deleteOrgPostTellerRelation,
  queryNotExistTellerRelation
} from "@/api/ssp/org-manage/orgposttellerrelation";
import { isType, isInclude } from "../../../utils"

export default {
  data() {
    return {
      searchData: {
        Header: {
          PageTotalNum: 10, //每页显示数据条数
          CurrentPageNum: 1, //当前第几页
        },
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "机构编码",
          prop: "partyId",
          width: "220px",
          placeholder: "请输入机构编码",
        },

        {
          type: "Input",
          label: "机构名称",
          prop: "partyName",
          width: "220px",
          placeholder: "请输入机构名称",
        },
        {
          type: "Input",
          label: "岗位编码",
          prop: "postId",
          width: "220px",
          placeholder: "请输入岗位编码",
        },      
        {
          type: "Input",
          label: "岗位名称",
          prop: "postName",
          width: "220px",
          placeholder: "请输入岗位名称",
        },
        {
          type: "Input",
          label: "用户名称",
          prop: "userName",
          width: "220px",
          placeholder: "请输入用户名称",
        },      
        {
          type: "Input",
          label: "登录名",
          prop: "userLoginId",
          width: "220px",
          placeholder: "请输入登录名",
        },
         {
          type: "Input",
          label: "角色编码",
          prop: "ip4",
          width: "220px",
          placeholder: "请输入角色编码",
        },
        {
          type: "Input",
          label: "角色名称",
          prop: "ip5",
          width: "220px",
          placeholder: "请输入角色名称",
        }
      ],
      Rules: {
       /*  orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 1, max: 99, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: "请输入IP", trigger: "blur" },
          { min: 1, max: 50, message: '请输入有效ip地址', trigger: 'blur' }
        ]*/
      },

      searchHandle: [
        {
          label: "查询",
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        {
          label: "重置",
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["分配角色", "修改", "删除"],
          list: [
            {
              label: "分配角色",
              id: "addroles",
            },
            {
              label: this.$t("common.operate.edit"),
              id: "modify",
            },
            {
              label: this.$t("common.operate.delete"),
              id: "delete",
            },
          ],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "partyId", label: "机构编码" },
          { prop: "partyName", label: "机构名称" },
          { prop: "postId", label: "岗位编码" },
          { prop: "postName", label: "岗位名称" },
          { prop: "userName", label: "登录名" },
          { prop: "userLoginId", label: "用户名称" },
          { prop: "createdStamp", label: "创建时间" },
          { prop: "lastUpdatedStamp", label: "更新时间" },
        ],
        paramData: [],
      },
		}
  },
  created() {
    this.getList();
  },
  methods: {
    // 页码改变
    currentPageChange(page) {
      this.searchData.Header.CurrentPageNum = page
      this.getList()
    },
    // 每页显示条数改变
    currentSizeChange(size) {
      this.searchData.Header.PageTotalNum = size
      this.getList()
    },
    getIndex(e) {
      //e.row.value 即可获取到操作项
      if (e.operate.id === "modify") {
        this.editSubbmit(e.row);
      }else if(e.operate.id === "delete"){
        this.deleteSubmit(e.row); 
      }
      console.log(e)
    },
    onSubmit() {},
    addSubmit() {
      this.isShow = true;
      this.editTitle = "新增";
    },
    editSubbmit() {
      this.isShow = true;
      this.editTitle = "修改";
    },
    deleteSubmit() {
      console.log(删除);
    },
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getList() {
      queryOrgPostTellerRelation(this.searchData).then((response) => {
        if(isInclude(response, "orgPostTellerList") && isType.isArray(response.orgPostTellerList)){
          this.tableData.paramData = response.orgPostTellerList;
          this.tableData.total = parseInt(response.Header.TotalNum);
        }
      });
    },
    //点击新增
    handleCreate(flag) {
     //新增页面弹出窗口方式
    },
  },
};
</script>
<style lang="scss" scoped>
.org-post-teller-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .condition-title {
    margin: 20px;
    font-size: 18px;
  }

  .but {
    margin: 20px;
  }

  .g-table {
    flex: 1;
  }
}
</style>