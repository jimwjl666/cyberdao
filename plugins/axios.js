import miniToastr from 'mini-toastr'
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // 向请求头中塞入 token
    /* config.headers.token = 'xxx' */
    /* let data = {}
    if (config.method.toUpperCase() === 'GET') {
      data = config.params || {}
      data.token = 'sss'
      config.params = data
    } else {
      // POST 需要塞入 data
      data = config.data || {}
      data.token = 'sss2'
      config.data = data
    } */
    console.log('Making request to ' + config.url)
  })
  $axios.onResponse((response) => {
    if (response.data.success === false) {
      console.log('request error')
      return
    }
    return response.data
  })
  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status)
    miniToastr.error(error.toString(), 'errorMsg')
    console.log(error.toString())
  })
}
