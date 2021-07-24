<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-27 16:21:17
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 14:55:28
--> 

<template>
  <businessLayout>
    <template v-slot:bussiness-main>
      <div class="bussiness-padding-20">
        <formView
          class="flow-form"
          labelWidth="180px"
          :searchData="formData.searchData"
          :isInline="formData.isInline"
          :rules="formData.Rules"
          ref="ruleForm"
          :formRef="formData.formRef"
          :searchForm="formData.searchForm"
          :searchHandle="formData.searchHandle"
        />
        <div class="business-tabel-height">
          <tableView
            :operateObj="tableData.operate"
            :tableHeaderData="tableData.paramTableHeader"
            :tableData="tableData.tableData"
            :isPage="tableData.isPage"
            v-on:operate="getIndex"
            :total="tableData.totalRows"
            :currentPage="curPage"
            @getPage="tablePageSearch"
          />
        </div>
        <popup
          :title="'流程审批记录'"
          :isShow="isPopupShow"
          :size="popupSize"
          :footerList="popupTable.footerList"
          v-on:senddialogVisible="getdialogVisible"
        >
          <template slot="content">
            <tableView
              :tableHeaderData="popupTable.paramTableHeader"
              :tableData="popupTable.tableData"
              :isPage="popupTable.isPage"
              :currentPage="1"
            />
          </template>
        </popup>
      </div>
    </template>
  </businessLayout>
</template>

<script>
import businessLayout from "./business-layout";
import { historyInstanceSearch, flowInstanceTable } from "@/api/fop/business-search"
import { isType, isInclude } from "@/utils"
import { renderTableProp } from "./business-untils.js"

