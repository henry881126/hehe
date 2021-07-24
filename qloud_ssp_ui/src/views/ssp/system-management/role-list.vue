<template>
  <div class="home">
    <div class="til">
      <p>{{ $t('common.operate.searchConditions') }}</p>
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
      <el-button type="primary" @click="addSubmit">{{ $t('common.operate.add') }}</el-button>
    </div>
    <div class="g-table">
      <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        :current-page="searchData.Header.CurrentPageNum"
        v-on:operate="getIndex"
        :total="tableData.total"
        @getPage="currentPageChange"
        @getPageSize="currentSizeChange"
      />
    </div>
    <!-- 弹出层 -->
    <div>
      <popup :isShow="isShow" :title="text" :size="size" v-on:senddialogVisible="getdialogVisible">
        <template slot="content">
          <form-view
            labelWidth="120px"
            :searchData="editSearchData"
            :rules="Rules"
            ref="editform"
            :formRef="editFormRef"
            :isInline="isInline"
            :searchForm="editSearchForm"
            :searchHandle="editSearchHandle"
          ></form-view>
        </template>
      </popup>
    </div>
    <!--  权限分配弹出层 -->
    <el-dialog :visible.sync="dialogFormVisible1">
      <template>
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入城市拼音"
          v-model="value"
          :data="permissionsListData"
        ></el-transfer>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{ $t('common.operate.confirm') }}</el-button>
        <el-button type="primary">{{ $t('common.operate.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  addRole,
  updateRole,
  deleteRole,
  PermissionsListRole,
} from "@/api/ssp/system-management/role";
import { getPlaceholderMsg, getPlaceholderMsgForSelect } from "@/utils/i18Util";
import { isType, isInclude } from "@/utils";
export default {
  name: "Home",
  data() {
    return {
      //-------
      dialogFormVisible1: false,
      permissionsListData: [],
      value:[],
      filterMethod(query, item) {
        console.log(" item", item);
        console.log("query", query);
        return item.permissionsName.indexOf(query) > -1;
      },
      //-------
      searchData: {
        roleId: null,
        roleName: null,
        Header: {
          PageTotalNum: 10, // 每页显示数据条数
          CurrentPageNum: 1, // 当前第几页
        },
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: this.$t('sysManage.roleId') ,
          prop: "roleId",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.roleId')),
        },

        {
          type: "Input",
          label: this.$t('sysManage.roleName'),
          prop: "roleName",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.roleName')),
        },

        // {
        //   type: "Input",
        //   label: "权限编码",
        //   prop: "jurisdictioncodejurisdiction",
        //   width: "220px",
        //   placeholder: "请输入年龄",
        // },
        // {
        //   type: "Input",
        //   label: "权限名称",
        //   prop: "jurisdictionname",
        //   width: "220px",
        //   placeholder: "请输入年龄",
        // },
      ],
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },

      searchHandle: [
        {
          label: this.$t('common.operate.search'),
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        {
          label: this.$t('common.operate.reset'),
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: [{label:this.$t('sysManage.powerDivision'),id: "1"}, {label: this.$t('common.operate.edit'),id: "2"}, {label: this.$t('common.operate.delete'),id: "3"}],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "roleId", label: this.$t('sysManage.roleId') },
          { prop: "roleName", label: this.$t('sysManage.roleName') },
          { prop: "roleDescribe", label: this.$t('sysManage.roleDescribe') },
          { prop: "systemFlag", label: this.$t('sysManage.systemFlag') },
          { prop: "isManager", label: this.$t('sysManage.isManager') },
        ],
        paramData: [],
      },
      // 弹出层部分
      isShow: false,
      size: "small",
      isInline: false,
      text: "",
      editSearchData: {
        roleId: null,

        roleName: null,

        roleType: "2",

        isManager: null,

        roleDescribe: null,
      },
      editFormRef: "inlineForm",
      editSearchHandle: [
        {
          label: this.$t('common.operate.confirm'),
          type: "primary",
          handle: () => this.editSearchHandleForm(this.formRef),
        },

        {
          label: this.$t('common.operate.cancel'),
          type: "",
          handle: () => this.editresetForm(this.formRef),
        },
      ],
      editSearchForm: [
        {
          type: "Input",
          label: this.$t('sysManage.roleId'),
          prop: "roleId",
          width: "220px",
          disabled: false,
          placeholder: getPlaceholderMsg(this.$t('sysManage.roleId')),
        },
        {
          type: "Input",
          label: "角色名称",
          prop: this.$t('sysManage.roleName'),
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.roleName')),
        },
        {
          type: "Input",
          label: "角色名称",
          prop: "roleType",
          disabled: true,
          width: "220px",
          placeholder: "请输入内容",
        },
        {
          type: "Switch",
          label: this.$t('sysManage.isManager'),
          prop: "isManager",
        },
        {
          type: "Input",
          label: this.$t('sysManage.roleDescribe'),
          prop: "roleDescribe",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.roleDescribe')),
          typetext: "textarea",
        },
      ],
      typetext: "text",
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getIndex(e) {
      console.log(e)
      if (e.operate.id === "1") {
        this.PermissionsListRole(e);
        this.dialogFormVisible1 = true;
      } else if (e.operate.id === "2") {
        console.log("e", e);
        this.isShow = true;
        this.editSearchData = Object.assign(e.row);
        this.text = "修改";
        this.editSearchForm[0].disabled = true;
      } else if (e.operate.id === "3") {
        this.deleteRole(e.row);
      }
    },
    currentPageChange(page) {
      console.log("page", page);
      this.searchData.Header.CurrentPageNum = page;
      this.getList();
    },
    // 每页显示条数改变
    currentSizeChange(size) {
      console.log("size", size);
      this.searchData.Header.PageTotalNum = size;
      this.getList();
    },
    //角色列表页
    getList() {
      //列表
      console.log("列表this.searchData", this.searchData);
      roleList(this.searchData).then((response) => {
        console.log("response--", response);
        this.tableData.paramData = response.roleListInfo;
        this.$set(this.tableData, "total", Number(response.Header.TotalNum));
      });
    },
    // 新增
    addSubmit() {
      this.isShow = true;
      this.text = "新增";
      this.editSearchForm[0].disabled = false;
    },
    addRole(formName) {
      if (!this.editSearchData.isManager) {
        this.editSearchData.isManager = "1";
      } else {
        this.editSearchData.isManager = "0";
      }
      console.log("this.editSearchData", this.editSearchData);
      addRole(this.editSearchData).then((response) => {
        console.log("response", response);
        this.$refs["editform"].$refs[formName].resetFields();
        this.$nextTick(() => {
          this.isShow = false;
          this.getList();
        });
      });
    },
    //修改
    updateRole(formName) {
      if (!this.editSearchData.isManager) {
        this.editSearchData.isManager = "1";
      } else {
        this.editSearchData.isManager = "0";
      }
      console.log("修改this.editSearchData", this.editSearchData);
      updateRole(this.editSearchData).then((response) => {
        console.log("response", response);
        this.$refs["editform"].$refs[formName].resetFields();
        this.$nextTick(() => {
          this.isShow = false;
          this.getList();
        });
      });
    },
    // 滑块
    async editSearchHandleForm(formName) {
      console.log(this.text);
      console.log("formName", formName);
      await this.$refs["editform"].$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid", valid);
          if (this.text === "新增") {
            this.addRole(formName);
          } else if (this.text === "修改") {
            this.updateRole(formName);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查询角色未关联的权限
    PermissionsListRole(e) {
      console.log("分配e", e);
      const PermissionsParaData = {
        roleId: e.row.roleId,
        pageNum: "1",
        pageSize: "10",
      };
      PermissionsListRole(PermissionsParaData).then((response) => {
        console.log("分配response", response);
        this.permissionsListData = response.permissionsList;
        this.permissionsListData = this.permissionsListData.map(
          (item, index) => {
            item.label = item.permissionsName;
            item.key = index;
            return item;
          }
        );
      });
    },
    // 删除场景项
    deleteRole(data) {
      this.$confirm(`此操作将删除场景"${data.roleName}", 是否继续?`, "提示", {
        confirmButtonText: this.$t('common.operate.confirm'),
        cancelButtonText: this.$t('common.operate.cancel'),
        type: "warning",
      })
        .then(() => {
          const reqData = {
            roleId: data.roleId,
          };
          deleteRole(reqData).then((response) => {
            this.getList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          this.searchData.Header.CurrentPageNum = 1;
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
  },
};
</script>
<style scoped>
.demo-form-inline {
  margin: 0 100px;
}
.but {
  height: 100%;
  width: 100%;
  align-content: center;
  margin: 20px;
}
.til {
  margin: 20px;
  font-size: 18px;
}
.g-table {
  height: calc(100vh - 370px);
}
</style>