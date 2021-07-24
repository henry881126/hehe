/*
 * @Author: ui_qianhengli 
 * @Date: 2020-08-02 11:20:49 
 * @Last Modified by:   ui_qianhengli 
 * @Last Modified time: 2020-08-02 11:20:49 
 */


<template>
  <div class="foreign-server">
    <div class="main-content">
      <div class="header">
        <form-view
          :searchData="headerData.searchData"
          :searchForm="headerData.searchForm"
          :isHandle="headerData.isHandle"
          :searchHandle="headerData.searchHandle"
          ref="headerSearch"
        ></form-view>
      </div>
      <div class="body">
        <div class="handelBar">
          <form-view
            :searchData="tableHeader.searchData"
            :searchForm="tableHeader.searchForm"
            :isHandle="tableHeader.isHandle"
            :searchHandle="tableHeader.searchHandle"
            ref="headerSearch"
          ></form-view>
        </div>
        <table-view
          class="table"
          :loading="tableData.loading"
          :isOrder="tableData.isOrder"
          :operateObj="tableData.operateObj"
          :showOverflowTooltip="tableData.showOverflowTooltip"
          :tableHeaderData="tableData.tableHeaderData"
          :tableData="tableData.tableData"
          :isPage="tableData.isPage"
          :currentPage="tableData.currentPage"
          :total="tableData.total"
          :pageSize="tableData.pageSize"
          @operate="tableOperate"
        ></table-view>
      </div>
    </div>

    <popup
      :isShow="popupData.isShow"
      :size="popupData.size"
      :title="popupData.title"
      :footerList="popupData.footerList"
      @senddialogVisible="senddialogVisible"
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
    <popup
      :isShow="deleteTreeHandle.isShow"
      :size="deleteTreeHandle.size"
      :title="deleteTreeHandle.title"
      :footerList="deleteTreeHandle.footerList"
      @senddialogVisible="deleteData"
    >
      <div slot="content">确定删除？</div>
    </popup>
  </div>
