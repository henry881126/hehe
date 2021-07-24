<!--
 * @Descripttion: 
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 16:01:12
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 19:33:29
-->
<template>
  <div class="g-customers">
    <div class="m-container">
      <div class="m-info_warp m-info">
        <h2 class="p14 c3">群基本信息</h2>
        <div class="but-right">
          <el-button type="primary" @click="handPreserve">维护</el-button>
        </div>
        <formView
          class="g-form"
          ref="parentWarp"
          :formRef="form.formRef"
          :searchForm="form.editForm"
          :searchData="form.editData"
        />
      </div>

      <div class="m-info_container m-info">
        <h2 class="p14 c3">群客户名单</h2>
        <div class="but">
          <el-button type="primary" @click="handleCreate">{{ $t('common.operate.add') }}</el-button>
        </div>
        <div class="g-table">
          <tableView
            :operateObj="tableData.operate"
            :tableHeaderData="tableData.tableHeaderData"
            :tableData="tableData.tableData"
            :isPage="tableData.isPage"
            :current-page="searchData.Header.CurrentPageNum"
            :pageSize="tableData.pageSize"
            :total="tableData.total"
            :loading="tableData.loading"
            v-on:getPageSize="currentSizeChange"
            v-on:getPage="currentPageChange"
            v-on:operate="getIndex"
          />
        </div>
      </div>
    </div>

    <!--客户群名单新增-->
    <div class="g-dialog_box">
      <popup
        :isShow="form_custom.isShow"
        :title="form_custom.editTitle"
        :size="form_custom.size"
        :footerList="form_custom.footerList"
        v-on:senddialogVisible="editFormSubmit"
      >
        <template slot="content">
          <form-view
            labelWidth="110px"
            :searchData="form_custom_grop.editData"
            :rules="form_custom_grop.editRules"
            :isInline="form_custom_grop.editIsInline"
            :formRef="form_custom_grop.formRef"
            ref="editgroupform"
            :searchForm="form_custom_grop.editForm"
            :searchHandle="form_custom_grop.editSearchHandle"
          ></form-view>
          <div class="m-s_form">
            <form-view
              labelWidth="110px"
              :searchData="form_custom.editData"
              :rules="form_custom.editRules"
              :isInline="form_custom.editIsInline"
              :formRef="form_custom.formRef"
              ref="editform"
              :searchForm="form_custom.editForm"
            ></form-view>
          </div>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import { getPlaceholderMsg } from "@/utils/i18Util";
