<!--
 * @Descripttion: 机构岗位
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-27 14:15:28
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:05:53
--> 

<template>
  <div class="org-post-list">
    <div class="condition-title">
      <h5>{{ $t('common.operate.searchConditions') }}</h5>
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
    <div>
      <popup
        :isShow="isShow"
        :title="editTitle"
        :size="size"
        :footerList="footerList"
        v-on:senddialogVisible="editFormSubmit"
      >
        <template slot="content">
          <form-view
            labelWidth="110px"
            :searchData="editData"
            :rules="editRules"
            :isInline="editIsInline"
            formRef="inlineForm"
            ref="editform"
            :searchForm="editForm"
          ></form-view>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  queryOrgPostRelationList,
  createOrgPostRelation,
  modifyOrgPostRelation,
  deleteOrgPostRelation,
  queryNotExistPostRelation,
} from "@/api/ssp/org-manage/orgpostrelation";
import { queryCommonParamList, queryOrgList } from "@/api/ssp/common";
import { queryStationList } from "@/api/ssp/system-management/station";
import { getPlaceholderMsg } from "@/utils/i18Util";
import { isType, isInclude } from "@/utils";

export default {
  data() {
    return {
      //添加修改页面下拉框复制
      orgList: [],
      postList: [],
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
          prop: "groupName",
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
      ],
      Rules: {},

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
          list: [
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
          { prop: "groupName", label: "机构名称" },
          { prop: "postId", label: "岗位编码" },
          { prop: "postName", label: "岗位名称" },
          { prop: "createdStamp", label: "创建时间" },
          { prop: "lastUpdatedStamp", label: "更新时间" },
        ],
        paramData: [],
      },
      // 弹窗部分数据
      isShow: false,
      editTitle: "新增",
      size: "small",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      editData: {
        postId: null,

        //partyId机构编码
        partyId: null,
      },
      editIsInline: true,
      editForm: [
        {
          type: "Select",
          label: "机构名称",
          labelKey: "groupName",
          valueKey: "partyId",
          prop: "groupName",
          width: "220px",
          change: (row) => this.getPartyId(row),
          placeholder: "请选择",
        },
        {
          type: "Input",
          label: "机构编码",
          prop: "partyId",
          width: "220px",
          disabled: true,
          placeholder: "请选择机构名称获取值",
        },
        {
          type: "Select",
          label: "岗位名称",
          labelKey: "postNameFrame",
          valueKey: "postId",
          prop: "postName",
          width: "220px",
          change: (row) => this.getPostId(row),
          placeholder: "请先选择机构名称",
        },
        {
          type: "Input",
          label: "岗位编码",
          prop: "postId",
          width: "220px",
          disabled: true,
          placeholder: "请选择岗位名称获取值",
        },
      ],
      editRules: {
        postId: [
          { required: true, message: "请输入机构编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        partyId: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        groupName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 50个字符",
            trigger: "blur",
          },
        ],
        postName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 页码改变
    currentPageChange(page) {
      this.searchData.Header.CurrentPageNum = page;
      this.getList();
    },
    // 每页显示条数改变
    currentSizeChange(size) {
      this.searchData.Header.PageTotalNum = size;
      this.getList();
    },
    getIndex(e) {
      if (e.operate.id === "modify") {
        this.handleUpdate(e.row);
      } else if (e.operate.id === "delete") {
        this.handleDelete(e.row);
      }
      //console.log(e);
    },
    getList() {
      queryOrgPostRelationList(this.searchData).then((response) => {
        if (
          isInclude(response, "roleList") &&
          isType.isArray(response.roleList)
        ) {
          this.tableData.paramData = response.roleList;
          this.tableData.total = parseInt(response.Header.TotalNum);
        }
      });
    },
    //获取机构列表
    async getOrgList() {
      const data = {};
      return await queryOrgList(data);
    },
    //获取岗位列表
    async getPostList(partyId) {
      const data = {
        partyId: partyId,
      };
      return await queryNotExistPostRelation(data);
    },
    //获取岗位下拉框数据
    async getSelectOptionsForPost(partyid) {
      const postListRes = await this.getPostList(partyid);
      this.postList = postListRes.postList;

      //添加修改表单
      this.editForm.forEach((item) => {
        if (item.prop === "postName") {
          this.$set(item, "options", this.postList);
        }
      });
    },
    // 获取下拉框选项
    async getSelectOptions() {
      const orgListRes = await this.getOrgList();

      this.orgList = orgListRes.orgList;
      //添加修改表单
      this.editForm.forEach((item) => {
        if (item.prop === "groupName") {
          this.$set(item, "options", this.orgList);
        }
      });
    },
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取选中的机构名称对应的机构编号
    getPostId(row) {
      this.editData.postId = row;
    },
    //获取选中的岗位名称对应的岗位编号
    getPartyId(row) {
      this.editData.partyId = row;
      this.getSelectOptionsForPost(row);
    },
    //点击新增
    handleCreate(flag) {
      this.isShow = true;
      this.dialogStatus = "create";
      this.editTitle = "新增机构岗位";
      this.getSelectOptions();
    },
    //点击修改
    handleUpdate(row) {
      this.isShow = true;
      this.dialogStatus = "update";
      this.editTitle = "修改机构岗位";
      this.editData = Object.assign({}, row); // copy obj
      this.getSelectOptions();
      //只读设置
      this.editForm.forEach((item) => {
        if (item.prop === "groupName") {
          this.$set(item, "disabled", true);
        }
      });
      //获取只读的组织编码下的机构信息集合
      this.editData.tempPostId = this.editData.postId;
      this.getSelectOptionsForPost(this.editData.partyId);
    },
    //点击删除
    handleDelete(row) {
      this.$confirm(
        `此操作将删除机构岗位(${row.groupName},${row.postName}), 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const reqData = {
            postId: row.postId,
            partyId: row.partyId,
          };
          deleteOrgPostRelation(reqData).then((response) => {
            this.getList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    addInfo() {
      createOrgPostRelation(this.editData).then((response) => {
        this.$refs["editform"].$refs["inlineForm"].resetFields();
        this.isShow = false;
        this.getList();
      });
    },
    editInfo() {
      this.editData.newPostId = this.editData.postId;
      this.editData.postId = this.editData.tempPostId;
      modifyOrgPostRelation(this.editData).then((response) => {
        this.$refs["editform"].$refs["inlineForm"].resetFields();
        this.isShow = false;
        this.getList();
      });
    },
    editFormSubmit(flag) {
      if (typeof flag === "boolean" && flag === true) {
        this.$refs["editform"].$refs["inlineForm"].validate((valid) => {
          if (valid) {
            if (this.dialogStatus === "create") {
              this.addInfo();
            } else {
              this.editInfo();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.org-post-list {
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