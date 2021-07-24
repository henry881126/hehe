<template>
  <div class="scene-list">
    <p class="condition-title">{{ $t('common.operate.searchConditions') }}</p>
    <!-- 检索表单 -->
    <form-view
      labelWidth="80px"
      :searchData="searchData"
      ref="searchForm"
      :searchForm="searchFormItem"
      :searchHandle="searchHandle"
    ></form-view>
    <div class="button-wrapper">
      <el-button type="primary" @click="showScenePopup('add')">{{ $t('common.operate.add') }}</el-button>
    </div>
    <div class="g-table">
      <tableView
        :loading="tableData.loading"
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        :current-page="searchData.Header.CurrentPageNum"
        v-on:operate="tableButtonHandle"
        :total="tableData.total"
        @getPage="currentPageChange"
        @getPageSize="currentSizeChange"
      />
    </div>
    <!-- 场景弹窗 -->
    <popup
      :isShow="isShow"
      :size="popUpData.size"
      :title="popUpData.title"
      :footerList="popUpData.footerList"
      v-on:senddialogVisible="buttonHandle"
    >
      <template slot="content">
        <form-view
          labelWidth="120px"
          :isInline="true"
          :searchData="sceneData"
          :rules="sceneRules"
          ref="sceneForm"
          :searchForm="sceneFormItem"
        ></form-view>
      </template>
    </popup>
  </div>
