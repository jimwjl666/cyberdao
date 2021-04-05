import Vue from 'vue'
import { toThousands, toRate, formatEth, formatAddress } from '@/utils/common'

Vue.filter('formatEth', function (value) {
  return formatEth(value)
})

Vue.filter('toThousand', function (value, num) {
  if (typeof num === 'number') {
    const fixedNum = Math.round(value * Math.pow(10, num)) / Math.pow(10, num)
    if (value === 0) {
      return '0.000'
    }
    return toThousands(fixedNum)
  } else {
    return toThousands(Math.round(value))
  }
})

Vue.filter('toRate', function (value) {
  return toRate(value)
})

Vue.filter('toBlank', function (value) {
  if (!value) value = '-'
  return value
})

Vue.filter('toFixed1', function (value) {
  if (!value || parseFloat(value) === 0) return 0
  if (value < 0.1) return '< 0.1'
  return parseFloat(value).toFixed(1)
})

Vue.filter('toFixed', function (value, num) {
  if (!value || parseFloat(value) === 0) return 0
  return parseFloat(value).toFixed(num)
})

Vue.filter('formatAddress', function (value) {
  return formatAddress(value)
})
