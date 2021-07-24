<!--
*@Descripttion:
*@version:
*@Author:zhanghuan
*@Date:2020-07-29 15:18:49
*@LastEditors:zhanghuan
*@LastEditTime:2020-08-01 15:18:49
-->
<template>
  <div>
    <!--新增表单-->
    <form-view
      labelWidth="150px"
      :isInline="false"
      :searchData="newResourcePermissionData"
      :rules="newResourcePermissionRules"
      ref="newResourcePermissionForm"
      :searchForm="newResourcePermissionForm"
      :searchHandle="searchHandle"
    ></form-view>
    <!--所属权限弹窗-->
    <popup
      :isShow="isShowAuthority"
      :size="authorityPopupData.size"
      :title="authorityPopupData.title"
      :footerList="authorityPopupData.footerList"
      v-on:senddialogVisible="authorityButtonHandle"
    >
      <template slot="content">
        <p class="condition-title">{{ $t('common.operate.searchConditions') }}</p>
        <!-- 检索项表单-->
        <form-view
          labelWidth="80px"
          :searchData="authPopupData"
          ref="searchForm"
          :searchForm="authPopupSearchForm"
          :searchHandle="authPopupSearchHandle"
        ></form-view>
        <!-- 权限资源列表-->
        <div class="g-table">
          <tableView
            :loading="tableData.loading"
            :operateObj="tableData.operate"
            :tableHeaderData="tableData.paramTableHeader"
            :tableData="tableData.paramData"
            :isPage="tableData.isPage"
            :isRidio="tableData.isRidio"
            :total="tableData.total"
            :highlightCurrentRow="tableData.highlightCurrentRow"
            :current-page="authPopupData.Header.CurrentPageNum"
            @getPage="currentPageChange"
            @getRadioSelected="getSelectList"
            @getPageSize="currentSizeChange"
          />
        </div>
      </template>
    </popup>
  </div>
