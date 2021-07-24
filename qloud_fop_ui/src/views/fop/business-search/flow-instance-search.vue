<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-27 15:10:46
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 20:07:08
-->

<template>
  <businessLayout @processObj="setProcessObj">
    <template v-slot:bussiness-main>
      <div class="bussiness-main">
        <formView
          class="flow-form"
          labelWidth="180px"
          :searchData="formData.searchData"
          :isInline="formData.isInline"
          :rules="formData.Rules"
          ref="form"
          :formRef="formData.formRef"
          :searchForm="formData.searchForm"
          :searchHandle="formData.searchHandle"
        />
        <div class="business-tabel-height">
          <tableView
            :operateObj="tableData.operate"
            :tableHeaderData="tableData.tableHeaderData"
            :tableData="tableData.tableData"
            :isPage="tableData.isPage"
            v-on:operate="getIndex"
            :total="tableData.totalRows"
            :currentPage="curPage"
            @getPage="tablePageSearch"
          />
        </div>
        <popup
          :title="popupTitle"
          :isShow="isPopupShow"
          :size="popupSize"
          :footerList="popFooterList"
          v-on:senddialogVisible="getdialogVisible"
        >
          <template slot="content">
            <tableView
              v-if="popupId=='0'"
              :tableHeaderData="popupTable.tableHeaderData"
              :tableData="popupTable.tableData"
              :isPage="popupTable.isPage"
              :total="popupTable.tableData.length"
              :currentPage="1"
            />
            <formView
              v-else-if="popupId=='4'"
              labelWidth="130px"
              :searchData="popupEndForm.searchData"
              :isInline="popupEndForm.isInline"
              ref="popupEndForm"
              :formRef="popupEndForm.formRef"
              :searchForm="popupEndForm.searchForm"
            />
            <formView
              v-else-if="popupId=='5'"
              labelWidth="130px"
              :searchData="popupForm.searchData"
              :isInline="popupForm.isInline"
              :rules="popupForm.Rules"
              ref="popupForm"
              :formRef="popupForm.formRef"
              :searchForm="popupForm.searchForm"
              
            />
            <!-- :searchHandle="popupForm.searchHandle" -->
            <p v-else>
              确定执行{{popupTitle}}操作吗？
            </p>
          </template>
        </popup>
      </div>
    </template>
  </businessLayout>
</template>

<script>
import businessLayout from "./business-layout";
import { flowInstanceSearch, flowInstanceTable, flowInstanceExtendTimeOut,
flowInstanceEnd, flowInstanceHangUp } from "@/api/fop/business-search"
import { isType, isInclude } from "@/utils"
import { renderTableProp } from "./business-untils.js"

