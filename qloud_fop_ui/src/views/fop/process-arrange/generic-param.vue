/*
 * @Author: ui_qianhengli 
 * @Date: 2020-08-02 11:21:00 
 * @Last Modified by:   ui_qianhengli 
 * @Last Modified time: 2020-08-02 11:21:00 
 */


1<template>
  <div class="pricing-management-platform">
    <div>
      <div class="header">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="一级分类" name="first">
            <form-view
              :searchData="firstClassify.searchData"
              :searchForm="firstClassify.searchForm"
              :isHandle="firstClassify.isHandle"
              :searchHandle="firstClassify.searchHandle"
              :size="firstClassify.size"
              :isPage="firstClassify.isPage"
              :labelWidth="firstClassify.labelWidth"
              ref="firstHeaderSearch"
            ></form-view>
            <div class="handelBar">
              <!-- <el-button type="primary" size="medium" @click.native="firstClassAddData">新增</el-button>
              <el-button type="primary" size="medium" @click.native="sort">排序</el-button>-->
            </div>
            <param-description
              :operateObj="firstClassify.operateObj"
              :showOverflowTooltip="firstClassify.showOverflowTooltip"
              :isClick="firstClassify.isClick"
              :paramTableHeader="firstClassify.paramTableHeader"
              :paramData="firstClassify.paramData"
              :isPage="firstClassify.isPage"
              @operate="firstClassifyOperate"
            ></param-description>
            <popup
              :isShow="firstClassify.popupData.isShow"
              :size="firstClassify.popupData.size"
              :title="firstClassify.popupData.title"
              :footerList="firstClassify.popupData.footerList"
              @senddialogVisible="firstPopupHandle"
            >
              <div slot="content">
                <form-view
                  :searchData="firstClassify.popupData.searchData"
                  :searchForm="firstClassify.popupData.searchForm"
                  :isHandle="firstClassify.popupData.isHandle"
                  :searchHandle="firstClassify.popupData.searchHandle"
                  :size="firstClassify.popupData.size"
                  :labelWidth="firstClassify.popupData.labelWidth"
                  :rules="firstClassify.popupData.rules"
                ></form-view>
              </div>
            </popup>
          </el-tab-pane>
          <el-tab-pane label="二级分类" name="second">
            <form-view
              :searchData="secondClassify.searchData"
              :searchForm="secondClassify.searchForm"
              :isHandle="secondClassify.isHandle"
              :searchHandle="secondClassify.searchHandle"
              :size="secondClassify.size"
              :isPage="secondClassify.isPage"
              :labelWidth="secondClassify.labelWidth"
              ref="secendHeaderSearch"
            ></form-view>
            <div class="handelBar">
              <el-button type="primary" size="medium" @click.native="secondClassAddData">新增</el-button>
              <el-button type="primary" size="medium" @click.native="sort">排序</el-button>
            </div>
            <param-description
              :operateObj="secondClassify.operateObj"
              :showOverflowTooltip="secondClassify.showOverflowTooltip"
              :isClick="secondClassify.isClick"
              :paramTableHeader="secondClassify.paramTableHeader"
              :paramData="secondClassify.paramData"
              :isPage="secondClassify.isPage"
              @operate="secondClassifyOperate"
            ></param-description>
            <popup
              :isShow="secondClassify.popupData.isShow"
              :size="secondClassify.popupData.size"
              :title="secondClassify.popupData.title"
              :footerList="secondClassify.popupData.footerList"
              @senddialogVisible="scendPopupHandle"
            >
              <div slot="content">
                <form-view
                  :searchData="secondClassify.popupData.searchData"
                  :searchForm="secondClassify.popupData.searchForm"
                  :isHandle="secondClassify.popupData.isHandle"
                  :searchHandle="secondClassify.popupData.searchHandle"
                  :size="secondClassify.popupData.size"
                  :labelWidth="secondClassify.popupData.labelWidth"
                  :rules="secondClassify.popupData.rules"
                ></form-view>
              </div>
            </popup>
          </el-tab-pane>
          <el-tab-pane label="超时通知策略" name="third">
            <div>
              <form-view
                :searchData="overtimeStrategy.searchData"
                :searchForm="overtimeStrategy.searchForm"
                :isHandle="overtimeStrategy.isHandle"
                :searchHandle="overtimeStrategy.searchHandle"
                :size="overtimeStrategy.size"
                :labelWidth="overtimeStrategy.labelWidth"
                :rules="overtimeStrategy.rules"
              ></form-view>
            </div>
            <!-- <el-table :data="tableData1" style="width: 100%">
              <el-table-column label="序号" width="180">
                <span>1</span>
              </el-table-column>
              <el-table-column label="超时前几小时提醒" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="超时通知类型" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="超时通知机制" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
            </el-table>-->
          </el-tab-pane>
          <el-tab-pane label="全局事件中心ID" name="fourth">
            <div>
              <el-button type="primary">加一行</el-button>
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column label="序号" width="180">
                  <span>1</span>
                </el-table-column>
                <el-table-column label="类型" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="EVENTID" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="名称" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.input" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'generic-param',
  data() {
    return {
      activeName: 'first',
      firstClassify: {
        isHandle: true,
        size: 'medium',
        searchData: {
          firstClassCode: null,
          firstClassName: '',
        },
        isPage: true,
        labelWidth: '140px',
        searchForm: [
          {
            type: 'Input',
            prop: 'firstClassCode',
            placeholder: '请输入内容',
            label: '一级分类编码：',
          },
          {
            type: 'Input',
            prop: 'firstClassName',
            placeholder: '请输入内容',
            label: '一级分类名称：',
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
              this.$refs.firstHeaderSearch.$refs.inlineForm.resetFields()
              this.searchData()
            },
          },
        ],
        paramTableHeader: [
          {
            prop: 'id',
            label: '序号',
          },
          {
            prop: 'paramsType',
            label: '参数类型',
          },
          {
            prop: 'paramsCode',
            label: '分类编码',
          },
          {
            prop: 'paramsName',
            label: '分类名称',
          },
        ],

        paramData: [],
        showOverflowTooltip: true,
        isClick: true,
        operateObj: {
          width: 200,
          list: ['修改', '删除'],
        },
        popupData: {
          isShow: false,
          size: 'small',
          title: '事项大类新增',
          footerList: [
            { isSubmit: true, name: '确定' },
            { isSubmit: false, name: '取消' },
          ],
          searchData: {
            classifyCode: '', //法人编码 - 从会话中获取,
            classifyName: '', //流程编码
          },
          searchForm: [
            {
              type: 'Input',
              prop: 'classifyCode',
              placeholder: '请输入内容',
              label: '分类编码：',
              disabled: false,
              required: true,
            },
            {
              type: 'Input',
              prop: 'classifyName',
              placeholder: '请输入内容',
              label: '分类名称：',
              required: true,
            },
          ],
          rules: {
            classifyCode: [
              { required: true, message: '请填写分类编码', trigger: 'blur' },
            ],
            classifyName: [
              { required: true, message: '请填写分类名称', trigger: 'blur' },
            ],
          },
        },
        methodsType: '',
      },
      secondClassify: {
        isHandle: true,
        size: 'medium',
        searchData: {
          firstCode: '',
          firstName: '',
          scendCode: null,
          scendName: '',
        },
        isPage: true,
        labelWidth: '140px',
        searchForm: [
          {
            type: 'Input',
            prop: 'firstCode',
            placeholder: '请输入内容',
            label: '一级分类编码：',
          },
          {
            type: 'Input',
            prop: 'firstName',
            placeholder: '请输入内容',
            label: '一级分类名称：',
          },
          {
            type: 'Input',
            prop: 'scendCode',
            placeholder: '请输入内容',
            label: '二级分类编码：',
          },
          {
            type: 'Input',
            prop: 'scendName',
            placeholder: '请输入内容',
            label: '二级分类名称：',
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
              this.$refs.secendHeaderSearch.$refs.inlineForm.resetFields()
              this.searchData()
            },
          },
        ],
        paramTableHeader: [
          {
            prop: 'id',
            label: '序号',
          },
          {
            prop: 'paramsType',
            label: '参数类型',
          },
          {
            prop: 'firstClassCode',
            label: '一级分类编码',
          },
          {
            prop: 'firstClassName',
            label: '一级分类名称',
          },
          {
            prop: 'secondClassCode',
            label: '二级分类编码',
          },
          {
            prop: 'scondClassName',
            label: '二级分类名称',
          },
          {
            prop: 'priority',
            label: '事项优先级',
          },
        ],

        paramData: [],
        showOverflowTooltip: true,
        isClick: true,
        operateObj: {
          width: 200,
          list: ['修改', '删除'],
        },
        popupData: {
          isShow: false,
          size: 'small',
          title: '事项大类新增',
          footerList: [
            { isSubmit: true, name: '确定' },
            { isSubmit: false, name: '取消' },
          ],
          searchData: {
            bigClassCode: '', // 大类编码
            bigClassName: '', //大类名称
            smallClassCode: '', // 小类编码
            smallClassName: '', //小类名称
            priority: '', //优先级
          },
          searchForm: [
            {
              type: 'Select',
              prop: 'bigClassCode',
              placeholder: '请输入内容',
              label: '大类编码：',
              disabled: false,
              required: true,
              options: [
                {
                  key: '1111',
                  value: '1111',
                },
              ],
            },
            {
              type: 'Input',
              prop: 'bigClassName',
              placeholder: '请输入内容',
              label: '大类名称：',
              required: true,
            },
            {
              type: 'Select',
              prop: 'smallClassCode',
              placeholder: '请输入内容',
              label: '小类编码：',
              disabled: false,
              required: true,
              options: [
                {
                  key: '1111',
                  value: '1111',
                },
              ],
            },
            {
              type: 'Input',
              prop: 'smallClassName',
              placeholder: '请输入内容',
              label: '小类名称：',
              required: true,
            },
            {
              type: 'Radio',
              prop: 'priority',
              placeholder: '请输入内容',
              label: '事项优先级',
              required: true,
              radios: [
                {
                  label: '正常',
                  value: 0,
                },
                {
                  label: '紧急',
                  value: 1,
                },
              ],
            },
          ],
          rules: {
            bigClassCode: [
              { required: true, message: '请填写分类编码', trigger: 'blur' },
            ],
            bigClassName: [
              { required: true, message: '请填写分类名称', trigger: 'blur' },
            ],
            smallClassCode: [
              { required: true, message: '请填写分类编码', trigger: 'blur' },
            ],
            smallClassName: [
              { required: true, message: '请填写分类名称', trigger: 'blur' },
            ],
            priority: [
              { required: true, message: '事项优先级', trigger: 'blur' },
            ],
          },
        },
        methodsType: '',
      },
      overtimeStrategy: {
        //超时通知策略
        isHandle: true,
        size: 'medium',
        searchData: {
          time: '', //超时前几小时提醒
          type: '', //超时通知类型
          mechanism: null, //超时通知机制
        },
        isPage: true,
        labelWidth: '140px',
        searchForm: [
          {
            type: 'Input',
            prop: 'time',
            placeholder: '请输入内容',
            label: '超时前几小时提醒',
          },
          {
            type: 'Select',
            prop: 'type',
            placeholder: '请输入内容',
            label: '超时通知类型',
            options: [
              {
                key: 0,
                value: '超时通知',
              },
              {
                key: 1,
                value: '超时预警',
              },
              {
                key: 2,
                value: '超时通知+超时预警',
              },
            ],
            change: (res) => {
              console.log(res)
            },
          },
          {
            type: 'Select',
            prop: 'mechanism',
            placeholder: '请输入内容',
            label: '超时通知机制',
            options: [
              {
                key: 0,
                value: '短信',
              },
              {
                key: 1,
                value: '事件中心',
              },
            ],
            change: (res) => {
              console.log(res)
            },
          },
        ],
        searchHandle: [
          {
            label: '保存',
            type: 'primary',
            handle: () => {
              console.log(this.overtimeStrategy.searchData)
            },
          },
        ],
      },
      tableData1: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
  },

  methods: {
    firstClassifyOperate(val) {
      this.firstClassify.popupData.isShow = true
    },
    secondClassifyOperate(val) {},
    // 控制弹框的确定取消
    firstPopupHandle(val) {
      // 判断弹框类型
      let type = this.firstClassify.methodsType
      this.firstClassify.popupData.isShow = false
      if (val) {
        let type = this.firstClassify.methodsType
        switch (type) {
          case '修改':
            break
          case '删除':
            break
          case '新增':
            this.firstClassify.paramData.push(
              this.firstClassify.popupData.searchData
            )
            break
          default:
        }
      }
    },
    scendClassifyOperate(val) {},
    // 控制弹框的确定取消
    scendPopupHandle(val) {
      this.secondClassify.popupData.isShow = false
    },
    sort() {},
    handleClick(tab, event) {},
    // 点击table操作选项，用methodsType标记点击的是哪个操作
    operate(val) {
      this.firstClassify.popupData.isShow = true
      return
    },

    // 控制弹框的确定取消
    senddialogVisible(val) {
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
        }
      }
      this.popupData.isShow = false
    },
    firstClassAddData() {
      this.firstClassify.methodsType = '新增'
      this.firstClassify.popupData.title = '事项大类新增'

      // 初始化新增数据
      let obj = {
        id: 1,
        paramsType: '',
        paramsCode: '',
        paramsName: '',
      }
      this.firstClassify.popupData.searchData = obj
      this.firstClassify.popupData.isShow = true
    },
    secondClassAddData() {
      this.firstClassify.methodsType = '新增'
      this.firstClassify.popupData.title = '事项大类新增'

      // 初始化新增数据
      let obj = {
        id: 1,
        paramsType: '',
        paramsCode: '',
        paramsName: '',
      }
      this.firstClassify.popupData.searchData = obj
      this.secondClassify.popupData.isShow = true
    },
    changeData() {},
  },
}
</script>
 
<style scoped>
.handelBar {
  margin-bottom: 14px;
}
</style>