</template>
<script>
  import {
    addWebAppSource,
    queryMenuListForTree,
    queryPermissionNoRelSource
  } from '@/api/ssp/system-resource/resource'
  import { queryCommonParamList } from '@/api/ssp/common'
  import { deepClone } from '../../../utils/index'
  import { getPlaceholderMsg, getPlaceholderMsgForSelect } from "@/utils/i18Util";


  export default {
    mounted() {
      if (this.$route.name === 'resource-modify') {
        this.pageStatus = 'modify'
        const data = this.$route.params;
        console.log(data);
        console.log(Object.keys(data));
        Object.keys(data).forEach(key => {
          console.log(key);
          this.$set(this.newResourcePermissionData, key, data[key])
        })
        console.log(this.newResourcePermissionData)
      }
    },
    data() {
      return {
        //页面状态： add/modify
        pageStatus: 'add',
        // 所属权限弹窗显示
        isShowAuthority: false,
        // 所属权限检查项
        authPopupSearchForm: [
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionId"),
            prop: 'permissionId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionId"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionsName"),
            prop: 'permissionsName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionsName"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionsDescription"),
            prop: 'permissionDescription',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionsDescription"))
          }
        ],
        // 所属权限检查项数据
        authPopupData: {
          Header: {
            PageTotalNum: 10, // 每页显示数据条数
            CurrentPageNum: 1 // 当前第几页
          }
        },
        // 所属权限检索项事件
        authPopupSearchHandle: [
          {
            label: this.$t("common.operate.search"),
            type: 'primary',
            handle: () => this.searchHandleForm('searchForm')
          },
          {
            label: this.$t("common.operate.reset"),
            type: 'primary',
            handle: () => this.resetForm('searchForm')
          }
        ],
        // 所属权限弹出窗信息
        authorityPopupData: {
          title: this.$t("system_resource.resource.authorityTitle"),
          size: 'medium',
          footerList: [
            { name: this.$t("common.operate.cancel"), type: '', isSubmit: false },
            { name: this.$t("common.operate.confirm"), type: 'primary', isSubmit: true }
          ]
        },
        // 资源状态下拉项
        sourceStatus: [],
        //操作方法下拉项
        handlerMethods: [],
        /* 新增 */
        // 新增资源权限数据
        newResourcePermissionData: {
          sourceId: null,
          sourceName: null
        },
        // 资源权限表单项
        newResourcePermissionForm: [
          {
            type: 'Input',
            label: this.$t("system_resource.resource.sourceId"),
            prop: 'sourceId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.sourceId"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.sourceName"),
            prop: 'sourceName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.sourceName"))
          },
          {
            type: 'Select',
            label:  this.$t("system_resource.resource.sourceStatus"),
            labelKey: 'paramName',
            valueKey: 'paramValue',
            prop: 'sourceStatus',
            width: '220px',
            placeholder:  getPlaceholderMsgForSelect(this.$t("system_resource.resource.sourceStatus")),
            change: () => {
            }
          },
          {
            type: 'Select',
            label: this.$t("system_resource.resource.handlerMethod"),
            prop: 'handlerMethod',
            labelKey: 'paramName',
            valueKey: 'paramValue',
            width: '220px',
            placeholder: getPlaceholderMsgForSelect(this.$t("system_resource.resource.handlerMethod")),
            change: (row) => {
            }
          },
          {
            type: 'Cascader',
            label: this.$t("system_resource.resource.menuId"),
            prop: 'menuId',
            width: '220px',
            buttonText: this.$t("common.operate.select"),
            showAllLevels: false,
            options: [],
            props: {
              label: 'sourceName',
              value: 'sourceId',
              children: 'childrens',
              systemId: 'systemId'
            },
            ref: 'menuRef',
            placeholder: getPlaceholderMsgForSelect(this.$t("system_resource.resource.menuId")),
            change: (row) => {
              const data = this.$refs['newResourcePermissionForm'].$refs['menuRef'][0].$refs['panel'].getCheckedNodes()[0].data
              this.newResourcePermissionData.systemId = data.systemId
            }
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionId"),
            show: false,
            prop: 'permissionId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionId"))
          },
          {
            type: 'InputHandle',
            label: this.$t("system_resource.resource.permissionName"),
            disabled: true,
            prop: 'permissionName',
            width: '220px',
            buttonText: this.$t("common.operate.select"),
            placeholder: getPlaceholderMsgForSelect(this.$t("system_resource.resource.permissionName")),
            buttonClick: () => {
              this.handleShowAuthority()
            }
          },
          {
            type: 'Textarea',
            width: '220px',
            label: this.$t("system_resource.resource.sourceDescription"),
            prop: 'sourceDescription',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.sourceDescription"))
          }
        ],
        // 资源权限验证
        newResourcePermissionRules: {
          sourceId: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.sourceId")), trigger: 'blur' }
          ],
          sourceName: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.sourceName")), trigger: 'blur' }
          ],
          sourceStatus: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.sourceStatus")), trigger: 'change' }
          ],
          handlerMethod: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.handlerMethod")), trigger: 'change' }
          ],
          menuId: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.menuId")), trigger: 'change' }
          ],
          permissionName: [
            { required: true, message: getPlaceholderMsg(this.$t("system_resource.resource.permissionName")), trigger: 'change' }
          ]
        },
        // 资源表单按钮处理
        searchHandle: [
          {
            label: this.$t("common.operate.confirm"),
            type: 'primary',
            loading: false,
            id: 'confirm',
            handle: () => this.handleSubmit('newResourcePermissionForm')
          },
          {
            label: this.$t("common.operate.cancel"),
            id: 'cancel',
            handle: () => this.resetForm('newResourcePermissionForm')
          }
        ],
        // 弹窗权限列表数据
        tableData: {
          isPage: true,
          isRidio: true,
          total: 0,
          // 表格列表头
          paramTableHeader: [
            { prop: 'permissionsId', label: this.$t("system_resource.resource.permissionsId") },
            { prop: 'permissionsName', label: this.$t("system_resource.resource.permissionsName") },
            { prop: 'permissionsDescription', label: this.$t("system_resource.resource.permissionsDescription") }
          ],
          paramData: []
        }
      }
    },
    methods: {
      // 资源表单提交
      handleSubmit(formName) {
        this.$refs[formName].$refs['inlineForm'].validate(async(valid) => {
          if (valid) {
            this.searchHandle.forEach((item) => {
              if (item.id === 'confirm') {
                item.loading = true
              }
            })
            await this.addWebAppSource()
            this.searchHandle.forEach((item) => {
              if (item.id === 'confirm') {
                item.loading = false
              }
            })
            this.$refs[formName].$refs['inlineForm'].resetFields();
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //新增资源权限
      addWebAppSource() {
        const data = deepClone(this.newResourcePermissionData)
        delete data.permissionName
        delete data.permissionName
        data.isNewSource = true
        data.menuId = data.menuId[data.menuId.length - 1]
        return addWebAppSource(data)
      },
      // 所属权限弹窗 按钮处理
      authorityButtonHandle(flag) {
        if (flag) {
          this.$nextTick(() => {
            this.$set(this.newResourcePermissionData, 'permissionName', this.authorityPopupData.selected.permissionsName)
            this.$set(this.newResourcePermissionData, 'permissionId', this.authorityPopupData.selected.permissionsId)
          })
          this.isShowAuthority = false
        } else {
          this.isShowAuthority = false
        }
      },
      // 表单重置
      resetForm(formName) {
        this.$refs[formName].$refs['inlineForm'].resetFields()
      },
      // 弹窗 权限检索表单 检索
      searchHandleForm(formName) {
        this.$refs[formName].$refs['inlineForm'].validate((valid) => {
          if (valid) {
            this.authPopupData.Header.CurrentPageNum = 1
            this.queryPermissionNoRelSource()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 获取指定paramGroupId的集合信息
      // paramGroupId： 资源状态：100016，操作方式：100020
      async queryCommonParamList(paramGroupId) {
        const data = {
          paramGroupId: paramGroupId
        }
        return await queryCommonParamList(data)
      },
      // 获取菜单树
      getTreeData() {
        queryMenuListForTree({}).then(response => {
          this.newResourcePermissionForm.forEach((item) => {
            if (item.prop === 'menuId') {
              console.log(response.menuList)
              this.$set(item, 'options', response.menuList)
            }
          })
        })
      },
      // 获取下拉框选项
      async getSelectOptions() {
        const sourceStatusRes = await this.queryCommonParamList('100016')
        const handlerMethodRes = await this.queryCommonParamList('100020')
        this.sourceStatus = sourceStatusRes.list
        this.handlerMethods = handlerMethodRes.list
        this.newResourcePermissionForm.forEach((item) => {
          if (item.prop === 'sourceStatus') {
            this.$set(item, 'options', this.sourceStatus)
          } else if (item.prop === 'handlerMethod') {
            this.$set(item, 'options', this.handlerMethods)
          }
        })
      },
      // 查询未关联资源的权限
      queryPermissionNoRelSource() {
        queryPermissionNoRelSource(this.authPopupData).then(response => {
          this.tableData.paramData = response.permissionList
          this.$set(this.tableData, 'total', Number(response.Header.TotalNum))
        })
      },
      // 分页页码改变
      currentPageChange(page) {
        this.authPopupData.Header.CurrentPageNum = page
        this.queryPermissionNoRelSource()
      },
      // 分页每页显示条数改变
      currentSizeChange(size) {
        this.authPopupData.Header.PageTotalNum = size
        this.queryPermissionNoRelSource()
      },
      // 资源选择弹窗显示
      handleShowAuthority() {
        this.isShowAuthority = true
        this.queryPermissionNoRelSource()
      },
      // 获取选中项
      getSelectList(selected) {
        this.authorityPopupData.selected = selected
      }
    },
    created() {
      this.getSelectOptions()
      this.getTreeData()
      this.$set(this.newResourcePermissionData, 'permissionId', 123)
    }
  }
</script>

<style scoped>
  .condition-title {
    margin: 20px;
    font-size: 18px;
  }

  .g-table {
    height: calc(100vh - 655px);
  }
</style>
