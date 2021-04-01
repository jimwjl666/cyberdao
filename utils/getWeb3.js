/* eslint-disable no-console */
import Web3 from 'web3'

const getWeb3 = function () {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function () {
      let results
      let web3 = window.web3
      console.log('web3.currentProvider', web3.currentProvider)
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider)

        results = {
          web3,
        }

        console.log('Injected web3 detected.')

        resolve(results)
      } else {
        console.log('coming in')
        const provider = new Web3.providers.HttpProvider(
          'http://127.0.0.1:7545'
        )

        web3 = new Web3(provider)

        results = {
          web3,
        }

        console.log('No web3 instance injected, using Local web3.')

        resolve(results)
      }
    })
  })
}

export default getWeb3
