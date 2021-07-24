<!--
 * @Descripttion: 
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 16:01:12
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 10:12:56
-->
<template>
  <div class="g-customers">
    <div class="m-container">
      <div class="m-info_warp m-info">
        <h2 class="p14 c3">群基本信息</h2>
      </div>
      <div class="m-form">
        <el-form ref="addform" :model="addform" :rules="rules" labelWidth="150px">
          <div class="user-add-caption"></div>

          <el-form-item label="群名称" prop="name">
            <el-input v-model="addform.name" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>

          <el-form-item label="群类型:" prop="coding">
            <el-select
              clearable
              v-model="addform.sex"
              :style="{width: width}"
              placeholder="请选择帮助类型"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="群主:" prop="user">
            <el-input v-model="addform.user" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>

          <el-form-item label="所属区划:" prop="highesteducations">
            <el-row>
              <el-col :span="6">
                <el-select
                  clearable
                  v-model="addform.highesteducations"
                  :style="{width: width}"
                  placeholder="请选择帮助类型"
                >
                  <el-option
                    v-for="item in op1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>

              <el-col :span="6">
                <el-select
                  clearable
                  v-model="addform.highesteducations"
                  :style="{width: width}"
                  placeholder="请选择帮助类型"
                >
                  <el-option
                    v-for="item in op2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  clearable
                  v-model="addform.highesteducations"
                  :style="{width: width}"
                  placeholder="请选择帮助类型"
                >
                  <el-option
                    v-for="item in op3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="主推产品:" prop="idtypes">
            <el-cascader
              placeholder="试试搜索：指南"
              :options="options1"
              filterable
              :style="{width: width}"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所属机构:" prop="email">
            <el-cascader
              placeholder="试试搜索：指南"
              :options="options2"
              filterable
              :style="{width: width}"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="投向行业:" prop="highesteducations">
            <el-cascader
              placeholder="试试搜索：指南"
              :options="options3"
              filterable
              :style="{width: width}"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="群联系人:" prop="idtypes">
            <el-input v-model="addform.idtypes" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>

          <el-form-item label="详细地址:" prop="roles">
            <el-input v-model="addform.roles" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>

          <el-row>
            <el-col>
              <el-form-item label="描述:" prop="idtypes">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="addform.textarea"
                  show-word-limit
                  :style="{width: width}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaceholderMsg } from "@/utils/i18Util";
import {
  mainProductList,
  subsidiaryOrganlist,
  investList,
} from "@/views/falseData.js";
export default {
  name: "customers",
  data() {
    return {
      addform: {
        name: "",
        coding: "",
        user: "",
        userType: "",
        organization: "",
        email: "",
        tactics: "",
        sex: "",
        id: "",
        brthdate: "",
        roles: "",
        textarea: "",
      },
      rules: {},
      width: "240px",
      op1: [],
      op2: [],
      op3: [],
      options1: mainProductList,
      options2: subsidiaryOrganlist,
      options3: investList,
    };
  },
  methods: {
    async handleForm(formName) {
      await this.$refs["parentWarp"].$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "@/styles/variables.scss";
.g-customers {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  .m-info {
    h2 {
      padding-left: 10px;
      border-left: 3px solid $primaryColor;
      height: 15px;
      line-height: 15px;
    }
  }
  .m-form {
    margin-top: 30px;
  }
}
.label {
  font-weight: none;
}
</style>
