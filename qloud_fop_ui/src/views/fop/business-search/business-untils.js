/*
 * @Author: LeiRuiQi
 * @Date: 2020-08-01 14:13:16
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-04 17:08:13
 */ 

/**
 * @description: 用 val 换取 target array 对应 value
 * @param: target: [{key: "0", value: "正常"}], val: "0"
 * @return: key对应的value
 */
export function renderTableProp(target, val) {
  if (!Array.isArray(target)) {
    console.log("renderTableProp函数的参数target只能为数组");
    return;
  }
  if (String(val) === "undefined") return "";
  const arry = target.filter(item => item.type === val);
  return (arry.length === 1 ? arry[0].value : "");
}