export default {
  name: "flow-instance-search",
  components: {
    businessLayout,
  },
  data() {
    return {
      curPage: 1,
      pageRows: 10,
      formData: {
        isInline: true,
        searchData: {
          createTimeBegin: "",
          createTimeEnd: "",
          processCode: "",
          processId: "",
          pageRows: 10,
        },
        formRef: "inlineForm",
        searchForm: [
          {
            type: "DateTime",
            label: this.$t("businessSearch.businessSearch.createTimeBegin"),
            prop: "createTimeBegin",
            width: "220px",
            placeholder: "",
          },
          {
            type: "DateTime",
            label: this.$t("businessSearch.businessSearch.createTimeEnd"),
            prop: "createTimeEnd",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: this.$t("businessSearch.businessSearch.processCode"),
            prop: "processCode",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: this.$t("businessSearch.businessSearch.processId"),
            prop: "processId",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          {
            label: this.$t("businessSearch.fop.search"),
            type: "primary",
            handle: () => this.searchHandleForm('form', this.formData.formRef, "searchInstanceFlow"),
          },
          {
            label: this.$t("businessSearch.fop.reset"),
            type: "primary",
            handle: () => this.resetForm('form', this.formData.formRef),
          },
        ],
      },
      tableData: {
        isPage: true,
        totalRows: 0,
        operate: {
          width: 140,
          list: [
            { id: 0, label: this.$t("businessSearch.businessSearch.approvalTrack") },
            { id: 1, label: this.$t("businessSearch.businessSearch.flowChart") },
            { id: 2, label: this.$t("businessSearch.businessSearch.hang") },
            { id: 3, label: this.$t("businessSearch.businessSearch.restore") },
            { id: 4, label: this.$t("businessSearch.businessSearch.termination") },
            { id: 5, label: this.$t("businessSearch.businessSearch.TimeoutExtension") },
          ],
        },
        tableHeaderData: [
          { prop: "processId", label: this.$t("businessSearch.businessSearch.flowInstanceId") },
          { prop: "processCode", label: this.$t("businessSearch.businessSearch.approvalTrack") },
          { prop: "startUserId", label: this.$t("businessSearch.businessSearch.sponsor") },
          { prop: "createTime", label: this.$t("businessSearch.businessSearch.createTime") },
          { prop: "estEndTime", label: this.$t("businessSearch.businessSearch.estEndTime") },
          { prop: "customIsTime", label: this.$t("businessSearch.businessSearch.isTime"), width: "100" },
          { prop: "customFlowType", label: this.$t("businessSearch.businessSearch.flowType"), width: "100" },
        ],
        tableData: [],
      },
      popupTitle: this.$t("businessSearch.businessSearch.processApprovalRecord"),
      isPopupShow: false,
      popupSize: "medium",
      popupTable: {
        tableData: [],
        tableHeaderData: [
          { prop: "processId", label: this.$t("businessSearch.businessSearch.flowInstanceId") },
          { prop: "taskId", label: this.$t("businessSearch.businessSearch.taskId") },
          { prop: "customTaskType", label: this.$t("businessSearch.businessSearch.nodeType") },
          { prop: "taskName", label: this.$t("businessSearch.businessSearch.nodeName") },
          { prop: "createDate", label: this.$t("businessSearch.businessSearch.submissionTime") },
          { prop: "workOperator", label: this.$t("businessSearch.businessSearch.processor") },
          { prop: "doResult", label: this.$t("businessSearch.businessSearch.processResult") },
          { prop: "doRemark", label: this.$t("businessSearch.businessSearch.handlingOpinions") },
        ],
        isPage: false,
        footerList: [{ type: "primary", name: this.$t("businessSearch.fop.close") }],
      },
      popupForm: {
        isInline: false,
        searchData: {
          flowId: "",
          endTime: ""
        },
        formRef: "timeOutForm",
        searchForm: [
          {
            type: "Input",
            label: "流程实例ID:",
            prop: "flowId",
            width: "220px",
            placeholder: "",
            disabled: true
          },
          {
            type: "DateTime",
            label: "超时截至时间:",
            prop: "endTime",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          { name: this.$t("businessSearch.fop.cancel"),
          isSubmit: "popupForm-timeOutForm-resetForm" },
          { type: "primary", name: this.$t("businessSearch.fop.confirm"),
          isSubmit: "popupForm-timeOutForm-setFlowInstanceExtendTimeOut" },
        ],
        // 表单验证
        Rules: {
          endTime: [
            { required: true, message: "请输入超时截至时间", trigger: "blur" },
          ],
        },
        footerList: []
      },
      popupEndForm: {
        isInline: false,
        searchData: {
          processId: "",
          userMap: {
            userId: "100002"
          },
          completeType: "5",
          cancelType: "2",
          businessMap: {
            resultRemark: ""
          },
          endReason: ""
        },
        formRef: "endForm",
        searchForm: [
          {
            type: "Input",
            label: this.$t("businessSearch.businessSearch.flowInstanceId"),
            prop: "processId",
            width: "220px",
            placeholder: "",
            disabled: true,
          },
          {
            type: "Select",
            label: this.$t("businessSearch.businessSearch.flowEndType"),
            prop: "cancelType",
            width: "220px",
            options: [
              { label: "正常结束", value: "2" },
              { label: "异常结束", value: "3" },
              { label: "超时结束", value: "4" }
            ],
            change: this.selectChange
          },
          {
            type: "Textarea",
            label: this.$t("businessSearch.businessSearch.endReason"),
            prop: "endReason",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          { name: this.$t("businessSearch.fop.cancel"),
          isSubmit: "popupEndForm-endForm-resetForm" },
          { type: "primary", name: this.$t("businessSearch.fop.confirm"),
          isSubmit: "popupEndForm-endForm-setFlowInstanceEnd" },
        ],
      },
      hangUpList: [
        { name: this.$t("businessSearch.fop.cancel") },
        { type: "primary", name: this.$t("businessSearch.fop.confirm"), isSubmit: "setFlowInstanceHangUp" },
      ],
      // 挂起恢复都用此数据 type： 2 挂起，0 解挂
      hangUpData: {
          userMap: {
            userId: "100002",
            userName: "张三",
            userRole: "ZHZ"
          },
          processId: "",
          type: "2"
      },
      popupId: ""
    };
  },
  computed: {
    popFooterList() {
      switch(this.popupId) {
        case "0":
          return this.popupTable.footerList;
          break;
        case "2":
          return this.hangUpList;
          break;
        case "3":
          return this.hangUpList;
          break;
        case "4":
          return this.popupEndForm.searchHandle;
          break;
        case "5":
          return this.popupForm.searchHandle;
          break;
        default:
          return [];
      }
    }
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
      this.searchInstanceFlow();
    },
    /**
     * @description: 点击页码，修改查询页码
     * @param: 
     * @return: 
     */
    tablePageSearch(page) {
      this.curPage = page;
      this.searchInstanceFlow();
    },
    /**
     * @description: 流程实例查询
     * @param: 
     * @return: 
     */
    searchInstanceFlow() {
      Object.assign(this.formData.searchData, { curPage: this.curPage });
      flowInstanceSearch(this.formData.searchData).then(({Header, pageData}) => {
        if (isType.isDataType("Object")(pageData) && isInclude(pageData, "result") && Array.isArray(pageData.result)) {
          this.resStatus(Header.RetMsg, Header.RetStatus);
          this.tableData.tableData = pageData.result.map(item => {
            item.customIsTime = item.isTime == "0" ? "正常" : "超时";
            item.customFlowType = renderTableProp(
              [
                { type: "0", value: "未完成" },
                { type: "1", value: "已结束" },
                { type: "2", value: "实例挂起" },
              ],
            item.workState);
            return item;
          });
          this.tableData.totalRows = pageData.totalRows;
        }
      });
    },
    /**
     * @description: 流程实例流程表单
     * @param: processId 流程id 
     * @return: 
     */
    getFlowInstanceTable (processId) {
      flowInstanceTable({processId}).then(({pageData}) => {
        if (isType.isDataType("Object")(pageData) && isInclude(pageData, "result") && Array.isArray(pageData.result)) {
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
            item.customDoResult = renderTableProp(
              [
                {type: "0", value: "同意"},
                {type: "1", value: "否决"},
                {type: "2", value: "再议"},
                {type: "3", value: "追回"},
                {type: "4", value: "终止"},
                {type: "5", value: "打回首节点"},
                {type: "6", value: "打回上节点"},
                {type: "7", value: "打回任意节点"},
                {type: "8", value: "任务转办"},
                {type: "n", value: "自动关闭"},
                {type: "J", value: "节点跳过"},
              ],
            item.doResult);
            return item;
          });
        }
      });
    },
    /**
     * @description: table操作列按钮点击
     * @param : 操作列数据
     * @return : 
     */	
    getIndex({ row, operate }) {
      this.popupId = String(operate.id);
      if (operate.id === 0) {
        this.popupSize = "medium";
        this.popupTitle = "流程审批记录";
        this.getFlowInstanceTable(row.processId);
      } else if (operate.id === 4) {
        this.popupEndForm.searchData.processId = row.processId;
        this.popupSize = "mini";
        this.popupTitle = "流程终止";
      } else if (operate.id === 5) {
        this.popupForm.searchData.processId = row.processId;
        this.popupSize = "mini";
        this.popupTitle = "流程超时延迟";
      } else {
        this.popupSize = "mini";
        this.popupTitle = operate.label;
        this.hangUpData.processId = row.processId;
        this.hangUpData.type = this.popupTitle === "挂起" ? "2" : "0";
      }
      this.isPopupShow = true;
    },
    getdialogVisible(fn) {
      if(String(fn) !== "false" && String(fn.name) !== "bound hide") {
        const fPopList = fn.split("-");
        if ( fPopList.length === 3) {
          fPopList[2] === "resetForm" ? this.resetForm(fPopList[0], fPopList[1]) :
          this.searchHandleForm(fPopList[0], fPopList[1], fPopList[2]);
          return;
        }
        this[fn]();
      }
      this.isPopupShow = !this.isPopupShow;
    },
    /**
     * @description: 重置表单
     * @param: 
     * @return {type} 
     */
    resetForm(form, formName) {
      this.$refs[form].$refs[formName].resetFields();
      if (this.isPopupShow) {
        this.getdialogVisible(false);
      }
    },
    /**
     * @description: 表单验证，提交
     * @param: 
     * @return {type} 
     */
    async searchHandleForm(form, formName, fnName) {
      await this.$refs[form].$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
          console.log([fnName])
          this[fnName]();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setFlowInstanceHangUp() {
      debugger;
      flowInstanceHangUp(this.hangUpData).then((data) => {
        this.searchInstanceFlow();
        this.getdialogVisible(false);
      });
    },
    setFlowInstanceExtendTimeOut() {
      flowInstanceExtendTimeOut(this.popupForm.searchData).then((data) => {
        this.searchInstanceFlow();
        this.getdialogVisible(false);
      });
    },
    setFlowInstanceEnd() {
      this.popupEndForm.searchData.businessMap.resultRemark = this.popupEndForm.searchData.endReason;
      this.$delete(this.popupEndForm.searchData,'endReason');
      flowInstanceEnd(this.popupEndForm.searchData).then((data) => {
        this.searchInstanceFlow();
        this.getdialogVisible(false);
      });
    },
    selectChange(v) {
      this.popupEndForm.searchData.cancelType = v;
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
  .bussiness-main {
    height: calc(100vh - 135px);
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 20px;
    
  }
  .business-tabel-height {
    flex: 1;
  }
</style>