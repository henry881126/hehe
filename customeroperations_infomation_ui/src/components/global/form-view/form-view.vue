/*
* @Author: Ray haiyoung
* @Date: 2020-07-24 14:55:01
* @Last Modified by: Ray haiyoung
* @Last Modified time: 2020-07-29 09:30:46
*/
<template>
  <div class="m-form">
    <el-form
      :size="size"
      :ref="formRef"
      :rules="rules"
      :label-position="labelPosition"
      :inline="isInline?true:false"
      :model="searchData"
      :label-width="labelWidth">
      <el-form-item v-for="item in searchForm" v-if="item.show===undefined || item.show ? true : false" :label="item.label+':'" :key="item.prop" :prop="item.prop">
        <!-- 输入框 -->
        <el-input
          clearable
          v-if="item.type==='Input' || item.type === 'Textarea'"
          :type = "item.type === 'Textarea' ? 'textarea' : 'input'"
          v-model="searchData[item.prop]"
          :size="size"
          :autofocus="item.focus ? true : false"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :style="{width: item.width}"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          clearable
          v-if="item.type==='Select'"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
          :style="{width: item.width}"
          :size="size"
          @change="item.change(searchData[item.prop])"
        >
          <el-option v-for="op in item.options" :label="op[item.labelKey || 'label']" :value="op[item.valueKey || 'value']" :key="op[item.valueKey || 'value']"></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
          <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type==='RadioButton'"
          v-model="searchData[item.prop]"
          @change="item.change && item.change(searchData[item.prop])"
        >
          <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type==='Checkbox'"
          :style="{width: item.width}"
          v-model="searchData[item.prop]"
        >
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          :disabled="item.disabled"
          :value-format = "item.valueFormat"
          v-if="item.type==='Date'"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-select v-if="item.type==='Time'"
                        :value-format = "item.valueFormat"
                        :disabled="item.disabled"
                        :picker-options="item.pickerOptions"
                        v-model="searchData[item.prop]" type></el-time-select>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='DateTime'"
          :value-format = "item.valueFormat"
          type="datetime"
          v-model="searchData[item.prop]"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        ></el-date-picker>
        <!-- 滑块 -->
        <el-slider
          :disabled="item.disabled" v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider>
        <!-- 开关 -->
        <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]"></el-switch>
        <!-- 输入框搜索 -->
        <el-input
          clearable
          v-if="item.type==='InputHandle'"
          v-model="searchData[item.prop]"
          :size="size"
          :placeholder="item.placeholder"
          :style="{width: item.width}"
          :disabled="item.disabled"
          :type="item.typetext"
        >
          <el-button
            slot="append"
            :type="item.buttonType"
            :icon="item.buttonIcon"
            @click="item.buttonClick"
          >{{item.buttonText}}
          </el-button>
        </el-input>
        <!-- 级联选择器-->
        <el-cascader
          v-if="item.type==='Cascader'"
          :style="{width: item.width}"
          :disabled="item.disabled"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
          :separator="item.separator"
          :options="item.options"
          :filterable="item.filterable"
          :filter-method="item.filterMethod"
          :before-filter="item.beforeFilter"
          :props="item.props"
          :ref="item.ref"
          :show-all-levels="item.showAllLevels"
          @change="item.change"
        >
        </el-cascader>
      </el-form-item>

      <!-- 操作 -->
      <el-form-item v-if="isHandle">
        <el-button
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          v-for="item in searchHandle"
          :key="item.label"
          :type="item.type"
          :size="item.size || size"
          @click="item.handle"
        >{{item.label}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "formView",
    props: {
      //是否行内显示
      isInline: {
        type: Boolean,
        default: true,
      },
      //表单域标签的位置
      labelPosition: {
        type: String,
        default: "right",
        validator(type) {
          if (type && !["right", "left", "top"].includes(type)) {
            console.error(
              "labelPosition类型必须为:" + ["right", "left", "top"].join("、")
            );
          }
          return true;
        },
      },
      //ref
      formRef: {
        type: String,
        default: "inlineForm",
      },
      //rules
      rules: {
        type: Object,
        default: () => {
          return {}
        },
      },
      //表单域标签的宽度
      labelWidth: {
        type: String,
        default: "100px",
      },
      //表单内组件的尺寸
      size: {
        type: String,
        default: "mini",
        validator(type) {
          if (type && !["medium", "small", "mini"].includes(type)) {
            console.error(
              "size类型必须为:" + ["medium", "small", "mini"].join("、")
            );
          }
          return true;
        },
      },
      //form表单样式
      searchForm: {
        type: Array,
        default:()=>[],
      },
      //是否有操作行
      isHandle: {
        type: Boolean,
        default: true,
      },
      //操作行信息
      searchHandle: {
        type: Array,
        default: () => [],
      },
      //form表单数据
      searchData: {
        type: Object,
        default: ()=>{
          return {}
        },
      },
    },
  };
</script>
<style scoped lang="scss">
.m-form{
  ::v-deep .el-form{
    .el-form-item{
      .el-form-item__label{
        font-weight: normal;
      }
    }
  }
}
</style>
