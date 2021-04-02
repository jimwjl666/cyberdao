import api from '@/api'
export default function ({ $axios }, inject) {
  inject('api', api($axios))
}
