/*
 * @Descripttion: 
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-08-01 15:09:10
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-03 14:44:54
 */
import store from '../store'

/**
 * 获取指定key的数据字典集合
 * @param {*} paramGroupId  指定key
 */
const getDataDictionaryList = function (paramGroupId) {
  const data = store.getters.list;
  let filterData = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].paramGroupId == paramGroupId) {
      filterData.push(data[i]);
    }
  }
  return filterData;
}

/**
 * 获取指定key的数据字典集合下paramValue对应的paramValue
 * @param {*} paramGroupId 指定key
 * @param {*} paramValue  指定值
 */
const getDataDictionaryParamName = function (paramGroupId, paramValue) {
  const data = store.getters.list;
  let paramName = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].paramGroupId == paramGroupId && data[i].paramValue == paramValue) {
      paramName = data[i].paramName;
      break;
    }
  }
  return paramName;
}

export { getDataDictionaryList }
export { getDataDictionaryParamName }
