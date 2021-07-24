/**
 * 国际化语言处理公共方法
 * Created by gcc on 20/08/01.
 */

import vue from "../main";

/**
 * @param {string} str 提示用户要输出的文本内容
 * @returns {string} 拼接好的文本
 */
/**
 * @param {string} str 提示用户要输出的文本内容
 * @returns {string} 拼接好的文本
 */
export function getPlaceholderMsg(str) {
  if (str){
    return vue.$t("common.placeholder.input") + str
  }
}

/**
 * @param {string} str 提示用户下拉框要选择的内容
 * @returns {string} 拼接好的文本
 */
export function getPlaceholderMsgForSelect(str) {
  if (str){
    return vue.$t("common.placeholder.select") + str
  }
}
