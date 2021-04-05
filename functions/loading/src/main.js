import Vue from 'vue'
import Main from './main.vue'
const MessageConstructor = Vue.extend(Main)

let instance = null
export default {
  open() {
    if (!instance) {
      instance = new MessageConstructor().$mount()
      document.body.appendChild(instance.$el)
    } else {
      instance.show = true
    }
  },
  close() {
    instance.show = false
  },
}
