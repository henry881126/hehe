/*
* @Author: Ray haiyoung
* @Date: 2020-07-24 17:30:39
* @Last Modified by: Ray haiyoung
* @Last Modified time: 2020-07-27 10:52:46
*/
<template>
  <div class="m-popup">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :top="top"
      :show-close="showClose"
      :modal="modal"
      :destroy-on-close="destroyOnClose"
      :before-close="handleClose">
      <slot name="content"></slot>
      <span v-if="footerList.length>0" slot="footer" class="dialog-footer">
				<el-button
          v-for="(item,index) in footerList"
          :key="index"
          :size="btnSize"
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          :type="item.type"
          @click="handleClose(item.isSubmit)">{{item.name}}</el-button>
		  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {isType} from "@/utils"

  export default {
    name: "popup",
    data() {
      return {}
    },
    props: {
      //是否显示
      isShow: {
        type: Boolean,
        default: false
      },
      //宽度
      size: {
        type: String,
        default: "small",
        validator(type) {
          if (type && !["medium", "small", "mini"].includes(type)) {
            console.error(
              "size类型必须为:" + ["medium", "small", "mini"].join("、")
            );
          }
          return true;
        },
      },
      //Dialog CSS 中的 margin-top 值
      top: {
        type: String,
        default: "15vh"
      },
      //是否需要遮罩层
      modal: {
        type: Boolean,
        default: true
      },
      //Dialog 的标题
      title: {
        type: String,
        default: "提示"
      },
      //是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      //关闭时销毁 Dialog 中的元素
      destroyOnClose: {
        type: Boolean,
        default: true
      },
      //底部操作行
      footerList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      dialogVisible() {
        return this.isShow;
      },
      btnSize(){
        return this.$store.state.settings.size;
      },
      width() {
        let num = "30%";
        if (this.size === "medium") {
          num = "70%";
        } else if (this.size === "small") {
          num = "50%";
        }
        return num;
      }
    },
    methods: {
      handleClose(flag){
        if(isType.isFunction(flag)) flag = false;
        if(flag){
          // 提交or确定
          // todo...
          this.$emit("senddialogVisible",flag);
        }else{
          this.$emit("senddialogVisible",flag);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-popup {
    ::v-deep .el-dialog__wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .el-dialog {
        max-height: 70%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .el-dialog__body {
          flex: 1;
          overflow: auto;
        }
      }
    }
  }
</style>
