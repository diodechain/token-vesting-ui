import Web3 from 'web3'

const Network = function (url) {
  const instance = new Web3(url);
  instance.currentProvider.sendAsync = instance.currentProvider.send;

  return {
    web3() {
      return instance
    },

    eth() {
      const web3 = this.web3()
      return web3.eth
    },

    provider() {
      return this.web3().currentProvider
    },

    getAccounts() {
      return []
      // return window.ethereum.request({ method: 'eth_requestAccounts' });
    },

    _web3Callback(resolve, reject) {
      return (error, value) => {
        if (error) reject(error)
        else resolve(value)
      }
    },

    log(msg) {
      console.log(`[Network] ${msg}`)
    }
  }
}

export default Network