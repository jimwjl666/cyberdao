/**
 * @returns {string}
 */
export function toThousands(num) {
  if (!num) return '0'
  if (isNaN(num)) return num

  const result = []
  let counter = 0
  num = (num || 0).toString()
  let fir = num
  let sec = 0
  if (num.includes('.')) {
    const arr = num.split('.')
    fir = arr[0]
    sec = arr[1]
  }
  fir = fir.split('')
  for (let i = fir.length - 1; i >= 0; i--) {
    counter++
    result.unshift(fir[i])
    if (!(counter % 3) && i !== 0) {
      result.unshift(',')
    }
  }
  let str = result.join('')
  if (num.includes('.')) {
    str = str + '.' + sec
  }
  return str
}

/**
 * @returns {string}
 */
export function toRate(value) {
  if (!value || isNaN(value)) return '0%'
  value = parseFloat(value) * 100
  if (value.toString().includes('.')) {
    value = value.toFixed(1)
  }
  return value.toString() + '%'
}

/**
 * @returns {string}
 */
export function dealWords(string) {
  const rex = /(^\s*)|(\s*$)/g
  if (string) return string.replace(rex, '')
  // if (!string) return string
  const array = string.replace(/\s/g, ' ').split(' ')
  const arr = []
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      arr.push(array[i])
    }
  }
  return arr.join(' ')
}
