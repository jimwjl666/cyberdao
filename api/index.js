export default function (axios) {
  return {
    bakerySummary() {
      return axios.get('/v1/bakery/summary')
    },
    queryNfts(params) {
      return axios.get('/v1/tokens', { params })
    },
    artworks(data) {
      return axios.post('/v1/create', data)
    },
    queryTradingHistroy(params) {
      return axios.get('/v1/nfts/events', { params })
    },
    actiontoken(data) {
      return axios.post('/v1/actiontoken', data)
    },
  }
}
