import getWeb3 from '../utils/getWeb3'
export const strict = false
export const state = () => ({
  web3Instance: null,
  web3: {
    balance: 0,
    account: null,
    isConnected: false,
  },
})
export const getters = {
  simpleAddress(state) {
    const address = state.web3.account
    if (address) {
      return address.replace(/(\S{4})\S{34}(\S{4})/, '$1***$2')
    }
  },
}
export const mutations = {
  setWeb3Instance(state, web3Instance) {
    state.web3Instance = Object.assign({}, web3Instance)
  },
  setWeb3(state, web3) {
    state.web3 = { ...web3 }
  },
}
export const actions = {
  initWeb3({ commit }) {
    console.log(111)
    getWeb3().then((value) => {
      console.log(value)
      commit('setWeb3Instance', value.web3)
    })
  },
}
