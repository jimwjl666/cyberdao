export default function api(axios) {
  return {
    /**
     * 获取概览数据
     */
    bakerySummary() {
      return axios({
        method: 'get',
        url: '/v1/bakery/summary',
      })
    },
  }
}
