/*
 * @Author: ui_qianhengli 
 * @Date: 2020-08-02 11:20:28 
 * @Last Modified by:   ui_qianhengli 
 * @Last Modified time: 2020-08-02 11:20:28 
 */


<template>
  <div class="pricing-management-platform">
    <div>
      <div class="header">
        <form-view
          :searchData="headerData.searchData"
          :searchForm="headerData.searchForm"
          :isHandle="headerData.isHandle"
          :searchHandle="headerData.searchHandle"
          :labelWidth="headerData.labelWidth"
          :size="headerData.size"
          ref="headerSearch"
        ></form-view>
      </div>
      <div class="content">
        <!-- <div class="handelBar">
          <el-button type="primary" size="medium" @click.native="addData">新增</el-button>
        </div>-->
        <param-description
          class="table"
          :operateObj="operateObj"
          :showOverflowTooltip="showOverflowTooltip"
          :isClick="isClick"
          :paramTableHeader="paramTableHeader"
          :paramData="paramData"
          :isPage="isPage"
          @operate="operate"
        ></param-description>
      </div>
    </div>
    <popup
      :isShow="popupData.isShow"
      :size="popupData.size"
      :title="popupData.title"
      :footerList="popupData.footerList"
      v-on:senddialogVisible="senddialogVisible"
    >
      <div slot="content">
        <form-view
          :searchData="popupData.searchData"
          :searchForm="popupData.searchForm"
          :isHandle="popupData.isHandle"
          :searchHandle="popupData.searchHandle"
          :size="popupData.size"
          :rules="popupData.rules"
          :labelWidth="popupData.labelWidth"
        ></form-view>
      </div>
    </popup>
  </div>
</template>
 
