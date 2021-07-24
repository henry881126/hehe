/*
 * @Descripttion: 国际化导出
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-05 09:58:11
 */
const langContext = require.context('./lang-cn', true, /\.js$/);
const langData = langContext.keys().reduce((item, itemPath) => {
  const itemName = itemPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = langContext(itemPath)
  item[itemName] = value.default
  return item
}, {})
export default langData