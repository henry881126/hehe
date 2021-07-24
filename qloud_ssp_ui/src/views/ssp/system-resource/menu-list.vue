<template>
  <div class="menu-list">
    <p class="condition-title">检索条件</p>
    <!-- 检索表单 -->
    <form-view
      labelWidth="100px"
      :searchData="searchData"
      ref="menuForm"
      :searchForm="searchForm"
      :searchHandle="searchHandle"
    ></form-view>
    <div class="button-wrapper">
      <el-button type="primary" @click="addMenu">{{$t('common.operate.add')}}</el-button>
      <el-button type="primary" @click="showSort">{{$t('common.operate.sort')}}</el-button>
    </div>
    <!--表格列表数据-->
    <div class="g-table">

      <tableView
        :loading="tableData.loading"
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :current-page="searchData.Header.CurrentPageNum"
        :total="tableData.total"
        :isPage="tableData.isPage"
        v-on:operate="getIndex"
        @getPage="currentPageChange"
        @getPageSize="currentSizeChange"
      />
    </div>
    <!-- 排序弹窗 -->
    <popup
      :isShow="isShowSort"
      :size="editPopupData.size"
      :title="editPopupData.title"
      :footerList="editPopupData.footerList"
      v-on:senddialogVisible="hideSort"
    >
      <template slot="content">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
        </el-tree>
      </template>
    </popup>
  </div>