</template>
<script>
import {
  deleteInterfaceDef, //事件服务之删除
  updateInterfaceDef, //事件服务之修改
  addInterfaceDef, //事件服务之增加
  listInterfaceDef, //事件服务之查询
} from '@/api/fop/process-arrange/index'
export default {
  name: 'foreign-server',
  data() {
    return {
      deleteTreeHandle: {
        radio: '',
        isShow: false,
        size: 'small',
        title: '提示',
        footerList: [
          { isSubmit: true, name: '确定' },
          { isSubmit: false, name: '取消' },
        ],
      },
      serviceId: null,
      headerData: {
        isHandle: true,
        size: 'medium',
        //   {
        //   "callMode": "0",
        //   "callService": "1",
        //   "callType": "0",
        //   "createTime": 1594836468000,
        //   "paramType": "0",
        //   "serviceId": "100",
        //   "serviceName": "1",
        //   "updateTime": 1594836468000
        // },
        searchData: {
          serviceId: '', //'服务标识',
          callType: '', //'调用类型',
          serviceName: '', //'服务名称',
          callService: '', //'调用服务',
          callMethod: '', //'调用方法',
          createTime: '', //'服务名称',
          serviceName: '', //'服务名称',
        },
        searchForm: [
          {
            type: 'Input',
            prop: 'callServer',
            placeholder: '请输入内容',
            label: '调用服务',
          },
          {
            type: 'Select',
            prop: 'callType',
            placeholder: '请输入内容',
            label: '调用类型',
            options: [
              {
                value: '0',
                label: 'Rest',
              },
              {
                value: '1',
                label: 'Dubbo',
              },
              {
                value: '3',
                label: 'Sofa',
              },
              {
                value: '4',
                label: 'Eureka',
              },
            ],
            change(val) {
              console.log(val)
            },
          },
          {
            type: 'Input',
            prop: 'callMethods',
            placeholder: '请输入内容',
            label: '调用方法：',
          },
          {
            type: 'Input',
            prop: 'serverUUID',
            placeholder: '请输入内容',
            label: '服务标识：',
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
              console.log(999)
              console.log(this)
              this.$refs.headerSearch.$refs.inlineForm.resetFields()
              this.getAllData()
            },
          },
        ],
      },
      // -------table表单新增按钮
      tableHeader: {
        isHandle: true,
        size: 'medium',
        searchData: {},
        searchForm: [],
        searchHandle: [
          {
            label: '新增',
            type: 'primary',
            handle: () => {
              this.popupData.isShow = true
              this.popupData.title = '新增'
              this.handleType = 8
            },
          },
        ],
      },

      tableData: {
        isOrder: true,
        loading: false,
        tableHeaderData: [
          {
            prop: 'serviceId',
            label: this.$t('fop_org_manage.foreignServer.serviceId'),
          },
          {
            prop: 'callType',
            label: this.$t('fop_org_manage.foreignServer.callType'),
          },
          {
            prop: 'serviceName',
            label: this.$t('fop_org_manage.foreignServer.serviceName'),
          },
          {
            prop: 'callService',
            label: this.$t('fop_org_manage.foreignServer.callService'),
          },
          {
            prop: 'callMethod',
            label: this.$t('fop_org_manage.foreignServer.callMethod'),
          },
          {
            prop: 'serviceName',
            label: this.$t('fop_org_manage.foreignServer.serviceName'),
          },
          {
            prop: 'createTime',
            label: this.$t('fop_org_manage.foreignServer.createTime'),
          },
        ],
        tableData: [],
        showOverflowTooltip: true,
        isClick: true,
        currentPage: 1,
        total: 10,
        pageSize: 10,
        operateObj: {
          width: 200,
          list: [
            { key: 0, label: this.$t('fop_org_manage.common.modify') },
            { key: 1, label: this.$t('fop_org_manage.common.delete') },
          ],
        },
        //--------分页
        isPage: true,
      },
      tableRowData: null,

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
          callOutput: '', //出口参数 备用 传空
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
            label: '服务名称 serviceName',

            required: true,
          },
          {
            type: 'Input',
            prop: 'serviceId',
            placeholder: '请输入内容',
            label: '服务标识 serviceId',
            required: true,
            disabled: false,
          },
          {
            type: 'Select',
            prop: 'callType',
            placeholder: '请输入内容',
            label: '调用类型 callType',
            options: [
              {
                key: 0,
                value: 'Rest',
              },
              {
                key: 1,
                value: 'Dubbo',
              },
              {
                key: 3,
                value: 'Sofa',
              },
              {
                key: 4,
                value: 'Eureka',
              },
            ],
            change: (val) => {
              //1Rest和4Eureka项  调用方法不显示
              if (val == 'Rest' || val == 'Eureka') {
                this.popupData.searchForm[4].show = false
                // 提交的参数不能包含 调用方法 建值对
              } else {
                this.popupData.searchForm[4].show = true
              }
              console.log(999)
              this.popupData.searchData.callMethod = ''
            },
          },
          {
            type: 'Input',
            prop: 'callService',
            placeholder: '请输入内容',
            label: '调用服务 callService',
            required: true,
          },
          {
            type: 'Input',
            prop: 'callMethod',
            placeholder: '请输入内容',
            label: '调用方法 callMethod',
            required: true,
            show: true,
          },
          {
            type: 'Select',
            prop: 'paramType',
            placeholder: '请输入内容',
            label: '参数获取方式 paramType',
            options: [
              {
                value: '0',
                label: '标准参数',
              },
              {
                value: '1',
                label: '业务参数',
              },
              {
                value: '2',
                label: '追加参数',
              },
            ],
            change: (val) => {},
          },
          {
            type: 'Input',
            prop: 'targetId',
            placeholder: '请输入内容',
            label: '目标系统ID targetId',
          },
          {
            type: 'Input',
            prop: 'channel',
            placeholder: '请输入内容',
            label: '渠道号 channel',
          },
          {
            type: 'Input',
            prop: 'terminalCode',
            placeholder: '请输入内容',
            label: '终端号 terminalCode',
          },
          {
            type: 'Textarea',
            prop: 'callInput',
            placeholder: '请输入内容',
            label: '入口参数 callInput',
          },
        ],
        rules: {
          serviceName: [{ required: true, message: '请填写', trigger: 'blur' }],
          callType: [{ required: true, message: '请填写', trigger: 'blur' }],
          callService: [{ required: true, message: '请填写', trigger: 'blur' }],
          callMethod: [{ required: true, message: '请填写', trigger: 'blur' }],
          serviceId: [{ required: true, message: '请填写', trigger: 'blur' }],
          paramType: [{ required: true, message: '请填写', trigger: 'blur' }],
        },
        isHandle: true,
      },
      handleType: null, //区分新增修改标识 0为修改 8为新增
    }
  },
  created() {
    this.getAllData()
  },
  methods: {
    // 获取数据
    getAllData() {
      let params = {
        pageRows: 10,
        curPage: 1,
      }
      listInterfaceDef(params).then((res) => {
        console.log(res.pageData.result)
        this.tableData.tableData = res.pageData.result
      })
    },
    // 确认删除
    deleteData(val) {
      if (val) {
        let deleteParams = {
          serviceId: this.tableRowData.serviceId,
        }

        deleteInterfaceDef(deleteParams).then((res) => {
          console.log(res.Header.RetStatus)
          let flag = res.Header.RetStatus
          this.deleteTreeHandle.isShow = false
          if (flag == 'S') {
            this.$message({
              message: '删除成功',
              type: 'warning',
              duration: 3000,
            })
          } else if (flag == 'F') {
            this.$message({
              message: '删除失败',
              type: 'warning',
              duration: 3000,
            })
          }
          // 删除成功更新列表
          this.getAllData()
        })
      } else {
        this.deleteTreeHandle.isShow = false
      }
    },
    // table修改 与删除操作
    tableOperate(val) {
      this.handleType = val.operate.key
      this.tableRowData = val.row
      // key  0修改 1删除
      if (this.handleType == 0) {
        this.popupData.isShow = true
        // 禁用服务标识
        this.popupData.searchForm[1].disabled = true
        // 修改弹窗名称
        this.popupData.title = '修改'
        // 弹窗回填数据 key值处理成对应的value页面显示

        // 调用类型
        this.popupData.searchForm[2].options.forEach((item) => {
          if (item.key == val.row.callType) {
            val.row.callType = item.value
            if (item.key == 1 || item.key == 4) {
              this.popupData.searchForm[4].show = false
            } else {
              this.popupData.searchForm[4].show = true
            }
          }

          // 如果回填类型为//1Rest和4Eureka项  调用方法不显示
        })
        // 获取参数方式
        this.popupData.searchForm[5].options.forEach((item) => {
          if (item.key == val.row.paramType) {
            val.row.paramType = item.value
          }
        })

        this.popupData.searchData = Object.assign(
          this.popupData.searchData,
          val.row
        )

        this.popupData.isShow = true
        this.popupData.title = '修改'
      } else if (this.handleType == 1) {
        // 显示删除弹窗
        this.deleteTreeHandle.isShow = true
      }
    },

    // 新增修改弹框的确定取消
    senddialogVisible(val) {
      let type = this.handleType
      if (val) {
        this.addDataSub()
      } else {
        this.popupData.isShow = false
      }
    },
    // 新增修改 提交数据
    addDataSub() {
      //handleType 0为修改 8为新增
      console.log(this.handleType)

      let params = this.popupData.searchData

      // 判断必填项
      if (params.serviceName == '' || params.serviceId == '') {
        console.log(88)
        return
      }
      // 根据选择条件判断
      // 调用类型必须选
      if (params.callType == '') {
        this.$message({
          message: '请选择调用类型',
          type: 'warning',
          duration: 3000,
        })
        return
      }
      console.log(params.callService)
      // 调用服务必须传
      if (params.callService == '') {
        return
      }
      // 参数获取方式必选
      if (params.paramType == '') {
        this.$message({
          message: '请选择参数获取方式',
          type: 'warning',
          duration: 3000,
        })
        return
      }

      if (this.popupData.searchForm[4].show) {
        if (params.callMethod == '') {
          console.log('调用方法不能为空')
          return
        }
      }
      console.log(params)
      this.tableData.loading = true
      // 根据handleType判断新增 修改
      if (this.handleType == 8) {
        addInterfaceDef(params).then((res) => {
          this.tableData.loading = false
          let flag = res.Header && res.Header.RetStatus
          if (flag == 'F') {
            this.$message({
              message: res.Header.RetMsg,
              type: 'warning',
              duration: 3000,
            })
          } else {
            this.popupData.isShow = false
            this.getAllData()
          }
        })
      } else if (this.handleType == 0) {
        updateInterfaceDef(params).then((res) => {
          this.tableData.loading = false
          let flag = res.Header && res.Header.RetStatus
          if (flag == 'F') {
            this.$message({
              message: res.Header.RetMsg,
              type: 'warning',
              duration: 3000,
            })
          } else {
            this.popupData.isShow = false
            this.getAllData()
          }
        })
      }
    },
    addData() {
      // 初始化新增数据
      // let obj = {
      //   serviceName: '', //服务名称
      //   serviceId: '', //服务标识
      //   callType: '', //调用类型
      //   callService: '', // 调用服务
      //   callMethod: '', //调用方法
      //   callInput: '', //入口参数
      //   callOutput: '', //出口参数 备用 传空
      //   paramType: '', //参数获取方式
      //   targetId: '', //目标系统ID
      //   channel: '', //渠道号
      //   terminalCode: '', //终端号
      // }
      let obj = this.popupData.searchData
      for (let key in obj) {
        obj[key] = ''
      }
      this.popupData.isShow = true
    },
  },
}
</script>
 
<style lang="scss" scoped>
.foreign-server {
  height: calc(100vh - 80px);
  overflow: hidden;
  .main-content {
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      .table {
        flex: 1;
      }
    }
  }
}
</style>