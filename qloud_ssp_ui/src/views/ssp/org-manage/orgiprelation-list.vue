<!--
 * @Descripttion: 机构IP关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-27 14:15:28
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:27:18
--> 
<template>
  <div class="org-ip-list">
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
      <el-button type="primary" @click="addSubmit">新增</el-button>
    </div>
    <div class="g-table">
      <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        v-on:operate="getIndex"
      />
    </div>
    <div>
      <popup
        :isShow="isShow"
        :title="editTitle"
        :size="size"
        :footerList="footerList"
        v-on:senddialogVisible="getdialogVisible"
      >
        <template slot="content">
          <form-view
            labelWidth="80px"
            :searchData="editSearchData"
            :rules="Rules"
            ref="editform"
            :isInline="editIsInline"
            :formRef="editFormRef"
            :searchForm="editSearchForm"
          ></form-view>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
let iptype = [
  { label: "单个IP", value: "1" },
  { label: "IP段", value: "2" },
];
let iptypeProps = { label: "label", value: "value" };
export default {
  data() {
    return {
      // 列表搜索
      searchData: {
        orgName: null,
        ip: null,
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "机构名称",
          prop: "orgName",
          width: "220px",
          placeholder: "请输入机构名称",
        },

        {
          type: "Input",
          label: "IP",
          prop: "ip",
          width: "220px",
          placeholder: "请输入IP",
        },
      ],
      Rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 1, max: 99, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        ip: [
          { required: true, message: "请输入IP", trigger: "blur" },
          { min: 1, max: 50, message: "请输入有效ip地址", trigger: "blur" },
        ],
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
      // 列表数据
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
          /*   { prop: "serial", label: "序号" }, */
          { prop: "orgId", label: "机构编码" },
          { prop: "orgName", label: "机构名称" },
          { prop: "ip", label: "IP" },
          { prop: "starttime", label: "创建时间" },
          { prop: "undatatime", label: "更新时间" },
        ],
        paramData: [
          {
            // serial: "1",
            orgId: "01",
            orgName: "机构名称1",
            ip: "192.168.1.1",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            // serial: "2",
            orgId: "02",
            orgName: "机构名称2",
            ip: "192.168.1.1",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            // serial: "3",
            orgName: "机构名称3",
            orgId: "03",
            ip: "192.168.1.1",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
      // 弹窗部分数据
      isShow: false,
      editTitle: "新增",
      size: "small",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      editSearchData: {
        name: null,

        age: null,

        iptype: null,

        date: "",
      },
      editIsInline: false,
      editFormRef: "inlineForm",
      editSearchForm: [
        {
          type: "InputHandle",
          label: "机构名称",
          prop: "jurisdictioncode",
          width: "200px",
          placeholder: "请输入内容",
          buttonText: "搜索",
          buttonType: "primary",
          buttonClick: () => {
            alert("----查询树---------");
          },
        },
        {
          type: "Select",
          label: "IP类型",
          prop: "iptype",
          width: "200px",
          options: iptype,
          props: iptypeProps,
          placeholder: "请选择",
          change: (row) => this.ipTypeHandleForm(this.editSearchData.iptype),
        },
        {
          type: "Input",
          label: "IP",
          prop: "jurisdictionname",
          width: "200px",
          show: true,
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "开始IP",
          prop: "startip",
          width: "200px",
          show: false,
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "结束IP",
          prop: "endip",
          width: "200px",
          show: false,
          placeholder: "请输入内容",
        },
      ],
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getIndex(e) {
      if (e.operate.id === "modify") {
        this.editSubbmit(e.row);
      } else if (e.operate.id === "delete") {
        this.deleteSubmit(e.row);
      }
      console.log(e);
    },
    onSubmit() {},
    addSubmit() {
      this.isShow = true;
      this.editTitle = "新增机构IP";
    },
    editSubbmit() {
      this.isShow = true;
      this.editTitle = "修改机构IP";
    },
    deleteSubmit() {
      console.log(删除);
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async ipTypeHandleForm(iptype) {
      if (iptype === "2") {
        this.editSearchForm[2].show = false;
        this.editSearchForm[3].show = true;
        this.editSearchForm[4].show = true;
      } else {
        this.editSearchForm[2].show = true;
        this.editSearchForm[3].show = false;
        this.editSearchForm[4].show = false;
      }
    },
    //弹出窗口关闭
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.org-ip-list {
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