</template>
<script>
  import { querySourceList, addSource, updateSource, deleteSource } from '@/api/ssp/system-resource/scene'
  import { getPlaceholderMsg, getPlaceholderMsgForSelect } from '@/utils/i18Util'
  import { isType, isInclude, deepClone } from '@/utils'

  export default {
    data() {
      return {
        // 检索条件
        searchData: {
          sourceId: null,
          sourceName: null,
          Header: {
            PageTotalNum: 10, // 每页显示数据条数
            CurrentPageNum: 1 // 当前第几页
          }
        },
        //检索表单项
        searchFormItem: [
          {
            type: 'Input',
            label: this.$t('system_resource.sourceId'),
            prop: 'sourceId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.sourceId'))
          },
          {
            type: 'Input',
            label: this.$t('system_resource.sourceName'),
            prop: 'sourceName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.sourceName'))
          }
        ],
        //检索表单按钮处理
        searchHandle: [
          {
            label: this.$t('common.operate.search'),
            loading: false,
            id: 'search',
            type: 'primary',
            handle: () => this.searchHandleForm('searchForm')
          },
          {
            label: this.$t('common.operate.reset'),
            id: 'reset',
            type: 'primary',
            handle: () => this.resetForm('searchForm')
          }
        ],
        // 新增场景
        // 新增场景弹窗显示
        isShow: false,
        sceneData: {
          sourceId: '',
          sourceName: '',
          description: ''
        },
        // 新增场景弹窗项
        sceneFormItem: [
          {
            type: 'Input',
            label: this.$t('system_resource.sourceId'),
            prop: 'sourceId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.sourceId'))
          },
          {
            type: 'Input',
            label: this.$t('system_resource.sourceName'),
            prop: 'sourceName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.sourceName'))
          },
          {
            type: 'Input',
            typetext: 'textarea',
            label: this.$t('system_resource.description'),
            prop: 'description',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t('system_resource.description'))
          }
        ],
        // 新增场景表单验证
        sceneRules: {
          sourceId: [
            { required: true, message: getPlaceholderMsg(this.$t('system_resource.sourceId')), trigger: 'blur' }
          ],
          sourceName: [
            { required: true, message: getPlaceholderMsg(this.$t('system_resource.sourceName')), trigger: 'blur' }
          ]
        },
        // 新增场景弹窗内容
        popUpData: {
          title: '',
          footerList: [
            {
              name: this.$t('common.operate.cancel'),
              type: '',
              id: 'cancel',
              isSubmit: false
            },
            {
              name: this.$t('common.operate.confirm'),
              type: 'primary',
              id: 'confirm',
              loading: false,
              isSubmit: true
            }
          ]
        },
        // 列表数据
        tableData: {
          isPage: true,
          isOrder: true,
          loading: false,
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
          paramTableHeader: [
            {
              prop: 'sourceId',
              label: this.$t('system_resource.sourceId'),
            },
            { prop: 'sourceName', label: this.$t('system_resource.sourceName') },
            { prop: 'createdStamp', label: this.$t('common.createdStamp') },
            { prop: 'lastUpdatedStamp', label: this.$t('common.lastUpdatedStamp') }
          ],
          paramData: []
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].$refs['inlineForm'].resetFields()
      },
      searchHandleForm(formName) {
        this.$refs[formName].$refs['inlineForm'].validate(async(valid) => {
          if (valid) {
            this.searchData.Header.CurrentPageNum = 1
            this.searchHandle.forEach((item) => {
              if (item.id === 'search') {
                item.loading = true
              }
            })
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

      showScenePopup(status) {
        this.isShow = true
        this.popUpData.status = status
        if (status === 'add') {
          this.sceneData.sourceId = null
          this.sceneData.sourceName = null
          this.sceneData.description = null
          this.popUpData.title = this.$t('common.operate.add')
          this.sceneFormItem.forEach((item) => {
            if (item.prop === 'sourceId') {
              this.$set(item, 'disabled', false)
            }
          })
        } else {
          this.popUpData.title = this.$t('common.operate.edit')
          this.sceneFormItem.forEach((item) => {
            if (item.prop === 'sourceId') {
              this.$set(item, 'disabled', true)
            }
          })
        }
      },

      // 添加场景
      addSource() {
        return addSource(this.sceneData);
      },

      // 添加场景按钮处理
      buttonHandle(flag) {
        if (flag) {
          this.$refs['sceneForm'].$refs['inlineForm'].validate(async(valid) => {
            if (valid) {
              this.popUpData.footerList.forEach((item) => {
                if (item.id === 'confirm') {
                  item.loading = true
                }
              })
              if (this.popUpData.status === 'add') {
                await this.addSource()
              } else {
                await this.editSource()
              }
              this.$refs['sceneForm'].$refs['inlineForm'].resetFields();
              this.popUpData.footerList.forEach((item) => {
                if (item.id === 'confirm') {
                  item.loading = false;
                }
              })
              this.isShow = false;
              this.searchData.Header.CurrentPageNum = 1
              this.getList();
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.isShow = false
        }
      },

      // 编辑场景
      editSource() {
        return updateSource(this.sceneData)
      },

      //获取按钮操作项
      tableButtonHandle(e) {
        if (e.operate.id === 'modify') {
          this.sceneData = deepClone(e.row)
          this.showScenePopup('edit')
        } else if (e.operate.id === 'delete') {
          this.deleteScene(e.row)
        }
      },

      // 删除场景项
      deleteScene(data) {
        this.$confirm(`${this.$t('system_resource.prompt.deletePrompt')}${data.sourceName}, ${this.$t('system_resource.prompt.isContinue')}`, this.$t('system_resource.prompt.prompt'), {
          confirmButtonText: this.$t('common.operate.confirm'),
          cancelButtonText: this.$t('common.operate.cancel'),
          type: 'warning'
        }).then(() => {
          const reqData = {
            sourceId: data.sourceId
          }
          deleteSource(reqData).then(response => {
            this.getList()
          })
          this.$message({
            type: 'success',
            message: `${this.$t('system_resource.prompt.delete_success')}！`
          })
        }).catch(() => {
        })
      },

      // 获取场景列表
      getList() {
        this.tableData.loading = true
        return querySourceList(this.searchData).then(response => {
          if (isInclude(response, 'sourceList') && isType.isArray(response.sourceList)) {
            this.tableData.paramData = response.sourceList
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
      }
    },
    created() {
      this.getList()
    }
  }
</script>
<style lang="scss" scoped>
  .scene-list {
    display: flex;
    flex-direction: column;
    height: 100%;

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
  }
</style>
