export default function (axios) {
  return {
    /**
     * 获取概览数据
     */
    bakerySummary() {
      return axios.get('/v1/bakery/summary')
    },
    /**
     *获取nft商品列表
     */
    queryNfts(params) {
      return axios.get(
        '/v1/nfts?nftType=-1&limit=16&offset=0&sortName=votes&sortBy=desc'
      )
    },
  }
}
