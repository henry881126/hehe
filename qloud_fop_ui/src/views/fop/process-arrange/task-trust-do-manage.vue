/*
 * @Author: ui_qianhengli 
 * @Date: 2020-08-02 11:21:33 
 * @Last Modified by:   ui_qianhengli 
 * @Last Modified time: 2020-08-02 11:21:33 
 */


<template>
  <div class="pricing-management-platform">
    <div>
      <div class="header">
        <!-- <h4 style="margin:.3em 0 1em 0;font-weight:700">任务委托代办(员工)</h4> -->
        <form-view
          :searchData="headerData.searchData"
          :searchForm="headerData.searchForm"
          :isHandle="headerData.isHandle"
          :searchHandle="headerData.searchHandle"
          :size="headerData.size"
          :labelWidth="headerData.labelWidth"
          ref="headerSearch"
        ></form-view>
      </div>
      <div class="content">
        <div class="handelBar">
          <!-- <el-button type="primary" size="medium" @click.native="addData">新增</el-button> -->
        </div>
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
          :labelWidth="popupData.labelWidth"
        ></form-view>
      </div>
    </popup>
  </div>
</template>
 
<script>
export default {
  name: 'task-trust-do-staff',
  data() {
    return {
      headerData: {
        isHandle: true,
        size: 'medium',
        labelWidth: '160px',
        searchData: {
          authorizedPerson: null, //被授权人
          processName: '', //流程名称
          authorizedState: '', //授权状态
          authorizedStartTime: '', //授权生效开始时间
          authorizedEndTime: '', //授权生效结束时间
        },
        searchForm: [
          {
            type: 'Input',
            prop: 'authorizedPerson',
            placeholder: '请输入内容',
            label: '被委托人：',
          },

          {
            type: 'Select',
            prop: 'processName',
            placeholder: '请输入内容',
            label: '流程名称：',
          },
          {
            type: 'Input',
            prop: 'authorizedState',
            placeholder: '请输入内容',
            label: '授权状态：',
          },
          {
            type: 'DateTime',
            prop: 'authorizedStartTime',
            placeholder: '请输入内容',
            label: '委托生效开始时间：',
          },
          {
            type: 'DateTime',
            prop: 'authorizedEndTime',
            placeholder: '请输入内容',
            label: '委托生效结束时间：',
          },
        ],
        searchHandle: [
          {
            label: '查询',
            type: 'primary',
            handle: () => {
              console.log(this.headerData.searchData)
            },
          },
          {
            label: '重置',
            type: 'primary',
            handle: () => {
              console.log(888)
              console.log(this)
              this.$refs.headerSearch.$refs.inlineForm.resetFields()
              this.searchData()
            },
          },
        ],
      },

      // -------table表单
      paramTableHeader: [
        {
          prop: 'authorizedPerson',
          label: '授权人',
        },
        {
          prop: 'delegatee',
          label: '被授权人',
        },
        {
          prop: ' authorizeContent',
          label: '授权内容',
        },
        {
          prop: 'processName',
          label: '流程名称',
        },
        {
          prop: 'authorizeState',
          label: '授权状态',
        },
        {
          prop: 'authorizeStartTime',
          label: '授权生效开始时间',
        },
        {
          prop: 'authorizeEndTime',
          label: '授权生效结束时间',
        },
        {
          prop: 'createdMan',
          label: '创建人',
        },
        {
          prop: 'createdTime',
          label: '创建时间',
        },
      ],

      paramData: [],
      showOverflowTooltip: true,
      isClick: true,
      operateObj: {
        width: 200,
        list: ['备注'],
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
          nodeId: '222', //节点标识
          nodeName: '', //节点名称
          nodeType: '', //节点分类
          nodeClass: '', //节点类型
          nodeDescribe: '', //节点描述
        },
        searchForm: [
          {
            type: 'Input',
            prop: 'nodeId',
            placeholder: '请输入内容',
            label: '节点标识：',
            disabled: false,
            required: true,
            rules: [
              { required: true, message: '请输入流程编码', trigger: 'blur' },
            ],
          },
          {
            type: 'Input',
            prop: 'nodeName',
            placeholder: '请输入内容',
            label: '节点名称：',
            required: true,
            rules: [
              { required: true, message: '请输入流程名称', trigger: 'blur' },
            ],
          },
          {
            type: 'Input',
            prop: 'nodeType',
            placeholder: '请输入内容',
            label: '节点分类：',
          },
          {
            type: 'Input',
            prop: 'nodeClass',
            placeholder: '请输入内容',
            label: '节点类型：',
          },
          {
            type: 'Input',
            prop: 'nodeDescribe',
            placeholder: '请输入内容',
            label: '节点描述：',
          },
        ],
        isHandle: true,
      },
    }
  },

  methods: {
    // 点击table操作选项，用methodsType标记点击的是哪个操作
    operate(val) {
      console.log(val)
      console.log(val.row)
      return
      // 当前行删除操作
      if (val.row.value == '删除') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'primary',
        })
          .then(() => {
            let id = val.row.id
            this.paramData.map((item, index) => {
              if (id == item.id) {
                this.paramData.splice(index, 1)
                this.$message({
                  type: 'primary',
                  message: '删除成功!',
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        return
      }
      // 把当前行的值传给弹框
      let obj = {
        id: val.row.id,
        corpNo: '', //法人编码 - 从会话中获取,
        operator: '', //操作人员
        processCode: val.row.processCode, //流程编码
        processName: val.row.processName, //流程名称
        processClass: val.row.processClass, //流程分类
        processGroup: val.row.processGroup, //流程分组
        processThird: val.row.processThird, //事项次类

        parentId: val.row.parentId, //目录结构id,
        processClass: val.row.processClass, //'1',

        processFirst: val.row.processFirst, //大类编码,
        processFirstName: val.row.processFirstName, //大类名称,
        processSecond: val.row.processSecond, //小类编码,
        processSecondName: val.row.processSecondName, //小类名称,

        processDesc: val.row.processDesc, //流程说明,
      }
      this.popupData.searchData = obj
      // 设置弹窗标识，在点击确认按钮 进行对应的操作
      this.methodsType = val.row.value
      // 根据点击项设置弹窗对应的标题
      if (val.row.value == '修改') {
        this.popupData.title = '修改'
        // 流程编码项不可编辑
        this.popupData.searchForm[0].disabled = true
      }
      // 显示弹窗
      this.popupData.isShow = true
    },

    // 控制弹框的确定取消
    senddialogVisible(val) {
      console.log(val)
      if (!val) {
      } else if (val) {
        let type = this.methodsType
        switch (type) {
          case '修改':
            this.changeData()
            break
          case '删除':
            this.deleteData()
            break
          case '新增':
            this.paramData.push(this.popupData.searchData)
            break
          default:
            console.log('没有找到匹配条件')
        }
      }
      this.popupData.isShow = false
    },
    addData() {
      this.methodsType = '新增'
      this.popupData.title = '新增'
      console.log(this.paramData[this.paramData.length - 1].id)
      let id = this.paramData[this.paramData.length - 1].id + 1

      // 初始化新增数据
      let obj = {
        id: id,
        corpNo: '', //法人编码 - 从会话中获取,
        processCode: '', //流程编码
        processName: '', //流程名称
        processClass: '', //流程分类
        processGroup: '', //流程分组
        processThird: '', //事项次类

        parentId: '', //目录结构id,
        processClass: '', //'1',

        processFirst: '', //大类编码,
        processFirstName: '', //大类名称,
        processSecond: '', //小类编码,
        processSecondName: '', //小类名称,

        operator: '', //操作人员
        processDesc: '', //流程说明,
      }
      this.popupData.searchData = obj
      this.popupData.isShow = true
      // 增加弹窗流程编码可编辑
      this.popupData.searchForm[0].disabled = false
    },
  },
}
</script>
 
<style scoped>
.handelBar {
  text-align: left;
  margin-bottom: 14px;
}
</style>