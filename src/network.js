import Web3 from 'web3'

const instance = new Web3("wss://prenet.diode.io:8443/ws");
instance.currentProvider.sendAsync = instance.currentProvider.send;

const Network = {
  web3() {
    return instance
  },

  eth() {
    const web3 = Network.web3()
    return web3.eth
  },

  provider() {
    return Network.web3().currentProvider
  },

  getAccounts() {
    return new Promise((resolve, reject) => {
      Network.eth().getAccounts(Network._web3Callback(resolve, reject))
    })
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

export default Network