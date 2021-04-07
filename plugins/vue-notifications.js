import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

miniToastr.init()

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}
Vue.prototype.$toast = miniToastr
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
}

Vue.use(VueNotifications, options)
