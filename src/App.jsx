import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './views/Error'

import contract from 'truffle-contract'
import Network from './network'
import TokenVestingApp from './views/TokenVestingApp'

const App = () => (
  <Router>
    <Switch>
      <Route path="/m1/:address" component={ MoonbeamMain }/>
      <Route path="/:address" component={ DiodeMain }/>
      <Route component={ MissingAddress } />
    </Switch>
  </Router>
)

const MoonbeamMain = function({ match }) {
  let TokenVesting = null;
  
  let token = {
    name: "DIODE",
    address: "0x434116a99619f2B465A137199C38c1Aab0353913",
    href: 'https://moonscan.io/token/0x434116a99619f2B465A137199C38c1Aab0353913',
    network: Network("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a"),
    contractLink: 'https://moonscan.io/address/',
    getTokenVesting: async function(address) {
      if (TokenVesting == null) { 
        const TK = contract(require('./contracts/TokenVesting.json'))
        TK.setProvider(token.network.provider())
        TokenVesting = await TK.at(address)
      }
      return TokenVesting
    },
    getTokenVestingW: async function(address) {
      const tokenVesting = contract(require('./contracts/TokenVesting.json'))
      tokenVesting.setProvider(window.ethereum)
      return tokenVesting.at(address)
    },
    getReleased: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.released.call(this.address)
    },
    getVestedAmount: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.vestedAmount.call(this.address)
    },
    getRevoked: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.revoked.call(this.address)
    },
    getBalance: async function(address) {
      const Token = contract(require('./contracts/IERC20.json'))
      Token.setProvider(this.network.provider())
      const ERC20 = await Token.at(this.address)
      return ERC20.balanceOf(address)
    },
  }

  return Main(token, match, match.params.address)
}

const DiodeMain = function({ match }) {
  let TokenVesting = null;

  let token = {
    name: "DIODE",
    address: null,
    href: 'http://diode.io',
    network: Network("wss://prenet.diode.io:8443/ws"),
    contractLink: 'https://diode.io/prenet/#/address/',
    getTokenVesting: async function(address) {
      if (TokenVesting == null) { 
        const TK = contract(require('./contracts/TokenVestingNative.json'))
        TK.setProvider(token.network.provider())
        TokenVesting = await TK.at(address)
      }
      return TokenVesting
    },
    getTokenVestingW: async function(address) {
      const TokenVesting = contract(require('./contracts/TokenVestingNative.json'))
      TokenVesting.setProvider(window.ethereum)
      return TokenVesting.at(address)
    },
    getReleased: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.released.call()
    },
    getVestedAmount: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.vestedAmount.call()
    },
    getRevoked: async function(address) {
      const tokenVesting = await this.getTokenVesting(address)
      return tokenVesting.revoked.call()
    },
    getBalance: async function(address) {
      return await this.network.eth().getBalance(address)
    }
  }

  return Main(token, match, match.params.address)
}

const Main = function(token, match, key) {
  let { address } = match.params
  if (!token.network.web3().utils.isAddress(address)) return <MissingAddress />
  return <TokenVestingApp key={key} address={address} token={token} />
}

const MissingAddress = () => (
  <Error error="This is not an address :(" />
)

export default App