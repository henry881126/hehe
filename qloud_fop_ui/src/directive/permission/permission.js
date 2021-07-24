import store from '@/store'

export default {
  inserted (el, binding, vnode) {
    // el为自定义指令的元素，bingding为自定义指令额参数
    const { value } = binding
    const roles = store.getters?.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