<script>
import {
  listEvtServiceDef,
  addEvtServiceDef,
  deleteEvtServiceDef,
} from '@/api/fop/process-arrange/index'
export default {
  name: 'foreign-server',
  data() {
    return {
      headerData: {
        isHandle: true,
        size: 'medium',
        labelWidth: '120px',
        searchData: {
          expNodeType: null, //异常节点类型
          expDoFlag: null, //异常状态
          processCode: null, //流程编码
          processId: null, //流程实例ID
          taskID: null, //任务ID
          expType: null, //异常类型
        },
        searchForm: [
          {
            type: 'Select',
            prop: 'expNodeType',
            placeholder: '请输入内容',
            label: '异常节点类型：',
            options: [
              {
                value: '0',
                label: '全部',
              },
              {
                value: '1',
                label: '业务节点',
              },
              {
                value: '2',
                label: '审批节点',
              },
              {
                value: '3',
                label: '会签节点',
              },
              {
                value: '4',
                label: '自动节点',
              },
            ],
          },
          {
            type: 'Select',
            prop: 'expDoFlag',
            placeholder: '请输入内容',
            label: '异常状态：',
            options: [
              {
                value: '0',
                label: '全部',
              },
              {
                value: '1',
                label: '已处理',
              },
              {
                value: '2',
                label: '未处理',
              },
            ],
            change(val) {
              console.log(val)
            },
          },
          {
            type: 'Input',
            prop: 'processCode',
            placeholder: '请输入内容',
            label: '流程编码：',
          },
          {
            type: 'Input',
            prop: 'processId',
            placeholder: '请输入内容',
            label: '流程实例ID：',
          },
          {
            type: 'Input',
            prop: 'taskID',
            placeholder: '请输入内容',
            label: '任务ID：',
          },
          {
            type: 'Input',
            prop: 'expType',
            placeholder: '请输入内容',
            label: '异常类型：',
            options: [
              {
                value: '0',
                label: '流转异常',
              },
              {
                value: '1',
                label: '服务异常',
              },
            ],
          },
        ],
        searchHandle: [
          {
            label: '检索',
            type: 'primary',
            handle: () => {},
          },
          {
            label: '重置',
            type: 'primary',
            handle: () => {
              this.$refs.headerSearch.$refs.inlineForm.resetFields()
              this.getAllData()
            },
          },
        ],
      },

      // -------table表单
      paramTableHeader: [
        {
          prop: 'processCoding',
          label: '流程编码',
        },
        {
          prop: 'processId',
          label: '流程实例ID',
        },
        {
          prop: 'taskId',
          label: '任务ID',
        },
        {
          prop: 'nodeType',
          label: '节点类型',
        },
        {
          prop: 'nodeName',
          label: '节点名称',
        },
        {
          prop: 'handleState',
          label: '处理状态',
        },
        {
          prop: 'abnormalHandleTime',
          label: '异常处理时间',
        },
        {
          prop: 'abnormaType',
          label: '异常类型',
        },
        {
          prop: 'handleMan',
          label: '处理人员',
        },
        {
          prop: 'handleTime',
          label: '处理次数',
        },
      ],

      paramData: [
        {
          processCoding: 0,
          processId: '77',
          taskId: '4',
          nodeType: '44',
          handleState: '0',
          abnormalHandleTime: '1',
          abnormaType: '44',
          handleMan: '44',
          handleTime: '44',
        },
        {
          processCoding: 0,
          processId: '77',
          taskId: '4',
          nodeType: '44',
          handleState: '0',
          abnormalHandleTime: '1',
          abnormaType: '44',
          handleMan: '44',
          handleTime: '44',
        },
        {
          processCoding: 0,
          processId: '77',
          taskId: '4',
          nodeType: '44',
          handleState: '0',
          abnormalHandleTime: '1',
          abnormaType: '44',
          handleMan: '44',
          handleTime: '44',
        },
      ],
      showOverflowTooltip: true,
      isClick: true,
      operateObj: {
        width: 200,
        list: ['异常信息', '处理', '忽略', '流程图'],
      },
      //--------分页
      isPage: true,
      // -------弹窗
      popupData: {
        isShow: false,
        labelWidth: '140px',
        size: 'small',
        title: null,
        footerList: [
          { isSubmit: true, name: '确定' },
          { isSubmit: false, name: '取消' },
        ],
        searchData: {
          serviceName: '', //服务名称
          serviceId: '', //服务标识
          callType: '', //调用类型
          callService: '', // 调用服务
          callMethod: '', //调用方法
          callInput: '', //入口参数
          callOutput: '', //出口参数
          paramType: '', //参数获取方式
          targetId: '', //目标系统ID
          channel: '', //渠道号
          terminalCode: '', //终端号
        },
        searchForm: [
          {
            type: 'Input',
            prop: 'serviceName',
            placeholder: '请输入内容',
            label: '服务名称：',
            disabled: false,
            required: true,
          },
          {
            type: 'Input',
            prop: 'serviceId',
            placeholder: '请输入内容',
            label: '服务标识：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callType',
            placeholder: '请输入内容',
            label: '调用类型：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callService',
            placeholder: '请输入内容',
            label: '调用服务：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callMethod',
            placeholder: '请输入内容',
            label: '调用方法：',
            required: true,
          },
          {
            type: 'Select',
            prop: 'paramType',
            placeholder: '请输入内容',
            label: '参数获取方式：',
            required: true,
            options: [
              {
                value: '选项1',
                label: '标准参数',
              },
              {
                value: '选项1',
                label: '业务参数',
              },
              {
                value: '选项1',
                label: '追加参数',
              },
            ],
          },
          {
            type: 'Input',
            prop: 'targetId',
            placeholder: '请输入内容',
            label: '目标系统ID：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callInput',
            placeholder: '请输入内容',
            label: 'callInput：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callOutput',
            placeholder: '请输入内容',
            label: 'callOutput：',
            required: true,
          },

          {
            type: 'Input',
            prop: 'channel',
            placeholder: '请输入内容',
            label: '渠道号：',
            required: true,
          },
          {
            type: 'Input',
            prop: 'terminalCode',
            placeholder: '请输入内容',
            label: 'terminalCode：',
            required: true,
          },
        ],
        rules: {
          serviceName: [{ required: true, message: '请填写', trigger: 'blur' }],
          callType: [{ required: true, message: '请填写', trigger: 'blur' }],
          callService: [{ required: true, message: '请填写', trigger: 'blur' }],
          callMethod: [{ required: true, message: '请填写', trigger: 'blur' }],
          callInput: [{ required: true, message: '请填写', trigger: 'blur' }],
          callOutput: [{ required: true, message: '请填写', trigger: 'blur' }],
          channel: [{ required: true, message: '请填写', trigger: 'blur' }],
          terminalCode: [
            { required: true, message: '请填写', trigger: 'blur' },
          ],
          serviceId: [{ required: true, message: '请填写', trigger: 'blur' }],
          paramType: [{ required: true, message: '请填写', trigger: 'blur' }],
        },
        isHandle: true,
      },
    }
  },
  created() {
    this.getAllData()
  },
  methods: {
    getAllData() {},
    // 确认删除
    deleteData(val) {
      if (val) {
        let deleteParams = {
          serviceId: this.serviceId,
        }
        let params = {
          pageRows: 10,
          curPage: 1,
        }
        deleteEvtServiceDef(deleteParams).then((res) => {
          // 删除成功更新列表
          this.getAllData()
        })
      } else {
        this.deleteTreeHandle.isShow = false
      }
    },
  },
}
</script>
 
<style scoped>
.handelBar {
  margin-bottom: 14px;
  text-align: left;
}
</style>