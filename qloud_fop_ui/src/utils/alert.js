function handleError (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'error'
  });
}

function handleSuccess (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success'
  });
}

function handleWarning (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'warning'
  });
}


export default (Vue) => {
  Vue.prototype.$handleError = handleError
  Vue.prototype.$handleSuccess = handleSuccess
  Vue.prototype.$handleWarning = handleWarning
}