export default {
  name: "history-instance-search",
  components: {
    businessLayout,
  },
  data() {
    return {
      curPage: 1,
      formData: {
        isInline: true,
        searchData: {
          createInstanceStartTime: "",
          createInstanceEndDate: "",
          endInstanceStartTime: "",
          endInstanceEndDate: "",
          flowCode: "",
          flowId: "",
        },
        formRef: "historyForm",
        searchForm: [
          {
            type: "Time",
            label: "实例创建的开始时间:",
            prop: "createInstanceStartTime",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Date",
            label: "实例创建的截至日期:",
            prop: "createInstanceEndDate",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Time",
            label: "实例结束的开始时间:",
            prop: "endInstanceStartTime",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Date",
            label: "实例结束的截至日期:",
            prop: "endInstanceEndDate",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "流程编码",
            prop: "flowCode",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "流程实例ID:",
            prop: "flowId",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          {
            label: "检索",
            type: "primary",
            handle: () => this.searchHandleForm('ruleForm', this.formData.formRef, "searchHistoryFlow"),
          },

          {
            label: "重置",
            type: "primary",
            handle: () => this.resetForm('ruleForm', this.formData.formRef),
          },
        ],
      },
      tableData: {
        isPage: true,
        totalRows: 0,
        operate: {
          width: 150,
          list: [
            { id: 0, label: "审批轨迹"},
            { id: 1, label: "流程图"} 
          ],
        },
        paramTableHeader: [
          { prop: "number", label: "序号" },
          { prop: "id", label: "流程实例ID" },
          { prop: "code", label: "流程定义编码" },
          { prop: "start", label: "发起人" },
          { prop: "createTime", label: "创建时间" },
          { prop: "timeoutTime", label: "超时时间" },
          { prop: "isTimeout", label: "是否超时" },
          { prop: "flowState", label: "流程状态" },
        ],
        tableData: [],
      },
      isPopupShow: false,
      popupSize: 'medium',
      popupTable: {
        tableData: [],
        paramTableHeader: [
          { prop: "number", label: "序号" },
          { prop: "id", label: "流程实例ID" },
          { prop: "tasksId", label: "任务ID" },
          { prop: "nodeType", label: "节点类型" },
          { prop: "nodeName", label: "节点名称" },
          { prop: "subTime", label: "提交时间" },
          { prop: "processMen", label: "处理人" },
          { prop: "processResult", label: "处理结果" },
          { prop: "processOpinion", label: "处理意见" },
        ],
        isPage: true,
        footerList: [{ type: "primary", name: "关闭" }],
      },
    };
  },
  methods: {
    /**
     * @description: 接收点击 tree 节点的数据对象，与搜索条件合并 
     * @param: { processFirst: "", processSecond: "" }
     * @return: 
     */
    setProcessObj(obj) {
      Object.assign(this.formData.searchData, obj);
      this.curPage = 1;
      this.searchHistoryFlow();
    },
    /**
     * @description: 点击页码，修改查询页码
     * @param: 
     * @return: 
     */
    tablePageSearch(page) {
      this.curPage = Number(page);
      this.searchHistoryFlow();
    },
    /**
     * @description: 历史流程实例查询
     * @param: 
     * @return: 
     */
    searchHistoryFlow() {
      Object.assign(this.formData.searchData, { curPage: this.curPage });
      historyInstanceSearch(this.formData.searchData).then(({Header, pageData}) => {
        if (isType.isDataType("Object")(pageData) && isInclude(pageData, "result") && Array.isArray(pageData.result)) {
          this.resStatus(Header.RetMsg, Header.RetStatus);
          this.tableData.tableData = pageData.result.map(item => {
            item.customIsTime = item.isTime == "0" ? "正常" : "超时";
            item.customFlowType = renderTableProp(
              [
                {type: "0", value: "未完成"},
                {type: "1", value: "已结束"},
                {type: "2", value: "实例挂起"},
              ],
              item.workState);
            return item;
          });
          this.tableData.totalRows = pageData.totalRows;
        }
      });
    },
     /**
     * @description: table操作列按钮点击
     * @param : 操作列数据
     * @return : 
     */	
    getIndex({ row, operate }) {
      if (operate.id === 0) {
        this.getFlowHistoryTable(row.processId);
        this.isPopupShow = true;
      } 
    },
    // 隐藏 Popup
    getdialogVisible() {
      this.isPopupShow = false;
    },
    resetForm(form, formName) {
      this.$refs[form].$refs[formName].resetFields();
      if (this.isPopupShow) {
        this.getdialogVisible();
      }
		},
    async searchHandleForm(form, formName, fn) {
      await this.$refs[form].$refs[formName].validate((valid) => {
				if (valid) {
          console.log('submit!');
          fn ? this[fn]() : "";
				} else {
					console.log('error submit!!');
					return false;
				}
			});
    },
     /**
     * @description: table操作列按钮点击
     * @param : 操作列数据 processId
     * @return : 
     */	
    getFlowHistoryTable (processId) {
      flowInstanceTable({processId}).then(({Header, pageData}) => {
        if (isType.isDataType("Object")(pageData) && isInclude(pageData, "result") && Array.isArray(pageData.result)) {
          this.resStatus(Header.RetMsg, Header.RetStatus);
          this.popupTable.tableData = pageData.result.map(item => {
            item.customTaskType = renderTableProp(
              [
                {type: "task", value: "任务节点"},
                {type: "approve", value: "审批节点"},
                {type: "auto", value: "字段节点"},
                {type: "subproc", value: "子流程节点"},
                {type: "sign", value: "会签节点"},
              ],
            item.taskType);
            return item;
          });
        }
      });
    },
    /**
     * @description: 接口返回状态返回显示
     * @param: msg 消息，status 返回接口状态 
     * @return {type} 
     */
    resStatus(msg, status) {
      let rstatus = "";
      // if (status === "S") {
      //   rstatus = "success";
      // } else
      if(status === "F") {
        rstatus = "warning";
      }
      if (rstatus) {
        this.$message({
          message: msg,
          type: rstatus
        });
      }
    }
  },
};
</script>
<style lang='scss' scoped>
  .business-tabel-height {
    height: calc(100vh - 260px);
  }
  .bussiness-padding-20 {
    padding: 20px;
  }
</style>