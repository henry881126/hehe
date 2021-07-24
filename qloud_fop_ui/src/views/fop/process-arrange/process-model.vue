<!--
 * @Autor: ui_qianhengli
 * @Date: 2020-08-04 12:40:55
 * @LastEditors: ui_qianhengli
 * @LastEditTime: 2020-08-07 14:57:10
-->

<template>
  <div class="process-model">
    <!-- 页面布局盒子 -->
    <div class="main-content up-clear">
      <!-- 左侧导航 -->
      <div class="left-nav" :class="{ drawer: drawer }">
        <el-tree
          :data="treeEdit.data"
          node-key="id"
          default-expand-all
          ref="tree"
          class="tree"
          @node-click="nodeHandleClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="tree-title">{{ node.label }}</span>
            <span class="tree-delete" @click="() => deleteTree(node, data)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="content">
        <!-- table检索 重置操作 -->
        <div class="top">
          <div>
            <el-button
              type="primary"
              :size="headerData.size"
              :icon="drawer ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
              @click="openTree"
            ></el-button>
          </div>

          <div class="headerData">
            <!-- <div class="title">检索条件：</div> -->
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
        </div>
        <!-- table -->
        <div class="bottom">
          <div class="table-header">
            <form-view
              :searchData="tableHeaderHandle.searchData"
              :searchForm="tableHeaderHandle.searchForm"
              :isHandle="tableHeaderHandle.isHandle"
              :searchHandle="tableHeaderHandle.searchHandle"
              :size="tableHeaderHandle.size"
              ref="tableHeaderHandle"
            ></form-view>
          </div>
          <div class="table-body">
            <table-view
              :loading="tableData.loading"
              :size="tableData.size"
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
      </div>
    </div>
    <!-- 树删除 -->
    <popup
      :isShow="deleteTreeHandle.isShow"
      :size="deleteTreeHandle.size"
      :title="deleteTreeHandle.title"
      :footerList="deleteTreeHandle.footerList"
      @senddialogVisible="deleteTreeSure"
    >
      <div slot="content">{{$t('fop_processArrange.processModel.sureDelete')}}</div>
    </popup>
    <!-- 树编辑 -->
    <el-dialog :title="treeEdit.title" :visible.sync="treeEdit.isShow">
      <el-tabs type="border-card" v-model="treeEdit.activeNum" @tab-click="handleClick">
        <el-tab-pane :label="treeEdit.addNode" name="addNode">
          <div>
            <form-view
              :searchData="treeEdit.searchData"
              :searchForm="treeEdit.addSearchForm"
              :isHandle="treeEdit.isHandle"
              :size="treeEdit.size"
              :rules="treeEdit.rules"
              :labelWidth="treeEdit.labelWidth"
            ></form-view>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="treeEdit.changeNode" name="changeNode">
          <div>
            <form-view
              :searchData="treeEdit.searchData"
              :searchForm="treeEdit.changeSearchForm"
              :isHandle="treeEdit.isHandle"
              :size="treeEdit.size"
              :rules="treeEdit.rules"
              :labelWidth="treeEdit.labelWidth"
            ></form-view>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeEdit.isShow = false">{{$t('fop_processArrange.common.cancle')}}</el-button>
        <el-button type="primary" v-on:click="submitTree">{{$t('fop_processArrange.common.sure')}}</el-button>
      </div>
    </el-dialog>
    <!-- table新增与修改复制弹框 -->
    <popup
      :isShow="tableHandleData.isShow"
      :size="tableHandleData.size"
      :title="tableHandleData.title"
      :footerList="tableHandleData.footerList"
      @senddialogVisible="tableVisibleHandle"
    >
      <div slot="content">
        <form-view
          :searchData="tableHandleData.searchData"
          :searchForm="tableHandleData.searchForm"
          :isHandle="tableHandleData.isHandle"
          :searchHandle="tableHandleData.searchHandle"
          :size="tableHandleData.size"
          :rules="tableHandleData.rules"
          :labelWidth="tableHandleData.labelWidth"
        ></form-view>
      </div>
    </popup>

    <!-- 表格删除 -->
    <popup
      :isShow="tableDelete.isShow"
      :size="tableDelete.size"
      :title="tableDelete.title"
      :footerList="tableDelete.footerList"
      @senddialogVisible="deleteTableHandleSure"
    >
      <div slot="content">
        <!-- <form-view
          :searchData="tableDelete.searchData"
          :searchForm="tableDelete.searchForm"
          :isHandle="tableDelete.isHandle"
          :size="tableDelete.size"
          :rules="tableDelete.rules"
          :labelWidth="tableDelete.labelWidth"
        ></form-view>-->
        <div>
          <el-radio-group v-model="tableDelete.searchData.delType">
            <el-radio
              :label="0"
              :size="this.$store.state.settings.size"
            >{{$t('fop_processArrange.processModel.closeProcessDefault')}}</el-radio>
            <el-radio
              :label="1"
              :size="this.$store.state.settings.size"
            >{{$t('fop_processArrange.processModel.shallowDelete')}}</el-radio>
            <el-radio
              :label="2"
              :size="this.$store.state.settings.size"
            >{{$t('fop_processArrange.processModel.deepDelete')}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {
  copyProcDef, //流程建模之复制
  updateProcDef, //流程建模之修改
  listParam, // 一级二级分类查询
  deleteProcDef, //流程建模之删除
  addProcDef, //流程建模之新增
  selectProcDefList, //流程建模之查询
  deleteSysNode, // 系统结构删除
  updateSysNode, // 系统结构修改
  addSysNode, // 系统结构新增
  listSysNode, //系统结构查询
} from '@/api/fop/process-arrange/index.js'

import { getPlaceholderMsg } from '@/utils/i18Util'
export default {
  name: 'process-model',

  data() {
    return {
      identity: {
        //身份标识
        id: 1,
      },
      drawer: false, //tree抽屉
      treeLevel: null, //当前树的层级
      treeDataCache: null, //缓存当前点击树节点数据
      timer: null, //判断单击双击的定时器
      treeClickCount: 0, //判断单击双击次数
      deleteTreeHandle: {
        radio: '',
        isShow: false,
        size: 'small',
        title: this.$t('fop_processArrange.processModel.deleteNode'),
        footerList: [
          {
            isSubmit: true,
            name: this.$t('fop_processArrange.common.sure'),
          },
          {
            isSubmit: false,
            name: this.$t('fop_processArrange.common.cancle'),
          },
        ],
      },
      treeEdit: {
        isShow: false,
        activeNum: 'addNode',
        tableIndex: 0,
        labelWidth: '130px',
        isHandle: true,
        size: 'small',
        searchData: {
          sysId: '',
          sysName: '',
        },
        addSearchForm: [
          {
            type: 'Input',
            prop: 'sysId',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.common.placeholder')
            ),
            label: this.$t('fop_processArrange.processModel.processtypeId'),
            disabled: false,
            required: true,
          },
          {
            type: 'Input',
            prop: 'sysName',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.common.placeholder')
            ),
            label: this.$t('fop_processArrange.processModel.processtypeName'),
            disabled: false,
            required: true,
          },
        ],
        changeSearchForm: [
          {
            type: 'Input',
            prop: 'sysId',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.common.placeholder')
            ),
            label: this.$t('fop_processArrange.processModel.processtypeId'),
            disabled: false,
            required: true,
          },
          {
            type: 'Input',
            prop: 'sysName',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.common.placeholder')
            ),
            label: this.$t('fop_processArrange.processModel.processtypeName'),
            disabled: false,
            required: true,
          },
        ],
        rules: {
          sysId: [
            {
              required: true,
              message: this.$t('fop_processArrange.processModel.messageCode'),
              trigger: 'blur',
            },
          ],
          sysName: [
            {
              required: true,
              message: this.$t('fop_processArrange.processModel.messageName'),
              trigger: 'blur',
            },
          ],
        },
        title: this.$t('fop_processArrange.processModel.editTree'),
        addNode: this.$t('fop_processArrange.processModel.addTree'),
        changeNode: this.$t('fop_processArrange.processModel.changeTree'),
        data: null,
      },

      // table检索 重置
      headerData: {
        isHandle: true,
        searchData: {
          processCoding: '',
          processName: '',
        },
        size: 'small', //medium / small / min
        labelWidth: '80px',
        searchForm: [
          {
            type: 'Input',
            prop: 'processCoding',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processCoding')
            ),
            label: this.$t('fop_processArrange.processModel.processCoding'),
          },
          {
            type: 'Input',
            prop: 'processName',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processName')
            ),
            label: this.$t('fop_processArrange.processModel.processName'),
          },
        ],
        searchHandle: [
          {
            label: this.$t('fop_processArrange.common.retrieve'),
            type: 'primary',
            disabled: true,
            handle: () => {
              let processCoding = this.headerData.searchData.processCoding
              let processName = this.headerData.searchData.processName
              this.searchData()
            },
          },
          {
            label: this.$t('fop_processArrange.common.reset'),
            type: 'primary',
            disabled: true,
            handle: () => {
              this.$refs.headerSearch &&
                this.$refs.headerSearch.$refs.inlineForm.resetFields()
              this.searchData()
            },
          },
        ],
      },
      // -------table表单
      tableRowData: null, //操作行数据
      tableHeaderHandle: {
        size: 'small', //medium / small / min
        searchHandle: [
          {
            label: this.$t('fop_processArrange.common.add'),
            type: 'primary',
            disabled: true,
            handle: () => {
              this.addTableData(8)
            },
          },
          {
            label: this.$t('fop_processArrange.processModel.import'),
            type: 'primary',
            disabled: true,
            handle: () => {},
          },
          {
            label: this.$t('fop_processArrange.processModel.export'),
            type: 'primary',
            disabled: true,
            handle: () => {},
          },
        ],
      },
      tableData: {
        size: 'small',
        isOrder: false,
        loading: false,
        tableHeaderData: [
          {
            prop: 'id',
            label: this.$t('fop_processArrange.processModel.primaryKey'),
          },
          {
            prop: 'parentId',
            label: this.$t('fop_processArrange.processModel.DirStructureID'),
          },
          {
            prop: 'processCode',
            label: this.$t('fop_processArrange.processModel.processCoding'),
          },
          {
            prop: 'processFirst',
            label: this.$t('fop_processArrange.processModel.firstClassCode'),
          },
          {
            prop: 'processFirstName',
            label: this.$t('fop_processArrange.processModel.firstClassName'),
          },
          {
            prop: 'processName',
            label: this.$t('fop_processArrange.processModel.processName'),
          },
          {
            prop: 'processSecond',
            label: this.$t('fop_processArrange.processModel.smallClassCode'),
          },
          {
            prop: 'processSecondName',
            label: this.$t('fop_processArrange.processModel.smallClassName'),
          },
          {
            prop: 'processControl',
            label: this.$t('fop_processArrange.processModel.state'),
          },
          {
            prop: 'operator',
            label: this.$t('fop_processArrange.processModel.operator'),
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
            { key: 0, label: this.$t('fop_processArrange.common.modify') },
            { key: 1, label: this.$t('fop_processArrange.common.delete') },
            {
              key: 2,
              label: this.$t('fop_processArrange.processModel.design'),
            },
            {
              key: 3,
              label: this.$t('fop_processArrange.processModel.deploy'),
            },
            { key: 4, label: this.$t('fop_processArrange.processModel.copy') },
            {
              key: 5,
              label: this.$t('fop_processArrange.processModel.extendAttr'),
            },
            {
              key: 6,
              label: this.$t('fop_processArrange.processModel.extendAttrView'),
            },
            {
              key: 7,
              label: this.$t('fop_processArrange.processModel.histryView'),
            },
          ],
        },
        //--------分页
        isPage: true,
      },
      tableDelete: {
        isHandle: true,
        labelWidth: '120px',
        isShow: false,
        size: 'small',
        searchData: {
          delType: 0,
          //0-关闭流程(默认)
          //1-浅删除(删除定义)
          //2-深删除(清除所有记录)
        },
        searchForm: [
          {
            type: 'Radio',
            prop: 'delType',
            disabled: false,
            required: true,
            radios: [
              {
                value: 0,
                label: this.$t(
                  'fop_processArrange.processModel.closeProcessDefault'
                ),
              },
              {
                value: 1,
                label: this.$t('fop_processArrange.processModel.shallowDelete'),
              },
              {
                value: 2,
                label: this.$t('fop_processArrange.processModel.deepDelete'),
              },
            ],
          },
        ],
        footerList: [
          {
            isSubmit: true,
            name: this.$t('fop_processArrange.common.sure'),
          },
          {
            isSubmit: false,
            name: this.$t('fop_processArrange.common.cancle'),
          },
        ],
      },

      // -------新增修改弹窗
      tableHandleData: {
        isShow: false,
        labelWidth: '140px',
        size: 'small',
        title: null,
        footerList: [
          {
            isSubmit: true,
            name: this.$t('fop_processArrange.common.sure'),
          },
          {
            isSubmit: false,
            name: this.$t('fop_processArrange.common.cancle'),
          },
        ],
        searchData: {
          corpNo: '', //法人编码 - 从会话中获取,
          processCode: '', //流程编码
          processName: '', //流程名称
          processDesc: '', //流程说明,
          parentId: '', //目录结构id,
          processClass: '', //流程分类
          processGroup: '', //流程分组
          processFirst: '', //大类编码,
          processFirstName: '', //大类名称
          processSecond: '', //小类编码
          processSecondName: '', //小类名称
          processThird: '', //'事项此类',
          processGroup: '', //流程分组
          operator: '张三', //操作人员
        },
        searchForm: [
          {
            type: 'Input',
            prop: 'processCode',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processCoding')
            ),
            label: this.$t('fop_processArrange.processModel.processCoding'),
            disabled: false,
            required: true,
            focus: false,
          },
          {
            type: 'Input',
            prop: 'processName',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processName')
            ),
            label: this.$t('fop_processArrange.processModel.processName'),
            required: true,
          },
          {
            type: 'Input',
            prop: 'processClass',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.ProcessClass')
            ),
            label: this.$t('fop_processArrange.processModel.ProcessClass'),
          },
          {
            type: 'Input',
            prop: 'processGroup',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processGroup')
            ),
            label: this.$t('fop_processArrange.processModel.processGroup'),
          },
          {
            type: 'Input',
            prop: 'processThird',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.eventCategory')
            ),
            label: this.$t('fop_processArrange.processModel.eventCategory'),
          },
          {
            type: 'Select',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.firstClass')
            ),
            label: this.$t('fop_processArrange.processModel.firstClass'),
            required: true,
            prop: 'processFirst',
            options: [],
            change: (val) => {
              // 储存一级分类的select取值
              let options = this.tableHandleData.searchForm[5].options
              options.forEach((item, index) => {
                if (val == item.value) {
                  this.tableHandleData.searchData.processFirst = val
                  this.tableHandleData.searchData.processFirstName = item.label
                }
              })

              // val为一级的paramCode
              // 把一级的paramCode作为二级的paramObjCode的建值取请求二级数据
              // 二级分类
              let params = {
                paramType: '01',
                pageRows: 10,
                curPage: 1,
                paramObjCode: val,
              }
              listParam(params).then((res) => {
                let dataStr =
                  res.pageData && JSON.stringify(res.pageData.result)
                let str = dataStr
                  .replace(/paramName/g, 'label')
                  .replace(/paramCode/g, 'value')
                let result = JSON.parse(str)
                this.tableHandleData.searchForm[6].options = result
              })
            },
          },
          {
            type: 'Select',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.secondClass')
            ),
            label: this.$t('fop_processArrange.processModel.secondClass'),
            required: true,
            prop: 'processSecond',
            options: [],
            change: (val) => {
              // 根据建值val赛选对应的label
              let options = this.tableHandleData.searchForm[6].options
              options.forEach((item, index) => {
                if (val == item.value) {
                  this.tableHandleData.searchData.processSecond = val
                  this.tableHandleData.searchData.processSecondName = item.label
                }
              })
            },
          },
          {
            type: 'Textarea',
            prop: 'processDesc',
            placeholder: getPlaceholderMsg(
              this.$t('fop_processArrange.processModel.processDescription')
            ),
            label: this.$t(
              'fop_processArrange.processModel.processDescription'
            ),
          },
        ],
        rules: {
          processCode: [
            {
              required: true,
              message: this.$t('fop_processArrange.processModel.messageCode'),
              trigger: 'blur',
            },
          ],
          processName: [
            {
              required: true,
              message: this.$t('fop_processArrange.processModel.messageName'),
              trigger: 'blur',
            },
          ],
        },
        isHandle: true,
      },
      handleType: '', //弹窗组件标识
    }
  },

  created() {
    listSysNode(this.identity).then((res) => {
      console.log(res)
      this.handleTree(res)
    })
  },
  methods: {
    // 导航tree收起
    openTree() {
      this.drawer = !this.drawer
    },
    // 把后台返回的数据处理成tree数据格式
    handleTree(res) {
      if (res.pageData) {
        let data = res.pageData.result
        console.log(data)
        let resArr = []
        data.forEach((item, index) => {
          let dataStr = JSON.stringify(item)
          let str = dataStr.replace(/sysName/g, 'label')
          resArr.push(JSON.parse(str))
        })
        this.treeEdit.data = resArr
      }
    },
    // 点击页面新增 打开新增弹框
    addTableData(val) {
      // 4为复制 8为新增
      if (val == 4) {
        this.tableHandleData.title = this.$t(
          'fop_processArrange.processModel.copy'
        )
        this.handleType = 4
      } else if (val == 8) {
        // 增加弹框
        this.tableHandleData.title = this.$t('fop_processArrange.common.add')
        this.handleType = 8
      }

      // 请求一级分类数据
      let firstClass = {
        paramType: '10',
        pageRows: 10,
        curPage: 1,
      }
      listParam(firstClass).then((res) => {
        let dataStr = JSON.stringify(res.pageData.result)
        let str = dataStr
          .replace(/paramName/g, 'label')
          .replace(/paramCode/g, 'value')
        let result = JSON.parse(str)
        this.tableHandleData.searchForm[5].options = result
      })

      // 初始化新增数据
      let obj = {
        corpNo: '', //法人编码 - 从会话中获取,
        processCode: '', //流程编码
        processName: '', //流程名称
        processDesc: '', //流程说明,
        parentId: '', //目录结构id,
        processClass: '', //流程分类
        firstClassVal: '', //一级分类
        processFirstName: '', //一级分类名称
        secondClassVal: '', //二级分类
        processSecondName: '', //二级分类名称
        processThird: '', //事项次类
        processGroup: '', //流程分组
        operator: '张三', //操作人员
      }
      this.tableHandleData.searchData = obj
      this.tableHandleData.isShow = true
      // 增加弹窗流程编码可编辑
      this.tableHandleData.searchForm[0].disabled = false
    },
    // 提交新增,复制数据
    addDataHandle() {
      // 根据handleType区分复制和新增接口 4复制 8新增
      let addData = this.tableHandleData.searchData
      if (addData.processCode == '' || addData.processName == '') {
        return
      }
      if (addData.processFirstName == '' || addData.processSecond == '') {
        this.$message({
          message: this.$t(
            'fop_processArrange.processModel.pleaseSelectEventCategory'
          ),
          type: 'warning',
          duration: 3000,
        })
        return
      }
      let params = this.tableHandleData.searchData
      params.parentId = this.treeDataCache.id
      this.tableData.loading = true
      if (this.handleType == 4) {
        //复制和新增的参数区别就是加上 当前行数据的id
        // 调复制的接口
        params.id = this.tableRowData.row.id
        copyProcDef(params).then((res) => {
          this.tableData.loading = false
          // F为请求错误
          if (res.Header.RetStatus == 'F') {
            // 流程编码已经存在
            this.$message({
              message: '流程编码已经存在,请重输',
              type: 'warning',
              duration: 3000,
            })
            this.$nextTick(() => {
              this.tableHandleData.searchData.processCode = ''
              this.tableHandleData.searchForm[0].focus = true
            })
          } else {
            this.tableHandleData.isShow = false
            this.refreshTable()
          }
        })
        return
      } else if (this.handleType == 8) {
        //新增
        addProcDef(params).then((res) => {
          this.tableData.loading = false
          // F为请求错误
          console.log(res.Header.RetMsg)
          if (res.Header.RetStatus == 'F') {
            // 流程编码已经存在
            this.$message({
              message: '流程编码已经存在,请重输',
              type: 'warning',
              duration: 3000,
            })
            this.$nextTick(() => {
              this.tableHandleData.searchData.processCode = ''
              this.tableHandleData.searchForm[0].focus = true
            })
          } else {
            this.tableHandleData.isShow = false
            this.refreshTable()
          }
        })
      }
    },
    // 点击table操作选项，用handleType标记点击的是哪个操作
    tableOperate(val) {
      // { key: 0, label: '修改' },
      //       { key: 1, label: '删除' },
      //       { key: 2, label: '设计' },
      //       { key: 3, label: '部署' },
      //       { key: 4, label: '复制' },
      //       { key: 5, label: '扩展属性' },
      //       { key: 6, label: '扩展属性查看' },
      //       { key: 7, label: '查看历史版本' },
      // 新增 key 8
      // 设置弹窗标识，在点击确认按钮 进行对应的操作
      this.handleType = val.operate.key
      // 储存本行数据
      this.tableRowData = val

      // 当前行删除操作
      if (this.handleType == 1) {
        this.tableDelete.isShow = true
        return
      }

      // 根据点击项设置弹窗对应的标题
      if (this.handleType == 0) {
        // 修改
        this.tableHandleData.title = this.$t('fop_processArrange.common.modify')
        // 流程编码项不可编辑
        this.tableHandleData.searchForm[0].disabled = true
        let obj = {
          corpNo: val.row.corpNo,
          processCode: val.row.processCode,
          processName: val.row.processName,
          processDesc: val.row.processDesc,
          parentId: val.row.parentId,
          processClass: val.row.processClass,
          processFirst: val.row.processFirst,
          processFirstName: val.row.processFirstName,
          processSecond: val.row.processSecond,
          processSecondName: val.row.processSecondName,
          processThird: val.row.processThird,
          processGroup: val.row.processGroup,
          operator: '张三',
        }
        this.tableHandleData.searchData = obj
      } else if (this.handleType == 4) {
        // 复制
        this.tableHandleData.title = this.$t(
          'fop_processArrange.processModel.copy'
        )
        // 打开弹框
        this.addTableData(this.handleType)
      }
      // 显示弹窗
      this.tableHandleData.isShow = true
    },
    // 表格操作弹框的确定取消
    tableVisibleHandle(val) {
      // val确定为true 取消false
      // { key: 0, label: '修改' },
      //       { key: 1, label: '删除' },
      //       { key: 2, label: '设计' },
      //       { key: 3, label: '部署' },
      //       { key: 4, label: '复制' },
      //       { key: 5, label: '扩展属性' },
      //       { key: 6, label: '扩展属性查看' },
      //       { key: 7, label: '查看历史版本' },
      if (val) {
        let type = this.handleType
        console.log(type)
        switch (type) {
          case 0:
            this.changeData()
            break
          case 8:
            this.addDataHandle()
            break
          case 4:
            this.addDataHandle()
            break
          default:
        }
      } else {
        this.tableHandleData.isShow = false
      }
    },
    // 删除表格弹框确定
    deleteTableHandleSure(val) {
      console.log(99)
      if (val) {
        let params = {
          processCode: this.tableRowData.row.processCode,
          delType: this.tableDelete.searchData.delType + '',
        }
        console.log(params)
        this.loading = true
        deleteProcDef(params).then((res) => {
          this.loading = false
          // 删除成功刷新列表
          this.refreshTable()
        })
      }
      this.tableDelete.isShow = false
    },
    // 修改数据
    changeData() {
      // 增加当前行id键
      this.tableHandleData.searchData.id = this.tableRowData.row.id
      let params = this.tableHandleData.searchData
      this.tableData.loading = true
      updateProcDef(params).then((res) => {
        this.tableData.loading = false
        let flag = res.Header.RetStatus
        if (flag == 'F') {
          this.$message({
            message: res.Header.RetMsg,
            type: 'warning',
            duration: 3000,
          })
        } else if (flag == 'S') {
          this.refreshTable()
        }
        this.tableHandleData.isShow = false
      })
    },
    // 检索
    searchData() {
      let params = {
        processCode: this.headerData.searchData.processCoding,
        processName: this.headerData.searchData.processName,
        parentId: this.treeDataCache.id,
        pageRows: 10,
        curPage: 1,
      }
      selectProcDefList(params).then((res) => {
        this.tableData.tableData = res && res.pageData && res.pageData.result
      })
    },
    // 点击树删除图标
    deleteTree(node, data) {
      this.deleteTreeHandle.isShow = true
    },
    deleteTreeSure(val) {
      let obj = {
        id: this.treeDataCache.id,
      }
      if (val) {
        deleteSysNode(obj).then((res) => {
          listSysNode(this.identity).then((res) => {
            this.handleTree(res)
          })
        })
      }
      this.deleteTreeHandle.isShow = false
    },
    // 刷新表格数据
    refreshTable() {
      let params = {
        processCode: '',
        processName: '',
        parentId: this.treeDataCache.id,
        pageRows: 10,
        curPage: 1,
      }
      this.tableData.loading = true
      selectProcDefList(params).then((res) => {
        this.tableData.loading = false
        // 处理表格数据
        let data = res && res.pageData && res.pageData.result
        data.forEach((item, index) => {
          if (item.processControl == '0') {
            item.processControl = '正常'
          } else if (item.processControl == '1') {
            item.processControl = '关闭'
          }
          if (!item.operator) {
            item.operator = '张三'
          }
        })
        this.tableData.tableData = data
      })
    },
    // 树结构的点击事件
    nodeHandleClick(data, node) {
      // 解除按钮禁用
      this.headerData.searchHandle.forEach((item, index) => {
        item.disabled = false
      })
      this.tableHeaderHandle.searchHandle.forEach((item, index) => {
        item.disabled = false
      })
      this.treeDataCache = data
      this.treeLevel = node.level
      //记录点击次数
      this.treeClickCount++
      //单次点击次数超过2次不作处理
      if (this.treeClickCount >= 3) {
        return
      }

      //计时器,计算300毫秒
      this.timer = window.setTimeout(() => {
        // 单击
        if (this.treeClickCount == 1) {
          this.treeClickCount = 0
          //单击事件处理
          this.refreshTable()
        } else if (this.treeClickCount > 1) {
          // 双击事件
          // 清除复制效果
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty()
          this.treeClickCount = 0
          // 3级只能修改 判断是否禁用新增
          if (node.level >= 3) {
            // this.treeEdit.addSearchForm[0].disabled = true
            // this.treeEdit.addSearchForm[1].disabled = true
          } else {
            this.treeEdit.addSearchForm[0].disabled = false
            this.treeEdit.addSearchForm[1].disabled = false
          }
          this.treeEdit.isShow = true
          //记录点击的 parentId
          this.parentId = data.parentId
          // 清空treeEdit的值

          this.treeEdit.searchData.sysId = ''
          this.treeEdit.searchData.sysName = ''
        }
      }, 300)
    },

    // 标记table切换，提交对应的操作
    handleClick(tab, event) {
      this.treeEdit.tableIndex = tab.index
      this.treeEdit.searchData.sysId = ''
      this.treeEdit.searchData.sysName = ''
    },
    // 操作树结构的弹框的确认事件
    submitTree() {
      // 判断必填内容
      if (
        this.treeEdit.searchData.sysId == '' ||
        this.treeEdit.searchData.sysName == ''
      ) {
        return
      }
      // 判断是修改还是新增  0 新增 1 修改
      if (this.treeEdit.tableIndex == 0) {
        //
        let obj = {
          sysId: this.treeEdit.searchData.sysId,
          sysName: this.treeEdit.searchData.sysName,
          parentId: this.treeDataCache.id,
        }
        addSysNode(obj).then((res) => {
          let data = {
            id: 1,
          }
          listSysNode(data).then((res) => {
            this.handleTree(res)
            this.treeEdit.isShow = false
          })
        })
        return
        // 根据层级 定parentID的参数
        // if (this.treeLevel == 1) {
        //   let parentId = this.treeDataCache.id
        // }else if(this.treeLevel == 2){
        //   let parentId = this.treeDataCache.id
        // }

        // if (parentId != 1) {
        //   // 二级传当前id
        //   obj.parentId = this.treeDataCache.id
        //   addSysNode(obj).then((res) => {
        //     let data = {
        //       id: 1,
        //     }
        //     listSysNode(data).then((res) => {
        //       this.handleTree(res)
        //     })
        //   })
        // } else if (parentId == 1) {
        //   obj.parentId = this.treeDataCache.parentId
        //   addSysNode(obj).then((res) => {
        //     let data = {
        //       id: 1,
        //     }
        //     listSysNode(data).then((res) => {
        //       this.handleTree(res)
        //     })
        //   })
        // }
      } else if (this.treeEdit.tableIndex == 1) {
        let params = {
          sysId: this.treeEdit.searchData.sysId,
          sysName: this.treeEdit.searchData.sysName,
          parentId: this.treeDataCache.parentId,
          id: this.treeDataCache.id,
        }
        updateSysNode(params).then((res) => {
          let data = {
            id: 1,
          }
          listSysNode(data).then((res) => {
            this.handleTree(res)
          })
        })
      }
      // 关闭弹窗
      this.treeEdit.isShow = false
    },
  },
}
</script>

<style scoped>
.process-model {
  flex: 1;
  display: flex;
  width: 100%;
}
.main-content {
  flex: 1;
  display: flex;
  width: 100%;
}
.left-nav {
  width: 200px;
  min-width: 200px;
  margin-right: 1em;
  padding-right: 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  /* height: calc(100vh - 80px); */
  height: 100%;
  transition: all 0.5s;
  z-index: 1;
  overflow: auto;
}
.drawer {
  min-width: 0;
  width: 0;
  opacity: 0;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content .top {
  min-height: 60px;
  font-size: 14px;
  display: flex;
}

.content .bottom {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-body {
  flex: 1;
}

/* tree删除图标定位 */
.tree /deep/ .el-tree-node__content {
  position: relative;
}
.tree-delete {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: red;
}
.tree-title {
  position: relative;
}
</style>
