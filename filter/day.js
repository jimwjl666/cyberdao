import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { toSecond } from '@/utils/common'

dayjs.extend(relativeTime)

Vue.filter('formNow', function (value) {
  if (Number(value)) {
    return dayjs(Number(value)).fromNow()
  }
})

Vue.filter('toSecond', function (value) {
  return toSecond(value)
})