export default {
  data() {
    return {
      searchData: {
        Header: {
          PageTotalNum: 10, //每页显示数据条数
          CurrentPageNum: 1, //当前第几页
        },
      },
      tableData: {
        isOrder: true,
        isPage: true,
        currentPage: 1,
        total: 20,
        pageSize: 10,
        operate: {
          width: 200,
          list: [
            {
              label: "修改",
              id: "modify",
            },
            {
              label: "删除",
              id: "delete",
            },
          ],
        },
        showOverflowTooltip: false,
        loading: false,
        tableHeaderData: [
          { prop: "doorId", label: "客户编码" },
          { prop: "custName", label: "客户名称" },
          { prop: "idenNum", label: "证件号码" },
          { prop: "industry", label: "所属行业" },
          { prop: "telNum", label: "手机号" },
          { prop: "address", label: "客户地址" },
          { prop: "orgStatusText", label: "预授信" },
          { prop: "targetCustFlag", label: "是否目标客户" },
          { prop: "blackCustFla", label: "黑名单标识" },
          { prop: "details", label: "详细信息" },
        ],
        tableData: [
          {
            doorId: "0101",
            custName: "客户名称001",
            idenNum: "612344567789890987",
            industry: "金融",
            telNum: "17709898980",
            address: "陕西省西安市",
            orgStatusText: "001",
            targetCustFlag: "否",
            blackCustFla: "是",
            details: "信息01",
          },
          {
            doorId: "0102",
            custName: "客户名称002",
            idenNum: "612344567789890987",
            industry: "金融",
            telNum: "17709898980",
            address: "陕西省西安市",
            orgStatusText: "001",
            targetCustFlag: "是",
            blackCustFla: "否",
            details: "信息02",
          },
        ],
      },
      // 弹窗部分数据
      form_custom: {
        formRef: "cusgroupForm",
        isShow: false,
        editTitle: "新增",
        size: "small",
        editSearchHandle: [
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
            label: "客户名称",
            prop: "name",
            width: "220px",
            placeholder: "请输入客户名称",
          },
          {
            type: "Select",
            label: "证件类型",
            prop: "orgType",
            width: "220px",
            change: (row) => "",
            placeholder: "请选择",
          },
          {
            type: "Input",
            label: "证件号码",
            prop: "orgName",
            width: "220px",
            placeholder: "请输入证件号码",
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
        },
      },
      //群客户信息
      form_custom_grop: {
        formRef: "cusgroupForm",
        isShow: false,
        editTitle: "新增",
        size: "small",
        editSearchHandle: [
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
            label: "客户名称",
            prop: "name",
            width: "220px",
            placeholder: "请输入客户名称",
          },
          {
            type: "Select",
            label: "证件类型",
            prop: "orgType",
            width: "220px",
            change: (row) => "",
            placeholder: "请选择",
          },
          {
            type: "Input",
            label: "证件号码",
            prop: "orgName",
            width: "220px",
            placeholder: "请输入证件号码",
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
        },
      },
      //群客户名单
      form_custom: {
        formRef: "cusForm",
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
            label: "客户编号",
            prop: "custId",
            width: "220px",
            disabled: true,
            placeholder: "请输入客户编号",
          },
          {
            type: "Input",
            label: "客户名称",
            prop: "custName",
            width: "220px",
            disabled: true,
            placeholder: "请输入客户名称",
          },
          {
            type: "Input",
            label: "联系人",
            prop: "contacts",
            width: "220px",
            disabled: true,
            placeholder: "请输入联系人",
          },
          {
            type: "Input",
            label: "手机号码",
            prop: "telNum",
            width: "220px",
            disabled: true,
            placeholder: "请输入手机号码",
          },
          {
            type: "Input",
            label: "所属行业",
            prop: "industry",
            width: "220px",
            disabled: true,
            placeholder: "请输入所属行业",
          },
          {
            type: "Input",
            label: "联系地址",
            prop: "address",
            width: "220px",
            disabled: true,
            placeholder: "请输入所属行业",
          },
          {
            type: "Input",
            label: "群编号",
            prop: "groupNo",
            width: "220px",
            disabled: true,
            placeholder: "请输入群编号",
          },
          {
            type: "Select",
            label: "证件类型",
            prop: "idenType",
            width: "220px",
            disabled: true,
            change: (row) => "",
            placeholder: "请选择",
          },
          {
            type: "Input",
            label: "证件号码",
            prop: "idenNum",
            width: "220px",
            disabled: true,
            placeholder: "请输入证件号码",
          },
          {
            type: "Select",
            label: "是否目标客户",
            prop: "targetCustFlag",
            width: "220px",
            change: (row) => "",
            placeholder: "请选择",
          },
          {
            type: "Textarea",
            label: "备注",
            prop: "remarks",
            width: "220px",
            placeholder: "请输入内容",
          },
        ],
        editRules: {
          custName: [
            { required: true, message: "请输入客户名称", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          groupNo: [
            { required: true, message: "请输入群编码", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          idenType: [
            { required: true, message: "请选择证件类型", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          idenNum: [
            { required: true, message: "请输入证件号码", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
        },
      },
      form: {
        formRef: "cusDetailsForm",
        editData: {
          groupName: "",
          groupId: "",
          groupLeader: "",
        },
        editForm: [
          {
            type: "Input",
            label: "群名称",
            prop: "groupName",
            width: "220px",
            disabled: true,
            placeholder: "请输入群名称",
          },
          {
            type: "Select",
            label: "群类型",
            prop: "groupType",
            width: "220px",
            disabled: true,
            change: (row) => "",
            placeholder: "请选择",
          },
          {
            type: "Input",
            label: "群主",
            prop: "groupId",
            width: "220px",
            disabled: true,
            placeholder: "请输入群主",
          },
          {
            type: "Input",
            label: "联系人",
            prop: "contacts",
            width: "220px",
            disabled: true,
            placeholder: "请输入联系人",
          },
          {
            type: "Input",
            label: "主要产品",
            prop: "product",
            width: "220px",
            disabled: true,
            placeholder: "请输入主要产品",
          },
          {
            type: "Input",
            label: "所属机构",
            prop: "org",
            width: "220px",
            disabled: true,
            placeholder: "请输入所属机构",
          },
        ],
        editRules: {
          groupName: [
            { required: true, message: "请输入群名称", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          groupType: [
            { required: true, message: "请选择群类型", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          groupId: [
            { required: true, message: "请输入群主", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
          contacts: [
            { required: true, message: "请输入联系人", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: this.$t("rules.message_lengh", ["1", "20"]),
              trigger: "blur",
            },
          ],
        },
        editHandle: [
          {
            label: this.$t("customers.searchForm.search"),
            type: "primary",
            handle: () => this.handleForm(this.form.formRef),
          },

          {
            label: this.$t("customers.searchForm.reset"),
            type: "primary",
            handle: () =>
              this.$refs["parentWarp"].$refs[this.form.formRef].resetFields(),
          },
        ],
      },
    };
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
    // 点击维护
    handPreserve(){
      this.$router.push({
        path:"/add-client-base",
      })  
    },
    //点击新增
    handleCreate(flag) {
      this.form_custom.isShow = true;
      this.form_custom.dialogStatus = "create";
      this.form_custom.editTitle = "新增";
    },
    //点击修改
    handleUpdate(row) {
      this.form_custom.isShow = true;
      this.form_custom.dialogStatus = "update";
      this.form_custom.editTitle = "修改";
      this.form_custom.editData = Object.assign({}, row); // copy obj
      //只读设置
      this.editForm.forEach((item) => {
        if (item.prop === "orgId") {
          this.$set(item, "disabled", true);
        }
      });
    },
    //点击删除
    handleDelete(row) {
      this.$confirm(`此操作将删除该信息, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const reqData = {
            postId: row.postId,
            partyId: row.partyId,
          };
          /* deleteOrgPostRelation(reqData).then((response) => {
            this.getList();
          }); */
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    async handleForm(formName) {
      await this.$refs["parentWarp"].$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editFormSubmit(flag) {
      if (typeof flag === "boolean" && flag === true) {
        this.$refs["editgroupform"].$refs["cusgroupForm"].validate((valid) => {
          if (valid) {
            if (this.form_custom.dialogStatus === "create") {
              console.info("保存成功");
              //this.addInfo();
            } else {
              console.info("修改成功");
              //this.editInfo();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.form_custom.isShow = false;
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "@/styles/variables.scss";
.g-customers {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  .m-container {
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    .m-info_warp {
      .g-form {
        padding: 10px;
      }
    }
    .m-info {
      h2 {
        padding-left: 10px;
        border-left: 3px solid $primaryColor;
        height: 15px;
        line-height: 15px;
      }
      .but-right {
        align-content: right;
        margin: 20px;
      }
    }
    .m-info_container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .but {
        align-content: center;
        margin: 20px;
      }
      .g-table {
        flex: 1;
      }
    }
  }
  .g-dialog_box {
    .m-s_form {
      margin-top: 20px;
    }
  }
}
</style>