</template>
<script>
  import { queryMenuList } from '@/api/ssp/system-resource/menu'
  import { getPlaceholderMsg } from '@/utils/i18Util'
  import { isInclude, isType } from '@/utils'

  let status = [
    { label: '开', value: '1' },
    { label: '关', value: '2' }
  ]
  let types = [
    { label: '启用', value: '1' },
    { label: '停用', value: '2' }
  ]
  let positions = [
    { label: '左侧菜单', value: '1' },
    { label: '顶部菜单', value: '2' }
  ]
  let modes = [
    { label: '链接', value: '1' },
    { label: '点击', value: '2' }
  ]
  let scenes = [
    { label: '场景1', value: '1' },
    { label: '场景2', value: '2' }
  ]
  let propsSelect = { label: 'label', value: 'value' }

  export default {
    data() {
      return {
        // 检索数据
        searchData: {
          menuId: null,
          menuName: null,
          urlLink: null,
          parentMenuName: null,
          status: null,
          menuType: null,
          Header: {
            PageTotalNum: 10, // 每页显示数据条数
            CurrentPageNum: 1 // 当前第几页
          }
        },
        total: 0,
        //检索项
        searchForm: [
          {
            type: 'Input',
            label: this.$t('system_resource.menu.menuId'),
            prop: 'menuId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.menuId'))
          },
          {
            type: 'Input',
            label: this.$t('system_resource.menu.menuName'),
            prop: 'menuName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.menuName'))
          },
          {
            type: 'Input',
            label: this.$t('system_resource.menu.urlLink'),
            prop: 'urlLink',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.urlLink'))
          },
          {
            type: 'Input',
            label: this.$t('system_resource.menu.parentMenuName'),
            prop: 'parentMenuName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.parentMenuName'))
          },
          {
            type: 'Select',
            label: this.$t('system_resource.menu.status'),
            prop: 'status',
            width: '220px',
            props: propsSelect,
            options: status,
            change: (row) => '',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.status'))
          },
          {
            type: 'Select',
            props: propsSelect,
            label: this.$t('system_resource.menu.menuType'),
            options: types,
            prop: 'menuType',
            width: '220px',
            change: (row) => '',
            placeholder: getPlaceholderMsg(this.$t('system_resource.menu.menuType'))
          }
        ],
        //检索项事件
        searchHandle: [
          {
            label: this.$t('common.operate.search'),
            type: 'primary',
            loading: false,
            id: 'search',
            handle: () => this.searchHandleForm('menuForm')
          },
          {
            label: this.$t('common.operate.reset'),
            type: 'primary',
            handle: () => this.resetForm('menuForm')
          },
          {
            label: this.$t('common.operate.advancedSearch'),
            type: 'primary',
            handle: () => this.resetForm('menuForm')
          }
        ],

        formRef: 'inlineForm',
        tableData: {
          loading: false,
          isPage: true,
          operate: {
            width: 200,
            list: [
              {
                label: this.$t('common.operate.edit'),
                id: 'modify'
              },
              {
                label: this.$t('common.operate.delete'),
                id: 'delete'
              }
            ]
          },
          showOverflowTooltip: true,
          //表格列表头
          paramTableHeader: [
            { prop: 'systemId', label: this.$t('system_resource.menu.systemId') },
            { prop: 'systemName', label: this.$t('system_resource.menu.systemName') },
            { prop: 'menuId', label: this.$t('system_resource.menu.menuId') },
            { prop: 'menuName', label: this.$t('system_resource.menu.menuName') },
            { prop: 'parentMenuName', label: this.$t('system_resource.menu.parentMenuName') },
            { prop: 'urlLink', label: this.$t('system_resource.menu.urlLink') },
            { prop: 'status', label: this.$t('system_resource.menu.status') },
            { prop: 'menuType', label: this.$t('system_resource.menu.menuType') },
            { prop: 'isChildMenu', label: this.$t('system_resource.menu.isChildMenu') },
            { prop: 'linkType', label: this.$t('system_resource.menu.linkType') },
            { prop: 'linkId', label: this.$t('system_resource.menu.linkId') },
            { prop: 'createdStamp', label: this.$t('common.createdStamp') },
            { prop: 'lastUpdatedStamp', label: this.$t('common.lastUpdatedStamp') }
          ],
          paramData: []
        },
        isShow: false,
        isShowSort: false,
        editPopupData: {
          title: this.$t('common.operate.sort'),
          footerList: [
            { name: this.$t('common.operate.cancel'), type: '', isSubmit: false },
            { name: this.$t('common.operate.confirm'), type: 'primary', isSubmit: true }
          ]
        },
        // 树数据
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs['form'].$refs[formName].resetFields()
      },

      searchHandleForm(formName) {
        console.log(formName)
        // console.log("searchHandle");
        this.$refs[formName].$refs['inlineForm'].validate(async(valid) => {
          if (valid) {
            this.searchHandle.forEach((item) => {
              if (item.id === 'search') {
                item.loading = true
              }
            })
            this.searchData.Header.CurrentPageNum = 1
            await this.getList()
            this.searchHandle.forEach((item) => {
              if (item.id === 'search') {
                item.loading = false
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      // 获取菜单列表
      getList() {
        this.tableData.loading = true
        return queryMenuList(this.searchData).then(response => {
          if (isInclude(response, 'menuList') && isType.isArray(response.menuList)) {
            this.tableData.paramData = response.menuList
            this.$set(this.tableData, 'total', Number(response.Header.TotalNum))
          }
          this.tableData.loading = false
        })
      },

      // 页码改变
      currentPageChange(page) {
        this.searchData.Header.CurrentPageNum = page
        this.getList()
      },

      // 每页显示条数改变
      currentSizeChange(size) {
        this.searchData.Header.PageTotalNum = size
        this.getList()
      },

      addMenu() {
        // this.isShow = true;
        this.$router.push({
          name: 'menu-add'
        })
      },

      hideSort(flag) {
        if (flag) {
        } else {
        }
        this.isShowSort = false
      },

      showSort() {
        this.isShowSort = true
      },

      getIndex(e) {
        console.log(e)
        if (e.operate.id === 'modify') {
          this.isShowSort = true
        }
      },

      handleDragStart(node, ev) {
        console.log('drag start', node)
      },

      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label)
      },

      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label)
      },

      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label)
      },

      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },

      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
      },

      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner'
        } else {
          return true
        }
      },

      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1
      }
    },

    created() {
      this.getList()
    }
  }
</script>
<style lang="scss" scoped>
  .menu-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .condition-title {
    margin: 20px;
    font-size: 18px;
  }

  .button-wrapper {
    margin: 20px;
  }

  .g-table {
    flex: 1;
  }
</style>
