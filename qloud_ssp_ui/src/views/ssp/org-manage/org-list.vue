<!--
 * @Descripttion: 组织机构
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-27 14:15:28
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:04:05
--> 
<template>
  <div class="org-list">
    <div class="condition-title">
      <h5>{{ $t('common.operate.searchConditions') }}</h5>
    </div>
    <div>
      <form-view
        labelWidth="110px"
        :searchData="searchData"
        :rules="Rules"
        ref="form"
        :formRef="formRef"
        :searchForm="searchForm"
        :searchHandle="searchHandle"
      ></form-view>
    </div>
    <div class="but">
      <el-button type="primary" @click="handleCreate">{{ $t('common.operate.add') }}</el-button>
    </div>
    <!--表格-->
    <div class="g-table">
      <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        :current-page="searchData.Header.CurrentPageNum"
        :total="tableData.total"
        :loading="tableData.loading"
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
import { queryOrgList, createOrg, updateOrg } from "@/api/ssp/org-manage/org";
import { queryOrgType, queryCommonParamList } from "@/api/ssp/common";
import { getPlaceholderMsg, getPlaceholderMsgForSelect } from "@/utils/i18Util";
import {
  getDataDictionaryList,
  getDataDictionaryParamName,
} from "@/utils/get-data-dictionary";
import { isType, isInclude } from "@/utils";
export default {
  data() {
    return {
      // 下拉框赋值
      // 机构状态
      orgState: [],
      // 机构级别
      orgLevel: [],
      //机构类型
      orgType: [],
      searchData: {
        Header: {
          PageTotalNum: 10, //每页显示数据条数
          CurrentPageNum: 1, //当前第几页
        },
      },
      formRef: "searchForm",
      searchForm: [
        {
          type: "Input",
          label: this.$t("orgmanage.orgId"),
          prop: "orgId",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t("orgmanage.orgId")),
        },
        {
          type: "Input",
          label: this.$t("orgmanage.orgName"),
          prop: "orgName",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t("orgmanage.orgName")),
        },
        {
          type: "Input",
          label: this.$t("orgmanage.superiorManageOrg"),
          prop: "superiorManageOrg",
          width: "220px",
          placeholder: getPlaceholderMsg(
            this.$t("orgmanage.superiorManageOrg")
          ),
        },
        {
          type: "Select",
          label: this.$t("orgmanage.orgType"),
          prop: "orgType",
          width: "220px",
          change: (row) => "",
          placeholder: getPlaceholderMsgForSelect(this.$t("orgmanage.orgType")),
        },
        {
          type: "Select",
          label: this.$t("orgmanage.operatingLevel"),
          labelKey: "paramName",
          valueKey: "paramValue",
          prop: "operatingLevel",
          width: "220px",
          change: (row) => "",
          placeholder: getPlaceholderMsgForSelect(
            this.$t("orgmanage.operatingLevel")
          ),
        },
        {
          type: "Select",
          label: this.$t("orgmanage.orgStatus"),
          labelKey: "paramName",
          valueKey: "paramValue",
          prop: "orgStatus",
          width: "220px",
          change: (row) => "",
          placeholder: getPlaceholderMsgForSelect(
            this.$t("orgmanage.orgStatus")
          ),
        },
      ],
      Rules: {},

      searchHandle: [
        {
          label: this.$t("common.operate.search"),
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },
        {
          label: this.$t("common.operate.reset"),
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      tableData: {
        isOrder: true,
        isPage: true,
        currentPage: 1,
        total: 0,
        operate: {
          width: 200,
          list: [
            {
              label: this.$t("common.operate.edit"),
              id: "modify",
            },
          ],
        },
        showOverflowTooltip: false,
        loading: false,
        paramTableHeader: [
          { prop: "orgId", label: this.$t("orgmanage.orgId") },
          {
            prop: "superiorManageOrg",
            label: this.$t("orgmanage.superiorManageOrg"),
          },
          { prop: "orgName", label: this.$t("orgmanage.orgName") },
          { prop: "typeName", label: this.$t("orgmanage.orgType") },
          {
            prop: "operatingLevelText",
            label: this.$t("orgmanage.operatingLevel"),
          },
          { prop: "orgStatusText", label: this.$t("orgmanage.orgStatus") },
          /* { prop: "string5", label: "支付类型" },
        { prop: "string6", label: "法人编号" }, */
          { prop: "createdStamp", label: this.$t("common.createdStamp") },
          {
            prop: "lastUpdatedStamp",
            label: this.$t("common.lastUpdatedStamp"),
          },
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
        orgId: null,
        orgName: null,
        superiorManageOrg: null,
        operatingLevel: null,
        orgType: null,
        orgStatus: null,
      },
      editIsInline: true,
      editForm: [
        {
          type: "Input",
          label: "机构编码",
          prop: "orgId",
          width: "220px",
          placeholder: "请输入机构编码",
        },
        {
          type: "Input",
          label: "机构名称",
          prop: "orgName",
          width: "220px",
          placeholder: "请输入机构名称",
        },
        {
          type: "Input",
          label: "上级机构编码",
          prop: "superiorManageOrg",
          width: "220px",
          placeholder: "请输入上级机构编码",
        },
        {
          type: "Select",
          label: "机构类型",
          prop: "orgType",
          width: "220px",
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Select",
          label: "机构状态",
          labelKey: "paramName",
          valueKey: "paramValue",
          prop: "orgStatus",
          width: "220px",
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Select",
          label: "机构级别",
          labelKey: "paramName",
          valueKey: "paramValue",
          prop: "operatingLevel",
          width: "220px",
          change: (row) => "",
          placeholder: "请选择",
        },
      ],
      editRules: {
        orgId: [
          { required: true, message: "请输入机构编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: this.$t("rules.message_lengh", ["1", "20"]),
            trigger: "blur",
          },
        ],
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        superiorManageOrg: [
          { required: true, message: "请输入上级机构编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        orgType: [
          { required: true, message: "请选择机构类型", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        orgStatus: [
          { required: true, message: "请选择机构状态", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        operatingLevel: [
          { required: true, message: "请选择机构级别", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getSelectOptions();
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
      }
      //console.log(e);
    },
    getList() {
      this.tableData.loading = true;
      queryOrgList(this.searchData).then((response) => {
        //校验是否存在集合
        if (
          isInclude(response, "orgInfoList") &&
          isType.isArray(response.orgInfoList)
        ) {
          let data = response.orgInfoList;
          data.forEach((item) => {
            item.orgStatusText = getDataDictionaryParamName(
              "100007",
              item.orgStatus
            );
            item.operatingLevelText = getDataDictionaryParamName(
              "100008",
              item.operatingLevel
            );
          });
          this.tableData.paramData = data;
          this.tableData.total = parseInt(response.Header.TotalNum);
          this.tableData.loading = false;
        }
      });
    },
    //获取机构类型
    async getOrgType() {
      const data = {};
      return await queryOrgType(data);
    },
    // 获取下拉框选项
    async getSelectOptions() {
      const orgTypeRes = await this.getOrgType();
      this.orgState = await getDataDictionaryList("100007");
      this.orgLevel = await getDataDictionaryList("100008");

      //校验是否存在
      if (
        isInclude(orgTypeRes, "returnList") &&
        isType.isArray(orgTypeRes.returnList)
      ) {
        this.orgType = orgTypeRes.returnList;
      }

      //搜索表单
      this.searchForm.forEach((item) => {
        if (item.prop === "orgStatus") {
          this.$set(item, "options", this.orgState);
        } else if (item.prop === "operatingLevel") {
          this.$set(item, "options", this.orgLevel);
        } else if (item.prop === "orgType") {
          this.$set(item, "options", this.orgType);
        }
      });
      //添加修改表单
      this.editForm.forEach((item) => {
        if (item.prop === "orgStatus") {
          this.$set(item, "options", this.orgState);
        } else if (item.prop === "operatingLevel") {
          this.$set(item, "options", this.orgLevel);
        } else if (item.prop === "orgType") {
          this.$set(item, "options", this.orgType);
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
    //点击新增
    handleCreate(flag) {
      this.isShow = true;
      this.dialogStatus = "create";
      this.editTitle = "新增";
    },
    //点击修改
    handleUpdate(row) {
      this.isShow = true;
      this.dialogStatus = "update";
      this.editTitle = "修改";
      this.editData = Object.assign({}, row); // copy obj
      //只读设置
      this.editForm.forEach((item) => {
        if (item.prop === "orgId") {
          this.$set(item, "disabled", true);
        }
      });
    },
    addInfo() {
      createOrg(this.editData).then((response) => {
        this.$refs["editform"].$refs["inlineForm"].resetFields();
        this.isShow = false;
        this.getList();
      });
    },
    editInfo() {
      updateOrg(this.editData).then((response) => {
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
.org-list {
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